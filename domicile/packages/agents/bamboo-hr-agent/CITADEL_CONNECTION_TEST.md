# Citadel MCP Connection Test

## Updated Claude Desktop Config

**Location:** `~/Library/Application Support/Claude/claude_desktop_config.json`

### Added MCP Servers:

```json
{
  "mcpServers": {
    "zo-files": {
      "command": "ssh",
      "args": [
        "-T",
        "mcp-agent@prestonclay.zo.computer",
        "export PATH=$HOME/.npm-global/bin:$PATH && npx -y @modelcontextprotocol/server-filesystem /home/mcp-agent/domicile"
      ],
      "disabled": false
    },
    "citadel-payroll": {
      "command": "ssh",
      "args": [
        "-T",
        "mcp-agent@prestonclay.zo.computer",
        "export PATH=$HOME/.bun/bin:$PATH && cd /home/mcp-agent/mcp-servers/payroll && source /home/mcp-agent/.env.mcp && bun run payroll-processor-mcp.ts"
      ],
      "disabled": true
    }
  }
}
```

**Note:** `citadel-payroll` is disabled until Phase 1C deployment completes.

---

## Phase 1A: Test Citadel Filesystem Connection

### Step 1: Restart Claude Desktop

```bash
killall Claude
open -a Claude
```

### Step 2: Test Connection

In this Claude chat, ask:

```
"List the files in the domicile directory on the Citadel"
```

**Expected Response:**

```
Using zo-files MCP server...

Files in /home/mcp-agent/domicile/:
- clay-i/
- governance/
- logs/
- [other directories]
```

**If this works:** ✅ The Citadel is Online!

---

## Phase 1B: Deploy Prerequisites

Before enabling `citadel-payroll`, we need:

### 1. Create mcp-agent User on Citadel

```bash
ssh root@prestonclay.zo.computer << 'ENDSSH'
adduser mcp-agent --disabled-password --gecos ""
usermod -aG sudo mcp-agent
mkdir -p /home/mcp-agent/.ssh
cp /root/.ssh/authorized_keys /home/mcp-agent/.ssh/
chown -R mcp-agent:mcp-agent /home/mcp-agent/.ssh
chmod 700 /home/mcp-agent/.ssh
chmod 600 /home/mcp-agent/.ssh/authorized_keys
ENDSSH
```

### 2. Test SSH Access

```bash
ssh mcp-agent@prestonclay.zo.computer "echo 'Connection successful'"
```

### 3. Create Directory Structure

```bash
ssh mcp-agent@prestonclay.zo.computer << 'ENDSSH'
mkdir -p /home/mcp-agent/mcp-servers/payroll
mkdir -p /home/mcp-agent/xtrackados-data/payroll/{incoming,processed,reports,logs}
mkdir -p /home/mcp-agent/domicile
ENDSSH
```

---

## Phase 1C: Deploy Payroll MCP

### 1. Install Bun on Citadel

```bash
ssh mcp-agent@prestonclay.zo.computer << 'ENDSSH'
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
bun --version
ENDSSH
```

### 2. Copy MCP Server Code

```bash
scp ~/NODE_OUT_Master/domicile_live/domicile/packages/agents/bamboo-hr-agent/payroll-processor-mcp.ts \
    mcp-agent@prestonclay.zo.computer:/home/mcp-agent/mcp-servers/payroll/
```

### 3. Install Dependencies

```bash
ssh mcp-agent@prestonclay.zo.computer << 'ENDSSH'
cd /home/mcp-agent/mcp-servers/payroll
bun install fuse.js
ENDSSH
```

### 4. Create Environment File

```bash
ssh mcp-agent@prestonclay.zo.computer << 'ENDSSH'
cat > /home/mcp-agent/.env.mcp << 'EOF'
BAMBOOHR_API_KEY=your_actual_key_here
BAMBOOHR_COMPANY=omsconsulting
PAYROLL_BASE_DIR=/home/mcp-agent/xtrackados-data/payroll
NOCODB_API_KEY=
NOCODB_BASE_URL=https://nocodb.zo.computer
NOCODB_TABLE_ID=payroll_entries
USE_MOCK_DATA=false
EOF
chmod 600 /home/mcp-agent/.env.mcp
ENDSSH
```

### 5. Test on Citadel

```bash
ssh mcp-agent@prestonclay.zo.computer << 'ENDSSH'
export PATH=$HOME/.bun/bin:$PATH
cd /home/mcp-agent/mcp-servers/payroll
source /home/mcp-agent/.env.mcp
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | bun run payroll-processor-mcp.ts
ENDSSH
```

**Expected:** JSON response with 4 tools

---

## Phase 1D: Enable Payroll MCP in Claude Desktop

### 1. Edit Config

```bash
# Change "disabled": true to "disabled": false
nano ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

Or use this command:

```bash
sed -i '' 's/"citadel-payroll".*"disabled": true/"citadel-payroll": {\n      "command": "ssh",\n      "args": [\n        "-T",\n        "mcp-agent@prestonclay.zo.computer",\n        "export PATH=$HOME\/.bun\/bin:$PATH \&\& cd \/home\/mcp-agent\/mcp-servers\/payroll \&\& source \/home\/mcp-agent\/.env.mcp \&\& bun run payroll-processor-mcp.ts"\n      ],\n      "disabled": false/g' ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

### 2. Restart Claude Desktop

```bash
killall Claude
open -a Claude
```

### 3. Test Payroll MCP

In this Claude chat:

```
"List the available payroll tools"
```

**Expected Response:**

```
Available tools from citadel-payroll:
1. list_incoming_pdfs - List PDFs waiting for processing
2. process_payroll_pdf - Extract data (dry-run preview)
3. upload_payroll_entries - Upload to BambooHR + NocoDB
4. generate_payroll_report - Create summary report
```

---

## Troubleshooting

### Problem: "zo-files not found"

**Solution:** Ensure mcp-agent user exists and has domicile directory:

```bash
ssh mcp-agent@prestonclay.zo.computer "ls -la /home/mcp-agent/domicile"
```

### Problem: "Permission denied (publickey)"

**Solution:** Copy SSH key to mcp-agent:

```bash
ssh root@prestonclay.zo.computer "cat /root/.ssh/authorized_keys" > /tmp/keys
scp /tmp/keys root@prestonclay.zo.computer:/home/mcp-agent/.ssh/authorized_keys
ssh root@prestonclay.zo.computer "chown mcp-agent:mcp-agent /home/mcp-agent/.ssh/authorized_keys && chmod 600 /home/mcp-agent/.ssh/authorized_keys"
```

### Problem: "Bun not found"

**Solution:** Ensure PATH is exported in SSH command (already in config):

```bash
ssh mcp-agent@prestonclay.zo.computer "export PATH=\$HOME/.bun/bin:\$PATH && bun --version"
```

### Problem: "citadel-payroll tools not appearing"

**Check:**

1. Is `disabled: false` in config?
2. Did you restart Claude Desktop?
3. Does the MCP server start manually?

```bash
ssh mcp-agent@prestonclay.zo.computer << 'ENDSSH'
export PATH=$HOME/.bun/bin:$PATH
cd /home/mcp-agent/mcp-servers/payroll
source /home/mcp-agent/.env.mcp
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | bun run payroll-processor-mcp.ts
ENDSSH
```

---

## Success Criteria

✅ **Citadel is Online when:**

1. `zo-files` lists domicile directory contents
2. `citadel-payroll` shows 4 available tools
3. SSH connection is fast (<100ms)
4. No authentication errors

---

**Document Version:** 1.0
**Last Updated:** 2026-01-27
**Status:** Ready for Testing
