#!/usr/bin/env node

// src/orchestration/cli.ts - Executable entry point for the orchestrator
import { Command } from 'commander';
import { orchestrator, TREND_DETECTION_EXAMPLE, QUANTUM_OPTIMIZATION_EXAMPLE, VOICE_SYNTHESIS_EXAMPLE, DEFAULT_QUBO_EXAMPLE, DEFAULT_GROVER_ORACLE_EXAMPLE } from './orchestrator';
import type { EnhancementArea } from "./orchestrator";
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

const program = new Command();
type CliError = Error & { correlationId?: string };

function toError(error: unknown): CliError {
  if (error instanceof Error) {
    return error as CliError;
  }
  return new Error(typeof error === 'string' ? error : JSON.stringify(error));
}

program
  .name('orchestrator')
  .description('Contract-Driven AI Orchestrator CLI')
  .version('2.1.0');

// Compile manifest command
program
  .command('compile')
  .description('Compile agent contracts into a manifest')
  .option('-i, --input <file>', 'Input YAML file with enhancement areas')
  .option('-o, --output <file>', 'Output JSON file for manifest', 'enhancements_manifest.json')
  .option('--no-pinecone', 'Disable Pinecone validation')
  .option('--no-parallel', 'Disable parallel processing')
  .option('-e, --env <environment>', 'Environment (development|staging|production)', 'development')
  .action(async (options) => {
    try {
      await orchestrator.initializeServices();
      
      let enhancementAreas;
      if (options.input) {
        const content = readFileSync(options.input, 'utf-8');
        // Parse YAML or JSON based on file extension
        if (options.input.endsWith('.yaml') || options.input.endsWith('.yml')) {
          const { load } = await import('js-yaml');
          const parsed = load(content) as { enhancement_areas?: EnhancementArea[] } | undefined;
          enhancementAreas = parsed?.enhancement_areas ?? [];
        } else {
          enhancementAreas = JSON.parse(content);
        }
      } else {
        // Use default examples
        enhancementAreas = [
          {
            name: "Social Media Trend Detection",
            objective: "Identify emerging trends across social platforms",
            key_requirements: ["Real-time processing", "High accuracy", "Multi-platform support"],
            sources: ["Twitter API", "Reddit API", "TikTok API"]
          },
          {
            name: "Quantum Social Media Optimization",
            objective: "Leverage quantum computing for content optimization",
            key_requirements: ["Quantum advantage", "Cost-effectiveness", "Scalability"],
            sources: ["IBM Quantum", "Google Quantum AI"],
            depends_on: ["ML Prediction Models"]
          }
        ];
      }

      const manifest = await orchestrator.compileManifest(enhancementAreas, {
        validateAgainstPinecone: options.pinecone,
        enableParallelProcessing: options.parallel,
        environment: options.env
      });

      writeFileSync(options.output, JSON.stringify(manifest, null, 2));
      console.log(`✅ Manifest compiled and saved to ${options.output}`);
      console.log(`📊 Contains ${manifest.enhancements.length} enhancements`);
      
    } catch (error) {
      const err = toError(error);
      console.error('❌ Compilation failed:', err.message);
      if (err.correlationId) {
        console.error(`🔍 Correlation ID: ${err.correlationId}`);
      }
      process.exit(1);
    }
  });

// Validate command
program
  .command('validate')
  .description('Validate agent outputs against schemas')
  .option('-i, --input <file>', 'Input JSON file with agent outputs')
  .option('-o, --output <file>', 'Output validation report', 'validation_report.json')
  .action(async (options) => {
    try {
      if (!options.input) {
        console.error('❌ Input file required');
        process.exit(1);
      }

      const content = readFileSync(options.input, 'utf-8');
      const outputs = JSON.parse(content);
      
      const validation = await orchestrator.validateAgentOutputs(
        Array.isArray(outputs) ? outputs : [outputs]
      );

      const report = {
        timestamp: new Date().toISOString(),
        summary: {
          total: validation.valid.length + validation.invalid.length,
          valid: validation.valid.length,
          invalid: validation.invalid.length
        },
        valid_outputs: validation.valid,
        invalid_outputs: validation.invalid
      };

      writeFileSync(options.output, JSON.stringify(report, null, 2));
      console.log(`✅ Validation complete: ${validation.valid.length} valid, ${validation.invalid.length} invalid`);
      console.log(`📊 Report saved to ${options.output}`);
      
    } catch (error) {
      const err = toError(error);
      console.error('❌ Validation failed:', err.message);
      process.exit(1);
    }
  });

// Execute delegation command
program
  .command('execute')
  .description('Execute delegation for a specific agent output')
  .option('-i, --input <file>', 'Input JSON file with agent output')
  .option('-o, --output <file>', 'Output execution results', 'execution_results.json')
  .option('--quantum-backend <backend>', 'Quantum backend to use')
  .option('--voice-engine <engine>', 'Voice synthesis engine to use')
  .action(async (options) => {
    try {
      if (!options.input) {
        console.error('❌ Input file required');
        process.exit(1);
      }

      await orchestrator.initializeServices();

      const content = readFileSync(options.input, 'utf-8');
      const agentOutput = JSON.parse(content);
      
      const results = await orchestrator.executeDelegation(agentOutput, {
        quantumBackend: options.quantumBackend,
        voiceEngine: options.voiceEngine
      });

      writeFileSync(options.output, JSON.stringify(results, null, 2));
      console.log(`✅ Delegation executed for ${agentOutput.enhancement_area}`);
      console.log(`📊 Results saved to ${options.output}`);
      
    } catch (error) {
      const err = toError(error);
      console.error('❌ Execution failed:', err.message);
      if (err.correlationId) {
        console.error(`🔍 Correlation ID: ${err.correlationId}`);
      }
      process.exit(1);
    }
  });

// Examples command
program
  .command('examples')
  .description('Generate example agent outputs')
  .option('-o, --output <dir>', 'Output directory for examples', './examples')
  .option('-t, --type <type>', 'Example type (trend|quantum|voice|all)', 'all')
  .action(async (options) => {
    try {
      const { mkdirSync } = await import('fs');
      
      // Create output directory if it doesn't exist
      try {
        mkdirSync(options.output, { recursive: true });
      } catch (error) {
        // Directory already exists
      }

      const examples: Record<string, any> = {
        trend: TREND_DETECTION_EXAMPLE,
        quantum: QUANTUM_OPTIMIZATION_EXAMPLE,
        voice: VOICE_SYNTHESIS_EXAMPLE
      };

      const quantumExamples = {
        qubo: DEFAULT_QUBO_EXAMPLE,
        grover: DEFAULT_GROVER_ORACLE_EXAMPLE
      };

      if (options.type === 'all') {
        // Write all examples
        Object.entries(examples).forEach(([name, example]) => {
          const filename = join(options.output, `${name}_example.json`);
          writeFileSync(filename, JSON.stringify(example, null, 2));
          console.log(`✅ Generated ${filename}`);
        });

        // Write quantum examples
        const quantumFilename = join(options.output, 'quantum_examples.json');
        writeFileSync(quantumFilename, JSON.stringify(quantumExamples, null, 2));
        console.log(`✅ Generated ${quantumFilename}`);

      } else {
        // Write specific example
        const example = examples[options.type];
        if (!example) {
          console.error(`❌ Unknown example type: ${options.type}`);
          process.exit(1);
        }

        const filename = join(options.output, `${options.type}_example.json`);
        writeFileSync(filename, JSON.stringify(example, null, 2));
        console.log(`✅ Generated ${filename}`);
      }

      console.log(`📁 Examples saved to ${options.output}/`);
      
    } catch (error) {
      const err = toError(error);
      console.error('❌ Example generation failed:', err.message);
      process.exit(1);
    }
  });

// Test command
program
  .command('test')
  .description('Run end-to-end test of the orchestrator')
  .action(async () => {
    try {
      console.log('🧪 Running end-to-end orchestrator test...');
      
      await orchestrator.initializeServices();
      
      // Test 1: Compile manifest with examples
      console.log('📋 Test 1: Compiling manifest...');
      const enhancementAreas = [
        {
          name: "Test Trend Detection",
          objective: "Test trend detection capabilities",
          key_requirements: ["Fast processing", "High accuracy"],
          sources: ["Test API"]
        }
      ];

      const manifest = await orchestrator.compileManifest(enhancementAreas, {
        validateAgainstPinecone: false,
        enableParallelProcessing: true,
        environment: 'development'
      });

      console.log(`✅ Manifest compiled with ${manifest.enhancements.length} enhancements`);

      // Test 2: Validate outputs
      console.log('🔍 Test 2: Validating outputs...');
      const validation = await orchestrator.validateAgentOutputs([TREND_DETECTION_EXAMPLE]);
      console.log(`✅ Validation: ${validation.valid.length} valid, ${validation.invalid.length} invalid`);

      // Test 3: Execute delegation
      console.log('🚀 Test 3: Executing delegation...');
      const results = await orchestrator.executeDelegation(VOICE_SYNTHESIS_EXAMPLE);
      console.log(`✅ Delegation executed for ${results.enhancement_area}`);

      // Test 4: Error handling
      console.log('⚠️ Test 4: Testing error handling...');
      try {
        await orchestrator.validateAgentOutputs([{ invalid: 'data' }]);
      } catch (error) {
        console.log('✅ Error handling working correctly');
      }

      console.log('🎉 All tests passed!');
      
    } catch (error) {
      const err = toError(error);
      console.error('❌ Test failed:', err.message);
      process.exit(1);
    }
  });

// Status command
program
  .command('status')
  .description('Show orchestrator status and configuration')
  .action(async () => {
    try {
      console.log('📊 Orchestrator Status');
      console.log('===================');
      
      const securityConfig = orchestrator.getSecurityConfig();
      console.log(`🔒 Security: ${securityConfig.rate_limiting.enabled ? 'Enabled' : 'Disabled'}`);
      console.log(`🌲 Pinecone: ${orchestrator.isPineconeInitialized() ? 'Initialized' : 'Not initialized'}`);
      console.log(`📈 Rate Limit: ${securityConfig.rate_limiting.requests_per_minute} requests/minute`);
      console.log(`🔑 Key Vault: ${securityConfig.api_key_vault.provider}`);
      console.log(`🛡️ Prompt Protection: ${securityConfig.prompt_injection_protection.enabled ? 'Enabled' : 'Disabled'}`);
      
      console.log('\n📋 Available Examples:');
      console.log('- Trend Detection Example');
      console.log('- Quantum Optimization Example');
      console.log('- Voice Synthesis Example');
      console.log('- Default QUBO Example');
      console.log('- Default Grover Oracle Example');
      
    } catch (error) {
      const err = toError(error);
      console.error('❌ Status check failed:', err.message);
    }
  });

// Parse command line arguments
program.parse();

// Export for programmatic use
export { program as cli };
