// src/orchestration/tests/domain-detector.test.ts
import { describe, it, expect } from 'vitest';
import { DomainDetector } from '../domain-detector';

describe('DomainDetector', () => {
  it('detects ecommerce keywords', () => {
    const d = new DomainDetector(null);
    const res = d.classify('I want a shop to sell products and handle checkout and inventory');
    expect(res.domain).toBe('ecommerce');
    expect(res.confidence).toBeGreaterThan(0.5);
  });

  it('defaults to general on low signal', () => {
    const d = new DomainDetector(null);
    const res = d.classify('I want something new and cool');
    expect(res.domain).toBe('general');
  });
});