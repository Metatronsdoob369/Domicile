# 🏗️ Domicile — Contract-Driven AI Platform

**Status:** Integration Phase • **Architecture:** 6-layer contract stack synchronized by the Circadian loop

Domicile treats agents like governed APIs. Contracts define the work, Covenant enforces trust, and the Circadian loop lets the system dream at 3 AM so it wakes up understanding you better.

## 🧠 Operating Narrative

- **Agent Ecosystem Loop:** `domicile/docs/agent-ecosystem.ts` explains how the monorepo maps to Foundation, Monetization, Resilience, and Observability divisions.
- **Semantic Refiner:** `domicile/docs/ecosystem-semantic-refiner.ts` defines the `IntentManifest`, metabolic states, and Circadian pulses that the MCP/CLI pass around.
- **Agent Codex:** `docs/concepts/agent-codex.md` lists every UPS (Unit‑Per‑Skill) persona with the rules that keep them in sync.

Pair these with `ARCHITECTURE.md` for the full six-layer breakdown.

## 🗂 Monorepo Layout

```
domicile/
├── packages/
│   ├── core           # Layer 2: orchestrator, policy engine, agent registry
│   ├── agents         # Layer 3: domain agents (financial, research, etc.)
│   ├── contracts      # Layer 4: schemas + task contracts
│   ├── covenant       # Layer 2 governance (trust, voice moat, oracles)
│   ├── interface      # Layer 1 (MCP server, CLI, HTTP entrypoints)
│   ├── data           # Layer 4 data plane (Pinecone client, trainpacks)
│   └── observability  # Layer 5 telemetry dashboard + perf metrics
├── docs/              # Architecture + Codex references
├── scripts/           # Reset/start/stop helpers (real-estate demo, etc.)
└── examples/          # Usage examples (kept local for now)
```

## ⚙️ Quick Start

```bash
cd /Users/joewales/NODE_OUT_Master/contract-ai-platform
npm install                      # install workspaces
npm run build                    # compile every package
npm run test                     # run Vitest (mocks monitoring port 3001)
```

### MCP + Real-Estate Demo Stack

```bash
export OPENAI_API_KEY=sk-...
# optional Stripe for downstream flows
export STRIPE_SECRET_KEY=sk_test_...

# one-shot cleanup (stops MCP + demo servers, clears ports 5052/5053/8080)
./scripts/reset-real-estate.sh

# progressive startup (Zillow scraper → package service → MCP interface)
./scripts/start-real-estate.sh

# run the chained demo call once everything is online
MCP_BASE_URL=http://localhost:8080 \
MCP_BEARER_TOKEN=${MCP_BEARER_TOKEN:-dev-token-12345} \
npm run demo:real-estate

# later, stop them:
./scripts/stop-real-estate.sh
```

Need an alias? Add something like
`alias killalldomicile='cd ~/NODE_OUT_Master/contract-ai-platform && ./scripts/reset-real-estate.sh'`
to your `~/.zshrc`.

## 🔐 Why Contracts > Prompts

| Traditional Prompting | Domicile |
| --- | --- |
| Fragile text instructions | Typed contracts validated with Zod |
| Agent self-preference | Covenant trust scores + policy barriers |
| Manual auditing | Ledger + observability dashboard (`@domicile/observability`) |
| Static systems | Circadian loop proposes improvements off-hours |

## 🧩 Foundation Highlights

- **Circadian Loop:** Day = human + AI collaboration. Night = dream about decisions vs. outcomes. Dawn = new mutual understanding.
- **Governance:** Circuit breakers, quarantine modes, and rollback ledgers ensure agents cannot skip the policy gate.
- **Memory:** Pinecone-backed knowledge graph, trainpack builder, and ROI vectors keep monetization loops contextual.
- **Observability:** Monitoring dashboard (Express + Tailwind) streaming SSE health data, accessible at `http://localhost:3001`.

## 📚 Documentation Map

- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — full six-layer blueprint.
- [`docs/concepts/agent-codex.md`](./docs/concepts/agent-codex.md) — UPS personas + governance barriers.
- [`domicile/DOMICILE_INTEGRATION_PLAN.md`](./domicile/DOMICILE_INTEGRATION_PLAN.md) — integration punch list.
- [`domicile/COMPONENT_MAPPING.md`](./domicile/COMPONENT_MAPPING.md) — source → destination mapping.
- [`domicile/CIRCADIAN_PHILOSOPHY.md`](./domicile/CIRCADIAN_PHILOSOPHY.md) — learning model.
- [`domicile/docs/agent-ecosystem.ts`](./domicile/docs/agent-ecosystem.ts) & [`domicile/docs/ecosystem-semantic-refiner.ts`](./domicile/docs/ecosystem-semantic-refiner.ts) — narrative + semantic payloads.

## 🧪 Development Scripts

```bash
npm run build:packages   # build each workspace
npm run mcp:start -w @domicile/interface   # start the MCP server
npm run demo:real-estate                    # run the documented demo
CI=1 npm test                                # CI-friendly vitest run
```

## 🌅 Vision

Domicile is the collaboration surface where:
- Software understands what you mean the first time because contracts and manifests encode it.
- Every failed attempt becomes a training signal the system reflects on overnight.
- Agents evolve safely because Covenant refuses to ship anything with a resilience score < 80.

**It’s not just another SDK—it’s a governed ecosystem that learns while you sleep.**

---

*"The platform that dreams about its decisions vs. outcomes, learning to understand you better while you sleep."*
