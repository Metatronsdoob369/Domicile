// src/orchestration/domain-detector.ts
export type DomainResult = {
  domain: string;
  confidence: number; // 0..1
  explanation?: string;
};

/**
 * Minimal DomainDetector: keyword-based classifier with optional LLM hook.
 * Independent — never uses agent code.
 */
export class DomainDetector {
  private keywordMap: Record<string, string[]> = {
    ecommerce: ['ecom', 'shop', 'store', 'product', 'checkout', 'inventory'],
    healthcare: ['health', 'clinic', 'patient', 'telemedicine', 'ehr', 'hipaa'],
    'social-media': ['social', 'followers', 'post', 'reels', 'tiktok', 'instagram', 'twitter'],
    finance: ['bank', 'finance', 'payment', 'kyc', 'aml', 'trading'],
    manufacturing: ['manufactur', 'factory', 'scada', 'plc', 'iot']
  };

  constructor(private llmClient: { classify?: (text: string)=>Promise<DomainResult> }|null = null) {}

  classify(text: string): DomainResult {
    const t = (text || '').toLowerCase();
    const scores: Record<string, number> = {};
    for (const [domain, kws] of Object.entries(this.keywordMap)) {
      let score = 0;
      for (const kw of kws) if (t.includes(kw)) score++;
      scores[domain] = score;
    }
    const entries = Object.entries(scores).sort((a,b)=>b[1]-a[1]);
    const [bestDomain, bestScore] = entries[0];
    const maxScore = Math.max(...Object.values(scores)) || 1;
    const confidence = maxScore === 0 ? 0.2 : Math.min(1, bestScore / Math.max(1, maxScore));
    const explanation = `Keyword scoring: ${JSON.stringify(scores)}`;
    if (confidence < 0.25) {
      return { domain: 'general', confidence, explanation: 'low keyword match; defaulting to general' };
    }
    return { domain: bestDomain, confidence, explanation };
  }

  async classifyEnsemble(text: string): Promise<DomainResult> {
    const primary = this.classify(text);
    if (!this.llmClient || !this.llmClient.classify) return primary;
    try {
      const llmResult = await this.llmClient.classify(text);
      const avgConfidence = (primary.confidence + llmResult.confidence) / 2;
      const domain = avgConfidence > 0.6 ? llmResult.domain : primary.domain;
      const explanation = `ensemble(primary:${primary.domain}:${primary.confidence}, llm:${llmResult.domain}:${llmResult.confidence})`;
      return { domain, confidence: avgConfidence, explanation };
    } catch (e) {
      return primary;
    }
  }
}