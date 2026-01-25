# Notion Intelligence Scraper

RAG-ready document intelligence extraction from Notion workspaces. Part of the Domicile recon/intel pipeline for document scraping.

## Overview

This service connects to the Notion API to:
1. Extract pages, databases, and blocks from a Notion workspace
2. Process content into semantic chunks with configurable sizing
3. Generate embeddings via OpenAI for vector similarity search
4. Store in Pinecone (or local JSON) for RAG retrieval
5. Integrate with Open Notebook MCP for governance-compliant access

## Quick Start

### 1. Environment Setup

```bash
# Required
export NOTION_API_KEY="your-notion-integration-token"

# Optional - for embeddings
export OPENAI_API_KEY="your-openai-key"

# Optional - for Pinecone storage
export PINECONE_API_KEY="your-pinecone-key"
export PINECONE_INDEX="notion-rag"
```

### 2. Notion Integration Setup

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Create a new integration
3. Copy the Internal Integration Token
4. Share the pages/databases you want to scrape with your integration

### 3. Run the Scraper

```bash
cd examples/notion-rag
pip install -r requirements.txt
python notion_intelligence_scraper.py
```

Server runs on `http://localhost:5053`

## API Endpoints

### POST /scrape
Full scrape with configurable options.

```bash
curl -X POST http://localhost:5053/scrape \
  -H "Content-Type: application/json" \
  -d '{
    "page_ids": ["page-id-1", "page-id-2"],
    "database_id": "optional-database-id",
    "max_depth": 3,
    "generate_embeddings": true,
    "chunk_size": 1000,
    "chunk_overlap": 200
  }'
```

### GET /page/{page_id}
Scrape a single page.

```bash
curl http://localhost:5053/page/your-page-id
```

### GET /search
Semantic search across stored chunks.

```bash
curl "http://localhost:5053/search?query=your%20query&top_k=10"
```

### POST /export
Export vectors to local JSON.

```bash
curl -X POST "http://localhost:5053/export?filepath=my_vectors.json"
```

### GET /health
Health check.

```bash
curl http://localhost:5053/health
```

## Integration with Open Notebook MCP

The Notion storage adapter (`domicile/packages/open-notebook-mcp/src/storage/notion.ts`) provides governance-compliant access:

```typescript
import { createNotionStorageAdapter } from './storage/notion.js';

const notionStorage = createNotionStorageAdapter({
  scraperUrl: 'http://localhost:5053',
  cacheEnabled: true,
  cacheTtlMs: 300000,
});

// Scrape and index pages
await notionStorage.scrapeAndIndex(['page-id-1', 'page-id-2']);

// List collections
const collections = await notionStorage.listCollections();

// Fetch a passage with provenance
const passage = await notionStorage.fetchPassage('page-id:chunk-id');

// Search chunks
const results = await notionStorage.searchChunks('your query', 10);
```

## Data Flow

```
Notion Workspace
       │
       ▼
┌──────────────────┐
│ Notion API       │
│ (pages/blocks)   │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│ Content Extractor│
│ (rich text parse)│
└──────────────────┘
       │
       ▼
┌──────────────────┐
│ Semantic Chunker │
│ (paragraph-aware)│
└──────────────────┘
       │
       ▼
┌──────────────────┐
│ Embedding Gen    │
│ (OpenAI)         │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│ Vector Storage   │
│ (Pinecone/JSON)  │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│ Open Notebook MCP│
│ (governance)     │
└──────────────────┘
       │
       ▼
   RAG Agents
```

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `NOTION_API_KEY` | required | Notion integration token |
| `OPENAI_API_KEY` | optional | For embedding generation |
| `PINECONE_API_KEY` | optional | For Pinecone vector storage |
| `PINECONE_INDEX` | `notion-rag` | Pinecone index name |

## Chunking Strategy

The semantic chunker:
- Splits on paragraph boundaries (`\n\n`)
- Maintains configurable overlap between chunks
- Tracks source block IDs for provenance
- Estimates token counts for context window management

Default settings:
- Chunk size: 1000 characters
- Chunk overlap: 200 characters

## Provenance Tracking

Every passage includes full provenance:
- Source page ID and title
- Extraction timestamp
- Last Notion edit time
- Content checksum for integrity verification
- Block-level attribution

## License

Part of Domicile. See repository root for license.
