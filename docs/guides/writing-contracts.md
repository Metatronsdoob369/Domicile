# Writing Contracts: Best Practices

This guide covers best practices for writing effective contracts that produce reliable, governable AI implementations.

## Contract Structure Review

Every contract follows this structure:

```typescript
interface AgentContract {
  enhancement_area: string;        // What to build
  objective: string;               // Why to build it
  implementation_plan: {           // How to build it
    modules: string[];
    architecture: string;
  };
  governance: {                    // Safety and compliance
    security: string;
    compliance: string;
    ethics: string;
  };
  validation_criteria: string;     // Success measurement
  confidence_score: number;        // Agent confidence (0-1)
  depends_on?: string[];          // Prerequisites
  sources?: string[];             // Reference materials
}
```

## Step 1: Define Clear Enhancement Areas

### Good Enhancement Area Names
```
✅ "User Authentication System"
✅ "Payment Processing Pipeline"
✅ "Real-time Analytics Dashboard"
✅ "Automated Customer Support Chatbot"

❌ "Better Security"
❌ "Improve Performance"
❌ "Add Features"
❌ "Fix Stuff"
```

### Characteristics of Good Enhancement Areas
- **Specific**: Clear scope and deliverables
- **Measurable**: Quantifiable success criteria
- **Independent**: Minimal dependencies on other areas
- **Valuable**: Provides clear business value

## Step 2: Write Detailed Objectives

### Objective Guidelines
- Start with an action verb
- Include measurable outcomes
- Specify target users/beneficiaries
- Define success criteria

### Examples

**Poor Objective:**
```
"Make the app better"
```

**Good Objective:**
```
"Reduce user onboarding time from 15 minutes to 5 minutes by implementing a streamlined registration flow with social login integration and progressive profile completion"
```

## Step 3: Define Key Requirements

### Requirement Best Practices
- Use active voice and imperative mood
- Be specific and measurable
- Include acceptance criteria
- Consider edge cases and error handling

### Examples

**Poor Requirements:**
```
- Handle users
- Process data
- Show results
```

**Good Requirements:**
```
- Implement OAuth 2.0 authentication with Google, Facebook, and email/password options
- Validate user input on both client and server side with real-time feedback
- Store user sessions securely with automatic expiration after 24 hours of inactivity
- Provide password reset functionality with email verification and rate limiting
```

## Step 4: Plan Implementation

### Module Definition
Break down into logical, cohesive modules:

```typescript
implementation_plan: {
  modules: [
    "AuthenticationService",     // Core auth logic
    "UserManagement",           // User CRUD operations
    "SessionManager",           // Session handling
    "SecurityMiddleware",       // Security validations
    "AuditLogger"              // Compliance logging
  ],
  architecture: "Microservices with API Gateway and JWT authentication"
}
```

### Architecture Selection Criteria
- **Scale**: Expected load and growth
- **Complexity**: System complexity and team size
- **Technology**: Available skills and constraints
- **Compliance**: Regulatory requirements

## Step 5: Define Governance Rules

### Security Considerations
```typescript
governance: {
  security: "End-to-end encryption, OAuth 2.0, rate limiting, input sanitization"
}
```

### Compliance Requirements
```typescript
governance: {
  compliance: "GDPR data processing, SOC 2 logging, HIPAA patient data handling"
}
```

### Ethical Guidelines
```typescript
governance: {
  ethics: "Bias-free algorithms, transparent decision making, user privacy protection"
}
```

## Step 6: Create Validation Criteria

### SMART Criteria
- **Specific**: Clear what success looks like
- **Measurable**: Quantifiable metrics
- **Achievable**: Realistic targets
- **Relevant**: Business value alignment
- **Time-bound**: Delivery timeline

### Examples

**Poor Criteria:**
```
"Works well"
```

**Good Criteria:**
```
"User authentication success rate > 99.5%, average login time < 2 seconds, security audit passes with zero critical vulnerabilities, supports 10,000 concurrent users"
```

## Step 7: Set Confidence Scores

### Confidence Score Guidelines
- **0.9-1.0**: Well-understood requirements, proven technology
- **0.7-0.9**: Standard requirements, some unknowns
- **0.5-0.7**: Complex requirements, new technology
- **0.3-0.5**: Highly experimental, significant risks
- **0.0-0.3**: Uncertain feasibility

### Factors Affecting Confidence
- **Requirement Clarity**: How well-defined are the requirements?
- **Technology Maturity**: How proven is the technology stack?
- **Team Experience**: How familiar is the team with similar work?
- **External Dependencies**: How many external factors are involved?

## Step 8: Manage Dependencies

### Dependency Types
- **Prerequisite**: Must be completed first
- **Related**: Can be developed in parallel but should be aware
- **Optional**: Nice to have but not required

### Dependency Declaration
```typescript
depends_on: [
  "User Database Schema",        // Prerequisite
  "API Gateway Infrastructure"   // Related
]
```

### Avoiding Circular Dependencies
- Draw dependency graphs before finalizing
- Use topological sorting to validate
- Break circular dependencies by introducing interfaces or events

## Step 9: Reference Sources

### Source Types
- **Requirements Documents**: Business requirements and user stories
- **Technical Specifications**: API docs, data schemas
- **Research Reports**: Industry analysis and best practices
- **Legal Documents**: Compliance requirements and regulations
- **Existing Code**: Reference implementations and patterns

### Source Citation
```typescript
sources: [
  "User Authentication Requirements v2.1",
  "OAuth 2.0 Security Best Practices",
  "GDPR Compliance Guidelines",
  "Existing UserService implementation"
]
```

## Contract Templates

### Web Application Feature
```typescript
{
  enhancement_area: "User Dashboard",
  objective: "Create a personalized dashboard showing user activity, preferences, and recommendations",
  key_requirements: [
    "Display user profile information with edit capabilities",
    "Show activity history with filtering and search",
    "Provide personalized recommendations based on behavior",
    "Implement responsive design for mobile and desktop"
  ],
  implementation_plan: {
    modules: ["DashboardController", "RecommendationEngine", "UserPreferences", "ActivityLogger"],
    architecture: "React SPA with Node.js API and PostgreSQL database"
  },
  governance: {
    security: "JWT authentication, data encryption, XSS protection",
    compliance: "GDPR data portability, CCPA privacy controls",
    ethics: "Transparent recommendation algorithms, no discriminatory content"
  },
  validation_criteria: "Page load time < 2 seconds, user engagement increase > 25%, accessibility score > 95%",
  confidence_score: 0.85,
  depends_on: ["User Authentication System", "Database Schema"],
  sources: ["UI/UX Design Mockups", "User Research Report", "Performance Requirements"]
}
```

### API Service
```typescript
{
  enhancement_area: "Payment Processing API",
  objective: "Implement secure payment processing with multiple provider support",
  key_requirements: [
    "Integrate with Stripe, PayPal, and bank transfers",
    "Implement PCI DSS compliant tokenization",
    "Provide webhook notifications for payment events",
    "Support refunds and chargebacks"
  ],
  implementation_plan: {
    modules: ["PaymentGateway", "WebhookHandler", "RefundManager", "ComplianceLogger"],
    architecture: "Microservices with event-driven architecture and message queues"
  },
  governance: {
    security: "End-to-end encryption, PCI DSS compliance, fraud detection",
    compliance: "SOX audit trails, AML monitoring, transaction reporting",
    ethics: "Fair fee structure, transparent pricing, user consent for payments"
  },
  validation_criteria: "Payment success rate > 99%, average processing time < 5 seconds, security audit passes",
  confidence_score: 0.78,
  depends_on: ["User Authentication", "Database Infrastructure"],
  sources: ["Payment Provider APIs", "PCI DSS Requirements", "Business Requirements"]
}
```

### Data Processing Pipeline
```typescript
{
  enhancement_area: "Customer Analytics Pipeline",
  objective: "Build real-time customer behavior analytics with ML-powered insights",
  key_requirements: [
    "Ingest data from multiple sources (web, mobile, CRM)",
    "Apply ML models for behavior prediction and segmentation",
    "Generate real-time dashboards and alerts",
    "Ensure data quality and governance"
  ],
  implementation_plan: {
    modules: ["DataIngestion", "MLProcessor", "AnalyticsEngine", "DashboardAPI"],
    architecture: "Kafka-based event streaming with Spark ML and Elasticsearch"
  },
  governance: {
    security: "Data encryption, access controls, anonymization",
    compliance: "GDPR data processing, data retention policies",
    ethics: "Bias detection in ML models, privacy-preserving analytics"
  },
  validation_criteria: "Data freshness < 5 minutes, prediction accuracy > 85%, query performance < 100ms",
  confidence_score: 0.72,
  depends_on: ["Data Lake Infrastructure", "ML Model Training Pipeline"],
  sources: ["Data Architecture Design", "ML Model Specifications", "Privacy Requirements"]
}
```

## Common Pitfalls

### Too Vague
**Problem:** Requirements that are open to interpretation
**Solution:** Use specific, measurable criteria

### Over-Constrained
**Problem:** Too many dependencies and restrictions
**Solution:** Focus on essential requirements, defer nice-to-haves

### Technology-Centric
**Problem:** Focusing on implementation details instead of outcomes
**Solution:** Describe what, not how

### Missing Governance
**Problem:** Ignoring security, compliance, and ethical considerations
**Solution:** Address governance upfront in all contracts

### Unrealistic Expectations
**Problem:** Overly ambitious timelines or success criteria
**Solution:** Base estimates on historical data and realistic assessments

## Validation Checklist

Before finalizing a contract:

- [ ] Enhancement area name is clear and specific
- [ ] Objective includes measurable outcomes
- [ ] All key requirements have acceptance criteria
- [ ] Implementation plan covers all requirements
- [ ] Governance addresses security, compliance, and ethics
- [ ] Validation criteria are SMART (Specific, Measurable, Achievable, Relevant, Time-bound)
- [ ] Confidence score reflects realistic assessment
- [ ] Dependencies are minimal and acyclic
- [ ] Sources are cited and accessible
- [ ] Contract has been reviewed by relevant stakeholders

## Tools and Templates

### Contract Validation
```typescript
import { z } from 'zod';

const ContractSchema = z.object({
  enhancement_area: z.string().min(5).max(100),
  objective: z.string().min(20).max(500),
  key_requirements: z.array(z.string().min(10)).min(1).max(10),
  implementation_plan: z.object({
    modules: z.array(z.string().min(3)).min(1),
    architecture: z.string().min(10)
  }),
  governance: z.object({
    security: z.string().min(10),
    compliance: z.string().min(10),
    ethics: z.string().min(10)
  }),
  validation_criteria: z.string().min(20),
  confidence_score: z.number().min(0).max(1),
  depends_on: z.array(z.string()).optional(),
  sources: z.array(z.string()).min(1)
});

export function validateContract(contract: any): boolean {
  try {
    ContractSchema.parse(contract);
    return true;
  } catch (error) {
    console.error('Contract validation failed:', error.errors);
    return false;
  }
}
```

### Contract Builder Utility
```typescript
export class ContractBuilder {
  private contract: Partial<AgentContract> = {};

  enhancementArea(name: string): this {
    this.contract.enhancement_area = name;
    return this;
  }

  objective(description: string): this {
    this.contract.objective = description;
    return this;
  }

  requirements(...reqs: string[]): this {
    this.contract.key_requirements = reqs;
    return this;
  }

  modules(...modules: string[]): this {
    this.contract.implementation_plan = {
      ...this.contract.implementation_plan,
      modules
    };
    return this;
  }

  architecture(arch: string): this {
    this.contract.implementation_plan = {
      ...this.contract.implementation_plan,
      architecture: arch
    };
    return this;
  }

  governance(security: string, compliance: string, ethics: string): this {
    this.contract.governance = { security, compliance, ethics };
    return this;
  }

  validation(criteria: string): this {
    this.contract.validation_criteria = criteria;
    return this;
  }

  confidence(score: number): this {
    this.contract.confidence_score = score;
    return this;
  }

  dependsOn(...deps: string[]): this {
    this.contract.depends_on = deps;
    return this;
  }

  sources(...srcs: string[]): this {
    this.contract.sources = srcs;
    return this;
  }

  build(): AgentContract {
    return ContractSchema.parse(this.contract);
  }
}

// Usage
const contract = new ContractBuilder()
  .enhancementArea("User Authentication")
  .objective("Implement secure user authentication with multiple providers")
  .requirements(
    "Support OAuth 2.0 with Google and Facebook",
    "Implement email/password authentication",
    "Add password reset functionality"
  )
  .modules("AuthService", "OAuthHandler", "PasswordReset")
  .architecture("Microservices with JWT tokens")
  .governance(
    "End-to-end encryption and secure token storage",
    "GDPR compliance for user data",
    "Transparent authentication methods"
  )
  .validation("Authentication success rate > 99%, response time < 500ms")
  .confidence(0.88)
  .dependsOn("User Database", "Email Service")
  .sources("Security Requirements", "OAuth 2.0 Spec")
  .build();
```

## Next Steps

- [Creating Domain Agents](creating-domain-agents.md) - Build agents that implement contracts
- [API Reference](../api/) - Technical details for contract implementation
- [Operations Guide](operations.md) - Running contracts in production