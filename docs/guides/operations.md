# Operations Guide: Day-to-Day Management

This guide covers the day-to-day operations of running the Contract-Driven AI Platform in production, including monitoring, maintenance, troubleshooting, and optimization.

## Daily Operations

### Morning Health Check

**System Status Verification:**
```bash
# Check Kubernetes pods
kubectl get pods -n contract-ai-platform

# Verify all services are running
kubectl get deployments -n contract-ai-platform

# Check recent logs for errors
kubectl logs -n contract-ai-platform --since=1h --tail=100

# Database connectivity
psql $DATABASE_URL -c "SELECT COUNT(*) FROM contracts;"

# Pinecone health
curl -H "Api-Key: $PINECONE_API_KEY" \
  https://controller.$PINECONE_ENV.pinecone.io/actions/whoami
```

**Key Metrics Review:**
- Contract success rate (>95%)
- Average response time (<5 seconds)
- Error rate (<5%)
- Active agent count
- Queue depth (should be 0)

### Contract Processing Monitoring

**Real-time Dashboard:**
```bash
# Start monitoring dashboard
npm run dashboard

# Or check via API
curl https://api.contract-ai-platform.com/metrics | jq .
```

**Contract Queue Management:**
```typescript
import { orchestrator } from './src/orchestrator';

// Check pending contracts
const pendingContracts = await orchestrator.getPendingContracts();
console.log(`Pending contracts: ${pendingContracts.length}`);

// Process stuck contracts
for (const contract of pendingContracts) {
  if (contract.age > 3600000) { // 1 hour
    await orchestrator.retryContract(contract.id);
  }
}
```

## Weekly Maintenance

### Agent Performance Review

**Trust Score Updates:**
```typescript
import { agentRegistry } from './src/orchestration/agent-registry';

// Review agent performance
const agents = agentRegistry.getAllAgents();

for (const agent of agents) {
  const metrics = await agent.getPerformanceMetrics();

  // Update trust scores based on recent performance
  if (metrics.successRate > 0.95 && metrics.averageResponseTime < 3000) {
    agent.trustScore = Math.min(1.0, agent.trustScore + 0.02);
  } else if (metrics.successRate < 0.90) {
    agent.trustScore = Math.max(0.5, agent.trustScore - 0.05);
  }

  console.log(`${agent.domain}: ${agent.trustScore.toFixed(2)} (${metrics.successRate.toFixed(2)} success)`);
}
```

**Agent Health Checks:**
```bash
# Test agent responsiveness
curl -X POST https://api.contract-ai-platform.com/agents/health \
  -H "Content-Type: application/json" \
  -d '{"agents": ["social-media", "finance", "healthcare"]}'

# Expected response:
# {
#   "social-media": { "status": "healthy", "responseTime": 245 },
#   "finance": { "status": "healthy", "responseTime": 312 },
#   "healthcare": { "status": "degraded", "responseTime": 5000 }
# }
```

### Policy Engine Audit

**Review Recent Decisions:**
```typescript
import { auditLogger } from './src/orchestration/audit-logger';

// Get recent policy decisions
const recentDecisions = auditLogger.getRecentDecisions(100);

// Analyze patterns
const approvalRate = recentDecisions.filter(d => d.approved).length / recentDecisions.length;
const humanReviews = recentDecisions.filter(d => d.decision.route === 'HUMAN').length;

console.log(`Approval Rate: ${(approvalRate * 100).toFixed(1)}%`);
console.log(`Human Reviews: ${humanReviews}`);
console.log(`Policy Violations: ${recentDecisions.filter(d => !d.approved).length}`);
```

**Policy Effectiveness:**
- High approval rate indicates good contract quality
- Low human review count suggests effective automation
- Policy violations should be investigated and addressed

### Database Maintenance

**Index Optimization:**
```sql
-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM contracts WHERE created_at > NOW() - INTERVAL '24 hours';

-- Add performance indexes if needed
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_contracts_created_at
ON contracts(created_at DESC);

-- Update statistics
ANALYZE contracts;
ANALYZE audit_log;
```

**Data Cleanup:**
```sql
-- Archive old audit logs (keep last 90 days)
INSERT INTO audit_log_archive
SELECT * FROM audit_log
WHERE timestamp < NOW() - INTERVAL '90 days';

DELETE FROM audit_log
WHERE timestamp < NOW() - INTERVAL '90 days';

-- Vacuum and reindex
VACUUM ANALYZE contracts;
REINDEX TABLE contracts;
```

## Monthly Operations

### Capacity Planning

**Resource Usage Analysis:**
```bash
# Check pod resource usage
kubectl top pods -n contract-ai-platform

# Database size and growth
psql $DATABASE_URL -c "
  SELECT schemaname, tablename,
         pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
  FROM pg_tables
  WHERE schemaname = 'public'
  ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;"

# Pinecone usage
curl -H "Api-Key: $PINECONE_API_KEY" \
  https://controller.$PINECONE_ENV.pinecone.io/databases/contract-index
```

**Scaling Decisions:**
- If CPU > 70% average, increase pod count
- If memory > 80% average, increase memory limits
- If database growing > 20% monthly, plan partitioning
- If Pinecone usage near limits, increase quota

### Security Updates

**Dependency Updates:**
```bash
# Check for vulnerabilities
npm audit

# Update dependencies
npm update

# Test after updates
npm test

# Build and deploy
npm run build
kubectl rollout restart deployment/contract-ai-platform -n contract-ai-platform
```

**Security Scanning:**
```bash
# Run security scan
npm run security:scan

# Check container images
trivy image your-registry.com/contract-ai-platform:v1.0.0

# Review permissions
kubectl auth can-i --list -n contract-ai-platform
```

### Performance Optimization

**Query Optimization:**
```typescript
// Identify slow queries
const slowQueries = await monitoringDashboard.getSlowQueries();

// Optimize indexes
for (const query of slowQueries) {
  await database.addIndex(query.table, query.columns);
}
```

**Caching Strategy Review:**
```typescript
// Analyze cache hit rates
const cacheStats = await redis.info('stats');
const hitRate = cacheStats.keyspace_hits /
                (cacheStats.keyspace_hits + cacheStats.keyspace_misses);

if (hitRate < 0.8) {
  console.log('Low cache hit rate, consider cache optimization');
  // Implement cache warming or increase TTL
}
```

## Incident Response

### Alert Classification

**Severity Levels:**
- **Critical**: System down, data loss, security breach
- **High**: Degraded performance, failing contracts
- **Medium**: Intermittent issues, monitoring alerts
- **Low**: Minor issues, informational alerts

### Response Procedures

**Critical Incident:**
1. **Acknowledge** alert within 5 minutes
2. **Assess** impact and scope
3. **Communicate** to stakeholders
4. **Contain** the issue (rollback, failover)
5. **Investigate** root cause
6. **Resolve** and test fix
7. **Document** incident and lessons learned

**Example Critical Response:**
```bash
# Check system status
kubectl get pods -n contract-ai-platform

# If pods failing, check logs
kubectl logs -n contract-ai-platform --previous

# Rollback deployment
kubectl rollout undo deployment/contract-ai-platform -n contract-ai-platform

# Verify rollback
kubectl get pods -n contract-ai-platform
```

### Common Issues and Solutions

**High Error Rate:**
```bash
# Check recent errors
kubectl logs -n contract-ai-platform --since=1h | grep ERROR

# Check agent health
curl https://api.contract-ai-platform.com/health/agents

# Restart unhealthy agents
kubectl delete pod -l app=contract-ai-platform -n contract-ai-platform
```

**Database Connection Issues:**
```bash
# Check database connectivity
psql $DATABASE_URL -c "SELECT 1;"

# Check connection pool
kubectl exec -n contract-ai-platform deployment/contract-ai-platform -- \
  node -e "console.log(process.env.DATABASE_URL)"

# Restart application
kubectl rollout restart deployment/contract-ai-platform -n contract-ai-platform
```

**Pinecone API Issues:**
```bash
# Check Pinecone status
curl https://status.pinecone.io/

# Verify API key
curl -H "Api-Key: $PINECONE_API_KEY" \
  https://controller.$PINECONE_ENV.pinecone.io/actions/whoami

# Check rate limits
curl -H "Api-Key: $PINECONE_API_KEY" \
  https://controller.$PINECONE_ENV.pinecone.io/databases
```

## Backup and Recovery

### Automated Backups

**Database Backup:**
```bash
# Daily backup (run via cron)
pg_dump -h $DB_HOST -U $DB_USER $DB_NAME | gzip > backup_$(date +%Y%m%d).sql.gz

# Upload to S3
aws s3 cp backup_$(date +%Y%m%d).sql.gz s3://contract-ai-backups/
```

**Configuration Backup:**
```bash
# Backup Kubernetes manifests
kubectl get all -n contract-ai-platform -o yaml > k8s-backup-$(date +%Y%m%d).yaml

# Backup secrets (encrypted)
kubectl get secrets -n contract-ai-platform -o yaml > secrets-backup-$(date +%Y%m%d).yaml
```

### Recovery Procedures

**Database Recovery:**
```bash
# Stop application
kubectl scale deployment contract-ai-platform --replicas=0 -n contract-ai-platform

# Restore database
gunzip backup_20241103.sql.gz
psql -h $DB_HOST -U $DB_USER $DB_NAME < backup_20241103.sql

# Restart application
kubectl scale deployment contract-ai-platform --replicas=3 -n contract-ai-platform
```

**Application Recovery:**
```bash
# Rollback to previous version
kubectl rollout undo deployment/contract-ai-platform -n contract-ai-platform

# Or redeploy from known good image
kubectl set image deployment/contract-ai-platform \
  contract-ai-platform=your-registry.com/contract-ai-platform:v1.0.0 \
  -n contract-ai-platform
```

## Monitoring and Alerting

### Key Metrics to Monitor

**Business Metrics:**
- Contract success rate
- Average contract processing time
- User satisfaction scores
- System availability

**Technical Metrics:**
- API response times
- Error rates by endpoint
- Database query performance
- Cache hit rates
- Agent performance by domain

**Infrastructure Metrics:**
- CPU and memory utilization
- Network I/O
- Disk usage
- Pod restarts

### Alert Configuration

**Critical Alerts:**
```yaml
# System down
- alert: SystemDown
  expr: up{job="contract-ai-platform"} == 0
  for: 5m
  labels:
    severity: critical

# High error rate
- alert: HighErrorRate
  expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
  for: 5m
  labels:
    severity: critical
```

**Warning Alerts:**
```yaml
# Degraded performance
- alert: SlowResponseTime
  expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 10
  for: 10m
  labels:
    severity: warning

# Low contract success
- alert: LowContractSuccess
  expr: contract_success_rate < 0.9
  for: 15m
  labels:
    severity: warning
```

## Cost Optimization

### Resource Optimization

**Right-sizing Containers:**
```bash
# Analyze resource usage
kubectl top pods -n contract-ai-platform --containers

# Adjust resource requests/limits based on usage
kubectl patch deployment contract-ai-platform -n contract-ai-platform \
  --type='json' -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/resources/requests/memory", "value": "512Mi"}]'
```

**Database Optimization:**
```sql
-- Identify slow queries
SELECT query, total_time, calls, mean_time
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;

-- Add indexes for slow queries
CREATE INDEX CONCURRENTLY idx_contracts_gin ON contracts USING gin (implementation_plan);
```

### Cost Monitoring

**Cloud Cost Analysis:**
```bash
# AWS Cost Explorer (example)
aws ce get-cost-and-usage \
  --time-period Start=2024-11-01,End=2024-11-30 \
  --metrics BlendedCost \
  --group-by Type=DIMENSION,Key=SERVICE

# Key services to monitor:
# - EC2 (Kubernetes nodes)
# - RDS (PostgreSQL)
# - ElastiCache (Redis)
# - API Gateway
# - CloudWatch
```

**Optimization Strategies:**
- Use spot instances for non-critical workloads
- Implement auto-scaling based on demand
- Use reserved instances for predictable workloads
- Optimize data transfer costs
- Implement caching to reduce API calls

## Compliance and Auditing

### Regular Audits

**Security Audit:**
```bash
# Run automated security scan
npm run security:audit

# Review access logs
grep "authentication" /var/log/contract-ai/*.log

# Check for suspicious activity
grep "failed" /var/log/contract-ai/*.log | tail -20
```

**Compliance Checks:**
- GDPR: Data processing agreements, consent management
- SOC 2: Access controls, audit trails
- HIPAA: PHI protection, access logging (if applicable)

### Documentation Updates

**Runbook Updates:**
- Document new incident types and responses
- Update contact information
- Review and update escalation procedures

**Knowledge Base:**
- Document solutions to common issues
- Maintain troubleshooting guides
- Update performance baselines

## Team Coordination

### On-call Rotation

**Schedule Management:**
- Primary and secondary on-call engineers
- 24/7 coverage with backup contacts
- Handover procedures for shift changes

**Communication:**
- Slack channels for alerts and updates
- Incident response documentation
- Post-mortem meetings for major incidents

### Training and Knowledge Sharing

**Documentation:**
- Maintain up-to-date runbooks
- Create video tutorials for complex procedures
- Regular knowledge sharing sessions

**Certification:**
- AWS/GCP certifications for infrastructure
- Security training and awareness
- Domain-specific training (healthcare, finance)

## Emergency Procedures

### Data Breach Response
1. **Isolate** affected systems
2. **Assess** data exposure
3. **Notify** affected parties (if required by law)
4. **Contain** breach and prevent further exposure
5. **Investigate** root cause
6. **Remediate** vulnerabilities
7. **Report** to authorities if required

### System Outage
1. **Assess** impact and scope
2. **Communicate** status to stakeholders
3. **Implement** temporary workarounds
4. **Restore** service using backup procedures
5. **Monitor** system during recovery
6. **Conduct** post-mortem analysis

### Legal Hold
1. **Preserve** all relevant data and logs
2. **Stop** automated data deletion
3. **Document** preservation procedures
4. **Coordinate** with legal counsel
5. **Maintain** chain of custody

This operations guide ensures the Contract-Driven AI Platform runs reliably, securely, and efficiently in production environments.