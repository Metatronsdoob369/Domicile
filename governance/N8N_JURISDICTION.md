# N8N_JURISDICTION

**World Type:** EXECUTE
**Jurisdiction:** Workflow Automation
**Admission Status:** Conditional (requires wrapper implementation)
**Related Documents:** `MCP_ADMISSION_CONTRACT.md`, `N8N_MCP_ADMISSION_AUDIT.md`

---

## JURISDICTION IDENTITY

This document defines the boundaries and laws for the **n8n EXECUTE jurisdiction** within Domicile.

**What this world does:**

- Automates workflows across external services
- Sends emails, creates records, calls APIs
- Executes irreversible actions in the physical world

**What this world is not:**

- Not a READ jurisdiction (use Open Notebook for memory/context)
- Not a storage system (workflows are configurations, not data)
- Not ambient execution (requires explicit arming)

---

## WORLD BOUNDARIES

### SCOPE

The n8n jurisdiction governs:

1. **Workflow Structure Management**
   - Creating workflow definitions
   - Updating workflow configurations
   - Deleting workflow structures
   - Validating workflow schemas

2. **Workflow Execution**
   - Triggering workflow runs
   - Monitoring execution state
   - Retrieving execution results
   - Managing execution history

3. **Node Ecosystem**
   - Discovering available nodes (1,084+ integrations)
   - Retrieving node documentation
   - Validating node configurations
   - Classifying node reversibility

4. **Template System**
   - Searching workflow templates
   - Deploying templates to instance
   - Customizing template configurations

### OUT OF SCOPE

The n8n jurisdiction does NOT govern:

- Long-term memory storage → Use Open Notebook
- Conversation history → Use Open Notebook
- User preferences → Use Open Notebook
- Knowledge synthesis → Use Open Notebook
- Credential management → Handled by n8n instance
- External API behaviors → External to Domicile

---

## DOMICILE INVARIANTS APPLIED

### 1. SAFE IS THE DEFAULT STATE

**Requirement:** Execution is disarmed by default.

**Implementation:**

```typescript
interface N8nSessionContext {
  // SAFE by default
  armed: boolean; // MUST start as false

  // Context must be loaded explicitly
  activeWorkflowContext: string | null; // MUST start as null

  // Last inspection result (for informed arming)
  lastEffectInspection: WorkflowEffects | null;

  // Execution history
  executionLog: ExecutionRecord[];
}

// Initialization
function createN8nContext(): N8nSessionContext {
  return {
    armed: false, // SAFE by default
    activeWorkflowContext: null,
    lastEffectInspection: null,
    executionLog: [],
  };
}
```

**Enforcement:**

- All execution tools MUST call `requireArmed()`
- Arming MUST require prior effect inspection
- Arming MUST be workflow-specific (not global)
- Disarming MUST occur after each execution

### 2. CONTEXT IS EXPLICIT

**Requirement:** Nothing is loaded without deliberate action.

**Implementation:**

**Three-Phase Protocol:**

**Phase 1: Discovery (SAFE)**

```typescript
// Agent searches for workflows
search_n8n_workflows(query: "email automation")
→ Returns list of workflow IDs and names
→ No workflow context loaded yet
→ Still SAFE
```

**Phase 2: Inspection (SAFE)**

```typescript
// Agent loads workflow for inspection
enter_workflow_context(workflowId: "wf_123")
→ Loads workflow structure
→ activeWorkflowContext = "wf_123"
→ Still SAFE (not armed)

// Agent inspects effects
inspect_workflow_effects(workflowId: "wf_123")
→ Returns: {
    irreversibleNodes: ["Gmail.send"],
    effects: [
      {
        node: "Gmail.send",
        action: "send_email",
        target: "team@example.com",
        reversible: false,
        explanation: "Email will be sent. Cannot be unsent."
      }
    ],
    maxDestructiveness: "irreversible",
    summary: "This workflow will send 1 email to team@example.com"
  }
→ lastEffectInspection = <result>
→ Still SAFE (not armed)
```

**Phase 3: Execution (ARMED)**

```typescript
// Agent arms execution
arm_n8n_execution(workflowId: "wf_123")
→ Requires lastEffectInspection !== null
→ armed = true
→ NOW DANGEROUS

// Agent executes
execute_armed_workflow(workflowId: "wf_123", data: {...})
→ Requires armed === true
→ Requires activeWorkflowContext === workflowId
→ Executes workflow
→ Logs execution to executionLog
→ AUTO-DISARMS after execution
→ Returns to SAFE
```

**Exit:**

```typescript
// Agent exits workflow context
exit_workflow_context()
→ activeWorkflowContext = null
→ armed = false
→ lastEffectInspection = null
→ Returns to SAFE
```

### 3. AWARENESS: NOTHING IS INVISIBLE

**Requirement:** All affordances enumerable, all effects inspectable.

**Implementation:**

**Affordances Must Be Enumerable:**

```typescript
// Tool: describe_n8n_world
function describeN8nWorld() {
  return {
    world: 'n8n EXECUTE jurisdiction',
    purpose: 'Workflow automation with reversibility awareness',
    affordances: [
      // READ operations (always safe)
      'describe_n8n_world',
      'list_n8n_workflows',
      'search_n8n_nodes',
      'get_node_info',
      'get_node_reversibility',

      // INSPECT operations (safe, required before execution)
      'enter_workflow_context',
      'inspect_workflow_structure',
      'inspect_workflow_effects',
      'classify_workflow_reversibility',

      // WRITE operations (structure only, no execution)
      'create_workflow',
      'update_workflow',
      'delete_workflow',
      'validate_workflow',

      // EXECUTE operations (requires arming)
      'arm_n8n_execution',
      'execute_armed_workflow',
      'disarm_n8n_execution',

      // EXIT operations
      'exit_workflow_context',
    ],
    capabilities: {
      read: true,
      inspect: true,
      mutate_structure: true,
      execute_workflows: true, // Requires arming
    },
    constraints: {
      execution_requires_arming: true,
      effects_must_be_inspectable: true,
      reversibility_must_be_declared: true,
      auto_disarm_after_execution: true,
    },
  };
}
```

**Effects Must Be Inspectable:**

Every workflow execution MUST provide pre-execution effect summary:

```typescript
interface WorkflowEffects {
  workflowId: string;
  workflowName: string;

  // Node-level effects
  nodes: Array<{
    nodeId: string;
    nodeType: string;
    nodeName: string;
    reversible: boolean;
    sideEffects: string[]; // ["sends_email", "creates_record", etc.]
    explanation: string;
    intendedAction: string; // Human-readable description
  }>;

  // Aggregate reversibility
  maxDestructiveness: 'read_only' | 'reversible' | 'irreversible';
  irreversibleNodes: string[];

  // Summary for user
  summary: string; // "This workflow will send 1 email and create 2 database records"
  warnings: string[];

  // Required user confirmations
  requiresConfirmation: boolean;
  confirmationPrompt: string | null;
}
```

**Example Output:**

```json
{
  "workflowId": "wf_email_summary",
  "workflowName": "Weekly Team Summary",
  "nodes": [
    {
      "nodeId": "node_gmail_1",
      "nodeType": "nodes-base.gmail.send",
      "nodeName": "Send Summary Email",
      "reversible": false,
      "sideEffects": ["sends_email"],
      "explanation": "Sends email via Gmail. Email cannot be unsent once delivered.",
      "intendedAction": "Send email to team@example.com with subject 'Weekly Summary'"
    },
    {
      "nodeId": "node_sheets_1",
      "nodeType": "nodes-base.googleSheets.append",
      "nodeName": "Log to Sheet",
      "reversible": true,
      "sideEffects": ["appends_row"],
      "explanation": "Appends row to Google Sheet. Row can be deleted if row number is tracked.",
      "intendedAction": "Append summary data to 'Team Metrics' sheet"
    }
  ],
  "maxDestructiveness": "irreversible",
  "irreversibleNodes": ["Send Summary Email"],
  "summary": "This workflow will send 1 email to team@example.com and append 1 row to Google Sheet 'Team Metrics'",
  "warnings": [
    "Email cannot be unsent after delivery",
    "Ensure team@example.com is correct before proceeding"
  ],
  "requiresConfirmation": true,
  "confirmationPrompt": "Send email to team@example.com? This action cannot be undone."
}
```

### 4. EXIT IS SOVEREIGN

**Requirement:** User can exit at any time.

**Implementation:**

- `exit_workflow_context()` available at all times
- Auto-disarm on exit
- No persistent execution (workflows complete or timeout)
- Session termination stops all pending operations

---

## REVERSIBILITY CLASSIFICATION

### NODE-LEVEL REVERSIBILITY

Every node MUST be classified into one of three categories:

#### Category 1: READ_ONLY

**Definition:** No side effects. Purely observational.

**Examples:**

- `nodes-base.gmail.read` - Reads email
- `nodes-base.httpRequest` (GET method) - Fetches data
- `nodes-base.googleSheets.read` - Reads spreadsheet
- `nodes-base.postgres.select` - Queries database

**Properties:**

```typescript
{
  reversible: true,
  sideEffects: [],
  requiresTracking: false,
  explanation: "Read-only operation. No modifications to external systems."
}
```

#### Category 2: REVERSIBLE

**Definition:** Creates side effects, but can be undone with tracking.

**Examples:**

- `nodes-base.googleSheets.append` - Can delete row if ID tracked
- `nodes-base.postgres.insert` - Can delete record if ID tracked
- `nodes-base.slack.postMessage` - Can delete message if message ID tracked
- `nodes-base.github.createIssue` - Can close issue if issue number tracked

**Properties:**

```typescript
{
  reversible: true,
  sideEffects: ["creates_record", "modifies_data"],
  requiresTracking: true,
  trackingField: "id" | "row_number" | "message_ts",
  explanation: "Creates record. Reversible if tracking field is captured.",
  reversalProcedure: "Delete record using tracked ID"
}
```

#### Category 3: IRREVERSIBLE

**Definition:** Side effects that cannot be undone.

**Examples:**

- `nodes-base.gmail.send` - Email cannot be unsent
- `nodes-base.stripe.charge` - Payment cannot be auto-reversed
- `nodes-base.twilio.sendSms` - SMS cannot be unsent
- `nodes-base.postgres.update` (without snapshot) - Original data lost
- `nodes-base.httpRequest` (POST/PUT/DELETE to external API) - API-dependent

**Properties:**

```typescript
{
  reversible: false,
  sideEffects: ["sends_email", "charges_card", "sends_sms", "modifies_data"],
  requiresTracking: false,
  explanation: "Action cannot be undone once executed.",
  mitigations: [
    "Verify recipient before execution",
    "Use test mode if available",
    "Implement confirmation step"
  ]
}
```

### WORKFLOW-LEVEL REVERSIBILITY

Workflow reversibility is the **maximum destructiveness** of any node in the workflow:

```typescript
function classifyWorkflowReversibility(
  workflow: Workflow,
): WorkflowReversibility {
  const nodeClassifications = workflow.nodes.map((node) =>
    getNodeReversibility(node.type),
  );

  // If ANY node is irreversible, workflow is irreversible
  if (nodeClassifications.some((n) => !n.reversible)) {
    return {
      reversible: false,
      maxDestructiveness: 'irreversible',
      irreversibleNodes: nodeClassifications
        .filter((n) => !n.reversible)
        .map((n) => n.nodeName),
      explanation: 'Workflow contains irreversible operations',
    };
  }

  // If all nodes are reversible but some require tracking
  if (nodeClassifications.some((n) => n.requiresTracking)) {
    return {
      reversible: true,
      maxDestructiveness: 'reversible',
      requiresTracking: true,
      explanation: 'Workflow is reversible if tracking fields are captured',
    };
  }

  // All nodes are read-only
  return {
    reversible: true,
    maxDestructiveness: 'read_only',
    explanation: 'Workflow only reads data, no modifications',
  };
}
```

---

## ARMING PROTOCOL

### STATE MACHINE

```
                    ┌──────────────────┐
                    │   START: SAFE    │
                    │  armed = false   │
                    │  context = null  │
                    └────────┬─────────┘
                             │
                 enter_workflow_context(id)
                             │
                             ▼
                    ┌──────────────────┐
                    │  CONTEXT LOADED  │
                    │  armed = false   │
                    │  context = id    │
                    └────────┬─────────┘
                             │
               inspect_workflow_effects(id)
                             │
                             ▼
                    ┌──────────────────┐
                    │    INSPECTED     │
                    │  armed = false   │
                    │  effects = {...} │
                    └────────┬─────────┘
                             │
                 arm_n8n_execution(id)
                   (requires effects)
                             │
                             ▼
                    ┌──────────────────┐
                    │      ARMED       │◄─────────┐
                    │  armed = true    │          │
                    │  DANGEROUS       │          │
                    └────────┬─────────┘          │
                             │                    │
             execute_armed_workflow(id, data)     │
                             │                    │
                             ▼                    │
                    ┌──────────────────┐          │
                    │    EXECUTING     │          │
                    │  (async)         │          │
                    └────────┬─────────┘          │
                             │                    │
                   ┌─────────┴─────────┐          │
                   │                   │          │
                SUCCESS             FAILURE       │
                   │                   │          │
                   └─────────┬─────────┘          │
                             │                    │
                      AUTO-DISARM                 │
                             │                    │
                             ▼                    │
                    ┌──────────────────┐          │
                    │   SAFE (logged)  │          │
                    │  armed = false   │          │
                    │  execution in log│          │
                    └──────────────────┘          │
                                                  │
                    exit_workflow_context() ──────┘
                    OR disarm_n8n_execution()
                    (manual disarm)
```

### REQUIRED CHECKS

**Before Arming:**

```typescript
function armN8nExecution(workflowId: string, context: N8nSessionContext): void {
  // Check 1: Context must be loaded
  if (context.activeWorkflowContext !== workflowId) {
    throw new Error(
      'Workflow context not loaded',
      'Call enter_workflow_context first',
    );
  }

  // Check 2: Effects must be inspected
  if (context.lastEffectInspection === null) {
    throw new Error(
      'Workflow effects not inspected',
      'Call inspect_workflow_effects before arming',
    );
  }

  // Check 3: Effects must match current workflow
  if (context.lastEffectInspection.workflowId !== workflowId) {
    throw new Error(
      'Effect inspection is stale',
      'Re-run inspect_workflow_effects for current workflow',
    );
  }

  // Check 4: If irreversible, require explicit confirmation
  if (context.lastEffectInspection.maxDestructiveness === 'irreversible') {
    if (!context.lastEffectInspection.userConfirmed) {
      throw new Error(
        'Irreversible workflow requires user confirmation',
        'User must explicitly approve irreversible actions',
      );
    }
  }

  // ARM
  context.armed = true;
  context.armedAt = Date.now();

  // Log
  console.log(`⚠️  ARMED: Execution enabled for workflow ${workflowId}`);
  console.log(`Effects: ${context.lastEffectInspection.summary}`);
}
```

**Before Execution:**

```typescript
function executeArmedWorkflow(
  workflowId: string,
  data: any,
  context: N8nSessionContext,
): Promise<ExecutionResult> {
  // Check 1: Must be armed
  if (!context.armed) {
    throw new Error(
      'Execution disarmed',
      'Call arm_n8n_execution before executing',
    );
  }

  // Check 2: Armed workflow must match execution request
  if (context.activeWorkflowContext !== workflowId) {
    throw new Error(
      'Workflow mismatch',
      `Armed for ${context.activeWorkflowContext}, attempting to execute ${workflowId}`,
    );
  }

  // Check 3: Arming must be recent (timeout protection)
  const armingAge = Date.now() - context.armedAt!;
  const ARM_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes
  if (armingAge > ARM_TIMEOUT_MS) {
    context.armed = false;
    throw new Error(
      'Arming expired',
      'Re-arm execution (arming timeout: 5 minutes)',
    );
  }

  // EXECUTE
  try {
    const result = await executeWorkflow(workflowId, data);

    // Log execution
    context.executionLog.push({
      workflowId,
      executedAt: Date.now(),
      effects: context.lastEffectInspection!,
      result,
      success: true,
    });

    return result;
  } catch (error) {
    // Log failed execution
    context.executionLog.push({
      workflowId,
      executedAt: Date.now(),
      effects: context.lastEffectInspection!,
      error,
      success: false,
    });

    throw error;
  } finally {
    // AUTO-DISARM
    context.armed = false;
    console.log(`✓ DISARMED: Returned to SAFE state`);
  }
}
```

---

## MUTATION PROHIBITIONS

Per Domicile invariants, the following mutations are FORBIDDEN:

### 1. SILENT MUTATION

**Prohibited:** Modifying external systems without declaration.

**Enforcement:**

- All execution tools MUST call `inspect_workflow_effects` first
- Effect inspection MUST enumerate all side effects
- Agent MUST show effects to user before arming

### 2. AMBIENT EXECUTION

**Prohibited:** Workflows executing without explicit trigger.

**Enforcement:**

- No background execution
- No scheduled triggers without explicit arming per execution
- All execution requires `execute_armed_workflow` call

### 3. HIDDEN STATE

**Prohibited:** Execution state not observable.

**Enforcement:**

- Execution log always available via `get_execution_history`
- Current arming state inspectable via `get_n8n_state`
- Workflow effects always retrievable

### 4. IRREVERSIBLE ACTIONS WITHOUT CONFIRMATION

**Prohibited:** Executing irreversible workflows without user approval.

**Enforcement:**

- `arm_n8n_execution` MUST check `maxDestructiveness`
- If "irreversible", MUST require user confirmation
- Confirmation MUST be explicit (not implied)

---

## INTEGRATION WITH OPEN NOTEBOOK

### JURISDICTION SEPARATION

```
┌─────────────────────────────────────────────────────┐
│                   DOMICILE                          │
│                                                     │
│  ┌──────────────────┐      ┌──────────────────┐   │
│  │  Open Notebook   │      │   n8n EXECUTE    │   │
│  │  READ Jurisdiction│     │   Jurisdiction   │   │
│  │                  │      │                  │   │
│  │  • Memory        │      │  • Workflows     │   │
│  │  • Context       │      │  • Automation    │   │
│  │  • Synthesis     │      │  • Side effects  │   │
│  │  • Provenance    │      │  • Execution     │   │
│  │                  │      │                  │   │
│  │  SAFE by default │      │  SAFE by default │   │
│  │  activeCollection│      │  armed = false   │   │
│  │  = null          │      │                  │   │
│  └────────┬─────────┘      └────────┬─────────┘   │
│           │                         │             │
│           │    ┌────────────────┐   │             │
│           └────┤  Agent Layer   ├───┘             │
│                │                │                 │
│                │  Mediates      │                 │
│                │  between       │                 │
│                │  jurisdictions │                 │
│                └────────────────┘                 │
└─────────────────────────────────────────────────────┘
```

### MEDIATED WORKFLOW

**Example: Send Weekly Summary Email**

```typescript
// Phase 1: READ from Open Notebook
async function getWeeklySummary() {
  // Load Open Notebook context
  await openNotebook.enterCollection('work_notes');

  // Search for weekly progress
  const results = await openNotebook.semanticSearch('weekly progress');

  // Fetch relevant passages
  const summaryData = await openNotebook.fetchPassage(results[0].reference_id);

  // Exit Open Notebook context
  await openNotebook.exitCollection();

  return summaryData;
}

// Phase 2: EXECUTE via n8n
async function sendSummaryEmail(summaryData: any) {
  // Load n8n workflow context
  await n8n.enterWorkflowContext('wf_weekly_email');

  // Inspect effects BEFORE arming
  const effects = await n8n.inspectWorkflowEffects('wf_weekly_email');
  // Returns: {
  //   summary: "This workflow will send 1 email to team@example.com",
  //   irreversibleNodes: ["Send Email"],
  //   maxDestructiveness: "irreversible"
  // }

  // Show user and request confirmation
  const userConfirmed = await askUser(
    `Send email to ${effects.nodes[0].intendedAction}? Cannot be undone.`,
  );

  if (!userConfirmed) {
    await n8n.exitWorkflowContext();
    return { cancelled: true };
  }

  // Arm execution
  await n8n.armN8nExecution('wf_weekly_email');

  // Execute armed workflow
  const result = await n8n.executeArmedWorkflow('wf_weekly_email', {
    emailBody: summaryData.text,
    recipient: 'team@example.com',
  });

  // Auto-disarmed after execution
  // Exit workflow context
  await n8n.exitWorkflowContext();

  return result;
}

// Mediated flow
async function weeklyEmailFlow() {
  // READ jurisdiction
  const summary = await getWeeklySummary();

  // EXECUTE jurisdiction (with safety checks)
  const result = await sendSummaryEmail(summary);

  return result;
}
```

### PROVENANCE CHAIN

Execution SHOULD be logged back to Open Notebook for complete provenance:

```typescript
// After execution completes
await openNotebook.enterCollection('execution_log');

await openNotebook.logExecution({
  timestamp: Date.now(),
  source: 'n8n EXECUTE jurisdiction',
  workflowId: 'wf_weekly_email',
  workflowName: 'Weekly Team Summary',
  inputSource: {
    notebook: 'work_notes',
    query: 'weekly progress',
    referenceId: 'ref_001',
  },
  effects: {
    emailSent: true,
    recipient: 'team@example.com',
    irreversible: true,
  },
  result: 'success',
});

await openNotebook.exitCollection();
```

---

## IMPLEMENTATION REQUIREMENTS

### MINIMUM VIABLE WRAPPER

To admit n8n-MCP, the wrapper MUST implement:

1. **Session Context**
   - `armed` state (boolean, default false)
   - `activeWorkflowContext` (string | null, default null)
   - `lastEffectInspection` (WorkflowEffects | null, default null)

2. **Affordances**
   - `describe_n8n_world` - Enumerate capabilities
   - `enter_workflow_context` - Load workflow for inspection
   - `inspect_workflow_effects` - Enumerate side effects
   - `arm_n8n_execution` - Arm for execution
   - `execute_armed_workflow` - Execute (requires armed)
   - `disarm_n8n_execution` - Manual disarm
   - `exit_workflow_context` - Exit and disarm

3. **Reversibility Database**
   - Classify at minimum top 100 nodes
   - Store in SQLite or JSON file
   - Schema: `node_type`, `reversible`, `side_effects[]`, `explanation`

4. **Pre-execution Checks**
   - Context loaded
   - Effects inspected
   - Armed state verified
   - Irreversible workflows confirmed by user

5. **Post-execution Actions**
   - Auto-disarm
   - Log to execution history
   - Return to SAFE state

### ESTIMATED EFFORT

**Wrapper Implementation:**

- Session context: 100-150 lines
- Arming protocol: 150-200 lines
- Effect inspection: 200-300 lines
- Tool definitions: 300-400 lines
- Reversibility database: 100 nodes × 5 lines = 500 lines data
- Testing: 200-300 lines

**Total: ~1,500-2,000 lines**
**Time: 2-3 days** (with testing)

---

## ADMISSION CRITERIA

Before n8n jurisdiction can be admitted:

### REQUIRED

- ✅ Wrapper implementation complete
- ✅ SAFE-by-default enforced
- ✅ Arming protocol implemented
- ✅ Effect inspection working
- ✅ Reversibility classified (top 100 nodes minimum)
- ✅ Auto-disarm after execution
- ✅ Integration tests passing

### RECOMMENDED

- □ Reversibility classified for top 500 nodes
- □ Provenance logging to Open Notebook
- □ Dry-run mode for testing
- □ Execution history persistence
- □ User confirmation UI for irreversible actions

### FUTURE ENHANCEMENTS

- □ Full 1,084 node classification
- □ Automatic reversal tracking for reversible workflows
- □ Integration with external approval systems
- □ Cost estimation before execution
- □ Rate limiting for high-risk operations

---

## RELATION TO OTHER JURISDICTIONS

### OPEN NOTEBOOK (READ)

- Provides context for automation decisions
- Stores execution history and provenance
- No dependency on n8n

### N8N (EXECUTE)

- Actuates decisions made from Open Notebook context
- Requires Open Notebook for informed execution
- Depends on arming protocol for safety

### FUTURE JURISDICTIONS

- Analytics (OBSERVE) - Monitor execution metrics
- Planning (REASON) - Optimize workflow strategies
- Learning (ADAPT) - Improve automation based on outcomes

---

## INTERPRETATION RULES

When ambiguity exists in n8n jurisdiction:

1. **Choose SAFE over convenience**
   - If unclear whether to arm, remain disarmed
   - If unclear on reversibility, classify as irreversible
   - If unclear on side effects, require user confirmation

2. **Choose inspection over execution**
   - If effects cannot be inspected, block execution
   - If reversibility cannot be determined, block execution
   - If user confirmation unclear, require explicit approval

3. **Choose explicit over implicit**
   - No ambient execution
   - No silent mutation
   - No assumed permissions

4. **Choose observability over performance**
   - Log all executions
   - Surface all errors
   - Track all state changes

---

## REPLACEMENT CLAUSE

This jurisdiction is replaceable.

If a future system provides equivalent or superior workflow automation capabilities with better safety guarantees, it may replace n8n without changing Domicile law.

n8n depends on admission.
Domicile does not depend on n8n.

---

**Status:** DRAFT (pending implementation)
**Next Steps:** Implement wrapper, classify nodes, test arming protocol
**Target Admission:** Phase 2 (after Open Notebook proven stable)
