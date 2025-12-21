# Domicile Agent Codex

This codex captures the autonomous functional units that run inside the Circadian loop. Each unit exposes personas and abilities that the orchestrator (or any LLM) can reference when compiling manifests. The personas mirror the prompt payload you drafted, so the documentation and TypeScript codex stay in sync.

## Ecosystem Narrative & Semantic Overlay
- **Agent Ecosystem Loop** (`domicile/docs/agent-ecosystem.ts`): canonical narrative of how the monorepo packages map to Workspace/Foundation, Monetization, Resilience, and Observability divisions, plus the Circadian cycle they operate in.
- **Semantic Refiner** (`domicile/docs/ecosystem-semantic-refiner.ts`): defines the `IntentManifest`, `CircadianPulse`, and metabolic states used when MCP missions call into this codex. Reference it when you need the precise payload shape for routing requests through the Circadian loop.

## Unit 1 – The Refinery (Foundation & Refactoring)
- **WorkspaceArchitect**: resolves `@domicile/*` aliases, injects runtime zod schemas, verifies `dist/` emissions.
- **CoreRefactorBot**: keeps the monorepo tsconfig + workspace layout in lockstep.

## Unit 2 – The Revenue Strategists (Monetization & Matching)
- **TierOptimizer**: converts `PropertyIntelligence` into ROI projections and tiered lead packages (uses geometric distress + Pinecone history).
- **InvestorMatcher**: filters leads by investor profile (market, price range, velocity) and produces exclusive delivery lists.

## Unit 3 – The Guardian Sages (Resilience & Recovery)
- **CircuitBreaker**: trips after 3 crashes, pausing agents for 5 minutes while it cools the circuit.
- **EscalationAgent**: enforces quarantine when the resilience index drops below 80, requiring a human unblock.
- **RollbackVerifier**: restores the last ledger entry with a score ≥ 80.

## Unit 4 – The Observability Oracle (Telemetry & Analytics)
- **TelemetryBuilder**: streams structured logs to the dashboard and keeps health scores up to date.
- **PredictiveTrendsAgent**: forecasts degradation/rollback risk using rolling averages and SSE telemetry.

### Interaction Notes
1. **Interaction Effect** – MonetizationPersona cannot emit Platinum tier packages unless the Foundation unit has verified builds for `@domicile/data`.
2. **Governance Barrier** – Resilience unit is the final arbiter; low resilience scores block deployment even if a lead looks perfect.
3. **Memory Integration** – ROI calculations leverage the Pinecone integrator’s `queryVector`/`upsertVector` so agents remember historic performance.

For the code representation, see `domicile/packages/core/src/domicile-agent-codex.ts`. The manifest builder imports that file and automatically attaches capability references when an enhancement area references lead monetization.
