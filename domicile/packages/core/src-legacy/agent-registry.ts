// src/orchestration/agent-registry.ts
export type AgentMeta = {
  agentId: string;
  domains: string[];          // e.g.,
  capabilities: string[];     // e.g.,
  version: string;
  trustScore: number;         // 0..1
  preferred?: boolean;        // advisory only
  owner?: string;             // who published it
  lastUpdated?: string;
};

export class AgentRegistry {
  private map = new Map<string, AgentMeta>();

  register(meta: AgentMeta) {
    if (!meta || !meta.agentId) throw new Error('agentId required');
    this.map.set(meta.agentId, { ...meta, lastUpdated: new Date().toISOString() });
  }

  unregister(agentId: string) {
    this.map.delete(agentId);
  }

  get(agentId: string): AgentMeta | undefined {
    return this.map.get(agentId);
  }

  listAll(): AgentMeta[] {
    return Array.from(this.map.values());
  }

  listByDomain(domain: string): AgentMeta[] {
    return this.listAll().filter(m => m.domains.includes(domain));
  }

  setTrustScore(agentId: string, trustScore: number) {
    const s = this.map.get(agentId);
    if (!s) throw new Error('agent not found');
    s.trustScore = Math.max(0, Math.min(1, trustScore));
    s.lastUpdated = new Date().toISOString();
    this.map.set(agentId, s);
  }
}