# Real Estate Demo Agents

This directory contains two FastAPI services that demonstrate how Domicile
manifests can orchestrate multiple agents inside a single vertical:

1. `zillow_visual_scraper.py` – scrapes Zillow via GPT, analyzes photos with
   Eternal Lattice (or a stub), and emits `PropertyIntelligence` payloads.
2. `secondary_market_eve.py` – consumes those payloads, classifies lead tiers,
   prices them dynamically, and exposes a lead marketplace for investors.

## Running the services

```bash
export OPENAI_API_KEY=sk-...
export STRIPE_SECRET_KEY=sk_test_...

# Optional: clear ports 5052/5053/8080 before restarting
./scripts/reset-real-estate.sh

# Progressive startup (agents + MCP server)
./scripts/start-real-estate.sh
# To stop everything later:
./scripts/stop-real-estate.sh

# After MCP server is up:
MCP_BASE_URL=http://localhost:8080 MCP_BEARER_TOKEN=dev-token-12345 npm run demo:real-estate
```

With both servers running you can:

- `POST /scrape-properties` on the Zillow service to generate
  `PropertyIntelligence` objects.
- Pipe the JSON into `POST /process-overflow-lead` on Secondary Eve to create
  monetized lead packages, then inspect the public `/marketplace`.

These endpoints are perfect MCP candidates and can be referenced directly in a
Domicile manifest to prove end-to-end orchestration for the wholesale
real-estate use case.***

> Tip: export `REALESTATE_ZILLOW_URL` and `REALESTATE_SECONDARY_URL` (defaulting to
> `http://localhost:5052` / `5053`) before starting the MCP server so the new
> `real_estate.*` tools can call these services automatically.
