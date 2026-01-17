// src/orchestration/agent-sdk.ts
/**
 * Orchestration SDK: minimal interface every agent should support.
 * Agents may be wrapped by adapters to conform.
 */
export type Artifact = any;

export interface OrchestrationAgent {
  agentId: string;
  domains: string[]; // tags
  version: string;

  // generatePlan: input prompt and Phase1 context
  generatePlan(prompt: string, context?: any): Promise<{ plan: Artifact; confidence: number }>;

  // Optional: propose a domain-scoped orchestration (a proposal)
  proposeSubOrchestration?(plan: Artifact): Promise<{ subTasks: any[]; rationale?: string }>;

  // Optional: quick validation
  validate?(plan: Artifact): Promise<{ valid: boolean; issues?: string[] }>;
}