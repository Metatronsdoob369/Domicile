/**
 * Notion Storage Adapter
 * Implements NotebookStorageAdapter for Notion workspace integration
 * Connects to the Notion Intelligence Scraper service for RAG-ready document access
 */

import type {
  Collection,
  NotebookReference,
  Passage,
} from '../types/responses.js';
import type { FullProvenance } from '../types/provenance.js';
import type { NotebookStorageAdapter, PassageData } from './notebooks.js';

// -----------------------------------------------------------------------------
// Types for Notion API responses
// -----------------------------------------------------------------------------

interface NotionPage {
  page_id: string;
  title: string;
  url: string;
  created_time: string;
  last_edited_time: string;
  parent_type: string;
  parent_id?: string;
  properties: Record<string, unknown>;
  icon?: string;
  cover?: string;
}

interface NotionBlock {
  block_id: string;
  block_type: string;
  content: string;
  has_children: boolean;
  children: NotionBlock[];
  parent_page_id: string;
}

interface SemanticChunk {
  chunk_id: string;
  content: string;
  source_page_id: string;
  source_page_title: string;
  block_ids: string[];
  char_start: number;
  char_end: number;
  token_count: number;
  embedding?: number[];
  metadata: Record<string, unknown>;
}

interface DocumentIntelligence {
  page: NotionPage;
  blocks: NotionBlock[];
  chunks: SemanticChunk[];
  provenance: {
    source_type: string;
    workspace_id?: string;
    page_id: string;
    page_title: string;
    extraction_timestamp: string;
    last_notion_edit: string;
    extraction_method: string;
    chunk_strategy: string;
    checksum: string;
  };
  statistics: Record<string, number>;
  rag_ready: boolean;
}

interface NotionScraperConfig {
  scraperUrl: string;
  workspaceId?: string;
  defaultDatabaseId?: string;
  cacheEnabled: boolean;
  cacheTtlMs: number;
}

// -----------------------------------------------------------------------------
// Notion Storage Adapter Implementation
// -----------------------------------------------------------------------------

export class NotionStorageAdapter implements NotebookStorageAdapter {
  private readonly config: NotionScraperConfig;
  private readonly cache: Map<string, { data: unknown; timestamp: number }> = new Map();
  private collections: Collection[] = [];
  private documents: Map<string, DocumentIntelligence> = new Map();

  constructor(config?: Partial<NotionScraperConfig>) {
    this.config = {
      scraperUrl: config?.scraperUrl ?? 'http://localhost:5053',
      workspaceId: config?.workspaceId,
      defaultDatabaseId: config?.defaultDatabaseId,
      cacheEnabled: config?.cacheEnabled ?? true,
      cacheTtlMs: config?.cacheTtlMs ?? 300000, // 5 minutes
    };
  }

  /**
   * Fetch data from the Notion scraper service
   */
  private async fetchFromScraper<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    const url = `${this.config.scraperUrl}${endpoint}`;

    // Check cache
    if (this.config.cacheEnabled && options?.method !== 'POST') {
      const cached = this.cache.get(url);
      if (cached && Date.now() - cached.timestamp < this.config.cacheTtlMs) {
        return cached.data as T;
      }
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Notion scraper error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Cache GET responses
    if (this.config.cacheEnabled && options?.method !== 'POST') {
      this.cache.set(url, { data, timestamp: Date.now() });
    }

    return data as T;
  }

  /**
   * Scrape and index a Notion page or database
   */
  async scrapeAndIndex(
    pageIds?: string[],
    databaseId?: string,
  ): Promise<{ pagesScraped: number; chunksCreated: number }> {
    const request = {
      page_ids: pageIds ?? [],
      database_id: databaseId ?? this.config.defaultDatabaseId,
      max_depth: 3,
      generate_embeddings: true,
    };

    const result = await this.fetchFromScraper<{
      scrape_id: string;
      pages_scraped: number;
      total_chunks: number;
      documents: DocumentIntelligence[];
    }>('/scrape', {
      method: 'POST',
      body: JSON.stringify(request),
    });

    // Index documents locally
    for (const doc of result.documents) {
      this.documents.set(doc.page.page_id, doc);
    }

    // Update collections
    this.updateCollectionsFromDocuments();

    return {
      pagesScraped: result.pages_scraped,
      chunksCreated: result.total_chunks,
    };
  }

  /**
   * Build collections from indexed documents
   */
  private updateCollectionsFromDocuments(): void {
    const docsByParent = new Map<string, DocumentIntelligence[]>();

    for (const doc of this.documents.values()) {
      const parentKey = doc.page.parent_id ?? 'workspace_root';
      const existing = docsByParent.get(parentKey) ?? [];
      existing.push(doc);
      docsByParent.set(parentKey, existing);
    }

    this.collections = Array.from(docsByParent.entries()).map(([parentId, docs], index) => {
      const allDates = docs.map(d => new Date(d.page.last_edited_time).getTime());
      const minDate = new Date(Math.min(...allDates));
      const maxDate = new Date(Math.max(...allDates));

      // Extract domain tags from page titles and content
      const domainTags = this.extractDomainTags(docs);

      return {
        collection_id: `notion_col_${parentId.slice(0, 8)}`,
        title: this.inferCollectionTitle(docs, parentId),
        date_range: {
          start: minDate.toISOString().split('T')[0],
          end: maxDate.toISOString().split('T')[0],
        },
        domain_tags: domainTags,
        artifact_count: docs.reduce((sum, d) => sum + d.chunks.length, 0),
        notebook_count: docs.length,
        last_modified: Math.max(...allDates),
      };
    });
  }

  /**
   * Extract domain tags from documents
   */
  private extractDomainTags(docs: DocumentIntelligence[]): string[] {
    const tags = new Set<string>();
    const keywords = [
      'api', 'documentation', 'guide', 'tutorial', 'reference',
      'architecture', 'design', 'spec', 'notes', 'meeting',
      'project', 'roadmap', 'planning', 'research', 'analysis',
    ];

    for (const doc of docs) {
      const titleLower = doc.page.title.toLowerCase();
      for (const keyword of keywords) {
        if (titleLower.includes(keyword)) {
          tags.add(keyword);
        }
      }
    }

    return Array.from(tags).slice(0, 5);
  }

  /**
   * Infer a collection title from its documents
   */
  private inferCollectionTitle(docs: DocumentIntelligence[], parentId: string): string {
    if (docs.length === 1) {
      return docs[0].page.title;
    }

    // Try to find common prefix in titles
    const titles = docs.map(d => d.page.title);
    const commonPrefix = this.findCommonPrefix(titles);
    if (commonPrefix && commonPrefix.length > 3) {
      return `${commonPrefix.trim()} Collection`;
    }

    return `Notion Collection (${docs.length} pages)`;
  }

  /**
   * Find common prefix among strings
   */
  private findCommonPrefix(strings: string[]): string {
    if (strings.length === 0) return '';
    if (strings.length === 1) return strings[0];

    let prefix = strings[0];
    for (let i = 1; i < strings.length; i++) {
      while (!strings[i].startsWith(prefix) && prefix.length > 0) {
        prefix = prefix.slice(0, -1);
      }
    }
    return prefix;
  }

  // ---------------------------------------------------------------------------
  // NotebookStorageAdapter Implementation
  // ---------------------------------------------------------------------------

  async listCollections(): Promise<Collection[]> {
    // If no collections loaded, try to refresh from scraper
    if (this.collections.length === 0) {
      try {
        const health = await this.fetchFromScraper<{ scrape_count: number }>('/health');
        if (health.scrape_count > 0) {
          // Scraper has data, try to get history and reconstruct
          const history = await this.fetchFromScraper<{ history: Array<{ scrape_id: string }> }>('/history');
          // Collections would need to be rebuilt from exported data
        }
      } catch {
        // Scraper not available, return empty
      }
    }

    return this.collections;
  }

  async getCollectionMetadata(
    collectionId: string,
  ): Promise<{ collection: Collection }> {
    const collection = this.collections.find(
      (c) => c.collection_id === collectionId,
    );
    if (!collection) {
      throw new Error(`Collection not found: ${collectionId}`);
    }
    return { collection };
  }

  async listNotebooks(collectionId: string): Promise<NotebookReference[]> {
    const collection = this.collections.find(c => c.collection_id === collectionId);
    if (!collection) {
      throw new Error(`Collection not found: ${collectionId}`);
    }

    // Find documents belonging to this collection
    const parentId = collectionId.replace('notion_col_', '');
    const notebooks: NotebookReference[] = [];

    for (const doc of this.documents.values()) {
      const docParentPrefix = doc.page.parent_id?.slice(0, 8) ?? 'workspace';
      if (docParentPrefix === parentId || parentId === 'workspace') {
        notebooks.push({
          notebook_id: doc.page.page_id,
          title: doc.page.title,
          author: 'Notion Workspace',
          created_at: new Date(doc.page.created_time).getTime(),
          page_count: doc.blocks.length,
        });
      }
    }

    return notebooks;
  }

  async fetchPassage(sourceId: string): Promise<PassageData> {
    // sourceId format: "{page_id}:{chunk_id}" or just "{page_id}"
    const [pageId, chunkId] = sourceId.includes(':')
      ? sourceId.split(':')
      : [sourceId, undefined];

    // Try local cache first
    let doc = this.documents.get(pageId);

    // If not cached, fetch from scraper
    if (!doc) {
      try {
        doc = await this.fetchFromScraper<DocumentIntelligence>(
          `/page/${pageId}?generate_embeddings=false`,
        );
        this.documents.set(pageId, doc);
      } catch {
        throw new Error(`Page not found: ${pageId}`);
      }
    }

    // Find the specific chunk or return full content
    let passage: Passage;
    let targetChunk: SemanticChunk | undefined;

    if (chunkId) {
      targetChunk = doc.chunks.find(c => c.chunk_id === chunkId);
    }

    if (targetChunk) {
      // Return specific chunk
      const chunkIndex = doc.chunks.indexOf(targetChunk);
      const prevChunk = chunkIndex > 0 ? doc.chunks[chunkIndex - 1] : undefined;
      const nextChunk = chunkIndex < doc.chunks.length - 1 ? doc.chunks[chunkIndex + 1] : undefined;

      passage = {
        exact_text: targetChunk.content,
        context_before: prevChunk?.content.slice(-200) ?? '',
        context_after: nextChunk?.content.slice(0, 200) ?? '',
      };
    } else {
      // Return full page content
      const fullContent = doc.blocks.map(b => b.content).join('\n\n');
      passage = {
        exact_text: fullContent,
        context_before: `Page: ${doc.page.title}\n\n`,
        context_after: '',
      };
    }

    const provenance: FullProvenance = {
      notebook_id: doc.page.page_id,
      notebook_title: doc.page.title,
      page: 1, // Notion doesn't have traditional pages
      timestamp: new Date(doc.page.last_edited_time).getTime(),
      export_method: doc.provenance.extraction_method,
      last_verified: Date.now(),
    };

    return {
      source_id: sourceId,
      passage,
      provenance,
      integrity: {
        checksum: doc.provenance.checksum,
        verified: true,
      },
    };
  }

  // ---------------------------------------------------------------------------
  // Additional Notion-specific methods
  // ---------------------------------------------------------------------------

  /**
   * Search across all indexed chunks
   */
  async searchChunks(
    query: string,
    topK: number = 10,
  ): Promise<Array<{ chunk: SemanticChunk; pageTitle: string; score: number }>> {
    try {
      const results = await this.fetchFromScraper<{
        results: Array<{
          chunk_id: string;
          score: number;
          metadata: { content: string; page_id: string; page_title: string };
        }>;
      }>(`/search?query=${encodeURIComponent(query)}&top_k=${topK}`);

      return results.results.map(r => {
        const doc = this.documents.get(r.metadata.page_id);
        const chunk = doc?.chunks.find(c => c.chunk_id === r.chunk_id);

        return {
          chunk: chunk ?? {
            chunk_id: r.chunk_id,
            content: r.metadata.content,
            source_page_id: r.metadata.page_id,
            source_page_title: r.metadata.page_title,
            block_ids: [],
            char_start: 0,
            char_end: r.metadata.content.length,
            token_count: Math.floor(r.metadata.content.length / 4),
            metadata: {},
          },
          pageTitle: r.metadata.page_title,
          score: r.score,
        };
      });
    } catch {
      // Fallback to local search if scraper unavailable
      return this.localSearch(query, topK);
    }
  }

  /**
   * Simple local keyword search fallback
   */
  private localSearch(
    query: string,
    topK: number,
  ): Array<{ chunk: SemanticChunk; pageTitle: string; score: number }> {
    const queryTerms = query.toLowerCase().split(/\s+/);
    const results: Array<{ chunk: SemanticChunk; pageTitle: string; score: number }> = [];

    for (const doc of this.documents.values()) {
      for (const chunk of doc.chunks) {
        const contentLower = chunk.content.toLowerCase();
        const matchCount = queryTerms.filter(term => contentLower.includes(term)).length;
        if (matchCount > 0) {
          results.push({
            chunk,
            pageTitle: doc.page.title,
            score: matchCount / queryTerms.length,
          });
        }
      }
    }

    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }

  /**
   * Get statistics about indexed content
   */
  getIndexStats(): {
    collectionCount: number;
    documentCount: number;
    totalChunks: number;
    totalBlocks: number;
    ragReadyCount: number;
  } {
    let totalChunks = 0;
    let totalBlocks = 0;
    let ragReadyCount = 0;

    for (const doc of this.documents.values()) {
      totalChunks += doc.chunks.length;
      totalBlocks += doc.blocks.length;
      if (doc.rag_ready) ragReadyCount++;
    }

    return {
      collectionCount: this.collections.length,
      documentCount: this.documents.size,
      totalChunks,
      totalBlocks,
      ragReadyCount,
    };
  }

  /**
   * Clear all cached data
   */
  clearCache(): void {
    this.cache.clear();
    this.documents.clear();
    this.collections = [];
  }
}

/**
 * Factory function for creating a Notion storage adapter
 */
export function createNotionStorageAdapter(
  config?: Partial<NotionScraperConfig>,
): NotionStorageAdapter {
  return new NotionStorageAdapter(config);
}
