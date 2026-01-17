/**
 * @file types.ts
 * @description Type definitions for Financial Research Agent
 */

export interface FinancialSearchItem {
  query: string;
  reason: string;
}

export interface FinancialSearchPlan {
  searches: FinancialSearchItem[];
}

export interface FinancialReportData {
  short_summary: string;
  markdown_report: string;
  follow_up_questions: string[];
}

export interface VerificationResult {
  verified: boolean;
  issues?: string[];
  confidence?: number;
}

export interface AnalysisSummary {
  summary: string;
  key_findings: string[];
  risk_factors?: string[];
  opportunities?: string[];
}
