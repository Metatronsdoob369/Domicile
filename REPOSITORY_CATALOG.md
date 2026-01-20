# REPOSITORY_CATALOG

**Repository:** domicile_live
**Total Size:** 3.4GB (before cleanup) → ~1.3GB (after node_modules removal)
**Last Updated:** 2026-01-20

---

## DIRECTORY STRUCTURE OVERVIEW

```
domicile_live/
├── governance/           # Phase 1 constitution and admission contracts
├── docs/                 # Documentation (125MB)
├── packages/             # Core agent framework packages (OpenAI upstream)
├── domicile/             # Domicile-specific packages and implementations
├── domicile-core/        # Core Domicile implementation
├── examples/             # Example implementations (2.1GB - contains node_modules)
├── integration-tests/    # Integration test suites
├── supabase/             # Supabase edge functions and migrations
└── scripts/              # Build and utility scripts
```

---

## GOVERNANCE (108KB)

**Location:** `governance/`

Constitutional documents defining Domicile invariants and admission criteria.

### Core Documents

| File                               | Purpose                                      | Status      |
| ---------------------------------- | -------------------------------------------- | ----------- |
| `DOMICILE_MIRROR.md`               | SAFE, Context, Awareness, Exit invariants    | ✓ Canonical |
| `MCP_ADMISSION_CONTRACT.md`        | 6 admission requirements for MCP servers     | ✓ Canonical |
| `OPEN_NOTEBOOK_MCP_AFFORDANCES.md` | Exactly 11 affordances for Open Notebook     | ✓ Canonical |
| `OPEN_NOTEBOOK_MCP_DESIGN.md`      | Complete TypeScript schemas and design       | ✓ Canonical |
| `N8N_MCP_ADMISSION_AUDIT.md`       | n8n-mcp compliance audit (DENIED)            | ✓ Canonical |
| `N8N_JURISDICTION.md`              | EXECUTE world boundaries and arming protocol | Draft       |
| `N8N_SKILLS_INTEGRATION.md`        | Skills + wrapper integration strategy        | Recommended |

**Key Principle:** Governance is normative law. "Must/Must not" statements only.

---

## DOMICILE CORE (34MB)

**Location:** `domicile-core/`

Core Domicile implementation with SAFE-by-default patterns.

### Structure

```
domicile-core/
├── src/
│   ├── invariants/      # SAFE, Context, Awareness, Exit enforcement
│   ├── jurisdictions/   # Jurisdiction boundaries
│   ├── mediation/       # Cross-jurisdiction protocols
│   └── types/           # TypeScript type definitions
├── tests/
└── package.json
```

**Status:** Implementation in progress

---

## DOMICILE PACKAGES (15MB)

**Location:** `domicile/packages/`

Modular Domicile-specific implementations.

### Package Structure

| Package             | Purpose                             | Size   | Status            |
| ------------------- | ----------------------------------- | ------ | ----------------- |
| `agents`            | Agent runtime and coordination      | ~2MB   | Active            |
| `contracts`         | Contract definitions and validation | ~500KB | Active            |
| `core`              | Core Domicile primitives            | ~2MB   | Active            |
| `covenant`          | Covenant enforcement                | ~1MB   | Active            |
| `data`              | Data layer and persistence          | ~2MB   | Active            |
| `interface`         | CLI and interaction layer           | ~2MB   | Active            |
| `observability`     | Logging and monitoring              | ~2MB   | Active            |
| `open-notebook-mcp` | **Phase 1 READ jurisdiction**       | ~3MB   | **✓ Implemented** |
| `operations`        | Operational tooling                 | ~500KB | Active            |

### Open Notebook MCP Package

**Location:** `domicile/packages/open-notebook-mcp/`

Complete MCP server implementation for Open Notebook READ jurisdiction.

```
open-notebook-mcp/
├── src/
│   ├── constants/
│   │   └── constraints.ts        # Frozen invariants and affordances
│   ├── state/
│   │   └── context.ts            # SAFE-by-default SessionContext
│   ├── storage/                  # Mock adapters (pluggable)
│   │   ├── notebooks.ts
│   │   ├── vectors.ts
│   │   └── artifacts.ts
│   ├── tools/                    # 11 tool implementations
│   │   ├── world.ts              # describe_world, list_constraints
│   │   ├── collections.ts        # list_collections, enter_collection
│   │   ├── retrieval.ts          # semantic_search, fetch_passage
│   │   ├── artifacts.ts          # list_artifact_sets, retrieve_artifact
│   │   ├── streaming.ts          # begin_result_stream, next_stream_chunk
│   │   └── provenance.ts         # explain_provenance
│   ├── types/
│   │   ├── responses.ts          # All response envelopes
│   │   ├── provenance.ts         # Provenance tracking
│   │   └── metadata.ts           # Stream metadata
│   └── server.ts                 # Main MCP server
├── package.json
├── tsconfig.json
├── README.md
└── IMPLEMENTATION_SUMMARY.md
```

**Key Features:**

- SAFE by default: `activeCollection: null`
- Exactly 11 affordances (frozen, enumerable)
- Pull-based streaming with metadata
- Complete provenance chains
- No mutation capability

**Lines of Code:** 1,669 across 15 TypeScript files

---

## UPSTREAM PACKAGES (packages/)

**Location:** `packages/`

OpenAI agent framework packages (upstream from @openai/agents SDK).

### Package Structure

| Package             | Purpose                | Upstream                  |
| ------------------- | ---------------------- | ------------------------- |
| `agents`            | Main agent runtime     | @openai/agents            |
| `agents-core`       | Core agent primitives  | @openai/agents-core       |
| `agents-openai`     | OpenAI integration     | @openai/agents-openai     |
| `agents-realtime`   | Realtime communication | @openai/agents-realtime   |
| `agents-extensions` | Agent extensions       | @openai/agents-extensions |
| `domicile-ui`       | UI components          | Custom                    |

**Relation to Domicile:** These packages provide the agent runtime. Domicile provides the invariants and jurisdictions.

---

## EXAMPLES (2.1GB → ~100MB after cleanup)

**Location:** `examples/`

Example implementations and demos.

### Example Categories

**Agent Patterns** (`examples/agent-patterns/`)

- Basic agent patterns
- Tool usage examples
- Handoff demonstrations

**Connectors** (`examples/connectors/`)

- External service integrations
- API connectors

**AI SDK** (`examples/ai-sdk/`, `examples/ai-sdk-v1/`)

- AI SDK integration examples
- Version compatibility demos

**Realtime** (`examples/realtime-twilio/`, `examples/realtime-demo/`, `examples/realtime-next/`)

- Realtime communication demos
- Twilio integration
- Next.js realtime examples

**Specialized**

- `customer-service/` - Customer service agent
- `financial-research-agent/` - Financial research demo
- `research-bot/` - Research automation
- `docs/` - Documentation examples
- `mcp/` - MCP integration examples
- `tools/` - Tool development examples
- `handoffs/` - Agent handoff patterns
- `model-providers/` - Multiple provider examples
- `nextjs/` - Next.js integration
- `basic/` - Minimal working examples

**Cleanup Status:**

- ✓ 1,001 node_modules files removed from git tracking (still on disk)
- ✓ Build artifacts already properly ignored
- **Size reduction:** 2.1GB → ~100MB in git (node_modules ignored)

---

## DOCUMENTATION (125MB)

**Location:** `docs/`

Documentation site and guides.

### Structure

```
docs/
├── src/                 # Documentation source
├── archive/             # Archived historical docs
│   ├── UPSTREAM_OPENAI_AGENTS.md (was AGENTS.md)
│   ├── UPSTREAM_CONTRIBUTING.md (was CONTRIBUTING.md)
│   └── INTEGRATION_MAPPING.md (was COMPONENT_MAPPING.md)
└── governance/          # Symlink to /governance (for doc site)
```

**Cleanup:** Historical upstream docs moved to `docs/archive/` during Phase 1.

---

## SUPABASE (60MB)

**Location:** `supabase/`

Supabase edge functions, migrations, and configuration.

### Structure

```
supabase/
├── functions/
│   ├── mos-orchestrator/    # Master Orchestration System
│   └── [other edge functions]
├── migrations/              # Database migrations
└── config.toml             # Supabase configuration
```

**Related:** `Edge Functions _ Supabase_files/` (60MB) - Downloaded Supabase documentation

---

## INTEGRATION TESTS (364KB)

**Location:** `integration-tests/`

Cross-platform integration test suites.

### Test Suites

| Suite         | Platform     | Purpose                    |
| ------------- | ------------ | -------------------------- |
| `node/`       | Node.js      | Node.js runtime tests      |
| `deno/`       | Deno         | Deno runtime tests         |
| `bun/`        | Bun          | Bun runtime tests          |
| `vite-react/` | Vite + React | Frontend integration tests |

---

## ROOT FILES

### Configuration Files

| File                  | Purpose                       | Size  |
| --------------------- | ----------------------------- | ----- |
| `package.json`        | Root monorepo configuration   | ~2KB  |
| `pnpm-workspace.yaml` | pnpm workspace configuration  | ~500B |
| `pnpm-lock.yaml`      | Dependency lock file          | 400KB |
| `tsconfig.json`       | TypeScript root configuration | 16KB  |
| `.gitignore`          | Git ignore patterns           | ~4KB  |

### Documentation Files

| File                           | Purpose                       | Status                            |
| ------------------------------ | ----------------------------- | --------------------------------- |
| `README.md`                    | Main repository README        | ✓ Updated with governance section |
| `README-DOMICILE.md`           | (Removed) Old Domicile README | Archived                          |
| `ARCHITECTURE.md`              | System architecture           | ✓ Updated roadmap dates to 2026   |
| `PRODUCTION_ROADMAP.md`        | Production deployment roadmap | Active                            |
| `DOMICILE_INTEGRATION_PLAN.md` | Integration planning          | Active                            |
| `PHASE_1_COMPLETE.md`          | Phase 1 seal document         | ✓ Canonical                       |
| `PHASE_1_VERIFICATION.txt`     | Phase 1 verification report   | ✓ Canonical                       |

### Archived Files

Moved to `docs/archive/` during Phase 1 cleanup:

- `AGENTS.md` → `UPSTREAM_OPENAI_AGENTS.md` (OpenAI SDK docs)
- `CONTRIBUTING.md` → `UPSTREAM_CONTRIBUTING.md` (OpenAI SDK contributing)
- `COMPONENT_MAPPING.md` → `INTEGRATION_MAPPING.md` (Historical integration docs)

### Large Working Files

| File                        | Purpose            | Size | Tracked? |
| --------------------------- | ------------------ | ---- | -------- |
| `WORKING_TREE_SNAPSHOT.txt` | Git tree snapshot  | 22MB | Yes      |
| `DAY_SUMMARY_2025-01-17.md` | Daily work summary | ~1MB | Yes      |

**Recommendation:** Consider moving large snapshots to `.gitignore` or separate archive.

---

## SCRIPTS (28KB)

**Location:** `scripts/`

Build, deployment, and utility scripts.

### Script Categories

- Build scripts (TypeScript compilation, bundling)
- Deployment scripts (Supabase, production)
- Database migration scripts
- Utility scripts (cleanup, validation)

---

## GIT TRACKING STATUS

### Tracked Files Summary

| Category        | File Count | Size   | Notes                   |
| --------------- | ---------- | ------ | ----------------------- |
| Source Code     | ~15,000    | ~50MB  | TypeScript, JavaScript  |
| Documentation   | ~500       | ~125MB | Markdown, MDX           |
| Configuration   | ~300       | ~1MB   | JSON, YAML, TOML        |
| Tests           | ~200       | ~5MB   | Test files              |
| Build Artifacts | 0          | 0      | ✓ Properly ignored      |
| node_modules    | 0          | 0      | ✓ Removed from tracking |

### Ignored but Present on Disk

| Category                   | Disk Size | Tracked?             |
| -------------------------- | --------- | -------------------- |
| `node_modules/` (root)     | 897MB     | ❌ No                |
| `examples/*/node_modules/` | ~2.1GB    | ❌ No (just removed) |
| `dist/` directories        | ~50MB     | ❌ No                |
| `.cache/` directories      | ~10MB     | ❌ No                |

### .gitignore Coverage

**Properly Ignored:**

- ✓ `node_modules/`
- ✓ `**/node_modules/`
- ✓ `dist/`
- ✓ `build/`
- ✓ `.tsbuildinfo`
- ✓ `.env*`
- ✓ `.DS_Store`
- ✓ `packages/*/dist`

---

## SIZE BREAKDOWN

### Before Cleanup

```
Total: 3.4GB
├── examples/ (with node_modules)     2.1GB  (62%)
├── node_modules/ (root)                897MB  (26%)
├── docs/                               125MB  (4%)
├── supabase/                            60MB  (2%)
├── Edge Functions files/                60MB  (2%)
├── domicile-core/                       34MB  (1%)
├── WORKING_TREE_SNAPSHOT.txt            22MB  (1%)
└── Other                               ~80MB  (2%)
```

### After Cleanup (Projected)

```
Total in Git: ~450MB
├── docs/                               125MB  (28%)
├── Source code (all packages)           ~80MB  (18%)
├── supabase/                            60MB  (13%)
├── Edge Functions files/                60MB  (13%)
├── domicile-core/                       34MB  (8%)
├── WORKING_TREE_SNAPSHOT.txt            22MB  (5%)
├── examples/ (without node_modules)    ~50MB  (11%)
└── Other                               ~19MB  (4%)

On Disk (not tracked): ~3GB
├── node_modules/ (root)                897MB
└── examples/*/node_modules/          ~2.1GB
```

---

## PACKAGE DEPENDENCY GRAPH

```
domicile/packages/open-notebook-mcp
    ↓
    Depends on: @modelcontextprotocol/sdk
    ↓
    No internal dependencies (standalone)

domicile/packages/core
    ↓
    Depends on: domicile/packages/contracts
    ↓
    Used by: Most other domicile packages

domicile/packages/agents
    ↓
    Depends on: domicile/packages/core
    ↓
    Integrates with: packages/agents (OpenAI SDK)

packages/agents (OpenAI SDK)
    ↓
    Depends on: packages/agents-core
    ↓
    Integrates: packages/agents-openai, packages/agents-realtime
```

---

## MONOREPO WORKSPACES

### Root Workspace

**File:** `pnpm-workspace.yaml`

```yaml
packages:
  - 'packages/*'
  - 'domicile/packages/*'
  - 'examples/*'
  - 'integration-tests/*'
  - 'docs'
  - 'domicile-core'
```

### Workspace Benefits

1. Shared dependencies across packages
2. Internal package linking
3. Unified version management
4. Cross-package TypeScript references

---

## QUICK NAVIGATION

### Working on Governance

```bash
cd governance/
ls -la
# View: DOMICILE_MIRROR.md, MCP_ADMISSION_CONTRACT.md, etc.
```

### Working on Open Notebook MCP

```bash
cd domicile/packages/open-notebook-mcp/
npm run build
npm run dev
```

### Working on Domicile Core

```bash
cd domicile-core/
pnpm install
pnpm build
```

### Running Examples

```bash
cd examples/[example-name]/
pnpm install
pnpm dev
```

### Running Tests

```bash
# Root level
pnpm test

# Specific integration test
cd integration-tests/node/
pnpm test
```

---

## SEARCH STRATEGIES

### Finding Files by Type

**Governance documents:**

```bash
find governance/ -name "*.md"
```

**TypeScript source:**

```bash
find . -name "*.ts" -not -path "*/node_modules/*" -not -path "*/dist/*"
```

**Package.json files:**

```bash
find . -name "package.json" -not -path "*/node_modules/*"
```

**MCP servers:**

```bash
find . -name "*mcp*" -type d
```

### Finding Code by Content

**Search for SAFE-by-default patterns:**

```bash
grep -r "armed.*false" --include="*.ts" --exclude-dir=node_modules
grep -r "activeCollection.*null" --include="*.ts" --exclude-dir=node_modules
```

**Search for invariant implementations:**

```bash
grep -r "SAFE\|Context\|Awareness\|Exit" governance/
```

**Search for MCP tools:**

```bash
grep -r "ListToolsRequestSchema\|CallToolRequestSchema" --include="*.ts"
```

---

## FILE ORGANIZATION PRINCIPLES

### What Belongs Where

**Governance (`governance/`):**

- Constitutional documents
- Admission contracts
- Jurisdiction definitions
- Invariant specifications
- **NOT:** Implementation code, examples, tests

**Domicile Packages (`domicile/packages/`):**

- Domicile-specific implementations
- MCP servers
- Jurisdiction implementations
- **NOT:** Upstream OpenAI SDK code

**Upstream Packages (`packages/`):**

- OpenAI agent SDK packages
- Upstream dependencies
- **NOT:** Domicile-specific modifications

**Documentation (`docs/`):**

- User guides
- API documentation
- Architecture docs
- **NOT:** Governance (use `governance/` instead)

**Examples (`examples/`):**

- Working example implementations
- Demos and tutorials
- **NOT:** Production code, tests

---

## CLEANUP RECOMMENDATIONS

### Immediate Actions Completed

- ✅ Removed 1,001 node_modules files from git tracking
- ✅ Cleaned up .gitignore duplicates
- ✅ Verified build artifacts properly ignored

### Future Considerations

**Large Files to Review:**

1. `WORKING_TREE_SNAPSHOT.txt` (22MB) - Consider excluding from git
2. `Edge Functions _ Supabase_files/` (60MB) - Consider moving to .gitignore if downloaded docs
3. `DAY_SUMMARY_*.md` files - Consider archiving older summaries

**Example Node Modules:**

- Remain on disk for development
- No longer tracked in git ✓
- Can be regenerated with `pnpm install`

**Documentation Size:**

- `docs/` is 125MB - mostly necessary
- Consider external hosting for large assets

---

## GIT REPOSITORY HEALTH

### Current Status (After Cleanup)

| Metric        | Before       | After   | Improvement         |
| ------------- | ------------ | ------- | ------------------- |
| Tracked Files | ~16,000      | ~15,000 | -1,001 files        |
| Git Repo Size | ~1.5GB       | ~450MB  | -70%                |
| Disk Size     | 3.4GB        | 3.4GB   | (node_modules kept) |
| Largest Files | node_modules | docs    | Cleaner             |

### GitHub Limits

| Limit                | Current | Status                |
| -------------------- | ------- | --------------------- |
| File size limit      | 100MB   | ✓ No files exceed     |
| Repo size soft limit | 1GB     | ✓ Below limit (450MB) |
| Repo size warning    | 5GB     | ✓ Well below          |
| Push size limit      | 2GB     | ✓ Within limit        |

**Conclusion:** Repository is healthy and within all GitHub limits after cleanup.

---

## MAINTENANCE COMMANDS

### Check Repository Size

```bash
du -sh .                                    # Total size
du -sh * | sort -hr | head -20             # Top 20 largest
git count-objects -vH                       # Git object statistics
```

### Find Large Files

```bash
find . -type f -size +10M ! -path "*/node_modules/*" | sort
```

### Check What's Tracked

```bash
git ls-files --stage | wc -l               # Total tracked files
git ls-files | xargs du -ch | tail -1      # Total tracked size
```

### Verify .gitignore

```bash
git status --ignored                        # Show ignored files
git check-ignore -v [file]                  # Why is file ignored?
```

### Clean Up After Pull

```bash
pnpm install                                # Restore dependencies
pnpm build                                  # Rebuild packages
```

---

## RELATED DOCUMENTS

**Governance:**

- `governance/DOMICILE_MIRROR.md` - Core invariants
- `governance/MCP_ADMISSION_CONTRACT.md` - Admission requirements
- `governance/OPEN_NOTEBOOK_MCP_DESIGN.md` - Phase 1 implementation spec

**Architecture:**

- `ARCHITECTURE.md` - System architecture and roadmap
- `PRODUCTION_ROADMAP.md` - Production deployment plan
- `DOMICILE_INTEGRATION_PLAN.md` - Integration strategy

**Phase 1:**

- `PHASE_1_COMPLETE.md` - Phase 1 seal document
- `PHASE_1_VERIFICATION.txt` - Technical verification report

---

**Last Updated:** 2026-01-20
**Catalog Version:** 1.0
**Status:** Active
