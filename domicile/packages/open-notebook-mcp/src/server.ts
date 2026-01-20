#!/usr/bin/env node
/**
 * Open Notebook MCP Server
 * Read-only knowledge jurisdiction governed by Domicile invariants
 *
 * Exactly 11 affordances, no dynamic invention, full provenance
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  type CallToolRequest,
} from '@modelcontextprotocol/sdk/types.js';

import { SessionContext } from './state/context.js';
import { MockNotebookStorage } from './storage/notebooks.js';
import { MockVectorSearch } from './storage/vectors.js';
import { MockArtifactStorage } from './storage/artifacts.js';

import { describeWorld, listConstraints } from './tools/world.js';
import { listCollections, enterCollection } from './tools/collections.js';
import { listArtifactSets, retrieveArtifact } from './tools/artifacts.js';
import { semanticSearch, fetchPassage } from './tools/retrieval.js';
import { beginResultStream, nextStreamChunk } from './tools/streaming.js';
import { explainProvenance } from './tools/provenance.js';

/**
 * MCP Server Configuration
 */
const SERVER_NAME = 'open-notebook';
const SERVER_VERSION = '0.1.0';

/**
 * Create and configure the MCP server
 */
async function main() {
  // Initialize session context (SAFE by default - no collection loaded)
  const sessionContext = new SessionContext();

  // Initialize storage adapters (mock implementations)
  const notebookStorage = new MockNotebookStorage();
  const vectorSearch = new MockVectorSearch();
  const artifactStorage = new MockArtifactStorage();

  // Create MCP server
  const server = new Server(
    {
      name: SERVER_NAME,
      version: SERVER_VERSION,
    },
    {
      capabilities: {
        tools: {},
      },
    },
  );

  /**
   * ListTools Handler
   * Returns all 11 affordances with metadata
   */
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: 'describe_world',
          description:
            'Returns the purpose, boundaries, prohibitions, and requirements of the Open Notebook world',
          inputSchema: {
            type: 'object',
            properties: {},
            required: [],
          },
        },
        {
          name: 'list_constraints',
          description:
            'Returns mutation prohibitions, scope limits, citation requirements, and refusal conditions',
          inputSchema: {
            type: 'object',
            properties: {},
            required: [],
          },
        },
        {
          name: 'list_collections',
          description:
            'Returns available notebook collections with metadata, no content',
          inputSchema: {
            type: 'object',
            properties: {},
            required: [],
          },
        },
        {
          name: 'enter_collection',
          description:
            'Establishes active collection context, restricting all subsequent operations',
          inputSchema: {
            type: 'object',
            properties: {
              collection_id: {
                type: 'string',
                description: 'Collection identifier from list_collections',
              },
            },
            required: ['collection_id'],
          },
        },
        {
          name: 'list_artifact_sets',
          description:
            'Returns artifact sets derived from the active collection',
          inputSchema: {
            type: 'object',
            properties: {},
            required: [],
          },
        },
        {
          name: 'semantic_search',
          description:
            'Returns ranked reference identifiers for semantic query within active collection',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'Natural language query',
              },
              k: {
                type: 'number',
                description: 'Maximum results (default 10, max 50)',
                default: 10,
              },
            },
            required: ['query'],
          },
        },
        {
          name: 'fetch_passage',
          description:
            'Retrieves exact quoted passage with bounded context from source',
          inputSchema: {
            type: 'object',
            properties: {
              source_id: {
                type: 'string',
                description: 'Reference identifier from semantic_search',
              },
            },
            required: ['source_id'],
          },
        },
        {
          name: 'retrieve_artifact',
          description:
            'Retrieves full artifact contents with provenance and non-authoritative disclaimer',
          inputSchema: {
            type: 'object',
            properties: {
              artifact_id: {
                type: 'string',
                description: 'Artifact identifier from list_artifact_sets',
              },
            },
            required: ['artifact_id'],
          },
        },
        {
          name: 'begin_result_stream',
          description:
            'Initiates a pull-based result stream for progressive disclosure',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'Search query for streaming results',
              },
            },
            required: ['query'],
          },
        },
        {
          name: 'next_stream_chunk',
          description: 'Retrieves next chunk from active result stream',
          inputSchema: {
            type: 'object',
            properties: {
              stream_token: {
                type: 'string',
                description: 'Stream token from begin_result_stream',
              },
            },
            required: ['stream_token'],
          },
        },
        {
          name: 'explain_provenance',
          description:
            'Returns origin, transformation steps, tools, and confidence notes for a source or artifact',
          inputSchema: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'Source ID or artifact ID',
              },
              id_type: {
                type: 'string',
                enum: ['source', 'artifact'],
                description: 'Type of identifier',
              },
            },
            required: ['id', 'id_type'],
          },
        },
      ],
    };
  });

  /**
   * CallTool Handler
   * Routes to appropriate tool implementation
   * All errors include recovery guidance
   */
  server.setRequestHandler(
    CallToolRequestSchema,
    async (request: CallToolRequest) => {
      const { name, arguments: args } = request.params;

      try {
        let result: unknown;

        switch (name) {
          case 'describe_world':
            result = describeWorld();
            break;

          case 'list_constraints':
            result = listConstraints();
            break;

          case 'list_collections':
            result = await listCollections(notebookStorage);
            break;

          case 'enter_collection':
            if (!args || typeof args.collection_id !== 'string') {
              throw createMcpError(
                ErrorCode.InvalidParams,
                'collection_id is required',
              );
            }
            result = await enterCollection(
              args.collection_id,
              sessionContext,
              notebookStorage,
            );
            break;

          case 'list_artifact_sets':
            result = await listArtifactSets(sessionContext, artifactStorage);
            break;

          case 'semantic_search':
            if (!args || typeof args.query !== 'string') {
              throw createMcpError(
                ErrorCode.InvalidParams,
                'query is required',
              );
            }
            result = await semanticSearch(
              args.query,
              typeof args.k === 'number' ? args.k : 10,
              sessionContext,
              vectorSearch,
            );
            break;

          case 'fetch_passage':
            if (!args || typeof args.source_id !== 'string') {
              throw createMcpError(
                ErrorCode.InvalidParams,
                'source_id is required',
              );
            }
            result = await fetchPassage(
              args.source_id,
              sessionContext,
              notebookStorage,
            );
            break;

          case 'retrieve_artifact':
            if (!args || typeof args.artifact_id !== 'string') {
              throw createMcpError(
                ErrorCode.InvalidParams,
                'artifact_id is required',
              );
            }
            result = await retrieveArtifact(
              args.artifact_id,
              sessionContext,
              artifactStorage,
            );
            break;

          case 'begin_result_stream':
            if (!args || typeof args.query !== 'string') {
              throw createMcpError(
                ErrorCode.InvalidParams,
                'query is required',
              );
            }
            result = await beginResultStream(
              args.query,
              sessionContext,
              vectorSearch,
            );
            break;

          case 'next_stream_chunk':
            if (!args || typeof args.stream_token !== 'string') {
              throw createMcpError(
                ErrorCode.InvalidParams,
                'stream_token is required',
              );
            }
            result = await nextStreamChunk(
              args.stream_token,
              sessionContext,
              vectorSearch,
            );
            break;

          case 'explain_provenance':
            if (
              !args ||
              typeof args.id !== 'string' ||
              !['source', 'artifact'].includes(String(args.id_type))
            ) {
              throw createMcpError(
                ErrorCode.InvalidParams,
                'id and id_type (source|artifact) are required',
              );
            }
            result = await explainProvenance(
              args.id,
              args.id_type as 'source' | 'artifact',
              notebookStorage,
              artifactStorage,
            );
            break;

          default:
            throw createMcpError(
              ErrorCode.MethodNotFound,
              `Unknown tool: ${name}`,
            );
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        // Handle custom error responses from tools
        if (error && typeof error === 'object' && 'errorResponse' in error) {
          const errorResponse = (
            error as {
              errorResponse: {
                error: { type: string; message: string; recovery?: string };
              };
            }
          ).errorResponse;
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(errorResponse, null, 2),
              },
            ],
            isError: true,
          };
        }

        // Re-throw MCP errors
        if (error && typeof error === 'object' && 'code' in error) {
          throw error;
        }

        // Wrap unknown errors
        throw createMcpError(
          ErrorCode.InternalError,
          error instanceof Error ? error.message : 'Unknown error',
        );
      }
    },
  );

  // Start server
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('[Open Notebook MCP] Started in SAFE mode');
  console.error('[Open Notebook MCP] No collection context loaded');
  console.error('[Open Notebook MCP] 11 affordances available');
}

/**
 * Helper to create MCP-compliant errors
 */
function createMcpError(code: number, message: string): Error {
  const error = new Error(message);
  (error as Error & { code: number }).code = code;
  return error;
}

// Start the server
main().catch((error) => {
  console.error('[Open Notebook MCP] Fatal error:', error);
  process.exit(1);
});
