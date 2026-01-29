# Clay Router Memory - How Routing Gets Smarter Over Time

**Persona ID:** 18895da3
**Database Tables:** `executions`, `routing_rules`
**Learning Method:** Auto-generation from execution history

---

## The Core Concept

**Clay doesn't just route—Clay learns.**

Every routing decision is logged in `executions`. After 50+ similar requests, Clay auto-generates a `routing_rule`. Future routing uses this learned knowledge → faster, higher confidence, lower cost.

---

## Database Architecture

### executions Table (Every Routing Decision)

```sql
CREATE TABLE executions (
  user_request text NOT NULL,
  request_embedding vector,            -- Semantic representation
  routing_path uuid[],                 -- Which systems handled it
  routing_confidence numeric,          -- Clay's confidence (0.0-1.0)
  status text,                         -- success, failed, governance_blocked
  duration_ms integer,
  cost_usd numeric,
  user_satisfaction integer,           -- 1-5 stars from Katie
  governance_check jsonb               -- ARM mode approval
);
```

### routing_rules Table (Learned Patterns)

```sql
CREATE TABLE routing_rules (
  request_pattern text NOT NULL,
  request_embedding vector,            -- For semantic matching
  recommended_system_id uuid,          -- Best skill for this pattern
  alternative_systems uuid[],          -- Fallbacks if primary fails
  based_on_executions integer,         -- How many executions informed this
  success_rate numeric,                -- % successful
  avg_cost_usd numeric,
  avg_duration_ms integer,
  confidence_score numeric,            -- 0.0-1.0 (increases over time)
  auto_generated boolean DEFAULT true  -- Clay learned this (vs human created)
);
```

---

## Learning Flow

### Phase 1: Initial Routing (No Memory)

```
Katie: "Process payroll PDFs" (first time)
    ↓
Clay: LLM-based intent detection
    ↓
Claude API: Analyze request → Match to skill domain
    ↓
Response: {
  "skill": "domicile-governance",
  "confidence": 0.72,
  "reasoning": "Payroll keyword matches governance domain"
}
    ↓
Log to executions table
```

**Cost:** Claude API call ($0.03) + execution time (850ms)

### Phase 2: Pattern Recognition (10-50 Similar Requests)

```
Katie: "Process payroll PDFs" (10th time)
    ↓
Clay: Check routing_rules (vector similarity search)
    ↓
No strong match yet (confidence < 0.7)
    ↓
Fallback to LLM routing
    ↓
Log to executions (10th similar request)
```

**System recognizes pattern forming.**

### Phase 3: Auto-Generation (50+ Similar Requests)

```
System: Detect 50+ similar requests in executions
    ↓
Aggregate metrics:
  - success_rate: 96%
  - avg_cost_usd: $0.12
  - avg_duration_ms: 850ms
  - avg_confidence: 0.94
    ↓
Auto-generate routing_rule:
  {
    "request_pattern": "Process payroll PDFs",
    "recommended_system_id": "domicile-governance-uuid",
    "confidence_score": 0.95,
    "auto_generated": true
  }
```

### Phase 4: Memory-Based Routing (Future Requests)

```
Katie: "Process payroll PDFs" (51st+ time)
    ↓
Clay: Check routing_rules (vector similarity)
    ↓
Match found! (cosine similarity: 0.98)
    ↓
Route to domicile-governance (NO Claude API call)
    ↓
Log to executions
```

**Cost:** Vector lookup ($0.001) + execution time (200ms)
**Improvement:** 30x cheaper, 4x faster, 99% confidence

---

## Vector Embeddings (Semantic Routing)

### How It Works

1. **User request → Embedding**

   ```typescript
   const embedding = await openai.embeddings.create({
     model: 'text-embedding-3-small',
     input: 'Process payroll PDFs',
   });
   // Result: [0.23, -0.45, 0.89, ...] (1536 dimensions)
   ```

2. **Find similar patterns (pgvector)**

   ```sql
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

3. **Use closest match (highest cosine similarity)**
   ```
   similarity > 0.85 → Use learned rule
   similarity < 0.85 → Fallback to LLM routing
   ```

### Why Vector Embeddings?

**Keyword matching:**

- "Process payroll PDFs" ✅
- "Handle the payroll files" ❌ (different words)

**Semantic matching (vectors):**

- "Process payroll PDFs" ✅
- "Handle the payroll files" ✅ (same meaning, similar vector)
- "Upload payroll data" ✅
- "Run payroll processing" ✅

**Clay understands intent, not just keywords.**

---

## Confidence Score Evolution

### Initial (Auto-Generated)

```json
{
  "request_pattern": "Process payroll PDFs",
  "confidence_score": 0.75, // Based on 50 executions
  "based_on_executions": 50,
  "success_rate": 0.94
}
```

### After 100 More Executions

```json
{
  "confidence_score": 0.88, // Increased (more data)
  "based_on_executions": 150,
  "success_rate": 0.96 // Improved
}
```

### After 500 More Executions

```json
{
  "confidence_score": 0.95, // High confidence
  "based_on_executions": 650,
  "success_rate": 0.97
}
```

**The more executions, the smarter Clay gets.**

---

## Alternative Systems (Fallback Logic)

### Example Routing Rule

```json
{
  "request_pattern": "Generate voice for text",
  "recommended_system_id": "personaplex-7b-uuid",
  "alternative_systems": ["elevenlabs-api-uuid", "google-tts-uuid"],
  "confidence_score": 0.92
}
```

### Execution Flow with Fallbacks

```
Katie: "Generate voice for text"
    ↓
Clay: Route to personaplex-7b (primary)
    ↓
personaplex-7b: ERROR (offline)
    ↓
Clay: Fallback to elevenlabs-api (alternative #1)
    ↓
elevenlabs-api: SUCCESS
    ↓
Log to executions: {
  routing_path: ["personaplex-7b", "elevenlabs-api"],
  status: "success",
  should_retry_with_different_path: false
}
```

**Clay automatically retries with alternatives if primary fails.**

---

## ARM Mode Integration

### Routing Rules with Approval Requirements

```json
{
  "request_pattern": "Audit payroll compliance",
  "recommended_system_id": "domicile-governance-uuid",
  "requires_approval": true, // Learned from executions
  "governance_check": {
    "action": "audit",
    "gov_md_section": "4.2"
  }
}
```

### Execution with ARM Mode

```
Katie: "Audit payroll compliance"
    ↓
Clay: Match routing_rule (confidence: 0.95)
    ↓
Clay: Check requires_approval = true
    ↓
Clay: "⚠️ This action requires approval. Approve?"
    ↓
Katie: "Approved"
    ↓
Clay: Execute domicile-governance audit tool
    ↓
Log to executions: {
  governance_check: {
    "requires_approval": true,
    "approved_by": "katie@oms.com",
    "approved_at": "2026-01-28T15:30:00Z"
  }
}
```

---

## Cost Optimization

### Without Routing Memory (Every Request = LLM Call)

**1000 requests/month:**

- Claude API calls: 1000 × $0.03 = **$30.00**
- Avg duration: 850ms
- Total time: 850 seconds = 14 minutes

### With Routing Memory (90% Cache Hit)

**1000 requests/month:**

- First 50 requests: Claude API (50 × $0.03 = $1.50)
- Remaining 950 requests: Vector lookup (950 × $0.001 = $0.95)
- **Total: $2.45** (92% cost reduction)
- Avg duration: 200ms (cached), 850ms (LLM)
- Total time: 233 seconds = 4 minutes (72% faster)

**Routing memory = 92% cheaper, 72% faster.**

---

## Monitoring Queries

### Most Common Request Patterns

```sql
SELECT
  request_pattern,
  based_on_executions,
  confidence_score,
  success_rate,
  avg_cost_usd
FROM routing_rules
WHERE auto_generated = true
ORDER BY based_on_executions DESC
LIMIT 10;
```

### Routing Confidence Over Time

```sql
SELECT
  DATE_TRUNC('week', started_at) as week,
  AVG(routing_confidence) as avg_confidence,
  COUNT(*) as total_requests
FROM executions
WHERE started_at >= NOW() - INTERVAL '90 days'
GROUP BY week
ORDER BY week ASC;
```

**Expect confidence to increase over time as Clay learns.**

### Cache Hit Rate (Vector vs LLM)

```sql
SELECT
  DATE_TRUNC('day', started_at) as date,
  SUM(CASE WHEN routing_confidence >= 0.85 THEN 1 ELSE 0 END) as cache_hits,
  COUNT(*) as total_requests,
  ROUND(100.0 * SUM(CASE WHEN routing_confidence >= 0.85 THEN 1 ELSE 0 END) / COUNT(*), 2) as cache_hit_rate
FROM executions
WHERE started_at >= NOW() - INTERVAL '30 days'
GROUP BY date
ORDER BY date DESC;
```

**Target: 80%+ cache hit rate after 3 months.**

---

## Manual Routing Rules (Human Override)

### When to Create Manual Rules

1. **New capability launched** (no execution history yet)
2. **Compliance requirement** (must route specific requests to specific skill)
3. **Cost optimization** (prefer cheaper skill for certain patterns)
4. **Performance tuning** (prefer faster skill for latency-sensitive requests)

### Example Manual Rule

```json
{
  "request_pattern": "Emergency payroll override",
  "recommended_system_id": "domicile-governance-uuid",
  "requires_approval": true,
  "auto_generated": false,
  "created_by": "preston@oms.com",
  "governance_check": {
    "requires_operator_approval": true,
    "escalation_required": true
  }
}
```

**Manual rules override auto-generated rules.**

---

## The 80% Ship Rule Applied

### Clay Learns via Imperfect Data

**Initial routing (50 requests):**

- Success rate: 88% (12% failures)
- Confidence: 0.75

**Question:** Should Clay auto-generate a routing rule?

**80% Ship Rule Answer:** **YES.**

- 88% > 80% threshold
- Failures teach Clay what doesn't work
- Alternative systems provide fallback
- Confidence will increase with more data

**Clay ships at 80%. Perfection comes from iteration.**

---

## Integration with TARS Dream Cycles

### TARS Can Mutate Routing Rules

**Dream mutation example:**

```json
{
  "cycle_id": "dream-2026-01-28-03:00",
  "mutation_type": "routing_rule_tweak",
  "mutations": {
    "confidence_threshold": 0.65, // Changed from 0.7
    "fallback_delay_ms": 200 // Changed from 500
  },
  "test_results": {
    "faster": true,
    "success_rate": 0.96,
    "promote": true
  }
}
```

**If dream succeeds:**

1. `routing_rules` updated with new thresholds
2. `constitutional_amendments` created
3. Clay uses new thresholds for future routing

**TARS optimizes Clay's routing strategy during sleep.**

---

## Future: Multi-Skill Routing

### Current (Single-Skill Routing)

```
Katie: "Process payroll PDFs"
    ↓
Clay: Route to domicile-governance (single skill)
```

### Future (Multi-Skill Orchestration)

```
Katie: "Process payroll and send voice summary"
    ↓
Clay: Route to domicile-governance (payroll)
    ↓
domicile-governance: Returns payroll summary
    ↓
Clay: Route to personaplex-7b (voice synthesis)
    ↓
personaplex-7b: Returns audio file
    ↓
Clay: Return combined result
```

**Routing path:** `[domicile-governance, personaplex-7b]`

**Logged in executions:**

```json
{
  "routing_path": ["domicile-governance-uuid", "personaplex-7b-uuid"],
  "routing_confidence": 0.88,
  "status": "success"
}
```

---

## The Holographic Principle

**Every routing rule contains the whole architecture:**

- Request pattern (what user wants)
- Recommended system (which skill handles it)
- Success rate (how often it works)
- Cost (how much it costs)
- Duration (how fast it is)
- Alternatives (fallback options)

**Cut any routing rule → you understand Clay's entire routing strategy.**

---

🧳 **Baggie:** "Clay's memory is not storage—it's evolution. Every routing decision informs the next. Every failure teaches fallback logic. Every success increases confidence. The router learns while routing. The system manages itself."

**Clay gets smarter every day. No manual updates required.**
