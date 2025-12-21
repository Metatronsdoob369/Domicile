/**
 * @file base-domain-agent.ts
 * @description Base interface for all domain agents in the orchestrator
 */

import { Agent, RunResult } from '@openai/agents';

export interface EnhancementArea {
  name: string;
  objective: string;
  key_requirements: string[];
  sources?: string[];
  depends_on?: string[];
  domain?: string;
  priority?: number;
}

export interface AgentContract {
  enhancement_area: string;
  objective: string;
  implementation_plan: {
    modules: string[];
    architecture: string;
  };
  depends_on: string[];
  sources: string[];
  governance: {
    security: string;
    compliance: string;
    ethics: string;
  };
  validation_criteria: string;
  metadata?: {
    generated_at?: Date;
    confidence?: number;
    reasoning_trace?: string[];
  };
}

export interface DomainAgentCapabilities {
  domain: string;
  capabilities: string[];
  supported_tasks: string[];
  trust_score: number;
  performance_metrics?: {
    success_rate?: number;
    average_response_time?: number;
    total_invocations?: number;
  };
}

/**
 * Base class for all domain agents
 * Integrates with the policy-authoritative orchestrator
 */
export abstract class BaseDomainAgent {
  protected domain: string;
  protected capabilities: DomainAgentCapabilities;

  constructor(domain: string) {
    this.domain = domain;
    this.capabilities = this.initializeCapabilities();
  }

  /**
   * Initialize agent capabilities
   * Must be implemented by each domain agent
   */
  protected abstract initializeCapabilities(): DomainAgentCapabilities;

  /**
   * Check if this agent can handle the given enhancement area
   * @param area Enhancement area to evaluate
   * @returns true if agent can handle this area
   */
  abstract canHandle(area: EnhancementArea): boolean;

  /**
   * Generate a contract for the given enhancement area
   * @param area Enhancement area
   * @returns Agent contract
   */
  abstract generateContract(area: EnhancementArea): Promise<AgentContract>;

  /**
   * Get agent capabilities
   */
  getCapabilities(): DomainAgentCapabilities {
    return this.capabilities;
  }

  /**
   * Get agent domain
   */
  getDomain(): string {
    return this.domain;
  }

  /**
   * Format agent output as a contract
   * Helper method for converting agent responses to contracts
   */
  protected formatAsContract(
    area: EnhancementArea,
    agentOutput: any,
    metadata?: Partial<AgentContract['metadata']>
  ): AgentContract {
    return {
      enhancement_area: area.name,
      objective: area.objective,
      implementation_plan: {
        modules: agentOutput.modules ||,
        architecture: agentOutput.architecture || agentOutput.summary || ''
      },
      depends_on: area.depends_on ||,
      sources: area.sources || agentOutput.sources ||,
      governance: {
        security: agentOutput.security || 'Standard security protocols',
        compliance: agentOutput.compliance || `${this.domain} domain compliance`,
        ethics: agentOutput.ethics || 'Ethical AI principles applied'
      },
      validation_criteria: agentOutput.validation_criteria || 'Contract validation pending',
      metadata: {
        generated_at: new Date(),
        confidence: agentOutput.confidence || 0.8,
        reasoning_trace: agentOutput.reasoning_trace ||,
        ...metadata
      }
    };
  }
}
