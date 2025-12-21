# Orchestration Control Plane — Remaining Deliverable

This set finishes the neutral control-plane: agent SDK, quantum-social adapter, manifest builder, audit logger, demo harness, and tests.

## Run smoke harness
1. Place these files in `src/orchestration/`.
2. Ensure `EnhancedQuantumSocialAgent` is available at `src/enhanced_quantum_social_media_agent.v2.ts` (or update adapter import).
3. Run:
   ```bash
   pnpm exec ts-node src/orchestration/test-orch.ts

Run unit tests
pnpm exec vitest run

Notes for ROO

Adapter auth: For production, pass a Firestore instance + service account userId into QuantumSocialAdapter instead of null.

Policy tuning: Update PolicyEngine.defaultOptions to tune trust/confidence thresholds.

Audit persistence: To persist audit logs in Firestore, implement a persister with save(record) and pass to new AuditLogger(persister).

LLM fallback: Replace the stub llmFallback with your LLM-based contract generator in production.


---

## FINAL NOTES & sanity checks
- **No internal changes** to `EnhancedQuantumSocialAgent` are required — the `QuantumSocialAdapter` wraps it.
- If `EnhancedQuantumSocialAgent` **requires** Firestore in its constructor for production, pass the orchestrator’s Firestore instance instead of `null` in the adapter (I left `null` for demo to avoid accidental credentials).
- The manifest builder logs all decision points via `AuditLogger`. If you want audit records saved to Firestore, implement a `persister.save(record)` and pass it into `new AuditLogger(persister)`.