import fs from "fs";
import path from "path";
import {
  KeystrokeOracle,
  MIN_FIST_SCORE,
  type VoiceSession,
  type BiometricProof,
} from "./voice-moat/oracles/keystroke-fist";

export interface CovenantOptions {
  sessions?: VoiceSession[];
  minScore?: number;
  outputPath?: string;
}

export interface CovenantReport {
  agent_id: string;
  timestamp: string;
  status: "success" | "SYSTEM_DEGRADED";
  proofs: BiometricProof[];
}

const DEFAULT_AGENT_ID = "digital-fist-oracle";

export async function runCovenant(options: CovenantOptions = {}): Promise<CovenantReport> {
  const { sessions = buildSyntheticSessions(), minScore = MIN_FIST_SCORE, outputPath } = options;
  const proofs: BiometricProof[] = [];
  let degraded = false;

  for (const session of sessions) {
    const proof = await KeystrokeOracle.verify(session);
    proofs.push(proof);
    if (proof.score < minScore) {
      degraded = true;
    }
  }

  const report: CovenantReport = {
    agent_id: DEFAULT_AGENT_ID,
    timestamp: new Date().toISOString(),
    status: degraded ? "SYSTEM_DEGRADED" : "success",
    proofs,
  };

  if (outputPath) {
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  }

  return report;
}

function buildSyntheticSessions(): VoiceSession[] {
  return [
    {
      sessionId: `session-${Date.now()}`,
      agentId: DEFAULT_AGENT_ID,
      typingStream: Array.from({ length: 32 }, (_, idx) => ({
        deltaMs: 120 + idx * 2,
        pressure: 0.5,
      })),
      channel: "text",
      locale: "en-US",
    },
  ];
}

function parseCliArgs(argv: string[]) {
  const sessions: VoiceSession[] = [];
  let outputPath: string | undefined;
  let minScore = MIN_FIST_SCORE;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--session" && argv[i + 1]) {
      const sessionFile = argv[++i];
      sessions.push(readSessionFromFile(sessionFile));
    } else if (arg === "--out" && argv[i + 1]) {
      outputPath = argv[++i];
    } else if (arg === "--min-score" && argv[i + 1]) {
      minScore = Number(argv[++i]);
    }
  }

  return { sessions, outputPath, minScore };
}

function readSessionFromFile(filePath: string): VoiceSession {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const raw = fs.readFileSync(absolutePath, "utf-8");
  const parsed = JSON.parse(raw);
  if (!parsed.sessionId || !Array.isArray(parsed.typingStream)) {
    throw new Error(`Invalid session payload in ${filePath}`);
  }
  return parsed;
}

if (require.main === module) {
  (async () => {
    try {
      const { sessions, outputPath, minScore } = parseCliArgs(process.argv.slice(2));
      const report = await runCovenant({
        sessions: sessions.length ? sessions : undefined,
        minScore,
        outputPath: outputPath || "covenant-report.json",
      });

      const destination = outputPath || "covenant-report.json";
      if (!outputPath) {
        fs.writeFileSync(destination, JSON.stringify(report, null, 2));
      }

      if (report.status === "SYSTEM_DEGRADED") {
        console.error("\n\x1b[41m COVENANT BROKEN \x1b[0m");
        process.exit(1);
      } else {
        console.log("\n\x1b[42m COVENANT SEALED \x1b[0m");
      }
    } catch (error) {
      console.error("FATAL RUNNER ERROR", error);
      process.exit(1);
    }
  })();
}
