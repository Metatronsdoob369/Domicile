export type PlatformId = "twitter" | "instagram" | "tiktok" | "facebook" | "linkedin" | "youtube" | "threads" | "pinterest";
export interface SourceRef {
    id: string;
    title: string;
    url?: string;
    retrieved_at: string;
}
export interface MetricDef {
    platform: PlatformId;
    name: string;
    display_name: string;
    definition: string;
    formula?: string;
    unit: "ratio" | "percent" | "count" | "ms" | "s";
    window?: "per_post" | "24h" | "7d" | "28d" | "lifetime";
    dimensions?: string[];
    notes?: string[];
    sources: SourceRef[];
    updated_at: string;
    version: string;
}
export interface RateLimit {
    platform: PlatformId;
    endpoint: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    limit: number;
    window_seconds: number;
    auth_scope: string;
    notes?: string[];
    sources: SourceRef[];
    updated_at: string;
    version: string;
}
export interface ComplianceRule {
    platform: PlatformId | "global";
    rule_id: string;
    description: string;
    severity: "low" | "medium" | "high";
    guidance: string[];
    references: SourceRef[];
    updated_at: string;
    version: string;
}
export interface TrendSignal {
    platform: PlatformId;
    region?: string;
    tag_or_sound: string;
    momentum_score: number;
    sample_posts: string[];
    sources: SourceRef[];
    observed_at: string;
}
export interface InfluencerNode {
    platform: PlatformId;
    handle: string;
    follower_count: number;
    topical_vectors?: number[];
    categories: string[];
    credibility_score: number;
    sources: SourceRef[];
    updated_at: string;
}
export interface MCPToolResponse<T> {
    data: T;
    cache_ttl_s: number;
    version: string;
    sources: SourceRef[];
}
//# sourceMappingURL=knowledge.types.d.ts.map