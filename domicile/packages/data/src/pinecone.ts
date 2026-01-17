import crypto from "crypto";
import { Pinecone } from "@pinecone-database/pinecone";
import type {
  Index,
  PineconeRecord,
  ScoredPineconeRecord,
  RecordMetadata,
} from "@pinecone-database/pinecone";

export interface PineconeAgentRecord {
  enhancement_area: string;
  objective: string;
  implementation_plan?: {
    modules?: string[];
    architecture?: string;
  };
  depends_on?: string[];
  sources?: string[];
  governance?: Record<string, unknown>;
}

export interface PineconeAgentMetadata extends RecordMetadata {
  objective: string;
  enhancement_area: string;
  depends_on: string[];
  sources: string[];
  implementation_plan_json: string;
  governance_json: string;
  stored_at: string;
  fingerprint: string;
}

type AgentRecord = PineconeRecord<PineconeAgentMetadata>;
type AgentMatch = ScoredPineconeRecord<PineconeAgentMetadata>;

const DEFAULT_INDEX = "domicile-agents";
const DEFAULT_NAMESPACE = "domicile";
const VECTOR_DIMENSIONS = 24;

let pineconeClient: Pinecone | null = null;
let pineconeIndex: Index<PineconeAgentMetadata> | null = null;
let namespaceName = DEFAULT_NAMESPACE;

const fallbackRecords: AgentRecord[] = [];

export function initializePinecone(
  apiKey: string,
  options?: { indexName?: string; namespace?: string }
): void {
  if (!apiKey) {
    throw new Error("Pinecone API key is required to initialize the client");
  }

  pineconeClient = new Pinecone({ apiKey });
  const indexName =
    options?.indexName || process.env.PINECONE_INDEX || DEFAULT_INDEX;
  namespaceName =
    options?.namespace || process.env.PINECONE_NAMESPACE || DEFAULT_NAMESPACE;

  pineconeIndex = pineconeClient.index<PineconeAgentMetadata>(indexName);
}

export function isPineconeReady(): boolean {
  return Boolean(pineconeClient && pineconeIndex);
}

export async function storeAgentInPinecone(
  agent: PineconeAgentRecord
): Promise<AgentRecord> {
  const payload = normalizeAgent(agent);
  const record = buildRecord(payload);

  const namespaceClient = getNamespaceClient();
  if (!namespaceClient) {
    fallbackRecords.push(record);
    return record;
  }

  await namespaceClient.upsert([record]);
  return record;
}

export async function searchPineconeRecords(
  query: string,
  options?: { topK?: number }
): Promise<AgentMatch[]> {
  const text = (query || "").trim();
  const vector = encodeText(text);
  const topK = options?.topK ?? 5;
  const namespaceClient = getNamespaceClient();

  if (!namespaceClient) {
    return fallbackRecords
      .map<AgentMatch>((record) => ({
        id: record.id,
        score: cosineSimilarity(vector, record.values),
        values: record.values,
        metadata: record.metadata,
      }))
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
      .slice(0, topK);
  }

  const response = await namespaceClient.query({
    vector,
    topK,
    includeMetadata: true,
  });

  return response.matches ?? [];
}

function getNamespaceClient() {
  if (!pineconeIndex) {
    return null;
  }
  return namespaceName ? pineconeIndex.namespace(namespaceName) : pineconeIndex;
}

function normalizeAgent(agent: PineconeAgentRecord): PineconeAgentRecord {
  return {
    enhancement_area: agent.enhancement_area.trim(),
    objective: agent.objective.trim(),
    implementation_plan: agent.implementation_plan,
    depends_on: agent.depends_on ?? [],
    sources: agent.sources ?? [],
    governance: agent.governance ?? {},
  };
}

function buildRecord(agent: PineconeAgentRecord): AgentRecord {
  const fingerprint = crypto
    .createHash("sha1")
    .update(`${agent.enhancement_area}_${agent.objective}`)
    .digest("hex");

  return {
    id: fingerprint,
    values: encodeText(serializeAgent(agent)),
    metadata: {
      enhancement_area: agent.enhancement_area,
      objective: agent.objective,
      depends_on: agent.depends_on ?? [],
      sources: agent.sources ?? [],
      implementation_plan_json: agent.implementation_plan
        ? JSON.stringify(agent.implementation_plan)
        : "",
      governance_json: agent.governance ? JSON.stringify(agent.governance) : "",
      stored_at: new Date().toISOString(),
      fingerprint,
    },
  };
}

function serializeAgent(agent: PineconeAgentRecord): string {
  const segments = [
    agent.enhancement_area,
    agent.objective,
    agent.implementation_plan?.architecture ?? "",
    ...(agent.implementation_plan?.modules ?? []),
    ...(agent.depends_on ?? []),
    ...(agent.sources ?? []),
  ];
  return segments.join(" | ");
}

function encodeText(text: string): number[] {
  const vector = new Array<number>(VECTOR_DIMENSIONS).fill(0);
  if (!text) {
    return vector;
  }

  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    vector[i % VECTOR_DIMENSIONS] += code / 255;
  }

  const norm = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
  return norm === 0 ? vector : vector.map((value) => value / norm);
}

function cosineSimilarity(a: number[], b: number[] = []): number {
  if (!a.length || !b.length) {
    return 0;
  }

  const length = Math.min(a.length, b.length);
  let dot = 0;
  let magA = 0;
  let magB = 0;

  for (let i = 0; i < length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }

  if (magA === 0 || magB === 0) {
    return 0;
  }

  return dot / Math.sqrt(magA * magB);
}
