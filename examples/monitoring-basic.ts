#!/usr/bin/env ts-node

/**
 * Basic Monitoring Example
 *
 * This example demonstrates how to use the monitoring dashboard
 * to track system health, performance metrics, and audit trails.
 */

import { monitoringDashboard } from '../src/monitoring-dashboard';
import { PolicyAuthoritativeOrchestrator } from '../src/domain-agent-orchestrator';

async function main() {
  console.log('📊 Contract-Driven AI Platform - Basic Monitoring Example\n');

  // Start monitoring
  console.log('🚀 Starting monitoring dashboard...');
  monitoringDashboard.start();

  // Initialize orchestrator for demonstration
  const orchestrator = new PolicyAuthoritativeOrchestrator();

  // Simulate some activity
  console.log('🎯 Running sample orchestration to generate metrics...\n');

  const areas = [
    {
      name: "Sample Social Campaign",
      objective: "Create a social media campaign with content calendar and engagement tracking",
      key_requirements: ["Content planning", "Posting schedule", "Engagement metrics"],
      sources: ["Marketing Strategy"],
      depends_on: []
    }
  ];

  try {
    // Run orchestration to generate audit trail
    await orchestrator.orchestrateEnhancementAreas(areas);

    // Wait a moment for metrics to update
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Display current system metrics
    console.log('📈 Current System Metrics:');
    const metrics = monitoringDashboard.getMetrics();

    console.log(`   Contracts Processed: ${metrics.totalContractsProcessed}`);
    console.log(`   Success Rate: ${(metrics.contractSuccessRate * 100).toFixed(1)}%`);
    console.log(`   Average Response Time: ${metrics.averageResponseTime}ms`);
    console.log(`   Active Agents: ${metrics.activeAgents}`);
    console.log(`   Total Audit Entries: ${metrics.totalAuditEntries}`);
    console.log(`   System Uptime: ${Math.floor(metrics.systemUptime / 3600)}h ${Math.floor((metrics.systemUptime % 3600) / 60)}m`);

    // Display recent audit entries
    console.log('\n📋 Recent Audit Trail (last 5 entries):');
    const recentAudits = monitoringDashboard.getRecentAudits(5);

    if (recentAudits.length === 0) {
      console.log('   No audit entries found');
    } else {
      recentAudits.forEach((audit, index) => {
        const timestamp = audit.timestamp.toISOString().substring(11, 19); // HH:MM:SS
        console.log(`   ${index + 1}. ${timestamp} - ${audit.action}`);
        console.log(`      Actor: ${audit.actor}`);
        console.log(`      Duration: ${audit.duration}ms`);

        if (audit.decision?.route) {
          console.log(`      Decision: ${audit.decision.route}`);
        }

        if (audit.metadata?.domain) {
          console.log(`      Domain: ${audit.metadata.domain}`);
        }

        console.log(''); // Empty line for readability
      });
    }

    // Display orchestration audit summary
    const auditTrail = orchestrator.getAuditTrail();
    console.log('🎭 Orchestration Audit Summary:');
    console.log(`   Total Audit Entries: ${auditTrail.length}`);

    // Group by actor
    const byActor = auditTrail.reduce((acc, entry) => {
      acc[entry.actor] = (acc[entry.actor] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log('   By Actor:');
    Object.entries(byActor).forEach(([actor, count]) => {
      console.log(`     ${actor}: ${count} entries`);
    });

    // Group by decision route
    const byRoute = auditTrail.reduce((acc, entry) => {
      const route = entry.decision?.route || 'unknown';
      acc[route] = (acc[route] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log('   By Decision Route:');
    Object.entries(byRoute).forEach(([route, count]) => {
      console.log(`     ${route}: ${count} decisions`);
    });

    // Calculate performance metrics
    const totalDuration = auditTrail.reduce((sum, entry) => sum + entry.duration, 0);
    const avgDuration = totalDuration / auditTrail.length;

    console.log('   Performance:');
    console.log(`     Average Duration: ${avgDuration.toFixed(0)}ms`);
    console.log(`     Total Duration: ${totalDuration}ms`);

    // Show agent capabilities
    console.log('\n🤖 Agent Registry Status:');
    const agentCapabilities = orchestrator.getAgentCapabilities();

    if (agentCapabilities.size === 0) {
      console.log('   No agents registered');
    } else {
      agentCapabilities.forEach((capability, domain) => {
        console.log(`   ${domain}:`);
        console.log(`     Trust Score: ${capability.trustScore.toFixed(2)}`);
        console.log(`     Capabilities: ${capability.capabilities.join(', ')}`);
        console.log(`     Performance - Accuracy: ${(capability.performanceMetrics.accuracy * 100).toFixed(1)}%`);
        console.log(`                   Reliability: ${(capability.performanceMetrics.reliability * 100).toFixed(1)}%`);
        console.log(`                   Speed: ${capability.performanceMetrics.speed.toFixed(2)}`);
      });
    }

    // Simulate tracking agent metrics
    console.log('\n📊 Tracking Agent Performance...');
    monitoringDashboard.trackAgent('social-media', {
      contractsProcessed: 15,
      successRate: 0.93,
      averageResponseTime: 1250,
      errorRate: 0.04,
      lastHealthCheck: new Date()
    });

    console.log('✅ Agent metrics updated');

    // Final metrics display
    console.log('\n🏁 Final System Status:');
    const finalMetrics = monitoringDashboard.getMetrics();
    console.log(`   System Health: ${finalMetrics.contractSuccessRate > 0.9 ? '🟢 Good' : finalMetrics.contractSuccessRate > 0.7 ? '🟡 Fair' : '🔴 Poor'}`);
    console.log(`   Contracts Processed: ${finalMetrics.totalContractsProcessed}`);
    console.log(`   Active Components: ${finalMetrics.activeAgents} agents, ${finalMetrics.totalAuditEntries} audit entries`);

  } catch (error) {
    console.error('❌ Monitoring example failed:', error);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
  process.exit(1);
});

// Run the example
if (require.main === module) {
  main().catch(console.error);
}

export { main };