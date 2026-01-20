# OPEN_NOTEBOOK_MCP_AFFORDANCES

This document defines the complete and exclusive affordance surface
of the Open Notebook MCP world.

This is a declaration of reality.
Anything not listed here does not exist in this world.

This file is normative.

---

## WORLD IDENTITY

World Name: Open Notebook  
World Type: Read-only knowledge jurisdiction  
Authority Level: None  
Mutation: Forbidden  
Persistence: External only (artifacts, vectors)

This world exposes previously human-authored material and derived
artifacts for inspection and retrieval only.

It does not reason.
It does not learn.
It does not decide.

---

## CORE AFFORDANCES (READ-ONLY)

### 1. describe_world

Returns:

- world purpose
- scope boundaries
- explicit prohibitions
- citation and provenance requirements

Produces no content payloads.

---

### 2. list_collections

Returns:

- available notebook collections
- collection identifiers
- high-level metadata (title, date range, domain tags)

Does not return notebook contents.

---

### 3. enter_collection

Parameters:

- collection_id

Effect:

- establishes active context
- restricts all subsequent operations to this collection

Entering a collection does not preload data.

---

### 4. list_artifact_sets

Returns:

- artifact sets derived from the active collection
- artifact types
- creation timestamps
- status indicators (offered / canonical)

Does not return artifact contents.

---

## RETRIEVAL AFFORDANCES

### 5. semantic_search

Parameters:

- query
- k (maximum results)

Returns:

- ranked reference identifiers
- relevance scores
- source pointers

Does not return full text.

---

### 6. fetch_passage

Parameters:

- source_id

Returns:

- exact quoted passage
- bounded context window
- original notebook reference
- export provenance

No paraphrasing.
No synthesis.

---

### 7. retrieve_artifact

Parameters:

- artifact_id

Returns:

- full artifact contents
- artifact metadata
- provenance chain
- non-authoritative disclaimer

Artifacts are immutable.

---

## STREAMING / INCREMENTAL DISCLOSURE

### 8. begin_result_stream

Parameters:

- query

Returns:

- opaque stream token
- disclosure policy describing step order

No content returned.

---

### 9. next_stream_chunk

Parameters:

- stream_token

Returns incrementally:

- reference identifiers
- then passages
- then dense sections
- then artifact links

Streaming is pull-based only.
Streaming may be canceled at any time.

---

## PROVENANCE & SAFETY

### 10. explain_provenance

Parameters:

- source_id or artifact_id

Returns:

- origin notebook
- transformation steps
- tools involved
- confidence notes

No new interpretation permitted.

---

### 11. list_constraints

Returns:

- mutation prohibitions
- scope limits
- citation requirements
- refusal conditions

Must always be complete and truthful.

---

## EXPLICIT NON-AFFORDANCES

The following capabilities do not exist in this world:

- Writing, editing, or deleting notebooks
- Modifying vectors or embeddings
- Generating new knowledge
- Applying reasoning outcomes
- Persisting memory
- Triggering workflows
- Scheduling tasks
- Calling external tools
- Expanding affordances dynamically

Requests for these capabilities must be refused with explanation.

---

## INTERPRETATION RULE

When ambiguity exists:

- reduce scope
- return less data
- prefer references over content
- prefer artifacts over synthesis

When in doubt:
Do not answer.
Explain why.

---

## WORLD SEAL

This world exists to:

- preserve human-authored cognition
- enable safe inspection and retrieval
- prevent ungoverned synthesis
- support downstream reasoning only through explicit contracts

This world is a library, not a mind.
