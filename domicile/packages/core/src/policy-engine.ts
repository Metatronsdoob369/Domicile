// src/orchestration/policy-engine.ts
import { AgentMeta } from './agent-registry';

export type PolicyInput = {
  domainResult: { domain: string; confidence: number };
  agents: AgentMeta[];
  phase1: any;
  options?: { sensitiveDomains?: string[]; minAgentTrust?: number; minDomainConfidence?: number };
};

export type PolicyDecision = {
  route: 'AGENT'|'LLM'|'HUMAN';
  agentId?: string;
  minConfidence?: number;
  explanation?: string;
};

export class PolicyEngine {
  static defaultOptions = {
    sensitiveDomains: ['healthcare','finance'],
    minAgentTrust: 0.7,
    minDomainConfidence: 0.5
  };

  static decide(input: PolicyInput): PolicyDecision {
    const opts = { ...PolicyEngine.defaultOptions, ...(input.options || {}) };
    const domain = input.domainResult.domain;
    const ddConf = input.domainResult.confidence;

    if (opts.sensitiveDomains.includes(domain)) {
      const compliance = (input.phase1?.analysis?.nonFunctional?.compliance || []) as string[];
      if (!compliance || compliance.length === 0) {
        return { route: 'HUMAN', explanation: `Sensitive domain (${domain}) without declared compliance -> human review` };
      }
    }

    if (ddConf < opts.minDomainConfidence) {
      return { route: 'LLM', explanation: `Domain confidence low (${ddConf.toFixed(2)}). Fall back to LLM generation.` };
    }

    const candidates = input.agents.filter(a => a.domains.includes(domain));
    if (candidates.length === 0) {
      return { route: 'LLM', explanation: `No agent registered for domain ${domain}.` };
    }

    candidates.sort((a,b) => (b.trustScore - a.trustScore) || ((b.preferred?1:0)-(a.preferred?1:0)));
    const best = candidates[0];

    if (best.trustScore >= opts.minAgentTrust) {
      return {
        route: 'AGENT',
        agentId: best.agentId,
        minConfidence: 0.65,
        explanation: `Selecting agent ${best.agentId} (trust=${best.trustScore.toFixed(2)})`
      };
    }

    return { route: 'LLM', explanation: `Top agent trust ${best.trustScore.toFixed(2)} below threshold ${opts.minAgentTrust}.` };
  }
}