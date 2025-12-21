"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleInfluencers = exports.sampleTrends = exports.sampleComplianceRules = exports.sampleRateLimits = exports.sampleMetrics = void 0;
// Sample metrics data
exports.sampleMetrics = [
    {
        platform: "twitter",
        name: "engagement_rate",
        display_name: "Engagement Rate",
        definition: "Total interactions divided by impressions for a post.",
        formula: "(likes + replies + retweets + quotes) / impressions",
        unit: "ratio",
        window: "per_post",
        dimensions: ["region", "device"],
        notes: ["Normalize by impressions to compare across accounts."],
        sources: [
            {
                id: "sprout_2025_metrics",
                title: "SproutSocial Metrics 2025",
                url: "https://sproutsocial.com/insights/social-media-metrics/",
                retrieved_at: "2025-10-10T00:00:00Z"
            }
        ],
        updated_at: "2025-10-15T00:00:00Z",
        version: "1.0.0"
    },
    {
        platform: "instagram",
        name: "reach",
        display_name: "Reach",
        definition: "Number of unique accounts that have seen the post.",
        unit: "count",
        window: "per_post",
        dimensions: ["region", "age_group"],
        sources: [
            {
                id: "databox_2024",
                title: "Social Media Analytics Tools",
                url: "https://databox.com/social-media-metrics-that-matter",
                retrieved_at: "2025-01-15T00:00:00Z"
            }
        ],
        updated_at: "2025-10-15T00:00:00Z",
        version: "1.0.0"
    }
];
// Sample rate limits
exports.sampleRateLimits = [
    {
        platform: "twitter",
        endpoint: "/tweets/search",
        method: "GET",
        limit: 300,
        window_seconds: 900,
        auth_scope: "app",
        notes: ["Rate limit for search API"],
        sources: [
            {
                id: "twitter_api_docs",
                title: "Twitter API v2 Documentation",
                url: "https://developer.twitter.com/en/docs/twitter-api/rate-limits",
                retrieved_at: "2025-10-10T00:00:00Z"
            }
        ],
        updated_at: "2025-10-15T00:00:00Z",
        version: "1.0.0"
    }
];
// Sample compliance rules
exports.sampleComplianceRules = [
    {
        platform: "global",
        rule_id: "ftc_ad_disclosure",
        description: "Federal Trade Commission advertisement disclosure requirements",
        severity: "high",
        guidance: [
            "Clearly disclose sponsored content",
            "Use #ad or #sponsored hashtag",
            "Place disclosure prominently"
        ],
        references: [
            {
                id: "ftc_guidelines",
                title: "FTC Endorsement Guidelines",
                url: "https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking",
                retrieved_at: "2025-10-10T00:00:00Z"
            }
        ],
        updated_at: "2025-10-15T00:00:00Z",
        version: "1.0.0"
    }
];
// Sample trends
exports.sampleTrends = [
    {
        platform: "tiktok",
        tag_or_sound: "#DanceChallenge2025",
        momentum_score: 0.85,
        sample_posts: ["post_123", "post_456"],
        sources: [
            {
                id: "tiktok_trends_api",
                title: "TikTok Trending Hashtags",
                retrieved_at: "2025-10-15T12:00:00Z"
            }
        ],
        observed_at: "2025-10-15T12:00:00Z"
    }
];
// Sample influencers
exports.sampleInfluencers = [
    {
        platform: "instagram",
        handle: "fitness_guru_2025",
        follower_count: 500000,
        categories: ["fitness", "health", "motivation"],
        credibility_score: 0.92,
        sources: [
            {
                id: "influencer_db_2025",
                title: "Social Media Influencer Database",
                retrieved_at: "2025-10-15T00:00:00Z"
            }
        ],
        updated_at: "2025-10-15T00:00:00Z"
    }
];
//# sourceMappingURL=sample-data.js.map