import { buildManifest } from "./manifest-builder";
import type { AgentOutput } from "./orchestrator";

const SAMPLE_CONTRACTS: AgentOutput[] = [
  {
    enhancement_area: "Instagram Product Launch",
    objective: "Launch new coffee blend targeting young professionals",
    implementation_plan: {
      modules: ["AudienceAnalyzer", "ContentGenerator", "ChannelPlanner"],
      architecture: "Event-driven services",
      estimated_effort: "3 weeks",
    },
    depends_on: ["Brand Voice Alignment"],
    sources: ["Instagram Insights", "Customer CRM"],
    governance: {
      security: "PII scrubbed at ingestion",
      compliance: "FTC social media guidelines",
      ethics: "Disclose sponsored content",
    },
    validation_criteria: "Engagement lift > 25%",
    confidence_score: 0.86,
  },
];

export async function sampleOrchestratorRun() {
  const manifest = buildManifest(SAMPLE_CONTRACTS);
  console.log("📦 Sample manifest generated:", JSON.stringify(manifest, null, 2));
  return manifest;
}
