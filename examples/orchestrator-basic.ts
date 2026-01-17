#!/usr/bin/env ts-node

/**
 * Basic Orchestrator Example
 *
 * This example demonstrates how to use the PolicyAuthoritativeOrchestrator
 * to process enhancement areas through the contract-driven workflow.
 */

import { PolicyAuthoritativeOrchestrator } from '../src/domain-agent-orchestrator';

async function main() {
  console.log('🎭 Contract-Driven AI Platform - Basic Orchestrator Example\n');

  // Initialize the orchestrator
  const orchestrator = new PolicyAuthoritativeOrchestrator();

  // Define enhancement areas
  const areas = [
    {
      name: "Content Creation Pipeline",
      objective: "Build an automated content creation system with AI writing assistance and brand consistency checking",
      key_requirements: [
        "AI-powered content generation",
        "Brand voice consistency validation",
        "Multi-format output support",
        "Content performance prediction"
      ],
      sources: ["Content Strategy Document", "Brand Guidelines"],
      depends_on: []
    },
    {
      name: "Engagement Optimization Engine",
      objective: "Develop algorithms to optimize posting times, content formats, and audience targeting for maximum engagement",
      key_requirements: [
        "Historical performance analysis",
        "Predictive engagement modeling",
        "A/B testing framework",
        "Real-time optimization"
      ],
      sources: ["Analytics Data", "Engagement Metrics"],
      depends_on: ["Content Creation Pipeline"]
    },
    {
      name: "Audience Segmentation System",
      objective: "Create advanced audience segmentation with psychographic profiling and behavioral clustering",
      key_requirements: [
        "Multi-dimensional user profiling",
        "Behavioral pattern recognition",
        "Dynamic segment updates",
        "Privacy-compliant data handling"
      ],
      sources: ["User Data", "Privacy Policy"],
      depends_on: []
    }
  ];

  console.log(`📋 Processing ${areas.length} enhancement areas...\n`);

  try {
    // Process areas through orchestrator
    console.log('🎯 Starting policy-authoritative orchestration...\n');
    const contracts = await orchestrator.orchestrateEnhancementAreas(areas);

    console.log('✅ Orchestration completed successfully!\n');

    // Display results
    console.log('📋 Generated Contracts:');
    contracts.forEach((contract, index) => {
      console.log(`\n${index + 1}. ${contract.enhancement_area}`);
      console.log(`   📝 Objective: ${contract.objective.substring(0, 80)}...`);
      console.log(`   🏗️  Architecture: ${contract.implementation_plan.architecture}`);
      console.log(`   📦 Modules: ${contract.implementation_plan.modules.join(', ')}`);
      console.log(`   🔒 Security: ${contract.governance.security}`);
      console.log(`   ✅ Validation: ${contract.validation_criteria}`);
      console.log(`   🎯 Confidence: ${(contract.confidence_score * 100).toFixed(1)}%`);
    });

    // Display audit trail summary
    const auditTrail = orchestrator.getAuditTrail();
    console.log('\n📊 Orchestration Audit Summary:');
    console.log(`   Total Decisions: ${auditTrail.length}`);

    const agentDecisions = auditTrail.filter(entry => entry.actor.startsWith('agent:'));
    const policyDecisions = auditTrail.filter(entry => entry.actor === 'policy-engine');
    const fallbacks = auditTrail.filter(entry => entry.fallbackTriggered);

    console.log(`   Agent Routing Decisions: ${agentDecisions.length}`);
    console.log(`   Policy Engine Decisions: ${policyDecisions.length}`);
    console.log(`   Fallback Executions: ${fallbacks.length}`);

    // Show decision breakdown
    console.log('\n🎯 Decision Breakdown:');
    const decisionsByType = auditTrail.reduce((acc, entry) => {
      const type = entry.decision?.route || 'unknown';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    Object.entries(decisionsByType).forEach(([type, count]) => {
      console.log(`   ${type}: ${count} decisions`);
    });

    // Show agent performance
    console.log('\n🤖 Agent Performance:');
    const agentPerformance = auditTrail
      .filter(entry => entry.actor.startsWith('agent:'))
      .reduce((acc, entry) => {
        const agent = entry.actor;
        if (!acc[agent]) {
          acc[agent] = { decisions: 0, avgDuration: 0, totalDuration: 0 };
        }
        acc[agent].decisions++;
        acc[agent].totalDuration += entry.duration;
        acc[agent].avgDuration = acc[agent].totalDuration / acc[agent].decisions;
        return acc;
      }, {} as Record<string, { decisions: number; avgDuration: number; totalDuration: number }>);

    Object.entries(agentPerformance).forEach(([agent, stats]) => {
      console.log(`   ${agent}: ${stats.decisions} contracts, ${(stats.avgDuration).toFixed(0)}ms avg`);
    });

  } catch (error) {
    console.error('❌ Orchestration failed:', error);
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