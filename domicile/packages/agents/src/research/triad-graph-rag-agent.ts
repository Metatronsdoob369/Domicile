import path from "path";
import { spawn } from "child_process";
import {
  BaseDomainAgent,
  type AgentContract,
  type DomainAgentCapabilities,
  type EnhancementArea,
} from "../core/base-domain-agent";

type TriadWorkflowResult = {
  workflow?: {
    phases?: string[];
  };
  summary?: string;
  sources?: string[];
  reasoning_trace?: string[];
  modules?: string[];
  architecture?: string;
};

export class TriadGraphRAGDomainAgent extends BaseDomainAgent {
  private readonly pythonExecutable: string;
  private readonly scriptPath: string;

  constructor(options?: { pythonExecutable?: string; scriptPath?: string }) {
    super("research-analysis");
    this.pythonExecutable = options?.pythonExecutable ?? "python3";
    this.scriptPath =
      options?.scriptPath ?? path.resolve(process.cwd(), "agents/triad_v12.py");
  }

  protected initializeCapabilities(): DomainAgentCapabilities {
    return {
      domain: "research-analysis",
      capabilities: [
        "knowledge_graph_building",
        "multi_hop_reasoning",
        "hypothesis_generation",
        "explainable_reports",
      ],
      supported_tasks: [
        "Deep research synthesis",
        "Complex dependency mapping",
        "Entity relationship analysis",
      ],
      trust_score: 0.84,
      performance_metrics: {
        success_rate: 0.9,
        average_response_time: 8000,
        total_invocations: 0,
      },
    };
  }

  canHandle(area: EnhancementArea): boolean {
    const haystack = `${area.name} ${area.objective} ${area.key_requirements.join(" ")}`.toLowerCase();
    const keywords = ["research", "investigate", "graph", "multi-hop", "analysis", "pattern"];
    return keywords.some((keyword) => haystack.includes(keyword));
  }

  async generateContract(area: EnhancementArea): Promise<AgentContract> {
    try {
      const triadResult = await this.callTriadRag(area);
      return this.formatAsContract(area, {
        modules: triadResult.modules ?? ["Graph Construction", "Reasoning", "Synthesis"],
        architecture: triadResult.architecture ?? triadResult.summary ?? "Graph RAG workflow",
        sources: triadResult.sources ?? [],
        security: "Reads-only knowledge bases",
        compliance: "Research governance enforced",
        ethics: "Cites all reasoning chains",
        validation_criteria: "Reasoning trace verified + hypotheses confirmed",
        confidence: 0.85,
        reasoning_trace: triadResult.reasoning_trace ?? [],
      });
    } catch (error) {
      return this.formatAsContract(area, {
        modules: ["Manual Research Plan"],
        architecture: "Fallback research blueprint",
        sources: [],
        security: "Standard research sandbox",
        compliance: "Manual review required",
        ethics: "Escalate to human researcher",
        validation_criteria: "Manual validation pending",
        confidence: 0.6,
        reasoning_trace: [`Fallback invoked: ${(error as Error).message}`],
      });
    }
  }

  private async callTriadRag(area: EnhancementArea): Promise<TriadWorkflowResult> {
    return new Promise((resolve, reject) => {
      const args = [
        this.scriptPath,
        "--goal",
        area.objective,
        "--domain",
        area.domain ?? "general",
        "--priority",
        "5",
        "--json-output",
      ];

      const child = spawn(this.pythonExecutable, args, {
        cwd: process.cwd(),
        stdio: ["ignore", "pipe", "pipe"],
      });

      let stdout = "";
      let stderr = "";

      child.stdout.on("data", (data) => {
        stdout += data.toString();
      });

      child.stderr.on("data", (data) => {
        stderr += data.toString();
      });

      child.on("close", (code) => {
        if (code === 0) {
          try {
            resolve(JSON.parse(stdout));
          } catch (parseError) {
            reject(new Error(`Invalid TriadRAG output: ${(parseError as Error).message}`));
          }
        } else {
          reject(new Error(`TriadRAG exited with code ${code}: ${stderr}`));
        }
      });

      child.on("error", (err) => {
        reject(new Error(`Unable to start TriadRAG process: ${err.message}`));
      });

      setTimeout(() => child.kill(), 300_000);
    });
  }
}
