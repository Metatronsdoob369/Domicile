import OpenAI from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';

// Configuration for performance optimizations
interface PerformanceConfig {
  maxConcurrentLLMCalls: number;
  embeddingBatchSize: number;
  cacheEnabled: boolean;
  cacheTTL: number; // Time to live in milliseconds
  retryAttempts: number;
  retryDelay: number;
}

const DEFAULT_CONFIG: PerformanceConfig = {
  maxConcurrentLLMCalls: 5,
  embeddingBatchSize: 10,
  cacheEnabled: true,
  cacheTTL: 1000 * 60 * 5, // 5 minutes
  retryAttempts: 3,
  retryDelay: 1000 // 1 second
};

// In-memory cache for embeddings and LLM responses
interface CacheEntry {
  data: any;
  timestamp: number;
  ttl: number;
}

class PerformanceCache {
  private cache = new Map<string, CacheEntry>();

  set(key: string, data: any, ttl: number = DEFAULT_CONFIG.cacheTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get(key: string): any | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

export class PerformanceOptimizer {
  private config: PerformanceConfig;
  private cache: PerformanceCache;
  private openai: OpenAI | null = null;
  private pinecone: Pinecone | null = null;
  private activeLLMCalls = 0;
  private llmCallQueue: Array<() => Promise<any>> = [];

  constructor(config: Partial<PerformanceConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.cache = new PerformanceCache();

    // Initialize clients if API keys are available
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }

    if (process.env.PINECONE_API_KEY) {
      this.pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
    }

    // Periodic cache cleanup
    setInterval(() => this.cache.cleanup(), 60000); // Clean every minute
  }

  /**
   * Generate embeddings in batches for better performance
   */
  async generateEmbeddingsBatch(texts: string[]): Promise<number[][]> {
    if (!this.openai) {
      console.warn('OpenAI not available, returning zero vectors');
      return texts.map(() => new Array(1536).fill(0));
    }

    const batches = this.chunkArray(texts, this.config.embeddingBatchSize);
    const allEmbeddings: number[][] = [];

    for (const batch of batches) {
      try {
        // Check cache first
        const cachedBatch: number[][] = [];
        const uncachedTexts: string[] = [];
        const uncachedIndices: number[] = [];

        batch.forEach((text, index) => {
          const cached = this.cache.get(`embedding:${text}`);
          if (cached) {
            cachedBatch[index] = cached;
          } else {
            uncachedTexts.push(text);
            uncachedIndices.push(index);
          }
        });

        // Generate embeddings for uncached texts
        if (uncachedTexts.length > 0) {
          const response = await this.openai!.embeddings.create({
            model: 'text-embedding-3-small',
            input: uncachedTexts,
            dimensions: 1536
          });

          // Store in cache and build result
          response.data.forEach((item, i) => {
            const embedding = item.embedding;
            const text = uncachedTexts[i];
            const resultIndex = uncachedIndices[i];

            this.cache.set(`embedding:${text}`, embedding);
            cachedBatch[resultIndex] = embedding;
          });
        }

        allEmbeddings.push(...cachedBatch);

      } catch (error) {
        console.error('Batch embedding generation failed:', error);
        // Fallback to zero vectors
        const zeroVectors = batch.map(() => new Array(1536).fill(0));
        allEmbeddings.push(...zeroVectors);
      }
    }

    return allEmbeddings;
  }

  /**
   * Execute LLM calls with concurrency control and caching
   */
  async executeLLMCalls(calls: Array<{
    messages: any[];
    model?: string;
    temperature?: number;
    cacheKey?: string;
  }>): Promise<any[]> {
    if (!this.openai) {
      throw new Error('OpenAI client not initialized');
    }

    const results: any[] = [];
    const promises: Promise<any>[] = [];

    for (const call of calls) {
      const promise = this.executeLLMCall(call);
      promises.push(promise);
    }

    // Execute with concurrency control
    const batches = this.chunkArray(promises, this.config.maxConcurrentLLMCalls);

    for (const batch of batches) {
      const batchResults = await Promise.allSettled(batch);
      results.push(...batchResults.map(result =>
        result.status === 'fulfilled' ? result.value : null
      ));
    }

    return results;
  }

  private async executeLLMCall(call: {
    messages: any[];
    model?: string;
    temperature?: number;
    cacheKey?: string;
  }): Promise<any> {
    const cacheKey = call.cacheKey || this.generateCacheKey(call);

    // Check cache
    if (this.config.cacheEnabled) {
      const cached = this.cache.get(`llm:${cacheKey}`);
      if (cached) {
        return cached;
      }
    }

    // Execute with retry logic
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < this.config.retryAttempts; attempt++) {
      try {
        const response = await this.openai!.chat.completions.create({
          model: call.model || 'gpt-4',
          messages: call.messages,
          temperature: call.temperature || 0.3,
          max_tokens: 1000
        });

        const result = response.choices[0]?.message?.content;

        // Cache successful result
        if (this.config.cacheEnabled && result) {
          this.cache.set(`llm:${cacheKey}`, result);
        }

        return result;

      } catch (error: any) {
        lastError = error;

        if (attempt < this.config.retryAttempts - 1) {
          // Exponential backoff
          const delay = this.config.retryDelay * Math.pow(2, attempt);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError || new Error('LLM call failed after all retries');
  }

  /**
   * Batch store agents in Pinecone with optimized embedding generation
   */
  async batchStoreAgents(agents: any[]): Promise<void> {
    if (!this.pinecone) {
      console.warn('Pinecone not available, skipping agent storage');
      return;
    }

    try {
      const index = this.pinecone.index(process.env.PINECONE_INDEX || 'agent-enhancements');
      const namespace = index.namespace(process.env.PINECONE_NAMESPACE || 'social-media-agent');

      // Prepare texts for batch embedding
      const texts = agents.map(agent =>
        `${agent.objective} ${agent.implementation_plan.modules.join(' ')}`
      );

      // Generate embeddings in batch
      const embeddings = await this.generateEmbeddingsBatch(texts);

      // Prepare records for batch upsert
      const records = agents.map((agent, i) => ({
        id: agent.enhancement_area.toLowerCase().replace(/\s+/g, '-'),
        values: embeddings[i],
        metadata: {
          enhancement_area: agent.enhancement_area,
          objective: agent.objective,
          modules: agent.implementation_plan.modules.join(','),
          depends_on: agent.depends_on.join(','),
          sources: agent.sources.join(','),
          timestamp: new Date().toISOString(),
          contract_json: JSON.stringify(agent)
        }
      }));

      // Batch upsert to Pinecone
      await namespace.upsert(records);

      console.log(`✅ Batch stored ${agents.length} agents in Pinecone`);

    } catch (error) {
      console.error('Batch agent storage failed:', error);
      throw error;
    }
  }

  /**
   * Optimized search with cached results
   */
  async optimizedSearch(query: string, topK: number = 5): Promise<any[]> {
    if (!this.pinecone) {
      console.warn('Pinecone not available, returning empty results');
      return [];
    }

    const cacheKey = `search:${query}:${topK}`;
    const cached = this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const index = this.pinecone.index(process.env.PINECONE_INDEX || 'agent-enhancements');
      const namespace = index.namespace(process.env.PINECONE_NAMESPACE || 'social-media-agent');

      // Generate query embedding
      const queryEmbedding = await this.generateEmbeddingsBatch([query]);
      if (queryEmbedding.length === 0) {
        return [];
      }

      const results = await namespace.query({
        topK,
        includeMetadata: true,
        vector: queryEmbedding[0]
      });

      const formattedResults = (results.matches || []).map(match => ({
        id: match.id,
        score: match.score || 0,
        metadata: match.metadata as any
      }));

      // Cache results
      this.cache.set(cacheKey, formattedResults);

      return formattedResults;

    } catch (error) {
      console.error('Optimized search failed:', error);
      return [];
    }
  }

  /**
   * Memory-efficient processing for large datasets
   */
  async processLargeDataset<T, R>(
    items: T[],
    processor: (batch: T[]) => Promise<R[]>,
    batchSize: number = 10
  ): Promise<R[]> {
    const results: R[] = [];
    const batches = this.chunkArray(items, batchSize);

    for (const batch of batches) {
      try {
        const batchResults = await processor(batch);
        results.push(...batchResults);

        // Force garbage collection hint (if available)
        if (global.gc) {
          global.gc();
        }

      } catch (error) {
        console.error('Batch processing failed:', error);
        // Continue with next batch rather than failing completely
      }
    }

    return results;
  }

  /**
   * Get performance metrics
   */
  getMetrics(): {
    cacheSize: number;
    activeLLMCalls: number;
    queuedLLMCalls: number;
  } {
    return {
      cacheSize: this.cache.size(),
      activeLLMCalls: this.activeLLMCalls,
      queuedLLMCalls: this.llmCallQueue.length
    };
  }

  /**
   * Clear all caches
   */
  clearCache(): void {
    this.cache.clear();
  }

  private generateCacheKey(call: any): string {
    // Generate deterministic cache key from call parameters
    const keyData = JSON.stringify({
      messages: call.messages,
      model: call.model,
      temperature: call.temperature
    });
    return require('crypto').createHash('md5').update(keyData).digest('hex');
  }

  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }
}

// Export singleton instance
export const performanceOptimizer = new PerformanceOptimizer();

// Export for testing
export { PerformanceCache, DEFAULT_CONFIG };
export type { PerformanceConfig, CacheEntry };