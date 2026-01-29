# Skills Ecosystem Integration Test

**Date:** 2026-01-28
**Status:** Ready for Testing
**Components:** Clay Router + TARS/memvid + 7 Skills

---

## Test Flow

### 1. Set Active Persona (Clay)

```bash
# On Zo or via Zo API
curl -X POST https://prestonclay.zo.computer/api/persona \
  -H "Content-Type: application/json" \
  -d '{"persona_id": "18895da3", "name": "Clay Consigliere"}'
```

### 2. Test: Payroll Processing

**User Request:** "Process payroll PDFs"

**Expected Flow:**

```
User → Clay Router (LLM intent detection)
      ↓
Clay analyzes: "payroll" keyword + "process" action
      ↓
Clay routes to: domicile-governance skill
      ↓
Executes: Skills/domicile-governance/scripts/run-mcp.ts scan
      ↓
Result: Lists PDFs in incoming/ directory
```

**Command:**

```bash
cd /home/mcp-agent/Skills/clay-consigliere
bun run scripts/router.ts "Process payroll PDFs"
```

**Expected Output:**

```
[Clay] Routing: "Process payroll PDFs"
[Clay] LLM routing (confidence: 0.95)
[Clay] Executing: domicile-governance
[Clay] Command: scripts/run-mcp.ts scan
[Clay] Reasoning: User wants to process payroll - matches domicile-governance domain

✅ Found 3 PDFs in incoming/:
  - payroll-2026-01-27.pdf
  - payroll-2026-01-20.pdf
  - payroll-2026-01-13.pdf
```

---

### 3. Test: Voice Synthesis

**User Request:** "Voice this text: Hello from the Citadel"

**Expected Flow:**

```
User → Clay Router
      ↓
Clay analyzes: "voice" keyword + text to synthesize
      ↓
Clay routes to: personaplex-7b skill
      ↓
Executes: Skills/personaplex-7b/run_server.sh synthesize "Hello from the Citadel"
      ↓
Result: Generated audio file
```

**Command:**

```bash
bun run scripts/router.ts "Voice this text: Hello from the Citadel"
```

**Expected Output:**

```
[Clay] Routing: "Voice this text: Hello from the Citadel"
[Clay] LLM routing (confidence: 0.92)
[Clay] Executing: personaplex-7b
[Clay] Command: run_server.sh synthesize

✅ Audio generated: /tmp/voice-18895da3.wav
Duration: 2.3s
```

---

### 4. Test: Compliance Audit (Requires Approval)

**User Request:** "Audit payroll compliance"

**Expected Flow:**

```
User → Clay Router
      ↓
Clay analyzes: "audit" + "compliance" → sensitive action
      ↓
Clay checks manifest: requires_approval = ["upload_payroll_entries", "audit"]
      ↓
Clay asks for approval: ARM mode triggered
      ↓
User approves: --approve flag
      ↓
Executes: Skills/domicile-governance/scripts/run-mcp.ts audit
```

**Command (Without Approval):**

```bash
bun run scripts/router.ts "Audit payroll compliance"
```

**Expected Output:**

```
⚠️  This action requires approval. Run with --approve flag to proceed.

Skill: domicile-governance
Action: scripts/run-mcp.ts audit
Reason: Compliance audit accesses sensitive payroll data

To approve: clay --approve "Audit payroll compliance"
```

**Command (With Approval):**

```bash
bun run scripts/router.ts --approve "Audit payroll compliance"
```

**Expected Output:**

```
[Clay] Executing: domicile-governance (APPROVED)
[Clay] Command: scripts/run-mcp.ts audit

✅ Compliance Audit Complete:
  - 127 payroll entries checked
  - 3 LLC mappings validated
  - 0 errors found
  - Report: /home/mcp-agent/xtrackados-data/reports/audit-2026-01-28.md
```

---

### 5. Test: TARS Memory Feed

**User Request:** "Feed TARS with payroll memories"

**Expected Flow:**

```
User → Clay Router
      ↓
Clay analyzes: "TARS" + "memories" → memvid integration
      ↓
Clay routes to: memvid skill
      ↓
Executes: Skills/memvid/scripts/tars-connector.ts feed payroll
      ↓
Result: Loaded memories → TARS dream cycle
```

**Command:**

```bash
bun run scripts/router.ts "Feed TARS with payroll memories"
```

**Expected Output:**

```
[Clay] Routing: "Feed TARS with payroll memories"
[Clay] Keyword routing (confidence: 0.6)
[Clay] Executing: memvid

[TARS/memvid] Loading memories for domain: payroll
[TARS/memvid] Loaded 3 memories (5,432 chars)

✅ TARS Context Generated:
# TARS Memory Context (3 memories)

## payroll [2026-01-27]
Tags: bamboohr, compliance, pdf-processing

[Memory content...]
```

---

## Integration Points

### Clay → Skill Execution

```typescript
// Skills/clay-consigliere/scripts/router.ts
const decision = await router.route('Process payroll PDFs');
// Result: { skill: "domicile-governance", command: "run-mcp.ts scan", ... }

const output = await router.execute(decision);
// Executes: cd Skills/domicile-governance && bun run scripts/run-mcp.ts scan
```

### TARS → memvid Knowledge Retrieval

```typescript
// Skills/memvid/scripts/tars-connector.ts
const connector = new TARSMemoryConnector();
const context = await connector.feedTARSDream('payroll');
// Returns: markdown string with embedded KG/vectors from .mv2 files

// TARS training cycle consumes this context
await tars.trainDreamCycle(context);
```

### Skill → Skill Communication (Future)

```typescript
// domicile-governance needs voice output
const voiceResult = await router.route('Voice the audit report');
// Clay automatically routes to personaplex-7b skill
```

---

## File Structure Validation

### Check All Skills Have MANIFEST.json

```bash
cd /home/mcp-agent/Skills

for skill in */; do
  if [ -f "$skill/MANIFEST.json" ]; then
    echo "✅ $skill"
  else
    echo "❌ $skill (missing MANIFEST.json)"
  fi
done
```

**Expected:**

```
✅ domicile-governance/
✅ clay-consigliere/
✅ personaplex-7b/
✅ memvid/
✅ supermemory/
✅ pencil-expert/
⏳ intercom-agent/ (key pending)
```

### Check memvid Memories

```bash
ls -la /home/mcp-agent/Skills/memvid/memories/
```

**Expected:**

```
-rw-r--r-- 1 mcp-agent mcp-agent 5432 Jan 28 17:00 oms-payroll.mv2
-rw-r--r-- 1 mcp-agent mcp-agent 3210 Jan 27 14:30 compliance-rules.mv2
```

---

## Environment Setup

### Required Variables

```bash
# /home/mcp-agent/.env.mcp
ANTHROPIC_API_KEY=sk-ant-...
BAMBOOHR_API_KEY=6c5fde...
SUPABASE_URL=https://rnarigclezfhlzrqueiq.supabase.co
SUPABASE_SECRET_KEY=sb_secret_...
SKILLS_DIR=/home/mcp-agent/Skills
MEMVID_DIR=/home/mcp-agent/Skills/memvid/memories
CLAY_PERSONA_ID=18895da3
```

### Dependencies

```bash
# Clay Router
cd /home/mcp-agent/Skills/clay-consigliere
bun install @anthropic-ai/sdk

# TARS Connector (no deps - uses Bun native APIs)
cd /home/mcp-agent/Skills/memvid
# Ready to run
```

---

## Success Criteria

- [ ] Clay router loads all 7 skill manifests
- [ ] LLM-based routing works (confidence > 0.7)
- [ ] Keyword fallback works (when LLM fails)
- [ ] ARM mode approval gates sensitive actions
- [ ] TARS connector loads .mv2 files
- [ ] TARS connector generates context string
- [ ] Skills execute via entry_point
- [ ] Errors logged but don't crash router

---

## Troubleshooting

### Clay Router Fails to Load Manifests

```bash
# Check SKILLS_DIR
echo $SKILLS_DIR

# Manually verify
ls -la /home/mcp-agent/Skills/*/MANIFEST.json

# Test manifest parsing
cat /home/mcp-agent/Skills/domicile-governance/MANIFEST.json | jq .
```

### LLM Routing Returns Low Confidence

```bash
# Run in dry-run mode to see decision
bun run scripts/router.ts --dry-run "Your unclear request"

# Expected: Falls back to keyword routing or asks for clarification
```

### TARS Connector Can't Find .mv2 Files

````bash
# Check MEMVID_DIR
ls -la $MEMVID_DIR

# Create test memory if needed
cat > /home/mcp-agent/Skills/memvid/memories/test.mv2 << 'EOF'
# Test Memory

This is a test memory file.

```json:memory
{
  "metadata": {
    "domain": "test",
    "created": "2026-01-28T17:00:00Z",
    "tags": ["test", "demo"]
  }
}
````

EOF

````

---

## Next Steps

1. **Deploy to Citadel:**
   ```bash
   # Upload via Zo web interface:
   # - Skills/clay-consigliere/scripts/router.ts
   # - Skills/memvid/scripts/tars-connector.ts

   # Then on Citadel:
   cd /home/mcp-agent/Skills/clay-consigliere
   bun install @anthropic-ai/sdk
   chmod +x scripts/router.ts
````

2. **Create MANIFEST.json for each skill:**

   ```bash
   # See example in Skills/domicile-governance/MANIFEST.json
   # Replicate for all 7 skills
   ```

3. **Test each routing scenario:**

   ```bash
   bun run scripts/router.ts --dry-run "Process payroll PDFs"
   bun run scripts/router.ts --dry-run "Voice this text: test"
   bun run scripts/router.ts --dry-run "Audit compliance"
   ```

4. **Integrate with Zo's AI:**
   - Zo's chat interface calls Clay router
   - Katie talks to Zo → Zo invokes Clay → Clay routes to skill
   - Result returned to Katie via Zo's web/SMS/email

---

## The Complete Flow (Katie's Perspective)

```
Katie: "Hey Zo, process the payroll PDFs"
  ↓
Zo: [Internal] Invoke Clay router via MCP
  ↓
Clay: [LLM] Analyze intent → Route to domicile-governance
  ↓
domicile-governance: [Execute] Scan incoming/ directory → Find 3 PDFs
  ↓
domicile-governance: [Return] PDF list to Clay
  ↓
Clay: [Return] Result to Zo
  ↓
Zo: [To Katie] "Found 3 payroll PDFs: [list]. Ready to process?"
  ↓
Katie: "Yes, process them"
  ↓
Clay: [Check] requires_approval = true → Ask Katie
  ↓
Zo: [To Katie] "This will upload to BambooHR. Approve?"
  ↓
Katie: "Approved"
  ↓
domicile-governance: [Execute] Process → Upload → Dual-write
  ↓
Zo: [To Katie] "✅ Processed 127 entries, $52,430.15 total"
```

**Katie never touches code. She talks to Zo. Clay orchestrates everything.**

---

🧳 **Baggie:** "Seven specialists. One router. Katie speaks, Clay translates, Skills execute. The chaos becomes symphony."
