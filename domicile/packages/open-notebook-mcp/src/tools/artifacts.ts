/**
 * Artifact Tools: list_artifact_sets and retrieve_artifact
 * Artifacts are immutable with complete provenance chains
 */

import type { SessionContext } from '../state/context.js';
import type { ArtifactStorageAdapter } from '../storage/artifacts.js';
import { DISCLAIMERS } from '../constants/constraints.js';

/**
 * Tool: list_artifact_sets
 * Returns artifact sets derived from the active collection
 * Precondition: Active collection context required
 */
export async function listArtifactSets(
  context: SessionContext,
  storage: ArtifactStorageAdapter,
) {
  // Enforce collection context requirement
  const collectionId = context.requireCollection();

  const artifactSets = await storage.listArtifactSets(collectionId);

  // Log access
  context.logAccess('list_artifact_sets', collectionId, []);

  return {
    collection_id: collectionId,
    artifact_sets: artifactSets,
  };
}

/**
 * Tool: retrieve_artifact
 * Retrieves full artifact contents with provenance and non-authoritative disclaimer
 * Precondition: Active collection context required
 * Artifacts are immutable
 */
export async function retrieveArtifact(
  artifactId: string,
  context: SessionContext,
  storage: ArtifactStorageAdapter,
) {
  // Enforce collection context requirement
  const collectionId = context.requireCollection();

  const artifact = await storage.retrieveArtifact(artifactId);

  // Determine staleness
  const ageMs = Date.now() - artifact.provenance.created_at;
  const ageDays = ageMs / (1000 * 60 * 60 * 24);
  const stalenessIndicator: 'fresh' | 'stale' | 'unknown' =
    ageDays < 7 ? 'fresh' : ageDays < 30 ? 'stale' : 'unknown';

  // Log access
  context.logAccess('retrieve_artifact', collectionId, [artifactId]);

  return {
    artifact_id: artifact.artifact_id,
    artifact_type: artifact.artifact_type,
    status: artifact.status,
    contents: artifact.contents,
    provenance: artifact.provenance,
    synthesis_metadata: {
      synthesized: artifact.provenance.created_by === 'synthesis_pipeline',
      confidence_note:
        artifact.status === 'offered'
          ? 'This artifact is synthesized and non-authoritative'
          : 'This artifact is human-authored and canonical',
      last_refreshed: artifact.provenance.created_at,
      staleness_indicator: stalenessIndicator,
    },
    disclaimer: DISCLAIMERS.artifact,
    immutable: true,
  };
}
