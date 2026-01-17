/**
 * Domicile Agents Package
 * Export all domain agents and core functionality
 */

// Export the QVSCA Auditor
export {
  QVSCA_Auditor_Agent,
  MINIMUM_PROPULSION_GUARD,
  type AuditReport,
  type InvariantProof,
  type AdversarialSimulationResult,
  type ForensicMatchResult,
  autonomous_deployment_gate,
  pre_deploy_hook,
  runtime_verification_hook,
  Future_Resilience_Mandates,
} from './qvsca-auditor';

// Export base domain agent functionality
export {
  BaseDomainAgent,
  type EnhancementArea,
  type AgentContract,
  type DomainAgentCapabilities,
} from './core/base-domain-agent';

// Export financial agents
export { FinancialResearchDomainAgent } from './financial/financial-research-agent';

// Export research agents
export { TriadGraphRAGDomainAgent } from './research/triad-graph-rag-agent';
