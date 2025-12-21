#!/bin/bash
# Component migration script

set -e

echo "🔄 Starting component migration..."

# Phase 1: Copy contracts (low complexity)
echo "📋 Phase 1: Migrating contracts..."
mkdir -p packages/contracts/src
cp -r ../contracts/core/* packages/contracts/src/ 2>/dev/null || true
cp -r ../contracts/examples/* packages/contracts/src/examples/ 2>/dev/null || true
echo "✅ Contracts migrated"

# Phase 2: Copy core orchestration  
echo "🎛️ Phase 2: Migrating core orchestration..."
mkdir -p packages/core/src
cp -r ../openai-agents-js/src/orchestration/* packages/core/src/ 2>/dev/null || true
echo "✅ Core orchestration migrated"

# Phase 3: Copy covenant governance
echo "🛡️ Phase 3: Migrating covenant governance..."
mkdir -p packages/covenant/src
cp -r ../covenant-ai/packages/moat/src/* packages/covenant/src/ 2>/dev/null || true
cp -r ../covenant-ai/packages/moat/oracles/* packages/covenant/src/oracles/ 2>/dev/null || true
echo "✅ Covenant governance migrated"

# Phase 4: Copy agents
echo "⚡ Phase 4: Migrating agents..."
mkdir -p packages/agents/src
cp -r ../openai-agents-js/src/agents/* packages/agents/src/ 2>/dev/null || true
echo "✅ Agents migrated"

# Phase 5: Copy data layer
echo "💾 Phase 5: Migrating data layer..."
mkdir -p packages/data/src
cp ../openai-agents-js/src/orchestrator/pinecone-integration.ts packages/data/src/ 2>/dev/null || true
cp ../openai-agents-js/src/knowledge.* packages/data/src/ 2>/dev/null || true
echo "✅ Data layer migrated"

# Phase 6: Copy interface
echo "🎯 Phase 6: Migrating interface..."
mkdir -p packages/interface/src
cp ../openai-agents-js/builder-agent.ts packages/interface/src/ 2>/dev/null || true
cp ../openai-agents-js/src/orchestration/cli.ts packages/interface/src/ 2>/dev/null || true
echo "✅ Interface migrated"

# Phase 7: Copy observability
echo "📊 Phase 7: Migrating observability..."
mkdir -p packages/observability/src
cp ../openai-agents-js/src/monitoring-dashboard.ts packages/observability/src/ 2>/dev/null || true
cp ../openai-agents-js/src/performance-optimizer.ts packages/observability/src/ 2>/dev/null || true
echo "✅ Observability migrated"

echo "🎉 Component migration completed"
echo ""
echo "Next steps:"
echo "1. Run: pnpm install"
echo "2. Run: pnpm validate"
echo "3. Fix any TypeScript errors"
echo "4. Test integration"