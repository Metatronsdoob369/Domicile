#!/usr/bin/env python3
"""
Notion MCP Server
=================
MCP-compliant wrapper for the Notion Agent.

Exposes Notion tools as MCP tools over stdio transport.
"""

import asyncio
import json
import sys
from typing import Any, Dict

from notion_agent import NotionAgent, ToolResult


class NotionMCPServer:
    """MCP server wrapper for Notion Agent."""

    def __init__(self):
        self.agent = NotionAgent()
        self.tools = self._define_tools()

    def _define_tools(self) -> list[Dict[str, Any]]:
        """Define MCP tools from Notion agent capabilities."""
        return [
            {
                "name": "notion_search",
                "description": "Search across your Notion workspace for pages, databases, and content",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "query": {
                            "type": "string",
                            "description": "Search query text"
                        }
                    },
                    "required": ["query"]
                }
            },
            {
                "name": "notion_get_page",
                "description": "Get full content of a Notion page by ID",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "page_id": {
                            "type": "string",
                            "description": "Notion page ID"
                        }
                    },
                    "required": ["page_id"]
                }
            },
            {
                "name": "notion_get_database",
                "description": "Get database structure and properties",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "database_id": {
                            "type": "string",
                            "description": "Notion database ID"
                        }
                    },
                    "required": ["database_id"]
                }
            },
            {
                "name": "notion_query_database",
                "description": "Query a database with filters and sorting",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "database_id": {
                            "type": "string",
                            "description": "Notion database ID"
                        },
                        "filter": {
                            "type": "object",
                            "description": "Notion filter object (optional)"
                        },
                        "sorts": {
                            "type": "array",
                            "description": "Sort configuration (optional)"
                        }
                    },
                    "required": ["database_id"]
                }
            },
            {
                "name": "notion_create_page",
                "description": "Create a new page in Notion",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "parent_id": {
                            "type": "string",
                            "description": "Parent page or database ID"
                        },
                        "parent_type": {
                            "type": "string",
                            "enum": ["page_id", "database_id"],
                            "description": "Type of parent"
                        },
                        "title": {
                            "type": "string",
                            "description": "Page title"
                        },
                        "content": {
                            "type": "string",
                            "description": "Page content (markdown or plain text)"
                        }
                    },
                    "required": ["parent_id", "parent_type", "title"]
                }
            },
            {
                "name": "notion_update_page",
                "description": "Update page properties or archive status",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "page_id": {
                            "type": "string",
                            "description": "Page ID to update"
                        },
                        "properties": {
                            "type": "object",
                            "description": "Properties to update"
                        },
                        "archived": {
                            "type": "boolean",
                            "description": "Archive status"
                        }
                    },
                    "required": ["page_id"]
                }
            },
            {
                "name": "notion_append_content",
                "description": "Append content blocks to an existing page",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "page_id": {
                            "type": "string",
                            "description": "Page ID"
                        },
                        "content": {
                            "type": "string",
                            "description": "Content to append (markdown or plain text)"
                        }
                    },
                    "required": ["page_id", "content"]
                }
            }
        ]

    async def handle_request(self, request: Dict[str, Any]) -> Dict[str, Any]:
        """Handle MCP JSON-RPC request."""
        method = request.get("method")
        params = request.get("params", {})
        req_id = request.get("id")

        try:
            if method == "tools/list":
                return {
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "result": {"tools": self.tools}
                }

            elif method == "tools/call":
                tool_name = params.get("name")
                tool_args = params.get("arguments", {})

                # Route to appropriate Notion agent method
                result = await self._execute_tool(tool_name, tool_args)

                return {
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "result": {
                        "content": [
                            {"type": "text", "text": json.dumps(result, indent=2)}
                        ]
                    }
                }

            elif method == "initialize":
                return {
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "result": {
                        "protocolVersion": "2024-11-05",
                        "capabilities": {
                            "tools": {}
                        },
                        "serverInfo": {
                            "name": "notion-mcp-server",
                            "version": "1.0.0"
                        }
                    }
                }

            else:
                raise ValueError(f"Unknown method: {method}")

        except Exception as e:
            return {
                "jsonrpc": "2.0",
                "id": req_id,
                "error": {
                    "code": -32603,
                    "message": str(e)
                }
            }

    async def _execute_tool(self, tool_name: str, args: Dict[str, Any]) -> Any:
        """Execute a Notion tool and return the result."""
        if tool_name == "notion_search":
            result = await self.agent.execute_tool("search", args)
        elif tool_name == "notion_get_page":
            result = await self.agent.execute_tool("get_page_content", args)
        elif tool_name == "notion_get_database":
            result = await self.agent.execute_tool("get_database", args)
        elif tool_name == "notion_query_database":
            result = await self.agent.execute_tool("query_database", args)
        elif tool_name == "notion_create_page":
            result = await self.agent.execute_tool("create_page", args)
        elif tool_name == "notion_update_page":
            result = await self.agent.execute_tool("update_page", args)
        elif tool_name == "notion_append_content":
            result = await self.agent.execute_tool("append_content", args)
        else:
            raise ValueError(f"Unknown tool: {tool_name}")

        if result.success:
            return result.data
        else:
            raise RuntimeError(result.error or "Tool execution failed")

    async def run(self):
        """Run the MCP server on stdin/stdout."""
        while True:
            try:
                line = await asyncio.get_event_loop().run_in_executor(
                    None, sys.stdin.readline
                )
                if not line:
                    break

                request = json.loads(line.strip())
                response = await self.handle_request(request)
                print(json.dumps(response), flush=True)

            except json.JSONDecodeError:
                continue
            except Exception as e:
                error_response = {
                    "jsonrpc": "2.0",
                    "id": None,
                    "error": {
                        "code": -32700,
                        "message": f"Parse error: {str(e)}"
                    }
                }
                print(json.dumps(error_response), flush=True)

        await self.agent.close()


async def main():
    """Main entry point."""
    server = NotionMCPServer()
    await server.run()


if __name__ == "__main__":
    asyncio.run(main())
