import type { PineconeRecord, ScoredPineconeRecord, RecordMetadata } from "@pinecone-database/pinecone";
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
    depends_on?: string[];
    sources?: string[];
    implementation_plan?: {
        modules?: string[];
        architecture?: string;
    };
    governance?: Record<string, unknown>;
    stored_at: string;
    fingerprint: string;
}
type AgentRecord = PineconeRecord<PineconeAgentMetadata>;
type AgentMatch = ScoredPineconeRecord<PineconeAgentMetadata>;
export declare function initializePinecone(apiKey: string, options?: {
    indexName?: string;
    namespace?: string;
}): void;
export declare function isPineconeReady(): boolean;
export declare function storeAgentInPinecone(agent: PineconeAgentRecord): Promise<AgentRecord>;
export declare function searchPineconeRecords(query: string, options?: {
    topK?: number;
}): Promise<AgentMatch[]>;
export {};
//# sourceMappingURL=pinecone.d.ts.map