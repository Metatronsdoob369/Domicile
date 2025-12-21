# 🏗️ Domicile - Contract-Driven AI Platform

**Status:** Integration Phase  
**Architecture:** 6-Layer Contract-First Design with Circadian Learning

## 🎯 What Is Domicile?

Domicile is the first AI platform that:
- **Eliminates prompt fragility** through structured contracts
- **Prevents agent gaming** with independent policy governance  
- **Learns while you sleep** via 3AM dream cycles
- **Starts with mutual understanding** between human and AI

## 🌙 The Circadian Philosophy

```
Day:   Human + AI collaborate with shared vision
Night: System dreams about decisions vs outcomes  
Dawn:  Wake up with better mutual understanding
```

**Result:** AI that gets better at understanding what you actually want.

## 📁 Architecture

```
domicile/
├── packages/
│   ├── core/           # Layer 2: Orchestration (Policy, Registry, Classifier)
│   ├── agents/         # Layer 3: Execution (Domain-specific agents)  
│   ├── contracts/      # Layer 4: Contracts & Schemas
│   ├── covenant/       # Layer 2: Governance (Trust oracles)
│   ├── interface/      # Layer 1: User Interface (CLI, Builder)
│   ├── data/          # Layer 4: Data & Storage (Pinecone, Knowledge)
│   ├── observability/ # Layer 5: Monitoring (Dashboard, Performance)
│   └── operations/    # Layer 6: DevOps (Deployment, Health)
├── docs/              # Documentation
├── examples/          # Usage examples
└── tests/            # Integration tests
```

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run integration validation  
pnpm validate

# Health check
pnpm health-check

# Start development
pnpm dev
```

## 🔄 Component Sources

**Integrated from three projects:**
- `openai-agents-js` → Core orchestration platform (Layers 1-6)
- `contracts` → Contract schema system (Layer 4 + governance)  
- `covenant-ai` → Policy/trust engine (Layer 2 governance)

## 📊 Integration Status

- [x] Components migrated from source projects
- [x] Package structure created
- [ ] Import paths updated for monorepo
- [ ] TypeScript compilation working
- [ ] Basic tests passing
- [ ] Documentation complete

## 🏗️ Development

```bash
# Watch for changes
pnpm dev

# Run tests
pnpm test

# Build all packages
pnpm build

# Lint code
pnpm lint
```

## 🌟 Key Features

### **Contract-Driven Architecture**
- Every AI interaction defined by typed, validated contracts
- No more prompt fragility or ambiguous outputs
- Composable contracts with dependency management

### **Policy Governance** 
- Independent policy engine prevents agent self-preference
- Trust scores based on measured performance metrics
- Automated compliance checking and audit trails

### **Circadian Learning (N8N Integration)**
- 3AM dream cycles analyze performance patterns
- Failed approaches archived with lessons learned
- Constitutional mutations proposed based on evidence
- System wakes up smarter every morning

### **Multi-Agent Workflows**
- Financial research agent with 5-phase workflow
- Social media optimization with engagement tracking  
- Research agents with graph-based knowledge retrieval
- Self-evolving meta-framework with safety gates

## 📖 Documentation

- [Integration Plan](../DOMICILE_INTEGRATION_PLAN.md) - Master blueprint
- [Component Mapping](../COMPONENT_MAPPING.md) - Migration details
- [Roadmap](../INTEGRATION_ROADMAP.md) - Implementation timeline
- [Circadian Philosophy](../CIRCADIAN_PHILOSOPHY.md) - Learning architecture

## 🎊 What Makes This Revolutionary

**Traditional AI:** Fragile prompts, unpredictable outputs, manual scaling  
**Domicile:** Structured contracts, governed agents, self-improving platform

**Traditional Collaboration:** "Build me a thing" → Iterate 10x until right  
**Domicile:** Starts with accurate understanding, delivers correct output first time

**Traditional Learning:** Static models, manual updates, human oversight  
**Domicile:** Dreams about performance, proposes improvements, evolves safely

## 🚀 The Vision

Create a platform where AI and humans begin collaboration with **mutual understanding** and **shared vision** of the output.

Where every failed attempt teaches the system to understand you better.

Where software writes better versions of itself.

**Welcome to the future of human-AI collaboration.** 🌅

---

*"The platform that dreams about its decisions vs outcomes, learning to understand you better while you sleep."*