/**
 * Streaming Tools: begin_result_stream and next_stream_chunk
 * Pull-based progressive disclosure with metadata explaining what changed and why
 */

import { randomUUID } from 'crypto';
import type { SessionContext } from '../state/context.js';
import type { VectorSearchAdapter } from '../storage/vectors.js';
import type { StreamStep } from '../types/responses.js';
import { DEFAULT_CONSTRAINTS } from '../constants/constraints.js';

const DISCLOSURE_STEPS: StreamStep[] = [
  'reference_identifiers',
  'passages',
  'dense_sections',
  'artifact_links',
];

/**
 * Tool: begin_result_stream
 * Initiates a pull-based result stream for progressive disclosure
 * Precondition: Active collection context required
 */
export async function beginResultStream(
  query: string,
  context: SessionContext,
  _vectorSearch: VectorSearchAdapter,
) {
  // Enforce collection context requirement
  const collectionId = context.requireCollection();

  // Generate opaque stream token
  const streamToken = randomUUID();

  // Create stream state
  context.createStream(streamToken, query, collectionId);

  // Log access
  context.logAccess('begin_result_stream', collectionId, []);

  return {
    stream_token: streamToken,
    query,
    disclosure_policy: {
      step_order: DISCLOSURE_STEPS,
      chunk_strategy: 'progressive_depth' as const,
      cancelable: true,
      timeout_s: DEFAULT_CONSTRAINTS.stream_timeout_s,
    },
    metadata: {
      estimated_chunks: DISCLOSURE_STEPS.length * 2, // Approximate
      created_at: Date.now(),
    },
    note: 'No content returned. Use next_stream_chunk to retrieve incrementally.',
  };
}

/**
 * Tool: next_stream_chunk
 * Retrieves next chunk from active result stream
 * Each chunk includes metadata explaining what changed and why
 */
export async function nextStreamChunk(
  streamToken: string,
  context: SessionContext,
  vectorSearch: VectorSearchAdapter,
) {
  // Get and validate stream state
  const stream = context.getStream(streamToken);

  // Determine current step
  const currentStepIndex = DISCLOSURE_STEPS.indexOf(
    stream.current_step as StreamStep,
  );

  // Generate chunk based on current step
  let payload: unknown;
  let whatChanged: string;
  let why: string;
  let hasMore = true;

  switch (stream.current_step) {
    case 'reference_identifiers': {
      // Fetch initial references
      const results = await vectorSearch.search(
        stream.query,
        stream.collection_id,
        DEFAULT_CONSTRAINTS.stream_chunk_size,
      );
      payload = results.map((r) => ({
        reference_id: r.reference_id,
        relevance_score: r.relevance_score,
      }));
      whatChanged = `Added ${results.length} references matching '${stream.query}'`;
      why = 'Initial semantic search results';

      // Move to next step
      stream.completed_steps.push(stream.current_step);
      stream.current_step = 'passages';
      context.updateStream(streamToken, stream);
      break;
    }

    case 'passages': {
      // Mock passage retrieval
      payload = {
        sample_passage:
          'SAFE is the default state. Execution is disarmed by default. Context is empty by default.',
        source: 'nb_001',
      };
      whatChanged = 'Retrieved 1 full passage for top reference';
      why = 'Expanding from references to full text';

      stream.completed_steps.push(stream.current_step);
      stream.current_step = 'dense_sections';
      context.updateStream(streamToken, stream);
      break;
    }

    case 'dense_sections': {
      // Mock dense section retrieval
      payload = {
        section_title: 'Domicile Invariants',
        content: 'Complete section with full context...',
      };
      whatChanged =
        'Expanded to complete section including surrounding context';
      why = 'Providing broader context for interpretation';

      stream.completed_steps.push(stream.current_step);
      stream.current_step = 'artifact_links';
      context.updateStream(streamToken, stream);
      break;
    }

    case 'artifact_links': {
      // Mock artifact links
      payload = {
        related_artifacts: ['aset_001', 'aset_002'],
        artifact_types: ['summary', 'index'],
      };
      whatChanged = 'Added links to 2 related artifacts';
      why = 'Connecting to synthesized summaries and indexes';

      stream.completed_steps.push(stream.current_step);
      hasMore = false;
      break;
    }

    default:
      hasMore = false;
      payload = null;
      whatChanged = 'No more chunks available';
      why = 'All disclosure steps completed';
  }

  // Build response
  if (!hasMore) {
    // Stream complete
    context.deleteStream(streamToken);
    return {
      stream_token: streamToken,
      chunk_type: 'stream_complete',
      summary: {
        total_chunks: stream.completed_steps.length + 1,
        total_references: 1, // Mock
        query: stream.query,
      },
      continuation: {
        has_more: false,
        stream_closed: true,
      },
    };
  }

  const chunkIndex = stream.completed_steps.length;

  return {
    stream_token: streamToken,
    chunk_index: chunkIndex,
    chunk_type: stream.current_step,
    payload,
    stream_metadata: {
      what_changed: whatChanged,
      why,
      progress: {
        current_step: stream.current_step,
        completed_steps: stream.completed_steps,
        remaining_steps: DISCLOSURE_STEPS.slice(currentStepIndex + 1),
      },
    },
    continuation: {
      has_more: hasMore,
      next_chunk_available: true,
      estimated_remaining: DISCLOSURE_STEPS.length - chunkIndex - 1,
    },
  };
}
