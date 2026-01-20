/**
 * Vector Search Adapter
 * Interface for semantic search within collections
 * Mock implementation - designed to be replaceable with pgvector, Pinecone, etc.
 */

import type { SearchResult } from '../types/responses.js';

export interface VectorSearchAdapter {
  search(
    query: string,
    collectionId: string,
    k: number,
  ): Promise<SearchResult[]>;
  explainQuery(query: string): Promise<QueryExplanation>;
}

export interface QueryExplanation {
  query: string;
  normalized: string;
  expansion_terms: string[];
}

/**
 * Mock implementation for demonstration
 * Replace with pgvector, Pinecone, Weaviate, etc.
 */
export class MockVectorSearch implements VectorSearchAdapter {
  async search(
    query: string,
    collectionId: string,
    k: number,
  ): Promise<SearchResult[]> {
    // Mock implementation - in reality would use vector embeddings
    const mockResults: SearchResult[] = [
      {
        reference_id: `ref_${collectionId}_001`,
        relevance_score: 0.92,
        source_pointer: {
          notebook_id: 'nb_001',
          page: 1,
          timestamp: Date.now() - 604800000,
        },
        preview_snippet:
          'SAFE is the default state. Execution is disarmed by default...',
      },
      {
        reference_id: `ref_${collectionId}_002`,
        relevance_score: 0.87,
        source_pointer: {
          notebook_id: 'nb_001',
          page: 2,
          timestamp: Date.now() - 604800000,
        },
        preview_snippet:
          'Context is empty by default. Nothing exists unless deliberately loaded...',
      },
      {
        reference_id: `ref_${collectionId}_003`,
        relevance_score: 0.81,
        source_pointer: {
          notebook_id: 'nb_002',
          page: 1,
          timestamp: Date.now() - 518400000,
        },
        preview_snippet:
          'All executable actions are explicitly enumerated. No dynamic tool invention...',
      },
    ];

    // Return only k results, sorted by relevance
    return mockResults.slice(0, Math.min(k, mockResults.length));
  }

  async explainQuery(query: string): Promise<QueryExplanation> {
    return {
      query,
      normalized: query.toLowerCase().trim(),
      expansion_terms: query.toLowerCase().split(/\s+/),
    };
  }
}
