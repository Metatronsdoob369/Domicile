"""
Recon Intel Pipeline
====================
Central coordinator for intelligence gathering and document scraping.
Designed to pull documentation, knowledge bases, and operational intel
from various sources for RAG agent consumption.

Supported Sources:
- Notion workspaces (via notion_intelligence_scraper)
- Web documentation (planned)
- API documentation (planned)
- GitHub repos (planned)

Output:
- Semantic chunks with embeddings
- Provenance tracking
- Vector storage (Pinecone/local)
- Open Notebook MCP compatible format
"""

from __future__ import annotations

import asyncio
import json
import os
import sys
from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum
from pathlib import Path
from typing import Any, Dict, List, Optional, Protocol

# Add parent paths for imports
sys.path.insert(0, str(Path(__file__).parent.parent / "examples" / "notion-rag"))


class SourceType(str, Enum):
    """Supported intelligence source types."""
    NOTION = "notion"
    WEB = "web"
    GITHUB = "github"
    API_DOCS = "api_docs"
    LOCAL_FILES = "local_files"


class IntelStatus(str, Enum):
    """Pipeline execution status."""
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    PARTIAL = "partial"


@dataclass
class IntelSource:
    """Configuration for an intelligence source."""
    source_type: SourceType
    source_id: str
    name: str
    config: Dict[str, Any] = field(default_factory=dict)
    enabled: bool = True
    priority: int = 0
    last_scraped: Optional[str] = None
    chunk_count: int = 0


@dataclass
class IntelResult:
    """Result from scraping an intelligence source."""
    source_id: str
    status: IntelStatus
    documents_scraped: int = 0
    chunks_created: int = 0
    embeddings_generated: int = 0
    errors: List[str] = field(default_factory=list)
    timestamp: str = field(default_factory=lambda: datetime.now().isoformat())
    storage_location: Optional[str] = None
    provenance: Dict[str, Any] = field(default_factory=dict)


class IntelScraper(Protocol):
    """Protocol for intelligence scrapers."""

    async def scrape(self, config: Dict[str, Any]) -> IntelResult:
        """Execute scrape and return results."""
        ...

    async def health_check(self) -> bool:
        """Check if scraper service is available."""
        ...


class NotionIntelScraper:
    """Wrapper for Notion Intelligence Scraper service."""

    def __init__(self, scraper_url: str = "http://localhost:5053"):
        self.scraper_url = scraper_url

    async def health_check(self) -> bool:
        """Check if Notion scraper is running."""
        try:
            import httpx
            async with httpx.AsyncClient() as client:
                response = await client.get(f"{self.scraper_url}/health", timeout=5.0)
                return response.status_code == 200
        except Exception:
            return False

    async def scrape(self, config: Dict[str, Any]) -> IntelResult:
        """Scrape Notion pages/databases."""
        import httpx

        source_id = config.get("source_id", "notion_default")

        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.scraper_url}/scrape",
                    json={
                        "page_ids": config.get("page_ids", []),
                        "database_id": config.get("database_id"),
                        "workspace_root_page_id": config.get("workspace_root_page_id"),
                        "max_depth": config.get("max_depth", 3),
                        "generate_embeddings": config.get("generate_embeddings", True),
                        "chunk_size": config.get("chunk_size", 1000),
                        "chunk_overlap": config.get("chunk_overlap", 200),
                    },
                    timeout=300.0,  # 5 minute timeout for large scrapes
                )
                response.raise_for_status()
                data = response.json()

                return IntelResult(
                    source_id=source_id,
                    status=IntelStatus.COMPLETED,
                    documents_scraped=data.get("pages_scraped", 0),
                    chunks_created=data.get("total_chunks", 0),
                    embeddings_generated=data.get("total_chunks", 0) if config.get("generate_embeddings") else 0,
                    storage_location=data.get("vector_storage", {}).get("backend", "local"),
                    provenance={
                        "scrape_id": data.get("scrape_id"),
                        "timestamp": data.get("timestamp"),
                        "source_type": "notion",
                    },
                )

        except Exception as e:
            return IntelResult(
                source_id=source_id,
                status=IntelStatus.FAILED,
                errors=[str(e)],
            )


class ReconIntelPipeline:
    """
    Main intelligence gathering pipeline.

    Coordinates multiple scrapers to pull documentation and operational
    intelligence from various sources.
    """

    def __init__(self, storage_dir: Optional[str] = None):
        self.storage_dir = Path(storage_dir or Path(__file__).parent / "storage")
        self.storage_dir.mkdir(parents=True, exist_ok=True)

        self.sources: Dict[str, IntelSource] = {}
        self.scrapers: Dict[SourceType, IntelScraper] = {
            SourceType.NOTION: NotionIntelScraper(),
        }
        self.results: List[IntelResult] = []

    def add_source(self, source: IntelSource) -> None:
        """Register an intelligence source."""
        self.sources[source.source_id] = source
        print(f"[INTEL] Added source: {source.name} ({source.source_type.value})")

    def add_notion_source(
        self,
        name: str,
        page_ids: Optional[List[str]] = None,
        database_id: Optional[str] = None,
        workspace_root_page_id: Optional[str] = None,
        priority: int = 0,
    ) -> str:
        """Convenience method to add a Notion source."""
        source_id = f"notion_{name.lower().replace(' ', '_')}"
        source = IntelSource(
            source_type=SourceType.NOTION,
            source_id=source_id,
            name=name,
            config={
                "page_ids": page_ids or [],
                "database_id": database_id,
                "workspace_root_page_id": workspace_root_page_id,
                "generate_embeddings": True,
            },
            priority=priority,
        )
        self.add_source(source)
        return source_id

    async def run_source(self, source_id: str) -> IntelResult:
        """Run scraper for a single source."""
        source = self.sources.get(source_id)
        if not source:
            return IntelResult(
                source_id=source_id,
                status=IntelStatus.FAILED,
                errors=[f"Source not found: {source_id}"],
            )

        if not source.enabled:
            return IntelResult(
                source_id=source_id,
                status=IntelStatus.PENDING,
                errors=["Source is disabled"],
            )

        scraper = self.scrapers.get(source.source_type)
        if not scraper:
            return IntelResult(
                source_id=source_id,
                status=IntelStatus.FAILED,
                errors=[f"No scraper available for: {source.source_type.value}"],
            )

        print(f"[INTEL] Running scraper for: {source.name}")

        # Check health
        if not await scraper.health_check():
            return IntelResult(
                source_id=source_id,
                status=IntelStatus.FAILED,
                errors=["Scraper service not available"],
            )

        # Run scrape
        config = {**source.config, "source_id": source_id}
        result = await scraper.scrape(config)

        # Update source metadata
        source.last_scraped = result.timestamp
        source.chunk_count = result.chunks_created

        # Store result
        self.results.append(result)
        self._save_result(result)

        return result

    async def run_all(self) -> List[IntelResult]:
        """Run all enabled sources in priority order."""
        print(f"[INTEL] Starting pipeline with {len(self.sources)} sources")

        # Sort by priority
        sorted_sources = sorted(
            self.sources.values(),
            key=lambda s: s.priority,
            reverse=True,
        )

        results = []
        for source in sorted_sources:
            if source.enabled:
                result = await self.run_source(source.source_id)
                results.append(result)
                print(f"[INTEL] {source.name}: {result.status.value} "
                      f"({result.documents_scraped} docs, {result.chunks_created} chunks)")

        self._save_manifest()
        return results

    def _save_result(self, result: IntelResult) -> None:
        """Save result to storage."""
        result_file = self.storage_dir / f"{result.source_id}_{result.timestamp.replace(':', '-')}.json"
        with open(result_file, "w") as f:
            json.dump({
                "source_id": result.source_id,
                "status": result.status.value,
                "documents_scraped": result.documents_scraped,
                "chunks_created": result.chunks_created,
                "embeddings_generated": result.embeddings_generated,
                "errors": result.errors,
                "timestamp": result.timestamp,
                "storage_location": result.storage_location,
                "provenance": result.provenance,
            }, f, indent=2)

    def _save_manifest(self) -> None:
        """Save source manifest."""
        manifest = {
            "sources": {
                sid: {
                    "type": s.source_type.value,
                    "name": s.name,
                    "enabled": s.enabled,
                    "priority": s.priority,
                    "last_scraped": s.last_scraped,
                    "chunk_count": s.chunk_count,
                }
                for sid, s in self.sources.items()
            },
            "last_run": datetime.now().isoformat(),
            "total_results": len(self.results),
        }
        with open(self.storage_dir / "manifest.json", "w") as f:
            json.dump(manifest, f, indent=2)

    def get_statistics(self) -> Dict[str, Any]:
        """Get pipeline statistics."""
        total_docs = sum(r.documents_scraped for r in self.results)
        total_chunks = sum(r.chunks_created for r in self.results)
        total_embeddings = sum(r.embeddings_generated for r in self.results)
        successful = sum(1 for r in self.results if r.status == IntelStatus.COMPLETED)
        failed = sum(1 for r in self.results if r.status == IntelStatus.FAILED)

        return {
            "sources_registered": len(self.sources),
            "sources_enabled": sum(1 for s in self.sources.values() if s.enabled),
            "total_scrapes": len(self.results),
            "successful_scrapes": successful,
            "failed_scrapes": failed,
            "total_documents": total_docs,
            "total_chunks": total_chunks,
            "total_embeddings": total_embeddings,
        }


# -----------------------------------------------------------------------------
# CLI Interface
# -----------------------------------------------------------------------------
async def main():
    """Example usage of the Recon Intel Pipeline."""
    import argparse

    parser = argparse.ArgumentParser(description="Recon Intel Pipeline")
    parser.add_argument("--notion-page", "-p", action="append", help="Notion page ID to scrape")
    parser.add_argument("--notion-database", "-d", help="Notion database ID to scrape")
    parser.add_argument("--notion-root", "-r", help="Notion workspace root page ID")
    parser.add_argument("--name", "-n", default="default", help="Source name")
    parser.add_argument("--stats", action="store_true", help="Show statistics only")
    args = parser.parse_args()

    pipeline = ReconIntelPipeline()

    if args.stats:
        print(json.dumps(pipeline.get_statistics(), indent=2))
        return

    if not any([args.notion_page, args.notion_database, args.notion_root]):
        print("Provide at least one of: --notion-page, --notion-database, --notion-root")
        print("\nExample:")
        print("  python recon_intel_pipeline.py -p abc123def456 -n 'My Docs'")
        print("  python recon_intel_pipeline.py -d xyz789abc123 -n 'Knowledge Base'")
        return

    # Add the source
    pipeline.add_notion_source(
        name=args.name,
        page_ids=args.notion_page or [],
        database_id=args.notion_database,
        workspace_root_page_id=args.notion_root,
    )

    # Run pipeline
    results = await pipeline.run_all()

    # Summary
    print("\n" + "=" * 50)
    print("PIPELINE COMPLETE")
    print("=" * 50)
    stats = pipeline.get_statistics()
    print(f"Documents scraped: {stats['total_documents']}")
    print(f"Chunks created:    {stats['total_chunks']}")
    print(f"Embeddings:        {stats['total_embeddings']}")
    print(f"Success rate:      {stats['successful_scrapes']}/{stats['total_scrapes']}")


if __name__ == "__main__":
    asyncio.run(main())
