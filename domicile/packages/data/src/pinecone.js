"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializePinecone = initializePinecone;
exports.isPineconeReady = isPineconeReady;
exports.storeAgentInPinecone = storeAgentInPinecone;
exports.searchPineconeRecords = searchPineconeRecords;
const crypto_1 = __importDefault(require("crypto"));
const pinecone_1 = require("@pinecone-database/pinecone");
const DEFAULT_INDEX = "domicile-agents";
const DEFAULT_NAMESPACE = "domicile";
const VECTOR_DIMENSIONS = 24;
let pineconeClient = null;
let pineconeIndex = null;
let namespaceName = DEFAULT_NAMESPACE;
const fallbackRecords = [];
function initializePinecone(apiKey, options) {
    if (!apiKey) {
        throw new Error("Pinecone API key is required to initialize the client");
    }
    pineconeClient = new pinecone_1.Pinecone({ apiKey });
    const indexName = options?.indexName || process.env.PINECONE_INDEX || DEFAULT_INDEX;
    namespaceName =
        options?.namespace || process.env.PINECONE_NAMESPACE || DEFAULT_NAMESPACE;
    pineconeIndex = pineconeClient.index(indexName);
}
function isPineconeReady() {
    return Boolean(pineconeClient && pineconeIndex);
}
async function storeAgentInPinecone(agent) {
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
async function searchPineconeRecords(query, options) {
    const text = (query || "").trim();
    const vector = encodeText(text);
    const topK = options?.topK ?? 5;
    const namespaceClient = getNamespaceClient();
    if (!namespaceClient) {
        return fallbackRecords
            .map((record) => ({
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
function normalizeAgent(agent) {
    return {
        enhancement_area: agent.enhancement_area.trim(),
        objective: agent.objective.trim(),
        implementation_plan: agent.implementation_plan,
        depends_on: agent.depends_on ?? [],
        sources: agent.sources ?? [],
        governance: agent.governance ?? {},
    };
}
function buildRecord(agent) {
    const fingerprint = crypto_1.default
        .createHash("sha1")
        .update(`${agent.enhancement_area}_${agent.objective}`)
        .digest("hex");
    return {
        id: fingerprint,
        values: encodeText(serializeAgent(agent)),
        metadata: {
            ...agent,
            stored_at: new Date().toISOString(),
            fingerprint,
        },
    };
}
function serializeAgent(agent) {
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
function encodeText(text) {
    const vector = new Array(VECTOR_DIMENSIONS).fill(0);
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
function cosineSimilarity(a, b = []) {
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
//# sourceMappingURL=pinecone.js.map