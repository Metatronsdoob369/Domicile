// src/orchestration/agent-adapter.ts
import { OrchestrationAgent } from './agent-sdk';
// Adjust path if your agent lives elsewhere in src/
// import { EnhancedQuantumSocialAgent } from '../enhanced_quantum_social_media_agent.v2';
import { Firestore } from 'firebase/firestore';

// Placeholder for the actual agent - update import path when available
class EnhancedQuantumSocialAgent {
  constructor(db: Firestore | null, userId: string) {}
  async generateAdvancedStrategy(prompt: string) {
    return {
      success: true,
      data: {
        platform: 'tiktok',
        postType: 'reel',
        contentSpec: 'viral dance challenge',
        hashtags: ['#fyp', '#dance'],
        algorithmTips: ['post during peak hours'],
        expectedEngagement: 0.8,
        confidenceScore: 0.75
      }
    };
  }
}

/**
 * Adapter for EnhancedQuantumSocialAgent -> OrchestrationAgent
 * Non-invasive wrapper: converts the agent's Result into { plan, confidence }.
 */
export class QuantumSocialAdapter implements OrchestrationAgent {
  agentId = 'quantum-social-v2';
  domains = ['social-media'];
  version = 'v2';

  private agent: EnhancedQuantumSocialAgent;

  constructor(db: Firestore | null = null, userId = 'system-orchestrator') {
    // Agent expects Firestore + userId. Passing null is OK for demo, but for prod provide a Firestore instance.
    this.agent = new EnhancedQuantumSocialAgent(db as any, userId);
  }

  async generatePlan(prompt: string, context?: any): Promise<{ plan: any; confidence: number }> {
    const result = await this.agent.generateAdvancedStrategy(prompt);
    if (!result.success) {
      // Normalize agent error into thrown Error so orchestrator can handle fallback
      throw new Error('Agent failed to generate plan');
    }
    const plan = result.data;
    // Agent may include confidenceScore; fallback to 0.6 if not present
    const confidence = typeof plan.confidenceScore === 'number' ? plan.confidenceScore : 0.6;
    return { plan, confidence };
  }

  async validate(plan: any) {
    // basic smoke validation — more thorough validation should use Zod schemas
    const valid = !!(plan && plan.platform && plan.postType && plan.contentSpec);
    const issues = valid ? [] : ['missing platform/postType/contentSpec'];
    return { valid, issues };
  }

  // Optionally implement proposeSubOrchestration if Enhanced agent supports it in the future.
}