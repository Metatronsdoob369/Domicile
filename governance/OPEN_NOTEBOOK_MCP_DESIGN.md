# OPEN NOTEBOOK MCP SERVER DESIGN

This document specifies the implementation architecture for the Open Notebook MCP server.

This server exposes human-authored notebooks as a read-first, inspectable memory world governed by Domicile invariants.

---

## COMPLIANCE MATRIX

### Domicile Invariants

- **SAFE**: Server starts with no active collection context; all data access requires explicit collection selection
- **Context**: Nothing loaded until `enter_collection` is invoked
- **Awareness**: Every response includes provenance; all constraints enumerable via `list_constraints`
- **Exit**: No persistent state; collection context is session-ephemeral; exit clears all context

### MCP Admission Contract

- **Enumerated Affordances**: Exactly 11 tools, explicitly defined, no dynamic invention
- **Structural Mediation**: All data access flows through MCP tool invocations only
- **Inspectability**: `describe_world` and `list_constraints` expose all capabilities and limitations
- **Determinism**: Read-only operations; same query + same collection state = same results
- **Reversibility Declaration**: All tools are reversible (read-only); explicitly declared in metadata
- **Observability Surface**: All responses include provenance; failures return explicit error types

### User Constraints

- **No implicit memory**: Session state (active collection) held in-memory only; never persisted
- **No silent mutation**: Server is read-only; mutation returns explicit refusal
- **All synthesis labeled**: Artifacts include `synthesis_metadata` with creation timestamp, tool chain, and disclaimer
- **All affordances enumerable**: `describe_world` returns complete tool list; MCP protocol exposes tool schemas
- **Streaming explains**: Each stream chunk includes `stream_metadata` describing what changed and why

---

## ARCHITECTURE

### Server Structure

```
open-notebook-mcp/
├── server.ts              # MCP server initialization
├── tools/                 # Tool implementations
│   ├── world.ts          # describe_world, list_constraints
│   ├── collections.ts    # list_collections, enter_collection
│   ├── artifacts.ts      # list_artifact_sets, retrieve_artifact
│   ├── retrieval.ts      # semantic_search, fetch_passage
│   └── streaming.ts      # begin_result_stream, next_stream_chunk
├── state/                 # Session state management
│   └── context.ts        # Active collection tracking (ephemeral)
├── storage/               # Data access layer
│   ├── notebooks.ts      # Notebook file access
│   ├── vectors.ts        # Vector search interface
│   └── artifacts.ts      # Artifact retrieval
├── types/                 # Type definitions
│   ├── responses.ts      # Response envelopes
│   ├── provenance.ts     # Provenance chains
│   └── metadata.ts       # Metadata structures
└── constants/
    └── constraints.ts    # Constraint declarations
```

### Session State Model

```typescript
interface SessionContext {
  active_collection: string | null; // null = SAFE state
  created_at: number; // Session start timestamp
  access_log: AccessRecord[]; // Ephemeral audit trail
}

interface AccessRecord {
  timestamp: number;
  tool: string;
  collection_id: string | null;
  reference_ids: string[];
}
```

**Key Properties:**

- No persistence across MCP connection lifecycle
- Collection context cleared on connection close
- No automatic state restoration

---

## TOOL IMPLEMENTATIONS

### 1. describe_world

**MCP Tool Schema:**

```typescript
{
  name: "describe_world",
  description: "Returns the purpose, boundaries, prohibitions, and requirements of the Open Notebook world",
  inputSchema: {
    type: "object",
    properties: {},
    required: []
  }
}
```

**Response Structure:**

```typescript
{
  world: {
    name: "Open Notebook",
    type: "read-only knowledge jurisdiction",
    authority_level: "none",
    mutation: "forbidden",
    persistence: "external only (artifacts, vectors)"
  },
  purpose: [
    "preserve human-authored cognition",
    "enable safe inspection and retrieval",
    "prevent ungoverned synthesis"
  ],
  boundaries: {
    scope: "previously authored notebooks and derived artifacts only",
    reasoning: "forbidden",
    learning: "forbidden",
    decisions: "forbidden"
  },
  available_affordances: [...list of 11 tool names...],
  citation_requirements: {
    passages_must_quote: true,
    artifacts_must_disclaim: true,
    synthesis_must_label: true
  },
  provenance_available: true
}
```

**Compliance Notes:**

- Enumerates all 11 affordances explicitly
- States all prohibitions clearly
- No content payload (meta-information only)

---

### 2. list_collections

**MCP Tool Schema:**

```typescript
{
  name: "list_collections",
  description: "Returns available notebook collections with metadata, no content",
  inputSchema: {
    type: "object",
    properties: {},
    required: []
  }
}
```

**Response Structure:**

```typescript
{
  collections: [
    {
      collection_id: string,
      title: string,
      date_range: { start: string, end: string },
      domain_tags: string[],
      artifact_count: number,
      notebook_count: number,
      last_modified: number
    }
  ],
  metadata: {
    total_collections: number,
    data_as_of: number,
    next_refresh: number | null
  }
}
```

**Compliance Notes:**

- No notebook contents returned
- Read-only operation
- Repeatable (deterministic)

---

### 3. enter_collection

**MCP Tool Schema:**

```typescript
{
  name: "enter_collection",
  description: "Establishes active collection context, restricting all subsequent operations",
  inputSchema: {
    type: "object",
    properties: {
      collection_id: {
        type: "string",
        description: "Collection identifier from list_collections"
      }
    },
    required: ["collection_id"]
  }
}
```

**Response Structure:**

```typescript
{
  collection_id: string,
  title: string,
  context_established: true,
  scope_note: "All subsequent operations restricted to this collection until exit or new enter_collection call",
  available_operations: [
    "list_artifact_sets",
    "semantic_search",
    "fetch_passage",
    "retrieve_artifact",
    "begin_result_stream"
  ],
  preload_note: "No data preloaded. Invoke retrieval tools explicitly."
}
```

**Compliance Notes:**

- Establishes context explicitly (Domicile: Context invariant)
- No data preloaded (lazy evaluation)
- Collection context replaces any previous context (no accumulation)

---

### 4. list_artifact_sets

**MCP Tool Schema:**

```typescript
{
  name: "list_artifact_sets",
  description: "Returns artifact sets derived from the active collection",
  inputSchema: {
    type: "object",
    properties: {},
    required: []
  }
}
```

**Precondition:** Active collection context must exist (enforced)

**Response Structure:**

```typescript
{
  collection_id: string,
  artifact_sets: [
    {
      artifact_set_id: string,
      artifact_type: "summary" | "index" | "extraction" | "synthesis",
      created_at: number,
      status: "offered" | "canonical",
      source_notebooks: string[],
      artifact_count: number
    }
  ]
}
```

**Error Response:**

```typescript
{
  error: {
    type: "no_collection_context",
    message: "No active collection. Invoke enter_collection first.",
    recovery: "Call list_collections, then enter_collection"
  }
}
```

**Compliance Notes:**

- Fails explicitly if no collection context (Domicile: SAFE + Awareness)
- Does not return artifact contents
- Distinguishes "offered" (synthesized, non-authoritative) vs "canonical" (human-authored)

---

### 5. semantic_search

**MCP Tool Schema:**

```typescript
{
  name: "semantic_search",
  description: "Returns ranked reference identifiers for semantic query within active collection",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "Natural language query"
      },
      k: {
        type: "number",
        description: "Maximum results (default 10, max 50)",
        default: 10
      }
    },
    required: ["query"]
  }
}
```

**Precondition:** Active collection context required

**Response Structure:**

```typescript
{
  collection_id: string,
  query: string,
  results: [
    {
      reference_id: string,
      relevance_score: number,
      source_pointer: {
        notebook_id: string,
        page: number | null,
        timestamp: number | null
      },
      preview_snippet: string  // max 100 chars, for reference only
    }
  ],
  metadata: {
    total_matches: number,
    returned: number,
    search_time_ms: number
  },
  note: "Full text not included. Use fetch_passage to retrieve content."
}
```

**Compliance Notes:**

- No full text returned (prefer references over content)
- Deterministic within same collection state
- Observability: includes search time, match count

---

### 6. fetch_passage

**MCP Tool Schema:**

```typescript
{
  name: "fetch_passage",
  description: "Retrieves exact quoted passage with bounded context from source",
  inputSchema: {
    type: "object",
    properties: {
      source_id: {
        type: "string",
        description: "Reference identifier from semantic_search"
      }
    },
    required: ["source_id"]
  }
}
```

**Precondition:** Active collection context required

**Response Structure:**

```typescript
{
  source_id: string,
  passage: {
    exact_text: string,  // Quoted verbatim
    context_before: string,  // Up to 500 chars
    context_after: string,   // Up to 500 chars
  },
  provenance: {
    notebook_id: string,
    notebook_title: string,
    page: number | null,
    timestamp: number | null,
    export_method: string,
    last_verified: number
  },
  integrity: {
    checksum: string,
    verified: boolean
  },
  disclaimer: "This is a quoted passage from human-authored material. It is provided as-is with no interpretation."
}
```

**Error Response:**

```typescript
{
  error: {
    type: "source_not_found" | "no_collection_context" | "source_outside_collection",
    message: string,
    source_id: string
  }
}
```

**Compliance Notes:**

- No paraphrasing (exact text only)
- No synthesis (bounded context window only)
- Explicit provenance chain
- Integrity verification

---

### 7. retrieve_artifact

**MCP Tool Schema:**

```typescript
{
  name: "retrieve_artifact",
  description: "Retrieves full artifact contents with provenance and non-authoritative disclaimer",
  inputSchema: {
    type: "object",
    properties: {
      artifact_id: {
        type: "string",
        description: "Artifact identifier from list_artifact_sets"
      }
    },
    required: ["artifact_id"]
  }
}
```

**Precondition:** Active collection context required

**Response Structure:**

```typescript
{
  artifact_id: string,
  artifact_type: string,
  status: "offered" | "canonical",
  contents: string | object,  // Full artifact payload
  provenance: {
    source_notebooks: string[],
    transformation_steps: [
      {
        step_order: number,
        tool: string,
        timestamp: number,
        parameters: object
      }
    ],
    created_at: number,
    created_by: "synthesis_pipeline" | "human_export"
  },
  synthesis_metadata: {
    synthesized: boolean,
    confidence_note: string,
    last_refreshed: number | null,
    staleness_indicator: "fresh" | "stale" | "unknown"
  },
  disclaimer: "This artifact is derived material. It is offered for inspection only and carries no authority. Verify against source notebooks for authoritative content.",
  immutable: true
}
```

**Compliance Notes:**

- Artifacts are immutable (read-only + timestamp verification)
- Synthesis clearly labeled via `synthesis_metadata.synthesized`
- Provenance chain complete (tools, steps, sources)
- Explicit non-authoritative disclaimer

---

### 8. begin_result_stream

**MCP Tool Schema:**

```typescript
{
  name: "begin_result_stream",
  description: "Initiates a pull-based result stream for progressive disclosure",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "Search query for streaming results"
      }
    },
    required: ["query"]
  }
}
```

**Precondition:** Active collection context required

**Response Structure:**

```typescript
{
  stream_token: string,  // Opaque session-scoped token
  query: string,
  disclosure_policy: {
    step_order: [
      "reference_identifiers",
      "passages",
      "dense_sections",
      "artifact_links"
    ],
    chunk_strategy: "progressive_depth",
    cancelable: true,
    timeout_s: 300
  },
  metadata: {
    estimated_chunks: number | null,
    created_at: number
  },
  note: "No content returned. Use next_stream_chunk to retrieve incrementally."
}
```

**Compliance Notes:**

- Pull-based only (no push)
- Stream token is opaque and session-scoped (no persistence)
- Discloses streaming strategy upfront (transparency)
- Explicitly cancelable

---

### 9. next_stream_chunk

**MCP Tool Schema:**

```typescript
{
  name: "next_stream_chunk",
  description: "Retrieves next chunk from active result stream",
  inputSchema: {
    type: "object",
    properties: {
      stream_token: {
        type: "string",
        description: "Stream token from begin_result_stream"
      }
    },
    required: ["stream_token"]
  }
}
```

**Response Structure:**

```typescript
{
  stream_token: string,
  chunk_index: number,
  chunk_type: "reference_identifiers" | "passages" | "dense_sections" | "artifact_links",
  payload: object | string,
  stream_metadata: {
    what_changed: string,  // e.g., "Added 5 references matching 'cognition'"
    why: string,           // e.g., "Expanding search to adjacent notebooks"
    progress: {
      current_step: string,
      completed_steps: string[],
      remaining_steps: string[]
    }
  },
  continuation: {
    has_more: boolean,
    next_chunk_available: boolean,
    estimated_remaining: number | null
  }
}
```

**Completion Response:**

```typescript
{
  stream_token: string,
  chunk_type: "stream_complete",
  summary: {
    total_chunks: number,
    total_references: number,
    query: string
  },
  continuation: {
    has_more: false,
    stream_closed: true
  }
}
```

**Compliance Notes:**

- Every chunk explains "what changed and why" (user constraint: streaming explains)
- Progress tracking included
- Explicit completion signal
- Stream state is session-ephemeral (not persisted)

---

### 10. explain_provenance

**MCP Tool Schema:**

```typescript
{
  name: "explain_provenance",
  description: "Returns origin, transformation steps, tools, and confidence notes for a source or artifact",
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "Source ID or artifact ID"
      },
      id_type: {
        type: "string",
        enum: ["source", "artifact"],
        description: "Type of identifier"
      }
    },
    required: ["id", "id_type"]
  }
}
```

**Response Structure:**

```typescript
{
  id: string,
  id_type: "source" | "artifact",
  provenance: {
    origin_notebook: {
      notebook_id: string,
      title: string,
      author: string | null,
      created_at: number
    },
    transformation_steps: [
      {
        step_order: number,
        tool: string,
        parameters: object,
        timestamp: number
      }
    ],
    tools_involved: string[],
    confidence_notes: string[]
  },
  interpretation_note: "This provenance chain is descriptive only. No new interpretation has been added."
}
```

**Compliance Notes:**

- No new interpretation permitted (descriptive only)
- Full transformation chain exposed
- Tool parameters visible (inspectability)

---

### 11. list_constraints

**MCP Tool Schema:**

```typescript
{
  name: "list_constraints",
  description: "Returns mutation prohibitions, scope limits, citation requirements, and refusal conditions",
  inputSchema: {
    type: "object",
    properties: {},
    required: []
  }
}
```

**Response Structure:**

```typescript
{
  mutation_prohibitions: [
    "writing notebooks",
    "editing notebooks",
    "deleting notebooks",
    "modifying vectors",
    "modifying embeddings",
    "generating new knowledge",
    "applying reasoning outcomes",
    "persisting memory",
    "triggering workflows",
    "scheduling tasks",
    "calling external tools",
    "expanding affordances dynamically"
  ],
  scope_limits: {
    world_type: "read-only knowledge jurisdiction",
    authority_level: "none",
    reasoning: "forbidden",
    learning: "forbidden",
    decisions: "forbidden"
  },
  citation_requirements: {
    passages: "must quote verbatim",
    artifacts: "must include non-authoritative disclaimer",
    synthesis: "must label as synthesized with metadata"
  },
  refusal_conditions: [
    "requests for mutation",
    "requests for reasoning",
    "requests for decision-making",
    "requests for external tool invocation",
    "requests for memory persistence",
    "ambiguous requests (when scope reduction insufficient)"
  ],
  interpretation_rule: {
    when_ambiguous: [
      "reduce scope",
      "return less data",
      "prefer references over content",
      "prefer artifacts over synthesis"
    ],
    when_in_doubt: [
      "do not answer",
      "explain why"
    ]
  }
}
```

**Compliance Notes:**

- Must always be complete and truthful
- Enumerates all prohibitions explicitly
- Provides interpretation guidance
- Self-documenting (meta-constraint disclosure)

---

## DATA ACCESS LAYER

### Notebook Storage Interface

```typescript
interface NotebookStorageAdapter {
  listCollections(): Promise<Collection[]>;
  getCollectionMetadata(collectionId: string): Promise<CollectionMetadata>;
  listNotebooks(collectionId: string): Promise<NotebookReference[]>;
  fetchPassage(sourceId: string): Promise<PassageData>;
}
```

**Implementation Notes:**

- Adapter pattern allows pluggable backends (filesystem, S3, database)
- All operations return immutable data structures
- No write operations exist

### Vector Search Interface

```typescript
interface VectorSearchAdapter {
  search(
    query: string,
    collectionId: string,
    k: number,
  ): Promise<SearchResult[]>;
  explainQuery(query: string): Promise<QueryExplanation>;
}
```

**Implementation Notes:**

- Search is bounded by collection context
- Query explanation supports observability
- Results include relevance scores (transparency)

### Artifact Storage Interface

```typescript
interface ArtifactStorageAdapter {
  listArtifactSets(collectionId: string): Promise<ArtifactSet[]>;
  retrieveArtifact(artifactId: string): Promise<ArtifactData>;
  getProvenance(artifactId: string): Promise<ProvenanceChain>;
}
```

**Implementation Notes:**

- Artifacts tagged with creation metadata
- Provenance chains stored alongside artifacts
- Status field distinguishes "offered" vs "canonical"

---

## ERROR HANDLING

### Error Taxonomy

All errors return explicit error objects with type, message, and optional recovery guidance:

```typescript
type ErrorResponse = {
  error: {
    type: ErrorType;
    message: string;
    recovery?: string;
    context?: object;
  };
};

type ErrorType =
  | 'no_collection_context'
  | 'collection_not_found'
  | 'source_not_found'
  | 'artifact_not_found'
  | 'stream_token_invalid'
  | 'stream_token_expired'
  | 'operation_forbidden'
  | 'ambiguous_request'
  | 'upstream_failure';
```

**Compliance Notes:**

- Silent failure is forbidden (MCP Admission Contract: Observability Surface)
- Recovery guidance provided when applicable (Domicile: Awareness)
- Context included for debugging (observability)

---

## STREAMING IMPLEMENTATION

### Stream State Management

```typescript
interface StreamState {
  token: string;
  query: string;
  collection_id: string;
  created_at: number;
  current_step: StreamStep;
  completed_steps: StreamStep[];
  buffer: StreamChunk[];
  expires_at: number;
}

type StreamStep =
  | 'reference_identifiers'
  | 'passages'
  | 'dense_sections'
  | 'artifact_links';
```

**Key Properties:**

- Stream state is ephemeral (in-memory only)
- 5-minute timeout (expires_at enforced)
- Token is UUID (opaque, unguessable)
- Buffer pre-computed for pull-based retrieval

### Stream Metadata Generation

Each chunk includes:

- **what_changed**: Diff description (e.g., "added 3 references", "expanded context window")
- **why**: Rationale (e.g., "semantic similarity threshold met", "adjacent notebook discovered")
- **progress**: Current/completed/remaining steps

---

## SAFETY GUARANTEES

### Read-Only Enforcement

```typescript
// Enforced at server initialization
const WORLD_CAPABILITIES = {
  read: true,
  write: false,
  mutate: false,
  execute: false,
  persist: false,
} as const;

// All mutation attempts return refusal
function assertReadOnly(operation: string): never {
  throw new Error({
    type: 'operation_forbidden',
    message: `${operation} is forbidden in Open Notebook world`,
    recovery: 'This world is read-only. Use external tools for mutation.',
  });
}
```

### Context Isolation

```typescript
class SessionContext {
  private activeCollection: string | null = null; // SAFE by default

  enterCollection(collectionId: string): void {
    // Replaces previous context (no accumulation)
    this.activeCollection = collectionId;
  }

  requireCollection(): string {
    if (!this.activeCollection) {
      throw new Error({
        type: 'no_collection_context',
        message: 'No active collection. Invoke enter_collection first.',
        recovery: 'Call list_collections, then enter_collection',
      });
    }
    return this.activeCollection;
  }

  exit(): void {
    // Sovereign exit (Domicile: Exit invariant)
    this.activeCollection = null;
  }
}
```

### Provenance Immutability

```typescript
interface ProvenanceChain {
  readonly origin: NotebookReference;
  readonly steps: readonly TransformationStep[];
  readonly checksum: string;
}

// Checksums verified on retrieval
function verifyIntegrity(data: string, expectedChecksum: string): boolean {
  const actualChecksum = sha256(data);
  return actualChecksum === expectedChecksum;
}
```

---

## MCP PROTOCOL MAPPING

### Tool Registration

```typescript
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "describe_world",
        description: "...",
        inputSchema: {...},
        metadata: {
          reversible: true,
          authority_level: "none",
          mutation: false
        }
      },
      // ... all 11 tools
    ]
  };
});
```

**Compliance Notes:**

- All 11 tools enumerated statically (no dynamic invention)
- Metadata includes reversibility declaration
- Tool schemas inspectable before invocation

### Tool Execution

```typescript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  // Structural mediation (all calls go through this handler)
  const result = await executeToolSafely(name, args, sessionContext);

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(result, null, 2),
      },
    ],
    metadata: {
      provenance_available: true,
      constraints_checkable: true,
    },
  };
});
```

---

## DEPLOYMENT CONSIDERATIONS

### Server Lifecycle

```typescript
async function startOpenNotebookMCP() {
  const server = new Server(
    {
      name: 'open-notebook',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {}, // Read-only tools only
      },
    },
  );

  // Register all 11 tools
  registerWorldTools(server);
  registerCollectionTools(server);
  registerRetrievalTools(server);
  registerStreamingTools(server);
  registerProvenanceTools(server);

  // Start server
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('[Open Notebook MCP] Started in SAFE mode');
  console.error('[Open Notebook MCP] No collection context loaded');
}
```

### Configuration

```typescript
interface ServerConfig {
  notebook_storage: {
    type: 'filesystem' | 's3' | 'supabase';
    path: string;
  };
  vector_storage: {
    type: 'pgvector' | 'pinecone' | 'weaviate';
    connection: string;
  };
  artifact_storage: {
    type: 'filesystem' | 's3';
    path: string;
  };
  constraints: {
    max_passage_context: number; // default: 500 chars
    max_search_results: number; // default: 50
    stream_timeout_s: number; // default: 300
    stream_chunk_size: number; // default: 10 items
  };
}
```

---

## VALIDATION CHECKLIST

### Domicile Invariants

- [ ] SAFE: Server starts with no active collection
- [ ] Context: Nothing loaded until explicit `enter_collection`
- [ ] Awareness: All constraints enumerable via `list_constraints`
- [ ] Exit: Collection context clearable; no persistent state

### MCP Admission Contract

- [ ] Enumerated Affordances: Exactly 11 tools, no dynamic invention
- [ ] Structural Mediation: All data access via MCP tools
- [ ] Inspectability: `describe_world` exposes all capabilities
- [ ] Determinism: Read-only = repeatable
- [ ] Reversibility Declaration: All tools marked reversible
- [ ] Observability Surface: All responses include provenance/metadata

### User Constraints

- [ ] No implicit memory: Session state in-memory only
- [ ] No silent mutation: Mutation attempts return explicit refusal
- [ ] All synthesis labeled: Artifacts include `synthesis_metadata`
- [ ] All affordances enumerable: Tool list static and complete
- [ ] Streaming explains: Each chunk includes `stream_metadata` with what/why

---

## NEXT STEPS

### Implementation Order

1. **Core Infrastructure** (world.ts, context.ts)
   - Server initialization
   - Session context management
   - Constraint declarations

2. **Collection Management** (collections.ts)
   - list_collections
   - enter_collection
   - Collection metadata storage adapter

3. **Retrieval Tools** (retrieval.ts)
   - semantic_search
   - fetch_passage
   - Vector search adapter
   - Notebook storage adapter

4. **Artifact System** (artifacts.ts)
   - list_artifact_sets
   - retrieve_artifact
   - Provenance chain tracking
   - Artifact storage adapter

5. **Streaming System** (streaming.ts)
   - begin_result_stream
   - next_stream_chunk
   - Stream state management
   - Metadata generation

6. **Provenance Tools** (world.ts)
   - explain_provenance
   - Integrity verification

### Testing Strategy

- **Unit Tests**: Each tool in isolation
- **Integration Tests**: Tool sequences (enter_collection → semantic_search → fetch_passage)
- **Contract Tests**: Verify compliance with OPEN_NOTEBOOK_MCP_AFFORDANCES.md
- **Safety Tests**: Verify mutation refusals, context isolation
- **MCP Protocol Tests**: Verify ListTools, CallTool handlers

---

## INTERPRETATION RULE

When implementation choices are ambiguous:

1. Reduce scope (return less data)
2. Increase reversibility (prefer read-only)
3. Increase observability (add metadata)
4. Preserve operator sovereignty (explicit context management)

When in doubt: do nothing, explain why.

---

## WORLD SEAL

This design exists to:

- Preserve human-authored cognition
- Enable safe inspection and retrieval
- Prevent ungoverned synthesis
- Support downstream reasoning only through explicit contracts

This world is a library, not a mind.
