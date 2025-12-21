// Legacy orchestrator tests have moved to src/orchestrator.test.ts
import { describe, it } from 'vitest';

describe.skip('Legacy orchestrator suite', () => {
  it('has been superseded by domicile/packages/core/src/orchestrator.test.ts', () => {
    // This file remains so historical test paths still resolve, but the
    // modern suite lives alongside the TypeScript sources.
  });
});
