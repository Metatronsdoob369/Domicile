# Intel - Intelligence Gathering Pipeline

Central hub for document scraping and knowledge extraction for RAG agents.

## Overview

The Intel pipeline coordinates multiple scrapers to pull documentation, knowledge bases, and operational intelligence from various sources into a unified format compatible with Domicile's Open Notebook MCP.

```
┌─────────────────────────────────────────────────────────────┐
│                    RECON INTEL PIPELINE                     │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│ Notion Scraper│    │  Web Scraper  │    │ GitHub Scraper│
│  (active)     │    │  (planned)    │    │  (planned)    │
└───────────────┘    └───────────────┘    └───────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              ▼
                    ┌───────────────────┐
                    │ Semantic Chunking │
                    └───────────────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Embedding Gen     │
                    │ (OpenAI)          │
                    └───────────────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Vector Storage    │
                    │ (Pinecone/Local)  │
                    └───────────────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Open Notebook MCP │
                    │ (governance)      │
                    └───────────────────┘
```

## Directory Structure

```
intel/
├── recon_intel_pipeline.py   # Main coordinator
├── scrapers/                  # Individual scraper implementations
├── storage/                   # Scrape results and manifests
├── pipelines/                 # Custom pipeline configurations
└── README.md
```

## Quick Start

### 1. Start the Notion Scraper Service

```bash
cd examples/notion-rag
export NOTION_API_KEY="your-notion-integration-token"
export OPENAI_API_KEY="your-openai-key"  # optional for embeddings
python notion_intelligence_scraper.py
```

### 2. Run the Pipeline

```bash
cd intel

# Scrape specific pages
python recon_intel_pipeline.py -p page-id-1 -p page-id-2 -n "My Knowledge Base"

# Scrape a database
python recon_intel_pipeline.py -d database-id -n "Documentation DB"

# Scrape from workspace root
python recon_intel_pipeline.py -r root-page-id -n "Full Workspace"

# Check statistics
python recon_intel_pipeline.py --stats
```

### 3. Programmatic Usage

```python
from recon_intel_pipeline import ReconIntelPipeline

# Create pipeline
pipeline = ReconIntelPipeline()

# Add Notion source
pipeline.add_notion_source(
    name="Product Documentation",
    database_id="abc123def456",
    priority=1,
)

pipeline.add_notion_source(
    name="Internal Wiki",
    page_ids=["page1", "page2", "page3"],
    priority=2,  # Higher priority runs first
)

# Run all sources
results = await pipeline.run_all()

# Get stats
stats = pipeline.get_statistics()
print(f"Total chunks: {stats['total_chunks']}")
```

## Supported Sources

| Source | Status | Description |
|--------|--------|-------------|
| Notion | Active | Pages, databases, blocks |
| Web | Planned | HTML documentation sites |
| GitHub | Planned | Repo docs, READMEs, wikis |
| API Docs | Planned | OpenAPI/Swagger specs |

## Output Format

All scrapers produce `IntelResult` objects with:

```python
{
    "source_id": "notion_my_docs",
    "status": "completed",
    "documents_scraped": 15,
    "chunks_created": 234,
    "embeddings_generated": 234,
    "timestamp": "2025-01-25T12:00:00",
    "storage_location": "pinecone",
    "provenance": {
        "scrape_id": "scrape_20250125_120000",
        "source_type": "notion"
    }
}
```

## Storage

Results are persisted to `intel/storage/`:
- Individual scrape results as timestamped JSON files
- `manifest.json` tracks all registered sources

## Integration with Open Notebook MCP

The Notion storage adapter connects scraped content to the governance-compliant retrieval system:

```typescript
import { createNotionStorageAdapter } from '@domicile/open-notebook-mcp';

const adapter = createNotionStorageAdapter({
  scraperUrl: 'http://localhost:5053',
});

// Scrape and index
await adapter.scrapeAndIndex(['page-id-1', 'page-id-2']);

// Search with semantic similarity
const results = await adapter.searchChunks('how to configure settings');

// Fetch with full provenance
const passage = await adapter.fetchPassage('page-id:chunk-id');
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NOTION_API_KEY` | Yes | Notion integration token |
| `OPENAI_API_KEY` | No | For embedding generation |
| `PINECONE_API_KEY` | No | For Pinecone vector storage |
| `PINECONE_INDEX` | No | Pinecone index name (default: `notion-rag`) |

## Adding New Scrapers

1. Create a new scraper class implementing `IntelScraper` protocol:

```python
class MyCustomScraper:
    async def health_check(self) -> bool:
        # Return True if service is available
        pass

    async def scrape(self, config: Dict[str, Any]) -> IntelResult:
        # Execute scrape and return results
        pass
```

2. Register in the pipeline:

```python
pipeline.scrapers[SourceType.MY_SOURCE] = MyCustomScraper()
```

## License

Part of Domicile. See repository root for license.
