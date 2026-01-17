/**
 * @file manager.ts
 * @description Financial Research Manager - Multi-phase research workflow
 * Adapted from examples/financial-research-agent for orchestrator integration
 */

import { Agent, run, RunResult } from '@openai/agents';
import { z } from 'zod';
import {
  FinancialSearchItem,
  FinancialSearchPlan,
  FinancialReportData,
  VerificationResult,
  AnalysisSummary
} from './types';

// --- Sub-Agent Definitions ---

const financialsPrompt = `You are a financial analyst focused on company fundamentals such as revenue, profit, margins and growth trajectory.
Given a collection of web (and optional file) search results about a company, write a concise analysis of its recent financial performance.
Pull out key metrics or quotes. Keep it under 2 paragraphs.`;

const AnalysisSummarySchema = z.object({
  summary: z.string().describe('Short text summary for this aspect of the analysis.'),
});

export const financialsAgent = new Agent({
  name: 'FundamentalsAnalystAgent',
  instructions: financialsPrompt,
  outputType: AnalysisSummarySchema,
});

const plannerPrompt = `You are a financial research planner.
Given a request for financial analysis, produce a set of web searches to gather the context needed.
Aim for recent headlines, earnings calls or 10-K snippets, analyst commentary, and industry background.
Output between 5 and 15 search terms to query for.`;

const FinancialSearchItemSchema = z.object({
  reason: z.string().describe('Your reasoning for why this search is relevant.'),
  query: z.string().describe('The search term to feed into a web (or file) search.'),
});

const FinancialSearchPlanSchema = z.object({
  searches: z.array(FinancialSearchItemSchema).describe('A list of searches to perform.'),
});

export const plannerAgent = new Agent({
  name: 'FinancialPlannerAgent',
  instructions: plannerPrompt,
  model: 'gpt-4o-mini',
  outputType: FinancialSearchPlanSchema,
});

const riskPrompt = `You are a risk analyst looking for potential red flags in a company's outlook.
Given background research, produce a short analysis of risks such as competitive threats, regulatory issues, supply chain problems, or slowing growth.
Keep it under 2 paragraphs.`;

export const riskAgent = new Agent({
  name: 'RiskAnalystAgent',
  instructions: riskPrompt,
  outputType: AnalysisSummarySchema,
});

const searchAgentPrompt = `You are a research assistant specializing in financial topics.
Given a search term, use web search to retrieve up-to-date context and produce a short summary of at most 300 words.
Focus on key numbers, events, or quotes that will be useful to a financial analyst.`;

export const searchAgent = new Agent({
  name: 'FinancialSearchAgent',
  instructions: searchAgentPrompt,
  model: 'gpt-4o',
  tools: [],
  modelSettings: { toolChoice: 'required' },
});

const verifierPrompt = `You are a meticulous auditor. You have been handed a financial analysis report.
Your job is to verify the report is internally consistent, clearly sourced, and makes no unsupported claims.
Point out any issues or uncertainties.`;

const VerificationResultSchema = z.object({
  verified: z.boolean().describe('Whether the report passes verification'),
  issues: z.array(z.string()).optional().describe('Any issues found'),
  confidence: z.number().optional().describe('Confidence score 0-1')
});

export const verifierAgent = new Agent({
  name: 'VerificationAgent',
  instructions: verifierPrompt,
  outputType: VerificationResultSchema,
});

const writerPrompt = `You are a skilled financial writer. Given search results and specialist analyses,
write a structured research report with:
1. Executive Summary
2. Key Findings
3. Detailed Analysis
4. Risks and Opportunities
5. Follow-up Questions

Use markdown formatting. Cite sources. Keep professional tone.`;

const FinancialReportDataSchema = z.object({
  short_summary: z.string().describe('2-3 sentence executive summary'),
  markdown_report: z.string().describe('Full markdown-formatted report'),
  follow_up_questions: z.array(z.string()).describe('Suggested follow-up research questions')
});

export const writerAgent = new Agent({
  name: 'FinancialWriterAgent',
  instructions: writerPrompt,
  outputType: FinancialReportDataSchema,
});

// --- Manager Class ---

// Custom output extractor for sub-agents
async function summaryExtractor(
  runResult: RunResult<unknown, Agent<unknown, any>>,
): Promise<string> {
  return String((runResult.finalOutput as any).summary);
}

export class FinancialResearchManager {
  async run(query: string): Promise<void> {
    console.log(`[FinancialManager] Starting research...`);
    const searchPlan = await this.planSearches(query);
    const searchResults = await this.performSearches(searchPlan);
    const report = await this.writeReport(query, searchResults);
    const verification = await this.verifyReport(report);
    
    console.log(`\n=== FINANCIAL RESEARCH COMPLETE ===`);
    console.log(`Summary: ${report.short_summary}`);
    console.log(`\nVerification: ${verification.verified ? '✅ PASS' : '❌ ISSUES FOUND'}`);
  }

  async planSearches(query: string): Promise<FinancialSearchPlan> {
    console.log(`[FinancialManager] Planning searches...`);
    const result = await run(plannerAgent, `Query: ${query}`);
    console.log(`[FinancialManager] Will perform ${result.finalOutput?.searches.length} searches`);
    return result.finalOutput!;
  }

  async performSearches(searchPlan: FinancialSearchPlan): Promise<string[]> {
    console.log(`[FinancialManager] Executing searches...`);
    let numCompleted = 0;
    const results: (string | null)[] = new Array(searchPlan.searches.length);
    
    await Promise.all(
      searchPlan.searches.map(async (item, i) => {
        const result = await this.search(item);
        results[i] = result;
        numCompleted++;
        console.log(`[FinancialManager] Progress: ${numCompleted}/${searchPlan.searches.length}`);
      }),
    );
    
    console.log(`[FinancialManager] Searches complete.`);
    return results.filter((r): r is string => r !== null);
  }

  async search(item: FinancialSearchItem): Promise<string | null> {
    const inputData = `Search term: ${item.query}\nReason: ${item.reason}`;
    try {
      const result = await run(searchAgent, inputData);
      return String(result.finalOutput);
    } catch {
      return null;
    }
  }

  async writeReport(query: string, searchResults: string[]): Promise<FinancialReportData> {
    // Expose specialist analysts as tools
    const fundamentalsTool = financialsAgent.asTool({
      toolName: 'fundamentals_analysis',
      toolDescription: 'Use to get a short write-up of key financial metrics',
      customOutputExtractor: summaryExtractor,
    });
    
    const riskTool = riskAgent.asTool({
      toolName: 'risk_analysis',
      toolDescription: 'Use to get a short write-up of potential red flags',
      customOutputExtractor: summaryExtractor,
    });
    
    const writerWithTools = writerAgent.clone({
      tools: [fundamentalsTool, riskTool],
    });
    
    console.log(`[FinancialManager] Generating report...`);
    const inputData = `Original query: ${query}\nSummarized search results: ${searchResults}`;
    const result = await run(writerWithTools, inputData);
    console.log(`[FinancialManager] Report generated.`);
    
    return result.finalOutput!;
  }

  async verifyReport(report: FinancialReportData): Promise<VerificationResult> {
    console.log(`[FinancialManager] Verifying report...`);
    const result = await run(verifierAgent, report.markdown_report);
    console.log(`[FinancialManager] Verification complete.`);
    return result.finalOutput!;
  }
}
