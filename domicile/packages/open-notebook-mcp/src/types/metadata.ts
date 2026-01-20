/**
 * Metadata structures for streaming and search
 */

export interface SearchMetadata {
  total_matches: number;
  returned: number;
  search_time_ms: number;
}

export interface DisclosurePolicy {
  step_order: string[];
  chunk_strategy: 'progressive_depth';
  cancelable: true;
  timeout_s: number;
}

export interface StreamStartMetadata {
  estimated_chunks: number | null;
  created_at: number;
}
