# Creating Domain Agents

This guide walks you through creating custom domain agents for the Contract-Driven AI Platform. Domain agents are specialized AI workers that excel at specific types of tasks.

## Understanding Domain Agents

Domain agents implement the `DomainAgent` interface and handle tasks within a specific domain (social-media, finance, healthcare, etc.).

```typescript
interface DomainAgent {
  domain: string;
  canHandle(area: EnhancementArea): boolean;
  generateContract(area: EnhancementArea): Promise<AgentContract>;
  coordinateSubtasks?(contracts: AgentContract[]): Promise<AgentContract[]>;
}
```

## Step 1: Plan Your Agent

### Define the Domain
Choose a clear, focused domain:

```typescript
// Good: Specific domain
domain = 'e-commerce';

// Bad: Too broad
domain = 'business';

// Bad: Overlapping
domain = 'retail-ecommerce';
```

### Identify Capabilities
List what your agent can do:

```typescript
capabilities = [
  'product-catalog-management',
  'inventory-optimization',
  'customer-behavior-analysis',
  'recommendation-engine',
  'pricing-strategy'
];
```

### Determine Trust Score
Start with a conservative trust score based on testing:

```typescript
trustScore = 0.75; // After initial testing
```

## Step 2: Create the Agent Class

### Basic Agent Template

```typescript
import { DomainAgent, EnhancementArea, AgentContract } from '../src/types';

export class EcommerceAgent implements DomainAgent {
  domain = 'e-commerce';

  canHandle(area: EnhancementArea): boolean {
    const content = `${area.name} ${area.objective}`.toLowerCase();
    return content.includes('ecommerce') ||
           content.includes('product') ||
           content.includes('shopping') ||
           content.includes('retail');
  }

  async generateContract(area: EnhancementArea): Promise<AgentContract> {
    return {
      enhancement_area: area.name,
      objective: area.objective,
      implementation_plan: {
        modules: this.determineModules(area),
        architecture: this.selectArchitecture(area)
      },
      governance: this.defineGovernance(area),
      validation_criteria: this.createValidationCriteria(area),
      confidence_score: this.calculateConfidence(area),
      depends_on: area.depends_on || [],
      sources: area.sources
    };
  }

  private determineModules(area: EnhancementArea): string[] {
    const modules = ['ProductService', 'InventoryManager'];

    if (area.objective.toLowerCase().includes('recommendation')) {
      modules.push('RecommendationEngine');
    }

    if (area.objective.toLowerCase().includes('analytics')) {
      modules.push('AnalyticsService');
    }

    return modules;
  }

  private selectArchitecture(area: EnhancementArea): string {
    const complexity = this.assessComplexity(area);

    if (complexity === 'high') {
      return 'Microservices with event-driven architecture';
    } else if (complexity === 'medium') {
      return 'Monolithic application with modular design';
    } else {
      return 'Serverless functions with API Gateway';
    }
  }

  private defineGovernance(area: EnhancementArea): any {
    return {
      security: 'OAuth 2.0 authentication, data encryption at rest',
      compliance: 'PCI DSS compliance for payment processing',
      ethics: 'Fair pricing algorithms, no discriminatory practices'
    };
  }

  private createValidationCriteria(area: EnhancementArea): string {
    return 'Conversion rate improvement > 15%, customer satisfaction > 4.5/5';
  }

  private calculateConfidence(area: EnhancementArea): number {
    // Base confidence
    let confidence = 0.8;

    // Reduce for complex requirements
    if (area.key_requirements.length > 5) {
      confidence -= 0.1;
    }

    // Increase for well-defined objectives
    if (area.objective.length > 50) {
      confidence += 0.05;
    }

    return Math.max(0.5, Math.min(0.95, confidence));
  }

  private assessComplexity(area: EnhancementArea): 'low' | 'medium' | 'high' {
    const factors = area.key_requirements.length + (area.depends_on?.length || 0);

    if (factors >= 5) return 'high';
    if (factors >= 3) return 'medium';
    return 'low';
  }
}
```

## Step 3: Implement Advanced Features

### Subtask Coordination

Enable your agent to break down complex tasks:

```typescript
async coordinateSubtasks?(contracts: AgentContract[]): Promise<AgentContract[]> {
  const subtasks: AgentContract[] = [];

  for (const contract of contracts) {
    if (this.needsSubtasks(contract)) {
      const additionalTasks = await this.generateSubtasks(contract);
      subtasks.push(...additionalTasks);
    }
  }

  return subtasks;
}

private needsSubtasks(contract: AgentContract): boolean {
  return contract.implementation_plan.modules.length > 3;
}

private async generateSubtasks(contract: AgentContract): Promise<AgentContract[]> {
  const subtasks: AgentContract[] = [];

  // Break down into smaller, focused tasks
  if (contract.implementation_plan.modules.includes('RecommendationEngine')) {
    subtasks.push({
      enhancement_area: `${contract.enhancement_area} - Data Collection`,
      objective: 'Collect and process user behavior data for recommendations',
      implementation_plan: {
        modules: ['DataCollector', 'DataProcessor'],
        architecture: 'Data pipeline architecture'
      },
      governance: contract.governance,
      validation_criteria: 'Data quality score > 90%',
      confidence_score: 0.85,
      depends_on: [contract.enhancement_area],
      sources: contract.sources
    });
  }

  return subtasks;
}
```

### Performance Optimization

Add caching and optimization:

```typescript
export class OptimizedEcommerceAgent extends EcommerceAgent {
  private contractCache = new Map<string, AgentContract>();

  async generateContract(area: EnhancementArea): Promise<AgentContract> {
    const cacheKey = this.generateCacheKey(area);

    if (this.contractCache.has(cacheKey)) {
      return this.contractCache.get(cacheKey)!;
    }

    const contract = await super.generateContract(area);
    this.contractCache.set(cacheKey, contract);

    return contract;
  }

  private generateCacheKey(area: EnhancementArea): string {
    return `${area.name}-${area.objective.length}-${area.key_requirements.length}`;
  }
}
```

## Step 4: Register the Agent

### Add to Agent Registry

```typescript
import { AgentRegistry } from '../src/orchestration/agent-registry';
import { EcommerceAgent } from './agents/ecommerce-agent';

const registry = new AgentRegistry();

// Register your agent
registry.registerAgent('e-commerce', new EcommerceAgent(), {
  domain: 'e-commerce',
  capabilities: [
    'product-catalog-management',
    'inventory-optimization',
    'customer-behavior-analysis',
    'recommendation-engine',
    'pricing-strategy'
  ],
  trustScore: 0.82,
  performanceMetrics: {
    accuracy: 0.87,
    reliability: 0.94,
    speed: 0.76
  },
  metadata: {
    version: '1.0.0',
    lastUpdated: new Date(),
    author: 'Your Name',
    compliance: ['PCI-DSS', 'GDPR']
  }
});
```

## Step 5: Test Your Agent

### Unit Tests

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
      sources: ['User data', 'Product catalog']
    };

    expect(agent.canHandle(area)).toBe(true);
  });

  it('should generate valid contracts', async () => {
    const area: EnhancementArea = {
      name: 'Inventory Management',
      objective: 'Optimize inventory levels and reduce stockouts',
      key_requirements: ['Demand forecasting', 'Supplier integration'],
      sources: ['Sales data', 'Supplier APIs']
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

### Integration Tests

```typescript
import { PolicyAuthoritativeOrchestrator } from '../src/domain-agent-orchestrator';

describe('EcommerceAgent Integration', () => {
  it('should work with orchestrator', async () => {
    const orchestrator = new PolicyAuthoritativeOrchestrator();

    const areas = [{
      name: 'E-commerce Platform',
      objective: 'Build a complete e-commerce solution',
      key_requirements: ['Product catalog', 'Shopping cart', 'Payment processing'],
      sources: ['Business requirements']
    }];

    const contracts = await orchestrator.orchestrateEnhancementAreas(areas);

    expect(contracts.length).toBeGreaterThan(0);
    expect(contracts[0].enhancement_area).toBe('E-commerce Platform');
  });
});
```

## Step 6: Deploy and Monitor

### Add to Production Registry

```typescript
// In production configuration
import { productionRegistry } from './config/production-registry';

productionRegistry.registerAgent('e-commerce', new OptimizedEcommerceAgent(), {
  // Production configuration with higher trust scores
  trustScore: 0.89,
  performanceMetrics: {
    accuracy: 0.91,
    reliability: 0.96,
    speed: 0.82
  }
});
```

### Monitor Performance

```typescript
import { monitoringDashboard } from '../src/monitoring-dashboard';

// Track agent performance
monitoringDashboard.trackAgent('e-commerce', {
  contractsProcessed: 150,
  successRate: 0.93,
  averageResponseTime: 1250,
  errorRate: 0.04
});
```

## Best Practices

### Agent Design
1. **Single Responsibility**: Focus on one domain
2. **Clear Boundaries**: Well-defined `canHandle` logic
3. **Error Handling**: Graceful failure modes
4. **Performance**: Optimize for speed and reliability

### Contract Generation
1. **Consistency**: Similar inputs produce similar outputs
2. **Validation**: Always validate generated contracts
3. **Confidence**: Accurate confidence scoring
4. **Dependencies**: Proper dependency management

### Testing
1. **Coverage**: Test all code paths
2. **Integration**: Test with orchestrator
3. **Performance**: Benchmark response times
4. **Edge Cases**: Test unusual inputs

### Maintenance
1. **Monitoring**: Track performance metrics
2. **Updates**: Regular trust score updates
3. **Feedback**: Learn from contract outcomes
4. **Evolution**: Adapt to new requirements

## Example: Complete E-commerce Agent

See `examples/ecommerce-agent.ts` for a complete, production-ready implementation.

## Next Steps

- [Writing Contracts](writing-contracts.md) - Best practices for contract authoring
- [API Reference](../api/) - Complete technical documentation
- [Operations Guide](operations.md) - Running agents in production