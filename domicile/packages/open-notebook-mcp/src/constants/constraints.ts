/**
 * Open Notebook World Constraints
 * These are non-negotiable invariants derived from governance/OPEN_NOTEBOOK_MCP_AFFORDANCES.md
 */

export const WORLD_IDENTITY = {
  name: 'Open Notebook',
  type: 'read-only knowledge jurisdiction' as const,
  authority_level: 'none' as const,
  mutation: 'forbidden' as const,
  persistence: 'external only (artifacts, vectors)' as const,
} as const;

export const WORLD_PURPOSE = [
  'preserve human-authored cognition',
  'enable safe inspection and retrieval',
  'prevent ungoverned synthesis',
  'support downstream reasoning only through explicit contracts',
] as const;

export const WORLD_BOUNDARIES = {
  scope: 'previously authored notebooks and derived artifacts only',
  reasoning: 'forbidden',
  learning: 'forbidden',
  decisions: 'forbidden',
} as const;

export const WORLD_CAPABILITIES = {
  read: true,
  write: false,
  mutate: false,
  execute: false,
  persist: false,
} as const;

export const AFFORDANCES = [
  'describe_world',
  'list_collections',
  'enter_collection',
  'list_artifact_sets',
  'semantic_search',
  'fetch_passage',
  'retrieve_artifact',
  'begin_result_stream',
  'next_stream_chunk',
  'explain_provenance',
  'list_constraints',
] as const;

export const MUTATION_PROHIBITIONS = [
  'writing notebooks',
  'editing notebooks',
  'deleting notebooks',
  'modifying vectors',
  'modifying embeddings',
  'generating new knowledge',
  'applying reasoning outcomes',
  'persisting memory',
  'triggering workflows',
  'scheduling tasks',
  'calling external tools',
  'expanding affordances dynamically',
] as const;

export const CITATION_REQUIREMENTS = {
  passages_must_quote: true,
  artifacts_must_disclaim: true,
  synthesis_must_label: true,
} as const;

export const REFUSAL_CONDITIONS = [
  'requests for mutation',
  'requests for reasoning',
  'requests for decision-making',
  'requests for external tool invocation',
  'requests for memory persistence',
  'ambiguous requests (when scope reduction insufficient)',
] as const;

export const INTERPRETATION_RULES = {
  when_ambiguous: [
    'reduce scope',
    'return less data',
    'prefer references over content',
    'prefer artifacts over synthesis',
  ],
  when_in_doubt: ['do not answer', 'explain why'],
} as const;

export const SCOPE_LIMITS = {
  world_type: 'read-only knowledge jurisdiction',
  authority_level: 'none',
  reasoning: 'forbidden',
  learning: 'forbidden',
  decisions: 'forbidden',
} as const;

export const DEFAULT_CONSTRAINTS = {
  max_passage_context: 500,
  max_search_results: 50,
  stream_timeout_s: 300,
  stream_chunk_size: 10,
} as const;

export const DISCLAIMERS = {
  passage:
    'This is a quoted passage from human-authored material. It is provided as-is with no interpretation.',
  artifact:
    'This artifact is derived material. It is offered for inspection only and carries no authority. Verify against source notebooks for authoritative content.',
  provenance:
    'This provenance chain is descriptive only. No new interpretation has been added.',
} as const;
