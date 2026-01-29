# Supabase Database Schema - Full Architecture

**Instance:** rnarigclezfhlzrqueiq.supabase.co
**Database:** PostgreSQL with pgvector extension
**Tables:** 9 core tables
**Architecture:** Multi-tenant SaaS + TARS self-modification + Clay routing memory

---

## Table of Contents

1. [constitutional_amendments](#constitutional_amendments) - TARS self-modification
2. [dreams](#dreams) - TARS circadian learning cycles
3. [executions](#executions) - Clay router history + ARM mode tracking
4. [mcp_telemetry_log](#mcp_telemetry_log) - MCP server monitoring
5. [payroll_entries](#payroll_entries) - BambooHR dual-write
6. [resources](#resources) - Multi-tenant budget management
7. [routing_rules](#routing_rules) - Clay router learning memory
8. [systems](#systems) - Skills registry (7 specialists)
9. [tenants](#tenants) - Multi-tenant SaaS architecture

---

## 1. constitutional_amendments

**Purpose:** TARS rewrites its own constitution based on successful dream cycles.

**Schema:**

```sql
CREATE TABLE public.constitutional_amendments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid REFERENCES tenants(id),
  system_id uuid REFERENCES systems(id),
  system_name text NOT NULL,
  amendment_type text NOT NULL CHECK (amendment_type IN (
    'dream_promotion',      -- Dream cycle succeeded, promote to production
    'manual_update',        -- Human operator update
    'governance_tightening', -- New compliance rule
    'capability_expansion'  -- New skill added
  )),
  old_constitution jsonb NOT NULL,    -- Before state
  new_constitution jsonb NOT NULL,    -- After state
  diff jsonb,                         -- What changed
  evidence jsonb,                     -- Why it changed (dream results, etc)
  approved_by text NOT NULL,          -- Who/what approved
  approved_at timestamp with time zone DEFAULT now(),
  can_rollback boolean DEFAULT true,  -- Safety: can we undo this?
  rolled_back_at timestamp with time zone
);
```

**Key Concepts:**

- **Constitutional Governance**: Each system has a `constitution` (JSONB) that defines its behavior
- **Amendment Types**:
  - `dream_promotion`: TARS tested a mutation during sleep, it succeeded, now promoting to live
  - `manual_update`: Operator (Preston Clay) manually updated the constitution
  - `governance_tightening`: New compliance rule added (e.g., from gov.md)
  - `capability_expansion`: New capability added to system
- **Rollback Safety**: `can_rollback = true` means safe to revert if amendment causes issues
- **Evidence Trail**: All amendments logged with evidence (dream cycle results, test data, etc)

**Example Flow:**

```
1. TARS runs dream cycle → mutations tested
2. Dream succeeds → promoted_to_production = true
3. Constitutional amendment created: amendment_type = 'dream_promotion'
4. systems.constitution updated with new_constitution
5. old_constitution preserved for rollback
```

---

## 2. dreams

**Purpose:** TARS circadian learning - experiments run during "sleep" to improve systems.

**Schema:**

```sql
CREATE TABLE public.dreams (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid REFERENCES tenants(id),
  system_id uuid REFERENCES systems(id),
  system_name text NOT NULL,
  cycle_id text NOT NULL,              -- Unique ID for this dream cycle
  mutations jsonb NOT NULL,            -- What TARS changed
  test_input jsonb,                    -- Input data for testing
  normal_output jsonb,                 -- Output from current production system
  dream_output jsonb,                  -- Output from mutated system
  outcome jsonb NOT NULL,              -- Success metrics, comparison
  promoted_to_production boolean DEFAULT false,
  promoted_at timestamp with time zone,
  dreamed_at timestamp with time zone DEFAULT now(),
  dream_duration_ms integer
);
```

**Key Concepts:**

- **Circadian Learning**: TARS runs experiments during low-traffic periods (night)
- **A/B Testing**: Compare `normal_output` vs `dream_output` for same `test_input`
- **Mutations**: Changes to system behavior (prompt tweaks, parameter changes, etc)
- **Promotion**: If dream succeeds, `promoted_to_production = true` → constitutional amendment created

**Example Dream Cycle:**

```json
{
  "cycle_id": "dream-2026-01-28-03:00",
  "mutations": {
    "routing_confidence_threshold": 0.65, // Changed from 0.7
    "fallback_delay_ms": 200 // Changed from 500
  },
  "test_input": { "user_request": "Process payroll PDFs" },
  "normal_output": {
    "skill": "domicile-governance",
    "confidence": 0.72,
    "duration_ms": 850
  },
  "dream_output": {
    "skill": "domicile-governance",
    "confidence": 0.68,
    "duration_ms": 680
  },
  "outcome": {
    "faster": true,
    "duration_improvement": 170,
    "confidence_acceptable": true,
    "promote": true
  }
}
```

**Outcome Evaluation:**

- Faster response time (680ms vs 850ms)
- Confidence still acceptable (0.68 > 0.65)
- ✅ Promote to production

---

## 3. executions

**Purpose:** Every Clay routing decision + ARM mode approval tracking + user feedback.

**Schema:**

```sql
CREATE TABLE public.executions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid REFERENCES tenants(id),
  system_id uuid REFERENCES systems(id),
  system_name text NOT NULL,
  user_request text NOT NULL,
  request_embedding vector,            -- pgvector for semantic routing
  routing_path uuid[] DEFAULT '{}',    -- Chain of systems that handled request
  routing_confidence numeric,          -- Clay's confidence (0.0-1.0)
  input_data jsonb,
  output_data jsonb,
  governance_check jsonb NOT NULL,     -- ARM mode: approval status, gov.md validation
  status text NOT NULL CHECK (status IN (
    'success',              -- Completed successfully
    'failed',               -- Error occurred
    'partial',              -- Some steps succeeded
    'timeout',              -- Exceeded time limit
    'governance_blocked'    -- ARM mode rejected or compliance violation
  )),
  error_message text,
  started_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone,
  duration_ms integer GENERATED ALWAYS AS (
    EXTRACT(epoch FROM (completed_at - started_at)) * 1000
  ) STORED,
  cost_usd numeric,                    -- LLM tokens + compute cost
  user_satisfaction integer CHECK (user_satisfaction BETWEEN 1 AND 5),
  user_feedback text,
  should_retry_with_different_path boolean DEFAULT false,
  suggested_improvements jsonb,
  receipt_signature text,              -- Cryptographic proof of execution
  lifecycle_state text DEFAULT 'HOT' CHECK (lifecycle_state IN (
    'HOT',      -- Recently accessed, keep in fast storage
    'WARM',     -- Occasionally accessed, standard storage
    'COLD',     -- Rarely accessed, slow storage
    'ARCHIVED', -- Compliance retention only
    'PRUNED'    -- Deleted after retention period
  )),
  last_accessed_at timestamp with time zone DEFAULT now(),
  access_count integer DEFAULT 0
);
```

**Key Concepts:**

- **Routing Path**: If request goes through multiple skills, `routing_path` tracks the chain
- **Governance Check**: ARM mode approval logged in `governance_check` JSONB:
  ```json
  {
    "requires_approval": true,
    "approved_by": "preston@oms.com",
    "approved_at": "2026-01-28T15:30:00Z",
    "reason": "Compliance audit approved by Operator",
    "gov_md_sections_checked": ["4.2", "7.1"]
  }
  ```
- **User Satisfaction**: Katie rates 1-5 stars → Clay learns which skills users prefer
- **Lifecycle Management**: Old executions age out (HOT → WARM → COLD → ARCHIVED → PRUNED)
- **Cost Tracking**: Every execution tracked for budget management (see `resources` table)

**ARM Mode Example:**

```json
{
  "user_request": "Audit payroll compliance",
  "routing_path": ["clay-consigliere-uuid", "domicile-governance-uuid"],
  "governance_check": {
    "requires_approval": true,
    "action": "audit",
    "approved_by": "preston@oms.com",
    "approved_at": "2026-01-28T15:30:00Z",
    "compliance_validated": true
  },
  "status": "success"
}
```

---

## 4. mcp_telemetry_log

**Purpose:** Monitor all MCP server tool calls (domicile-governance, notion, etc).

**Schema:**

```sql
CREATE TABLE public.mcp_telemetry_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  server_name text NOT NULL,           -- e.g., "domicile-governance"
  tool_name text NOT NULL,             -- e.g., "process_payroll_pdf"
  input_data jsonb,
  execution_time_ms numeric,
  success boolean,
  error_message text,
  timestamp timestamp with time zone DEFAULT now()
);
```

**Key Concepts:**

- **MCP Monitoring**: Every tool call logged (BambooHR payroll, Notion pages, etc)
- **Performance Tracking**: `execution_time_ms` identifies slow tools
- **Error Detection**: `success = false` triggers alerts

**Example Log Entry:**

```json
{
  "server_name": "domicile-governance",
  "tool_name": "upload_payroll_entries",
  "input_data": {
    "entries": 127,
    "total_amount": 52430.15,
    "source_file": "payroll-2026-01-27.pdf"
  },
  "execution_time_ms": 2340,
  "success": true,
  "timestamp": "2026-01-28T10:15:30Z"
}
```

**Monitoring Queries:**

```sql
-- Find slow tools (> 5 seconds)
SELECT server_name, tool_name, AVG(execution_time_ms) as avg_ms
FROM mcp_telemetry_log
WHERE success = true
GROUP BY server_name, tool_name
HAVING AVG(execution_time_ms) > 5000
ORDER BY avg_ms DESC;

-- Error rate by tool
SELECT server_name, tool_name,
  COUNT(*) as total_calls,
  SUM(CASE WHEN success = false THEN 1 ELSE 0 END) as errors,
  ROUND(100.0 * SUM(CASE WHEN success = false THEN 1 ELSE 0 END) / COUNT(*), 2) as error_rate
FROM mcp_telemetry_log
GROUP BY server_name, tool_name
ORDER BY error_rate DESC;
```

---

## 5. payroll_entries

**Purpose:** BambooHR dual-write target. Analytics + compliance audit trail.

**Schema:**

```sql
CREATE TABLE public.payroll_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id text NOT NULL,           -- BambooHR employee ID
  employee_name text,                  -- Resolved via fuzzy matching
  date date NOT NULL,                  -- Payroll date
  amount numeric NOT NULL,             -- Payment amount
  reference text,                      -- LLC mapping or contractor reference
  source_file text NOT NULL,           -- Original PDF filename
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
```

**Key Concepts:**

- **Dual-Write**: payroll-processor-mcp.ts writes to BOTH BambooHR API AND this table
- **Fuzzy Matching**: `employee_name` resolved via Fuse.js (0.4 threshold) + LLC mapping
- **Audit Trail**: All payroll entries preserved for compliance (7 states, 178 staff)
- **Source Tracking**: `source_file` links back to original PDF for verification

**Example Entry:**

```json
{
  "employee_id": "12345",
  "employee_name": "John Doe",
  "date": "2026-01-27",
  "amount": 4250.0,
  "reference": "Contractor - JD Consulting LLC",
  "source_file": "payroll-2026-01-27.pdf",
  "created_at": "2026-01-28T10:15:30Z"
}
```

**Analytics Queries:**

```sql
-- Total payroll by month
SELECT DATE_TRUNC('month', date) as month,
  COUNT(*) as entries,
  SUM(amount) as total_amount
FROM payroll_entries
GROUP BY month
ORDER BY month DESC;

-- Entries by source file (verify processing)
SELECT source_file, COUNT(*) as entries, SUM(amount) as total
FROM payroll_entries
GROUP BY source_file
ORDER BY created_at DESC;
```

---

## 6. resources

**Purpose:** Multi-tenant budget management. Prevent runaway LLM costs.

**Schema:**

```sql
CREATE TABLE public.resources (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid REFERENCES tenants(id),
  resource_type text NOT NULL CHECK (resource_type IN (
    'llm_tokens',      -- OpenAI/Anthropic token usage
    'compute_hours',   -- Server/Lambda execution time
    'api_calls',       -- External API calls (BambooHR, etc)
    'storage_gb',      -- Database + file storage
    'usd_budget'       -- Total USD budget
  )),
  window_type text NOT NULL CHECK (window_type IN (
    'hourly', 'daily', 'weekly', 'monthly'
  )),
  window_start timestamp with time zone NOT NULL,
  window_end timestamp with time zone NOT NULL,
  total_budget numeric NOT NULL,
  used numeric DEFAULT 0,
  reserved numeric DEFAULT 0,
  available numeric GENERATED ALWAYS AS (total_budget - used - reserved) STORED,
  system_quotas jsonb DEFAULT '{}',    -- Per-system limits
  alert_threshold numeric DEFAULT 0.80, -- Alert at 80% usage
  alert_sent boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
```

**Key Concepts:**

- **Budget Windows**: Track usage by hour/day/week/month
- **Resource Types**: LLM tokens, compute, API calls, storage, USD
- **Per-System Quotas**: `system_quotas` JSONB limits specific skills:
  ```json
  {
    "domicile-governance": { "llm_tokens": 100000, "usd_budget": 50 },
    "clay-consigliere": { "llm_tokens": 500000, "usd_budget": 200 },
    "personaplex-7b": { "compute_hours": 10, "usd_budget": 0 }
  }
  ```
- **Alert Threshold**: Default 80% → email sent when `(used + reserved) / total_budget >= 0.80`
- **Reserved**: Proactive reservation (e.g., Clay reserves tokens before starting execution)

**Example Monthly Budget:**

```json
{
  "resource_type": "usd_budget",
  "window_type": "monthly",
  "window_start": "2026-01-01T00:00:00Z",
  "window_end": "2026-02-01T00:00:00Z",
  "total_budget": 1000.0,
  "used": 340.5,
  "reserved": 120.0,
  "available": 539.5,
  "alert_threshold": 0.8,
  "alert_sent": false
}
```

**Budget Enforcement:**

```sql
-- Check if system can execute (has budget remaining)
SELECT available > 0 as can_execute
FROM resources
WHERE tenant_id = 'oms-tenant-uuid'
  AND resource_type = 'usd_budget'
  AND window_type = 'monthly'
  AND window_start <= NOW()
  AND window_end > NOW();
```

---

## 7. routing_rules

**Purpose:** Clay router learns routing patterns over time. Auto-generated from execution history.

**Schema:**

```sql
CREATE TABLE public.routing_rules (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid REFERENCES tenants(id),
  request_pattern text NOT NULL,       -- e.g., "Process payroll PDFs"
  request_embedding vector,            -- pgvector for semantic matching
  recommended_system_id uuid REFERENCES systems(id),
  alternative_systems uuid[] DEFAULT '{}',
  based_on_executions integer DEFAULT 0,  -- How many executions informed this rule
  success_rate numeric,                   -- % successful executions
  avg_cost_usd numeric,
  avg_duration_ms integer,
  confidence_score numeric NOT NULL CHECK (confidence_score BETWEEN 0 AND 1),
  last_validated timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  auto_generated boolean DEFAULT true,    -- True = Clay learned this, False = human created
  created_by text,
  is_active boolean DEFAULT true
);
```

**Key Concepts:**

- **Semantic Routing**: `request_embedding` (pgvector) matches user requests via cosine similarity
- **Auto-Learning**: `auto_generated = true` means Clay created this rule from execution history
- **Performance Metrics**: `success_rate`, `avg_cost_usd`, `avg_duration_ms` inform routing decisions
- **Alternative Systems**: If primary system fails, try alternatives
- **Confidence Evolution**: `confidence_score` increases as more executions succeed

**Example Routing Rule:**

```json
{
  "request_pattern": "Process payroll PDFs",
  "request_embedding": [0.23, -0.45, 0.89, ...],  // 1536-dim vector
  "recommended_system_id": "domicile-governance-uuid",
  "alternative_systems": ["personaplex-7b-uuid"],
  "based_on_executions": 127,
  "success_rate": 0.96,
  "avg_cost_usd": 0.12,
  "avg_duration_ms": 850,
  "confidence_score": 0.95,
  "auto_generated": true,
  "is_active": true
}
```

**How Clay Uses This:**

1. User request: "Process payroll PDFs"
2. Generate embedding from request
3. Query `routing_rules` with vector similarity (pgvector `<->` operator)
4. Find closest match (cosine similarity)
5. Route to `recommended_system_id`
6. If fails, try `alternative_systems`

**Learning Flow:**

```
executions (100+ similar requests)
  ↓
Auto-generate routing_rule (avg success rate, cost, duration)
  ↓
Use rule for future routing (confidence_score increases over time)
```

---

## 8. systems

**Purpose:** Skills registry. Each skill = 1 row. MANIFEST.json in database form.

**Schema:**

```sql
CREATE TABLE public.systems (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid REFERENCES tenants(id),
  name text NOT NULL UNIQUE,           -- e.g., "domicile-governance"
  type text NOT NULL CHECK (type IN (
    'agent',      -- Autonomous agent (Clay, TARS)
    'product',    -- User-facing product
    'component',  -- Reusable component (MCP server)
    'utility'     -- Helper utility
  )),
  description text,
  version text DEFAULT '1.0.0',
  capabilities text[] DEFAULT '{}',    -- e.g., ["payroll", "compliance", "pdf-processing"]
  capabilities_embedding vector,       -- pgvector for capability matching
  constitution jsonb NOT NULL,         -- MANIFEST.json equivalent
  total_executions integer DEFAULT 0,
  successful_executions integer DEFAULT 0,
  avg_cost_usd numeric DEFAULT 0,
  avg_execution_time_ms integer DEFAULT 0,
  avg_user_satisfaction numeric,       -- 1-5 stars from executions table
  deployment_type text CHECK (deployment_type IN (
    'n8n', 'fastapi', 'vercel', 'lambda', 'local'
  )),
  endpoint_url text,
  api_key_required boolean DEFAULT true,
  depends_on uuid[] DEFAULT '{}',      -- Systems this depends on
  reverse_dependencies uuid[] DEFAULT '{}',  -- Systems that depend on this
  status text DEFAULT 'active' CHECK (status IN (
    'active', 'deprecated', 'maintenance', 'archived'
  )),
  lifecycle_state text DEFAULT 'HOT' CHECK (lifecycle_state IN (
    'HOT', 'WARM', 'COLD', 'ARCHIVED', 'PRUNED'
  )),
  last_accessed_at timestamp with time zone DEFAULT now(),
  access_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  created_by text,
  documentation_url text,
  github_repo text
);
```

**Key Concepts:**

- **Constitution**: JSONB field containing MANIFEST.json:
  ```json
  {
    "skill": "domicile-governance",
    "version": "1.0.0",
    "domain": "HR/Payroll/Compliance",
    "prime_directives": ["MVP Protocol", "Compliance Sovereign"],
    "requires_approval": ["upload_payroll_entries", "audit", "delete"],
    "covenant": "Profit from errors. Dual-write. ARM mode for writes."
  }
  ```
- **Dependency Graph**: `depends_on` + `reverse_dependencies` track skill relationships
- **Performance Metrics**: `avg_cost_usd`, `avg_execution_time_ms`, `avg_user_satisfaction`
- **Lifecycle**: Systems age out if unused (HOT → WARM → COLD)

**Example System (domicile-governance):**

```json
{
  "name": "domicile-governance",
  "type": "component",
  "description": "BambooHR payroll processing, PDF extraction, compliance auditing",
  "capabilities": [
    "payroll",
    "compliance",
    "pdf-processing",
    "bamboohr",
    "dual-write"
  ],
  "constitution": {
    "skill": "domicile-governance",
    "domain": "HR/Payroll/Compliance",
    "requires_approval": ["upload_payroll_entries", "audit", "delete"],
    "covenant": "Profit from errors. Dual-write. ARM mode."
  },
  "deployment_type": "local",
  "endpoint_url": "/home/mcp-agent/mcp-servers/payroll/",
  "depends_on": [],
  "status": "active",
  "lifecycle_state": "HOT"
}
```

**Skill Dependency Example:**

```
clay-consigliere
  ├── depends_on: [domicile-governance, personaplex-7b, memvid]
  └── reverse_dependencies: []

domicile-governance
  ├── depends_on: []
  └── reverse_dependencies: [clay-consigliere]
```

---

## 9. tenants

**Purpose:** Multi-tenant SaaS. OMS = tenant 1. Future clients = more tenants.

**Schema:**

```sql
CREATE TABLE public.tenants (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  domain text UNIQUE,                  -- e.g., "oms.com", "client2.com"
  subscription_tier text DEFAULT 'starter' CHECK (subscription_tier IN (
    'starter', 'pro', 'enterprise'
  )),
  max_users integer DEFAULT 10,
  max_monthly_budget numeric DEFAULT 1000.00,
  created_at timestamp with time zone DEFAULT now(),
  is_active boolean DEFAULT true
);
```

**Key Concepts:**

- **Multi-Tenant from Day 1**: ALL tables have `tenant_id` foreign key
- **Subscription Tiers**:
  - `starter`: 10 users, $1000/month budget
  - `pro`: More users, higher budget
  - `enterprise`: Custom limits
- **Resource Isolation**: Each tenant has separate `resources` budgets
- **Data Isolation**: Query filters by `tenant_id`

**Example Tenant (OMS):**

```json
{
  "name": "OMS Consulting",
  "domain": "oms.com",
  "subscription_tier": "enterprise",
  "max_users": 178,
  "max_monthly_budget": 5000.0,
  "is_active": true
}
```

**Future Client Onboarding:**

```sql
-- Add new tenant
INSERT INTO tenants (name, domain, subscription_tier, max_users, max_monthly_budget)
VALUES ('New Client', 'newclient.com', 'pro', 50, 2500.00);

-- All systems/executions/resources automatically isolated by tenant_id
```

---

## Architecture Patterns

### 1. TARS Self-Modification Flow

```
1. TARS Dream Cycle
   ↓
2. dreams table (mutations tested)
   ↓
3. Successful dream? promoted_to_production = true
   ↓
4. constitutional_amendments (amendment_type = 'dream_promotion')
   ↓
5. systems.constitution JSONB updated
   ↓
6. Old constitution preserved for rollback
```

### 2. Clay Router Learning Flow

```
1. User request: "Process payroll PDFs"
   ↓
2. executions table (log routing decision + result)
   ↓
3. After 50+ similar requests, auto-generate routing_rule
   ↓
4. routing_rules (confidence_score increases over time)
   ↓
5. Future requests use learned rule (faster, higher confidence)
```

### 3. Multi-Tenant Resource Management

```
1. Tenant onboarded → resources table (monthly budget: $1000)
   ↓
2. Clay routes request → Check budget (available > 0?)
   ↓
3. Reserve budget (reserved += estimated_cost)
   ↓
4. Execute skill
   ↓
5. Update budget (used += actual_cost, reserved -= estimated_cost)
   ↓
6. Alert if (used + reserved) / total_budget >= 0.80
```

### 4. Lifecycle Management

```
HOT (recently accessed)
  ↓ (30 days no access)
WARM (occasionally accessed)
  ↓ (90 days no access)
COLD (rarely accessed)
  ↓ (365 days no access)
ARCHIVED (compliance retention only)
  ↓ (7 years after archived, per compliance)
PRUNED (permanently deleted)
```

---

## Integration Points

### domicile-governance MCP → payroll_entries

```typescript
// payroll-processor-mcp.ts
await supabase.from('payroll_entries').insert({
  employee_id: entry.employee_id,
  employee_name: entry.employee_name,
  date: entry.date,
  amount: entry.amount,
  reference: entry.reference,
  source_file: pdf_filename,
});
```

### Clay Router → executions + routing_rules

```typescript
// Skills/clay-consigliere/scripts/router.ts
const decision = await router.route(userRequest);

// Log execution
await supabase.from('executions').insert({
  user_request: userRequest,
  routing_path: [decision.system_id],
  routing_confidence: decision.confidence,
  governance_check: { requires_approval: decision.requires_approval },
});

// After 50+ similar requests, auto-generate routing rule
if (similarExecutionCount >= 50) {
  await supabase.from('routing_rules').insert({
    request_pattern: userRequest,
    recommended_system_id: decision.system_id,
    confidence_score: avgConfidence,
    auto_generated: true,
  });
}
```

### TARS Dream Cycle → constitutional_amendments

```typescript
// TARS dream cycle
const dreamResult = await tars.runDreamCycle(mutations);

if (dreamResult.outcome.promote) {
  // Promote to production
  await supabase
    .from('dreams')
    .update({
      promoted_to_production: true,
      promoted_at: new Date(),
    })
    .eq('id', dreamResult.id);

  // Create constitutional amendment
  await supabase.from('constitutional_amendments').insert({
    system_id: system.id,
    amendment_type: 'dream_promotion',
    old_constitution: system.constitution,
    new_constitution: dreamResult.mutated_constitution,
    evidence: dreamResult.outcome,
  });

  // Update system constitution
  await supabase
    .from('systems')
    .update({
      constitution: dreamResult.mutated_constitution,
    })
    .eq('id', system.id);
}
```

---

## Compliance & Security

### Audit Trail

- **All payroll entries preserved** (`payroll_entries`)
- **All executions logged** (`executions`)
- **All constitutional changes tracked** (`constitutional_amendments`)
- **All MCP tool calls monitored** (`mcp_telemetry_log`)

### Data Retention

- **Lifecycle management**: HOT → WARM → COLD → ARCHIVED → PRUNED
- **Compliance period**: 7 years (configurable per tenant)
- **Rollback capability**: `constitutional_amendments.can_rollback`

### Multi-Tenant Isolation

- **Row-level security**: All tables have `tenant_id`
- **Resource limits**: Per-tenant budgets enforced
- **Data isolation**: Query filters by `tenant_id`

---

## Monitoring Queries

### System Health Dashboard

```sql
-- Overall system health
SELECT
  s.name,
  s.total_executions,
  s.successful_executions,
  ROUND(100.0 * s.successful_executions / NULLIF(s.total_executions, 0), 2) as success_rate,
  s.avg_cost_usd,
  s.avg_execution_time_ms,
  s.avg_user_satisfaction,
  s.status
FROM systems s
WHERE s.status = 'active'
ORDER BY s.total_executions DESC;
```

### Resource Usage Alert

```sql
-- Check which tenants are approaching budget limits
SELECT
  t.name as tenant_name,
  r.resource_type,
  r.total_budget,
  r.used,
  r.reserved,
  r.available,
  ROUND(100.0 * (r.used + r.reserved) / r.total_budget, 2) as usage_percent,
  r.alert_threshold,
  r.alert_sent
FROM resources r
JOIN tenants t ON r.tenant_id = t.id
WHERE r.window_type = 'monthly'
  AND r.window_start <= NOW()
  AND r.window_end > NOW()
  AND (r.used + r.reserved) / r.total_budget >= r.alert_threshold
ORDER BY usage_percent DESC;
```

### Clay Router Performance

```sql
-- Clay routing confidence over time
SELECT
  DATE_TRUNC('day', started_at) as date,
  COUNT(*) as total_requests,
  AVG(routing_confidence) as avg_confidence,
  SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) as successful,
  ROUND(100.0 * SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) / COUNT(*), 2) as success_rate
FROM executions
WHERE started_at >= NOW() - INTERVAL '30 days'
GROUP BY date
ORDER BY date DESC;
```

### TARS Dream Promotion Rate

```sql
-- How many dreams get promoted to production?
SELECT
  DATE_TRUNC('week', dreamed_at) as week,
  COUNT(*) as total_dreams,
  SUM(CASE WHEN promoted_to_production THEN 1 ELSE 0 END) as promoted,
  ROUND(100.0 * SUM(CASE WHEN promoted_to_production THEN 1 ELSE 0 END) / COUNT(*), 2) as promotion_rate
FROM dreams
WHERE dreamed_at >= NOW() - INTERVAL '90 days'
GROUP BY week
ORDER BY week DESC;
```

---

## Extension: pgvector

**Purpose:** Semantic routing via vector embeddings.

**Tables using vector columns:**

- `executions.request_embedding`
- `routing_rules.request_embedding`
- `systems.capabilities_embedding`

**Example Query (Find similar requests):**

```sql
-- Find routing rules for similar requests (cosine similarity)
SELECT
  request_pattern,
  recommended_system_id,
  confidence_score,
  1 - (request_embedding <=> $1::vector) as similarity
FROM routing_rules
WHERE is_active = true
ORDER BY request_embedding <=> $1::vector
LIMIT 5;
```

**How Clay Uses This:**

1. User request: "Process payroll PDFs"
2. Generate embedding via OpenAI/Anthropic API
3. Query `routing_rules` with vector similarity
4. Find closest match (highest cosine similarity)
5. Route to recommended system

---

**This schema represents a self-managing, multi-tenant SaaS platform with TARS self-modification, Clay routing memory, and comprehensive resource governance.**

🧳 **Baggie:** "The database is not just storage—it's memory. TARS learns through dreams. Clay learns through routing patterns. The system rewrites its own constitution. This is holographic governance: every table contains the whole architecture's DNA."
