#!/usr/bin/env ts-node

/**
 * Basic Builder Example
 *
 * This example demonstrates how to use the BuilderAgent to create
 * a complete system from a natural language requirement.
 */

import { BuilderAgent } from '../src/builder-agent';

async function main() {
  console.log('🚀 Contract-Driven AI Platform - Basic Builder Example\n');

  // Initialize the builder agent
  const builder = new BuilderAgent();

  // Define a requirement
  const requirement = {
    description: "Build a social media content calendar system with automated posting and engagement tracking",
    scale: 'mvp' as const,
    domain: 'social-media',
    technologies: ['react', 'nodejs', 'postgresql']
  };

  console.log('📝 Building system for requirement:');
  console.log(`   "${requirement.description}"\n`);

  try {
    // Build the system
    console.log('🏗️  Generating contracts and architecture...');
    const manifest = await builder.build(requirement);

    console.log('✅ System built successfully!\n');

    // Display results
    console.log('📋 Build Manifest:');
    console.log(`   Project ID: ${manifest.projectId}`);
    console.log(`   Domain: ${manifest.domain}`);
    console.log(`   Architecture: ${manifest.architecture.pattern}`);
    console.log(`   Tech Stack: ${Object.keys(manifest.techStack).join(', ')}`);
    console.log(`   Contracts Generated: ${manifest.contracts.length}`);

    console.log('\n📋 Enhancement Areas:');
    manifest.enhancementAreas.forEach((area, index) => {
      console.log(`   ${index + 1}. ${area.name} (${area.priority} priority)`);
      console.log(`      Complexity: ${area.estimatedComplexity}/10`);
    });

    console.log('\n🏗️  Architecture Components:');
    manifest.architecture.components.forEach(component => {
      console.log(`   • ${component.name} (${component.type})`);
      console.log(`     Technologies: ${component.technologies.join(', ')}`);
    });

    console.log('\n📦 Generated Code Artifacts:');
    Object.keys(manifest.generatedCode).forEach(type => {
      console.log(`   • ${type}: ${Object.keys(manifest.generatedCode[type]).length} files`);
    });

    console.log('\n🚀 Deployment Configuration:');
    console.log(`   Platform: ${manifest.deployment.platform}`);
    console.log(`   Pipeline Steps: ${manifest.deployment.pipeline.join(' → ')}`);
    console.log(`   Scaling Strategy: ${manifest.deployment.scaling.strategy}`);

  } catch (error) {
    console.error('❌ Build failed:', error);
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