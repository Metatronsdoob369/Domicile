import { describe, expect, it, vi } from 'vitest';
import { KeystrokeOracle, MIN_FIST_SCORE, fistGuard } from './keystroke-fist';

const buildSession = (typingStream: number[]) => ({
  sessionId: 'session-test',
  agentId: 'voice-agent',
  typingStream: typingStream.map((delta, index) => ({
    deltaMs: delta,
    pressure: 0.6 + (index % 3) * 0.1,
    key: String.fromCharCode(65 + (index % 26)),
  })),
});

describe('Digital Fist Keystroke Oracle', () => {
  it('rejects anonymous invaders when score below threshold', async () => {
    const proof = await KeystrokeOracle.verify(buildSession([]));
    expect(proof.status).toBe('REJECTED');
    expect(proof.reason).toBe('ANONYMOUS_INVADER');
    expect(proof.score).toBeLessThan(MIN_FIST_SCORE);
  });

  it('validates sessions when guard score exceeds threshold', async () => {
    const spy = vi.spyOn(fistGuard, 'evaluate').mockResolvedValue(MIN_FIST_SCORE + 0.02);
    const proof = await KeystrokeOracle.verify(buildSession([100, 100, 98, 102]));
    expect(proof.status).toBe('VALID');
    expect(proof.score).toBeGreaterThanOrEqual(MIN_FIST_SCORE);
    spy.mockRestore();
  });

  it('produces deterministic scores for the same stream', async () => {
    const session = buildSession([100, 120, 100, 120, 110, 105, 98, 115]);
    const first = await fistGuard.evaluate(session.typingStream);
    const second = await fistGuard.evaluate(session.typingStream);
    expect(first).toBe(second);
  });
});
