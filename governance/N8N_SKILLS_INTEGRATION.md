# N8N_SKILLS_INTEGRATION

**Skills Repository:** https://github.com/czlonkowski/n8n-skills
**Related Documents:** `N8N_JURISDICTION.md`, `N8N_MCP_ADMISSION_AUDIT.md`
**Integration Type:** Complementary (Skills + Wrapper)

---

## EXECUTIVE SUMMARY

The n8n-skills repository contains **hardened expertise** from real-world n8n workflow building:

- 7,841 validation loop observations
- Common mistake catalogs
- Proven workflow patterns
- Iterative fixing strategies

These skills **complement** (not replace) the Domicile safety wrapper:

| Component            | Purpose               | Type               |
| -------------------- | --------------------- | ------------------ |
| **n8n-skills**       | Teach effective usage | Knowledge/Patterns |
| **domicile-n8n-mcp** | Enforce invariants    | Safety/Control     |

**Integration Strategy:** Skills inform wrapper design, providing real-world error patterns and validation strategies to make the wrapper more usable.

---

## WHAT n8n-SKILLS PROVIDES

### 7 Complementary Skills

1. **n8n Expression Syntax** - Correct {{}} syntax patterns
2. **n8n MCP Tools Expert** - How to use n8n-mcp tools effectively
3. **n8n Workflow Patterns** - 5 proven architectural patterns
4. **n8n Validation Expert** - Interpreting and fixing validation errors
5. **n8n Node Configuration** - Operation-aware configuration
6. **n8n Code JavaScript** - Effective Code node patterns
7. **n8n Code Python** - Python limitations awareness

### Hardened Expertise

**Validation Loop Pattern** (7,841 observations):

```
1. Configure node
   ↓
2. validate_node (23s thinking about errors)
   ↓
3. Read error messages
   ↓
4. Fix errors (58s fixing)
   ↓
5. validate_node again
   ↓
6. Repeat 2-3 iterations until valid
```

**Common Mistakes Cataloged:**

- Wrong nodeType format (nodes-base._ vs n8n-nodes-base._)
- Using detail="full" by default (3-8K tokens vs 1-2K)
- Ignoring validation profiles
- Missing auto-sanitization behavior
- Incorrect expression syntax

**Proven Patterns:**

- Webhook processing (trigger → process → respond)
- HTTP API integration (request → transform → output)
- Database operations (query → validate → insert)
- AI workflows (8 connection types for AI Agent)
- Scheduled automation (cron → fetch → act)

---

## WHAT n8n-SKILLS DOES NOT PROVIDE

### NOT Safety Enforcement

Skills teach best practices but **do not enforce**:

- ❌ SAFE-by-default state
- ❌ Arming protocol
- ❌ Reversibility classification
- ❌ Effect inspection before execution
- ❌ Auto-disarm after execution

### NOT Domicile Compliance

Skills are optimized for:

- Developer productivity
- Error avoidance
- Workflow correctness

NOT for:

- Silent mutation prevention
- Irreversible action protection
- User confirmation requirements
- Jurisdiction boundaries

---

## INTEGRATION ARCHITECTURE

### Two-Layer System

```
┌────────────────────────────────────────────────────┐
│                  Claude Agent                       │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │          n8n-skills (Knowledge Layer)        │  │
│  │                                              │  │
│  │  • How to configure nodes effectively       │  │
│  │  • Common mistake patterns                  │  │
│  │  • Validation loop strategies               │  │
│  │  • Proven workflow architectures            │  │
│  │                                              │  │
│  │  Teaches: "Do it RIGHT"                     │  │
│  └────────────────┬─────────────────────────────┘  │
│                   │                                │
│                   ▼                                │
│  ┌──────────────────────────────────────────────┐  │
│  │      domicile-n8n-mcp (Safety Layer)        │  │
│  │                                              │  │
│  │  • SAFE-by-default enforcement              │  │
│  │  • Arming protocol required                 │  │
│  │  • Reversibility classification             │  │
│  │  • Effect inspection mandatory              │  │
│  │                                              │  │
│  │  Enforces: "Do it SAFELY"                   │  │
│  └────────────────┬─────────────────────────────┘  │
│                   │                                │
│                   ▼                                │
│  ┌──────────────────────────────────────────────┐  │
│  │         n8n-mcp (Execution Layer)           │  │
│  │                                              │  │
│  │  • 1,084 nodes                              │  │
│  │  • 2,709 templates                          │  │
│  │  • Workflow CRUD                            │  │
│  │  • Execution API                            │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

### Layer Responsibilities

**Knowledge Layer (n8n-skills):**

- Guides agent through effective workflow building
- Provides context-sensitive help
- Teaches common pitfall avoidance
- Offers proven patterns

**Safety Layer (domicile-n8n-mcp):**

- Enforces Domicile invariants
- Prevents execution without arming
- Classifies operations by reversibility
- Requires effect inspection

**Execution Layer (n8n-mcp):**

- Provides raw n8n functionality
- Interfaces with n8n API
- Returns validation results
- Executes workflows

---

## HOW SKILLS INFORM WRAPPER DESIGN

### 1. Validation Strategy

**From Skills:**

```
Validation Loop Pattern (7,841 occurrences):
- Average: 2-3 iterations until valid
- 23 seconds thinking about errors
- 58 seconds fixing
- Iterative, not one-shot
```

**Wrapper Design Implication:**

The wrapper should NOT block on first validation failure. Instead:

```typescript
// GOOD: Allow iterative validation during structure phase
async function createWorkflow(definition: WorkflowDef) {
  // Phase 1: Structure building (SAFE, iterative)
  const workflow = await n8n.createWorkflow(definition);

  // Allow multiple validation cycles WITHOUT arming
  let validationResult;
  let iterations = 0;

  while (iterations < 5) {
    // Reasonable iteration limit
    validationResult = await n8n.validateWorkflow(workflow.id);

    if (validationResult.valid) break;

    // Agent can fix errors iteratively
    // Still SAFE - no execution
    iterations++;
  }

  // Phase 2: Effect inspection (required before arming)
  const effects = await inspectWorkflowEffects(workflow.id);

  // Phase 3: Arming (only after valid + inspected)
  // ... arming logic
}
```

**Principle:** Validation is iterative and SAFE. Only arming is dangerous.

### 2. Error Presentation

**From Skills:**

```
Error Severity Levels:
1. Errors (must fix) - Blocks execution
2. Warnings (should fix) - Doesn't block
3. Suggestions (optional) - Nice to have
```

**Wrapper Design Implication:**

Effect inspection should use similar severity model:

```typescript
interface WorkflowEffects {
  // Errors: MUST be acknowledged before arming
  errors: Array<{
    type: 'irreversible_without_confirmation';
    node: 'Gmail.send';
    message: 'This node sends email. Cannot be unsent.';
    requiresConfirmation: true;
  }>;

  // Warnings: SHOULD be acknowledged
  warnings: Array<{
    type: 'api_rate_limit';
    node: 'Slack.post';
    message: 'Slack API has rate limits. Consider retry logic.';
  }>;

  // Info: Nice to know
  info: Array<{
    type: 'reversible_with_tracking';
    node: 'GoogleSheets.append';
    message: 'Reversible if row number is tracked.';
  }>;
}
```

### 3. Common Mistake Prevention

**From Skills:**

```
Mistake 1: Wrong nodeType format
- search_nodes returns: "nodes-base.slack"
- Workflow tools need: "n8n-nodes-base.slack"

Mistake 4: Ignoring auto-sanitization
- ALL nodes sanitized on ANY workflow update
```

**Wrapper Design Implication:**

The wrapper should handle format conversions automatically:

```typescript
// Wrapper handles nodeType format translation
async function inspectWorkflowEffects(workflowId: string) {
  // Fetch workflow (uses n8n-nodes-base.* format)
  const workflow = await n8n.getWorkflow(workflowId);

  // For each node, get reversibility metadata
  const nodeEffects = await Promise.all(
    workflow.nodes.map(async (node) => {
      // Convert format for reversibility lookup
      const lookupType = node.type.replace('n8n-nodes-base.', 'nodes-base.');
      const reversibility = await getNodeReversibility(lookupType);

      return {
        nodeId: node.id,
        nodeName: node.name,
        nodeType: node.type, // Keep original for consistency
        reversibility,
      };
    }),
  );

  return { nodeEffects /* ... */ };
}
```

### 4. Progressive Disclosure

**From Skills:**

```
Detail Levels:
- minimal: Quick overview (~200 tokens)
- standard: Essential properties (~1-2K tokens) - RECOMMENDED
- full: Everything (~3-8K tokens) - Use sparingly
```

**Wrapper Design Implication:**

Effect inspection should have similar progressive detail:

```typescript
interface EffectInspectionOptions {
  detail: "summary" | "standard" | "full";
}

async function inspectWorkflowEffects(
  workflowId: string,
  options: EffectInspectionOptions = { detail: "standard" }
) {
  switch (options.detail) {
    case "summary":
      // Just max destructiveness and count
      return {
        maxDestructiveness: "irreversible",
        irreversibleNodeCount: 1,
        totalNodeCount: 5
      };

    case "standard":
      // Per-node reversibility, summary text
      return {
        nodes: [...],  // Basic reversibility info
        summary: "This workflow will send 1 email and create 2 records"
      };

    case "full":
      // Complete effect analysis with explanations
      return {
        nodes: [...],  // Detailed reversibility + side effects
        summary: "...",
        warnings: [...],
        mitigations: [...],
        confirmationPrompt: "..."
      };
  }
}
```

### 5. Workflow Patterns

**From Skills:**

```
5 Proven Patterns:
1. Webhook Processing → trigger → process → respond
2. HTTP API → request → transform → output
3. Database → query → validate → insert
4. AI Workflow → prompt → agent → tool
5. Scheduled → cron → fetch → act
```

**Wrapper Design Implication:**

Pattern-based reversibility hints:

```typescript
// Detect workflow pattern
function detectWorkflowPattern(workflow: Workflow): WorkflowPattern {
  if (workflow.nodes.some((n) => n.type.includes('webhook'))) {
    return {
      pattern: 'webhook_processing',
      typicalReversibility: 'mixed', // Read request, write response
      safetyHints: [
        'Webhook responses are immediate and visible to caller',
        'Consider validation before any writes',
      ],
    };
  }

  if (workflow.nodes.some((n) => n.type.includes('schedule'))) {
    return {
      pattern: 'scheduled_automation',
      typicalReversibility: 'varies',
      safetyHints: [
        'Scheduled workflows run without user presence',
        'Ensure error notifications are configured',
        'Test with inactive schedule first',
      ],
    };
  }

  // ... other patterns
}
```

---

## INTEGRATION RECOMMENDATIONS

### 1. Use Skills for Agent Guidance

Install n8n-skills in Claude Code environment:

```bash
# In user's Claude Code setup
/plugin install czlonkowski/n8n-skills
```

**Skills automatically activate** when agent is:

- Configuring nodes
- Fixing validation errors
- Writing expressions
- Building workflows

### 2. Wrapper References Skills

In wrapper error messages, reference skill knowledge:

```typescript
// In wrapper's effect inspection
if (effects.maxDestructiveness === 'irreversible') {
  return {
    // ... effect details
    learningResources: [
      'n8n Validation Expert skill: How to validate workflows safely',
      'n8n Workflow Patterns skill: See pattern #1 for webhook safety',
    ],
  };
}
```

### 3. Skills Document Wrapper Constraints

Add wrapper awareness to skills:

**Future Enhancement to n8n-skills:**

```markdown
## Domicile Safety Layer

If using n8n-mcp through Domicile's safety wrapper:

**Additional Requirements:**

1. Effect inspection required before execution
2. Arming step required for execution
3. Irreversible workflows require user confirmation

**Modified Workflow:**
```

1. Configure workflow (iterative validation OK)
2. Validate workflow structure
3. **Inspect workflow effects** (NEW)
4. **Arm execution** (NEW)
5. Execute (if armed)
6. **Auto-disarm** (NEW)

```

See: governance/N8N_JURISDICTION.md for details
```

### 4. Telemetry Integration

The skills were built from telemetry (7,841 validation loops). The wrapper should:

**Log to same telemetry system:**

```typescript
// In wrapper execution
await telemetry.logExecution({
  sessionId,
  workflowId,

  // Wrapper-specific metrics
  armingDuration: timeToArm,
  effectInspectionDetail: 'standard',
  irreversibleNodesCount: 1,
  userConfirmationRequired: true,
  userConfirmationReceived: true,

  // Standard n8n metrics
  executionDuration,
  success: true,
  validationIterations: 2,
});
```

**Benefits:**

- Track arming patterns
- Measure confirmation friction
- Identify commonly blocked workflows
- Improve effect inspection heuristics

---

## PRACTICAL EXAMPLE: Integrated Flow

### User Request: "Send weekly summary email to team"

**Step 1: Skills Guide Structure** (Knowledge Layer)

```
Agent (with n8n Workflow Patterns skill active):
"I'll build this using the Scheduled Automation pattern.
 Need: Schedule trigger → Fetch data → Send email"

Agent (with n8n MCP Tools Expert skill active):
"Let me search for the right nodes."

→ search_nodes({query: "schedule"})
→ search_nodes({query: "gmail send"})

Agent (with n8n Node Configuration skill active):
"For Gmail Send, I need: to, subject, message fields."

→ validate_node({nodeType: "nodes-base.gmail", config: {...}})
→ Fix errors (iteration 1)
→ validate_node again (iteration 2)
→ Valid ✓
```

**Step 2: Wrapper Enforces Safety** (Safety Layer)

```
Agent creates workflow structure:
→ n8n.createWorkflow({...})  // SAFE, no execution

Agent triggers wrapper inspection:
→ domicileN8n.enterWorkflowContext(workflowId)
→ domicileN8n.inspectWorkflowEffects(workflowId)

Wrapper returns:
{
  maxDestructiveness: "irreversible",
  summary: "This workflow will send 1 email to team@example.com",
  nodes: [
    {
      nodeName: "Send Summary Email",
      nodeType: "nodes-base.gmail",
      operation: "send",
      reversible: false,
      explanation: "Email cannot be unsent after delivery",
      intendedAction: "Send email to team@example.com with subject 'Weekly Summary'"
    }
  ],
  requiresConfirmation: true,
  confirmationPrompt: "Send email to team@example.com? This cannot be undone."
}

Agent shows user and requests confirmation:
"This workflow will send an irreversible email.
 Send to: team@example.com
 Subject: Weekly Summary

 Proceed? (This cannot be undone)"

User confirms: "Yes"

Agent arms execution:
→ domicileN8n.armN8nExecution(workflowId, {userConfirmed: true})

Agent executes:
→ domicileN8n.executeArmedWorkflow(workflowId, {...})

Wrapper auto-disarms after execution.
```

**Step 3: Execution** (Execution Layer)

```
n8n-mcp executes workflow:
→ Sends email via Gmail API
→ Returns execution result

Wrapper logs to Open Notebook:
→ openNotebook.logExecution({
    source: "n8n EXECUTE jurisdiction",
    workflowId,
    effects: {emailSent: true, recipient: "team@example.com"},
    irreversible: true
  })
```

**Benefits of Integration:**

1. Skills prevented common mistakes (correct node config)
2. Skills guided validation loop (2 iterations to valid)
3. Wrapper enforced safety (arming + confirmation required)
4. Wrapper logged provenance (execution tracked in Open Notebook)
5. User had clear understanding of what would happen

---

## REVERSIBILITY CLASSIFICATION FROM SKILLS

The skills provide insight into which nodes are commonly problematic:

### High-Risk Nodes (from Skills Error Catalogs)

**Irreversible (Skill Evidence):**

```
Gmail.send - "Email cannot be unsent"
Slack.postMessage - "Message visible immediately" (reversible with tracking)
Twilio.sendSms - "SMS sent immediately"
Stripe.charge - "Payment processed"
HttpRequest (POST/PUT/DELETE) - "Depends on external API"
```

**Reversible with Tracking:**

```
GoogleSheets.append - "Can delete row if row number tracked"
Postgres.insert - "Can delete if ID tracked"
Slack.postMessage - "Can delete if message_ts tracked"
GitHub.createIssue - "Can close if issue number tracked"
```

**Read-Only (Safe):**

```
Gmail.read - "Only reads"
HttpRequest (GET) - "Fetch only"
GoogleSheets.read - "Query only"
Postgres.select - "Query only"
```

**Wrapper Can Use This Classification:**

Create initial reversibility database seeded from skills knowledge:

```sql
-- Seeded from n8n-skills error catalogs
INSERT INTO node_reversibility VALUES
  ('nodes-base.gmail.send', false, 'Sends email. Cannot be unsent.', '["sends_email"]'),
  ('nodes-base.slack.postMessage', true, 'Posts message. Can delete if message_ts tracked.', '["posts_message"]'),
  ('nodes-base.googleSheets.append', true, 'Appends row. Can delete if row number tracked.', '["appends_row"]'),
  ('nodes-base.httpRequest', false, 'HTTP request. Reversibility depends on endpoint and method.', '["http_request"]');
```

---

## RECOMMENDED INTEGRATION STEPS

### Phase 1: Install Skills (Immediate)

```bash
# User installs skills in Claude Code
/plugin install czlonkowski/n8n-skills
```

**Benefit:** Agent immediately gains n8n expertise for building workflows.

### Phase 2: Build Wrapper (2-3 days)

Implement `domicile-n8n-mcp` using insights from skills:

1. Validation is iterative → Allow multiple validation cycles in SAFE state
2. Error severity model → Apply to effect inspection
3. Progressive disclosure → Implement detail levels for effects
4. Common patterns → Provide pattern-based safety hints
5. Reversibility → Seed database from skills catalogs

### Phase 3: Document Wrapper in Skills (1 hour)

Add Domicile safety layer documentation to skills:

- Update n8n MCP Tools Expert skill with wrapper workflow
- Add safety considerations to Validation Expert skill
- Reference wrapper in Workflow Patterns skill

### Phase 4: Telemetry Integration (2-4 hours)

Connect wrapper logging to same telemetry system:

- Track arming patterns
- Measure confirmation friction
- Identify blocked workflows
- Feed data back into skills

---

## CONCLUSION

n8n-skills and domicile-n8n-mcp are **complementary systems**:

**n8n-skills (Knowledge):**

- Teaches HOW to build workflows effectively
- Based on 7,841 real validation loops
- Prevents common mistakes
- Guides iterative fixing

**domicile-n8n-mcp (Safety):**

- Enforces Domicile invariants
- Prevents execution without inspection
- Classifies reversibility
- Requires user confirmation

**Together:**

- Skills help agent build workflows correctly
- Wrapper ensures workflows execute safely
- User gets both productivity AND protection

**Integration is synergistic**, not redundant. Skills inform wrapper design with real-world patterns. Wrapper enforces safety that skills cannot.

---

**Status:** Recommended
**Next Step:** Install skills, then build wrapper using insights from skills telemetry
**Timeline:** Skills (immediate) + Wrapper (2-3 days) + Integration (1 day) = **~4 days total**
