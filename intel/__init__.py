"""
Intel - Intelligence Gathering Pipeline for Domicile

Coordinates document scraping and knowledge extraction from various sources
for RAG agent consumption. Integrates with Open Notebook MCP for
governance-compliant retrieval.

Includes specialized agents:
- NotionAgent: Full-featured Notion workspace automation
"""

from .recon_intel_pipeline import (
    ReconIntelPipeline,
    IntelSource,
    IntelResult,
    IntelStatus,
    SourceType,
    NotionIntelScraper,
)

from .agents import (
    NotionAgent,
    NotionClient,
    BlockBuilder,
    PropertyBuilder,
)

__all__ = [
    # Pipeline
    "ReconIntelPipeline",
    "IntelSource",
    "IntelResult",
    "IntelStatus",
    "SourceType",
    "NotionIntelScraper",
    # Agents
    "NotionAgent",
    "NotionClient",
    "BlockBuilder",
    "PropertyBuilder",
]
