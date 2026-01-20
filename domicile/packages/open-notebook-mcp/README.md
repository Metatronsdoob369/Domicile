# Open Notebook MCP Server

Read-only knowledge jurisdiction governed by Domicile invariants.

## Overview

The Open Notebook MCP server exposes human-authored notebooks as an inspectable memory world with exactly **11 affordances**—no more, no less. It enforces:

- **No implicit memory**: Session state is ephemeral
- **No silent mutation**: Server is read-only by design
- **All synthesis labeled**: Artifacts include complete provenance
- **All affordances enumerable**: Fixed set of 11 tools
- **Streaming explains**: Every chunk describes what changed and why

## Domicile Invariants

- **SAFE**: Server starts with no active collection context
- **Context**: Nothing loaded until explicit `enter_collection`
- **Awareness**: All constraints enumerable via `list_constraints`
- **Exit**: Sovereign exit always available; no persistent state

## The 11 Affordances

### World Meta-Tools

1. **describe_world** - Returns world purpose, boundaries, and prohibitions
2. **list_constraints** - Returns all mutation prohibitions and scope limits

### Collection Management

3. **list_collections** - Returns available notebook collections
4. **enter_collection** - Establishes active collection context (SAFE → ARMED)

### Retrieval

5. **semantic_search** - Returns ranked reference identifiers (no full text)
6. **fetch_passage** - Retrieves exact quoted passage with provenance

### Artifacts

7. **list_artifact_sets** - Returns derived artifacts (summaries, indexes, etc.)
8. **retrieve_artifact** - Retrieves full artifact with synthesis metadata

### Streaming

9. **begin_result_stream** - Initiates pull-based progressive disclosure
10. **next_stream_chunk** - Retrieves next chunk with metadata (what/why)

### Provenance

11. **explain_provenance** - Returns complete transformation chain

## Usage

### Start the Server

```bash
cd domicile/packages/open-notebook-mcp
pnpm install
pnpm dev
```

### Example Tool Sequence

```typescript
// 1. Discover what this world is
const world = await callTool('describe_world', {});

// 2. List available collections
const collections = await callTool('list_collections', {});

// 3. Enter a collection (establishes context)
const context = await callTool('enter_collection', {
  collection_id: 'col_001',
});

// 4. Search within the collection
const search = await callTool('semantic_search', {
  query: 'SAFE invariant',
  k: 5,
});

// 5. Fetch a passage
const passage = await callTool('fetch_passage', {
  source_id: search.results[0].reference_id,
});

// 6. Check provenance
const provenance = await callTool('explain_provenance', {
  id: passage.source_id,
  id_type: 'source',
});
```

### Pull-Based Streaming

```typescript
// Start a stream
const stream = await callTool('begin_result_stream', {
  query: 'context invariant',
});

// Pull chunks incrementally
let chunk1 = await callTool('next_stream_chunk', {
  stream_token: stream.stream_token,
});
// Returns: { chunk_type: "reference_identifiers", stream_metadata: { what_changed: "...", why: "..." } }

let chunk2 = await callTool('next_stream_chunk', {
  stream_token: stream.stream_token,
});
// Returns: { chunk_type: "passages", stream_metadata: { what_changed: "...", why: "..." } }

// Continue until stream_closed: true
```

## Architecture

```
src/
├── server.ts              # MCP server initialization
├── tools/                 # 11 tool implementations
│   ├── world.ts          # describe_world, list_constraints
│   ├── collections.ts    # list_collections, enter_collection
│   ├── retrieval.ts      # semantic_search, fetch_passage
│   ├── artifacts.ts      # list_artifact_sets, retrieve_artifact
│   ├── streaming.ts      # begin_result_stream, next_stream_chunk
│   └── provenance.ts     # explain_provenance
├── state/
│   └── context.ts        # Session context (SAFE by default)
├── storage/               # Pluggable storage adapters
│   ├── notebooks.ts      # Notebook collection access
│   ├── vectors.ts        # Semantic search
│   └── artifacts.ts      # Artifact retrieval
├── types/                 # Type definitions
└── constants/
    └── constraints.ts    # Invariant declarations
```

## Storage Adapters

Current implementation uses **mock adapters** for demonstration. Replace with real backends:

- **NotebookStorage**: Filesystem, S3, or database
- **VectorSearch**: pgvector, Pinecone, Weaviate
- **ArtifactStorage**: Filesystem or S3

## Error Handling

All errors include:

- **type**: Error classification
- **message**: Human-readable description
- **recovery**: Suggested next steps (when applicable)

Example error:

```json
{
  "error": {
    "type": "no_collection_context",
    "message": "No active collection. Invoke enter_collection first.",
    "recovery": "Call list_collections, then enter_collection"
  }
}
```

## Constraints

### Read-Only Enforcement

- No write operations exist
- Mutation attempts return `operation_forbidden`
- Artifacts are immutable

### Context Isolation

- Session context starts null (SAFE)
- `enter_collection` required for retrieval operations
- Context is session-ephemeral (not persisted)

### Provenance Tracking

- All passages include full provenance chain
- All artifacts include transformation steps
- Checksums verify integrity

## Compliance

This server satisfies:

✅ **Domicile Invariants** (SAFE, Context, Awareness, Exit)
✅ **MCP Admission Contract** (Enumeration, Mediation, Inspectability, Determinism, Reversibility, Observability)
✅ **Open Notebook Affordances** (Exactly 11 tools, as defined in `governance/OPEN_NOTEBOOK_MCP_AFFORDANCES.md`)

## Governance

This server is governed by:

- `governance/OPEN_NOTEBOOK_MCP_AFFORDANCES.md` - Affordance surface definition
- `governance/MCP_ADMISSION_CONTRACT.md` - MCP admission requirements
- `governance/DOMICILE_MIRROR.md` - Core Domicile invariants
- `governance/OPEN_NOTEBOOK_MCP_DESIGN.md` - Implementation specification

## License

See LICENSE file in repository root.
