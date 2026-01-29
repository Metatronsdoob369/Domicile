#!/bin/bash
# Deploy Notion Agent to Citadel
# Run this script ON the Citadel as mcp-agent

set -e

echo "🏰 Deploying Notion Agent to Citadel..."

# Create directory structure
echo "📁 Creating directories..."
mkdir -p /home/mcp-agent/mcp-servers/notion
mkdir -p /home/mcp-agent/xtrackados-data/{incoming,processed,reports}

# Install Python dependencies
echo "📦 Installing dependencies..."
pip3 install --user httpx openai python-dotenv

# Copy agent files (you'll need to scp these first)
echo "📝 Setting up agent files..."
# Files should already be in /home/mcp-agent/mcp-servers/notion/

# Make MCP server executable
chmod +x /home/mcp-agent/mcp-servers/notion/notion_mcp_server.py

# Add NOTION_API_KEY to .env.mcp if not already there
if ! grep -q "NOTION_API_KEY" /home/mcp-agent/.env.mcp 2>/dev/null; then
    echo "" >> /home/mcp-agent/.env.mcp
    echo "# Notion Configuration" >> /home/mcp-agent/.env.mcp
    echo "NOTION_API_KEY=your_notion_key_here" >> /home/mcp-agent/.env.mcp
    echo "⚠️  Please edit ~/.env.mcp and add your NOTION_API_KEY"
fi

# Test the server
echo "🧪 Testing Notion MCP server..."
cd /home/mcp-agent/mcp-servers/notion
export $(cat /home/mcp-agent/.env.mcp | grep -v '^#' | xargs)

# Test tools/list
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | python3 notion_mcp_server.py | head -20

echo "✅ Notion Agent deployed to Citadel!"
echo ""
echo "Next steps:"
echo "1. Edit ~/.env.mcp and add your NOTION_API_KEY"
echo "2. Test: echo '{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"tools/list\"}' | python3 /home/mcp-agent/mcp-servers/notion/notion_mcp_server.py"
echo "3. Add to Claude Desktop config:"
echo '   "notion": {'
echo '     "command": "ssh",'
echo '     "args": ["-T", "mcp-agent@prestonclay.zo.computer",'
echo '              "export PATH=$HOME/.local/bin:$PATH && cd /home/mcp-agent/mcp-servers/notion && source /home/mcp-agent/.env.mcp && python3 notion_mcp_server.py"]'
echo '   }'
