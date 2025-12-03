# CLAUDE.md - AI Assistant Guide for OpenAI Agents SDK

This document provides a comprehensive guide for AI assistants working with the OpenAI Agents SDK (JavaScript/TypeScript) codebase. It covers the repository structure, development workflows, conventions, and best practices.

## Table of Contents

1. [Repository Overview](#repository-overview)
2. [Architecture & Structure](#architecture--structure)
3. [Development Setup](#development-setup)
4. [Package System](#package-system)
5. [Development Workflows](#development-workflows)
6. [Testing](#testing)
7. [Code Style & Conventions](#code-style--conventions)
8. [Important Files & Locations](#important-files--locations)
9. [Common Tasks & Commands](#common-tasks--commands)
10. [Git & PR Workflow](#git--pr-workflow)
11. [Best Practices for AI Assistants](#best-practices-for-ai-assistants)

---

## Repository Overview

**Repository**: OpenAI Agents SDK (JavaScript/TypeScript)
**Type**: pnpm-managed monorepo
**Primary Language**: TypeScript
**Package Manager**: pnpm 10.18.3
**Node Version**: 22+ (supports 20, 22, 24.3.x in CI)
**License**: MIT

### Purpose

The OpenAI Agents SDK is a lightweight yet powerful framework for building multi-agent workflows in JavaScript/TypeScript. It is provider-agnostic and supports OpenAI APIs and other providers.

### Core Concepts

1. **Agents**: LLMs configured with instructions, tools, guardrails, and handoffs
2. **Handoffs**: Specialized tool calls for transferring control between agents
3. **Guardrails**: Configurable safety checks for input and output validation
4. **Tracing**: Built-in tracking of agent runs for debugging and optimization

---

## Architecture & Structure

### Directory Layout

```
openai-agents-js/
├── packages/                    # Core packages (publishable)
│   ├── agents/                 # Main bundle (re-exports core + openai)
│   ├── agents-core/            # Core abstractions and runtime
│   ├── agents-openai/          # OpenAI-specific implementations
│   ├── agents-realtime/        # Realtime voice agent support
│   └── agents-extensions/      # Additional workflow extensions
├── examples/                    # Example applications
│   ├── basic/                  # Basic usage examples
│   ├── agent-patterns/         # Advanced patterns
│   ├── customer-service/       # Customer service demo
│   ├── realtime-demo/          # Realtime voice demo
│   ├── realtime-next/          # Next.js realtime example
│   ├── research-bot/           # Research agent example
│   ├── financial-research-agent/
│   ├── tools/                  # Tool usage examples
│   ├── mcp/                    # MCP server examples
│   └── ...
├── docs/                        # Documentation site (Astro/Starlight)
├── integration-tests/           # Integration tests (Bun, Deno, Node, etc.)
├── helpers/                     # Shared test utilities
├── scripts/                     # Build and automation scripts
│   ├── dev.mts                 # Development server
│   └── embedMeta.ts            # Metadata generation
└── .github/                     # CI/CD workflows
```

### Package Dependencies

- **agents** → depends on → **agents-core** + **agents-openai**
- **agents-openai** → depends on → **agents-core**
- **agents-realtime** → separate, optimized for browser
- **agents-extensions** → extends core functionality

---

## Development Setup

### Prerequisites

- **Node.js**: 22+ (20, 22, or 24.3.x supported)
- **pnpm**: 10.18.3 (use `corepack enable` to manage versions)
- **Environment**: Node.js, Deno, Bun, or Cloudflare Workers (experimental)

### Initial Setup

```bash
# Clone repository
git clone https://github.com/openai/openai-agents-js.git
cd openai-agents-js

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Verify build
pnpm -r build-check

# Run tests
pnpm test
```

### Development Mode

```bash
# Start concurrent watch builds + docs server
pnpm dev

# Run documentation site only
pnpm docs:dev  # http://localhost:4321

# Run specific example
pnpm examples:basic
pnpm examples:realtime-demo
```

---

## Package System

### Core Packages

#### 1. **@openai/agents-core**

- **Location**: `packages/agents-core/`
- **Purpose**: Core abstractions, runtime, and types
- **Key Files**:
  - `agent.ts` - Agent class and configuration
  - `run.ts` - Agent execution loop
  - `tool.ts` - Tool definition and execution
  - `handoff.ts` - Agent handoff logic
  - `guardrail.ts` - Input/output validation
  - `mcp.ts` - Model Context Protocol support
  - `model.ts` - Model abstractions
  - `tracing/` - Tracing utilities

#### 2. **@openai/agents-openai**

- **Location**: `packages/agents-openai/`
- **Purpose**: OpenAI-specific bindings and implementations
- **Dependencies**: Wraps `openai` SDK

#### 3. **@openai/agents**

- **Location**: `packages/agents/`
- **Purpose**: Convenience bundle (re-exports core + openai)
- **Note**: This is the primary package users install

#### 4. **@openai/agents-realtime**

- **Location**: `packages/agents-realtime/`
- **Purpose**: Realtime voice agents (WebRTC/WebSocket)
- **Environment**: Optimized for browser use

#### 5. **@openai/agents-extensions**

- **Location**: `packages/agents-extensions/`
- **Purpose**: Additional workflow extensions

### Build System

- **Compiler**: TypeScript (`tsc`)
- **Multi-package builds**: `tsc-multi` (see `tsc-multi.json`)
- **Metadata**: Auto-generated via `scripts/embedMeta.ts` (prebuild hook)
- **Output**: Each package builds to `dist/` directory
- **Formats**: CommonJS (`.js`), ESM (`.mjs`), TypeScript declarations (`.d.ts`)

---

## Development Workflows

### Making Code Changes

1. **Edit source files** in `packages/*/src/`
2. **Rebuild**:
   ```bash
   pnpm build
   # Or watch mode:
   pnpm packages:dev
   ```
3. **Type-check examples**:
   ```bash
   pnpm -r build-check
   ```

### Working on a Single Package

```bash
# Build specific package
pnpm -F agents-core build

# Test specific package
pnpm -F agents-core test

# Watch specific package
pnpm -F agents-core build --watch
```

### Adding New Features

1. **Identify target package** (usually `agents-core`)
2. **Add implementation** in `packages/*/src/`
3. **Add tests** in `packages/*/test/`
4. **Update exports** in `packages/*/src/index.ts`
5. **Create changeset**:
   ```bash
   pnpm changeset
   ```
6. **Update documentation** in `docs/src/content/docs/`
7. **Add example** (if applicable) in `examples/`

### Agent Loop Internals

When `run()` is called:

1. Agent is invoked with input using configured model
2. LLM returns response (may include tool calls, handoffs, or output)
3. **Final output**: If `outputType` is set, loop ends when structured output matches type; otherwise, loop ends on first message without tool calls/handoffs
4. **Handoff**: Agent switches to new agent and continues
5. **Tool calls**: Tools execute, results append to history, loop continues
6. Max iterations controlled by `maxTurns` parameter

---

## Testing

### Test Framework

- **Runner**: Vitest
- **Config**: `vitest.config.ts`
- **Location**: Tests live in `packages/*/test/` directories
- **Helpers**: Shared utilities in `helpers/tests/`

### Running Tests

```bash
# All tests
CI=1 pnpm test

# Watch mode (local development)
pnpm test:watch

# Coverage report
pnpm test:coverage  # outputs to coverage/

# Integration tests (requires local npm registry)
pnpm local-npm:start      # Verdaccio on :4873
pnpm local-npm:publish
pnpm test:integration
```

### Test Structure

```typescript
// packages/agents-core/test/agent.test.ts
import { describe, it, expect } from 'vitest';
import { Agent } from '../src/agent';

describe('Agent', () => {
  it('should create agent with instructions', () => {
    const agent = new Agent({
      name: 'Test Agent',
      instructions: 'You are helpful',
    });
    expect(agent.name).toBe('Test Agent');
  });
});
```

### Coverage

- **Provider**: Vitest v8
- **Includes**: `packages/**/src/**/*.ts`
- **Excludes**: `**/*.d.ts`, test files, dist folders
- **Reporters**: text, html, json

---

## Code Style & Conventions

### TypeScript Configuration

- **Target**: ESNext
- **Module**: ESNext
- **Strict**: Enabled
- **No unused locals**: Enabled
- **Declaration**: Always generated
- **Source maps**: Enabled

### ESLint Rules

- **Config**: `eslint.config.mjs`
- **Parser**: `@typescript-eslint/parser`
- **Key rules**:
  - No unused variables (except prefixed with `_`)
  - No explicit `any` (allowed in this codebase)
  - Prettier integration for formatting
  - Comments must end with a period

### Formatting

```bash
# Check lint
pnpm lint

# Auto-fix
pnpm lint:fix
```

### Naming Conventions

- **Files**: camelCase for source files, PascalCase for classes
- **Classes**: PascalCase (`Agent`, `Tool`, `RunResult`)
- **Functions**: camelCase (`run`, `createTool`, `executeHandoff`)
- **Constants**: UPPER_SNAKE_CASE for true constants, camelCase for configuration
- **Types/Interfaces**: PascalCase (`AgentConfig`, `ToolOptions`)

### Import/Export Patterns

```typescript
// Prefer named exports
export class Agent { ... }
export function run() { ... }

// Re-export from index
export * from './agent';
export * from './tool';

// Conditional exports in package.json
{
  "exports": {
    ".": "./dist/index.js",
    "./model": "./dist/model.js"
  }
}
```

### Comments

- **Public APIs**: Must have JSDoc comments
- **Internal code**: Comments where logic isn't self-evident
- **Format**: All comments end with a period

```typescript
/**
 * Executes an agent workflow with the given input.
 * @param agent - The agent to run.
 * @param input - The input message or prompt.
 * @returns The final result from the agent.
 */
export async function run(agent: Agent, input: string): Promise<RunResult> {
  // Implementation.
}
```

---

## Important Files & Locations

### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Root package, scripts, dependencies |
| `pnpm-workspace.yaml` | Workspace configuration |
| `tsconfig.json` | TypeScript base config |
| `tsc-multi.json` | Multi-package build config |
| `vitest.config.ts` | Test runner config |
| `eslint.config.mjs` | Linting rules |
| `.prettierrc` | Code formatting |

### Documentation

| Location | Purpose |
|----------|---------|
| `README.md` | High-level overview |
| `CONTRIBUTING.md` | Contribution guidelines |
| `AGENTS.md` | Detailed contributor guide |
| `SECURITY.md` | Security policy |
| `docs/` | Full documentation site (Astro) |

### Key Source Files

| File | Package | Purpose |
|------|---------|---------|
| `packages/agents-core/src/agent.ts` | Core | Agent class definition |
| `packages/agents-core/src/run.ts` | Core | Main execution loop |
| `packages/agents-core/src/tool.ts` | Core | Tool creation and execution |
| `packages/agents-core/src/handoff.ts` | Core | Handoff mechanism |
| `packages/agents-core/src/guardrail.ts` | Core | Validation logic |
| `packages/agents-core/src/mcp.ts` | Core | MCP server integration |

### CI/CD Workflows

| Workflow | Purpose |
|----------|---------|
| `.github/workflows/test.yml` | Main CI (build, lint, test) |
| `.github/workflows/release.yml` | Release automation (Changesets) |
| `.github/workflows/docs.yml` | Documentation deployment |
| `.github/workflows/update-docs.yml` | Doc updates |

---

## Common Tasks & Commands

### Building

```bash
# Clean build
pnpm clean
pnpm build

# Watch mode (all packages + docs)
pnpm dev

# Watch packages only
pnpm packages:dev

# Build docs
pnpm docs:build
```

### Testing

```bash
# Unit tests
pnpm test

# Integration tests
pnpm test:integration

# Examples compilation
pnpm test:examples
# Or:
pnpm -r build-check
```

### Examples

```bash
# Basic example
pnpm examples:basic

# Agent patterns
pnpm examples:agents-as-tools
pnpm examples:deterministic
pnpm examples:parallelization
pnpm examples:human-in-the-loop

# Streaming
pnpm examples:streamed

# Realtime voice
pnpm examples:realtime-demo
pnpm examples:realtime-next

# Tools
pnpm examples:tools-web-search
pnpm examples:tools-file-search

# Full list in root package.json "examples:*" scripts
```

### Versioning

```bash
# Create changeset for version bump
pnpm changeset

# Bump versions (automated by CI)
pnpm bump-version

# Publish (automated by CI)
pnpm ci:publish
```

### Cleanup

```bash
# Remove all node_modules
pnpm clear:deps

# Clean build artifacts
pnpm clean
```

---

## Git & PR Workflow

### Branching

- **Main branch**: `main`
- **Feature branches**: `feat/<description>` or `fix/<description>`
- **Naming**: Use descriptive names (e.g., `feat/streaming-guardrails`)

### Commit Messages

Follow **Conventional Commits**:

```
<type>(<scope>): <short summary>

<optional body>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `test`: Adding/fixing tests
- `chore`: Build, CI, tooling
- `perf`: Performance improvement
- `refactor`: Code change without feature/fix
- `build`: Build system changes
- `ci`: CI configuration
- `style`: Code style (formatting)
- `types`: Type-related changes
- `revert`: Revert previous commit

**Examples**:
```
feat(core): add streaming support for guardrails
fix(openai): handle rate limit errors correctly
docs: update handoff examples in README
test(realtime): add connection timeout tests
chore(deps): update openai SDK to v5.20
```

### Pre-commit Checks

- **Husky**: Pre-commit hooks enabled
- **Trufflehog**: Secret scanning (must be installed)
- **Skip hooks**: Use `--no-verify` if needed (not recommended)

### Pull Request Process

1. **Fork & branch** from `main`
2. **Make changes** with tests
3. **Run checks**:
   ```bash
   pnpm build && pnpm test && pnpm lint
   ```
4. **Create changeset** (if API changes):
   ```bash
   pnpm changeset
   ```
5. **Commit** with Conventional Commits format
6. **Push** and open PR against `main`
7. **Describe changes** in PR, link issues
8. **Wait for review** - requires maintainer approval
9. **CI must pass** (build, test, lint)
10. **Squash merge** - Each PR = 1 commit on main

### Release Process

- **Automated**: Changesets Action runs after merge to `main`
- **Version PR**: Created/updated automatically with pending changes
- **Release**: Maintainer merges version PR to trigger publish

---

## Best Practices for AI Assistants

### When Reading Code

1. **Start with package.json** to understand dependencies and scripts
2. **Check exports** in `index.ts` to see public API surface
3. **Read tests** to understand expected behavior
4. **Look for JSDoc comments** on public APIs
5. **Understand the agent loop** (`packages/agents-core/src/run.ts`)

### When Making Changes

1. **Always read files before editing** - Never modify code you haven't seen
2. **Prefer editing over creating** - Reuse existing files when possible
3. **Run type-checking** after changes:
   ```bash
   pnpm build && pnpm -r build-check
   ```
4. **Add tests** for new features in `packages/*/test/`
5. **Update documentation** if changing public APIs
6. **Create changeset** for user-visible changes
7. **Keep it simple** - Avoid over-engineering, only add what's requested

### Security Considerations

- **Never commit secrets** (Trufflehog checks this)
- **Validate inputs** at system boundaries (user input, external APIs)
- **Avoid security vulnerabilities**: XSS, injection, etc.
- **Don't add unnecessary error handling** for impossible scenarios

### Common Pitfalls

❌ **Don't**:
- Use `pnpm install` without understanding workspace dependencies
- Edit `dist/` directories (they're generated)
- Modify version numbers manually (use changesets)
- Add features beyond what's requested
- Create unnecessary abstractions
- Use watch mode in CI (always use `CI=1` for tests)
- Skip reading existing code before modifying

✅ **Do**:
- Use `pnpm -F <package>` to operate on specific packages
- Run `pnpm build` after source changes
- Check `pnpm -r build-check` to verify examples still compile
- Follow existing patterns in the codebase
- Keep changes focused and minimal
- Test locally before committing
- Read CONTRIBUTING.md and AGENTS.md for detailed guidelines

### File Search Tips

- **Find package source**: `packages/*/src/`
- **Find tests**: `packages/*/test/`
- **Find examples**: `examples/*/`
- **Find types**: Look for `.d.ts` files or `types/` directories
- **Find tools**: Search for `tool(` or check `tool.ts`
- **Find agents**: Search for `new Agent(` or check `agent.ts`

### Debugging Strategies

1. **Check build errors**: `pnpm build` output
2. **Check test failures**: `pnpm test` output
3. **Check lint errors**: `pnpm lint` output
4. **Check type errors**: `pnpm -r build-check` output
5. **Run specific example**: `pnpm examples:<name>` to see runtime behavior
6. **Check CI logs**: `.github/workflows/test.yml` for CI configuration

### Understanding the Monorepo

- **Workspace root**: Contains shared config and scripts
- **Packages**: Independent, publishable npm packages
- **Examples**: Demo apps, not published
- **Docs**: Separate Astro site, not published as package
- **Helpers**: Shared utilities, not published

### Example Workflow for Adding a Feature

```bash
# 1. Understand the requirement
# Read relevant code first

# 2. Create feature branch
git checkout -b feat/my-feature

# 3. Make changes in packages/agents-core/src/
# Add implementation

# 4. Add tests in packages/agents-core/test/
# Verify behavior

# 5. Build and test
pnpm build
pnpm test
pnpm lint

# 6. Create changeset
pnpm changeset
# Select: minor (for new feature)
# Summary: "Add support for X"

# 7. Commit
git add .
git commit -m "feat(core): add support for X"

# 8. Push and open PR
git push origin feat/my-feature
```

---

## Quick Reference

### Essential Commands

| Command | Purpose |
|---------|---------|
| `pnpm install` | Install dependencies |
| `pnpm build` | Build all packages |
| `pnpm test` | Run tests |
| `pnpm lint` | Check code style |
| `pnpm dev` | Watch mode + docs server |
| `pnpm -F <pkg> <cmd>` | Run command in specific package |
| `pnpm -r build-check` | Type-check all packages/examples |
| `pnpm changeset` | Create version changeset |

### Key Directories

| Path | Contents |
|------|----------|
| `packages/agents-core/src/` | Core abstractions |
| `packages/agents-openai/src/` | OpenAI implementations |
| `packages/agents-realtime/src/` | Realtime voice support |
| `examples/` | Example applications |
| `docs/src/content/docs/` | Documentation content |
| `helpers/tests/` | Shared test utilities |
| `scripts/` | Build automation |

### Environment Variables

- `OPENAI_API_KEY` - Required for examples and some tests
- `NODE_ENV=test` - Set automatically by test scripts
- `CI=1` - Disable watch mode in CI
- `NODE_OPTIONS="--max_old_space_size=4096"` - Used in CI for large builds

---

## Additional Resources

- **Main Documentation**: https://openai.github.io/openai-agents-js
- **GitHub Repository**: https://github.com/openai/openai-agents-js
- **Contributing Guide**: `CONTRIBUTING.md`
- **Detailed Contributor Guide**: `AGENTS.md`
- **OpenAI SDK**: https://github.com/openai/openai-node
- **Model Context Protocol**: https://github.com/modelcontextprotocol/sdk

---

**Last Updated**: 2025-12-03
**SDK Version**: 0.1.x (Check `packages/*/package.json` for current versions)

This guide should be updated when:
- Major architectural changes occur
- New packages are added
- Build/test processes change significantly
- New conventions are established
