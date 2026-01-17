# Repository Guidelines

Contract-Driven AI Platform is contract-first; these guidelines keep orchestrations, policy enforcement, and trust scores predictable for every contributor.

## Project Structure & Module Organization
Runtime code lives in `src/`; `src/orchestration/` provides the policy engine, CLI, manifest builder, and Vitest fixtures, while monitoring and optimizer utilities sit at the root of `src`. Runnable walkthroughs stay in `examples/`, and `docs/` hosts the VitePress site. Build output lands in `dist/` after `npm run build`. Architecture and governance references live in `ARCHITECTURE.md` and `CONTRIBUTING.md`.

## Build, Test, and Development Commands
Use Node.js 22+ and run `npm install` once. Key scripts:
- `npm run dev` – start the ts-node server for orchestration experiments.
- `npm run build` – type-check and emit CommonJS to `dist/`; run before publishing.
- `npm start` – execute the compiled server.
- `npm run orchestrator:validate|execute|examples` – drive the CLI against assets in `src/orchestration/`.
- `npm run docs:dev` / `npm run docs:build` – preview or build the VitePress docs in `docs/`.

## Coding Style & Naming Conventions
Stick to TypeScript with 2-space indentation, single quotes, and trailing semicolons as shown in `src/performance-optimizer.ts`. Classes use `PascalCase`, functions and variables use `camelCase`, and constants use `SCREAMING_SNAKE_CASE`. Keep contracts and zod schemas near their consumers. Run `npm run lint`, `npm run lint:fix`, and `npm run type-check` before opening a PR.

## Testing Guidelines
Vitest powers the suite. Co-locate specs next to code (e.g., `src/orchestration/orchestrator.test.ts`) and name them `*.test.ts` for auto-discovery. `npm test` runs Vitest in watch mode, while `npm run test:run` and `npm run test:orchestrator` cover CI scenarios and heavy orchestration flows. Add fixtures under `examples/` when reproducing issues and hold coverage at or above the CI badge baseline.

## Commit & Pull Request Guidelines
Follow Conventional Commits (`feat:`, `fix:`, `chore:`) as established by `feat: initial release ...`. Each PR should describe the subsystem touched, link issues or manifests, list `npm run build && npm test`, and include screenshots or transcripts when behavior changes. Keep diffs focused, update docs/tests with code, and flag migrations or configuration follow-ups.

## Security & Configuration Tips
Copy `.env.example` to `.env`, supply `OPENAI_API_KEY` and optional `PINECONE_API_KEY`, and never commit env files or logs containing secrets. Rotate leaked keys, prefer local secret stores, and redact contract payloads or trust telemetry before sharing debug output.
