#!/usr/bin/env bun
/**
 * Clay Consigliere Router
 * ======================
 * LLM-based intent detection → MCP tool invocation
 * Context-aware (manifest domain/requires_approval)
 * Fallback to keyword matching
 *
 * Persona ID: 18895da3
 */

import Anthropic from '@anthropic-ai/sdk';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { execSync } from 'child_process';

// Types
interface SkillManifest {
  skill: string;
  version: string;
  domain: string;
  dependencies: string[];
  mcp_server: string;
  entry_point: string;
  requires_approval: string[];
  clay_i_validated: boolean;
  covenant: string;
}

interface RoutingDecision {
  skill: string;
  entry_point: string;
  command: string;
  requires_approval: boolean;
  confidence: number;
  reasoning: string;
}

interface SkillRegistry {
  [skillName: string]: SkillManifest;
}

// Configuration
const SKILLS_DIR = process.env.SKILLS_DIR || '/home/mcp-agent/Skills';
const CLAY_PERSONA_ID = '18895da3';

// Clay Router
export class ClayRouter {
  private client: Anthropic;
  private registry: SkillRegistry = {};

  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || '',
    });
  }

  /**
   * Load all skill manifests from Skills directory
   */
  async loadRegistry(): Promise<void> {
    const skills = await readdir(SKILLS_DIR);

    for (const skillDir of skills) {
      try {
        const manifestPath = join(SKILLS_DIR, skillDir, 'MANIFEST.json');
        const content = await readFile(manifestPath, 'utf-8');
        const manifest: SkillManifest = JSON.parse(content);
        this.registry[manifest.skill] = manifest;
      } catch (e) {
        console.error(`⚠️  Failed to load manifest for ${skillDir}:`, e);
      }
    }

    console.log(`✅ Loaded ${Object.keys(this.registry).length} skills`);
  }

  /**
   * Route user request to appropriate skill
   * Phase 1: LLM-based intent detection
   * Phase 2: Keyword fallback
   */
  async route(userRequest: string, _userId?: string): Promise<RoutingDecision> {
    console.log(`[Clay] Routing: "${userRequest}"`);

    // Phase 1: LLM-based intent detection
    try {
      const llmDecision = await this.llmRoute(userRequest);
      if (llmDecision.confidence > 0.7) {
        console.log(
          `[Clay] LLM routing (confidence: ${llmDecision.confidence})`,
        );
        return llmDecision;
      }
    } catch (e) {
      console.warn('[Clay] LLM routing failed, falling back to keywords:', e);
    }

    // Phase 2: Keyword fallback
    const keywordDecision = this.keywordRoute(userRequest);
    console.log(
      `[Clay] Keyword routing (confidence: ${keywordDecision.confidence})`,
    );
    return keywordDecision;
  }

  /**
   * LLM-based intent detection using Claude
   */
  private async llmRoute(userRequest: string): Promise<RoutingDecision> {
    // Build context of available skills
    const skillsContext = Object.entries(this.registry)
      .map(([name, manifest]) => {
        return `- ${name}: ${manifest.domain} (requires_approval: ${manifest.requires_approval.join(', ') || 'none'})`;
      })
      .join('\n');

    const systemPrompt = `You are Clay, the Consigliere router for the Domicile Skills ecosystem.

Your job: Analyze user requests and route them to the appropriate skill.

Available Skills:
${skillsContext}

Routing Rules:
1. Match request intent to skill domain (e.g., "payroll" → domicile-governance)
2. Check if action requires approval (ARM mode: writes need explicit user OK)
3. Return confidence score (0.0-1.0)
4. If unsure, ask for clarification (confidence < 0.5)

Respond with JSON:
{
  "skill": "skill-name",
  "command_suffix": "scan" or "process" etc (from user request),
  "requires_approval": true/false,
  "confidence": 0.0-1.0,
  "reasoning": "why you chose this skill"
}`;

    const response = await this.client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 500,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userRequest,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Expected text response from Claude');
    }

    // Parse Claude's JSON response
    const parsed = JSON.parse(content.text);
    const skill = this.registry[parsed.skill];

    if (!skill) {
      throw new Error(`Unknown skill: ${parsed.skill}`);
    }

    return {
      skill: parsed.skill,
      entry_point: skill.entry_point,
      command: `${skill.entry_point} ${parsed.command_suffix || ''}`.trim(),
      requires_approval: parsed.requires_approval || false,
      confidence: parsed.confidence,
      reasoning: parsed.reasoning,
    };
  }

  /**
   * Keyword-based fallback routing
   */
  private keywordRoute(userRequest: string): RoutingDecision {
    const lower = userRequest.toLowerCase();

    // Keyword patterns
    const patterns: Array<[RegExp, string, string]> = [
      // [pattern, skill, command_suffix]
      [/(payroll|bamboo|hr|process.*pdf)/i, 'domicile-governance', 'scan'],
      [/(voice|speak|tts|synthesize)/i, 'personaplex-7b', 'synthesize'],
      [/(memory|remember|recall|memvid)/i, 'memvid', 'query'],
      [/(ui|canvas|design|pencil)/i, 'pencil-expert', 'generate'],
      [/(workflow|automation|intercom)/i, 'intercom-agent', 'trigger'],
      [/(audit|validate|check.*compliance)/i, 'domicile-governance', 'audit'],
    ];

    for (const [pattern, skillName, commandSuffix] of patterns) {
      if (pattern.test(lower)) {
        const skill = this.registry[skillName];
        if (!skill) continue;

        return {
          skill: skillName,
          entry_point: skill.entry_point,
          command: `${skill.entry_point} ${commandSuffix}`.trim(),
          requires_approval: skill.requires_approval.length > 0,
          confidence: 0.6, // Lower confidence for keyword matching
          reasoning: `Keyword match: "${pattern}" → ${skillName}`,
        };
      }
    }

    // No match - return help request
    return {
      skill: 'clay-consigliere',
      entry_point: 'scripts/help.ts',
      command: 'scripts/help.ts',
      requires_approval: false,
      confidence: 0.3,
      reasoning: 'No clear match - showing available skills',
    };
  }

  /**
   * Execute routing decision
   */
  async execute(
    decision: RoutingDecision,
    approve: boolean = false,
  ): Promise<string> {
    console.log(`\n[Clay] Executing: ${decision.skill}`);
    console.log(`[Clay] Command: ${decision.command}`);
    console.log(`[Clay] Reasoning: ${decision.reasoning}\n`);

    // Check approval requirement
    if (decision.requires_approval && !approve) {
      return `⚠️  This action requires approval. Run with --approve flag to proceed.

Skill: ${decision.skill}
Action: ${decision.command}
Reason: ${decision.reasoning}

To approve: clay --approve "${decision.command}"`;
    }

    // Execute skill entry point
    const skillDir = join(SKILLS_DIR, decision.skill);
    const fullCommand = `cd ${skillDir} && ${decision.command}`;

    try {
      const output = execSync(fullCommand, {
        encoding: 'utf-8',
        env: {
          ...process.env,
          CLAY_PERSONA_ID,
          CLAY_APPROVED: approve ? 'true' : 'false',
        },
      });

      return output;
    } catch (e: any) {
      throw new Error(`Execution failed: ${e.message}\n${e.stdout || ''}`);
    }
  }
}

// CLI Interface
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
Clay Consigliere Router
=======================
Usage: bun run router.ts [--approve] "<user request>"

Examples:
  bun run router.ts "Process payroll PDFs"
  bun run router.ts "Voice this text: Hello world"
  bun run router.ts --approve "Audit payroll compliance"

Flags:
  --approve    Auto-approve actions requiring ARM mode
  --dry-run    Show routing decision without executing
    `);
    process.exit(0);
  }

  const approve = args.includes('--approve');
  const dryRun = args.includes('--dry-run');
  const userRequest = args.filter((a) => !a.startsWith('--')).join(' ');

  const router = new ClayRouter();
  await router.loadRegistry();

  const decision = await router.route(userRequest);

  if (dryRun) {
    console.log('\n📋 Routing Decision (Dry Run):');
    console.log(JSON.stringify(decision, null, 2));
    process.exit(0);
  }

  const output = await router.execute(decision, approve);
  console.log('\n✅ Execution Complete:');
  console.log(output);
}

// Run if called directly
if (import.meta.main) {
  main().catch((e) => {
    console.error('❌ Error:', e.message);
    process.exit(1);
  });
}
