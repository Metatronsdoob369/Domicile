interface PerformanceConfig {
    maxConcurrentLLMCalls: number;
    embeddingBatchSize: number;
    cacheEnabled: boolean;
    cacheTTL: number;
    retryAttempts: number;
    retryDelay: number;
}
declare const DEFAULT_CONFIG: PerformanceConfig;
interface CacheEntry {
    data: any;
    timestamp: number;
    ttl: number;
}
declare class PerformanceCache {
    private cache;
    set(key: string, data: any, ttl?: number): void;
    get(key: string): any | null;
    clear(): void;
    size(): number;
    cleanup(): void;
}
export declare class PerformanceOptimizer {
    private config;
    private cache;
    private openai;
    private pinecone;
    private activeLLMCalls;
    private llmCallQueue;
    constructor(config?: Partial<PerformanceConfig>);
    /**
     * Generate embeddings in batches for better performance
     */
    generateEmbeddingsBatch(texts: string[]): Promise<number[][]>;
    /**
     * Execute LLM calls with concurrency control and caching
     */
    executeLLMCalls(calls: Array<{
        messages: any[];
        model?: string;
        temperature?: number;
        cacheKey?: string;
    }>): Promise<any[]>;
    private executeLLMCall;
    /**
     * Batch store agents in Pinecone with optimized embedding generation
     */
    batchStoreAgents(agents: any[]): Promise<void>;
    /**
     * Optimized search with cached results
     */
    optimizedSearch(query: string, topK?: number): Promise<any[]>;
    /**
     * Memory-efficient processing for large datasets
     */
    processLargeDataset<T, R>(items: T[], processor: (batch: T[]) => Promise<R[]>, batchSize?: number): Promise<R[]>;
    /**
     * Get performance metrics
     */
    getMetrics(): {
        cacheSize: number;
        activeLLMCalls: number;
        queuedLLMCalls: number;
    };
    /**
     * Clear all caches
     */
    clearCache(): void;
    private generateCacheKey;
    private chunkArray;
}
export declare const performanceOptimizer: PerformanceOptimizer;
export { PerformanceCache, DEFAULT_CONFIG };
export type { PerformanceConfig, CacheEntry };
//# sourceMappingURL=performance-optimizer.d.ts.map