#!/usr/bin/env ts-node

/**
 * Financial Research Example
 *
 * This example demonstrates a complex multi-agent workflow for financial research,
 * showing how different agents coordinate to produce comprehensive analysis.
 */

import { PolicyAuthoritativeOrchestrator } from '../src/domain-agent-orchestrator';

async function main() {
  console.log('💰 Contract-Driven AI Platform - Financial Research Example\n');

  // Initialize orchestrator
  const orchestrator = new PolicyAuthoritativeOrchestrator();

  // Define comprehensive financial research enhancement areas
  const areas = [
    {
      name: "Market Intelligence Gathering",
      objective: "Build automated system for collecting and processing financial market data from multiple sources with real-time updates",
      key_requirements: [
        "Multi-source data aggregation (Bloomberg, Reuters, SEC filings)",
        "Real-time market data processing",
        "Data quality validation and cleansing",
        "Regulatory compliance (SEC, FINRA requirements)",
        "Historical data archival and retrieval"
      ],
      sources: ["Market Data APIs", "SEC EDGAR Database", "Financial Regulations"],
      depends_on: []
    },
    {
      name: "Risk Assessment Engine",
      objective: "Develop comprehensive risk assessment system with portfolio analysis, stress testing, and regulatory compliance monitoring",
      key_requirements: [
        "Portfolio risk modeling (VaR, CVaR, stress testing)",
        "Regulatory compliance monitoring (Basel III, Dodd-Frank)",
        "Counterparty risk evaluation",
        "Market risk factor analysis",
        "Risk reporting and visualization"
      ],
      sources: ["Risk Management Frameworks", "Regulatory Guidelines", "Portfolio Data"],
      depends_on: ["Market Intelligence Gathering"]
    },
    {
      name: "Investment Research Synthesis",
      objective: "Create AI-powered investment research synthesis engine that combines quantitative analysis with qualitative insights",
      key_requirements: [
        "Automated report generation from data analysis",
        "Natural language processing for qualitative research",
        "Investment thesis development and validation",
        "Peer comparison and benchmarking",
        "Research quality scoring and validation"
      ],
      sources: ["Investment Research Reports", "Financial Statements", "Industry Analysis"],
      depends_on: ["Market Intelligence Gathering", "Risk Assessment Engine"]
    },
    {
      name: "Compliance & Audit Trail",
      objective: "Implement comprehensive compliance monitoring and audit trail system for all financial research activities",
      key_requirements: [
        "Complete audit logging of all decisions and actions",
        "Regulatory reporting automation",
        "Data lineage tracking",
        "Access control and permission management",
        "Compliance violation detection and alerting"
      ],
      sources: ["SOX Compliance Requirements", "Audit Standards", "Security Policies"],
      depends_on: ["Market Intelligence Gathering"]
    }
  ];

  console.log(`📊 Processing ${areas.length} financial research enhancement areas...\n`);

  try {
    // Execute orchestration
    console.log('🏛️ Starting policy-governed financial research orchestration...\n');
    const contracts = await orchestrator.orchestrateEnhancementAreas(areas);

    console.log('✅ Financial research orchestration completed!\n');

    // Display comprehensive results
    console.log('💼 Generated Financial Research Contracts:');
    contracts.forEach((contract, index) => {
      console.log(`\n${index + 1}. ${contract.enhancement_area}`);
      console.log(`   📈 Objective: ${contract.objective.substring(0, 100)}...`);

      console.log(`   🏗️  Architecture: ${contract.implementation_plan.architecture}`);
      console.log(`   📦 Modules (${contract.implementation_plan.modules.length}):`);
      contract.implementation_plan.modules.forEach(module => {
        console.log(`      • ${module}`);
      });

      console.log(`   🔒 Governance:`);
      console.log(`      Security: ${contract.governance.security.substring(0, 80)}...`);
      console.log(`      Compliance: ${contract.governance.compliance.substring(0, 80)}...`);
      console.log(`      Ethics: ${contract.governance.ethics.substring(0, 80)}...`);

      console.log(`   ✅ Validation: ${contract.validation_criteria}`);
      console.log(`   🎯 Confidence: ${(contract.confidence_score * 100).toFixed(1)}%`);
      console.log(`   📚 Sources: ${contract.sources.join(', ')}`);
    });

    // Analyze dependency relationships
    console.log('\n🔗 Dependency Analysis:');
    const dependencyGraph = areas.reduce((graph, area) => {
      graph[area.name] = area.depends_on;
      return graph;
    }, {} as Record<string, string[]>);

    Object.entries(dependencyGraph).forEach(([area, deps]) => {
      if (deps.length > 0) {
        console.log(`   ${area} depends on: ${deps.join(', ')}`);
      } else {
        console.log(`   ${area} is independent`);
      }
    });

    // Calculate topological execution order
    const executionOrder = topologicalSort(dependencyGraph);
    console.log('\n📋 Topological Execution Order:');
    executionOrder.forEach((area, index) => {
      console.log(`   ${index + 1}. ${area}`);
    });

    // Display audit trail analysis
    const auditTrail = orchestrator.getAuditTrail();
    console.log('\n📊 Financial Research Audit Analysis:');
    console.log(`   Total Decisions: ${auditTrail.length}`);

    // Analyze by decision type
    const decisionTypes = auditTrail.reduce((acc, entry) => {
      const route = entry.decision?.route || 'unknown';
      acc[route] = (acc[route] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log('   Decision Distribution:');
    Object.entries(decisionTypes).forEach(([type, count]) => {
      console.log(`     ${type}: ${count} (${(count / auditTrail.length * 100).toFixed(1)}%)`);
    });

    // Performance analysis
    const totalDuration = auditTrail.reduce((sum, entry) => sum + entry.duration, 0);
    const avgDuration = totalDuration / auditTrail.length;

    console.log('   Performance Metrics:');
    console.log(`     Total Processing Time: ${totalDuration}ms`);
    console.log(`     Average Decision Time: ${avgDuration.toFixed(0)}ms`);
    console.log(`     Contracts per Second: ${(contracts.length / (totalDuration / 1000)).toFixed(2)}`);

    // Risk and compliance focus
    const complianceContracts = contracts.filter(c =>
      c.governance.compliance.toLowerCase().includes('sec') ||
      c.governance.compliance.toLowerCase().includes('basel') ||
      c.governance.compliance.toLowerCase().includes('sox')
    );

    console.log('\n🛡️ Compliance-Focused Contracts:');
    console.log(`   Found ${complianceContracts.length} compliance-critical contracts`);
    complianceContracts.forEach(contract => {
      console.log(`   • ${contract.enhancement_area}`);
    });

    // Summary statistics
    console.log('\n📈 Financial Research Summary:');
    console.log(`   Total Contracts: ${contracts.length}`);
    console.log(`   Average Confidence: ${(contracts.reduce((sum, c) => sum + c.confidence_score, 0) / contracts.length * 100).toFixed(1)}%`);
    console.log(`   Governance Modules: ${contracts.flatMap(c => c.implementation_plan.modules).filter(m => m.toLowerCase().includes('audit') || m.toLowerCase().includes('compliance') || m.toLowerCase().includes('security')).length}`);
    console.log(`   Risk-Related Contracts: ${contracts.filter(c => c.enhancement_area.toLowerCase().includes('risk')).length}`);

    console.log('\n✅ Financial research orchestration example completed successfully!');
    console.log('💡 This demonstrates how complex, regulated domains can be systematically addressed with contract-driven AI.');

  } catch (error) {
    console.error('❌ Financial research example failed:', error);
    process.exit(1);
  }
}

// Helper function for topological sorting
function topologicalSort(graph: Record<string, string[]>): string[] {
  const visited = new Set<string>();
  const visiting = new Set<string>();
  const order: string[] = [];

  function visit(node: string) {
    if (visited.has(node)) return;
    if (visiting.has(node)) throw new Error('Circular dependency detected');

    visiting.add(node);

    const dependencies = graph[node] || [];
    for (const dep of dependencies) {
      visit(dep);
    }

    visiting.delete(node);
    visited.add(node);
    order.unshift(node);
  }

  for (const node of Object.keys(graph)) {
    if (!visited.has(node)) {
      visit(node);
    }
  }

  return order;
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