#!/usr/bin/env bun
/**
 * TARS/memvid Integration
 * ========================
 * Connects TARS learning cycles with memvid single-file RAG
 *
 * Flow:
 * 1. TARS training cycle completes
 * 2. Scrub memories/*.mv2 for relevant knowledge
 * 3. Load on-demand (not all at once)
 * 4. Feed to TARS dream cycle
 *
 * File Format: .mv2 (markdown + embedded KG/vectors)
 */

import { readdir, readFile, stat } from 'fs/promises';
import { join } from 'path';

// Types
interface MemoryFile {
  path: string;
  filename: string;
  domain: string;
  size: number;
  modified: Date;
}

interface MemoryContent {
  markdown: string;
  vectors?: number[][];
  knowledge_graph?: Record<string, any>;
  metadata: {
    domain: string;
    created: string;
    tags: string[];
  };
}

interface TARSQuery {
  domain?: string;
  tags?: string[];
  after?: Date;
  limit?: number;
}

// Configuration
const MEMVID_DIR =
  process.env.MEMVID_DIR || '/home/mcp-agent/Skills/memvid/memories';
const TARS_CONTEXT_LIMIT = 10; // Max memories to load per cycle

export class TARSMemoryConnector {
  /**
   * Scan memories directory for .mv2 files
   */
  async scanMemories(): Promise<MemoryFile[]> {
    const files = await readdir(MEMVID_DIR);
    const mv2Files = files.filter((f) => f.endsWith('.mv2'));

    const memories: MemoryFile[] = [];

    for (const filename of mv2Files) {
      const path = join(MEMVID_DIR, filename);
      const stats = await stat(path);

      // Extract domain from filename (e.g., oms-payroll.mv2 → payroll)
      const domain = filename.replace('.mv2', '').split('-').pop() || 'general';

      memories.push({
        path,
        filename,
        domain,
        size: stats.size,
        modified: stats.mtime,
      });
    }

    return memories.sort((a, b) => b.modified.getTime() - a.modified.getTime());
  }

  /**
   * Load specific memory file
   */
  async loadMemory(path: string): Promise<MemoryContent> {
    const raw = await readFile(path, 'utf-8');

    // Parse .mv2 format (markdown + embedded JSON)
    const lines = raw.split('\n');
    let markdown = '';
    let jsonBlock = '';
    let inJsonBlock = false;

    for (const line of lines) {
      if (line.trim() === '```json:memory') {
        inJsonBlock = true;
        continue;
      }
      if (line.trim() === '```' && inJsonBlock) {
        inJsonBlock = false;
        continue;
      }

      if (inJsonBlock) {
        jsonBlock += line + '\n';
      } else {
        markdown += line + '\n';
      }
    }

    // Parse embedded metadata
    const embedded = jsonBlock ? JSON.parse(jsonBlock) : {};

    return {
      markdown: markdown.trim(),
      vectors: embedded.vectors,
      knowledge_graph: embedded.knowledge_graph,
      metadata: embedded.metadata || {
        domain: 'general',
        created: new Date().toISOString(),
        tags: [],
      },
    };
  }

  /**
   * Query memories for TARS consumption
   */
  async queryForTARS(query: TARSQuery = {}): Promise<MemoryContent[]> {
    const allMemories = await this.scanMemories();

    // Filter by domain
    let filtered = allMemories;
    if (query.domain) {
      filtered = filtered.filter((m) => m.domain === query.domain);
    }

    // Filter by date
    if (query.after) {
      filtered = filtered.filter((m) => m.modified > query.after);
    }

    // Limit results
    const limit = query.limit || TARS_CONTEXT_LIMIT;
    const selected = filtered.slice(0, limit);

    // Load selected memories
    const loaded: MemoryContent[] = [];
    for (const mem of selected) {
      try {
        const content = await this.loadMemory(mem.path);
        loaded.push(content);
      } catch (e) {
        console.warn(`⚠️  Failed to load ${mem.filename}:`, e);
      }
    }

    return loaded;
  }

  /**
   * Feed memories to TARS dream cycle
   * Returns context string for TARS training
   */
  async feedTARSDream(domain?: string): Promise<string> {
    console.log(
      `[TARS/memvid] Loading memories for domain: ${domain || 'all'}`,
    );

    const memories = await this.queryForTARS({
      domain,
      limit: TARS_CONTEXT_LIMIT,
    });

    if (memories.length === 0) {
      return '# No relevant memories found\n';
    }

    // Build context string for TARS
    let context = `# TARS Memory Context (${memories.length} memories)\n\n`;

    for (const mem of memories) {
      context += `## ${mem.metadata.domain} [${mem.metadata.created}]\n`;
      context += `Tags: ${mem.metadata.tags.join(', ')}\n\n`;
      context += mem.markdown;
      context += '\n\n---\n\n';
    }

    console.log(
      `[TARS/memvid] Loaded ${memories.length} memories (${context.length} chars)`,
    );
    return context;
  }

  /**
   * Scrub memories for specific knowledge
   * Example: Find all payroll-related knowledge
   */
  async scrubForKnowledge(tags: string[]): Promise<Map<string, MemoryContent>> {
    const allMemories = await this.scanMemories();
    const results = new Map<string, MemoryContent>();

    for (const mem of allMemories) {
      const content = await this.loadMemory(mem.path);

      // Check if any tags match
      const hasMatchingTag = tags.some((tag) =>
        content.metadata.tags.includes(tag),
      );

      if (hasMatchingTag) {
        results.set(mem.filename, content);
      }
    }

    return results;
  }
}

// CLI Interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  const connector = new TARSMemoryConnector();

  switch (command) {
    case 'scan': {
      const memories = await connector.scanMemories();
      console.log(`Found ${memories.length} memory files:\n`);
      for (const mem of memories) {
        console.log(`  ${mem.filename} (${mem.domain}) - ${mem.size} bytes`);
      }
      break;
    }

    case 'feed': {
      const domain = args[1];
      const context = await connector.feedTARSDream(domain);
      console.log(context);
      break;
    }

    case 'scrub': {
      const tags = args.slice(1);
      if (tags.length === 0) {
        console.error('Usage: tars-connector.ts scrub <tag1> <tag2> ...');
        process.exit(1);
      }
      const results = await connector.scrubForKnowledge(tags);
      console.log(
        `Found ${results.size} memories matching tags: ${tags.join(', ')}\n`,
      );
      for (const [filename, content] of results) {
        console.log(`\n=== ${filename} ===`);
        console.log(content.markdown.substring(0, 200) + '...');
      }
      break;
    }

    case 'load': {
      const filename = args[1];
      if (!filename) {
        console.error('Usage: tars-connector.ts load <filename.mv2>');
        process.exit(1);
      }
      const path = join(MEMVID_DIR, filename);
      const content = await connector.loadMemory(path);
      console.log('=== Markdown ===');
      console.log(content.markdown);
      console.log('\n=== Metadata ===');
      console.log(JSON.stringify(content.metadata, null, 2));
      break;
    }

    default:
      console.log(`
TARS/memvid Connector
=====================
Usage: bun run tars-connector.ts <command> [args]

Commands:
  scan                    List all .mv2 memory files
  feed [domain]           Generate TARS context from memories
  scrub <tag> [tag2...]   Find memories matching tags
  load <filename.mv2>     Load and display specific memory

Examples:
  bun run tars-connector.ts scan
  bun run tars-connector.ts feed payroll
  bun run tars-connector.ts scrub bamboohr compliance
  bun run tars-connector.ts load oms-payroll.mv2

Environment:
  MEMVID_DIR    Path to memories directory (default: /home/mcp-agent/Skills/memvid/memories)
      `);
  }
}

if (import.meta.main) {
  main().catch((e) => {
    console.error('❌ Error:', e.message);
    process.exit(1);
  });
}
