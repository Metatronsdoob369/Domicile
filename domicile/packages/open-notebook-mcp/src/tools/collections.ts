/**
 * Collection Management Tools: list_collections and enter_collection
 * These tools manage collection context (enforcing Domicile SAFE and Context invariants)
 */

import type { SessionContext } from '../state/context.js';
import type { NotebookStorageAdapter } from '../storage/notebooks.js';

/**
 * Tool: list_collections
 * Returns available notebook collections with metadata, no content
 */
export async function listCollections(storage: NotebookStorageAdapter) {
  const collections = await storage.listCollections();

  return {
    collections,
    metadata: {
      total_collections: collections.length,
      data_as_of: Date.now(),
      next_refresh: null,
    },
  };
}

/**
 * Tool: enter_collection
 * Establishes active collection context, restricting all subsequent operations
 * Enforces Domicile Context invariant: nothing loaded until explicit action
 */
export async function enterCollection(
  collectionId: string,
  context: SessionContext,
  storage: NotebookStorageAdapter,
) {
  // Verify collection exists
  const { collection } = await storage.getCollectionMetadata(collectionId);

  // Enter collection context (replaces any previous context)
  context.enterCollection(collectionId);

  return {
    collection_id: collection.collection_id,
    title: collection.title,
    context_established: true,
    scope_note:
      'All subsequent operations restricted to this collection until exit or new enter_collection call',
    available_operations: [
      'list_artifact_sets',
      'semantic_search',
      'fetch_passage',
      'retrieve_artifact',
      'begin_result_stream',
    ],
    preload_note: 'No data preloaded. Invoke retrieval tools explicitly.',
  };
}
