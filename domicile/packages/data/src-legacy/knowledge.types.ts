// knowledge.types.ts - Core schemas for social media knowledge access layer
export type PlatformId = "twitter" | "instagram" | "tiktok" | "facebook" | "linkedin" | "youtube" | "threads" | "pinterest";

export interface SourceRef {
  id: string;                  // content hash or DOI-like id
  title: string;
  url?: string;
  retrieved_at: string;        // ISO 8601
}

export interface MetricDef {
  platform: PlatformId;
  name: string;                // e.g., "engagement_rate"
  display_name: string;        // "Engagement Rate"
  definition: string;          // precise text definition
  formula?: string;            // e.g., "(likes+comments+shares)/impressions"
  unit: "ratio" | "percent" | "count" | "ms" | "s";
  window?: "per_post" | "24h" | "7d" | "28d" | "lifetime";
  dimensions?: string[];       // e.g.,
  notes?: string[];
  sources: SourceRef[];
  updated_at: string;
  version: string;             // semver for the record itself
}

export interface RateLimit {
  platform: PlatformId;
  endpoint: string;            // e.g., "/tweets/search"
  method: "GET" | "POST" | "PUT" | "DELETE";
  limit: number;
  window_seconds: number;
  auth_scope: string;          // e.g., "app", "user", "elevated"
  notes?: string[];
  sources: SourceRef[];
  updated_at: string;
  version: string;
}

export interface ComplianceRule {
  platform: PlatformId | "global";
  rule_id: string;             // stable id, e.g., "ftc_ad_disclosure"
  description: string;
  severity: "low" | "medium" | "high";
  guidance: string[];          // concrete "do this" steps
  references: SourceRef[];
  updated_at: string;
  version: string;
}

export interface TrendSignal {
  platform: PlatformId;
  region?: string;             // ISO 3166-1 alpha-2/alpha-3
  tag_or_sound: string;        // hashtag, audio id, etc.
  momentum_score: number;      // 0..1 normalized
  sample_posts: string[];      // post ids/links (non-PII)
  sources: SourceRef[];
  observed_at: string;
}

export interface InfluencerNode {
  platform: PlatformId;
  handle: string;
  follower_count: number;
  topical_vectors?: number[];  // optional embedding preview
  categories: string[];        // niches/taxonomy
  credibility_score: number;   // 0..1
  sources: SourceRef[];
  updated_at: string;
}

// MCP Tool Response Wrapper
export interface MCPToolResponse<T> {
  data: T;
  cache_ttl_s: number;
  version: string;
  sources: SourceRef[];
}
