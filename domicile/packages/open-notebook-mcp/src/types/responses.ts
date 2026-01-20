/**
 * Response envelope types for Open Notebook MCP server
 * All responses include provenance and metadata for transparency
 */

export interface Collection {
  collection_id: string;
  title: string;
  date_range: { start: string; end: string };
  domain_tags: string[];
  artifact_count: number;
  notebook_count: number;
  last_modified: number;
}

export interface CollectionMetadata {
  total_collections: number;
  data_as_of: number;
  next_refresh: number | null;
}

export interface NotebookReference {
  notebook_id: string;
  title: string;
  author: string | null;
  created_at: number;
  page_count?: number;
}

export interface ArtifactSet {
  artifact_set_id: string;
  artifact_type: 'summary' | 'index' | 'extraction' | 'synthesis';
  created_at: number;
  status: 'offered' | 'canonical';
  source_notebooks: string[];
  artifact_count: number;
}

export interface SearchResult {
  reference_id: string;
  relevance_score: number;
  source_pointer: {
    notebook_id: string;
    page: number | null;
    timestamp: number | null;
  };
  preview_snippet: string;
}

export interface Passage {
  exact_text: string;
  context_before: string;
  context_after: string;
}

export interface ProvenanceChain {
  origin_notebook: NotebookReference;
  transformation_steps: TransformationStep[];
  tools_involved: string[];
  confidence_notes: string[];
}

export interface TransformationStep {
  step_order: number;
  tool: string;
  parameters: Record<string, unknown>;
  timestamp: number;
}

export interface SynthesisMetadata {
  synthesized: boolean;
  confidence_note: string;
  last_refreshed: number | null;
  staleness_indicator: 'fresh' | 'stale' | 'unknown';
}

export interface StreamMetadata {
  what_changed: string;
  why: string;
  progress: {
    current_step: string;
    completed_steps: string[];
    remaining_steps: string[];
  };
}

export interface StreamContinuation {
  has_more: boolean;
  next_chunk_available?: boolean;
  estimated_remaining?: number | null;
  stream_closed?: boolean;
}

export type StreamStep =
  | 'reference_identifiers'
  | 'passages'
  | 'dense_sections'
  | 'artifact_links';

export interface ErrorResponse {
  error: {
    type: ErrorType;
    message: string;
    recovery?: string;
    context?: Record<string, unknown>;
  };
}

export type ErrorType =
  | 'no_collection_context'
  | 'collection_not_found'
  | 'source_not_found'
  | 'artifact_not_found'
  | 'stream_token_invalid'
  | 'stream_token_expired'
  | 'operation_forbidden'
  | 'ambiguous_request'
  | 'upstream_failure';
