/**
 * Provenance tracking types
 * All data includes complete origin and transformation chains
 */

import type { NotebookReference, TransformationStep } from './responses.js';

export interface FullProvenance {
  notebook_id: string;
  notebook_title: string;
  page: number | null;
  timestamp: number | null;
  export_method: string;
  last_verified: number;
}

export interface ArtifactProvenance {
  source_notebooks: string[];
  transformation_steps: TransformationStep[];
  created_at: number;
  created_by: 'synthesis_pipeline' | 'human_export';
}

export interface IntegrityCheck {
  checksum: string;
  verified: boolean;
}

export interface ProvenanceExplanation {
  origin_notebook: NotebookReference;
  transformation_steps: TransformationStep[];
  tools_involved: string[];
  confidence_notes: string[];
}
