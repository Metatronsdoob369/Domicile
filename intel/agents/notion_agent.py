"""
Notion Agent Specialist
========================
A complete AI agent for Notion that can:
- Answer questions about Notion features, API, and best practices
- Query and search your workspace content
- Create, update, and manage pages and databases
- Automate workflows and content organization

This agent combines RAG knowledge retrieval with action tools for
full read/write access to Notion workspaces.
"""

from __future__ import annotations

import asyncio
import json
import os
import re
from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum
from typing import Any, Callable, Dict, List, Optional, Union

import httpx

# -----------------------------------------------------------------------------
# Configuration
# -----------------------------------------------------------------------------
NOTION_API_VERSION = "2022-06-28"
NOTION_BASE_URL = "https://api.notion.com/v1"


# -----------------------------------------------------------------------------
# Tool Definitions
# -----------------------------------------------------------------------------
class ToolCategory(str, Enum):
    READ = "read"
    WRITE = "write"
    SEARCH = "search"
    MANAGE = "manage"


@dataclass
class Tool:
    """Definition of an agent tool."""
    name: str
    description: str
    category: ToolCategory
    parameters: Dict[str, Any]
    required_params: List[str] = field(default_factory=list)
    examples: List[str] = field(default_factory=list)


@dataclass
class ToolResult:
    """Result from executing a tool."""
    success: bool
    data: Any = None
    error: Optional[str] = None
    tool_name: str = ""
    execution_time_ms: float = 0


# -----------------------------------------------------------------------------
# Notion API Client with Full Capabilities
# -----------------------------------------------------------------------------
class NotionClient:
    """Full-featured Notion API client with all CRUD operations."""

    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv("NOTION_API_KEY")
        if not self.api_key:
            raise ValueError("NOTION_API_KEY is required")
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Notion-Version": NOTION_API_VERSION,
            "Content-Type": "application/json",
        }
        self._client: Optional[httpx.AsyncClient] = None

    async def _get_client(self) -> httpx.AsyncClient:
        if self._client is None:
            self._client = httpx.AsyncClient(headers=self.headers, timeout=30.0)
        return self._client

    async def close(self):
        if self._client:
            await self._client.aclose()
            self._client = None

    # -------------------------------------------------------------------------
    # READ Operations
    # -------------------------------------------------------------------------
    async def get_page(self, page_id: str) -> Dict[str, Any]:
        """Retrieve a page by ID."""
        client = await self._get_client()
        response = await client.get(f"{NOTION_BASE_URL}/pages/{page_id}")
        response.raise_for_status()
        return response.json()

    async def get_database(self, database_id: str) -> Dict[str, Any]:
        """Retrieve a database by ID."""
        client = await self._get_client()
        response = await client.get(f"{NOTION_BASE_URL}/databases/{database_id}")
        response.raise_for_status()
        return response.json()

    async def get_block(self, block_id: str) -> Dict[str, Any]:
        """Retrieve a block by ID."""
        client = await self._get_client()
        response = await client.get(f"{NOTION_BASE_URL}/blocks/{block_id}")
        response.raise_for_status()
        return response.json()

    async def get_block_children(
        self, block_id: str, start_cursor: Optional[str] = None, page_size: int = 100
    ) -> Dict[str, Any]:
        """Get child blocks of a block or page."""
        client = await self._get_client()
        params = {"page_size": page_size}
        if start_cursor:
            params["start_cursor"] = start_cursor
        response = await client.get(
            f"{NOTION_BASE_URL}/blocks/{block_id}/children", params=params
        )
        response.raise_for_status()
        return response.json()

    async def get_page_content(self, page_id: str) -> str:
        """Get full text content of a page."""
        blocks = []
        cursor = None
        while True:
            result = await self.get_block_children(page_id, cursor)
            blocks.extend(result.get("results", []))
            if not result.get("has_more"):
                break
            cursor = result.get("next_cursor")

        return self._blocks_to_text(blocks)

    def _blocks_to_text(self, blocks: List[Dict]) -> str:
        """Convert blocks to plain text."""
        lines = []
        for block in blocks:
            block_type = block.get("type", "")
            block_data = block.get(block_type, {})
            if "rich_text" in block_data:
                text = "".join(
                    item.get("plain_text", "") for item in block_data["rich_text"]
                )
                if text:
                    lines.append(text)
        return "\n".join(lines)

    # -------------------------------------------------------------------------
    # SEARCH Operations
    # -------------------------------------------------------------------------
    async def search(
        self,
        query: str = "",
        filter_type: Optional[str] = None,
        sort_direction: str = "descending",
        sort_timestamp: str = "last_edited_time",
        page_size: int = 100,
        start_cursor: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Search across the workspace."""
        client = await self._get_client()
        body: Dict[str, Any] = {
            "page_size": page_size,
            "sort": {"direction": sort_direction, "timestamp": sort_timestamp},
        }
        if query:
            body["query"] = query
        if filter_type in ("page", "database"):
            body["filter"] = {"property": "object", "value": filter_type}
        if start_cursor:
            body["start_cursor"] = start_cursor

        response = await client.post(f"{NOTION_BASE_URL}/search", json=body)
        response.raise_for_status()
        return response.json()

    async def query_database(
        self,
        database_id: str,
        filter_obj: Optional[Dict] = None,
        sorts: Optional[List[Dict]] = None,
        page_size: int = 100,
        start_cursor: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Query a database with filters and sorts."""
        client = await self._get_client()
        body: Dict[str, Any] = {"page_size": page_size}
        if filter_obj:
            body["filter"] = filter_obj
        if sorts:
            body["sorts"] = sorts
        if start_cursor:
            body["start_cursor"] = start_cursor

        response = await client.post(
            f"{NOTION_BASE_URL}/databases/{database_id}/query", json=body
        )
        response.raise_for_status()
        return response.json()

    # -------------------------------------------------------------------------
    # WRITE Operations - Pages
    # -------------------------------------------------------------------------
    async def create_page(
        self,
        parent_type: str,  # "page_id" or "database_id"
        parent_id: str,
        title: str,
        properties: Optional[Dict[str, Any]] = None,
        children: Optional[List[Dict]] = None,
        icon: Optional[Dict] = None,
        cover: Optional[Dict] = None,
    ) -> Dict[str, Any]:
        """Create a new page."""
        client = await self._get_client()

        body: Dict[str, Any] = {"parent": {parent_type: parent_id}}

        # Set title based on parent type
        if parent_type == "database_id":
            # For database pages, title goes in properties
            body["properties"] = properties or {}
            if "title" not in body["properties"] and "Name" not in body["properties"]:
                body["properties"]["Name"] = {"title": [{"text": {"content": title}}]}
        else:
            # For regular pages, title is a property
            body["properties"] = properties or {
                "title": {"title": [{"text": {"content": title}}]}
            }

        if children:
            body["children"] = children
        if icon:
            body["icon"] = icon
        if cover:
            body["cover"] = cover

        response = await client.post(f"{NOTION_BASE_URL}/pages", json=body)
        response.raise_for_status()
        return response.json()

    async def update_page(
        self,
        page_id: str,
        properties: Optional[Dict[str, Any]] = None,
        archived: Optional[bool] = None,
        icon: Optional[Dict] = None,
        cover: Optional[Dict] = None,
    ) -> Dict[str, Any]:
        """Update a page's properties."""
        client = await self._get_client()
        body: Dict[str, Any] = {}
        if properties:
            body["properties"] = properties
        if archived is not None:
            body["archived"] = archived
        if icon:
            body["icon"] = icon
        if cover:
            body["cover"] = cover

        response = await client.patch(f"{NOTION_BASE_URL}/pages/{page_id}", json=body)
        response.raise_for_status()
        return response.json()

    async def archive_page(self, page_id: str) -> Dict[str, Any]:
        """Archive (soft delete) a page."""
        return await self.update_page(page_id, archived=True)

    async def restore_page(self, page_id: str) -> Dict[str, Any]:
        """Restore an archived page."""
        return await self.update_page(page_id, archived=False)

    # -------------------------------------------------------------------------
    # WRITE Operations - Blocks
    # -------------------------------------------------------------------------
    async def append_blocks(
        self, parent_id: str, children: List[Dict]
    ) -> Dict[str, Any]:
        """Append child blocks to a page or block."""
        client = await self._get_client()
        body = {"children": children}
        response = await client.patch(
            f"{NOTION_BASE_URL}/blocks/{parent_id}/children", json=body
        )
        response.raise_for_status()
        return response.json()

    async def update_block(
        self, block_id: str, block_data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Update a block's content."""
        client = await self._get_client()
        response = await client.patch(
            f"{NOTION_BASE_URL}/blocks/{block_id}", json=block_data
        )
        response.raise_for_status()
        return response.json()

    async def delete_block(self, block_id: str) -> Dict[str, Any]:
        """Delete a block."""
        client = await self._get_client()
        response = await client.delete(f"{NOTION_BASE_URL}/blocks/{block_id}")
        response.raise_for_status()
        return response.json()

    # -------------------------------------------------------------------------
    # WRITE Operations - Databases
    # -------------------------------------------------------------------------
    async def create_database(
        self,
        parent_page_id: str,
        title: str,
        properties: Dict[str, Any],
        is_inline: bool = False,
    ) -> Dict[str, Any]:
        """Create a new database."""
        client = await self._get_client()
        body = {
            "parent": {"type": "page_id", "page_id": parent_page_id},
            "title": [{"type": "text", "text": {"content": title}}],
            "properties": properties,
            "is_inline": is_inline,
        }
        response = await client.post(f"{NOTION_BASE_URL}/databases", json=body)
        response.raise_for_status()
        return response.json()

    async def update_database(
        self,
        database_id: str,
        title: Optional[str] = None,
        properties: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """Update database title or properties."""
        client = await self._get_client()
        body: Dict[str, Any] = {}
        if title:
            body["title"] = [{"type": "text", "text": {"content": title}}]
        if properties:
            body["properties"] = properties

        response = await client.patch(
            f"{NOTION_BASE_URL}/databases/{database_id}", json=body
        )
        response.raise_for_status()
        return response.json()

    # -------------------------------------------------------------------------
    # UTILITY Operations
    # -------------------------------------------------------------------------
    async def get_users(self, start_cursor: Optional[str] = None) -> Dict[str, Any]:
        """List all users in the workspace."""
        client = await self._get_client()
        params = {}
        if start_cursor:
            params["start_cursor"] = start_cursor
        response = await client.get(f"{NOTION_BASE_URL}/users", params=params)
        response.raise_for_status()
        return response.json()

    async def get_me(self) -> Dict[str, Any]:
        """Get the bot user info."""
        client = await self._get_client()
        response = await client.get(f"{NOTION_BASE_URL}/users/me")
        response.raise_for_status()
        return response.json()


# -----------------------------------------------------------------------------
# Block Builders (Helpers for creating content)
# -----------------------------------------------------------------------------
class BlockBuilder:
    """Helper class for building Notion blocks."""

    @staticmethod
    def paragraph(text: str, bold: bool = False, italic: bool = False) -> Dict:
        """Create a paragraph block."""
        return {
            "object": "block",
            "type": "paragraph",
            "paragraph": {
                "rich_text": [
                    {
                        "type": "text",
                        "text": {"content": text},
                        "annotations": {"bold": bold, "italic": italic},
                    }
                ]
            },
        }

    @staticmethod
    def heading_1(text: str) -> Dict:
        """Create a heading 1 block."""
        return {
            "object": "block",
            "type": "heading_1",
            "heading_1": {"rich_text": [{"type": "text", "text": {"content": text}}]},
        }

    @staticmethod
    def heading_2(text: str) -> Dict:
        """Create a heading 2 block."""
        return {
            "object": "block",
            "type": "heading_2",
            "heading_2": {"rich_text": [{"type": "text", "text": {"content": text}}]},
        }

    @staticmethod
    def heading_3(text: str) -> Dict:
        """Create a heading 3 block."""
        return {
            "object": "block",
            "type": "heading_3",
            "heading_3": {"rich_text": [{"type": "text", "text": {"content": text}}]},
        }

    @staticmethod
    def bulleted_list_item(text: str) -> Dict:
        """Create a bulleted list item."""
        return {
            "object": "block",
            "type": "bulleted_list_item",
            "bulleted_list_item": {
                "rich_text": [{"type": "text", "text": {"content": text}}]
            },
        }

    @staticmethod
    def numbered_list_item(text: str) -> Dict:
        """Create a numbered list item."""
        return {
            "object": "block",
            "type": "numbered_list_item",
            "numbered_list_item": {
                "rich_text": [{"type": "text", "text": {"content": text}}]
            },
        }

    @staticmethod
    def todo(text: str, checked: bool = False) -> Dict:
        """Create a to-do block."""
        return {
            "object": "block",
            "type": "to_do",
            "to_do": {
                "rich_text": [{"type": "text", "text": {"content": text}}],
                "checked": checked,
            },
        }

    @staticmethod
    def code(code: str, language: str = "plain text") -> Dict:
        """Create a code block."""
        return {
            "object": "block",
            "type": "code",
            "code": {
                "rich_text": [{"type": "text", "text": {"content": code}}],
                "language": language,
            },
        }

    @staticmethod
    def quote(text: str) -> Dict:
        """Create a quote block."""
        return {
            "object": "block",
            "type": "quote",
            "quote": {"rich_text": [{"type": "text", "text": {"content": text}}]},
        }

    @staticmethod
    def callout(text: str, emoji: str = "💡") -> Dict:
        """Create a callout block."""
        return {
            "object": "block",
            "type": "callout",
            "callout": {
                "rich_text": [{"type": "text", "text": {"content": text}}],
                "icon": {"type": "emoji", "emoji": emoji},
            },
        }

    @staticmethod
    def divider() -> Dict:
        """Create a divider block."""
        return {"object": "block", "type": "divider", "divider": {}}

    @staticmethod
    def toggle(text: str, children: Optional[List[Dict]] = None) -> Dict:
        """Create a toggle block."""
        block = {
            "object": "block",
            "type": "toggle",
            "toggle": {"rich_text": [{"type": "text", "text": {"content": text}}]},
        }
        if children:
            block["toggle"]["children"] = children
        return block

    @staticmethod
    def bookmark(url: str) -> Dict:
        """Create a bookmark block."""
        return {"object": "block", "type": "bookmark", "bookmark": {"url": url}}

    @staticmethod
    def table_of_contents() -> Dict:
        """Create a table of contents block."""
        return {"object": "block", "type": "table_of_contents", "table_of_contents": {}}


# -----------------------------------------------------------------------------
# Property Builders (For database items)
# -----------------------------------------------------------------------------
class PropertyBuilder:
    """Helper class for building Notion properties."""

    @staticmethod
    def title(text: str) -> Dict:
        """Create a title property value."""
        return {"title": [{"text": {"content": text}}]}

    @staticmethod
    def rich_text(text: str) -> Dict:
        """Create a rich text property value."""
        return {"rich_text": [{"text": {"content": text}}]}

    @staticmethod
    def number(value: Union[int, float]) -> Dict:
        """Create a number property value."""
        return {"number": value}

    @staticmethod
    def select(option_name: str) -> Dict:
        """Create a select property value."""
        return {"select": {"name": option_name}}

    @staticmethod
    def multi_select(option_names: List[str]) -> Dict:
        """Create a multi-select property value."""
        return {"multi_select": [{"name": name} for name in option_names]}

    @staticmethod
    def date(start: str, end: Optional[str] = None) -> Dict:
        """Create a date property value. Format: YYYY-MM-DD"""
        date_obj = {"start": start}
        if end:
            date_obj["end"] = end
        return {"date": date_obj}

    @staticmethod
    def checkbox(checked: bool) -> Dict:
        """Create a checkbox property value."""
        return {"checkbox": checked}

    @staticmethod
    def url(url: str) -> Dict:
        """Create a URL property value."""
        return {"url": url}

    @staticmethod
    def email(email: str) -> Dict:
        """Create an email property value."""
        return {"email": email}

    @staticmethod
    def phone(phone: str) -> Dict:
        """Create a phone property value."""
        return {"phone_number": phone}

    @staticmethod
    def relation(page_ids: List[str]) -> Dict:
        """Create a relation property value."""
        return {"relation": [{"id": pid} for pid in page_ids]}

    @staticmethod
    def status(status_name: str) -> Dict:
        """Create a status property value."""
        return {"status": {"name": status_name}}


# -----------------------------------------------------------------------------
# Notion Agent
# -----------------------------------------------------------------------------
class NotionAgent:
    """
    Full-featured Notion Agent with knowledge and action capabilities.

    Can:
    - Answer questions about Notion
    - Search and query workspace content
    - Create, update, and manage pages/databases
    - Automate content workflows
    """

    def __init__(
        self,
        api_key: Optional[str] = None,
        knowledge_base_url: Optional[str] = None,
    ):
        self.client = NotionClient(api_key)
        self.knowledge_base_url = knowledge_base_url or "http://localhost:5053"
        self.block_builder = BlockBuilder
        self.property_builder = PropertyBuilder
        self._tools = self._register_tools()

    def _register_tools(self) -> Dict[str, Tool]:
        """Register all available tools."""
        return {
            # READ tools
            "get_page": Tool(
                name="get_page",
                description="Retrieve a page by its ID, including properties and metadata",
                category=ToolCategory.READ,
                parameters={"page_id": "string - The Notion page ID"},
                required_params=["page_id"],
                examples=["Get page abc123"],
            ),
            "get_page_content": Tool(
                name="get_page_content",
                description="Get the full text content of a page",
                category=ToolCategory.READ,
                parameters={"page_id": "string - The Notion page ID"},
                required_params=["page_id"],
            ),
            "get_database": Tool(
                name="get_database",
                description="Retrieve a database schema and metadata",
                category=ToolCategory.READ,
                parameters={"database_id": "string - The Notion database ID"},
                required_params=["database_id"],
            ),
            # SEARCH tools
            "search": Tool(
                name="search",
                description="Search across the entire workspace for pages and databases",
                category=ToolCategory.SEARCH,
                parameters={
                    "query": "string - Search query",
                    "filter_type": "string - Optional: 'page' or 'database'",
                },
                required_params=[],
                examples=["Search for 'meeting notes'", "Find all databases"],
            ),
            "query_database": Tool(
                name="query_database",
                description="Query a database with filters and sorting",
                category=ToolCategory.SEARCH,
                parameters={
                    "database_id": "string - The database ID",
                    "filter": "object - Optional filter conditions",
                    "sorts": "array - Optional sort conditions",
                },
                required_params=["database_id"],
            ),
            # WRITE tools
            "create_page": Tool(
                name="create_page",
                description="Create a new page in a workspace or database",
                category=ToolCategory.WRITE,
                parameters={
                    "parent_id": "string - Parent page or database ID",
                    "parent_type": "string - 'page_id' or 'database_id'",
                    "title": "string - Page title",
                    "content": "string - Optional markdown content to add",
                },
                required_params=["parent_id", "parent_type", "title"],
            ),
            "update_page": Tool(
                name="update_page",
                description="Update a page's properties or archive status",
                category=ToolCategory.WRITE,
                parameters={
                    "page_id": "string - The page ID",
                    "properties": "object - Properties to update",
                    "archived": "boolean - Whether to archive the page",
                },
                required_params=["page_id"],
            ),
            "append_content": Tool(
                name="append_content",
                description="Append content blocks to a page",
                category=ToolCategory.WRITE,
                parameters={
                    "page_id": "string - The page ID",
                    "content": "string - Markdown content to append",
                },
                required_params=["page_id", "content"],
            ),
            "create_database": Tool(
                name="create_database",
                description="Create a new database in a page",
                category=ToolCategory.WRITE,
                parameters={
                    "parent_page_id": "string - Parent page ID",
                    "title": "string - Database title",
                    "properties": "object - Database property schema",
                },
                required_params=["parent_page_id", "title", "properties"],
            ),
            # MANAGE tools
            "archive_page": Tool(
                name="archive_page",
                description="Archive (soft delete) a page",
                category=ToolCategory.MANAGE,
                parameters={"page_id": "string - The page ID"},
                required_params=["page_id"],
            ),
            "delete_block": Tool(
                name="delete_block",
                description="Delete a specific block",
                category=ToolCategory.MANAGE,
                parameters={"block_id": "string - The block ID"},
                required_params=["block_id"],
            ),
            "get_workspace_info": Tool(
                name="get_workspace_info",
                description="Get information about the connected workspace and bot",
                category=ToolCategory.READ,
                parameters={},
                required_params=[],
            ),
        }

    @property
    def tools(self) -> List[Tool]:
        """Get all available tools."""
        return list(self._tools.values())

    def get_tools_description(self) -> str:
        """Get a formatted description of all tools."""
        lines = ["# Notion Agent Tools\n"]
        for category in ToolCategory:
            category_tools = [t for t in self.tools if t.category == category]
            if category_tools:
                lines.append(f"\n## {category.value.upper()} Operations\n")
                for tool in category_tools:
                    lines.append(f"### {tool.name}")
                    lines.append(f"{tool.description}\n")
                    if tool.parameters:
                        lines.append("Parameters:")
                        for param, desc in tool.parameters.items():
                            required = "(required)" if param in tool.required_params else "(optional)"
                            lines.append(f"  - {param} {required}: {desc}")
                    lines.append("")
        return "\n".join(lines)

    # -------------------------------------------------------------------------
    # Tool Execution
    # -------------------------------------------------------------------------
    async def execute_tool(self, tool_name: str, **kwargs) -> ToolResult:
        """Execute a tool by name with given parameters."""
        start_time = datetime.now()

        if tool_name not in self._tools:
            return ToolResult(
                success=False,
                error=f"Unknown tool: {tool_name}",
                tool_name=tool_name,
            )

        tool = self._tools[tool_name]

        # Check required parameters
        missing = [p for p in tool.required_params if p not in kwargs]
        if missing:
            return ToolResult(
                success=False,
                error=f"Missing required parameters: {missing}",
                tool_name=tool_name,
            )

        try:
            result = await self._execute_tool_impl(tool_name, **kwargs)
            execution_time = (datetime.now() - start_time).total_seconds() * 1000
            return ToolResult(
                success=True,
                data=result,
                tool_name=tool_name,
                execution_time_ms=execution_time,
            )
        except Exception as e:
            execution_time = (datetime.now() - start_time).total_seconds() * 1000
            return ToolResult(
                success=False,
                error=str(e),
                tool_name=tool_name,
                execution_time_ms=execution_time,
            )

    async def _execute_tool_impl(self, tool_name: str, **kwargs) -> Any:
        """Internal tool execution implementation."""
        # READ operations
        if tool_name == "get_page":
            return await self.client.get_page(kwargs["page_id"])

        if tool_name == "get_page_content":
            return await self.client.get_page_content(kwargs["page_id"])

        if tool_name == "get_database":
            return await self.client.get_database(kwargs["database_id"])

        if tool_name == "get_workspace_info":
            return await self.client.get_me()

        # SEARCH operations
        if tool_name == "search":
            return await self.client.search(
                query=kwargs.get("query", ""),
                filter_type=kwargs.get("filter_type"),
            )

        if tool_name == "query_database":
            return await self.client.query_database(
                database_id=kwargs["database_id"],
                filter_obj=kwargs.get("filter"),
                sorts=kwargs.get("sorts"),
            )

        # WRITE operations
        if tool_name == "create_page":
            page = await self.client.create_page(
                parent_type=kwargs["parent_type"],
                parent_id=kwargs["parent_id"],
                title=kwargs["title"],
                properties=kwargs.get("properties"),
            )
            # If content provided, append it
            if kwargs.get("content"):
                blocks = self._markdown_to_blocks(kwargs["content"])
                if blocks:
                    await self.client.append_blocks(page["id"], blocks)
            return page

        if tool_name == "update_page":
            return await self.client.update_page(
                page_id=kwargs["page_id"],
                properties=kwargs.get("properties"),
                archived=kwargs.get("archived"),
            )

        if tool_name == "append_content":
            blocks = self._markdown_to_blocks(kwargs["content"])
            return await self.client.append_blocks(kwargs["page_id"], blocks)

        if tool_name == "create_database":
            return await self.client.create_database(
                parent_page_id=kwargs["parent_page_id"],
                title=kwargs["title"],
                properties=kwargs["properties"],
            )

        # MANAGE operations
        if tool_name == "archive_page":
            return await self.client.archive_page(kwargs["page_id"])

        if tool_name == "delete_block":
            return await self.client.delete_block(kwargs["block_id"])

        raise ValueError(f"Tool not implemented: {tool_name}")

    def _markdown_to_blocks(self, markdown: str) -> List[Dict]:
        """Convert simple markdown to Notion blocks."""
        blocks = []
        lines = markdown.split("\n")

        for line in lines:
            line = line.rstrip()
            if not line:
                continue

            # Headings
            if line.startswith("### "):
                blocks.append(self.block_builder.heading_3(line[4:]))
            elif line.startswith("## "):
                blocks.append(self.block_builder.heading_2(line[3:]))
            elif line.startswith("# "):
                blocks.append(self.block_builder.heading_1(line[2:]))
            # Lists
            elif line.startswith("- [ ] "):
                blocks.append(self.block_builder.todo(line[6:], checked=False))
            elif line.startswith("- [x] "):
                blocks.append(self.block_builder.todo(line[6:], checked=True))
            elif line.startswith("- "):
                blocks.append(self.block_builder.bulleted_list_item(line[2:]))
            elif re.match(r"^\d+\. ", line):
                text = re.sub(r"^\d+\. ", "", line)
                blocks.append(self.block_builder.numbered_list_item(text))
            # Quote
            elif line.startswith("> "):
                blocks.append(self.block_builder.quote(line[2:]))
            # Code block (single line for now)
            elif line.startswith("```"):
                # Skip code fence markers
                continue
            # Divider
            elif line == "---":
                blocks.append(self.block_builder.divider())
            # Regular paragraph
            else:
                blocks.append(self.block_builder.paragraph(line))

        return blocks

    # -------------------------------------------------------------------------
    # High-Level Actions
    # -------------------------------------------------------------------------
    async def create_meeting_notes(
        self,
        parent_id: str,
        meeting_title: str,
        attendees: List[str],
        agenda: List[str],
        date: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Create a formatted meeting notes page."""
        date = date or datetime.now().strftime("%Y-%m-%d")
        content = f"""# {meeting_title}

**Date:** {date}

## Attendees
{chr(10).join(f'- {a}' for a in attendees)}

## Agenda
{chr(10).join(f'- {item}' for item in agenda)}

## Notes

## Action Items
- [ ]

## Next Steps
"""
        return await self.execute_tool(
            "create_page",
            parent_type="page_id",
            parent_id=parent_id,
            title=f"{meeting_title} - {date}",
            content=content,
        )

    async def create_project_page(
        self,
        parent_id: str,
        project_name: str,
        description: str,
        goals: List[str],
        timeline: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Create a formatted project page."""
        content = f"""# {project_name}

## Overview
{description}

## Goals
{chr(10).join(f'- {g}' for g in goals)}

## Timeline
{timeline or 'TBD'}

## Tasks
- [ ] Initial planning
- [ ]

## Resources

## Notes
"""
        return await self.execute_tool(
            "create_page",
            parent_type="page_id",
            parent_id=parent_id,
            title=project_name,
            content=content,
        )

    async def quick_capture(
        self,
        parent_id: str,
        note: str,
        tags: Optional[List[str]] = None,
    ) -> Dict[str, Any]:
        """Quickly capture a note or idea."""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
        tag_str = " ".join(f"#{t}" for t in (tags or []))
        content = f"""{note}

---
*Captured: {timestamp}*
{tag_str}
"""
        title = note[:50] + "..." if len(note) > 50 else note
        return await self.execute_tool(
            "create_page",
            parent_type="page_id",
            parent_id=parent_id,
            title=f"Quick Note: {title}",
            content=content,
        )

    # -------------------------------------------------------------------------
    # Knowledge Queries (RAG Integration)
    # -------------------------------------------------------------------------
    async def search_knowledge(self, query: str, top_k: int = 5) -> List[Dict]:
        """Search the indexed knowledge base."""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.knowledge_base_url}/search",
                    params={"query": query, "top_k": top_k},
                    timeout=30.0,
                )
                if response.status_code == 200:
                    return response.json().get("results", [])
        except Exception:
            pass
        return []

    async def close(self):
        """Close the agent and cleanup resources."""
        await self.client.close()


# -----------------------------------------------------------------------------
# CLI Interface
# -----------------------------------------------------------------------------
async def main():
    """Interactive CLI for the Notion Agent."""
    import argparse

    parser = argparse.ArgumentParser(description="Notion Agent CLI")
    parser.add_argument("--search", "-s", help="Search the workspace")
    parser.add_argument("--get-page", "-p", help="Get page by ID")
    parser.add_argument("--create-page", "-c", nargs=2, metavar=("PARENT_ID", "TITLE"),
                        help="Create a page")
    parser.add_argument("--list-tools", action="store_true", help="List all tools")
    parser.add_argument("--info", action="store_true", help="Get workspace info")
    args = parser.parse_args()

    agent = NotionAgent()

    try:
        if args.list_tools:
            print(agent.get_tools_description())
            return

        if args.info:
            result = await agent.execute_tool("get_workspace_info")
            print(json.dumps(result.data if result.success else {"error": result.error}, indent=2))
            return

        if args.search:
            result = await agent.execute_tool("search", query=args.search)
            if result.success:
                for item in result.data.get("results", [])[:10]:
                    obj_type = item.get("object")
                    title = "Untitled"
                    if obj_type == "page":
                        props = item.get("properties", {})
                        for prop in props.values():
                            if prop.get("type") == "title":
                                title_arr = prop.get("title", [])
                                if title_arr:
                                    title = title_arr[0].get("plain_text", "Untitled")
                                break
                    elif obj_type == "database":
                        title_arr = item.get("title", [])
                        if title_arr:
                            title = title_arr[0].get("plain_text", "Untitled")
                    print(f"[{obj_type}] {title} - {item.get('id')}")
            else:
                print(f"Error: {result.error}")
            return

        if args.get_page:
            result = await agent.execute_tool("get_page", page_id=args.get_page)
            print(json.dumps(result.data if result.success else {"error": result.error}, indent=2))
            return

        if args.create_page:
            parent_id, title = args.create_page
            result = await agent.execute_tool(
                "create_page",
                parent_type="page_id",
                parent_id=parent_id,
                title=title,
            )
            if result.success:
                print(f"Created page: {result.data.get('url')}")
            else:
                print(f"Error: {result.error}")
            return

        # Default: show help
        parser.print_help()

    finally:
        await agent.close()


if __name__ == "__main__":
    asyncio.run(main())
