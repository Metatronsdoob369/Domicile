#!/usr/bin/env bash

# Progressive startup script for the real-estate demo stack.
# 1. Clears old processes (calls reset script)
# 2. Starts Zillow scraper (port 5052) in the background
# 3. Starts Secondary Market Eve (port 5053) in the background
# 4. Boots the MCP interface server pointing at those agents
# PIDs are stored in .demo-logs/pids.real-estate for easy cleanup.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOG_DIR="${ROOT_DIR}/.demo-logs"
PID_FILE="${LOG_DIR}/pids.real-estate"

mkdir -p "${LOG_DIR}"

echo "🔄 Resetting demo ports..."
"${ROOT_DIR}/scripts/reset-real-estate.sh"

: "${OPENAI_API_KEY:?OPENAI_API_KEY must be set before running this script}"
: "${MCP_BEARER_TOKEN:=dev-token-12345}"
export MCP_BEARER_TOKEN

if [[ -z "${REALESTATE_ZILLOW_URL:-}" ]]; then
  export REALESTATE_ZILLOW_URL="http://localhost:5052"
fi
if [[ -z "${REALESTATE_SECONDARY_URL:-}" ]]; then
  export REALESTATE_SECONDARY_URL="http://localhost:5053"
fi

echo "🏠 Starting Zillow scraper on 5052..."
cd "${ROOT_DIR}"
python -m uvicorn examples.real-estate.zillow_visual_scraper:app --port 5052 \
  > "${LOG_DIR}/zillow.log" 2>&1 &
PID_ZILLOW=$!

echo "🏬 Starting Secondary Market Eve on 5053..."
python -m uvicorn examples.real-estate.secondary_market_eve:app --port 5053 \
  > "${LOG_DIR}/secondary.log" 2>&1 &
PID_SECONDARY=$!

echo "🛰  Starting MCP interface server on 8080..."
npm run mcp:start -w @domicile/interface \
  > "${LOG_DIR}/mcp.log" 2>&1 &
PID_MCP=$!

echo "${PID_ZILLOW}" > "${PID_FILE}"
echo "${PID_SECONDARY}" >> "${PID_FILE}"
echo "${PID_MCP}" >> "${PID_FILE}"

echo "✅ Services started. Logs live in ${LOG_DIR}."
echo "   Zillow PID: ${PID_ZILLOW}"
echo "   Secondary Eve PID: ${PID_SECONDARY}"
echo "   MCP PID: ${PID_MCP}"
echo ""
echo "Next step: run the demo once everything is healthy:"
echo "   MCP_BASE_URL=http://localhost:8080 MCP_BEARER_TOKEN=${MCP_BEARER_TOKEN} npm run demo:real-estate"
echo ""
echo "To stop everything, run ./scripts/reset-real-estate.sh"
