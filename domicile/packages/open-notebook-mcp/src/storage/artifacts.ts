/**
 * Artifact Storage Adapter
 * Interface for accessing synthesized artifacts with provenance
 * Mock implementation - designed to be replaceable with filesystem or S3
 */

import type { ArtifactSet, TransformationStep } from '../types/responses.js';
import type { ArtifactProvenance } from '../types/provenance.js';

export interface ArtifactStorageAdapter {
  listArtifactSets(collectionId: string): Promise<ArtifactSet[]>;
  retrieveArtifact(artifactId: string): Promise<ArtifactData>;
  getProvenance(artifactId: string): Promise<ArtifactProvenance>;
}

export interface ArtifactData {
  artifact_id: string;
  artifact_type: string;
  status: 'offered' | 'canonical';
  contents: string | Record<string, unknown>;
  provenance: ArtifactProvenance;
}

/**
 * Mock implementation for demonstration
 * Replace with filesystem, S3, or database adapter
 */
export class MockArtifactStorage implements ArtifactStorageAdapter {
  private readonly artifactSets: Record<string, ArtifactSet[]> = {
    col_001: [
      {
        artifact_set_id: 'aset_001',
        artifact_type: 'summary',
        created_at: Date.now() - 86400000,
        status: 'offered',
        source_notebooks: ['nb_001', 'nb_002'],
        artifact_count: 3,
      },
      {
        artifact_set_id: 'aset_002',
        artifact_type: 'index',
        created_at: Date.now() - 172800000,
        status: 'canonical',
        source_notebooks: ['nb_001'],
        artifact_count: 1,
      },
    ],
    col_002: [
      {
        artifact_set_id: 'aset_003',
        artifact_type: 'extraction',
        created_at: Date.now() - 259200000,
        status: 'offered',
        source_notebooks: ['nb_003'],
        artifact_count: 2,
      },
    ],
  };

  async listArtifactSets(collectionId: string): Promise<ArtifactSet[]> {
    return this.artifactSets[collectionId] || [];
  }

  async retrieveArtifact(artifactId: string): Promise<ArtifactData> {
    // Mock implementation
    const transformationSteps: TransformationStep[] = [
      {
        step_order: 1,
        tool: 'markdown_parser',
        parameters: { format: 'commonmark' },
        timestamp: Date.now() - 86400000,
      },
      {
        step_order: 2,
        tool: 'semantic_chunker',
        parameters: { chunk_size: 512, overlap: 50 },
        timestamp: Date.now() - 86400000 + 1000,
      },
      {
        step_order: 3,
        tool: 'summary_generator',
        parameters: { max_length: 200 },
        timestamp: Date.now() - 86400000 + 2000,
      },
    ];

    return {
      artifact_id: artifactId,
      artifact_type: 'summary',
      status: 'offered',
      contents: {
        title: 'Domicile Invariants Summary',
        summary:
          'Domicile enforces five core invariants: Entry (one intentional act), Safe (nothing executes without contract), Context (nothing loaded unless deliberate), Awareness (nothing important is invisible), and Exit (failure is contained, leaving is sovereign). SAFE is the default state with execution disarmed, context empty, and memory read-only.',
        key_points: [
          'SAFE is the default state',
          'Execution requires explicit contracts',
          'Context must be deliberately loaded',
          'Exit is always sovereign',
        ],
      },
      provenance: {
        source_notebooks: ['nb_001'],
        transformation_steps: transformationSteps,
        created_at: Date.now() - 86400000,
        created_by: 'synthesis_pipeline',
      },
    };
  }

  async getProvenance(artifactId: string): Promise<ArtifactProvenance> {
    const artifact = await this.retrieveArtifact(artifactId);
    return artifact.provenance;
  }
}
