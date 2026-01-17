#!/usr/bin/env bash

# Stops services started via start-real-estate.sh by killing recorded PIDs.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PID_FILE="${ROOT_DIR}/.demo-logs/pids.real-estate"

if [[ ! -f "$PID_FILE" ]]; then
  echo "No PID file found. Run ./scripts/reset-real-estate.sh if ports are stuck."
  exit 0
fi

while read -r pid; do
  if [[ -n "$pid" ]]; then
    kill -9 "$pid" 2>/dev/null || true
    echo "Killed PID $pid"
  fi
done < "$PID_FILE"

rm -f "$PID_FILE"
echo "Demo services stopped."
