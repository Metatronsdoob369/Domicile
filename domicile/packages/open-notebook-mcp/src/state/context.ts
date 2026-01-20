/**
 * Session Context Management
 * Enforces Domicile invariants: SAFE, Context, Exit
 */

import type { ErrorResponse } from '../types/responses.js';

export interface AccessRecord {
  timestamp: number;
  tool: string;
  collection_id: string | null;
  reference_ids: string[];
}

export interface StreamState {
  token: string;
  query: string;
  collection_id: string;
  created_at: number;
  current_step: string;
  completed_steps: string[];
  buffer: unknown[];
  expires_at: number;
}

/**
 * SessionContext enforces Domicile invariants:
 * - SAFE: Starts with no active collection (null)
 * - Context: Nothing loaded until explicit enter_collection
 * - Exit: Sovereign exit always available
 */
export class SessionContext {
  private activeCollection: string | null = null; // SAFE by default
  private readonly createdAt: number;
  private readonly accessLog: AccessRecord[] = [];
  private readonly streamStates = new Map<string, StreamState>();

  constructor() {
    this.createdAt = Date.now();
  }

  /**
   * Enter a collection context
   * Replaces any previous context (no accumulation)
   */
  enterCollection(collectionId: string): void {
    this.activeCollection = collectionId;
    this.logAccess('enter_collection', collectionId, []);
  }

  /**
   * Get active collection, enforcing context requirement
   * Throws if no collection context exists
   */
  requireCollection(): string {
    if (!this.activeCollection) {
      throw this.createError(
        'no_collection_context',
        'No active collection. Invoke enter_collection first.',
        'Call list_collections, then enter_collection',
      );
    }
    return this.activeCollection;
  }

  /**
   * Get active collection without throwing
   */
  getActiveCollection(): string | null {
    return this.activeCollection;
  }

  /**
   * Sovereign exit - clear all context
   * Domicile: Exit invariant
   */
  exit(): void {
    this.activeCollection = null;
    this.streamStates.clear();
    this.logAccess('exit', null, []);
  }

  /**
   * Log access for ephemeral audit trail
   */
  logAccess(
    tool: string,
    collectionId: string | null,
    referenceIds: string[],
  ): void {
    this.accessLog.push({
      timestamp: Date.now(),
      tool,
      collection_id: collectionId,
      reference_ids: referenceIds,
    });
  }

  /**
   * Get access log (session-ephemeral, not persisted)
   */
  getAccessLog(): readonly AccessRecord[] {
    return this.accessLog;
  }

  /**
   * Stream state management
   */
  createStream(token: string, query: string, collectionId: string): void {
    const state: StreamState = {
      token,
      query,
      collection_id: collectionId,
      created_at: Date.now(),
      current_step: 'reference_identifiers',
      completed_steps: [],
      buffer: [],
      expires_at: Date.now() + 300_000, // 5 minutes
    };
    this.streamStates.set(token, state);
  }

  getStream(token: string): StreamState {
    const state = this.streamStates.get(token);
    if (!state) {
      throw this.createError(
        'stream_token_invalid',
        'Stream token not found or expired',
        'Call begin_result_stream to create a new stream',
      );
    }
    if (Date.now() > state.expires_at) {
      this.streamStates.delete(token);
      throw this.createError(
        'stream_token_expired',
        'Stream token has expired (5 minute timeout)',
        'Call begin_result_stream to create a new stream',
      );
    }
    return state;
  }

  updateStream(token: string, updates: Partial<StreamState>): void {
    const state = this.getStream(token);
    Object.assign(state, updates);
  }

  deleteStream(token: string): void {
    this.streamStates.delete(token);
  }

  /**
   * Error factory with recovery guidance
   */
  private createError(
    type: ErrorResponse['error']['type'],
    message: string,
    recovery?: string,
  ): Error {
    const error = new Error(message) as Error & {
      errorResponse: ErrorResponse;
    };
    error.errorResponse = {
      error: {
        type,
        message,
        recovery,
      },
    };
    return error;
  }

  /**
   * Get session metadata
   */
  getMetadata() {
    return {
      created_at: this.createdAt,
      active_collection: this.activeCollection,
      access_count: this.accessLog.length,
      active_streams: this.streamStates.size,
    };
  }
}
