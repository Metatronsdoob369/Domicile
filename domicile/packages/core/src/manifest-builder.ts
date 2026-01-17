import { storeAgentInPinecone, searchPineconeRecords } from "@domicile/data";
import {
  DOMICILE_AGENT_CODEX,
  inferCapabilitiesFromEnhancement,
  type CapabilityRef,
} from "./domicile-agent-codex";

type AgentContract = {
  enhancement_area: string;
  objective: string;
  implementation_plan?: {
    modules?: string[];
    architecture?: string;
  };
  depends_on?: string[];
  sources?: string[];
  governance?: Record<string, any>;
};

type DependencyGraph = {
  nodes: string[];
  edges: Array<{ from: string; to: string }>;
  build_order: string[];
};

export async function buildManifestWithPinecone(agents: AgentContract[]) {
  const accepted: AgentContract[] = [];

  for (const agent of agents) {
    const duplicateCheck = await validateAgainstExistingPinecone(agent);
    if (!duplicateCheck.isValid) {
      console.warn(`⚠️ Skipping ${agent.enhancement_area}: ${duplicateCheck.reason}`);
      continue;
    }

    accepted.push(agent);
    await storeAgentInPinecone(agent);
  }

  return {
    enhancements: accepted,
    roadmap: buildDependencyGraph(accepted),
  };
}

async function validateAgainstExistingPinecone(agent: AgentContract) {
  try {
    const results = await searchPineconeRecords(agent.objective || agent.enhancement_area);
    const duplicates = results.filter((match: any) => (match.score || 0) > 0.85);

    if (duplicates.length > 0) {
      return { isValid: false, reason: `Similar enhancement exists: ${duplicates[0].id}` };
    }

    const conflicts = results.filter((match: any) =>
      Array.isArray(match.metadata?.depends_on) &&
      match.metadata.depends_on.includes(agent.enhancement_area)
    );

    if (conflicts.length > 0) {
      return { isValid: false, reason: `Dependency conflict with ${conflicts[0].id}` };
    }

    return { isValid: true };
  } catch (error) {
    console.warn("⚠️ Pinecone validation failed, proceeding:", error);
    return { isValid: true };
  }
}

export function buildDependencyGraph(agents: AgentContract[]): DependencyGraph {
  const graph = new Map<string, string[]>();
  const inDegree = new Map<string, number>();

  for (const agent of agents) {
    graph.set(agent.enhancement_area, agent.depends_on || []);
    inDegree.set(agent.enhancement_area, 0);
  }

  for (const [node, deps] of graph) {
    for (const dep of deps) {
      if (graph.has(dep)) {
        inDegree.set(node, (inDegree.get(node) || 0) + 1);
      }
    }
  }

  const queue = Array.from(inDegree.entries())
    .filter(([, degree]) => degree === 0)
    .map(([name]) => name);
  const buildOrder: string[] = [];
  const edges: Array<{ from: string; to: string }> = [];

  for (const [to, deps] of graph) {
    for (const from of deps) {
      if (graph.has(from)) {
        edges.push({ from, to });
      }
    }
  }

  while (queue.length) {
    const node = queue.shift()!;
    buildOrder.push(node);

    for (const [target, deps] of graph) {
      if (deps.includes(node)) {
        const newDegree = (inDegree.get(target) || 0) - 1;
        inDegree.set(target, newDegree);
        if (newDegree === 0) {
          queue.push(target);
        }
      }
    }
  }

  if (buildOrder.length !== agents.length) {
    throw new Error(
      `Circular dependency detected. Offending nodes: ${agents
        .filter((agent) => !buildOrder.includes(agent.enhancement_area))
        .map((agent) => agent.enhancement_area)
        .join(", ")}`
    );
  }

  return {
    nodes: agents.map((agent) => agent.enhancement_area),
    edges,
    build_order: buildOrder,
  };
}

export function buildManifest(agents: AgentContract[]) {
  return {
    enhancements: agents,
    roadmap: buildDependencyGraph(agents),
    capabilities: enrichCapabilities(agents),
  };
}

function enrichCapabilities(agents: AgentContract[]): CapabilityRef[] {
  const capabilities: CapabilityRef[] = [];
  for (const agent of agents) {
    capabilities.push(...inferCapabilitiesFromEnhancement(agent));
  }
  return capabilities;
}

export const AGENT_CODEX = DOMICILE_AGENT_CODEX;
