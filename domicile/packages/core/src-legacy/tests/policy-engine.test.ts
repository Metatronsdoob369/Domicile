// Legacy policy-engine tests now exercise the maintained implementation
import { describe, it, expect } from 'vitest';
import { PolicyEngine } from '../policy-engine';
import { AgentMeta } from '../agent-registry';

const mockAgents: AgentMeta[] = [
  {
    agentId: 'qsv2',
    domains: ['social-media'],
    capabilities: ['generatePlan'],
    version: '1.0.0',
    trustScore: 0.82,
    preferred: true
  },
  {
    agentId: 'hlth-guardian',
    domains: ['healthcare'],
    capabilities: ['complianceReview'],
    version: '0.9.0',
    trustScore: 0.68
  }
];

describe('PolicyEngine (legacy shim)', () => {
  it('routes to HUMAN when sensitive domain lacks compliance proof', () => {
    const input = {
      domainResult: { domain: 'healthcare', confidence: 0.9 },
      agents: mockAgents,
      phase1: { analysis: { nonFunctional: { compliance: [] } } },
      options: { sensitiveDomains: ['healthcare'] }
    };
    const decision = PolicyEngine.decide(input);
    expect(decision.route).toBe('HUMAN');
  });

  it('routes to AGENT when preferred agent exceeds threshold', () => {
    const input = {
      domainResult: { domain: 'social-media', confidence: 0.9 },
      agents: mockAgents,
      phase1: { analysis: { nonFunctional: { compliance: ['SOC2'] } } }
    };
    const decision = PolicyEngine.decide(input);
    expect(decision.route).toBe('AGENT');
    expect(decision.agentId).toBe('qsv2');
  });

  it('falls back to LLM when domain confidence is low', () => {
    const input = {
      domainResult: { domain: 'social-media', confidence: 0.2 },
      agents: mockAgents,
      phase1: {}
    };
    const decision = PolicyEngine.decide(input);
    expect(decision.route).toBe('LLM');
  });
});
