# Getting Started

Welcome to the Contract-Driven AI Platform! This guide will get you up and running in 5 minutes.

## Prerequisites

- **Node.js 22+** - Required runtime
- **OpenAI API Key** - For LLM capabilities
- **Pinecone API Key** - Optional, for vector storage features

## Installation

```bash
# Install the platform
npm install @yourorg/contract-ai-platform

# Or clone the repository for development
git clone https://github.com/yourorg/contract-ai-platform.git
cd contract-ai-platform
npm install
```

## Environment Setup

1. **Copy environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Configure API keys in `.env`:**
   ```bash
   OPENAI_API_KEY=your_openai_key_here
   PINECONE_API_KEY=your_pinecone_key_here  # Optional
   ```

3. **Test configuration:**
   ```bash
   npm run test:env
   ```

## Your First Contract

Let's build a simple social media management system:

```typescript
import { BuilderAgent } from './src/builder-agent';

async function main() {
  const builder = new BuilderAgent();

  const requirement = {
    description: "Build a social media content calendar system",
    scale: 'mvp' as const,
    domain: 'social-media'
  };

  console.log('🚀 Building your system...');
  const manifest = await builder.build(requirement);

  console.log('✅ System built successfully!');
  console.log('📋 Project ID:', manifest.projectId);
  console.log('🏗️ Architecture:', manifest.architecture.pattern);
  console.log('🤖 Generated contracts:', manifest.contracts.length);
}

main().catch(console.error);
```

**Expected Output:**
```
🚀 Building your system...
📝 Phase 0: Enhancing prompt into Phase-1 Analysis Contract...
🔍 Detecting domain independently...
⚖️ Policy Engine evaluating routing decision...
🤖 Orchestrating agent: social-media-agent
✅ Enterprise Build Complete! Manifest generated for: build-123456
🏗️ Architecture: microservices
🤖 Agent Used: social-media-agent
📋 Audited Decision: High-confidence social media domain detected
```

## Example: Financial Research Automation

Build an automated financial research system:

```typescript
import { BuilderAgent } from './src/builder-agent';

async function buildFinancialResearch() {
  const builder = new BuilderAgent();

  const requirement = {
    description: "Create an automated investment research platform with SEC filing analysis and risk assessment",
    scale: 'production' as const,
    domain: 'finance',
    technologies: ['python', 'postgresql', 'react']
  };

  const manifest = await builder.build(requirement);

  console.log('📊 Financial Research Platform Built:');
  console.log('🏗️ Architecture:', manifest.architecture.pattern);
  console.log('📈 Components:', manifest.architecture.components.length);
  console.log('🤖 Agents Used:', manifest.contracts.length);
}

buildFinancialResearch();
```

## Example: Healthcare Workflow Optimization

Create a HIPAA-compliant healthcare automation system:

```typescript
import { PolicyAuthoritativeOrchestrator } from './src/domain-agent-orchestrator';

async function healthcareAutomation() {
  const orchestrator = new PolicyAuthoritativeOrchestrator();

  // Define healthcare enhancement areas
  const areas = [
    {
      name: "Patient Data Processing",
      objective: "Secure patient data ingestion and processing pipeline",
      key_requirements: [
        "HIPAA compliance validation",
        "PHI data masking",
        "Audit trail generation"
      ],
      sources: ["HIPAA Guidelines", "Clinical Data Standards"]
    },
    {
      name: "Clinical Decision Support",
      objective: "AI-assisted clinical workflow optimization",
      key_requirements: [
        "Evidence-based recommendations",
        "Provider credentialing",
        "Outcome tracking"
      ],
      sources: ["Clinical Guidelines", "Medical Research"]
    }
  ];

  const contracts = await orchestrator.orchestrateEnhancementAreas(areas);

  console.log(`🏥 Generated ${contracts.length} healthcare contracts`);
  contracts.forEach(contract => {
    console.log(`📋 ${contract.enhancement_area}: ${contract.confidence_score} confidence`);
  });
}

healthcareAutomation();
```

## Understanding the Output

The platform generates a complete **Build Manifest** containing:

- **Enhancement Areas**: Modular requirements broken down
- **System Architecture**: Optimal technical design
- **Agent Contracts**: Detailed implementation specifications
- **Code Artifacts**: Generated frontend, backend, and infrastructure code
- **Deployment Config**: Production-ready deployment specifications

## Example: Direct Orchestration

Use the policy-authoritative orchestrator with YAML-defined enhancement areas:

```typescript
import { PolicyAuthoritativeOrchestrator } from './src/domain-agent-orchestrator';

async function orchestrateFromYAML() {
  const orchestrator = new PolicyAuthoritativeOrchestrator();

  // Define enhancement areas directly
  const areas = [
    {
      name: "Audience Segmentation Depth",
      objective: "Multi-dimensional segmentation including psychographics, geo-location, and device type",
      key_requirements: [
        "Implement psychographic segmentation (interests, behaviors)",
        "Add geo-location and device type targeting",
        "Create multi-dimensional user profiles"
      ],
      sources: ["Analytics Data", "User Research"],
      depends_on: []
    },
    {
      name: "Performance Prediction Models",
      objective: "Integrate machine learning models for real-time post success predictions",
      key_requirements: [
        "Train ML models on historical post performance data",
        "Enable real-time success predictions",
        "Implement continuous learning from performance data"
      ],
      sources: ["Performance Metrics", "ML Datasets"],
      depends_on: ["Audience Segmentation Depth"]
    }
  ];

  console.log('🎭 Starting policy-authoritative orchestration...');
  const contracts = await orchestrator.orchestrateEnhancementAreas(areas);

  console.log(`✅ Generated ${contracts.length} validated contracts`);

  // View audit trail
  const auditTrail = orchestrator.getAuditTrail();
  console.log('📊 Total decisions made:', auditTrail.length);

  // Show contract details
  contracts.forEach((contract, index) => {
    console.log(`${index + 1}. ${contract.enhancement_area}`);
    console.log(`   Confidence: ${(contract.confidence_score * 100).toFixed(1)}%`);
    console.log(`   Architecture: ${contract.implementation_plan.architecture}`);
  });
}

orchestrateFromYAML();
```

**Expected Output:**
```
🎭 Starting policy-authoritative orchestration...
📋 Processing 2 enhancement areas
🔍 Analyzing: Audience Segmentation Depth
🏷️ Classified as: social-media (89.2% confidence)
✅ Policy approved routing to social-media agent
🔍 Analyzing: Performance Prediction Models
🏷️ Classified as: social-media (91.5% confidence)
✅ Policy approved routing to social-media agent
✅ Generated 2 validated contracts
📊 Total decisions made: 4
1. Audience Segmentation Depth
   Confidence: 92.0%
   Architecture: Microservices-based event-driven architecture
2. Performance Prediction Models
   Confidence: 88.5%
   Architecture: Firebase-backed microservice
```

## Example: Monitoring & Observability

Check system health and view real-time metrics:

```typescript
import { monitoringDashboard } from './src/monitoring-dashboard';

async function checkSystemHealth() {
  // Start monitoring
  monitoringDashboard.start();

  // Get current metrics
  const metrics = monitoringDashboard.getMetrics();

  console.log('📊 System Health Report:');
  console.log('🔄 Contracts Processed:', metrics.totalContractsProcessed);
  console.log('✅ Success Rate:', `${(metrics.contractSuccessRate * 100).toFixed(1)}%`);
  console.log('⏱️ Average Response Time:', `${metrics.averageResponseTime}ms`);
  console.log('🤖 Active Agents:', metrics.activeAgents);

  // View recent audit entries
  const recentAudits = monitoringDashboard.getRecentAudits(5);
  console.log('\n📋 Recent Audit Entries:');
  recentAudits.forEach(audit => {
    console.log(`- ${audit.timestamp}: ${audit.action} by ${audit.actor}`);
  });
}

checkSystemHealth();
```

## Running the Examples

All examples can be run directly from the repository:

```bash
# Make sure you're in the project directory
cd /Users/joewales/NODE_OUT_Master/openai-agents-js

# Install dependencies
npm install

# Set up environment (copy and edit .env)
cp .env.example .env
# Edit .env with your API keys

# Run the basic builder example
npx ts-node examples/builder-basic.ts

# Run the orchestration example
npx ts-node examples/orchestrator-basic.ts

# Run the monitoring example
npx ts-node examples/monitoring-basic.ts
```

### Example Files Included

- `examples/builder-basic.ts` - Simple system building
- `examples/orchestrator-basic.ts` - Contract orchestration
- `examples/monitoring-basic.ts` - Health checking
- `examples/social-media-agent.ts` - Domain-specific agent usage
- `examples/financial-research.ts` - Multi-agent workflows

## Next Steps

1. **Explore Examples**: Check `examples/` directory for working code
2. **Read Concepts**: Understand [contracts](concepts/contracts.md) and [policies](concepts/policies.md)
3. **Build Custom Agents**: Follow the [agent creation guide](guides/creating-domain-agents.md)
4. **Deploy to Production**: See the [deployment guide](../DEPLOYMENT_GUIDE.md)

## Troubleshooting

### Common Issues

**"OpenAI API Key not found"**
- Ensure `OPENAI_API_KEY` is set in `.env`
- Check API key validity at [OpenAI Platform](https://platform.openai.com/api-keys)

**"Pinecone connection failed"**
- Pinecone is optional - remove `PINECONE_API_KEY` to disable vector features
- Verify API key at [Pinecone Console](https://www.pinecone.io/)

**"Build timeout"**
- Complex requirements may take time
- Check system resources and network connectivity
- Use smaller `scale` setting for faster builds

### Getting Help

- **GitHub Issues**: Report bugs and request features
- **Discussions**: Ask questions and share ideas
- **Documentation**: Comprehensive guides in this `docs/` directory

## What's Next?

Now that you have a working system, explore:

- [Core Concepts](concepts/) - Understand the platform deeply
- [Guides](guides/) - Step-by-step tutorials
- [API Reference](api/) - Complete technical documentation
- [Examples](../examples/) - Working code samples

Welcome to the future of AI orchestration! 🎉