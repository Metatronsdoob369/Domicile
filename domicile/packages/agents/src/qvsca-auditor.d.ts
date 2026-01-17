/**
 * Quantum-Verified Smart Contract Auditor (QV-SCA)
 * Framework: Quantum-Verified Smart Contract Auditor (QV-SCA)
 * Goal: Autonomous, Provably Correct, Quantum-Resilient CONTRACT FIRST Enforcement
 */
import { BaseDomainAgent, type EnhancementArea, type AgentContract, type DomainAgentCapabilities } from './core/base-domain-agent';
/** Stop 1: The Formal Specification Layer (Encoding Mathematical Certainty) */
type FormalLanguage = "Coq" | "Lean" | "TLA+";
export interface InvariantProof {
    language: FormalLanguage;
    is_balance_preserving: boolean;
    is_no_reentrancy: boolean;
    status: "PROVEN" | "FALSIFIED" | "MODULAR_PROOF_PENDING";
}
/** Stop 2: The Adversarial Simulation Engine (Quantifying Quantum Resilience) */
type QuantumNoiseModel = "Trotter-Suzuki Decomposition";
export interface AdversarialSimulationResult {
    noise_model: QuantumNoiseModel;
    max_exploit_prob: number;
    timing_control: "IndexTTS2 Duration Control";
    qdrift_randomization_applied: boolean;
}
/** Stop 3: Forensic Trace Verification (Gating Integrity Quantitatively) */
export interface ForensicMatchResult {
    similarity_score: number;
    integrity_asserted: boolean;
    is_ai_forgery: boolean;
}
export interface AuditReport {
    spec_proof: InvariantProof;
    adv_sim: AdversarialSimulationResult;
    forensic: ForensicMatchResult;
    cvc_score: number;
}
/**
 * The high-assurance threshold required for Contract Propulsion Enforcement.
 * This guard dictates autonomous deployment conditions.
 */
export declare const MINIMUM_PROPULSION_GUARD: number;
export declare class QVSCA_Auditor_Agent extends BaseDomainAgent {
    readonly name: string;
    constructor();
    protected initializeCapabilities(): DomainAgentCapabilities;
    canHandle(area: EnhancementArea): boolean;
    generateContract(area: EnhancementArea): Promise<AgentContract>;
    /**
     * Executes the MCP-Integrated Audit Pipeline.
     * Contract First mandate requires pre-tool-hook verification before execution rights are granted.
     */
    audit_contract(bytecode: string): Promise<AuditReport>;
    private coq_verify;
    private trotter_sim;
    private forensic_similarity;
    private calculate_cvc_score;
}
/**
 * The autonomous gate function defining the robust execution environment.
 * Ensures the contract's integrity is validated *before* it gains execution rights.
 */
export declare function autonomous_deployment_gate(report: AuditReport): boolean;
/**
 * Pre-tool hook for DEPLOY events - ensures all deployments are audited
 */
export declare function pre_deploy_hook(bytecode: string): Promise<boolean>;
/**
 * Runtime verification hook for active contracts
 */
export declare function runtime_verification_hook(contractAddress: string, transaction: any): Promise<boolean>;
export declare const Future_Resilience_Mandates: {
    modular_verification_strategy: string;
    timing_model_training: string;
    kb_ingestion_target: string;
    end_goal_assurance: string;
    vulnerability_mitigation: {
        compiler_backdoors: string;
        quantum_side_channels: string;
    };
};
export {};
//# sourceMappingURL=qvsca-auditor.d.ts.map