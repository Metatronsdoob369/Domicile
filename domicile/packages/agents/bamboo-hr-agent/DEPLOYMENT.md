# Payroll MCP Server - Deployment Guide

## Architecture

Converts the standalone bamboo-hr-agent into an MCP-compliant server with 4 interactive tools:

### 🔧 Tools

1. **`list_incoming_pdfs`** - List PDFs in queue
2. **`process_payroll_pdf`** - Extract data (dry-run preview)
3. **`upload_payroll_entries`** - Upload to BambooHR + NocoDB (ARM action)
4. **`generate_payroll_report`** - Create markdown summary

### 🏗️ Dual-Write Architecture

```
PDF → Extract → BambooHR API ✅
                     ↓
                NocoDB API ✅
```

All entries written to both systems for redundancy and analytics.

---

## Local Testing

### 1. Setup Environment

```bash
cd /Users/joewales/NODE_OUT_Master/domicile_live/domicile/packages/agents/bamboo-hr-agent

# Install dependencies
bun install

# Create test directories
mkdir -p test-data/{incoming,processed,reports,logs}

# Create LLC mapping file
cat > test-data/llc-mapping.json << 'EOF'
{
  "ACME SURGICAL LLC": "John Smith",
  "PRECISION HEALTH CORP": "Jane Doe"
}
EOF

# Set environment variables
export BAMBOOHR_API_KEY="your_api_key_here"
export BAMBOOHR_COMPANY="omsconsulting"
export PAYROLL_BASE_DIR="$(pwd)/test-data"
export NOCODB_API_KEY="your_nocodb_key"  # Optional
export NOCODB_BASE_URL="https://nocodb.zo.computer"
```

### 2. Test MCP Protocol

```bash
# Start the server
bun payroll-processor-mcp.ts
```

In another terminal, send MCP requests:

```bash
# List tools
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | bun payroll-processor-mcp.ts

# List incoming PDFs
echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"list_incoming_pdfs","arguments":{}}}' | bun payroll-processor-mcp.ts

# Process a PDF (dry-run)
echo '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"process_payroll_pdf","arguments":{"fileName":"test-payroll.pdf"}}}' | bun payroll-processor-mcp.ts
```

---

## Citadel Deployment (prestonclay.zo.computer)

### Phase 1A: Infrastructure Setup (15 min)

```bash
# SSH to Citadel
ssh mcp-agent@prestonclay.zo.computer

# Install Bun (if not already installed)
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc

# Create directory structure
mkdir -p ~/xtrackados-data/{incoming,processed,reports,logs}

# Create LLC mapping
cat > ~/xtrackados-data/llc-mapping.json << 'EOF'
{
  "ACME SURGICAL LLC": "John Smith",
  "PRECISION HEALTH CORP": "Jane Doe"
}
EOF

chmod 600 ~/xtrackados-data/llc-mapping.json
```

### Phase 1B: Deploy MCP Server (30 min)

```bash
# Create MCP server directory
mkdir -p ~/mcp-servers/payroll-processor
cd ~/mcp-servers/payroll-processor

# Copy MCP server code (from local machine)
# scp payroll-processor-mcp.ts mcp-agent@prestonclay.zo.computer:~/mcp-servers/payroll-processor/

# Install dependencies
bun install fuse.js

# Create environment file
cat > .env << 'EOF'
BAMBOOHR_API_KEY=your_api_key_here
BAMBOOHR_COMPANY=omsconsulting
PAYROLL_BASE_DIR=/home/mcp-agent/xtrackados-data
NOCODB_API_KEY=your_nocodb_key
NOCODB_BASE_URL=https://nocodb.zo.computer
NOCODB_TABLE_ID=payroll_entries
EOF

chmod 600 .env

# Test the server
bun payroll-processor-mcp.ts
# Press Ctrl+C after confirming it starts
```

### Phase 1C: Create systemd Service (Optional)

```bash
sudo tee /etc/systemd/system/mcp-payroll.service > /dev/null << 'EOF'
[Unit]
Description=Payroll MCP Server
After=network.target

[Service]
Type=simple
User=mcp-agent
WorkingDirectory=/home/mcp-agent/mcp-servers/payroll-processor
EnvironmentFile=/home/mcp-agent/mcp-servers/payroll-processor/.env
ExecStart=/home/mcp-agent/.bun/bin/bun payroll-processor-mcp.ts
Restart=always
RestartSec=10
StandardOutput=append:/home/mcp-agent/xtrackados-data/logs/payroll-mcp.log
StandardError=append:/home/mcp-agent/xtrackados-data/logs/payroll-mcp.log

[Install]
WantedBy=multi-user.target
EOF

# Enable and start
sudo systemctl daemon-reload
sudo systemctl enable mcp-payroll
sudo systemctl start mcp-payroll
sudo systemctl status mcp-payroll
```

---

## Claude Desktop Configuration

### macOS

Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "payroll-processor": {
      "command": "ssh",
      "args": [
        "mcp-agent@prestonclay.zo.computer",
        "cd /home/mcp-agent/mcp-servers/payroll-processor && source .env && bun payroll-processor-mcp.ts"
      ]
    }
  }
}
```

### Test in Claude Desktop

Restart Claude Desktop, then try:

```
User: "List incoming payroll PDFs"
Claude: [Uses payroll-processor MCP] → Shows PDF files

User: "Process test-payroll.pdf"
Claude: [Extracts data, shows preview] → Displays entries for approval

User: "Upload these entries"
Claude: [Uploads to BambooHR + NocoDB] → Confirms success

User: "Generate report"
Claude: [Creates markdown report] → Shows summary
```

---

## Katie's Workflow

### Scenario: Weekly Payroll Processing

**Friday afternoon:**

1. **Check queue**: "How many payroll PDFs are waiting?"
   - Claude calls `list_incoming_pdfs`
   - Shows: 3 PDFs

2. **Preview first PDF**: "Process acme-surgical-2024-01-27.pdf"
   - Claude calls `process_payroll_pdf`
   - Shows:
     ```
     John Smith - $11,653.15 (01/18/2024) - Ref: DACULA
     Jane Doe - $8,420.00 (01/20/2024) - Ref: ALPHARETTA
     ```

3. **Approve upload**: "That looks correct, upload these entries"
   - Claude calls `upload_payroll_entries`
   - Dual-writes to BambooHR + NocoDB
   - Moves PDF to processed/

4. **Generate report**: "Create a summary report"
   - Claude calls `generate_payroll_report`
   - Saves markdown to `reports/payroll-report-1738099200000.md`

5. **Repeat** for remaining PDFs

---

## Telemetry Integration

### Add Telemetry Proxy (Future Phase)

Wrap MCP server with telemetry proxy to log all tool calls:

```bash
# Use existing telemetry-proxy.js from Citadel architecture
MCP_SERVER_NAME=payroll-processor \
MCP_SERVER_COMMAND="bun payroll-processor-mcp.ts" \
SUPABASE_URL=https://your-project.supabase.co \
SUPABASE_SERVICE_KEY=your-service-role-key \
node /home/mcp-agent/mcp-servers/telemetry-proxy.js
```

All tool calls logged to `mcp_telemetry` table:

- `list_incoming_pdfs` calls
- `process_payroll_pdf` extractions
- `upload_payroll_entries` uploads
- Success/failure rates

---

## Troubleshooting

### MCP Server Won't Start

**Problem**: `Error: Cannot find module 'fuse.js'`

**Solution**:

```bash
cd ~/mcp-servers/payroll-processor
bun install fuse.js
```

### BambooHR API Errors

**Problem**: `BambooHR API error: Unauthorized`

**Solution**:

```bash
# Verify API key
echo $BAMBOOHR_API_KEY

# Test manually
curl -u "$BAMBOOHR_API_KEY:x" \
  https://api.bamboohr.com/api/gateway.php/omsconsulting/v1/employees/directory
```

### PDF Extraction Fails

**Problem**: `pdftotext: command not found`

**Solution**:

```bash
# Install poppler-utils
sudo apt-get update
sudo apt-get install -y poppler-utils

# Verify
which pdftotext
```

### No PDFs Found

**Problem**: `list_incoming_pdfs` returns empty

**Solution**:

```bash
# Check directory permissions
ls -la ~/xtrackados-data/incoming/

# Verify environment variable
echo $PAYROLL_BASE_DIR

# Manually add test PDF
cp test.pdf ~/xtrackados-data/incoming/
```

---

## Security Checklist

- [ ] API keys stored in `.env` with 600 permissions
- [ ] SSH key-only authentication to Citadel
- [ ] mcp-agent user has minimal privileges
- [ ] Workspace directory isolated (700)
- [ ] All uploads logged to Supabase
- [ ] NocoDB dual-write for audit trail

---

## Next Steps

1. **Deploy to Citadel** following phases above
2. **Add Governance Contract** (see `ai-agent-blueprint.md`)
3. **Enable Telemetry** with proxy logging
4. **Train Katie** on workflow
5. **Monitor** first week of production use

---

**Document Version:** 1.0
**Last Updated:** 2026-01-27
**Maintainer:** Joe Wales
