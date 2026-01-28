#!/bin/bash
# Phase 0: Local Testing Setup
# This script sets up the local test environment before Citadel deployment

set -e  # Exit on error

echo "📋 Phase 0: Local Testing Setup"
echo "================================"

# Step 1: Create test directories
echo ""
echo "1️⃣ Creating test directories..."
mkdir -p test-data/{incoming,processed,reports,logs}
echo "   ✅ Created: test-data/incoming"
echo "   ✅ Created: test-data/processed"
echo "   ✅ Created: test-data/reports"
echo "   ✅ Created: test-data/logs"

# Step 2: Create LLC mapping file
echo ""
echo "2️⃣ Creating LLC mapping file..."
cat > test-data/llc-mapping.json << 'EOF'
{
  "ACME SURGICAL LLC": "John Smith",
  "PRECISION HEALTH CORP": "Jane Doe",
  "ALPHA MEDICAL GROUP": "Bob Johnson"
}
EOF
echo "   ✅ Created: test-data/llc-mapping.json"

# Step 3: Create test PDF (text file for testing)
echo ""
echo "3️⃣ Creating test payroll PDF..."
cat > test-data/incoming/test-payroll-2024-01-27.pdf << 'EOF'
Payroll Summary Report
Company: OMS Consulting
Period: January 27, 2024

Paid To: ACME SURGICAL LLC

Bill Details:
01/18/2024   Bill   DACULA          11,653.15           11,653.15                          11,653.15
01/20/2024   Bill   ALPHARETTA       8,420.00            8,420.00                           8,420.00
01/22/2024   Bill   ROSWELL          5,250.75            5,250.75                           5,250.75

Total: $25,323.90
EOF
echo "   ✅ Created: test-data/incoming/test-payroll-2024-01-27.pdf"

# Step 4: Create .env.test file (template)
echo ""
echo "4️⃣ Creating .env.test template..."
cat > .env.test << 'EOF'
# Test Environment Configuration
# Copy this to .env and fill in your actual credentials

BAMBOOHR_API_KEY=test_key_replace_me
BAMBOOHR_COMPANY=omsconsulting
PAYROLL_BASE_DIR=./test-data
NOCODB_API_KEY=test_nocodb_key
NOCODB_BASE_URL=http://localhost:8080
NOCODB_TABLE_ID=payroll_entries

# Optional: Supabase for telemetry (can be empty for local test)
SUPABASE_URL=
SUPABASE_KEY=
EOF
echo "   ✅ Created: .env.test"

# Step 5: Check if dependencies are installed
echo ""
echo "5️⃣ Checking dependencies..."
if ! command -v bun &> /dev/null; then
    echo "   ⚠️  Bun not found. Install with: curl -fsSL https://bun.sh/install | bash"
    exit 1
fi
echo "   ✅ Bun: $(bun --version)"

# Step 6: Install MCP dependencies
echo ""
echo "6️⃣ Installing dependencies..."
bun install
echo "   ✅ Dependencies installed"

# Step 7: Test environment ready
echo ""
echo "✅ Test Environment Ready!"
echo ""
echo "📝 Next Steps:"
echo "   1. Copy .env.test to .env and add your BambooHR API key"
echo "   2. Run: bun test-mcp.ts"
echo "   3. If tests pass, proceed to Citadel deployment"
echo ""
echo "🔗 Test Command:"
echo "   echo '{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"tools/list\"}' | bun payroll-processor-mcp.ts"
