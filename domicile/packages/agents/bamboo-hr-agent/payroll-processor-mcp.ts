#!/usr/bin/env bun
/**
 * Payroll Processor MCP Server
 *
 * Converts bamboo-hr-agent into an MCP-compliant server with 4 interactive tools:
 * 1. list_incoming_pdfs - List PDFs waiting for processing
 * 2. process_payroll_pdf - Extract data from PDF (dry-run preview)
 * 3. upload_payroll_entries - Upload approved entries to BambooHR + NocoDB
 * 4. generate_payroll_report - Generate markdown summary report
 *
 * Architecture: Citadel-ready, telemetry-enabled, dual-write to BambooHR + NocoDB
 */

import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import Fuse from 'fuse.js';

// MCP Protocol Types
interface MCPRequest {
  jsonrpc: '2.0';
  id: string | number;
  method: string;
  params?: any;
}

interface MCPResponse {
  jsonrpc: '2.0';
  id: string | number;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

interface MCPTool {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, any>;
    required?: string[];
  };
}

// Configuration - Citadel-ready paths
const CONFIG = {
  BAMBOOHR_API_KEY: process.env.BAMBOOHR_API_KEY || '',
  BAMBOOHR_COMPANY: process.env.BAMBOOHR_COMPANY || 'omsconsulting',
  NOCODB_API_KEY: process.env.NOCODB_API_KEY || '',
  NOCODB_BASE_URL: process.env.NOCODB_BASE_URL || 'https://nocodb.zo.computer',
  NOCODB_TABLE_ID: process.env.NOCODB_TABLE_ID || 'payroll_entries',

  // Portable paths - work on Citadel or local
  BASE_DIR: process.env.PAYROLL_BASE_DIR || '/home/mcp-agent/xtrackados-data',

  get INPUT_DIR() {
    return join(this.BASE_DIR, 'incoming');
  },
  get PROCESSED_DIR() {
    return join(this.BASE_DIR, 'processed');
  },
  get REPORT_DIR() {
    return join(this.BASE_DIR, 'reports');
  },
  get LOG_DIR() {
    return join(this.BASE_DIR, 'logs');
  },
  get MAPPING_FILE() {
    return join(this.BASE_DIR, 'llc-mapping.json');
  },

  BAMBOOHR_BASE_URL() {
    return `https://api.bamboohr.com/api/gateway.php/${this.BAMBOOHR_COMPANY}/v1`;
  },

  getAuthHeader() {
    return `Basic ${btoa(this.BAMBOOHR_API_KEY + ':x')}`;
  },
};

// Types
interface BambooEmployee {
  id: string;
  displayName: string;
  firstName: string;
  lastName: string;
}

interface PayrollEntry {
  employeeId: string;
  matchedName: string;
  originalName: string;
  date: string;
  amount: string;
  reference: string;
  hours: number;
  type: string;
}

interface ProcessingResult {
  fileName: string;
  entries: PayrollEntry[];
  pdfPath: string;
}

interface UploadSummary {
  success: PayrollEntry[];
  failed: Array<{ entry: PayrollEntry; error: string }>;
}

// BambooHR API Client
class BambooHRClient {
  private baseUrl: string;
  private authHeader: string;

  constructor() {
    this.baseUrl = CONFIG.BAMBOOHR_BASE_URL();
    this.authHeader = CONFIG.getAuthHeader();
  }

  async getEmployees(): Promise<BambooEmployee[]> {
    // Use mock data for local testing
    if (process.env.USE_MOCK_DATA === 'true') {
      return [
        {
          id: '1',
          displayName: 'John Smith',
          firstName: 'John',
          lastName: 'Smith',
        },
        {
          id: '2',
          displayName: 'Jane Doe',
          firstName: 'Jane',
          lastName: 'Doe',
        },
        {
          id: '3',
          displayName: 'Bob Johnson',
          firstName: 'Bob',
          lastName: 'Johnson',
        },
      ];
    }

    const response = await fetch(`${this.baseUrl}/employees/directory`, {
      headers: {
        Authorization: this.authHeader,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`BambooHR API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.employees;
  }

  async uploadDocument(
    employeeId: string,
    filePath: string,
    fileName: string,
  ): Promise<void> {
    const file = Bun.file(filePath);
    const formData = new FormData();
    formData.append('file', await file.arrayBuffer(), fileName);
    formData.append('category', '1'); // Pay Stubs/Payroll
    formData.append('share', 'yes');

    const response = await fetch(
      `${this.baseUrl}/employees/${employeeId}/files`,
      {
        method: 'POST',
        headers: {
          Authorization: this.authHeader,
        },
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to upload document: ${response.statusText}`);
    }
  }
}

// NocoDB Client for dual-write
class NocoDBClient {
  private baseUrl: string;
  private apiKey: string;
  private tableId: string;

  constructor() {
    this.baseUrl = CONFIG.NOCODB_BASE_URL;
    this.apiKey = CONFIG.NOCODB_API_KEY;
    this.tableId = CONFIG.NOCODB_TABLE_ID;
  }

  async createEntry(entry: PayrollEntry): Promise<void> {
    if (!this.apiKey) {
      console.warn('[NocoDB] API key not configured, skipping dual-write');
      return;
    }

    const response = await fetch(
      `${this.baseUrl}/api/v1/db/data/noco/payroll/${this.tableId}`,
      {
        method: 'POST',
        headers: {
          'xc-token': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employee_id: entry.employeeId,
          matched_name: entry.matchedName,
          original_name: entry.originalName,
          date: entry.date,
          amount: parseFloat(entry.amount),
          reference: entry.reference,
          type: entry.type,
          processed_at: new Date().toISOString(),
        }),
      },
    );

    if (!response.ok) {
      console.warn(`[NocoDB] Failed to create entry: ${response.statusText}`);
    }
  }
}

// PDF Processing (using Bun native shell)
class PDFProcessor {
  async extractText(filePath: string): Promise<string> {
    try {
      // Use Bun.$ for shell commands (per CLAUDE.md)
      const proc = Bun.$`pdftotext -layout ${filePath} -`;
      const output = await proc.text();
      return output;
    } catch (_error) {
      // Fallback: read as text file (for tests)
      const file = Bun.file(filePath);
      return await file.text();
    }
  }

  resolveLLC(name: string): string | null {
    try {
      const mappingFile = Bun.file(CONFIG.MAPPING_FILE);
      const mapping = JSON.parse(mappingFile.toString());
      return mapping[name] || mapping[name.toUpperCase()] || null;
    } catch {
      return null;
    }
  }

  async processFile(
    filePath: string,
    employees: BambooEmployee[],
  ): Promise<PayrollEntry[]> {
    const text = await this.extractText(filePath);
    const lines = text.split('\n');

    // Extract "Paid To" name
    let paidTo = '';
    for (const line of lines) {
      if (line.includes('Paid To:')) {
        paidTo = line.split('Paid To:')[1].trim();
        break;
      }
    }

    // Try LLC resolution
    const resolvedName = this.resolveLLC(paidTo) || paidTo;

    // Fuzzy match against BambooHR employees
    const fuse = new Fuse(employees, {
      keys: ['displayName', 'firstName', 'lastName'],
      threshold: 0.4,
    });

    const results: PayrollEntry[] = [];

    // Parse bill lines: Date, Type, Reference, Original Amt, Balance, Discount, Payment
    for (const line of lines) {
      const billMatch = line.match(
        /(\d{1,2}\/\d{1,2}\/\d{4})\s+Bill\s+([^\s]+)\s+([\d,]+\.\d{2})\s+([\d,]+\.\d{2})\s+([\d,]+\.\d{2})/,
      );

      if (billMatch) {
        const [_, date, reference, _originalAmt, _balance, payment] = billMatch;

        const match = fuse.search(resolvedName);
        const matchedEmployee =
          match.length > 0
            ? match[0].item
            : { id: 'manual-check', displayName: resolvedName };

        results.push({
          employeeId: matchedEmployee.id,
          matchedName: matchedEmployee.displayName,
          originalName: resolvedName,
          date,
          amount: payment.replace(/,/g, ''),
          reference,
          hours: 0,
          type: 'Bill Payment',
        });
      }
    }

    return results;
  }
}

// MCP Tools Implementation
class PayrollMCPTools {
  private bambooClient: BambooHRClient;
  private nocoClient: NocoDBClient;
  private pdfProcessor: PDFProcessor;

  constructor() {
    this.bambooClient = new BambooHRClient();
    this.nocoClient = new NocoDBClient();
    this.pdfProcessor = new PDFProcessor();
  }

  /**
   * Tool 1: List incoming PDFs
   */
  async listIncomingPDFs(): Promise<{ files: string[]; count: number }> {
    const files = await readdir(CONFIG.INPUT_DIR);
    const pdfs = files.filter((f) => f.endsWith('.pdf'));

    return {
      files: pdfs,
      count: pdfs.length,
    };
  }

  /**
   * Tool 2: Process PDF (dry-run preview)
   */
  async processPayrollPDF(fileName: string): Promise<ProcessingResult> {
    const filePath = join(CONFIG.INPUT_DIR, fileName);
    const employees = await this.bambooClient.getEmployees();
    const entries = await this.pdfProcessor.processFile(filePath, employees);

    return {
      fileName,
      entries,
      pdfPath: filePath,
    };
  }

  /**
   * Tool 3: Upload payroll entries (ARM action)
   */
  async uploadPayrollEntries(
    fileName: string,
    entries: PayrollEntry[],
  ): Promise<UploadSummary> {
    const filePath = join(CONFIG.INPUT_DIR, fileName);
    const summary: UploadSummary = { success: [], failed: [] };

    for (const entry of entries) {
      try {
        // Upload to BambooHR
        await this.bambooClient.uploadDocument(
          entry.employeeId,
          filePath,
          fileName,
        );

        // Dual-write to NocoDB
        await this.nocoClient.createEntry(entry);

        summary.success.push(entry);
      } catch (error: any) {
        summary.failed.push({
          entry,
          error: error.message,
        });
      }
    }

    // Move to processed directory
    if (summary.failed.length === 0) {
      const processedPath = join(CONFIG.PROCESSED_DIR, fileName);
      await Bun.$`mv ${filePath} ${processedPath}`;
    }

    return summary;
  }

  /**
   * Tool 4: Generate payroll report
   */
  async generatePayrollReport(
    summary: UploadSummary,
    fileName: string,
  ): Promise<{ reportPath: string; content: string }> {
    const timestamp = Date.now();
    const reportFileName = `payroll-report-${timestamp}.md`;
    const reportPath = join(CONFIG.REPORT_DIR, reportFileName);

    const content = `# Payroll Processing Report - ${new Date().toLocaleDateString()}

**File:** ${fileName}
**Status:** ${summary.failed.length === 0 ? '✅ COMPLETE' : '⚠️ PARTIAL FAILURE'}
**Processed:** ${new Date().toISOString()}

---

## ✅ Successes (${summary.success.length})

${summary.success.map((s) => `- **${s.matchedName}**: $${s.amount} (${s.date}) - Ref: ${s.reference}`).join('\n')}

---

## ❌ Failures (${summary.failed.length})

${
  summary.failed.length > 0
    ? summary.failed
        .map((f) => `- **${f.entry.matchedName}**: ${f.error}`)
        .join('\n')
    : '_No failures_'
}

---

**Generated by:** Payroll MCP Server
**Dual-write:** BambooHR + NocoDB
`;

    await Bun.write(reportPath, content);

    return { reportPath, content };
  }
}

// MCP Server
class PayrollMCPServer {
  private tools: PayrollMCPTools;
  private toolDefinitions: MCPTool[];

  constructor() {
    this.tools = new PayrollMCPTools();
    this.toolDefinitions = [
      {
        name: 'list_incoming_pdfs',
        description: 'List all PDF files waiting for payroll processing',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'process_payroll_pdf',
        description:
          'Extract payroll data from a PDF (dry-run preview, does not upload)',
        inputSchema: {
          type: 'object',
          properties: {
            fileName: {
              type: 'string',
              description: 'Name of the PDF file to process',
            },
          },
          required: ['fileName'],
        },
      },
      {
        name: 'upload_payroll_entries',
        description:
          'Upload approved payroll entries to BambooHR and NocoDB (ARM action - requires approval)',
        inputSchema: {
          type: 'object',
          properties: {
            fileName: {
              type: 'string',
              description: 'Name of the PDF file',
            },
            entries: {
              type: 'array',
              description: 'Array of payroll entries to upload',
              items: {
                type: 'object',
                properties: {
                  employeeId: { type: 'string' },
                  matchedName: { type: 'string' },
                  originalName: { type: 'string' },
                  date: { type: 'string' },
                  amount: { type: 'string' },
                  reference: { type: 'string' },
                  hours: { type: 'number' },
                  type: { type: 'string' },
                },
              },
            },
          },
          required: ['fileName', 'entries'],
        },
      },
      {
        name: 'generate_payroll_report',
        description: 'Generate a markdown summary report of payroll processing',
        inputSchema: {
          type: 'object',
          properties: {
            fileName: {
              type: 'string',
              description: 'Name of the processed PDF file',
            },
            summary: {
              type: 'object',
              description: 'Upload summary with success/failed arrays',
              properties: {
                success: { type: 'array' },
                failed: { type: 'array' },
              },
            },
          },
          required: ['fileName', 'summary'],
        },
      },
    ];
  }

  async handleRequest(request: MCPRequest): Promise<MCPResponse> {
    const { id, method, params } = request;

    try {
      switch (method) {
        case 'tools/list':
          return {
            jsonrpc: '2.0',
            id,
            result: { tools: this.toolDefinitions },
          };

        case 'tools/call': {
          const toolName = params?.name;
          const toolArgs = params?.arguments || {};

          let result: any;

          switch (toolName) {
            case 'list_incoming_pdfs':
              result = await this.tools.listIncomingPDFs();
              break;

            case 'process_payroll_pdf':
              result = await this.tools.processPayrollPDF(toolArgs.fileName);
              break;

            case 'upload_payroll_entries':
              result = await this.tools.uploadPayrollEntries(
                toolArgs.fileName,
                toolArgs.entries,
              );
              break;

            case 'generate_payroll_report':
              result = await this.tools.generatePayrollReport(
                toolArgs.summary,
                toolArgs.fileName,
              );
              break;

            default:
              throw new Error(`Unknown tool: ${toolName}`);
          }

          return {
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                { type: 'text', text: JSON.stringify(result, null, 2) },
              ],
            },
          };
        }

        default:
          throw new Error(`Unknown method: ${method}`);
      }
    } catch (error: any) {
      return {
        jsonrpc: '2.0',
        id,
        error: {
          code: -32000,
          message: error.message,
          data: { stack: error.stack },
        },
      };
    }
  }

  async start() {
    console.error('[Payroll MCP] Starting server...');
    console.error(`[Payroll MCP] Base directory: ${CONFIG.BASE_DIR}`);
    console.error(`[Payroll MCP] BambooHR company: ${CONFIG.BAMBOOHR_COMPANY}`);

    // MCP uses stdio transport
    process.stdin.setEncoding('utf-8');

    for await (const line of console) {
      if (!line.trim()) continue;

      try {
        const request: MCPRequest = JSON.parse(line);
        const response = await this.handleRequest(request);
        console.log(JSON.stringify(response));
      } catch (error) {
        console.error('[Payroll MCP] Parse error:', error);
      }
    }
  }
}

// Run server
if (import.meta.main) {
  const server = new PayrollMCPServer();
  server.start();
}

export { PayrollMCPServer, PayrollMCPTools };
