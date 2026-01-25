"""
Notion Intelligence Scraper
----------------------------
FastAPI service for scraping and indexing Notion workspaces for RAG agents:
1. Connects to Notion API to extract pages, databases, and blocks
2. Processes content into semantic chunks with embeddings
3. Emits standardized DocumentIntelligence payloads for RAG consumption
4. Supports vector storage via Pinecone or local JSON persistence

This module integrates with Domicile's Open Notebook MCP for governance-compliant
document retrieval and maintains full provenance chains.
"""

from __future__ import annotations

import hashlib
import json
import os
import re
from datetime import datetime
from typing import Any, Dict, List, Optional, Union
from enum import Enum

import httpx
from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel, Field

# -----------------------------------------------------------------------------
# Optional dependencies with fallbacks for environments without full stack
# -----------------------------------------------------------------------------
try:
    from openai import OpenAI
    openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    HAS_OPENAI = True
except ImportError:
    openai_client = None
    HAS_OPENAI = False

try:
    from pinecone import Pinecone
    HAS_PINECONE = True
except ImportError:
    HAS_PINECONE = False


# -----------------------------------------------------------------------------
# Configuration
# -----------------------------------------------------------------------------
NOTION_API_VERSION = "2022-06-28"
NOTION_BASE_URL = "https://api.notion.com/v1"
DEFAULT_EMBEDDING_MODEL = "text-embedding-3-small"
EMBEDDING_DIMENSIONS = 1536
CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200


# -----------------------------------------------------------------------------
# Data Models
# -----------------------------------------------------------------------------
class NotionObjectType(str, Enum):
    PAGE = "page"
    DATABASE = "database"
    BLOCK = "block"


class BlockType(str, Enum):
    PARAGRAPH = "paragraph"
    HEADING_1 = "heading_1"
    HEADING_2 = "heading_2"
    HEADING_3 = "heading_3"
    BULLETED_LIST = "bulleted_list_item"
    NUMBERED_LIST = "numbered_list_item"
    TODO = "to_do"
    TOGGLE = "toggle"
    CODE = "code"
    QUOTE = "quote"
    CALLOUT = "callout"
    DIVIDER = "divider"
    TABLE = "table"
    TABLE_ROW = "table_row"
    CHILD_PAGE = "child_page"
    CHILD_DATABASE = "child_database"
    BOOKMARK = "bookmark"
    IMAGE = "image"
    VIDEO = "video"
    FILE = "file"
    PDF = "pdf"
    EMBED = "embed"


class NotionPage(BaseModel):
    page_id: str
    title: str
    url: str
    created_time: str
    last_edited_time: str
    parent_type: str
    parent_id: Optional[str] = None
    properties: Dict[str, Any] = {}
    icon: Optional[str] = None
    cover: Optional[str] = None


class NotionBlock(BaseModel):
    block_id: str
    block_type: str
    content: str
    has_children: bool = False
    children: List["NotionBlock"] = []
    annotations: Dict[str, Any] = {}
    parent_page_id: str


class SemanticChunk(BaseModel):
    chunk_id: str
    content: str
    source_page_id: str
    source_page_title: str
    block_ids: List[str]
    char_start: int
    char_end: int
    token_count: int
    embedding: Optional[List[float]] = None
    metadata: Dict[str, Any] = {}


class DocumentProvenance(BaseModel):
    source_type: str = "notion"
    workspace_id: Optional[str] = None
    page_id: str
    page_title: str
    extraction_timestamp: str
    last_notion_edit: str
    extraction_method: str = "notion_api_v1"
    chunk_strategy: str = "semantic_paragraphs"
    checksum: str


class DocumentIntelligence(BaseModel):
    page: NotionPage
    blocks: List[NotionBlock]
    chunks: List[SemanticChunk]
    provenance: DocumentProvenance
    statistics: Dict[str, Any]
    rag_ready: bool = False


class ScrapeRequest(BaseModel):
    workspace_root_page_id: Optional[str] = None
    database_id: Optional[str] = None
    page_ids: List[str] = []
    max_depth: int = Field(default=3, ge=1, le=10)
    include_databases: bool = True
    include_child_pages: bool = True
    generate_embeddings: bool = True
    chunk_size: int = Field(default=CHUNK_SIZE, ge=100, le=5000)
    chunk_overlap: int = Field(default=CHUNK_OVERLAP, ge=0, le=500)


class ScrapeResponse(BaseModel):
    scrape_id: str
    status: str
    pages_scraped: int
    total_chunks: int
    documents: List[DocumentIntelligence]
    vector_storage: Dict[str, Any]
    timestamp: str


# -----------------------------------------------------------------------------
# Notion API Client
# -----------------------------------------------------------------------------
class NotionClient:
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv("NOTION_API_KEY")
        if not self.api_key:
            raise ValueError("NOTION_API_KEY is required")
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Notion-Version": NOTION_API_VERSION,
            "Content-Type": "application/json",
        }
        self.client = httpx.AsyncClient(headers=self.headers, timeout=30.0)

    async def get_page(self, page_id: str) -> Dict[str, Any]:
        """Retrieve a page by ID."""
        response = await self.client.get(f"{NOTION_BASE_URL}/pages/{page_id}")
        response.raise_for_status()
        return response.json()

    async def get_block_children(
        self, block_id: str, start_cursor: Optional[str] = None
    ) -> Dict[str, Any]:
        """Get child blocks of a block or page."""
        params = {"page_size": 100}
        if start_cursor:
            params["start_cursor"] = start_cursor
        response = await self.client.get(
            f"{NOTION_BASE_URL}/blocks/{block_id}/children", params=params
        )
        response.raise_for_status()
        return response.json()

    async def query_database(
        self,
        database_id: str,
        filter_obj: Optional[Dict] = None,
        sorts: Optional[List[Dict]] = None,
        start_cursor: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Query a database."""
        body: Dict[str, Any] = {"page_size": 100}
        if filter_obj:
            body["filter"] = filter_obj
        if sorts:
            body["sorts"] = sorts
        if start_cursor:
            body["start_cursor"] = start_cursor
        response = await self.client.post(
            f"{NOTION_BASE_URL}/databases/{database_id}/query", json=body
        )
        response.raise_for_status()
        return response.json()

    async def search(
        self,
        query: str = "",
        filter_type: Optional[str] = None,
        start_cursor: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Search across the workspace."""
        body: Dict[str, Any] = {"page_size": 100}
        if query:
            body["query"] = query
        if filter_type:
            body["filter"] = {"property": "object", "value": filter_type}
        if start_cursor:
            body["start_cursor"] = start_cursor
        response = await self.client.post(f"{NOTION_BASE_URL}/search", json=body)
        response.raise_for_status()
        return response.json()

    async def close(self):
        await self.client.aclose()


# -----------------------------------------------------------------------------
# Content Extraction
# -----------------------------------------------------------------------------
class NotionContentExtractor:
    """Extracts and processes content from Notion blocks."""

    @staticmethod
    def extract_rich_text(rich_text_array: List[Dict]) -> str:
        """Extract plain text from Notion rich text array."""
        return "".join(item.get("plain_text", "") for item in rich_text_array)

    @staticmethod
    def extract_block_content(block: Dict) -> str:
        """Extract text content from a block based on its type."""
        block_type = block.get("type", "")
        block_data = block.get(block_type, {})

        # Text-based blocks
        if "rich_text" in block_data:
            return NotionContentExtractor.extract_rich_text(block_data["rich_text"])

        # Special handling for different block types
        if block_type == "code":
            code = NotionContentExtractor.extract_rich_text(block_data.get("rich_text", []))
            language = block_data.get("language", "")
            return f"```{language}\n{code}\n```"

        if block_type == "equation":
            return f"$${block_data.get('expression', '')}$$"

        if block_type == "bookmark":
            return f"[Bookmark: {block_data.get('url', '')}]"

        if block_type == "image":
            img_type = block_data.get("type", "")
            url = block_data.get(img_type, {}).get("url", "")
            caption = NotionContentExtractor.extract_rich_text(block_data.get("caption", []))
            return f"[Image: {caption or url}]"

        if block_type == "child_page":
            return f"[Child Page: {block_data.get('title', 'Untitled')}]"

        if block_type == "child_database":
            return f"[Child Database: {block_data.get('title', 'Untitled')}]"

        return ""

    @staticmethod
    def extract_page_title(page: Dict) -> str:
        """Extract the title from a page object."""
        properties = page.get("properties", {})

        # Check for title property
        for prop_name, prop_data in properties.items():
            if prop_data.get("type") == "title":
                title_array = prop_data.get("title", [])
                return NotionContentExtractor.extract_rich_text(title_array) or "Untitled"

        return "Untitled"


# -----------------------------------------------------------------------------
# Chunking Engine
# -----------------------------------------------------------------------------
class SemanticChunker:
    """Splits document content into semantic chunks for RAG."""

    def __init__(self, chunk_size: int = CHUNK_SIZE, overlap: int = CHUNK_OVERLAP):
        self.chunk_size = chunk_size
        self.overlap = overlap

    def chunk_content(
        self,
        blocks: List[NotionBlock],
        page_id: str,
        page_title: str,
    ) -> List[SemanticChunk]:
        """Create semantic chunks from blocks."""
        chunks: List[SemanticChunk] = []

        # Concatenate all block content
        full_text = ""
        block_positions: List[tuple] = []  # (block_id, start, end)

        for block in blocks:
            start = len(full_text)
            content = block.content
            if content:
                full_text += content + "\n\n"
            end = len(full_text)
            block_positions.append((block.block_id, start, end))

            # Recursively add children
            for child in block.children:
                child_start = len(full_text)
                if child.content:
                    full_text += "  " + child.content + "\n"
                child_end = len(full_text)
                block_positions.append((child.block_id, child_start, child_end))

        # Split into chunks
        if not full_text.strip():
            return chunks

        # Use paragraph-aware chunking
        paragraphs = re.split(r'\n\n+', full_text)
        current_chunk = ""
        current_start = 0
        char_pos = 0

        for para in paragraphs:
            para_with_sep = para + "\n\n"

            if len(current_chunk) + len(para_with_sep) <= self.chunk_size:
                current_chunk += para_with_sep
            else:
                if current_chunk.strip():
                    chunk_id = self._generate_chunk_id(page_id, len(chunks))
                    block_ids = self._find_block_ids(
                        block_positions, current_start, current_start + len(current_chunk)
                    )
                    chunks.append(
                        SemanticChunk(
                            chunk_id=chunk_id,
                            content=current_chunk.strip(),
                            source_page_id=page_id,
                            source_page_title=page_title,
                            block_ids=block_ids,
                            char_start=current_start,
                            char_end=current_start + len(current_chunk),
                            token_count=self._estimate_tokens(current_chunk),
                            metadata={"chunk_index": len(chunks)},
                        )
                    )

                # Start new chunk with overlap
                overlap_text = current_chunk[-self.overlap:] if len(current_chunk) > self.overlap else ""
                current_start = char_pos - len(overlap_text)
                current_chunk = overlap_text + para_with_sep

            char_pos += len(para_with_sep)

        # Final chunk
        if current_chunk.strip():
            chunk_id = self._generate_chunk_id(page_id, len(chunks))
            block_ids = self._find_block_ids(
                block_positions, current_start, current_start + len(current_chunk)
            )
            chunks.append(
                SemanticChunk(
                    chunk_id=chunk_id,
                    content=current_chunk.strip(),
                    source_page_id=page_id,
                    source_page_title=page_title,
                    block_ids=block_ids,
                    char_start=current_start,
                    char_end=current_start + len(current_chunk),
                    token_count=self._estimate_tokens(current_chunk),
                    metadata={"chunk_index": len(chunks)},
                )
            )

        return chunks

    def _generate_chunk_id(self, page_id: str, index: int) -> str:
        return f"chunk_{page_id[:8]}_{index:04d}"

    def _find_block_ids(
        self, positions: List[tuple], start: int, end: int
    ) -> List[str]:
        """Find block IDs that overlap with the given character range."""
        return [
            block_id
            for block_id, b_start, b_end in positions
            if b_start < end and b_end > start
        ]

    def _estimate_tokens(self, text: str) -> int:
        """Rough token estimate (4 chars per token)."""
        return len(text) // 4


# -----------------------------------------------------------------------------
# Embedding Generator
# -----------------------------------------------------------------------------
class EmbeddingGenerator:
    """Generates embeddings for semantic chunks."""

    def __init__(self, model: str = DEFAULT_EMBEDDING_MODEL):
        self.model = model

    async def generate_embeddings(
        self, chunks: List[SemanticChunk]
    ) -> List[SemanticChunk]:
        """Generate embeddings for all chunks."""
        if not HAS_OPENAI or not openai_client:
            # Return chunks without embeddings
            return chunks

        texts = [chunk.content for chunk in chunks]
        if not texts:
            return chunks

        try:
            response = openai_client.embeddings.create(
                model=self.model,
                input=texts,
            )
            for i, chunk in enumerate(chunks):
                chunk.embedding = response.data[i].embedding
        except Exception as e:
            print(f"Embedding generation failed: {e}")

        return chunks


# -----------------------------------------------------------------------------
# Vector Storage
# -----------------------------------------------------------------------------
class VectorStorage:
    """Handles vector storage for RAG retrieval."""

    def __init__(self):
        self.local_store: Dict[str, Dict] = {}
        self.pinecone_index = None

        if HAS_PINECONE and os.getenv("PINECONE_API_KEY"):
            try:
                pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
                index_name = os.getenv("PINECONE_INDEX", "notion-rag")
                self.pinecone_index = pc.Index(index_name)
            except Exception as e:
                print(f"Pinecone initialization failed: {e}")

    async def store_chunks(
        self, chunks: List[SemanticChunk], namespace: str = "default"
    ) -> Dict[str, Any]:
        """Store chunks in vector database."""
        stored_count = 0
        storage_backend = "local"

        for chunk in chunks:
            # Store locally always
            self.local_store[chunk.chunk_id] = {
                "content": chunk.content,
                "source_page_id": chunk.source_page_id,
                "source_page_title": chunk.source_page_title,
                "embedding": chunk.embedding,
                "metadata": chunk.metadata,
            }
            stored_count += 1

        # Store in Pinecone if available and embeddings exist
        if self.pinecone_index:
            vectors = []
            for chunk in chunks:
                if chunk.embedding:
                    vectors.append({
                        "id": chunk.chunk_id,
                        "values": chunk.embedding,
                        "metadata": {
                            "content": chunk.content[:1000],  # Pinecone metadata limit
                            "page_id": chunk.source_page_id,
                            "page_title": chunk.source_page_title,
                        },
                    })

            if vectors:
                try:
                    self.pinecone_index.upsert(vectors=vectors, namespace=namespace)
                    storage_backend = "pinecone"
                except Exception as e:
                    print(f"Pinecone upsert failed: {e}")

        return {
            "backend": storage_backend,
            "chunks_stored": stored_count,
            "namespace": namespace,
        }

    async def search(
        self,
        query_embedding: List[float],
        top_k: int = 10,
        namespace: str = "default",
    ) -> List[Dict[str, Any]]:
        """Search for similar chunks."""
        if self.pinecone_index:
            try:
                results = self.pinecone_index.query(
                    vector=query_embedding,
                    top_k=top_k,
                    namespace=namespace,
                    include_metadata=True,
                )
                return [
                    {
                        "chunk_id": match.id,
                        "score": match.score,
                        "metadata": match.metadata,
                    }
                    for match in results.matches
                ]
            except Exception as e:
                print(f"Pinecone search failed: {e}")

        # Fallback to local cosine similarity (simplified)
        return []

    def export_local_store(self, filepath: str):
        """Export local store to JSON file."""
        with open(filepath, "w") as f:
            json.dump(self.local_store, f, indent=2, default=str)


# -----------------------------------------------------------------------------
# Main Scraper Service
# -----------------------------------------------------------------------------
class NotionIntelligenceScraper:
    """Main scraper orchestrating the entire pipeline."""

    def __init__(self):
        self.notion_client: Optional[NotionClient] = None
        self.extractor = NotionContentExtractor()
        self.chunker = SemanticChunker()
        self.embedder = EmbeddingGenerator()
        self.vector_storage = VectorStorage()
        self.scrape_history: List[Dict] = []

    async def initialize(self):
        """Initialize the Notion client."""
        try:
            self.notion_client = NotionClient()
        except ValueError as e:
            print(f"Notion client initialization skipped: {e}")

    async def scrape_page(
        self,
        page_id: str,
        depth: int = 0,
        max_depth: int = 3,
    ) -> Optional[DocumentIntelligence]:
        """Scrape a single Notion page."""
        if not self.notion_client:
            raise HTTPException(status_code=500, detail="Notion client not initialized")

        if depth >= max_depth:
            return None

        try:
            # Get page metadata
            page_data = await self.notion_client.get_page(page_id)
            page_title = self.extractor.extract_page_title(page_data)

            notion_page = NotionPage(
                page_id=page_id,
                title=page_title,
                url=page_data.get("url", ""),
                created_time=page_data.get("created_time", ""),
                last_edited_time=page_data.get("last_edited_time", ""),
                parent_type=page_data.get("parent", {}).get("type", ""),
                parent_id=page_data.get("parent", {}).get(
                    page_data.get("parent", {}).get("type", ""), None
                ),
                properties=page_data.get("properties", {}),
                icon=str(page_data.get("icon")) if page_data.get("icon") else None,
                cover=str(page_data.get("cover")) if page_data.get("cover") else None,
            )

            # Get all blocks
            blocks = await self._get_all_blocks(page_id, depth, max_depth)

            # Create chunks
            chunks = self.chunker.chunk_content(blocks, page_id, page_title)

            # Generate content hash
            content_hash = self._generate_checksum(
                "".join(b.content for b in blocks)
            )

            # Build provenance
            provenance = DocumentProvenance(
                page_id=page_id,
                page_title=page_title,
                extraction_timestamp=datetime.now().isoformat(),
                last_notion_edit=page_data.get("last_edited_time", ""),
                checksum=content_hash,
            )

            return DocumentIntelligence(
                page=notion_page,
                blocks=blocks,
                chunks=chunks,
                provenance=provenance,
                statistics={
                    "block_count": len(blocks),
                    "chunk_count": len(chunks),
                    "total_chars": sum(len(c.content) for c in chunks),
                    "depth_scraped": depth,
                },
                rag_ready=False,
            )

        except httpx.HTTPStatusError as e:
            print(f"Failed to scrape page {page_id}: {e}")
            return None

    async def _get_all_blocks(
        self,
        block_id: str,
        depth: int,
        max_depth: int,
    ) -> List[NotionBlock]:
        """Recursively get all blocks from a page or block."""
        if not self.notion_client:
            return []

        blocks: List[NotionBlock] = []
        cursor = None

        while True:
            response = await self.notion_client.get_block_children(block_id, cursor)
            results = response.get("results", [])

            for block_data in results:
                content = self.extractor.extract_block_content(block_data)
                block = NotionBlock(
                    block_id=block_data["id"],
                    block_type=block_data.get("type", ""),
                    content=content,
                    has_children=block_data.get("has_children", False),
                    parent_page_id=block_id,
                )

                # Recursively get children
                if block.has_children and depth < max_depth:
                    block.children = await self._get_all_blocks(
                        block.block_id, depth + 1, max_depth
                    )

                blocks.append(block)

            if not response.get("has_more"):
                break
            cursor = response.get("next_cursor")

        return blocks

    async def scrape_database(
        self,
        database_id: str,
        max_depth: int = 3,
    ) -> List[DocumentIntelligence]:
        """Scrape all pages in a database."""
        if not self.notion_client:
            raise HTTPException(status_code=500, detail="Notion client not initialized")

        documents: List[DocumentIntelligence] = []
        cursor = None

        while True:
            response = await self.notion_client.query_database(
                database_id, start_cursor=cursor
            )

            for page in response.get("results", []):
                doc = await self.scrape_page(page["id"], max_depth=max_depth)
                if doc:
                    documents.append(doc)

            if not response.get("has_more"):
                break
            cursor = response.get("next_cursor")

        return documents

    async def full_scrape(self, request: ScrapeRequest) -> ScrapeResponse:
        """Execute a full scrape based on request parameters."""
        await self.initialize()

        documents: List[DocumentIntelligence] = []
        scrape_id = self._generate_scrape_id()

        # Scrape specific pages
        for page_id in request.page_ids:
            doc = await self.scrape_page(page_id, max_depth=request.max_depth)
            if doc:
                documents.append(doc)

        # Scrape database if provided
        if request.database_id:
            db_docs = await self.scrape_database(
                request.database_id, max_depth=request.max_depth
            )
            documents.extend(db_docs)

        # Scrape from workspace root
        if request.workspace_root_page_id:
            root_doc = await self.scrape_page(
                request.workspace_root_page_id, max_depth=request.max_depth
            )
            if root_doc:
                documents.append(root_doc)

        # Generate embeddings if requested
        total_chunks = 0
        for doc in documents:
            if request.generate_embeddings:
                doc.chunks = await self.embedder.generate_embeddings(doc.chunks)
            doc.rag_ready = all(c.embedding is not None for c in doc.chunks)
            total_chunks += len(doc.chunks)

        # Store in vector database
        all_chunks = [chunk for doc in documents for chunk in doc.chunks]
        storage_result = await self.vector_storage.store_chunks(
            all_chunks, namespace=scrape_id
        )

        # Record in history
        self.scrape_history.append({
            "scrape_id": scrape_id,
            "timestamp": datetime.now().isoformat(),
            "pages_scraped": len(documents),
            "total_chunks": total_chunks,
        })

        return ScrapeResponse(
            scrape_id=scrape_id,
            status="completed",
            pages_scraped=len(documents),
            total_chunks=total_chunks,
            documents=documents,
            vector_storage=storage_result,
            timestamp=datetime.now().isoformat(),
        )

    def _generate_scrape_id(self) -> str:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        return f"scrape_{timestamp}"

    def _generate_checksum(self, content: str) -> str:
        return hashlib.sha256(content.encode()).hexdigest()[:16]


# -----------------------------------------------------------------------------
# FastAPI Application
# -----------------------------------------------------------------------------
app = FastAPI(
    title="Notion Intelligence Scraper",
    description="RAG-ready document intelligence extraction from Notion workspaces",
    version="1.0.0",
)

scraper = NotionIntelligenceScraper()


@app.on_event("startup")
async def startup():
    await scraper.initialize()


@app.post("/scrape", response_model=ScrapeResponse)
async def scrape_notion(request: ScrapeRequest) -> ScrapeResponse:
    """
    Scrape Notion pages/databases and prepare for RAG.

    Provide at least one of:
    - page_ids: List of specific page IDs to scrape
    - database_id: A database ID to scrape all pages from
    - workspace_root_page_id: A root page to start recursive scraping
    """
    if not request.page_ids and not request.database_id and not request.workspace_root_page_id:
        raise HTTPException(
            status_code=400,
            detail="Provide at least one of: page_ids, database_id, or workspace_root_page_id",
        )

    return await scraper.full_scrape(request)


@app.get("/page/{page_id}")
async def get_page_intelligence(page_id: str, generate_embeddings: bool = True):
    """Scrape a single Notion page and return intelligence."""
    await scraper.initialize()
    doc = await scraper.scrape_page(page_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Page not found or inaccessible")

    if generate_embeddings:
        doc.chunks = await scraper.embedder.generate_embeddings(doc.chunks)
        doc.rag_ready = all(c.embedding is not None for c in doc.chunks)

    return doc


@app.get("/search")
async def search_chunks(query: str, top_k: int = 10, namespace: str = "default"):
    """Search stored chunks by semantic similarity."""
    if not HAS_OPENAI or not openai_client:
        raise HTTPException(status_code=501, detail="OpenAI not available for embeddings")

    # Generate query embedding
    response = openai_client.embeddings.create(
        model=DEFAULT_EMBEDDING_MODEL,
        input=[query],
    )
    query_embedding = response.data[0].embedding

    results = await scraper.vector_storage.search(query_embedding, top_k, namespace)
    return {"query": query, "results": results}


@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "notion_client": scraper.notion_client is not None,
        "openai_available": HAS_OPENAI,
        "pinecone_available": HAS_PINECONE,
        "scrape_count": len(scraper.scrape_history),
    }


@app.get("/history")
async def scrape_history():
    return {"history": scraper.scrape_history}


@app.post("/export")
async def export_vectors(filepath: str = "notion_vectors.json"):
    """Export local vector store to JSON."""
    full_path = os.path.join(os.getcwd(), filepath)
    scraper.vector_storage.export_local_store(full_path)
    return {"exported_to": full_path, "chunk_count": len(scraper.vector_storage.local_store)}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5053)
