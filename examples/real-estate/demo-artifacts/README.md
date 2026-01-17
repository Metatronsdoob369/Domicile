# Demo Artifacts

## 1. Sample Manifest
See `manifest.sample.json` for the output captured after running:

```bash
npm run orchestrator:examples
cat examples/real-estate/demo-artifacts/manifest.sample.json
```

It references the Zillow scraper + Secondary Eve services so stakeholders
can see exactly which modules the orchestrator activated.

## 2. CLI Transcript (Scrape → Package → Marketplace)

```bash
# 1. Scrape distressed listings
curl -X POST \
  "$REALESTATE_ZILLOW_URL/scrape-properties" \
  -H 'Content-Type: application/json' \
  -d '{"location":"Austin, TX","max_price":350000}' \
  | tee examples/real-estate/demo-artifacts/scrape.json

# 2. Send top prospect to Secondary Eve
jq '.properties[0]' examples/real-estate/demo-artifacts/scrape.json \
  | curl -X POST "$REALESTATE_SECONDARY_URL/process-overflow-lead" \
      -H 'Content-Type: application/json' \
      -d @- \
  | tee examples/real-estate/demo-artifacts/package.json

# 3. Inspect investor marketplace
curl "$REALESTATE_SECONDARY_URL/marketplace" \
  | tee examples/real-estate/demo-artifacts/marketplace.json
```

Replay the transcript after starting both FastAPI services to produce the same
artifacts shown here.

Or run the automated version (after the MCP server is configured with the
REALESTATE_* env vars):

```bash
MCP_BASE_URL=http://localhost:8080 MCP_BEARER_TOKEN=dev-token-12345 npm run demo:real-estate
```
