// src/orchestration/manifest-builder.ts
import { AgentRegistry } from './agent-registry';
import { DomainDetector } from './domain-detector';
import { PolicyEngine } from './policy-engine';
import { QuantumSocialAdapter } from './agent-adapter';
import { AuditLogger } from './audit-logger';

/**
 * ManifestBuilder
 * - domain detection (independent)
 * - consult registry
 * - policy decision
 * - invoke agent adapter or fallback to LLM
 * - log audit trail
 */

export type LLMFallback = (area: any) => Promise<any>;

export class ManifestBuilder {
  constructor(
    private registry: AgentRegistry,
    private detector: DomainDetector,
    private audit: AuditLogger,
    private llmFallback?: LLMFallback,
  ) {}

  private buildPromptFromArea(area: any) {
    const name = area.name || 'Enhancement Area';
    const objective = area.objective || area.description || 'Optimize';
    const reqs = (area.keyRequirements || area.requirements || []).join('; ');
    const constraints = (area.constraints || []).join('; ');
    return `
Enhancement Area: ${name}
Objective: ${objective}
Key Requirements: ${reqs || 'none specified'}
Constraints: ${constraints || 'none specified'}
Please produce an EnhancedSocialMediaPlan including platform/postType/contentSpec/hashtags/algorithmTips/expectedEngagement/confidenceScore.
`.trim();
  }

  async generateAgentContract(area: any, phase1: any) {
    // 1) domain detect
    const domainRes = this.detector.classify(
      phase1.requirement || area.name || '',
    );
    await this.audit.log('domain_detect', {
      phase1Requirement: phase1.requirement,
      domainRes,
    });

    // 2) candidate agents
    const candidates = this.registry.listByDomain(domainRes.domain);
    await this.audit.log('candidates', {
      domain: domainRes.domain,
      candidates,
    });

    // 3) policy decision
    const decision = PolicyEngine.decide({
      domainResult: domainRes,
      agents: candidates,
      phase1,
    });
    await this.audit.log('policy_decision', { decision });

    if (decision.route === 'HUMAN') {
      await this.audit.log('action', {
        msg: 'escalate: human review required',
      });
      return { route: 'HUMAN' };
    }

    if (decision.route === 'LLM') {
      await this.audit.log('action', { msg: 'LLM fallback chosen' });
      if (!this.llmFallback) throw new Error('LLM fallback not configured');
      const llmContract = await this.llmFallback(area);
      await this.audit.log('persist', {
        method: 'llm',
        contractSummary: llmContract?.type || 'LLMResult',
      });
      return { route: 'LLM', contract: llmContract };
    }

    // AGENT path
    const agentMeta = this.registry.get(decision.agentId!);
    if (!agentMeta) {
      await this.audit.log('error', {
        msg: 'agent missing in registry',
        agentId: decision.agentId,
      });
      if (this.llmFallback) {
        const llmContract = await this.llmFallback(area);
        return { route: 'LLM', contract: llmContract };
      }
      throw new Error('Agent not found');
    }

    // instantiate adapter for known agents
    let adapter: any;
    if (agentMeta.agentId === 'quantum-social-v2') {
      adapter = new QuantumSocialAdapter(null, 'orchestrator-system');
    } else {
      throw new Error(`No adapter implemented for agent ${agentMeta.agentId}`);
    }

    const prompt = this.buildPromptFromArea(area);
    try {
      const { plan, confidence } = await adapter.generatePlan(prompt, phase1);
      await this.audit.log('agent_result', {
        agentId: agentMeta.agentId,
        confidence,
        planSummary: { platform: plan.platform, postType: plan.postType },
      });

      if (adapter.validate) {
        const v = await adapter.validate(plan);
        if (!v.valid) {
          await this.audit.log('validation_failed', { issues: v.issues });
          if (this.llmFallback) {
            const llmContract = await this.llmFallback(area);
            return { route: 'LLM', contract: llmContract };
          }
          return {
            route: 'AGENT',
            agentId: agentMeta.agentId,
            plan,
            validation: v,
            note: 'agent provided invalid plan',
          };
        }
      }

      await this.audit.log('persist', {
        method: 'agent',
        agentId: agentMeta.agentId,
      });
      return { route: 'AGENT', agentId: agentMeta.agentId, plan, confidence };
    } catch (err) {
      await this.audit.log('agent_error', {
        agentId: agentMeta.agentId,
        error: String(err),
      });
      if (this.llmFallback) {
        const llmContract = await this.llmFallback(area);
        return {
          route: 'LLM',
          contract: llmContract,
          fallbackError: String(err),
        };
      }
      throw err;
    }
  }
}

// TODO: Implement these functions properly when pinecone integration is ready
export function buildManifestWithPinecone(areas: any[]): any {
  return { areas, timestamp: new Date().toISOString() };
}

export function buildDependencyGraph(contracts: any[]): any {
  return {
    nodes: contracts.map((c, i) => ({ id: i, contract: c })),
    edges: [],
  };
}
