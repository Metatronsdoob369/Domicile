"use strict";
/**
 * @file base-domain-agent.ts
 * @description Base interface for all domain agents in the orchestrator
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDomainAgent = void 0;
/**
 * Base class for all domain agents
 * Integrates with the policy-authoritative orchestrator
 */
class BaseDomainAgent {
    domain;
    capabilities;
    constructor(domain) {
        this.domain = domain;
        this.capabilities = this.initializeCapabilities();
    }
    /**
     * Get agent capabilities
     */
    getCapabilities() {
        return this.capabilities;
    }
    /**
     * Get agent domain
     */
    getDomain() {
        return this.domain;
    }
    /**
     * Format agent output as a contract
     * Helper method for converting agent responses to contracts
     */
    formatAsContract(area, agentOutput, metadata) {
        return {
            enhancement_area: area.name,
            objective: area.objective,
            implementation_plan: {
                modules: agentOutput.modules ?? [],
                architecture: agentOutput.architecture ?? agentOutput.summary ?? ''
            },
            depends_on: area.depends_on ?? [],
            sources: area.sources ?? (agentOutput.sources ?? []),
            governance: {
                security: agentOutput.security ?? 'Standard security protocols',
                compliance: agentOutput.compliance ?? `${this.domain} domain compliance`,
                ethics: agentOutput.ethics ?? 'Ethical AI principles applied'
            },
            validation_criteria: agentOutput.validation_criteria ?? 'Contract validation pending',
            metadata: {
                generated_at: new Date(),
                confidence: agentOutput.confidence ?? 0.8,
                reasoning_trace: agentOutput.reasoning_trace ?? [],
                ...metadata
            }
        };
    }
}
exports.BaseDomainAgent = BaseDomainAgent;
//# sourceMappingURL=base-domain-agent.js.map