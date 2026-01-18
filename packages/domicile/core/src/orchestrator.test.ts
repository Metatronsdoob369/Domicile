// src/orchestration/orchestrator.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import {
  orchestrator,
  OrchestratorError,
  TREND_DETECTION_EXAMPLE,
  QUANTUM_OPTIMIZATION_EXAMPLE,
  VOICE_SYNTHESIS_EXAMPLE,
  AgentOutputZod,
  EnhancementAreaZod,
  SecurityConfigZod,
  DEFAULT_SECURITY_CONFIG,
  DEFAULT_QUBO_EXAMPLE,
  DEFAULT_GROVER_ORACLE_EXAMPLE,
} from './orchestrator';

describe('Orchestrator Core', () => {
  beforeEach(async () => {
    // Reset orchestrator state for each test
    await orchestrator.initializeServices();
  });

  describe('Schema Validation', () => {
    it('should validate trend detection example', () => {
      const result = AgentOutputZod.safeParse(TREND_DETECTION_EXAMPLE);
      expect(result.success).toBe(true);
    });

    it('should validate quantum optimization example', () => {
      const result = AgentOutputZod.safeParse(QUANTUM_OPTIMIZATION_EXAMPLE);
      expect(result.success).toBe(true);
    });

    it('should validate voice synthesis example', () => {
      const result = AgentOutputZod.safeParse(VOICE_SYNTHESIS_EXAMPLE);
      expect(result.success).toBe(true);
    });

    it('should reject invalid agent output', () => {
      const invalidOutput = {
        enhancement_area: '', // Invalid: empty string
        objective: 'Test objective',
        confidence_score: 1.5, // Invalid: > 1.0
      };
      const result = AgentOutputZod.safeParse(invalidOutput);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors.length).toBeGreaterThan(0);
      }
    });

    it('should validate enhancement area', () => {
      const validArea = {
        name: 'Test Area',
        objective: 'Test objective',
        key_requirements: [],
        sources: [],
        depends_on: [],
      };
      const result = EnhancementAreaZod.safeParse(validArea);
      expect(result.success).toBe(true);
    });

    it('should validate security config', () => {
      const result = SecurityConfigZod.safeParse(DEFAULT_SECURITY_CONFIG);
      expect(result.success).toBe(true);
    });
  });

  describe('Manifest Compilation', () => {
    it('should compile manifest with basic enhancement areas', async () => {
      const enhancementAreas = [
        {
          name: 'Test Area 1',
          objective: 'Test objective 1',
          key_requirements: [],
          sources: [],
        },
        {
          name: 'Test Area 2',
          objective: 'Test objective 2',
          key_requirements: [],
          sources: [],
          depends_on: [],
        },
      ];

      const manifest = await orchestrator.compileManifest(enhancementAreas, {
        validateAgainstPinecone: false,
        enableParallelProcessing: false,
        environment: 'development',
      });

      expect(manifest.enhancements).toHaveLength(2);
      expect(manifest.metadata).toBeDefined();
      expect(manifest.metadata.version).toBe('2.1.0');
      expect(manifest.metadata.environment).toBe('development');
      expect(manifest.roadmap).toBeDefined();
      expect(manifest.roadway?.build_order).toBeDefined();
    });

    it('should handle parallel processing', async () => {
      const enhancementAreas = Array.from({ length: 5 }, (_, i) => ({
        name: `Test Area ${i + 1}`,
        objective: `Test objective ${i + 1}`,
        key_requirements: [],
        sources: [],
      }));

      const startTime = Date.now();
      const manifest = await orchestrator.compileManifest(enhancementAreas, {
        validateAgainstPinecone: false,
        enableParallelProcessing: true,
        environment: 'development',
      });
      const endTime = Date.now();

      expect(manifest.enhancements).toHaveLength(5);
      expect(endTime - startTime).toBeLessThan(5000); // Should complete quickly
    });

    it('should handle dependency cycles gracefully', async () => {
      const enhancementAreas = [
        {
          name: 'Area A',
          objective: 'Objective A',
          key_requirements: [],
          sources: [],
          depends_on: [],
        },
        {
          name: 'Area B',
          objective: 'Objective B',
          key_requirements: [],
          sources: [],
          depends_on: [],
        },
      ];

      await expect(
        orchestrator.compileManifest(enhancementAreas, {
          validateAgainstPinecone: false,
          enableParallelProcessing: false,
          environment: 'development',
        }),
      ).rejects.toThrow(OrchestratorError);
    });
  });

  describe('Agent Output Validation', () => {
    it('should validate multiple agent outputs', async () => {
      const outputs = [
        TREND_DETECTION_EXAMPLE,
        QUANTUM_OPTIMIZATION_EXAMPLE,
        VOICE_SYNTHESIS_EXAMPLE,
      ];
      const validation = await orchestrator.validateAgentOutputs(outputs);

      expect(validation.valid).toHaveLength(3);
      expect(validation.invalid).toHaveLength(0);
    });

    it('should identify invalid outputs', async () => {
      const outputs = [
        TREND_DETECTION_EXAMPLE,
        { invalid: 'data' }, // Invalid output
        VOICE_SYNTHESIS_EXAMPLE,
      ];
      const validation = await orchestrator.validateAgentOutputs(outputs);

      expect(validation.valid).toHaveLength(2);
      expect(validation.invalid).toHaveLength(1);
      expect(validation.invalid[0].errors.length).toBeGreaterThan(0);
    });
  });

  describe('Delegation Execution', () => {
    it('should execute standard delegation', async () => {
      const results = await orchestrator.executeDelegation(
        TREND_DETECTION_EXAMPLE,
      );

      expect(results.enhancement_area).toBe(
        TREND_DETECTION_EXAMPLE.enhancement_area,
      );
      expect(results.execution_id).toBeDefined();
      expect(results.timestamp).toBeDefined();
      expect(results.results).toBeDefined();
      expect(results.results.implementation).toBeDefined();
    });

    it('should execute quantum delegation', async () => {
      const results = await orchestrator.executeDelegation(
        QUANTUM_OPTIMIZATION_EXAMPLE,
        {
          quantumBackend: 'simulator',
        },
      );

      expect(results.results.quantum).toBeDefined();
      expect(results.results.quantum.backend).toBe('simulator');
    });

    it('should execute TTS delegation', async () => {
      const results = await orchestrator.executeDelegation(
        VOICE_SYNTHESIS_EXAMPLE,
        {
          voiceEngine: 'ECHO-GHOST',
        },
      );

      expect(results.results.tts).toBeDefined();
      expect(results.results.tts.engine).toBe('ECHO-GHOST');
      expect(results.results.tts.segments_processed).toBeGreaterThan(0);
    });

    it('should handle delegation errors gracefully', async () => {
      const invalidOutput = {
        enhancement_area: 'Invalid Test',
        // Missing required fields
      };

      await expect(
        orchestrator.executeDelegation(invalidOutput),
      ).rejects.toThrow(OrchestratorError);
    });
  });

  describe('Error Handling', () => {
    it('should create OrchestratorError with proper structure', () => {
      const error = new OrchestratorError(
        'Test error message',
        'TEST_ERROR',
        ['Action 1', 'Action 2'],
        { context: 'test' },
      );

      expect(error.message).toBe('Test error message');
      expect(error.errorType).toBe('TEST_ERROR');
      expect(error.recoveryActions).toEqual(['Action 1', 'Action 2']);
      expect(error.context).toEqual({ context: 'test' });
      expect(error.timestamp).toBeDefined();
      expect(error.correlationId).toBeDefined();
    });

    it('should serialize error to JSON', () => {
      const error = new OrchestratorError('Test error', 'TEST_ERROR', [
        'Action 1',
      ]);
      const json = error.toJSON();

      expect(json.name).toBe('OrchestratorError');
      expect(json.message).toBe('Test error');
      expect(json.errorType).toBe('TEST_ERROR');
      expect(json.recoveryActions).toEqual(['Action 1']);
      expect(json.timestamp).toBeDefined();
      expect(json.correlationId).toBeDefined();
    });
  });

  describe('Quantum Examples', () => {
    it('should provide valid QUBO example', () => {
      expect(DEFAULT_QUBO_EXAMPLE.type).toBe('QUBO');
      expect(DEFAULT_QUBO_EXAMPLE.parameters).toBeDefined();
      expect(DEFAULT_QUBO_EXAMPLE.parameters.variables).toBe(20);
    });

    it('should provide valid Grover oracle example', () => {
      expect(DEFAULT_GROVER_ORACLE_EXAMPLE.type).toBe('Oracle');
      expect(DEFAULT_GROVER_ORACLE_EXAMPLE.parameters).toBeDefined();
      expect(DEFAULT_GROVER_ORACLE_EXAMPLE.parameters.database_size).toBe(1000);
    });
  });

  describe('Security Configuration', () => {
    it('should return security config', () => {
      const config = orchestrator.getSecurityConfig();
      expect(config).toBeDefined();
      expect(config.rate_limiting.enabled).toBe(true);
    });

    it('should initialize with custom security config', () => {
      const customConfig = {
        ...DEFAULT_SECURITY_CONFIG,
        rate_limiting: {
          ...DEFAULT_SECURITY_CONFIG.rate_limiting,
          requests_per_minute: 200,
        },
      };

      const customOrchestrator = new (orchestrator.constructor as any)(
        customConfig,
      );
      const config = customOrchestrator.getSecurityConfig();
      expect(config.rate_limiting.requests_per_minute).toBe(200);
    });
  });

  describe('Service Initialization', () => {
    it('should initialize services without errors', async () => {
      await expect(orchestrator.initializeServices()).resolves.not.toThrow();
    });

    it('should track Pinecone initialization status', () => {
      const isInitialized = orchestrator.isPineconeInitialized();
      expect(typeof isInitialized).toBe('boolean');
    });
  });
});

describe('Integration Tests', () => {
  it('should handle complete workflow end-to-end', async () => {
    // 1. Compile manifest
    const enhancementAreas = [
      {
        name: 'Integration Test Area',
        objective: 'Test complete workflow',
        key_requirements: [],
        sources: [],
      },
    ];

    const manifest = await orchestrator.compileManifest(enhancementAreas, {
      validateAgainstPinecone: false,
      enableParallelProcessing: true,
      environment: 'staging',
    });

    expect(manifest.enhancements).toHaveLength(1);

    // 2. Validate outputs
    const validation = await orchestrator.validateAgentOutputs(
      manifest.enhancements,
    );
    expect(validation.valid).toHaveLength(1);
    expect(validation.invalid).toHaveLength(0);

    // 3. Execute delegation
    const results = await orchestrator.executeDelegation(
      manifest.enhancements[0],
    );
    expect(results.execution_id).toBeDefined();
    expect(results.results.implementation).toBeDefined();

    // 4. Check metadata
    expect(manifest.metadata.environment).toBe('staging');
    expect(manifest.metadata.total_enhancements).toBe(1);
  });

  it('should handle large batch processing', async () => {
    const enhancementAreas = Array.from({ length: 10 }, (_, i) => ({
      name: `Batch Test Area ${i + 1}`,
      objective: `Batch test objective ${i + 1}`,
      key_requirements: [],
      sources: [],
    }));

    const manifest = await orchestrator.compileManifest(enhancementAreas, {
      validateAgainstPinecone: false,
      enableParallelProcessing: true,
      environment: 'development',
    });

    expect(manifest.enhancements).toHaveLength(10);
    expect(manifest.metadata.total_enhancements).toBe(10);
  });
});
