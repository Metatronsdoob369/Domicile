import Fastify, {
  type FastifyError,
  type FastifyInstance,
  type FastifyReply,
  type FastifyRequest,
} from "fastify";
import ky from "ky";
import { z } from "zod";
import type {
  MetricDef,
  RateLimit,
  ComplianceRule,
  TrendSignal,
  InfluencerNode,
  PlatformId,
  MCPToolResponse,
} from "@domicile/data";
import {
  sampleMetrics,
  sampleRateLimits,
  sampleComplianceRules,
  sampleTrends,
  sampleInfluencers,
} from "@domicile/data";
import type { PropertyIntelligence } from "./real-estate.types";

const platformZ = z.enum([
  "twitter",
  "instagram",
  "tiktok",
  "facebook",
  "linkedin",
  "youtube",
  "threads",
  "pinterest",
]);
const metricsGetZ = z
  .object({ platform: platformZ, names: z.array(z.string()).optional() })
  .strict();
const metricsSearchZ = z
  .object({ query: z.string().min(2), platform: platformZ.optional(), fail: z.string().optional() })
  .strict();
const rateLimitsListZ = z.object({ platform: platformZ }).strict();
const complianceListZ = z.object({ platform: z.union([platformZ, z.literal("global")]) }).strict();
const trendsTopZ = z
  .object({
    platform: platformZ,
    region: z.string().optional(),
    limit: z.number().int().min(1).max(100).default(20),
  })
  .strict();
const influencersSearchZ = z
  .object({
    platform: platformZ,
    category: z.string().optional(),
    min_credibility: z.number().min(0).max(1).default(0.6),
  })
  .strict();
const realEstateScrapeZ = z
  .object({
    location: z.string().min(3).default("Austin, TX"),
    min_price: z.number().int().min(0).default(50000),
    max_price: z.number().int().min(1).default(500000),
    property_type: z.string().default("single_family"),
    max_results: z.number().int().min(1).max(50).default(10),
  })
  .strict();

type MetricsGetInput = z.infer<typeof metricsGetZ>;
type MetricsSearchInput = z.infer<typeof metricsSearchZ>;
type RateLimitsInput = z.infer<typeof rateLimitsListZ>;
type ComplianceInput = z.infer<typeof complianceListZ>;
type TrendsInput = z.infer<typeof trendsTopZ>;
type InfluencersInput = z.infer<typeof influencersSearchZ>;
type RealEstateScrapeInput = z.infer<typeof realEstateScrapeZ>;

type RateLimitTracker = { count: number; resetTime: number };

const RATE_LIMITS = {
  "metrics.get": { rpm: 120, window: 60 * 1000 },
  "metrics.search": { rpm: 120, window: 60 * 1000 },
  "rate_limits.list": { rpm: 60, window: 60 * 1000 },
  "compliance.list": { rpm: 60, window: 60 * 1000 },
  "trends.top": { rpm: 60, window: 60 * 1000 },
  "influencers.search": { rpm: 30, window: 60 * 1000 },
  "real_estate.scrape": { rpm: 12, window: 60 * 1000 },
  "real_estate.package": { rpm: 30, window: 60 * 1000 },
} as const;

const envelope = <T>(data: T, ttl: number = 900): MCPToolResponse<T> => ({
  data,
  cache_ttl_s: ttl,
  version: "1.0.0",
  sources: [],
});

const sqlAdapters = {
  async metricsGet(platform: PlatformId, names?: string[]): Promise<MetricDef[]> {
    let results = sampleMetrics.filter((m) => m.platform === platform);
    if (names && names.length > 0) {
      results = results.filter((m) => names.includes(m.name));
    }
    return results;
  },
  async rateLimitsList(platform: PlatformId): Promise<RateLimit[]> {
    return sampleRateLimits.filter((r) => r.platform === platform);
  },
  async complianceList(platformOrGlobal: PlatformId | "global"): Promise<ComplianceRule[]> {
    return sampleComplianceRules.filter((c) => c.platform === platformOrGlobal);
  },
  async trendsTop(platform: PlatformId, region?: string, limit: number = 20): Promise<TrendSignal[]> {
    let results = sampleTrends.filter((t) => t.platform === platform);
    if (region) {
      results = results.filter((t) => t.region === region);
    }
    return results.slice(0, limit);
  },
  async influencersSearchByCategory(
    platform: PlatformId,
    category?: string,
    minCredibility: number = 0.6
  ): Promise<InfluencerNode[]> {
    let results = sampleInfluencers.filter(
      (i) => i.platform === platform && i.credibility_score >= minCredibility
    );
    if (category) {
      results = results.filter((i) => i.categories.includes(category));
    }
    return results;
  },
};

function createRateLimitChecker() {
  const store = new Map<string, RateLimitTracker>();
  return {
    check(toolName: keyof typeof RATE_LIMITS, clientId: string): boolean {
      const limiter = RATE_LIMITS[toolName];
      if (!limiter) {
        return true;
      }
      const key = `${toolName}:${clientId}`;
      const now = Date.now();
      const record = store.get(key);
      if (!record || now > record.resetTime) {
        store.set(key, { count: 1, resetTime: now + limiter.window });
        return true;
      }
      if (record.count >= limiter.rpm) {
        return false;
      }
      record.count += 1;
      return true;
    },
  };
}

async function metricSemanticSearch(query: string, platform?: PlatformId): Promise<MetricDef[]> {
  const normalized = query.toLowerCase();
  return sampleMetrics
    .filter((metric) => {
      if (platform && metric.platform !== platform) {
        return false;
      }
      const haystack = `${metric.name} ${metric.definition}`.toLowerCase();
      return haystack.includes(normalized);
    })
    .slice(0, 10);
}

type FaultyPayload = { fail?: string } | undefined;

function shouldInjectFault(toolName: keyof typeof RATE_LIMITS, payload?: FaultyPayload): boolean {
  if (!payload?.fail) {
    return false;
  }
  if (process.env.NODE_ENV === "production") {
    return false;
  }
  switch (payload.fail) {
    case "pc_timeout":
      return toolName === "metrics.search";
    case "db_timeout":
      return toolName === "metrics.get" || toolName === "rate_limits.list";
    case "random_5xx":
      return Math.random() < 0.1;
    default:
      return false;
  }
}

async function injectFault(faultType: string): Promise<never> {
  switch (faultType) {
    case "pc_timeout":
    case "db_timeout":
      await new Promise((resolve) => setTimeout(resolve, 31_000));
      throw new Error(`${faultType} simulated timeout`);
    case "random_5xx":
      throw new Error("Random service failure");
    default:
      throw new Error("Unknown fault injection");
  }
}

const realEstateZillowUrl = process.env.REALESTATE_ZILLOW_URL || "http://localhost:5052";
const realEstateSecondaryUrl =
  process.env.REALESTATE_SECONDARY_URL || "http://localhost:5053";

export interface ServerConfig {
  bearerToken?: string;
}

export function createMcpServer(config?: ServerConfig): FastifyInstance {
  const fastify = Fastify({ logger: true });
  const rateLimiter = createRateLimitChecker();
  const bearerToken = config?.bearerToken || process.env.MCP_BEARER_TOKEN || "dev-token-12345";

  fastify.setErrorHandler((error, _req, reply) => {
    const err = error as FastifyError & { validation?: unknown };
    const statusCode = err.validation ? 400 : 500;
    const errorType = err.validation ? "validation_error" : "internal_error";
    reply.status(statusCode).send({
      error: {
        type: errorType,
        message: err.message,
        ...(err.validation && { details: err.validation }),
      },
    });
  });

  fastify.addHook("onRequest", async (req, reply) => {
    if (req.url === "/health") {
      return;
    }
    const auth = req.headers["authorization"];
    if (!auth || !auth.toString().startsWith("Bearer ")) {
      reply.code(401).send({ error: { type: "unauthorized", message: "Missing or invalid bearer token" } });
      return;
    }
    const token = auth.toString().slice("Bearer ".length);
    if (token !== bearerToken) {
      reply.code(401).send({ error: { type: "unauthorized", message: "Invalid bearer token" } });
    }
  });

  fastify.post<{ Body: MetricsGetInput }>("/tools/metrics.get", async (req, reply) => {
    if (!rateLimiter.check("metrics.get", req.ip)) {
      reply.code(429).send({ error: { type: "rate_limited", message: "Rate limit exceeded", retry_after_s: 60 } });
      return;
    }
    const { platform, names } = metricsGetZ.parse(req.body);
    const data = await sqlAdapters.metricsGet(platform, names);
    reply.header("Cache-Control", "public, max-age=300, stale-while-revalidate=120");
    return reply.send(envelope(data, 3600));
  });

  fastify.post<{ Body: MetricsSearchInput }>("/tools/metrics.search", async (req, reply) => {
    if (shouldInjectFault("metrics.search", req.body)) {
      await injectFault(req.body.fail!);
    }
    if (!rateLimiter.check("metrics.search", req.ip)) {
      reply.code(429).send({ error: { type: "rate_limited", message: "Rate limit exceeded", retry_after_s: 60 } });
      return;
    }
    const { query, platform } = metricsSearchZ.parse(req.body);
    const data = await metricSemanticSearch(query, platform);
    reply.header("Cache-Control", "public, max-age=300, stale-while-revalidate=120");
    return reply.send(envelope(data, 900));
  });

  fastify.post<{ Body: RateLimitsInput }>("/tools/rate_limits.list", async (req, reply) => {
    if (!rateLimiter.check("rate_limits.list", req.ip)) {
      reply.code(429).send({ error: { type: "rate_limited", message: "Rate limit exceeded", retry_after_s: 60 } });
      return;
    }
    const { platform } = rateLimitsListZ.parse(req.body);
    const data = await sqlAdapters.rateLimitsList(platform);
    reply.header("Cache-Control", "public, max-age=3600, stale-while-revalidate=7200");
    return reply.send(envelope(data, 86_400));
  });

  fastify.post<{ Body: ComplianceInput }>("/tools/compliance.list", async (req, reply) => {
    if (!rateLimiter.check("compliance.list", req.ip)) {
      reply.code(429).send({ error: { type: "rate_limited", message: "Rate limit exceeded", retry_after_s: 60 } });
      return;
    }
    const { platform } = complianceListZ.parse(req.body);
    const data = await sqlAdapters.complianceList(platform);
    reply.header("Cache-Control", "public, max-age=86400, stale-while-revalidate=43200");
    return reply.send(envelope(data, 604_800));
  });

  fastify.post<{ Body: TrendsInput }>("/tools/trends.top", async (req, reply) => {
    if (!rateLimiter.check("trends.top", req.ip)) {
      reply.code(429).send({ error: { type: "rate_limited", message: "Rate limit exceeded", retry_after_s: 60 } });
      return;
    }
    const body = trendsTopZ.parse(req.body);
    const data = await sqlAdapters.trendsTop(body.platform, body.region, body.limit);
    reply.header("Cache-Control", "public, max-age=60, stale-while-revalidate=120");
    return reply.send(envelope(data, 300));
  });

  fastify.post<{ Body: InfluencersInput }>("/tools/influencers.search", async (req, reply) => {
    if (!rateLimiter.check("influencers.search", req.ip)) {
      reply.code(429).send({ error: { type: "rate_limited", message: "Rate limit exceeded", retry_after_s: 60 } });
      return;
    }
    const body = influencersSearchZ.parse(req.body);
    const data = await sqlAdapters.influencersSearchByCategory(
      body.platform,
      body.category,
      body.min_credibility
    );
    reply.header("Cache-Control", "public, max-age=300, stale-while-revalidate=120");
    return reply.send(envelope(data, 3600));
  });

  fastify.post<{ Body: RealEstateScrapeInput }>("/tools/real_estate.scrape", async (req, reply) => {
    if (!rateLimiter.check("real_estate.scrape", req.ip)) {
      reply
        .code(429)
        .send({ error: { type: "rate_limited", message: "Rate limit exceeded", retry_after_s: 60 } });
      return;
    }
    const body = realEstateScrapeZ.parse(req.body);
    try {
      const upstream = await ky
        .post(`${realEstateZillowUrl}/scrape-properties`, { json: body, timeout: 30_000 })
        .json();
      reply.header("Cache-Control", "public, max-age=120, stale-while-revalidate=60");
      return reply.send(envelope(upstream, 300));
    } catch (error) {
      req.log.error(error);
      return reply.status(502).send({
        error: {
          type: "upstream_error",
          message: `Failed to reach Zillow scraper at ${realEstateZillowUrl}`,
        },
      });
    }
  });

  fastify.post<{ Body: PropertyIntelligence }>("/tools/real_estate.package", async (req, reply) => {
    if (!rateLimiter.check("real_estate.package", req.ip)) {
      reply
        .code(429)
        .send({ error: { type: "rate_limited", message: "Rate limit exceeded", retry_after_s: 60 } });
      return;
    }
    const payload = req.body;
    if (!payload?.property?.zpid) {
      reply.status(400).send({
        error: { type: "validation_error", message: "Property intelligence payload required" },
      });
      return;
    }
    try {
      const upstream = await ky
        .post(`${realEstateSecondaryUrl}/process-overflow-lead`, { json: payload, timeout: 30_000 })
        .json();
      reply.header("Cache-Control", "private, max-age=0");
      return reply.send(envelope(upstream, 600));
    } catch (error) {
      req.log.error(error);
      return reply.status(502).send({
        error: {
          type: "upstream_error",
          message: `Failed to reach Secondary Market Eve at ${realEstateSecondaryUrl}`,
        },
      });
    }
  });

  fastify.get("/health", async (_req, reply) => {
    return reply.send({
      status: "healthy",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
      features: ["metrics", "rate_limits", "compliance", "trends", "influencers"],
    });
  });

  return fastify;
}

export interface StartOptions extends ServerConfig {
  port?: number;
  host?: string;
}

export async function startMcpServer(options?: StartOptions): Promise<FastifyInstance> {
  const server = createMcpServer({ bearerToken: options?.bearerToken });
  const envPort = process.env.PORT ? Number(process.env.PORT) : undefined;
  const port = options?.port ?? envPort ?? 8080;
  const host = options?.host ?? process.env.HOST ?? "0.0.0.0";
  await server.listen({ port, host });
  server.log.info(`🚀 Social Media Knowledge MCP Server running on http://${host}:${port}`);
  server.log.info("🔐 Bearer token required for all endpoints except /health");
  server.log.info("📊 Rate limiting enabled per tool");
  return server;
}

if (require.main === module) {
  startMcpServer().catch((error) => {
    console.error("Failed to start MCP server", error);
    process.exit(1);
  });
}
