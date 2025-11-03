# Orchestrator API Reference

The Orchestrator is the core component that manages contract-driven AI workflows, providing policy-governed orchestration of domain agents.

## Class: Orchestrator

Main orchestrator class that handles contract compilation, validation, and execution.

### Constructor

```typescript
new Orchestrator(securityConfig?: SecurityConfigZod)
```

**Parameters:**
- `securityConfig` (optional): Security configuration object

### Methods

#### compileManifest

Compiles enhancement areas into a validated orchestrator manifest.

```typescript
async compileManifest(
  enhancementAreas: EnhancementArea[],
  options?: {
    validateAgainstPinecone?: boolean;
    enableParallelProcessing?: boolean;
    environment?: 'development' | 'staging' | 'production';
  }
): Promise<OrchestratorManifestZod>
```

**Parameters:**
- `enhancementAreas`: Array of enhancement areas to process
- `options.validateAgainstPinecone`: Whether to validate against Pinecone (default: true)
- `options.enableParallelProcessing`: Enable parallel contract generation (default: true)
- `options.environment`: Target environment for metadata

**Returns:** Validated orchestrator manifest

**Throws:** `OrchestratorError` if compilation fails

**Example:**
```typescript
const orchestrator = new Orchestrator();

const areas = [
  {
    name: "User Authentication",
    objective: "Implement secure user login system",
    key_requirements: ["OAuth support", "Password hashing"],
    sources: ["Security requirements"]
  }
];

const manifest = await orchestrator.compileManifest(areas, {
  environment: 'production'
});
```

#### validateAgentOutputs

Validates an array of agent outputs against the contract schema.

```typescript
async validateAgentOutputs(outputs: any[]): Promise<{
  valid: AgentOutputZod[];
  invalid: Array<{ output: any; errors: string[] }>;
}>
```

**Parameters:**
- `outputs`: Array of agent outputs to validate

**Returns:** Object with valid and invalid outputs, including validation errors

**Example:**
```typescript
const validation = await orchestrator.validateAgentOutputs(agentOutputs);

console.log(`${validation.valid.length} valid, ${validation.invalid.length} invalid`);

validation.invalid.forEach(item => {
  console.log('Errors:', item.errors);
});
```

#### executeDelegation

Executes delegated tasks based on agent output (quantum, TTS, etc.).

```typescript
async executeDelegation(
  agentOutput: AgentOutputZod,
  context?: {
    quantumBackend?: string;
    voiceEngine?: string;
    securityContext?: any;
  }
): Promise<any>
```

**Parameters:**
- `agentOutput`: Agent output containing delegation information
- `context.quantumBackend`: Quantum computing backend preference
- `context.voiceEngine`: Voice synthesis engine preference
- `context.securityContext`: Additional security context

**Returns:** Execution results for delegated tasks

**Throws:** `OrchestratorError` if execution fails

#### initializeServices

Initializes external services (Pinecone, monitoring, etc.).

```typescript
async initializeServices(): Promise<void>
```

**Throws:** `OrchestratorError` if service initialization fails

#### getSecurityConfig

Returns the current security configuration.

```typescript
getSecurityConfig(): SecurityConfigZod
```

**Returns:** Current security configuration object

#### isPineconeInitialized

Checks if Pinecone service is initialized.

```typescript
isPineconeInitialized(): boolean
```

**Returns:** True if Pinecone is available

## Class: PolicyAuthoritativeOrchestrator

Extended orchestrator with policy governance and domain classification.

### Constructor

```typescript
new PolicyAuthoritativeOrchestrator()
```

### Methods

#### orchestrateFromClientPrompt

Complete orchestration flow from natural language prompt to contracts.

```typescript
async orchestrateFromClientPrompt(clientPrompt: string): Promise<AgentContract[]>
```

**Parameters:**
- `clientPrompt`: Natural language description of requirements

**Returns:** Array of generated and validated contracts

**Example:**
```typescript
const orchestrator = new PolicyAuthoritativeOrchestrator();

const contracts = await orchestrator.orchestrateFromClientPrompt(
  "Build a social media management platform with analytics"
);

console.log(`Generated ${contracts.length} contracts`);
```

#### orchestrateEnhancementAreas

Orchestrates pre-defined enhancement areas through policy-governed routing.

```typescript
async orchestrateEnhancementAreas(areas: EnhancementArea[]): Promise<AgentContract[]>
```

**Parameters:**
- `areas`: Array of enhancement areas to orchestrate

**Returns:** Array of processed contracts

**Example:**
```typescript
const areas = [
  {
    name: "Content Creation",
    objective: "Automated content generation system",
    key_requirements: ["AI writing", "Brand consistency"],
    sources: ["Content strategy"]
  }
];

const contracts = await orchestrator.orchestrateEnhancementAreas(areas);
```

#### getAuditTrail

Retrieves the complete audit trail of orchestration decisions.

```typescript
getAuditTrail(): AuditEntry[]
```

**Returns:** Array of audit entries with full decision history

**Example:**
```typescript
const auditTrail = orchestrator.getAuditTrail();

const agentDecisions = auditTrail.filter(entry =>
  entry.actor.startsWith('agent:')
);

console.log(`${agentDecisions.length} agent routing decisions`);
```

#### getAgentCapabilities

Returns capabilities of all registered agents.

```typescript
getAgentCapabilities(): Map<string, AgentCapability>
```

**Returns:** Map of domain to agent capabilities

## Supporting Classes

### OrchestratorError

Custom error class for orchestrator-specific errors.

```typescript
class OrchestratorError extends Error {
  timestamp: string;
  correlationId: string;
  errorType: string;
  recoveryActions: string[];
  context?: Record<string, any>;
}
```

**Properties:**
- `timestamp`: ISO timestamp of error
- `correlationId`: Unique error identifier
- `errorType`: Categorization of error type
- `recoveryActions`: Suggested recovery steps
- `context`: Additional error context

## Type Definitions

### EnhancementArea

Input specification for contract generation.

```typescript
interface EnhancementArea {
  name: string;              // Enhancement identifier
  objective: string;         // Detailed goal description
  key_requirements: string[]; // Critical requirements
  sources: string[];         // Reference materials
  depends_on?: string[];     // Prerequisite enhancements
}
```

### AgentContract

Structured contract output.

```typescript
interface AgentContract {
  enhancement_area: string;
  objective: string;
  implementation_plan: {
    modules: string[];
    architecture: string;
    estimated_effort?: string;
    dependencies?: string[];
  };
  governance: {
    security: string;
    compliance: string;
    ethics: string;
    data_handling?: string;
  };
  validation_criteria: string;
  confidence_score: number;
  depends_on?: string[];
  sources?: string[];
}
```

### SecurityConfig

Security configuration schema.

```typescript
interface SecurityConfig {
  rate_limiting: {
    requests_per_minute: number;
    burst_limit: number;
    enabled: boolean;
  };
  api_key_vault: {
    provider: 'AWS Secrets Manager' | 'Azure Key Vault' | 'HashiCorp Vault';
    key_rotation_days: number;
    encryption_at_rest: boolean;
  };
  prompt_injection_protection: {
    enabled: boolean;
    patterns: string[];
    sanitization_level: 'strict' | 'moderate' | 'permissive';
  };
}
```

## Error Types

### MANIFEST_COMPILATION_ERROR
Thrown when manifest compilation fails.

**Recovery Actions:**
- Check input data format
- Verify Pinecone connectivity
- Review validation rules

### DELEGATION_EXECUTION_ERROR
Thrown when delegated task execution fails.

**Recovery Actions:**
- Retry with different parameters
- Check backend connectivity
- Validate input format

### SERVICE_INITIALIZATION_ERROR
Thrown when external services fail to initialize.

**Recovery Actions:**
- Check environment variables
- Verify service availability
- Review network connectivity

## Usage Patterns

### Basic Orchestration

```typescript
import { Orchestrator } from '@yourorg/contract-ai-platform';

const orchestrator = new Orchestrator();

// Initialize services
await orchestrator.initializeServices();

// Compile manifest
const manifest = await orchestrator.compileManifest(enhancementAreas);

// Validate outputs
const validation = await orchestrator.validateAgentOutputs(manifest.enhancements);
```

### Policy-Governed Orchestration

```typescript
import { PolicyAuthoritativeOrchestrator } from '@yourorg/contract-ai-platform';

const orchestrator = new PolicyAuthoritativeOrchestrator();

// Natural language to contracts
const contracts = await orchestrator.orchestrateFromClientPrompt(
  "Build an e-commerce platform with AI recommendations"
);

// Review audit trail
const auditTrail = orchestrator.getAuditTrail();
const policyDecisions = auditTrail.filter(entry =>
  entry.decisionType === 'agent_routing'
);
```

### Error Handling

```typescript
import { OrchestratorError } from '@yourorg/contract-ai-platform';

try {
  const result = await orchestrator.compileManifest(areas);
} catch (error) {
  if (error instanceof OrchestratorError) {
    console.error(`Orchestrator Error [${error.errorType}]:`, error.message);
    console.log('Recovery actions:', error.recoveryActions);

    // Log correlation ID for tracking
    console.log('Correlation ID:', error.correlationId);
  }
}
```

## Performance Considerations

- **Parallel Processing**: Enable for multiple independent contracts
- **Caching**: Contract results cached to reduce redundant processing
- **Batch Operations**: Group similar contracts for efficiency
- **Resource Limits**: Configure appropriate timeouts and limits

## Security Notes

- All inputs validated against schemas
- Sensitive data masked in logs
- Rate limiting prevents abuse
- Audit trails maintained for compliance