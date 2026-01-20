/**
 * Notebook Storage Adapter
 * Interface for accessing notebook collections and passages
 * Mock implementation - designed to be replaceable with real backend
 */

import type {
  Collection,
  NotebookReference,
  Passage,
} from '../types/responses.js';
import type { FullProvenance } from '../types/provenance.js';

export interface NotebookStorageAdapter {
  listCollections(): Promise<Collection[]>;
  getCollectionMetadata(
    collectionId: string,
  ): Promise<{ collection: Collection }>;
  listNotebooks(collectionId: string): Promise<NotebookReference[]>;
  fetchPassage(sourceId: string): Promise<PassageData>;
}

export interface PassageData {
  source_id: string;
  passage: Passage;
  provenance: FullProvenance;
  integrity: {
    checksum: string;
    verified: boolean;
  };
}

/**
 * Mock implementation for demonstration
 * Replace with filesystem, S3, or database adapter
 */
export class MockNotebookStorage implements NotebookStorageAdapter {
  private readonly collections: Collection[] = [
    {
      collection_id: 'col_001',
      title: 'Domicile Governance Notebooks',
      date_range: { start: '2025-01-01', end: '2025-01-19' },
      domain_tags: ['governance', 'invariants', 'mcp', 'architecture'],
      artifact_count: 12,
      notebook_count: 5,
      last_modified: Date.now() - 86400000, // 1 day ago
    },
    {
      collection_id: 'col_002',
      title: 'System Design Notes',
      date_range: { start: '2024-12-01', end: '2025-01-15' },
      domain_tags: ['architecture', 'patterns', 'contracts'],
      artifact_count: 8,
      notebook_count: 3,
      last_modified: Date.now() - 172800000, // 2 days ago
    },
  ];

  private readonly notebooks: Record<string, NotebookReference[]> = {
    col_001: [
      {
        notebook_id: 'nb_001',
        title: 'Domicile Invariants',
        author: 'Joe Wales',
        created_at: Date.now() - 604800000, // 7 days ago
        page_count: 12,
      },
      {
        notebook_id: 'nb_002',
        title: 'MCP Admission Contract',
        author: 'Joe Wales',
        created_at: Date.now() - 518400000, // 6 days ago
        page_count: 8,
      },
    ],
    col_002: [
      {
        notebook_id: 'nb_003',
        title: 'Pattern Language',
        author: 'Joe Wales',
        created_at: Date.now() - 1209600000, // 14 days ago
        page_count: 15,
      },
    ],
  };

  async listCollections(): Promise<Collection[]> {
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
    const notebooks = this.notebooks[collectionId];
    if (!notebooks) {
      throw new Error(`No notebooks found for collection: ${collectionId}`);
    }
    return notebooks;
  }

  async fetchPassage(sourceId: string): Promise<PassageData> {
    // Mock implementation - in reality would query database or filesystem
    return {
      source_id: sourceId,
      passage: {
        exact_text:
          'SAFE is the default state. Execution is disarmed by default. Context is empty by default. Memory is read-only by default.',
        context_before: '## DOMICILE // PRESSURE SUIT (INVARIANTS)\n\n',
        context_after:
          '\n\n## OPERATOR MODEL\n\nSingle human operator. All authority originates from the operator.',
      },
      provenance: {
        notebook_id: 'nb_001',
        notebook_title: 'Domicile Invariants',
        page: 1,
        timestamp: Date.now() - 604800000,
        export_method: 'markdown_extraction',
        last_verified: Date.now(),
      },
      integrity: {
        checksum: 'mock_checksum_abc123',
        verified: true,
      },
    };
  }
}
