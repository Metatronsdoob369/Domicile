# Monitoring API Reference

The monitoring API provides comprehensive observability into the Contract-Driven AI Platform, including real-time metrics, health checks, and performance tracking.

## MonitoringDashboard Class

Main monitoring interface for system observability.

```typescript
class MonitoringDashboard {
  start(): void;
  getMetrics(): SystemMetrics;
  getRecentAudits(count?: number): AuditEntry[];
  getSlowQueries(): QueryPerformance[];
  trackAgent(domain: string, metrics: AgentMetrics): void;
  trackContract(contractId: string, status: ContractStatus): void;
}
```

### Methods

#### start

Initializes the monitoring dashboard and begins metric collection.

```typescript
start(): void
```

**Example:**
```typescript
import { monitoringDashboard } from './src/monitoring-dashboard';

monitoringDashboard.start();
console.log('Monitoring dashboard started');
```

#### getMetrics

Retrieves current system-wide metrics.

```typescript
getMetrics(): SystemMetrics
```

**Returns:** Current system metrics object

**SystemMetrics Interface:**
```typescript
interface SystemMetrics {
  totalContractsProcessed: number;
  contractSuccessRate: number;
  averageResponseTime: number;
  activeAgents: number;
  totalAuditEntries: number;
  systemUptime: number;
  memoryUsage: number;
  cpuUsage: number;
}
```

**Example:**
```typescript
const metrics = monitoringDashboard.getMetrics();

console.log('System Health:');
console.log(`Contracts Processed: ${metrics.totalContractsProcessed}`);
console.log(`Success Rate: ${(metrics.contractSuccessRate * 100).toFixed(1)}%`);
console.log(`Average Response: ${metrics.averageResponseTime}ms`);
console.log(`Active Agents: ${metrics.activeAgents}`);
```

#### getRecentAudits

Retrieves recent audit log entries.

```typescript
getRecentAudits(count?: number): AuditEntry[]
```

**Parameters:**
- `count` (optional): Number of recent entries to retrieve (default: 10)

**Returns:** Array of recent audit entries

**Example:**
```typescript
const audits = monitoringDashboard.getRecentAudits(5);

audits.forEach(audit => {
  console.log(`${audit.timestamp}: ${audit.action} by ${audit.actor}`);
});
```

#### getSlowQueries

Identifies database queries with poor performance.

```typescript
getSlowQueries(): QueryPerformance[]
```

**Returns:** Array of slow query performance data

**QueryPerformance Interface:**
```typescript
interface QueryPerformance {
  query: string;
  table: string;
  executionTime: number;
  callCount: number;
  averageTime: number;
  suggestedIndex?: string;
}
```

#### trackAgent

Records performance metrics for a specific agent.

```typescript
trackAgent(domain: string, metrics: AgentMetrics): void
```

**Parameters:**
- `domain`: Agent domain identifier
- `metrics`: Agent performance metrics

**AgentMetrics Interface:**
```typescript
interface AgentMetrics {
  contractsProcessed: number;
  successRate: number;
  averageResponseTime: number;
  errorRate: number;
  lastHealthCheck: Date;
}
```

**Example:**
```typescript
monitoringDashboard.trackAgent('social-media', {
  contractsProcessed: 150,
  successRate: 0.93,
  averageResponseTime: 1250,
  errorRate: 0.04,
  lastHealthCheck: new Date()
});
```

#### trackContract

Tracks the lifecycle of a specific contract.

```typescript
trackContract(contractId: string, status: ContractStatus): void
```

**Parameters:**
- `contractId`: Unique contract identifier
- `status`: Current contract status

**ContractStatus Interface:**
```typescript
interface ContractStatus {
  stage: 'created' | 'processing' | 'completed' | 'failed';
  progress: number; // 0-100
  agent?: string;
  errorMessage?: string;
  startTime: Date;
  lastUpdate: Date;
}
```

## AuditLogger Class

Handles audit trail logging and retrieval.

```typescript
class AuditLogger {
  log(entry: AuditEntry): void;
  getAuditTrail(): AuditEntry[];
  getDecisionsByActor(actor: string): AuditEntry[];
  getFailedDecisions(): AuditEntry[];
  getDecisionsByTimeRange(start: Date, end: Date): AuditEntry[];
}
```

### Methods

#### log

Records an audit entry.

```typescript
log(entry: AuditEntry): void
```

**Parameters:**
- `entry`: Audit entry to record

**AuditEntry Interface:**
```typescript
interface AuditEntry {
  timestamp: Date;
  correlationId: string;
  actor: string;
  action: string;
  decision: PolicyDecision;
  contract?: AgentContract;
  result?: any;
  duration: number;
  metadata: Record<string, any>;
}
```

**Example:**
```typescript
import { auditLogger } from './src/orchestration/audit-logger';

auditLogger.log({
  timestamp: new Date(),
  correlationId: 'contract-123',
  actor: 'policy-engine',
  action: 'agent_routing_decision',
  decision: {
    route: 'AGENT',
    agentId: 'social-media-agent',
    explanation: 'High confidence social media domain detected'
  },
  duration: 150,
  metadata: {
    domain: 'social-media',
    confidence: 0.89
  }
});
```

#### getAuditTrail

Retrieves complete audit trail.

```typescript
getAuditTrail(): AuditEntry[]
```

**Returns:** Array of all audit entries

#### getDecisionsByActor

Filters audit trail by specific actor.

```typescript
getDecisionsByActor(actor: string): AuditEntry[]
```

**Parameters:**
- `actor`: Actor identifier to filter by

**Example:**
```typescript
const policyDecisions = auditLogger.getDecisionsByActor('policy-engine');
const agentDecisions = auditLogger.getDecisionsByActor('social-media-agent');

console.log(`${policyDecisions.length} policy decisions`);
console.log(`${agentDecisions.length} agent executions`);
```

#### getFailedDecisions

Retrieves audit entries for failed decisions.

```typescript
getFailedDecisions(): AuditEntry[]
```

**Returns:** Array of failed decision audit entries

#### getDecisionsByTimeRange

Retrieves audit entries within a time range.

```typescript
getDecisionsByTimeRange(start: Date, end: Date): AuditEntry[]
```

**Parameters:**
- `start`: Start of time range
- `end`: End of time range

## PerformanceOptimizer Class

Handles performance optimization and caching.

```typescript
class PerformanceOptimizer {
  executeLLMCalls(calls: LLMCall[]): Promise<any[]>;
  getCacheStats(): CacheStats;
  clearCache(pattern?: string): void;
  optimizeBatch(calls: LLMCall[]): LLMCall[][];
}
```

### Methods

#### executeLLMCalls

Executes multiple LLM calls with optimization.

```typescript
executeLLMCalls(calls: LLMCall[]): Promise<any[]>
```

**Parameters:**
- `calls`: Array of LLM calls to execute

**Returns:** Array of LLM responses

**LLMCall Interface:**
```typescript
interface LLMCall {
  messages: Array<{ role: string; content: string }>;
  model: string;
  temperature?: number;
  cacheKey?: string;
  priority?: 'low' | 'normal' | 'high';
}
```

**Example:**
```typescript
import { performanceOptimizer } from './src/performance-optimizer';

const calls = [
  {
    messages: [{ role: 'user', content: 'Generate contract for social media' }],
    model: 'gpt-4',
    temperature: 0.3,
    cacheKey: 'contract-social-media'
  }
];

const results = await performanceOptimizer.executeLLMCalls(calls);
console.log('LLM Results:', results);
```

#### getCacheStats

Retrieves caching performance statistics.

```typescript
getCacheStats(): CacheStats
```

**Returns:** Cache performance metrics

**CacheStats Interface:**
```typescript
interface CacheStats {
  totalRequests: number;
  cacheHits: number;
  cacheMisses: number;
  hitRate: number;
  averageResponseTime: number;
  cacheSize: number;
}
```

#### clearCache

Clears cache entries.

```typescript
clearCache(pattern?: string): void
```

**Parameters:**
- `pattern` (optional): Pattern to match for selective clearing

#### optimizeBatch

Optimizes batch processing of LLM calls.

```typescript
optimizeBatch(calls: LLMCall[]): LLMCall[][]
```

**Parameters:**
- `calls`: Array of LLM calls to optimize

**Returns:** Optimized batches of calls

## Health Check Endpoints

### GET /health

Basic health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-11-03T12:00:00.000Z",
  "version": "1.0.0"
}
```

### GET /health/detailed

Detailed health check with component status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-11-03T12:00:00.000Z",
  "components": {
    "database": {
      "status": "healthy",
      "responseTime": 45
    },
    "pinecone": {
      "status": "healthy",
      "responseTime": 120
    },
    "redis": {
      "status": "healthy",
      "responseTime": 5
    }
  },
  "metrics": {
    "uptime": 86400,
    "totalContracts": 1250,
    "successRate": 0.94
  }
}
```

### GET /metrics

Prometheus-compatible metrics endpoint.

**Response Format:**
```
# HELP contract_success_rate Contract success rate
# TYPE contract_success_rate gauge
contract_success_rate 0.94

# HELP agent_response_time_ms Agent response time in milliseconds
# TYPE agent_response_time_ms histogram
agent_response_time_ms_bucket{le="100"} 25
agent_response_time_ms_bucket{le="500"} 180
agent_response_time_ms_bucket{le="1000"} 245
agent_response_time_ms_bucket{le="5000"} 250
agent_response_time_ms_bucket{le="+Inf"} 250
agent_response_time_ms_sum 125000
agent_response_time_ms_count 250
```

## Alerting API

### AlertManager Class

Manages alerting rules and notifications.

```typescript
class AlertManager {
  addRule(rule: AlertRule): void;
  removeRule(ruleId: string): void;
  getActiveAlerts(): Alert[];
  acknowledgeAlert(alertId: string): void;
}
```

### AlertRule Interface

Defines alerting conditions and actions.

```typescript
interface AlertRule {
  id: string;
  name: string;
  condition: string; // PromQL-style expression
  threshold: number;
  duration: string; // e.g., "5m", "1h"
  severity: 'low' | 'medium' | 'high' | 'critical';
  channels: string[]; // e.g., ['slack', 'email', 'sms']
  description: string;
  runbookUrl?: string;
}
```

**Example Alert Rules:**
```typescript
const alertRules = [
  {
    id: 'high-error-rate',
    name: 'High Error Rate',
    condition: 'rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m]) > 0.05',
    threshold: 0.05,
    duration: '5m',
    severity: 'critical',
    channels: ['slack', 'email'],
    description: 'Error rate exceeded 5% for 5 minutes',
    runbookUrl: 'https://docs.example.com/runbooks/high-error-rate'
  },
  {
    id: 'low-contract-success',
    name: 'Low Contract Success Rate',
    condition: 'contract_success_rate < 0.9',
    threshold: 0.9,
    duration: '10m',
    severity: 'high',
    channels: ['slack'],
    description: 'Contract success rate below 90% for 10 minutes'
  }
];
```

## Data Export API

### GET /export/metrics

Exports metrics data for analysis.

**Query Parameters:**
- `start`: Start timestamp (ISO format)
- `end`: End timestamp (ISO format)
- `format`: Export format ('json', 'csv', 'prometheus')

**Example:**
```bash
curl "https://api.contract-ai-platform.com/export/metrics?start=2025-11-01T00:00:00Z&end=2025-11-03T00:00:00Z&format=json"
```

### GET /export/audits

Exports audit trail data.

**Query Parameters:**
- `actor`: Filter by actor
- `action`: Filter by action
- `start`: Start timestamp
- `end`: End timestamp
- `limit`: Maximum records to return

**Example:**
```bash
curl "https://api.contract-ai-platform.com/export/audits?actor=policy-engine&start=2025-11-01T00:00:00Z&limit=1000"
```

## Configuration

### Monitoring Configuration

```typescript
interface MonitoringConfig {
  enabled: boolean;
  metrics: {
    collectionInterval: number; // milliseconds
    retentionPeriod: number; // days
    exporters: string[]; // ['prometheus', 'cloudwatch', 'datadog']
  };
  alerting: {
    enabled: boolean;
    rules: AlertRule[];
    notificationChannels: NotificationChannel[];
  };
  audit: {
    enabled: boolean;
    retentionPeriod: number; // days
    compression: boolean;
  };
}
```

### Notification Channels

```typescript
interface NotificationChannel {
  type: 'slack' | 'email' | 'sms' | 'webhook';
  config: Record<string, any>; // Channel-specific configuration
}
```

**Example Configuration:**
```typescript
const monitoringConfig: MonitoringConfig = {
  enabled: true,
  metrics: {
    collectionInterval: 15000, // 15 seconds
    retentionPeriod: 30, // 30 days
    exporters: ['prometheus', 'datadog']
  },
  alerting: {
    enabled: true,
    rules: alertRules,
    notificationChannels: [
      {
        type: 'slack',
        config: {
          webhookUrl: process.env.SLACK_WEBHOOK_URL,
          channel: '#alerts'
        }
      }
    ]
  },
  audit: {
    enabled: true,
    retentionPeriod: 90, // 90 days
    compression: true
  }
};
```

## Best Practices

### Metric Collection
1. **Business Metrics First**: Focus on contract success and user value
2. **Actionable Metrics**: Only collect data that drives decisions
3. **Consistent Naming**: Use clear, consistent metric names
4. **Appropriate Granularity**: Balance detail with performance

### Alerting
1. **Avoid Alert Fatigue**: Only alert on actionable issues
2. **Progressive Escalation**: Start with warnings, escalate to critical
3. **Clear Runbooks**: Every alert should have a response procedure
4. **Regular Review**: Audit and update alert rules regularly

### Audit Logging
1. **Complete Coverage**: Log all significant actions and decisions
2. **Structured Data**: Use consistent schemas for log entries
3. **Privacy Compliance**: Mask sensitive data appropriately
4. **Efficient Storage**: Use compression and appropriate retention

### Performance Monitoring
1. **Baseline Establishment**: Know normal performance ranges
2. **Trend Analysis**: Monitor changes over time
3. **Root Cause Analysis**: Correlate metrics to identify issues
4. **Capacity Planning**: Use metrics to plan scaling needs

This monitoring API provides comprehensive observability for maintaining and optimizing the Contract-Driven AI Platform in production environments.