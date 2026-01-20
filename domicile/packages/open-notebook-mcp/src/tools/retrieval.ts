/**
 * Retrieval Tools: semantic_search and fetch_passage
 * Read-only retrieval with full provenance
 */

import type { SessionContext } from '../state/context.js';
import type { NotebookStorageAdapter } from '../storage/notebooks.js';
import type { VectorSearchAdapter } from '../storage/vectors.js';
import { DISCLAIMERS, DEFAULT_CONSTRAINTS } from '../constants/constraints.js';

/**
 * Tool: semantic_search
 * Returns ranked reference identifiers for semantic query within active collection
 * Precondition: Active collection context required
 */
export async function semanticSearch(
  query: string,
  k: number = 10,
  context: SessionContext,
  vectorSearch: VectorSearchAdapter,
) {
  // Enforce collection context requirement (Domicile: Context invariant)
  const collectionId = context.requireCollection();

  // Enforce maximum results constraint
  const maxK = Math.min(k, DEFAULT_CONSTRAINTS.max_search_results);

  const startTime = Date.now();
  const results = await vectorSearch.search(query, collectionId, maxK);
  const searchTime = Date.now() - startTime;

  // Log access
  context.logAccess(
    'semantic_search',
    collectionId,
    results.map((r) => r.reference_id),
  );

  return {
    collection_id: collectionId,
    query,
    results,
    metadata: {
      total_matches: results.length,
      returned: results.length,
      search_time_ms: searchTime,
    },
    note: 'Full text not included. Use fetch_passage to retrieve content.',
  };
}

/**
 * Tool: fetch_passage
 * Retrieves exact quoted passage with bounded context from source
 * Precondition: Active collection context required
 * No paraphrasing, no synthesis
 */
export async function fetchPassage(
  sourceId: string,
  context: SessionContext,
  storage: NotebookStorageAdapter,
) {
  // Enforce collection context requirement
  const collectionId = context.requireCollection();

  // Fetch passage data
  const data = await storage.fetchPassage(sourceId);

  // Log access
  context.logAccess('fetch_passage', collectionId, [sourceId]);

  return {
    source_id: data.source_id,
    passage: data.passage,
    provenance: data.provenance,
    integrity: data.integrity,
    disclaimer: DISCLAIMERS.passage,
  };
}
