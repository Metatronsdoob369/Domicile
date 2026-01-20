# MCP_ADMISSION_CONTRACT

This document defines the conditions under which an MCP server
may be admitted as a valid jurisdiction inside Domicile.

This is not a description of MCP.
This is not a guarantee of trust.
This is an admission contract.

Domicile remains tool-agnostic.
MCP is one admissible physics, not the law itself.

---

## ADMISSION SCOPE

This contract governs:

- whether an MCP server may exist inside Domicile
- not how MCP works internally
- not how agents reason
- not what worlds do

Failure to meet any requirement results in non-admission.

---

## REQUIRED PROPERTIES (NON-NEGOTIABLE)

An MCP server MAY be admitted only if all of the following are true:

### 1. ENUMERATED AFFORDANCES

- All executable actions are explicitly enumerated.
- No dynamic tool invention is permitted.
- Affordances must be inspectable prior to invocation.

---

### 2. STRUCTURAL MEDIATION

- Execution must be mediated by the MCP server.
- Direct execution paths are forbidden.
- The caller must not bypass MCP mediation under any condition.

---

### 3. INSPECTABILITY

- World state must be queryable before action.
- Action parameters must be inspectable.
- Preconditions and postconditions must be expressible.

---

### 4. DETERMINISM

- Given the same state and inputs, behavior must be repeatable.
- Non-deterministic side effects must be surfaced explicitly.
- Hidden randomness is grounds for rejection.

---

### 5. REVERSIBILITY DECLARATION

- Each action must declare whether it is reversible.
- Irreversible actions must be explicitly labeled as such.
- Silent irreversibility is forbidden.

---

### 6. OBSERVABILITY SURFACE

- Action execution must produce observable outcomes.
- Failures must be explicit and local.
- Silent failure is forbidden.

---

## PROHIBITIONS

The following are absolute disqualifiers:

- Tool invention at runtime
- Implicit execution paths
- Ambient authority
- Hidden state mutation
- Memory persistence without declaration
- Execution without inspection

---

## RELATION TO DOMICILE LAW

This contract does not supersede Domicile invariants.

Specifically:

- SAFE remains the default state
- Nothing executes without explicit arming
- Context must be deliberately loaded
- Exit remains sovereign
- Memory remains opt-in and tiered

Admission does not imply permission to execute.

---

## REPLACEMENT CLAUSE

This contract is replaceable.

If a future system provides equivalent or superior
contract-physics guarantees, it may replace MCP
without changing Domicile law.

Domicile does not depend on MCP.
MCP depends on admission.

---

## INTERPRETATION RULE

When ambiguity exists:

- choose non-admission
- choose reduced capability
- choose reversibility
- choose inspectability

Jurisdiction is a privilege, not a right.
