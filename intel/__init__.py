"""
Intel - Intelligence Gathering Pipeline for Domicile

Coordinates document scraping and knowledge extraction from various sources
for RAG agent consumption. Integrates with Open Notebook MCP for
governance-compliant retrieval.
"""

from .recon_intel_pipeline import (
    ReconIntelPipeline,
    IntelSource,
    IntelResult,
    IntelStatus,
    SourceType,
    NotionIntelScraper,
)

__all__ = [
    "ReconIntelPipeline",
    "IntelSource",
    "IntelResult",
    "IntelStatus",
    "SourceType",
    "NotionIntelScraper",
]
