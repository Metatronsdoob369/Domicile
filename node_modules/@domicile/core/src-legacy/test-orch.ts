// src/orchestration/test-orch.ts
import { sampleOrchestratorRun } from './orchestrator-sample';

// Simple LLM fallback stub
async function llmFallback(area: any) {
  return { type: 'LLMPlan', payload: { stub: true, areaName: area.name } };
}

(async () => {
  const phase1 = {
    requirement: 'Promote a coffee product on social channels and sell subscriptions',
    analysis: {
      domain: 'social-media',
      complexity: 'mvp',
      capabilities:,
      nonFunctional: { compliance: }
    }
  };

  await sampleOrchestratorRun(phase1, llmFallback);
})();