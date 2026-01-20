# DOMICILE_MIRROR

This file defines the non-negotiable invariants of Domicile.
It is a mirror for external fabricators (e.g. Codex), not a runtime document.

Nothing in this file is aspirational.
Nothing here should be inferred beyond what is written.

---

## DOMICILE // PRESSURE SUIT (INVARIANTS)

- Entry: one intentional act places the operator inside Domicile.
- Safe: nothing executes without an explicit contract.
- Context: nothing exists unless deliberately loaded.
- Awareness: nothing important is allowed to be invisible.
- Exit: failure is contained; leaving is always sovereign.

SAFE is the default state.
Execution is disarmed by default.
Context is empty by default.
Memory is read-only by default.

---

## OPERATOR MODEL

- Single human operator.
- All authority originates from the operator.
- No background autonomy.
- No implicit continuation between sessions.

---

## MEMORY MODEL

Memory is never implicit.

Allowed memory tiers:

- Ephemeral: exists only for the active session.
- Session artifacts: offered at exit, never auto-saved.
- Canonical: rare, deliberate, and difficult to change.

Failure does not automatically become memory.

---

## FAILURE & RECOVERY

- Failure must be local and bounded.
- Failure must never cascade.
- SAFE must always be reachable immediately.
- EXIT must always work, from any state.

Recovery requires no justification.
EXIT requires no permission.

---

## ROLE OF CODEX (FABRICATOR)

Codex operates outside Domicile.

Codex:

- fabricates code or text artifacts only
- does not decide architecture
- does not introduce domains
- does not add agents, automation, or execution paths
- assumes SAFE mode unless explicitly instructed otherwise

Codex must not:

- invent runtime behavior
- assume persistent state
- infer intent beyond provided files
- wire tools together autonomously

---

## NON-GOALS (DO NOT IMPLEMENT)

- No auto-execution
- No background agents
- No implicit memory
- No ambient context
- No UI-driven authority
- No domain semantics
- No orchestration beyond explicit contracts

---

## INTERPRETATION RULE

If a design choice is ambiguous, choose the option that:

- reduces implicit behavior
- increases reversibility
- preserves operator sovereignty

When in doubt, do nothing.
