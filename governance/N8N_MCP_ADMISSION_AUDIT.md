# N8N_MCP_ADMISSION_AUDIT

**Repository:** https://github.com/czlonkowski/n8n-mcp
**Audit Date:** 2026-01-20
**Auditor:** Claude Sonnet 4.5
**Audit Scope:** Compliance with `MCP_ADMISSION_CONTRACT.md`

---

## EXECUTIVE SUMMARY

**Admission Status:** ❌ **DENIED (Current Implementation)**

n8n-MCP provides valuable workflow automation capabilities but **fails 3 of 6 required admission properties** in its current form. The implementation is optimized for ease-of-use rather than safety-by-default, violating Domicile's core invariants.

**Path Forward:** Custom implementation required (similar to Open Notebook MCP).

---

## DETAILED COMPLIANCE AUDIT

### 1. ENUMERATED AFFORDANCES ✓ **PASS**

**Requirement:** All executable actions explicitly enumerated, no dynamic tool invention, affordances inspectable prior to invocation.

**Finding:** COMPLIANT

**Evidence:**

- Documentation tools: 7 explicitly defined (`tools.ts:9-433`)
- Management tools: 12 explicitly defined (`tools-n8n-manager.ts:9-606`)
- Total: 19 enumerated affordances
- No runtime tool generation detected
- All tools have full JSON schemas

**Tool Categories:**

```
READ (7 tools):
  - tools_documentation
  - search_nodes
  - get_node
  - validate_node
  - get_template
  - search_templates
  - validate_workflow

WRITE (10 tools):
  - n8n_create_workflow
  - n8n_update_full_workflow
  - n8n_update_partial_workflow
  - n8n_delete_workflow
  - n8n_autofix_workflow
  - n8n_test_workflow
  - n8n_deploy_template
  - n8n_workflow_versions (rollback/delete modes)

MIXED (2 tools):
  - n8n_list_workflows (read)
  - n8n_get_workflow (read)
  - n8n_validate_workflow (read)
  - n8n_executions (get/list = read, delete = write)
  - n8n_health_check (read)
```

---

### 2. STRUCTURAL MEDIATION ✓ **PASS**

**Requirement:** Execution mediated by MCP server, direct execution paths forbidden, no MCP bypass.

**Finding:** COMPLIANT

**Evidence:**

- All n8n API calls go through MCP tool handlers
- No direct n8n API exposure detected
- Client must invoke MCP tools to interact with n8n
- API credentials managed server-side (`instance-context.ts`)

---

### 3. INSPECTABILITY ⚠️ **PARTIAL FAIL**

**Requirement:** World state queryable before action, action parameters inspectable, preconditions/postconditions expressible.

**Finding:** PARTIALLY COMPLIANT

**Strengths:**

- Workflow structures are inspectable before execution (`n8n_get_workflow`)
- Node configurations can be validated before use (`validate_node`)
- Templates can be previewed before deployment (`get_template`)
- Execution history is queryable (`n8n_executions` with action='list')

**Critical Gaps:**

1. **No side-effect preview:** Cannot inspect what a workflow WILL DO before execution
   - Example: Before `n8n_test_workflow`, cannot see "This will send email to user@example.com"
   - Workflow may call 50 external APIs - no pre-execution inspection of actual operations

2. **External API opacity:** Workflows interact with Gmail, Slack, databases, etc.
   - These external systems are not inspectable through the MCP interface
   - Cannot query "what will this Gmail node do to my mailbox?"

3. **No precondition enforcement:** Tools execute immediately if API is available
   - No "dry-run" mode that shows intended effects without executing

**Verdict:** Fails full inspectability requirement. Workflow structure ≠ workflow effects.

---

### 4. DETERMINISM ⚠️ **PARTIAL FAIL**

**Requirement:** Same state + inputs = repeatable behavior, non-deterministic side effects surfaced explicitly, hidden randomness forbidden.

**Finding:** PARTIALLY COMPLIANT

**Deterministic Aspects:**

- Workflow structure operations are deterministic (create/update/delete workflows)
- Validation results are deterministic (same workflow → same errors)
- Template fetching is deterministic (same template ID → same workflow)

**Non-Deterministic Aspects NOT Surfaced:**

1. **Workflow execution results:** `n8n_test_workflow` calls external APIs
   - Gmail API may return different results based on mailbox state
   - HTTP Request nodes depend on external service state
   - Database queries return different data over time
   - **NOT DECLARED as non-deterministic in tool schema**

2. **Execution timing:** Workflow execution duration varies
   - Depends on external API latency
   - No timeout guarantees in tool definition

3. **Credential state:** API credentials may expire or change permissions
   - No declaration of this non-determinism

**Evidence from code:**

```typescript
// tools-n8n-manager.ts:330-388
name: 'n8n_test_workflow',
annotations: {
  readOnlyHint: false,
  destructiveHint: false,  // ❌ WRONG - execution can be destructive!
  openWorldHint: true,
}
```

**Verdict:** Non-determinism exists but is NOT "surfaced explicitly" per requirement.

---

### 5. REVERSIBILITY DECLARATION ❌ **FAIL**

**Requirement:** Each action must declare reversibility, irreversible actions explicitly labeled, silent irreversibility forbidden.

**Finding:** NOT COMPLIANT

**Tool-Level Annotations Present:**

```typescript
// They have destructiveHint in annotations:
destructiveHint: true; // n8n_delete_workflow, n8n_executions (delete)
destructiveHint: false; // n8n_create_workflow, n8n_update_*, n8n_test_workflow
```

**Critical Failures:**

1. **`n8n_test_workflow` marked `destructiveHint: false`** (Line 386)
   - This tool EXECUTES workflows
   - A workflow can send emails (irreversible)
   - A workflow can create database records (maybe reversible)
   - A workflow can charge credit cards (irreversible)
   - **Marking this as non-destructive is DANGEROUSLY WRONG**

2. **No per-node reversibility classification:**
   - 1,084 nodes in the system
   - No metadata indicating which nodes are reversible vs. irreversible
   - Cannot distinguish between:
     - `Gmail.send` (irreversible - email sent)
     - `Gmail.read` (read-only - safe)
     - `PostgreSQL.insert` (reversible if you track IDs)
     - `PostgreSQL.update` (irreversible if you don't snapshot)

3. **No workflow-level reversibility analysis:**
   - Before executing workflow, cannot determine: "This workflow is irreversible"
   - No tool to classify workflow by maximum destructiveness of its nodes

4. **`destructiveHint` is just a hint:**
   - Not enforced
   - Not validated
   - Just metadata

**What's Required for Compliance:**

```typescript
// Each of 1,084 nodes needs:
interface NodeReversibility {
  nodeType: string;
  reversible: boolean | 'conditional';
  explanation: string;
  // Example:
  // nodeType: "nodes-base.gmail.send"
  // reversible: false
  // explanation: "Sends email. Cannot be unsent."
}

// Each workflow execution needs:
interface WorkflowReversibilityAnalysis {
  workflowId: string;
  isReversible: boolean;
  irreversibleNodes: string[];
  reversibilityReport: string;
  // Before execution, agent sees:
  // "This workflow contains 1 irreversible node: Gmail.send
  //  Execution will send email to user@example.com.
  //  This action cannot be undone."
}
```

**Verdict:** Silent irreversibility throughout. **CRITICAL FAILURE.**

---

### 6. OBSERVABILITY SURFACE ✓ **PASS**

**Requirement:** Action execution produces observable outcomes, failures explicit and local, silent failure forbidden.

**Finding:** COMPLIANT

**Evidence:**

- All tools return structured responses with success/error states
- Execution errors surfaced via `n8n_executions` with mode='error' (Line 425)
- Validation errors explicitly returned (Line 163-209)
- HTTP errors propagated from n8n API

**Examples:**

```typescript
// validate_node returns explicit error structure:
{
  valid: boolean,
  errors: Array<{type, property, message, fix}>,
  warnings: Array<{type, property, message, suggestion}>
}

// n8n_executions with mode='error' returns:
{
  errorNode: string,
  errorMessage: string,
  errorDetails: string,
  stackTrace: string (optional),
  upstreamData: {...}
}
```

---

## PROHIBITIONS AUDIT

Per `MCP_ADMISSION_CONTRACT.md:80-90`, the following are absolute disqualifiers:

| Prohibition                            | Status      | Evidence                                                        |
| -------------------------------------- | ----------- | --------------------------------------------------------------- |
| Tool invention at runtime              | ✓ Pass      | No dynamic tool generation                                      |
| Implicit execution paths               | ✓ Pass      | All execution via MCP tools                                     |
| Ambient authority                      | ✓ Pass      | API credentials in context, not ambient                         |
| Hidden state mutation                  | ❌ **FAIL** | Workflow execution mutates external systems without declaration |
| Memory persistence without declaration | ✓ Pass      | Session state declared (`session-state.ts`)                     |
| Execution without inspection           | ❌ **FAIL** | Can execute workflows without inspecting side effects           |

---

## DOMICILE LAW COMPLIANCE

Per `MCP_ADMISSION_CONTRACT.md:94-106`, MCP servers must respect Domicile invariants:

### SAFE Remains Default State ❌ **FAIL**

**Requirement:** "Nothing executes without explicit arming"

**Finding:** NOT COMPLIANT

**Evidence:**

- No session state initialization with `armed: false`
- No `arm_execution()` / `disarm()` tools
- Calling `n8n_test_workflow` immediately executes
- No two-phase commit pattern (inspect → confirm → execute)

**Required Pattern (Not Present):**

```typescript
// Session should start:
{
  armed: false,  // SAFE by default
  pendingExecution: null
}

// Agent flow should be:
1. agent.inspect_workflow(id) → see what it will do
2. agent.arm_execution(id) → enter armed state
3. user.confirm() → explicit human approval
4. agent.execute_workflow(id) → only works if armed
5. auto-disarm after execution
```

### Context Must Be Deliberately Loaded ⚠️ **PARTIAL**

**Finding:** PARTIALLY COMPLIANT

- API credentials must be provided (not ambient) ✓
- But no "load workflow context" step before operations
- Workflows can be executed without prior context inspection

### Awareness: Nothing Invisible ❌ **FAIL**

**Finding:** NOT COMPLIANT

- Workflow execution side effects are invisible until after execution
- External API interactions not surfaced before invocation
- 1,084 nodes have undeclared behaviors

### Exit Remains Sovereign ✓ **PASS**

**Finding:** COMPLIANT

- Session can be terminated
- No persistent background execution detected

---

## ARCHITECTURAL ASSESSMENT

### What n8n-MCP Is Good At

1. **Node Discovery & Documentation:**
   - Excellent search and documentation tools
   - 99% node specification coverage
   - 87% documentation coverage
   - Real-world configuration examples

2. **Workflow Structure Management:**
   - Programmatic workflow creation/update/deletion
   - Validation and auto-fixing
   - Version history and rollback

3. **Template System:**
   - 2,709 workflow templates
   - Template deployment and customization
   - Metadata-based search

### What n8n-MCP Is NOT

1. **NOT a SAFE-by-default execution environment**
   - Optimized for developer convenience
   - Executes immediately on invocation
   - No arming/disarming protocol

2. **NOT inspectable at the effect level**
   - Can inspect workflow structure
   - Cannot inspect "what will this do to the world"

3. **NOT declaratively safe**
   - Reversibility not classified per-node
   - Side effects not enumerated before execution

---

## JURISDICTION RECOMMENDATION

### If Admitted AS-IS: **DANGEROUS**

Combining n8n-MCP with Open Notebook MCP in current form creates risk:

**Failure Scenario:**

```
1. Agent reads from Open Notebook: "User mentioned wanting to email team"
2. Agent searches n8n: finds email workflow
3. Agent executes: n8n_test_workflow(id)
4. Email sent to 50 people
5. No confirmation, no inspection, irreversible
```

### Two Paths Forward

#### **Path A: Wrapper Implementation (Recommended)**

Create a Domicile-compliant wrapper around n8n-MCP:

**New MCP Server:** `domicile-n8n-mcp`

**Architecture:**

```
domicile-n8n-mcp (SAFE wrapper)
    ├── Enforces Domicile invariants
    ├── Adds SAFE-by-default state
    ├── Adds reversibility classification
    ├── Adds side-effect inspection
    └── Delegates to n8n-mcp for actual execution
```

**New Affordances:**

```typescript
// READ jurisdiction (always safe)
-describe_n8n_world -
  list_n8n_workflows -
  inspect_workflow_structure -
  inspect_workflow_effects - // NEW: "This workflow will send email to X"
  classify_workflow_reversibility - // NEW: Returns reversibility analysis
  search_n8n_nodes -
  get_node_reversibility - // NEW: Per-node reversibility metadata
  // WRITE jurisdiction (requires arming)
  enter_workflow_context - // Load specific workflow for inspection
  arm_n8n_execution - // Explicit arming step
  execute_armed_workflow - // Only works if armed
  disarm_n8n_execution - // Return to SAFE
  create_workflow; // Structure only, no execution
```

**State Management:**

```typescript
class DomicileN8nContext {
  armed: boolean = false; // SAFE by default
  activeWorkflowContext: string | null = null;
  lastInspectionResult: WorkflowEffects | null = null;

  requireArmed(): void {
    if (!this.armed) {
      throw new Error(
        'Execution disarmed. Use arm_n8n_execution first.',
        'Call inspect_workflow_effects, then arm_n8n_execution',
      );
    }
  }
}
```

**Reversibility Database:**

```sql
-- Classify all 1,084 nodes
CREATE TABLE node_reversibility (
  node_type TEXT PRIMARY KEY,
  reversible BOOLEAN NOT NULL,
  explanation TEXT NOT NULL,
  requires_tracking BOOLEAN,  -- e.g., DB inserts need ID tracking for reversal
  side_effects TEXT[]  -- ["sends_email", "creates_record", "charges_card"]
);

-- Example entries:
-- ('nodes-base.gmail.send', false, 'Sends email. Cannot be unsent.', false, ['sends_email'])
-- ('nodes-base.gmail.read', true, 'Reads email. Read-only operation.', false, [])
-- ('nodes-base.postgres.insert', true, 'Inserts record. Reversible if ID tracked.', true, ['creates_record'])
```

**Implementation Effort:**

- Governance document: `governance/N8N_JURISDICTION.md` (1-2 hours)
- Wrapper MCP server: 500-800 lines TypeScript (6-10 hours)
- Reversibility classification: Manual review of top 100 nodes (4-6 hours)
- Testing and integration: 4-6 hours
- **Total: 2-3 days**

#### **Path B: Fork n8n-mcp**

Fork the repository and rebuild with Domicile compliance:

- Longer timeline (1-2 weeks)
- More control over implementation
- Can contribute fixes upstream
- Maintains compatibility with n8n ecosystem

---

## COMPARISON: Open Notebook MCP vs. n8n-MCP

| Property             | Open Notebook MCP             | n8n-MCP (current)           | n8n-MCP (wrapped)      |
| -------------------- | ----------------------------- | --------------------------- | ---------------------- |
| **Jurisdiction**     | READ                          | EXECUTE                     | EXECUTE                |
| **Default State**    | SAFE (activeCollection: null) | ARMED (immediate execution) | SAFE (armed: false)    |
| **Side Effects**     | None (read-only)              | Many (external APIs)        | Declared & inspectable |
| **Reversibility**    | N/A (no mutation)             | Undeclared                  | Classified per-node    |
| **Inspectability**   | Complete (all data sourced)   | Structure only              | Structure + effects    |
| **Admission Status** | ✅ COMPLIANT                  | ❌ NON-COMPLIANT            | ✅ COMPLIANT           |

---

## FINAL VERDICT

### Current Implementation: ❌ **REJECTED**

n8n-MCP fails admission requirements:

- ❌ Requirement 3: Inspectability (partial - no effect preview)
- ❌ Requirement 4: Determinism (non-determinism not surfaced)
- ❌ Requirement 5: Reversibility (silent irreversibility)
- ❌ SAFE-by-default (immediate execution)
- ❌ Awareness (invisible side effects)

### Recommended Action: **Custom Wrapper Implementation**

**Priority: High** (if workflow automation is needed for Phase 2)

**Effort: 2-3 days** for production-ready wrapper

**Benefits:**

1. Preserves n8n ecosystem (1,084 nodes, 2,709 templates)
2. Adds Domicile safety guarantees
3. Maintains separation: Open Notebook (READ) + Domicile-n8n (EXECUTE)
4. Clear jurisdiction boundaries
5. Reversibility classified and enforced

**Governance Work Required:**

1. Create `governance/N8N_JURISDICTION.md`
2. Define EXECUTE world boundaries
3. Classify node reversibility (at minimum, top 100 nodes)
4. Define arming protocol
5. Specify side-effect inspection requirements

---

## REFERENCE

**Admission Contract:** `governance/MCP_ADMISSION_CONTRACT.md`
**Domicile Invariants:** `governance/DOMICILE_MIRROR.md`
**Open Notebook Design:** `governance/OPEN_NOTEBOOK_MCP_DESIGN.md`
**n8n-MCP Repository:** https://github.com/czlonkowski/n8n-mcp

**Audit Methodology:**

- Cloned repository to `/tmp/n8n-mcp-inspect`
- Read source files:
  - `src/mcp/tools.ts` (471 lines) - Documentation tools
  - `src/mcp/tools-n8n-manager.ts` (606 lines) - Management tools
  - `src/types/session-state.ts` - Session management
  - `src/types/instance-context.ts` - Configuration
  - `src/telemetry/mutation-types.ts` - Mutation tracking
- Verified against 6 required properties + prohibitions + Domicile law
- Cross-referenced with existing Open Notebook MCP implementation

**Confidence Level:** High (direct source code review)

---

**Conclusion:** n8n-MCP provides valuable capabilities but requires a safety wrapper to meet Domicile admission standards. The wrapper is architecturally straightforward and preserves the power of the n8n ecosystem while adding SAFE-by-default guarantees.

Recommend **Phase 2 work** after Phase 1 governance is stable.
