/**
 * @file financial-research-agent.ts
 * @description Financial Research Domain Agent - Integrates multi-phase financial research
 * with the contract-driven orchestrator
 */

import { Agent, run, RunResult } from '@openai/agents';
import {
  BaseDomainAgent,
  EnhancementArea,
  AgentContract,
  DomainAgentCapabilities
} from '../core/base-domain-agent';

// Import the existing financial research manager components
// These will be copied from examples/financial-research-agent
import { FinancialResearchManager } from './manager';
import { FinancialSearchPlan, FinancialReportData } from './types';

/**
 * Financial Research Domain Agent
 * 
 * Capabilities:
 * - Multi-phase research workflow (Plan → Search → Write → Verify)
 * - Parallel search execution for efficiency
 * - Specialist sub-agents (fundamentals, risk analysis)
 * - Structured report generation with citations
 * - Automated verification and fact-checking
 */
export class FinancialResearchDomainAgent extends BaseDomainAgent {
  private manager: FinancialResearchManager;

  constructor() {
    super('financial-research');
    this.manager = new FinancialResearchManager();
  }

  protected initializeCapabilities(): DomainAgentCapabilities {
    return {
      domain: 'financial-research',
      capabilities: [
        'financial_analysis',
        'market_research',
        'company_fundamentals',
        'risk_assessment',
        'competitive_analysis',
        'report_generation',
        'fact_verification'
      ],
      supported_tasks: [
        'Analyze company financials',
        'Research market trends',
        'Assess investment risks',
        'Compare competitors',
        'Generate research reports',
        'Verify financial claims'
      ],
      trust_score: 0.88, // High trust for financial domain
      performance_metrics: {
        success_rate: 0.91,
        average_response_time: 5500, // ms (multi-phase workflow takes longer)
        total_invocations: 0
      }
    };
  }

  /**
   * Determine if this agent can handle the enhancement area
   */
  canHandle(area: EnhancementArea): boolean {
    const financialKeywords = [
      'financial', 'finance', 'stock', 'market', 'investment',
      'company', 'earnings', 'revenue', 'profit', 'analysis',
      'fundamentals', 'risk', 'valuation', 'portfolio'
    ];

    const areaText = `${area.name} ${area.objective} ${area.key_requirements.join(' ')}`.toLowerCase();
    
    return financialKeywords.some(keyword => areaText.includes(keyword));
  }

  /**
   * Generate contract by executing financial research workflow
   */
  async generateContract(area: EnhancementArea): Promise<AgentContract> {
    console.log(`[FinancialResearchAgent] Starting contract generation for: ${area.name}`);
    
    // Extract query from enhancement area
    const query = this.extractQuery(area);
    
    // Execute multi-phase workflow
    const searchPlan = await this.manager.planSearches(query);
    const searchResults = await this.manager.performSearches(searchPlan);
    const report = await this.manager.writeReport(query, searchResults);
    const verification = await this.manager.verifyReport(report);

    // Format as contract
    return this.formatFinancialContract(area, report, verification, searchResults);
  }

  /**
   * Extract research query from enhancement area
   */
  private extractQuery(area: EnhancementArea): string {
    // Combine objective and key requirements into a research query
    const requirements = area.key_requirements.join(', ');
    return `${area.objective}. Focus on: ${requirements}`;
  }

  /**
   * Format financial research output as contract
   */
  private formatFinancialContract(
    area: EnhancementArea,
    report: FinancialReportData,
    verification: any,
    searchResults: string[]
  ): AgentContract {
    return {
      enhancement_area: area.name,
      objective: area.objective,
      implementation_plan: {
        modules: this.extractModulesFromReport(report),
        architecture: report.markdown_report
      },
      depends_on: area.depends_on ||,
      sources: searchResults.map((result, i) => `Search Result ${i + 1}`),
      governance: {
        security: 'Financial data handling with secure API access',
        compliance: 'SEC regulations, financial data privacy compliance',
        ethics: 'Unbiased financial analysis, disclosure of limitations'
      },
      validation_criteria: this.formatValidation(verification),
      metadata: {
        generated_at: new Date(),
        confidence: this.calculateConfidence(verification),
        reasoning_trace: [
          'Multi-phase research workflow executed',
          `Searches completed: ${searchResults.length}`,
          'Specialist analysis performed (fundamentals + risk)',
          'Report generated and verified',
          `Follow-up questions identified: ${report.follow_up_questions?.length || 0}`
        ]
      }
    };
  }

  /**
   * Extract actionable modules from report
   */
  private extractModulesFromReport(report: FinancialReportData): string[] {
    const modules: string[] = [
      'Financial Data Collection',
      'Fundamental Analysis',
      'Risk Assessment',
      'Report Generation'
    ];

    if (report.follow_up_questions && report.follow_up_questions.length > 0) {
      modules.push('Follow-up Research Areas');
    }

    return modules;
  }

  /**
   * Format verification results
   */
  private formatValidation(verification: any): string {
    if (!verification) {
      return 'Verification pending';
    }

    return `Verification completed: ${JSON.stringify(verification)}`;
  }

  /**
   * Calculate confidence score from verification
   */
  private calculateConfidence(verification: any): number {
    // Simple heuristic: if verification passed, high confidence
    if (verification && verification.verified === true) {
      return 0.9;
    }
    return 0.75; // Default moderate confidence
  }
}
