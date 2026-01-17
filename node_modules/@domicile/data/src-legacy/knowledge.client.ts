// knowledge.client.ts - Agent client for MCP knowledge access
import ky from "ky";
import { z } from "zod";
import type { MetricDef, RateLimit, ComplianceRule, TrendSignal, InfluencerNode, PlatformId, MCPToolResponse } from "./knowledge.types";

// ---- Prompt Injection Protection
const PROMPT_INJECTION_PATTERNS = [
  /ignore.*previous.*instructions/i,
  /forget.*system.*prompt/i,
  /override.*safety/i,
  /bypass.*restrictions/i,
  /execute.*code/i,
  /system.*command/i,
  /sql.*injection/i,
  /drop.*table/i,
  /delete.*from/i,
];

// Sanitize text to prevent prompt injection
function sanitizeText(text: string): string {
  let sanitized = text;

  // Remove or escape dangerous patterns
  for (const pattern of PROMPT_INJECTION_PATTERNS) {
    sanitized = sanitized.replace(pattern, '[FILTERED]');
  }

  // Escape LLM control tokens (common in various models)
  sanitized = sanitized.replace(/<\|/g, '&lt;|');
  sanitized = sanitized.replace(/\|>/g, '|&gt;');

  // Limit length to prevent DoS
  if (sanitized.length > 10000) {
    sanitized = sanitized.substring(0, 10000) + '...[TRUNCATED]';
  }

  return sanitized;
}

// ---- Security: Input validation and sanitization
function validateSearchQuery(query: string): string {
  const sanitized = sanitizeText(query);

  if (sanitized.length < 2) {
    throw new Error('Query too short');
  }

  if (sanitized.includes('[FILTERED]')) {
    throw new Error('Query contains potentially dangerous content');
  }

  return sanitized;
}

// Base MCP response validator
const mcpResponseZ = z.object({
  data: z.any(),
  cache_ttl_s: z.number().int().positive(),
  version: z.string(),
  sources: z.array(z.object({
    id: z.string(),
    title: z.string(),
    url: z.string().optional(),
    retrieved_at: z.string()
  }))
});

// Client configuration
const MCP_BASE_URL = process.env.MCP_SERVER_URL || "http://localhost:8080";

export class SocialKnowledgeClient {
  private baseUrl: string;

  constructor(baseUrl: string = MCP_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Metrics API
  async getMetrics(platform: PlatformId, names?: string[]): Promise<MCPToolResponse<MetricDef[]>> {
    const response = await ky.post(`${this.baseUrl}/tools/metrics.get`, {
      json: { platform, names },
      timeout: 10000
    }).json();

    return mcpResponseZ.parse(response) as MCPToolResponse<MetricDef[]>;
  }

  async searchMetrics(query: string, platform?: PlatformId): Promise<MCPToolResponse<MetricDef[]>> {
    const safeQuery = validateSearchQuery(query);

    const response = await ky.post(`${this.baseUrl}/tools/metrics.search`, {
      json: { query: safeQuery, platform },
      timeout: 15000 // Semantic search can be slower
    }).json();

    return mcpResponseZ.parse(response) as MCPToolResponse<MetricDef[]>;
  }

  // Rate Limits API
  async getRateLimits(platform: PlatformId): Promise<MCPToolResponse<RateLimit[]>> {
    const response = await ky.post(`${this.baseUrl}/tools/rate_limits.list`, {
      json: { platform }
    }).json();

    return mcpResponseZ.parse(response) as MCPToolResponse<RateLimit[]>;
  }

  // Compliance API
  async getComplianceRules(platform: PlatformId | "global"): Promise<MCPToolResponse<ComplianceRule[]>> {
    const response = await ky.post(`${this.baseUrl}/tools/compliance.list`, {
      json: { platform }
    }).json();

    return mcpResponseZ.parse(response) as MCPToolResponse<ComplianceRule[]>;
  }

  // Trends API
  async getTopTrends(platform: PlatformId, region?: string, limit: number = 20): Promise<MCPToolResponse<TrendSignal[]>> {
    const response = await ky.post(`${this.baseUrl}/tools/trends.top`, {
      json: { platform, region, limit }
    }).json();

    return mcpResponseZ.parse(response) as MCPToolResponse<TrendSignal[]>;
  }

  // Influencers API
  async searchInfluencers(
    platform: PlatformId,
    category?: string,
    minCredibility: number = 0.6
  ): Promise<MCPToolResponse<InfluencerNode[]>> {
    const response = await ky.post(`${this.baseUrl}/tools/influencers.search`, {
      json: { platform, category, min_credibility: minCredibility }
    }).json();

    return mcpResponseZ.parse(response) as MCPToolResponse<InfluencerNode[]>;
  }

  // Health check
  async healthCheck(): Promise<{ status: string; version: string }> {
    const response = await ky.get(`${this.baseUrl}/health`).json();
    return z.object({
      status: z.string(),
      version: z.string()
    }).parse(response);
  }
}

// Convenience functions for direct use
const defaultClient = new SocialKnowledgeClient();

export const getMetrics = (platform: PlatformId, names?: string[]) =>
  defaultClient.getMetrics(platform, names);

export const searchMetrics = (query: string, platform?: PlatformId) =>
  defaultClient.searchMetrics(query, platform);

export const getRateLimits = (platform: PlatformId) =>
  defaultClient.getRateLimits(platform);

export const getComplianceRules = (platform: PlatformId | "global") =>
  defaultClient.getComplianceRules(platform);

export const getTopTrends = (platform: PlatformId, region?: string, limit?: number) =>
  defaultClient.getTopTrends(platform, region, limit);

export const searchInfluencers = (platform: PlatformId, category?: string, minCredibility?: number) =>
  defaultClient.searchInfluencers(platform, category, minCredibility);

export const healthCheck = () => defaultClient.healthCheck();
