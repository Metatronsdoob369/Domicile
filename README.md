# 🏗️ Domicile — Contract-Driven AI Governance Platform

![License](https://img.shields.io/github/license/Metatronsdoob369/Domicile)
![GitHub last commit](https://img.shields.io/github/last-commit/Metatronsdoob369/Domicile)

**Status:** Production Phase • **Architecture:** Fractal switchboard (MOS) with 6-layer contract stack

Domicile demotes prompts beneath contracts, jurisdiction, and governed execution. Contracts > Prompts. The system learns while you sleep.

## 🚀 Start Here

**New to Domicile?** Read these in order:

1. **[VISION.md](./VISION.md)** - What Domicile is and why it exists
2. **[QUICK_START.md](./QUICK_START.md)** - Get running in 5 minutes
3. **[SESSION_START.md](./SESSION_START.md)** - Agent session template
4. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Full technical architecture

## ⚖️ Governance (Where Law Lives)

All governance documents are in **`governance/`** — these are non-negotiable invariants, not suggestions:

- **[governance/DOMICILE_MIRROR.md](./governance/DOMICILE_MIRROR.md)** - Core Domicile invariants (SAFE, Context, Awareness, Exit)
- **[governance/MCP_ADMISSION_CONTRACT.md](./governance/MCP_ADMISSION_CONTRACT.md)** - MCP server admission requirements
- **[governance/OPEN_NOTEBOOK_MCP_AFFORDANCES.md](./governance/OPEN_NOTEBOOK_MCP_AFFORDANCES.md)** - Open Notebook world affordances (exactly 11)
- **[governance/OPEN_NOTEBOOK_MCP_DESIGN.md](./governance/OPEN_NOTEBOOK_MCP_DESIGN.md)** - Open Notebook implementation specification

These files define what Domicile **is**, not what it aspires to be. They are normative, enforceable, and verifiable.

## 🧠 Core Concept

Domicile is the platform where:

- **Humans contribute:** Architecture, contracts, governance rules
- **AI contributes:** Execution within contracts, learning from outcomes
- **System ensures:** Neither party fails the other

### The Problem with Prompts

1. Humans can't perfectly articulate intent in natural language
2. LLMs over-interpret or misinterpret instructions
3. **Neither party can trust the outcome**

### The Domicile Solution

Every interaction is a **contract** (typed Zod schema), not a prompt. The **policy engine** governs execution. The **Circadian loop** learns overnight from decisions vs. outcomes.

## 🌍 Jurisdiction & Reality Binding

Domicile does not execute actions directly.

All execution occurs inside **admitted jurisdictions**—external worlds
that satisfy Domicile’s admission contracts.

Currently supported:

- **MCP-admitted worlds** (Model Context Protocol)

MCP binds contracts to _current reality_ by:

- enumerating available actions at session start
- exposing inspectable world state
- preventing implicit or invented execution paths

If something cannot be done, it is because it does not exist
in the current world—not because the system "said no."

See [governance/MCP_ADMISSION_CONTRACT.md](./governance/MCP_ADMISSION_CONTRACT.md).

## 🗂 Monorepo Layout

```
domicile_live/
├── packages/
│   ├── core           # Layer 2: orchestrator, policy engine, agent registry
│   ├── agents         # Layer 3: domain agents (financial, research, etc.)
│   ├── contracts      # Layer 4: schemas + task contracts
│   ├── covenant       # Layer 2 governance (trust, voice moat, oracles)
│   ├── interface      # Layer 1 (MCP server, CLI, HTTP entrypoints)
│   ├── data           # Layer 4 data plane (Pinecone client, trainpacks)
│   └── observability  # Layer 5 telemetry dashboard + perf metrics
├── docs/              # Architecture + Codex references
├── scripts/           # Reset/start/stop helpers
└── examples/          # Usage examples
```

## ⚙️ Quick Start

```bash
cd ~/domicile_live
pnpm install                  # install workspaces
pnpm build                    # compile every package
pnpm test                     # run Vitest
```

### Environment Variables

Copy `.env.example` and configure:

```bash
cp .env.example .env
# Edit .env with your API keys
```

Required variables documented in `.env.example`.

### MCP Server

```bash
export OPENAI_API_KEY=sk-...

# Start the MCP server
pnpm run mcp:start -w @domicile/interface

# In another terminal, run demos
pnpm run demo:real-estate
```

### Domicile CLI (New!)

The `domicile` CLI provides contract-driven execution at the command line:

If a command cannot execute, Domicile will explain
what has changed since your last session and why.

```bash
# Configure MOS connection (one-time setup)
cp .env.example .env
# Edit .env - add SUPABASE_URL and SUPABASE_ANON_KEY

# Check status
pnpm domicile status

# Test MOS connectivity
pnpm domicile test

# Execute natural language intents
pnpm domicile "optimize my social media posting schedule"
pnpm domicile "analyze real estate market trends in Austin"

# List available systems
pnpm domicile systems

# Show routing plan without executing
pnpm domicile --dry-run "generate financial report for Q4 2025"

# Set budget constraint
pnpm domicile --budget 2.0 "comprehensive market analysis"
```

The CLI connects to the deployed MOS on Supabase, routes your intent through constitutional routing, and executes contracts with governance.

## 🔐 Why Contracts > Prompts

| Traditional Prompting     | Domicile                                       |
| ------------------------- | ---------------------------------------------- |
| Fragile text instructions | Typed contracts validated with Zod             |
| Agent self-preference     | Covenant trust scores + policy barriers        |
| Manual auditing           | Ledger + observability dashboard               |
| Static systems            | Circadian loop proposes improvements off-hours |

## 🧩 Foundation Highlights

- **Circadian Loop:** Day = human + AI collaboration. Night = dream about decisions vs. outcomes. Dawn = new mutual understanding.
- **Governance:** Circuit breakers, quarantine modes, and rollback ledgers ensure agents cannot skip the policy gate.
- **Memory:** Pinecone-backed knowledge graph, trainpack builder, and ROI vectors keep monetization loops contextual.
- **Observability:** Monitoring dashboard streaming SSE health data at `http://localhost:3001`.

## 🏛️ Master Orchestration System (MOS)

The autonomous engine is **deployed and running** on Supabase:

- **Production URL:** `https://rnarigclezfhlzrqueiq.supabase.co`
- **Architecture:** Fractal switchboard routing requests across products (DispoAI, CA-CAO, TARS)
- **Learning:** Dream cycles review executions vs. outcomes at 3 AM
- **Governance:** Constitutional router validates all requests

See `AUTONOMOUS_ENGINE_MAP.md` for integration details.

## 📚 Documentation Map

- [`VISION.md`](./VISION.md) — North star: what Domicile is and why
- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — Full six-layer blueprint
- [`SESSION_START.md`](./SESSION_START.md) — Template for agent sessions
- [`CIRCADIAN_LOG.md`](./CIRCADIAN_LOG.md) — Learning reflections
- [`docs/concepts/agent-codex.md`](./docs/concepts/agent-codex.md) — UPS personas + governance
- [`domicile/CIRCADIAN_PHILOSOPHY.md`](./domicile/CIRCADIAN_PHILOSOPHY.md) — Learning model
- [`domicile/docs/agent-ecosystem.ts`](./domicile/docs/agent-ecosystem.ts) — Narrative + semantic payloads

## 🧪 Development Scripts

```bash
pnpm build                              # build all workspaces
pnpm run mcp:start -w @domicile/interface   # start MCP server
pnpm run demo:real-estate                   # run documented demo
CI=1 pnpm test                              # CI-friendly vitest run
```

## 🌅 Vision

Domicile is the collaboration surface where:

- Software understands what you mean the first time because contracts encode it
- Every failed attempt becomes a training signal the system reflects on overnight
- Agents evolve safely because Covenant refuses to ship anything with resilience score < 80

**It's not just another SDK—it's a governed ecosystem that learns while you sleep.**

## 🤝 Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for guidelines.

## 📄 License

See [`LICENSE`](./LICENSE) for details.

## 🔒 Security

See [`SECURITY.md`](./SECURITY.md) for vulnerability reporting.

---

_"The platform that dreams about its decisions vs. outcomes, learning to understand you better while you sleep."_
