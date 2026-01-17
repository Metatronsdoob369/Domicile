# Production Deployment Guide

This guide covers deploying the Contract-Driven AI Platform to production environments with enterprise-grade reliability and scalability.

## Prerequisites

### Infrastructure Requirements
- **Kubernetes cluster** (v1.24+) or equivalent container orchestration
- **PostgreSQL database** (v13+) for metadata storage
- **Pinecone** account for vector storage
- **Redis** (v6+) for caching and session management
- **Load balancer** (AWS ALB, NGINX, etc.)
- **Monitoring stack** (Prometheus, Grafana, ELK)

### Environment Setup
```bash
# Clone repository
git clone https://github.com/your-org/contract-ai-platform.git
cd contract-ai-platform

# Create production environment file
cp .env.example .env.production
# Edit with production API keys and database URLs
```

## Step 1: Containerize the Application

### Dockerfile
```dockerfile
FROM node:22-alpine

# Install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Start application
CMD ["npm", "start"]
```

### Build and Push Images
```bash
# Build Docker image
docker build -t contract-ai-platform:v1.0.0 .

# Tag for registry
docker tag contract-ai-platform:v1.0.0 your-registry.com/contract-ai-platform:v1.0.0

# Push to registry
docker push your-registry.com/contract-ai-platform:v1.0.0
```

## Step 2: Database Setup

### PostgreSQL Configuration
```sql
-- Create database
CREATE DATABASE contract_ai_platform;

-- Create user
CREATE USER contract_user WITH ENCRYPTED PASSWORD 'secure_password';

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE contract_ai_platform TO contract_user;

-- Create tables
CREATE TABLE contracts (
    id UUID PRIMARY KEY,
    enhancement_area TEXT NOT NULL,
    objective TEXT NOT NULL,
    implementation_plan JSONB,
    governance JSONB,
    validation_criteria TEXT,
    confidence_score DECIMAL(3,2),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE audit_log (
    id UUID PRIMARY KEY,
    timestamp TIMESTAMP NOT NULL,
    actor TEXT NOT NULL,
    action TEXT NOT NULL,
    decision JSONB,
    contract_id UUID REFERENCES contracts(id),
    metadata JSONB
);

-- Create indexes
CREATE INDEX idx_contracts_enhancement_area ON contracts(enhancement_area);
CREATE INDEX idx_audit_log_timestamp ON audit_log(timestamp);
CREATE INDEX idx_audit_log_actor ON audit_log(actor);
```

### Pinecone Setup
```typescript
import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

// Create index for contracts
await pinecone.createIndex({
  name: 'contract-index',
  dimension: 1536, // OpenAI embedding dimension
  metric: 'cosine',
  spec: {
    serverless: {
      cloud: 'aws',
      region: 'us-east-1'
    }
  }
});
```

## Step 3: Kubernetes Deployment

### Namespace Setup
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: contract-ai-platform
  labels:
    name: contract-ai-platform
```

### ConfigMap for Configuration
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: contract-ai-config
  namespace: contract-ai-platform
data:
  NODE_ENV: "production"
  LOG_LEVEL: "info"
  METRICS_ENABLED: "true"
  AUDIT_LOG_ENABLED: "true"
```

### Secret for Sensitive Data
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: contract-ai-secrets
  namespace: contract-ai-platform
type: Opaque
data:
  OPENAI_API_KEY: <base64-encoded-key>
  PINECONE_API_KEY: <base64-encoded-key>
  DATABASE_URL: <base64-encoded-url>
  REDIS_URL: <base64-encoded-url>
```

### Deployment Manifest
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: contract-ai-platform
  namespace: contract-ai-platform
spec:
  replicas: 3
  selector:
    matchLabels:
      app: contract-ai-platform
  template:
    metadata:
      labels:
        app: contract-ai-platform
    spec:
      containers:
      - name: contract-ai-platform
        image: your-registry.com/contract-ai-platform:v1.0.0
        ports:
        - containerPort: 3000
        envFrom:
        - configMapRef:
            name: contract-ai-config
        - secretRef:
            name: contract-ai-secrets
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

### Service Manifest
```yaml
apiVersion: v1
kind: Service
metadata:
  name: contract-ai-platform
  namespace: contract-ai-platform
spec:
  selector:
    app: contract-ai-platform
  ports:
  - port: 80
    targetPort: 3000
  type: ClusterIP
```

### Ingress Configuration
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: contract-ai-platform
  namespace: contract-ai-platform
  annotations:
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
  - hosts:
    - api.contract-ai-platform.com
    secretName: contract-ai-tls
  rules:
  - host: api.contract-ai-platform.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: contract-ai-platform
            port:
              number: 80
```

## Step 4: Monitoring Setup

### Prometheus Configuration
```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'contract-ai-platform'
    static_configs:
      - targets: ['contract-ai-platform:3000']
    metrics_path: '/metrics'
    scrape_interval: 15s
```

### Grafana Dashboard
Key metrics to monitor:
- Contract success rates
- Agent performance by domain
- Policy violation trends
- System throughput and latency
- Resource utilization
- Error rates and types

### Alert Rules
```yaml
groups:
  - name: contract-ai-platform
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m]) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"

      - alert: LowContractSuccessRate
        expr: contract_success_rate < 0.95
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Contract success rate below threshold"
```

## Step 5: Security Configuration

### Network Policies
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: contract-ai-platform
  namespace: contract-ai-platform
spec:
  podSelector:
    matchLabels:
      app: contract-ai-platform
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    ports:
    - protocol: TCP
      port: 3000
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: postgres
    ports:
    - protocol: TCP
      port: 5432
  - to: []
    ports:
    - protocol: TCP
      port: 53
    - protocol: UDP
      port: 53
```

### Security Context
```yaml
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1001
    fsGroup: 1001
  containers:
  - securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      runAsNonRoot: true
      runAsUser: 1001
      capabilities:
        drop:
        - ALL
```

### Secrets Management
Use external secret management:
- AWS Secrets Manager
- HashiCorp Vault
- Azure Key Vault
- Kubernetes secrets with encryption

## Step 6: Scaling Configuration

### Horizontal Pod Autoscaling
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: contract-ai-platform
  namespace: contract-ai-platform
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: contract-ai-platform
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

### Database Scaling
- Read replicas for read-heavy workloads
- Connection pooling with PgBouncer
- Query optimization and indexing
- Partitioning for large datasets

### Caching Strategy
```typescript
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

// Cache contract lookups
const contractCache = {
  async get(key: string) {
    const cached = await redis.get(`contract:${key}`);
    return cached ? JSON.parse(cached) : null;
  },

  async set(key: string, value: any, ttl = 3600) {
    await redis.setex(`contract:${key}`, ttl, JSON.stringify(value));
  }
};
```

## Step 7: Backup and Recovery

### Database Backups
```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -h $DB_HOST -U $DB_USER -d $DB_NAME > backup_$DATE.sql

# Upload to S3
aws s3 cp backup_$DATE.sql s3://contract-ai-backups/

# Clean up old backups (keep 30 days)
aws s3 ls s3://contract-ai-backups/ | while read -r line; do
  createDate=$(echo $line | awk {'print $1" "$2'})
  createDate=$(date -d"$createDate" +%s)
  olderThan=$(date -d'30 days ago' +%s)
  if [[ $createDate -lt $olderThan ]]; then
    fileName=$(echo $line | awk {'print $4'})
    aws s3 rm s3://contract-ai-backups/$fileName
  fi
done
```

### Pinecone Backups
- Export vector data periodically
- Store in cloud storage with versioning
- Test restoration procedures

### Application Backups
- Configuration snapshots
- Agent registry backups
- Audit log archival

## Step 8: Testing Deployment

### Pre-deployment Tests
```bash
# Run integration tests
npm run test:integration

# Test container build
docker build -t test-image .
docker run --rm test-image npm test

# Test Kubernetes manifests
kubectl apply -f manifests/ --dry-run=client
```

### Post-deployment Validation
```bash
# Health checks
curl https://api.contract-ai-platform.com/health

# Load testing
npm run test:load

# Contract execution test
curl -X POST https://api.contract-ai-platform.com/contracts \
  -H "Content-Type: application/json" \
  -d '{"enhancement_area": "Test Contract", "objective": "Validate deployment"}'
```

## Step 9: Rollback Procedures

### Blue-Green Deployment
```bash
# Switch traffic to previous version
kubectl patch service contract-ai-platform \
  -p '{"spec":{"selector":{"version": "v1.0.0"}}}'

# Or use ingress annotation
kubectl annotate ingress contract-ai-platform \
  nginx.ingress.kubernetes.io/canary-weight=100
```

### Database Rollback
```bash
# Restore from backup
pg_restore -h $DB_HOST -U $DB_USER -d $DB_NAME backup_20241103.sql

# Or use point-in-time recovery
psql -h $DB_HOST -U $DB_USER -d $DB_NAME \
  -c "SELECT pg_create_restore_point('rollback_point');"
```

## Step 10: Monitoring and Maintenance

### Daily Checks
- [ ] Review error logs and alerts
- [ ] Check contract success rates
- [ ] Monitor resource utilization
- [ ] Verify backup completion

### Weekly Maintenance
- [ ] Update dependencies and security patches
- [ ] Review and optimize slow queries
- [ ] Analyze agent performance trends
- [ ] Test backup restoration

### Monthly Reviews
- [ ] Security audit and penetration testing
- [ ] Performance optimization
- [ ] Cost analysis and optimization
- [ ] Capacity planning

## Troubleshooting Common Issues

### High Latency
1. Check database query performance
2. Review Redis cache hit rates
3. Analyze agent response times
4. Consider horizontal scaling

### Memory Issues
1. Monitor heap usage and garbage collection
2. Check for memory leaks in agent code
3. Adjust container resource limits
4. Implement connection pooling

### Database Connection Problems
1. Verify connection string and credentials
2. Check connection pool settings
3. Monitor database server resources
4. Implement retry logic with exponential backoff

### Agent Failures
1. Review agent error logs
2. Check agent trust scores and performance
3. Validate input data and schemas
4. Implement circuit breaker patterns

## Performance Benchmarks

### Expected Performance
- **Contract Processing**: < 5 seconds average
- **API Response Time**: < 500ms P95
- **Concurrent Users**: 10,000+ with proper scaling
- **Uptime**: 99.9% SLA
- **Data Freshness**: < 30 seconds for real-time features

### Scaling Guidelines
- **1-100 contracts/minute**: 3-5 pod replicas
- **100-500 contracts/minute**: 5-10 pod replicas
- **500+ contracts/minute**: 10+ pod replicas with database optimization

## Security Checklist

- [ ] All secrets stored in external vault
- [ ] Network policies restrict traffic
- [ ] Security contexts prevent privilege escalation
- [ ] TLS encryption enabled end-to-end
- [ ] Regular security updates applied
- [ ] Audit logging enabled and monitored
- [ ] Access controls implemented
- [ ] Vulnerability scanning integrated

## Next Steps

- [Operations Guide](operations.md) - Day-to-day operations
- [API Reference](../api/) - Technical API documentation
- [Troubleshooting](../DEPLOYMENT_GUIDE.md) - Incident response procedures