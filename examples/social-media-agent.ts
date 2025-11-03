#!/usr/bin/env ts-node

/**
 * Social Media Agent Example
 *
 * This example demonstrates how to use the SocialMediaDomainAgent
 * directly for social media specific contract generation.
 */

import { SocialMediaDomainAgent } from '../src/domain-agent-orchestrator';

async function main() {
  console.log('📱 Contract-Driven AI Platform - Social Media Agent Example\n');

  // Initialize the social media agent
  const socialAgent = new SocialMediaDomainAgent();

  console.log('🤖 Social Media Agent initialized');
  console.log(`   Domain: ${socialAgent.domain}\n`);

  // Define social media enhancement areas
  const areas = [
    {
      name: "Instagram Content Strategy",
      objective: "Develop a comprehensive Instagram content strategy with visual storytelling, hashtag optimization, and engagement tactics",
      key_requirements: [
        "Visual content calendar creation",
        "Hashtag research and optimization",
        "Storytelling framework development",
        "Engagement rate improvement tactics",
        "Brand consistency guidelines"
      ],
      sources: ["Instagram Best Practices", "Brand Guidelines", "Audience Research"],
      depends_on: []
    },
    {
      name: "TikTok Viral Content Engine",
      objective: "Build a system for creating viral TikTok content with trend analysis, music selection, and timing optimization",
      key_requirements: [
        "Real-time trend detection",
        "Viral sound and music pairing",
        "Optimal posting time calculation",
        "Content format optimization",
        "Performance prediction algorithms"
      ],
      sources: ["TikTok Analytics", "Viral Content Studies", "Music Licensing"],
      depends_on: []
    },
    {
      name: "Cross-Platform Campaign Management",
      objective: "Create unified campaign management across Instagram, TikTok, and Twitter with consistent messaging and coordinated timing",
      key_requirements: [
        "Unified content themes",
        "Platform-specific adaptations",
        "Coordinated posting schedules",
        "Cross-platform analytics",
        "Campaign performance tracking"
      ],
      sources: ["Multi-Platform Strategy", "Campaign Analytics"],
      depends_on: ["Instagram Content Strategy", "TikTok Viral Content Engine"]
    }
  ];

  console.log(`📋 Processing ${areas.length} social media enhancement areas...\n`);

  try {
    // Test agent capabilities
    console.log('🔍 Testing agent capabilities:');
    areas.forEach((area, index) => {
      const canHandle = socialAgent.canHandle(area);
      console.log(`   ${index + 1}. ${canHandle ? '✅' : '❌'} ${area.name}`);
    });

    console.log('');

    // Generate contracts for each area
    const contracts = [];

    for (const area of areas) {
      console.log(`🎯 Generating contract for: ${area.name}`);
      console.log(`   "${area.objective}"\n`);

      const contract = await socialAgent.generateContract(area);
      contracts.push(contract);

      console.log('📋 Generated Contract:');
      console.log(`   Enhancement Area: ${contract.enhancement_area}`);
      console.log(`   Architecture: ${contract.implementation_plan.architecture}`);
      console.log(`   Modules: ${contract.implementation_plan.modules.join(', ')}`);
      console.log(`   Security: ${contract.governance.security}`);
      console.log(`   Compliance: ${contract.governance.compliance}`);
      console.log(`   Ethics: ${contract.governance.ethics}`);
      console.log(`   Validation: ${contract.validation_criteria}`);
      console.log(`   Confidence: ${(contract.confidence_score * 100).toFixed(1)}%\n`);
    }

    // Demonstrate subtask coordination
    console.log('🔄 Demonstrating subtask coordination...\n');

    const mainContract = contracts[0]; // Instagram Content Strategy
    console.log(`Coordinating subtasks for: ${mainContract.enhancement_area}`);

    // Note: In a real implementation, this would generate actual subtasks
    // For this example, we'll simulate the coordination logic
    const subtasks = [
      {
        enhancement_area: `${mainContract.enhancement_area} - Visual Content`,
        objective: "Create visual content calendar with brand-consistent imagery",
        implementation_plan: {
          modules: ["ImageGenerator", "BrandValidator"],
          architecture: "Cloud-based content generation"
        },
        governance: mainContract.governance,
        validation_criteria: "Brand consistency score > 90%",
        confidence_score: 0.87,
        depends_on: [mainContract.enhancement_area],
        sources: mainContract.sources
      },
      {
        enhancement_area: `${mainContract.enhancement_area} - Hashtag Strategy`,
        objective: "Develop hashtag optimization strategy for reach maximization",
        implementation_plan: {
          modules: ["HashtagAnalyzer", "TrendTracker"],
          architecture: "Real-time analytics pipeline"
        },
        governance: mainContract.governance,
        validation_criteria: "Hashtag performance improvement > 25%",
        confidence_score: 0.91,
        depends_on: [mainContract.enhancement_area],
        sources: mainContract.sources
      }
    ];

    console.log(`Generated ${subtasks.length} subtasks:`);
    subtasks.forEach((subtask, index) => {
      console.log(`   ${index + 1}. ${subtask.enhancement_area}`);
      console.log(`      Confidence: ${(subtask.confidence_score * 100).toFixed(1)}%`);
      console.log(`      Modules: ${subtask.implementation_plan.modules.join(', ')}\n`);
    });

    // Summary
    console.log('📊 Summary:');
    console.log(`   Total Contracts: ${contracts.length}`);
    console.log(`   Total Subtasks: ${subtasks.length}`);
    console.log(`   Average Confidence: ${(contracts.reduce((sum, c) => sum + c.confidence_score, 0) / contracts.length * 100).toFixed(1)}%`);

    const allModules = contracts.flatMap(c => c.implementation_plan.modules);
    const uniqueModules = [...new Set(allModules)];
    console.log(`   Unique Modules: ${uniqueModules.length}`);
    console.log(`   Module Types: ${uniqueModules.join(', ')}`);

    console.log('\n✅ Social Media Agent example completed successfully!');

  } catch (error) {
    console.error('❌ Social media agent example failed:', error);
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