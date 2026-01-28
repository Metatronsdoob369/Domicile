#!/usr/bin/env bun
/**
 * Local MCP Server Test Suite
 *
 * Tests all 4 tools locally before Citadel deployment
 */

import { spawn } from 'bun';

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
  error?: any;
}

class MCPTester {
  private serverProcess: any;

  async sendRequest(request: MCPRequest): Promise<MCPResponse> {
    const proc = spawn({
      cmd: ['bun', 'payroll-processor-mcp.ts'],
      stdin: 'pipe',
      stdout: 'pipe',
      stderr: 'pipe',
      env: {
        ...process.env,
        PAYROLL_BASE_DIR: './test-data',
      },
    });

    // Send request
    proc.stdin.write(JSON.stringify(request) + '\n');
    proc.stdin.end();

    // Read response
    const output = await new Response(proc.stdout).text();
    const lines = output.split('\n').filter((l) => l.trim());

    if (lines.length === 0) {
      throw new Error('No response from MCP server');
    }

    const response: MCPResponse = JSON.parse(lines[0]);
    return response;
  }

  async testToolsList() {
    console.log('\n🧪 Test 1: tools/list');
    console.log('━'.repeat(50));

    const response = await this.sendRequest({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/list',
    });

    if (response.error) {
      console.error('❌ FAILED:', response.error.message);
      return false;
    }

    const tools = response.result?.tools || [];
    console.log(`✅ PASSED: Found ${tools.length} tools`);
    tools.forEach((tool: any) => {
      console.log(`   - ${tool.name}: ${tool.description}`);
    });

    return tools.length === 4;
  }

  async testListIncomingPDFs() {
    console.log('\n🧪 Test 2: list_incoming_pdfs');
    console.log('━'.repeat(50));

    const response = await this.sendRequest({
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/call',
      params: {
        name: 'list_incoming_pdfs',
        arguments: {},
      },
    });

    if (response.error) {
      console.error('❌ FAILED:', response.error.message);
      return false;
    }

    const result = JSON.parse(response.result.content[0].text);
    console.log(`✅ PASSED: Found ${result.count} PDFs`);
    result.files.forEach((file: string) => {
      console.log(`   - ${file}`);
    });

    return result.count > 0;
  }

  async testProcessPayrollPDF() {
    console.log('\n🧪 Test 3: process_payroll_pdf');
    console.log('━'.repeat(50));

    const response = await this.sendRequest({
      jsonrpc: '2.0',
      id: 3,
      method: 'tools/call',
      params: {
        name: 'process_payroll_pdf',
        arguments: {
          fileName: 'test-payroll-2024-01-27.pdf',
        },
      },
    });

    if (response.error) {
      console.error('❌ FAILED:', response.error.message);
      console.error('   Stack:', response.error.data?.stack);
      return false;
    }

    const result = JSON.parse(response.result.content[0].text);
    console.log(`✅ PASSED: Extracted ${result.entries.length} entries`);
    result.entries.forEach((entry: any) => {
      console.log(
        `   - ${entry.matchedName}: $${entry.amount} (${entry.date})`,
      );
    });

    return result.entries.length > 0;
  }

  async testGenerateReport() {
    console.log('\n🧪 Test 4: generate_payroll_report');
    console.log('━'.repeat(50));

    const mockSummary = {
      success: [
        {
          employeeId: 'test-123',
          matchedName: 'John Smith',
          originalName: 'ACME SURGICAL LLC',
          date: '01/18/2024',
          amount: '11653.15',
          reference: 'DACULA',
          hours: 0,
          type: 'Bill Payment',
        },
      ],
      failed: [],
    };

    const response = await this.sendRequest({
      jsonrpc: '2.0',
      id: 4,
      method: 'tools/call',
      params: {
        name: 'generate_payroll_report',
        arguments: {
          fileName: 'test-payroll-2024-01-27.pdf',
          summary: mockSummary,
        },
      },
    });

    if (response.error) {
      console.error('❌ FAILED:', response.error.message);
      return false;
    }

    const result = JSON.parse(response.result.content[0].text);
    console.log(`✅ PASSED: Report generated`);
    console.log(`   Path: ${result.reportPath}`);
    console.log(`   Preview: ${result.content.substring(0, 100)}...`);

    return true;
  }

  async runAllTests() {
    console.log('🚀 MCP Server Local Test Suite');
    console.log('═'.repeat(50));

    const tests = [
      { name: 'tools/list', fn: () => this.testToolsList() },
      { name: 'list_incoming_pdfs', fn: () => this.testListIncomingPDFs() },
      { name: 'process_payroll_pdf', fn: () => this.testProcessPayrollPDF() },
      { name: 'generate_payroll_report', fn: () => this.testGenerateReport() },
    ];

    let passed = 0;
    let failed = 0;

    for (const test of tests) {
      try {
        const result = await test.fn();
        if (result) {
          passed++;
        } else {
          failed++;
        }
      } catch (error: any) {
        console.error(`\n❌ ${test.name} crashed:`, error.message);
        failed++;
      }
    }

    console.log('\n' + '═'.repeat(50));
    console.log('📊 Test Results:');
    console.log(`   ✅ Passed: ${passed}`);
    console.log(`   ❌ Failed: ${failed}`);
    console.log('═'.repeat(50));

    if (failed === 0) {
      console.log('\n🎉 ALL TESTS PASSED!');
      console.log('   Ready for Citadel deployment.');
      process.exit(0);
    } else {
      console.log('\n⚠️  TESTS FAILED!');
      console.log('   Fix errors before deploying to Citadel.');
      process.exit(1);
    }
  }
}

// Run tests
const tester = new MCPTester();
tester.runAllTests();
