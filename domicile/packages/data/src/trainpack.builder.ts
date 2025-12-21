// trainpack.builder.ts - Export social knowledge for fine-tuning
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import type { SourceRef, PlatformId } from "./knowledge.types";

// QA Entry for fine-tuning
type QAEntry = {
  id: string;
  instruction: string;          // e.g., "List Twitter engagement metrics with formulas."
  input?: Record<string, unknown>;
  output: Record<string, unknown>;
  citations: SourceRef[];
  platform_scope?: PlatformId[];
  updated_at: string;
  version: string;
};

export class TrainPackBuilder {
  private qaEntries: QAEntry[] = [];

  // Add a QA pair from knowledge data
  addQA(
    id: string,
    instruction: string,
    output: Record<string, unknown>,
    citations: SourceRef[],
    input?: Record<string, unknown>,
    platformScope?: PlatformId[]
  ): void {
    this.qaEntries.push({
      id,
      instruction,
      input,
      output,
      citations,
      platform_scope: platformScope,
      updated_at: new Date().toISOString(),
      version: "1.0.0"
    });
  }

  // Build from knowledge sources (placeholder - would query actual data)
  async buildFromKnowledge(): Promise<void> {
    // TODO: Query actual knowledge base and generate QAs
    console.log("🏗️ Building train-pack from knowledge base...");

    // Example entries - replace with real data extraction
    this.addQA(
      "twitter-engagement-metrics",
      "What are Twitter's key engagement metrics and how are they calculated?",
      {
        metrics: [
          {
            name: "engagement_rate",
            formula: "(likes + replies + retweets + quotes) / impressions * 100",
            description: "Percentage of users who interact with the tweet"
          }
        ]
      },
      [
        {
          id: "sproutsocial-2025",
          title: "Social Media Metrics to Track in 2025",
          url: "https://sproutsocial.com/insights/social-media-metrics/",
          retrieved_at: new Date().toISOString()
        }
      ],
      undefined,
      ["twitter"]
    );

    this.addQA(
      "cross-platform-attribution",
      "How should engagement on one platform be attributed to campaigns on others?",
      {
        methods: ["time-based", "rule-based", "algorithmic"],
        challenges: ["data_silos", "attribution_windows", "privacy_regulations"]
      },
      [
        {
          id: "arxiv-sociohub-2023",
          title: "SocioHub: Interactive Tool for Cross-Platform Social Media Data",
          url: "https://arxiv.org/pdf/2309.06525.pdf",
          retrieved_at: new Date().toISOString()
        }
      ],
      undefined,
      ["twitter", "instagram", "facebook"]
    );
  }

  // Export to JSONL file
  export(filename: string = "trainpacks/social_knowledge.latest.jsonl"): void {
    const outputPath = join(process.cwd(), filename);
    const jsonlContent = this.qaEntries
      .map(entry => JSON.stringify(entry))
      .join("\n");

    writeFileSync(outputPath, jsonlContent, "utf8");
    console.log(`💾 Exported ${this.qaEntries.length} QA pairs to ${outputPath}`);
  }

  // Validate the train-pack
  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    for (const entry of this.qaEntries) {
      if (!entry.id || !entry.instruction || !entry.output) {
        errors.push(`Entry ${entry.id}: Missing required fields`);
      }
      if (!entry.citations || entry.citations.length === 0) {
        errors.push(`Entry ${entry.id}: No citations provided`);
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

// CLI interface
async function main() {
  const builder = new TrainPackBuilder();

  try {
    await builder.buildFromKnowledge();

    const validation = builder.validate();
    if (!validation.valid) {
      console.error("❌ Train-pack validation failed:");
      validation.errors.forEach(error => console.error(`  ${error}`));
      process.exit(1);
    }

    builder.export();
    console.log("✅ Train-pack built and validated successfully!");
  } catch (error) {
    console.error("❌ Train-pack build failed:", error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}
