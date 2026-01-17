/**
 * @file base-domain-agent.ts
 * @description Base interface for all domain agents in the orchestrator
 */
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
export declare abstract class BaseDomainAgent {
    protected domain: string;
    protected capabilities: DomainAgentCapabilities;
    constructor(domain: string);
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
    getCapabilities(): DomainAgentCapabilities;
    /**
     * Get agent domain
     */
    getDomain(): string;
    /**
     * Format agent output as a contract
     * Helper method for converting agent responses to contracts
     */
    protected formatAsContract(area: EnhancementArea, agentOutput: Record<string, unknown>, metadata?: Partial<AgentContract['metadata']>): AgentContract;
}
//# sourceMappingURL=base-domain-agent.d.ts.map