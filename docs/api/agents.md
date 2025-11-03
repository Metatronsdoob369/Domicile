# Agents API Reference

This reference covers the agent interfaces, implementations, and utilities for building domain-specific AI agents.

## Core Interfaces

### DomainAgent

Base interface that all domain agents must implement.

```typescript
interface DomainAgent {
  domain: string;
  canHandle(area: EnhancementArea): boolean;
  generateContract(area: EnhancementArea): Promise<AgentContract>;
  coordinateSubtasks?(contracts: AgentContract[]): Promise<AgentContract[]>;
}
```

**Properties:**
- `domain`: String identifier for the agent's domain (e.g., 'social-media', 'finance')

**Methods:**
- `canHandle(area)`: Determines if agent can process the given enhancement area
- `generateContract(area)`: Creates a structured contract for the enhancement area
- `coordinateSubtasks()`: Optional method for coordinating subtasks within domain

### EnhancementArea

Input specification for agent processing.

```typescript
interface EnhancementArea {
  name: string;
  objective: string;
  key_requirements: string[];
  sources: string[];
  depends_on?: string[];
}
```

### AgentContract

Structured output from agent contract generation.

```typescript
interface AgentContract {
  enhancement_area: string;
  objective: string;
  implementation_plan: ImplementationPlan;
  depends_on: string[];
  sources: string[];
  governance: Governance;
  validation_criteria: string;
  confidence_score: number;
}
```

## Agent Implementations

### EnhancedDomainAgent

Abstract base class providing common functionality for domain agents.

```typescript
abstract class EnhancedDomainAgent implements DomainAgent {
  abstract domain: string;

  protected abstract isDomainMatch(area: EnhancementArea): boolean;
  protected abstract generateDomainSubtasks(contract: AgentContract): Promise<AgentContract[]>;
  protected abstract isWithinDomainBoundaries(subtask: AgentContract): boolean;

  canHandle(area: EnhancementArea): boolean {
    return this.isDomainMatch(area);
  }

  async generateContract(area: EnhancementArea): Promise<AgentContract> {
    // Implementation provided by subclasses
  }

  async coordinateSubtasks?(contracts: AgentContract[]): Promise<AgentContract[]> {
    // Optional subtask coordination
  }
}
```

### SocialMediaDomainAgent

Specialized agent for social media domain.

```typescript
class SocialMediaDomainAgent extends EnhancedDomainAgent {
  domain = 'social-media';

  protected isDomainMatch(area: EnhancementArea): boolean {
    const content = `${area.name} ${area.objective}`.toLowerCase();
    return content.includes('social') || content.includes('content') ||
           content.includes('engagement') || content.includes('media');
  }

  async generateContract(area: EnhancementArea): Promise<AgentContract> {
    return {
      enhancement_area: area.name,
      objective: area.objective,
      implementation_plan: {
        modules: ['ContentPlanner', 'PostingScheduler', 'AnalyticsTracker'],
        architecture: 'Microservices with Firebase backend'
      },
      governance: {
        security: 'OAuth authentication, data encryption',
        compliance: 'Platform API terms adherence',
        ethics: 'Content authenticity verification'
      },
      validation_criteria: 'Engagement rate > 15% improvement',
      confidence_score: 0.88,
      depends_on: area.depends_on || [],
      sources: area.sources
    };
  }

  protected async generateDomainSubtasks(contract: AgentContract): Promise<AgentContract[]> {
    // Generate platform-specific subtasks
    const subtasks: AgentContract[] = [];

    if (contract.implementation_plan.modules.includes('PostingScheduler')) {
      subtasks.push({
        ...contract,
        enhancement_area: `${contract.enhancement_area} - Instagram`,
        platform: 'instagram'
      });
    }

    return subtasks;
  }

  protected isWithinDomainBoundaries(subtask: AgentContract): boolean {
    return subtask.platform || subtask.enhancement_area.toLowerCase().includes('social');
  }
}
```

## Agent Registry

### AgentRegistry Class

Manages registration and discovery of domain agents.

```typescript
class AgentRegistry {
  registerAgent(domain: string, agent: DomainAgent, capability: AgentCapability): void;
  getAgent(domain: string): DomainAgent | undefined;
  getCapability(domain: string): AgentCapability | undefined;
  getAvailableDomains(): string[];
  getAgentsForDomain(domain: string): AgentMeta[];
}
```

**Methods:**

#### registerAgent

Registers a domain agent with its capabilities.

```typescript
registerAgent(domain: string, agent: DomainAgent, capability: AgentCapability): void
```

**Parameters:**
- `domain`: Domain identifier
- `agent`: Agent instance implementing DomainAgent
- `capability`: Agent capability declaration

**Example:**
```typescript
const registry = new AgentRegistry();

registry.registerAgent('social-media', new SocialMediaDomainAgent(), {
  domain: 'social-media',
  capabilities: ['content-creation', 'engagement-analysis'],
  trustScore: 0.92,
  performanceMetrics: {
    accuracy: 0.88,
    reliability: 0.95,
    speed: 0.78
  },
  metadata: {
    version: '1.0.0',
    lastUpdated: new Date(),
    author: 'Platform Team',
    compliance: ['SOC2', 'GDPR']
  }
});
```

#### getAgent

Retrieves agent instance for a domain.

```typescript
getAgent(domain: string): DomainAgent | undefined
```

#### getCapability

Retrieves capability information for a domain.

```typescript
getCapability(domain: string): AgentCapability | undefined
```

#### getAvailableDomains

Returns list of all registered domains.

```typescript
getAvailableDomains(): string[]
```

#### getAgentsForDomain

Returns agent metadata for domain selection.

```typescript
getAgentsForDomain(domain: string): AgentMeta[]
```

## Agent Capabilities

### AgentCapability Interface

Comprehensive capability declaration for agents.

```typescript
interface AgentCapability {
  domain: string;
  capabilities: string[];
  trustScore: number;
  performanceMetrics: {
    accuracy: number;
    reliability: number;
    speed: number;
  };
  metadata: {
    version: string;
    lastUpdated: Date;
    author: string;
    compliance: string[];
  };
}
```

### AgentMeta Interface

Metadata for agent selection and routing.

```typescript
interface AgentMeta {
  id: string;
  name: string;
  domains: string[];
  capabilities: string[];
  trustScore: number;
  complianceCertifications: string[];
  performanceMetrics: {
    successRate: number;
    averageResponseTime: number;
    totalInvocations: number;
  };
}
```

## Agent Utilities

### AgentAdapter

Adapter for standardized agent invocation.

```typescript
class AgentAdapter {
  async invoke(request: AgentInvocationRequest): Promise<AgentInvocationResponse>;
}
```

**AgentInvocationRequest:**
```typescript
interface AgentInvocationRequest {
  agent: DomainAgent;
  area: EnhancementArea;
  requestSubOrchestration?: boolean;
}
```

**AgentInvocationResponse:**
```typescript
interface AgentInvocationResponse {
  contract: AgentContract;
  confidenceScore: number;
  subOrchestrationProposal?: SubOrchestrationProposal;
  executionMetadata: {
    processingTime: number;
    modelUsed?: string;
    tokensUsed?: number;
  };
}
```

### SubOrchestrationProposal

Proposal for within-domain subtask coordination.

```typescript
interface SubOrchestrationProposal {
  proposedSubtasks: EnhancementArea[];
  orchestrationGraph: Array<{
    from: string;
    to: string;
    dependency: string;
  }>;
  rationale: string;
  confidence: number;
}
```

## Performance Monitoring

### Agent Performance Tracking

```typescript
interface AgentPerformanceTracker {
  recordExecution(agentId: string, duration: number, success: boolean): void;
  getMetrics(agentId: string): AgentMetrics;
  updateTrustScore(agentId: string, newScore: number): void;
}

interface AgentMetrics {
  invocations: number;
  successRate: number;
  averageResponseTime: number;
  errorRate: number;
  trustScore: number;
  lastUpdated: Date;
}
```

## Error Handling

### AgentExecutionError

Custom error for agent execution failures.

```typescript
class AgentExecutionError extends Error {
  agentId: string;
  domain: string;
  enhancementArea: string;
  retryable: boolean;
  context?: Record<string, any>;
}
```

## Best Practices

### Agent Design

1. **Single Responsibility**: Each agent handles one domain
2. **Clear Boundaries**: Well-defined `canHandle` logic
3. **Error Resilience**: Graceful failure handling
4. **Performance Awareness**: Efficient contract generation

### Capability Declaration

1. **Accurate Capabilities**: Only declare what agent can actually do
2. **Realistic Trust Scores**: Base on actual performance testing
3. **Comprehensive Metadata**: Include version, author, compliance info

### Contract Generation

1. **Schema Compliance**: All contracts must pass validation
2. **Realistic Confidence**: Honest confidence scoring
3. **Complete Information**: Include all required fields
4. **Dependency Awareness**: Proper dependency declarations

## Examples

### Creating a Custom Agent

```typescript
import { EnhancedDomainAgent, EnhancementArea, AgentContract } from './types';

export class EcommerceAgent extends EnhancedDomainAgent {
  domain = 'e-commerce';

  protected isDomainMatch(area: EnhancementArea): boolean {
    const content = `${area.name} ${area.objective}`.toLowerCase();
    return content.includes('ecommerce') || content.includes('product') ||
           content.includes('shopping') || content.includes('retail');
  }

  async generateContract(area: EnhancementArea): Promise<AgentContract> {
    return {
      enhancement_area: area.name,
      objective: area.objective,
      implementation_plan: {
        modules: ['ProductService', 'InventoryManager', 'RecommendationEngine'],
        architecture: 'Microservices with API Gateway'
      },
      governance: {
        security: 'PCI DSS compliance, data encryption',
        compliance: 'GDPR, CCPA data protection',
        ethics: 'Fair pricing, unbiased recommendations'
      },
      validation_criteria: 'Conversion rate > 20% improvement, user satisfaction > 4.5/5',
      confidence_score: 0.85,
      depends_on: area.depends_on || [],
      sources: area.sources
    };
  }

  protected async generateDomainSubtasks(contract: AgentContract): Promise<AgentContract[]> {
    const subtasks: AgentContract[] = [];

    // Generate subtasks for different e-commerce functions
    if (contract.implementation_plan.modules.includes('RecommendationEngine')) {
      subtasks.push({
        ...contract,
        enhancement_area: `${contract.enhancement_area} - ML Pipeline`,
        objective: 'Build machine learning pipeline for product recommendations'
      });
    }

    return subtasks;
  }

  protected isWithinDomainBoundaries(subtask: AgentContract): boolean {
    const content = subtask.enhancement_area.toLowerCase();
    return content.includes('product') || content.includes('inventory') ||
           content.includes('recommendation') || content.includes('ecommerce');
  }
}
```

### Registering and Using Agents

```typescript
import { AgentRegistry } from './orchestration/agent-registry';
import { EcommerceAgent } from './agents/ecommerce-agent';

// Create registry
const registry = new AgentRegistry();

// Register agent
registry.registerAgent('e-commerce', new EcommerceAgent(), {
  domain: 'e-commerce',
  capabilities: ['product-management', 'inventory-optimization', 'recommendations'],
  trustScore: 0.87,
  performanceMetrics: {
    accuracy: 0.89,
    reliability: 0.93,
    speed: 0.81
  },
  metadata: {
    version: '1.0.0',
    lastUpdated: new Date(),
    author: 'E-commerce Team',
    compliance: ['PCI-DSS', 'GDPR']
  }
});

// Use agent
const agent = registry.getAgent('e-commerce');
if (agent) {
  const contract = await agent.generateContract(enhancementArea);
  console.log('Generated contract:', contract.enhancement_area);
}
```

### Agent Testing

```typescript
import { describe, it, expect } from 'vitest';
import { EcommerceAgent } from './ecommerce-agent';

describe('EcommerceAgent', () => {
  const agent = new EcommerceAgent();

  it('should handle e-commerce areas', () => {
    const area: EnhancementArea = {
      name: 'Product Recommendations',
      objective: 'Implement personalized product recommendations',
      key_requirements: ['User behavior analysis', 'Recommendation algorithm'],
      sources: ['Product data', 'User analytics']
    };

    expect(agent.canHandle(area)).toBe(true);
  });

  it('should generate valid contracts', async () => {
    const area: EnhancementArea = {
      name: 'Inventory Management',
      objective: 'Optimize inventory levels and reduce stockouts',
      key_requirements: ['Demand forecasting', 'Supplier integration'],
      sources: ['Sales data', 'Inventory logs']
    };

    const contract = await agent.generateContract(area);

    expect(contract.enhancement_area).toBe(area.name);
    expect(contract.confidence_score).toBeGreaterThan(0);
    expect(contract.confidence_score).toBeLessThanOrEqual(1);
    expect(contract.implementation_plan.modules.length).toBeGreaterThan(0);
  });

  it('should reject non-e-commerce areas', () => {
    const area: EnhancementArea = {
      name: 'Social Media Campaign',
      objective: 'Run targeted social media advertising',
      key_requirements: ['Audience targeting', 'Creative optimization'],
      sources: ['Social platforms']
    };

    expect(agent.canHandle(area)).toBe(false);
  });
});
```

This API reference provides comprehensive guidance for implementing and using domain agents in the Contract-Driven AI Platform.