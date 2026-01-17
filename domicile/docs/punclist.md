 Punch List Toward “Up & Running”

  - Repo Reset ✔️
      - Domicile workspace + docs copied in, README now tells the circadian story.
      - Legacy src/ tree removed; packages hold all TypeScript.
      - npm workspaces configured (domicile/packages/*), per-package package.json/tsconfig/index.ts added.
      - Permissions/quarantine bits cleared so builds can emit dist/.
  - Next Fixes → Core
      - Update domicile/packages/core/src/orchestrator.ts imports to use @domicile/data, @domicile/observability, @domicile/covenant instead of ../
        orchestrator/....
      - Export Zod schemas as values (no export type) and adjust tests to import them.
      - Tidy CLI/test files: explicit error typing, no unknown, and fix SafeParse usage.
  - Next Fixes → Interface
      - Point MCP server at @domicile/data exports, give event handlers proper typings (req.body, error).
      - Ensure src/server.ts exports something (so index.ts is a valid module) and add Express endpoint types.
  - Next Fixes → Covenant
      - Redirect runner imports to the TypeScript oracle modules now under ./voice-moat/oracles.
      - Remove references to missing .js files and add type exports as needed.
  - Validation Milestone
      - Rerun npm run build until all packages compile and emit domicile/packages/*/dist.
      - Once clean, delete the src-legacy/ folders and add a root CI step (npm run build + npm test) to lock it in.

  After that the workspace is “up & running”: each layer builds from its package, CLI/server work via workspace scripts, and the repo is ready for
  deployment. At that point we can scope an “agent build finish” — e.g., finalize a reference agent (policy-governed, contracts, circadian loop) by:

  1. Implementing the missing Pinecone/data helpers in @domicile/data and wiring them into the orchestrator.
  2. Building an end-to-end example agent (e.g., the Quantum social agent) that uses the new package imports.
  3. Adding a top-level “Agent SDK” README/sample inside domicile/packages/core/examples to show how developers register an agent, run policy checks, and
     plug into the circadian scheduler.
