"""
Notion Chat Interface
=====================
Natural language conversational interface for the Notion Agent.
Allows you to interact with Notion using plain English.

Usage:
    python notion_chat.py

Examples:
    > Search for meeting notes
    > Create a new page called "Project Ideas" in my workspace
    > What's in the Q1 Planning database?
    > Add a task to my todo list
"""

from __future__ import annotations

import asyncio
import json
import os
import re
import sys
from datetime import datetime
from typing import Any, Dict, List, Optional, Tuple

from notion_agent import NotionAgent, ToolResult

# Try to import OpenAI for natural language understanding
try:
    from openai import OpenAI
    HAS_OPENAI = True
except ImportError:
    HAS_OPENAI = False


class NotionChat:
    """
    Conversational interface for Notion Agent.
    Uses LLM to understand intent and route to appropriate tools.
    """

    SYSTEM_PROMPT = """You are a helpful Notion assistant. Your job is to understand user requests
about Notion and determine what action to take.

Available tools:
- search: Search the workspace (query)
- get_page: Get a page by ID (page_id)
- get_page_content: Get full content of a page (page_id)
- get_database: Get database info (database_id)
- query_database: Query a database (database_id, filter, sorts)
- create_page: Create a new page (parent_id, parent_type, title, content)
- update_page: Update a page (page_id, properties, archived)
- append_content: Add content to a page (page_id, content)
- create_database: Create a database (parent_page_id, title, properties)
- archive_page: Archive a page (page_id)
- delete_block: Delete a block (block_id)
- get_workspace_info: Get bot/workspace info

When the user asks something, respond with a JSON object:
{
    "intent": "tool_call" | "question" | "clarification_needed",
    "tool": "tool_name" (if tool_call),
    "parameters": {...} (if tool_call),
    "response": "your response to the user",
    "clarification": "what you need to know" (if clarification_needed)
}

If the user asks a general question about Notion, set intent to "question" and provide helpful information.
If you need more information to complete the request, set intent to "clarification_needed".
If you can determine the action, set intent to "tool_call" with the appropriate tool and parameters.

Always be helpful and explain what you're doing."""

    def __init__(self, notion_agent: Optional[NotionAgent] = None):
        self.agent = notion_agent or NotionAgent()
        self.openai_client = OpenAI() if HAS_OPENAI else None
        self.conversation_history: List[Dict[str, str]] = []
        self.context: Dict[str, Any] = {}  # Store context like last searched pages

    async def chat(self, user_message: str) -> str:
        """Process a user message and return a response."""
        self.conversation_history.append({"role": "user", "content": user_message})

        # If no OpenAI, use pattern matching
        if not self.openai_client:
            return await self._pattern_match_response(user_message)

        # Use OpenAI to understand intent
        try:
            intent_response = self._get_intent(user_message)
            intent_data = json.loads(intent_response)
        except (json.JSONDecodeError, Exception) as e:
            return f"I had trouble understanding that. Could you rephrase? ({e})"

        intent = intent_data.get("intent")

        if intent == "question":
            response = intent_data.get("response", "I'm not sure how to help with that.")

        elif intent == "clarification_needed":
            response = intent_data.get("clarification", "Could you provide more details?")

        elif intent == "tool_call":
            tool_name = intent_data.get("tool")
            parameters = intent_data.get("parameters", {})

            # Execute the tool
            result = await self.agent.execute_tool(tool_name, **parameters)

            if result.success:
                response = self._format_tool_result(tool_name, result, intent_data.get("response", ""))
                # Store context for follow-up
                self._update_context(tool_name, result)
            else:
                response = f"Sorry, that didn't work: {result.error}"

        else:
            response = intent_data.get("response", "I'm not sure what you're asking for.")

        self.conversation_history.append({"role": "assistant", "content": response})
        return response

    def _get_intent(self, user_message: str) -> str:
        """Use OpenAI to determine user intent."""
        messages = [
            {"role": "system", "content": self.SYSTEM_PROMPT},
            *self.conversation_history[-10:],  # Last 10 messages for context
        ]

        # Add context about recent actions
        if self.context:
            context_str = f"\nRecent context: {json.dumps(self.context, default=str)}"
            messages[0]["content"] += context_str

        response = self.openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            response_format={"type": "json_object"},
            max_tokens=500,
        )

        return response.choices[0].message.content

    def _format_tool_result(self, tool_name: str, result: ToolResult, llm_response: str) -> str:
        """Format the tool result for user display."""
        data = result.data

        if tool_name == "search":
            results = data.get("results", [])
            if not results:
                return "I didn't find anything matching your search."

            lines = [f"Found {len(results)} results:\n"]
            for item in results[:10]:
                obj_type = item.get("object", "unknown")
                title = self._extract_title(item)
                item_id = item.get("id", "")[:8]
                lines.append(f"  [{obj_type}] {title} ({item_id}...)")

            return "\n".join(lines)

        elif tool_name == "get_page":
            title = self._extract_title(data)
            url = data.get("url", "")
            return f"Page: {title}\nURL: {url}\n\n{llm_response}"

        elif tool_name == "get_page_content":
            return f"Page content:\n\n{data[:2000]}{'...' if len(str(data)) > 2000 else ''}"

        elif tool_name == "create_page":
            title = self._extract_title(data)
            url = data.get("url", "")
            return f"Created page: {title}\nURL: {url}"

        elif tool_name == "get_workspace_info":
            bot_name = data.get("name", "Unknown")
            bot_type = data.get("type", "bot")
            return f"Connected as: {bot_name} ({bot_type})"

        elif tool_name == "query_database":
            results = data.get("results", [])
            if not results:
                return "The database query returned no results."

            lines = [f"Found {len(results)} items:\n"]
            for item in results[:10]:
                title = self._extract_title(item)
                lines.append(f"  - {title}")
            return "\n".join(lines)

        else:
            return llm_response or f"Done! ({tool_name} completed successfully)"

    def _extract_title(self, item: Dict) -> str:
        """Extract title from a Notion object."""
        # For pages
        props = item.get("properties", {})
        for prop in props.values():
            if prop.get("type") == "title":
                title_arr = prop.get("title", [])
                if title_arr:
                    return title_arr[0].get("plain_text", "Untitled")

        # For databases
        title_arr = item.get("title", [])
        if title_arr:
            return title_arr[0].get("plain_text", "Untitled")

        return "Untitled"

    def _update_context(self, tool_name: str, result: ToolResult):
        """Update conversation context based on tool results."""
        if tool_name == "search":
            self.context["last_search_results"] = [
                {"id": r.get("id"), "title": self._extract_title(r)}
                for r in result.data.get("results", [])[:5]
            ]
        elif tool_name in ("get_page", "create_page"):
            self.context["last_page_id"] = result.data.get("id")
            self.context["last_page_title"] = self._extract_title(result.data)

    async def _pattern_match_response(self, message: str) -> str:
        """Fallback pattern matching when OpenAI is not available."""
        message_lower = message.lower()

        # Search patterns
        if any(word in message_lower for word in ["search", "find", "look for"]):
            query = re.sub(r"^(search|find|look)\s*(for)?\s*", "", message_lower, flags=re.I).strip()
            if query:
                result = await self.agent.execute_tool("search", query=query)
                return self._format_tool_result("search", result, "")
            return "What would you like me to search for?"

        # Create patterns
        if "create" in message_lower and "page" in message_lower:
            return "To create a page, I need a parent page ID and title. Example: create_page parent_id=abc123 title='My Page'"

        # Info patterns
        if any(word in message_lower for word in ["info", "workspace", "connected", "who am i"]):
            result = await self.agent.execute_tool("get_workspace_info")
            return self._format_tool_result("get_workspace_info", result, "")

        # Help
        if "help" in message_lower or "what can you do" in message_lower:
            return self._get_help_message()

        # List tools
        if "tools" in message_lower or "commands" in message_lower:
            return self.agent.get_tools_description()

        return "I can help you with Notion! Try: 'search for meeting notes', 'show workspace info', or 'help' for more options."

    def _get_help_message(self) -> str:
        """Return help message."""
        return """I'm your Notion assistant! Here's what I can do:

**Search & Query**
- "Search for [query]" - Find pages and databases
- "What's in [database name]?" - Query a database
- "Show me [page name]" - Get page details

**Create & Update**
- "Create a page called [title]" - Make a new page
- "Add [content] to [page]" - Append to a page
- "Create a database for [purpose]" - Set up a database

**Manage**
- "Archive [page]" - Archive a page
- "Delete [block]" - Remove content

**Info**
- "Show workspace info" - See connection status
- "List tools" - See all available tools

Just describe what you want to do and I'll help!"""


async def interactive_session():
    """Run an interactive chat session."""
    print("\n" + "=" * 60)
    print("  NOTION AGENT CHAT")
    print("  Type 'quit' to exit, 'help' for assistance")
    print("=" * 60 + "\n")

    chat = NotionChat()

    while True:
        try:
            user_input = input("You: ").strip()
            if not user_input:
                continue
            if user_input.lower() in ("quit", "exit", "q"):
                print("Goodbye!")
                break

            response = await chat.chat(user_input)
            print(f"\nNotion Agent: {response}\n")

        except KeyboardInterrupt:
            print("\nGoodbye!")
            break
        except Exception as e:
            print(f"\nError: {e}\n")

    await chat.agent.close()


if __name__ == "__main__":
    asyncio.run(interactive_session())
