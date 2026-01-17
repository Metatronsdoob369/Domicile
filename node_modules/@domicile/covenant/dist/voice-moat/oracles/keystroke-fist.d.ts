/**
 * Covenant Voice Moat — Digital Fist Oracle
 *
 * This module models the "Digital Fist" biometric attestation described in the
 * deployment note.  It can operate independently of any remote service and
 * provides a deterministic interface that other subsystems can import.
 */
export declare const MIN_FIST_SCORE = 0.91;
export type KeystrokeSample = {
    /**
     * Milliseconds since the previous key event.
     */
    deltaMs: number;
    /**
     * Normalised pressure (0..1). Optional because some keyboards omit it.
     */
    pressure?: number;
    /**
     * Optional key symbol for entropy calculations.
     */
    key?: string;
};
export interface VoiceSession {
    sessionId: string;
    agentId: string;
    typingStream: KeystrokeSample[];
    channel?: 'voice' | 'text';
    locale?: string;
}
export type VoiceMoatProofStatus = 'VALID' | 'REJECTED';
export interface BiometricProof {
    status: VoiceMoatProofStatus;
    score: number;
    oracleId: string;
    sessionId: string;
    reason?: string;
    entropy: number;
    clause: string;
    issuedAt: string;
}
export type Oracle<TProof> = {
    id: string;
    verify: (session: VoiceSession) => Promise<TProof>;
    entropy: number;
    covenantClause: string;
};
export declare const Proof: {
    Valid: (score: number, session: VoiceSession) => BiometricProof;
    Rejected: (reason: string, score: number, session: VoiceSession) => BiometricProof;
};
/**
 * Lightweight behavioural model that scores a keystroke stream.
 * The output is deterministic for a given stream and bounded between 0..1.
 */
export declare const fistGuard: {
    evaluate(stream: KeystrokeSample[]): Promise<number>;
};
export declare const KeystrokeOracle: Oracle<BiometricProof>;
//# sourceMappingURL=keystroke-fist.d.ts.map