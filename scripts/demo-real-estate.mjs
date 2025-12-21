#!/usr/bin/env node

/**
 * Hits the MCP interface server to run the real-estate demo end-to-end.
 * Requires:
 *   - MCP_BASE_URL (defaults to http://localhost:8080)
 *   - MCP_BEARER_TOKEN (defaults to dev-token-12345)
 * The interface server must already be configured with REALESTATE_ZILLOW_URL
 * and REALESTATE_SECONDARY_URL so the upstream FastAPI agents are reachable.
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const MCP_BASE_URL = process.env.MCP_BASE_URL || "http://localhost:8080";
const MCP_TOKEN = process.env.MCP_BEARER_TOKEN || "dev-token-12345";
const ARTIFACT_DIR = path.resolve("examples/real-estate/demo-artifacts");

async function main() {
  await mkdir(ARTIFACT_DIR, { recursive: true });

  const scrapePayload = {
    location: "Austin, TX",
    min_price: 50000,
    max_price: 450000,
    property_type: "single_family",
    max_results: 10,
  };

  const scrapeResult = await fetchJson("/tools/real_estate.scrape", scrapePayload);
  await writeArtifact("scrape.latest.json", scrapeResult);

  const firstProperty = scrapeResult?.data?.properties?.[0];
  if (!firstProperty) {
    console.error("⚠️ real_estate.scrape returned no properties; cannot continue.");
    process.exit(1);
  }

  const packageResult = await fetchJson("/tools/real_estate.package", firstProperty);
  await writeArtifact("package.latest.json", packageResult);

  console.log(
    `✅ Wrote demo responses to ${path.relative(process.cwd(), ARTIFACT_DIR)} (scrape.latest.json & package.latest.json)`
  );
}

async function fetchJson(endpoint, body) {
  const url = `${MCP_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${MCP_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Request to ${url} failed: ${response.status} ${response.statusText} – ${text}`);
  }

  return response.json();
}

async function writeArtifact(filename, payload) {
  const target = path.join(ARTIFACT_DIR, filename);
  await writeFile(target, JSON.stringify(payload, null, 2));
}

main().catch((error) => {
  console.error("❌ Demo run failed:", error);
  process.exit(1);
});

