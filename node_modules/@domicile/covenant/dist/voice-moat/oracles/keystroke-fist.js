"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeystrokeOracle = exports.fistGuard = exports.Proof = exports.MIN_FIST_SCORE = void 0;
const crypto_1 = __importDefault(require("crypto"));
/**
 * Covenant Voice Moat — Digital Fist Oracle
 *
 * This module models the "Digital Fist" biometric attestation described in the
 * deployment note.  It can operate independently of any remote service and
 * provides a deterministic interface that other subsystems can import.
 */
exports.MIN_FIST_SCORE = 0.91;
exports.Proof = {
    Valid: (score, session) => ({
        status: 'VALID',
        score: Number(score.toFixed(4)),
        oracleId: 'fist-62850',
        sessionId: session.sessionId,
        entropy: 0.84,
        clause: 'All agents MUST present Digital Fist ≥ 91% or be terminated',
        issuedAt: new Date().toISOString(),
    }),
    Rejected: (reason, score, session) => ({
        status: 'REJECTED',
        score: Number(score.toFixed(4)),
        reason,
        oracleId: 'fist-62850',
        sessionId: session.sessionId,
        entropy: 0.84,
        clause: 'All agents MUST present Digital Fist ≥ 91% or be terminated',
        issuedAt: new Date().toISOString(),
    }),
};
/**
 * Lightweight behavioural model that scores a keystroke stream.
 * The output is deterministic for a given stream and bounded between 0..1.
 */
exports.fistGuard = {
    async evaluate(stream) {
        if (!stream || stream.length === 0)
            return 0;
        const deltas = stream.map((s) => Math.max(0, s.deltaMs));
        const averageDelta = deltas.reduce((sum, value) => sum + value, 0) / deltas.length;
        const variance = deltas.reduce((sum, value) => sum + Math.pow(value - averageDelta, 2), 0) / deltas.length;
        const rhythmScore = 1 - Math.min(1, variance / Math.max(1, averageDelta ** 2));
        const pressures = stream
            .map((s) => (typeof s.pressure === 'number' ? Math.min(1, Math.max(0, s.pressure)) : 0.5));
        const pressureScore = pressures.reduce((sum, value) => sum + value, 0) / (pressures.length || 1);
        const keys = stream.map((s) => s.key).filter(Boolean);
        const keyEntropy = keys.length === 0
            ? 0.5
            : Math.min(1, new Set(keys).size / Math.max(1, Math.log2(keys.length + 1)));
        const cadenceHash = crypto_1.default
            .createHash('sha1')
            .update(deltas.map((d) => d.toFixed(2)).join(':'))
            .digest('hex');
        const cadenceScore = (parseInt(cadenceHash.slice(0, 4), 16) % 1000) / 1000;
        const combined = rhythmScore * 0.4 + pressureScore * 0.2 + keyEntropy * 0.2 + cadenceScore * 0.2;
        return Number(Math.min(1, Math.max(0, combined)).toFixed(4));
    },
};
exports.KeystrokeOracle = {
    id: 'fist-62850',
    entropy: 0.84,
    covenantClause: 'All agents MUST present Digital Fist ≥ 91% or be terminated',
    verify: async (session) => {
        const score = await exports.fistGuard.evaluate(session.typingStream);
        return score >= exports.MIN_FIST_SCORE
            ? exports.Proof.Valid(score, session)
            : exports.Proof.Rejected('ANONYMOUS_INVADER', score, session);
    },
};
//# sourceMappingURL=keystroke-fist.js.map