#!/usr/bin/env bash

# Kill any processes bound to the real-estate demo ports.
# Usage: ./scripts/reset-real-estate.sh

set -euo pipefail

PORTS=(5052 5053 8080)

for port in "${PORTS[@]}"; do
  pids=$(lsof -ti tcp:"$port" || true)
  if [[ -n "$pids" ]]; then
    echo "🔧 Killing processes on port $port -> $pids"
    kill -9 $pids || true
  else
    echo "✅ Port $port is already free"
  fi
done

echo "🎯 All demo ports cleared."
