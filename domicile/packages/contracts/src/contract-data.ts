import complianceRuleSchema from "../data/v1/ComplianceRule.json";
import influencerNodeSchema from "../data/v1/InfluencerNode.json";
import metricDefinitionSchema from "../data/v1/MetricDef.json";
import rateLimitSchema from "../data/v1/RateLimit.json";
import trendSignalSchema from "../data/v1/TrendSignal.json";

type JsonSchemaDocument = Record<string, unknown>;

const CONTRACT_SCHEMA_CATALOG = {
  complianceRule: complianceRuleSchema as JsonSchemaDocument,
  influencerNode: influencerNodeSchema as JsonSchemaDocument,
  metricDefinition: metricDefinitionSchema as JsonSchemaDocument,
  rateLimit: rateLimitSchema as JsonSchemaDocument,
  trendSignal: trendSignalSchema as JsonSchemaDocument,
} as const;

export type ContractSchemaId = keyof typeof CONTRACT_SCHEMA_CATALOG;

export const AVAILABLE_CONTRACT_SCHEMAS: ReadonlyArray<{
  id: ContractSchemaId;
  title: string;
}> = [
  { id: "complianceRule", title: "Compliance Rule v1" },
  { id: "influencerNode", title: "Influencer Node v1" },
  { id: "metricDefinition", title: "Metric Definition v1" },
  { id: "rateLimit", title: "Rate Limit v1" },
  { id: "trendSignal", title: "Trend Signal v1" },
];

export function getContractSchema(id: ContractSchemaId): JsonSchemaDocument {
  return CONTRACT_SCHEMA_CATALOG[id];
}

export function listContractSchemas(): ContractSchemaId[] {
  return Object.keys(CONTRACT_SCHEMA_CATALOG) as ContractSchemaId[];
}
