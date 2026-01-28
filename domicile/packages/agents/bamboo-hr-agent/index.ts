import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import Fuse from 'fuse.js';
import axios from 'axios';
import WebSocket from 'ws';
import FormData from 'form-data';

// Configuration
const BAMBOOHR_API_KEY = process.env.BAMBOOHR_API_KEY;
const BAMBOOHR_COMPANY = process.env.BAMBOOHR_COMPANY || 'omsconsulting';
const BASE_URL = `https://api.bamboohr.com/api/gateway.php/${BAMBOOHR_COMPANY}/v1`;
const INPUT_DIR = '/home/workspace/Agents/Incoming/PDFs';
const REPORT_DIR = '/home/workspace/Agents/Reports/reports';
const LOG_DIR = '/home/workspace/Agents/Reports/logs';
const MAPPING_FILE = '/home/workspace/Agents/llc-mapping.json';
const VERBOSE_LOGGING = true;
const AUTH_HEADER = `Basic ${Buffer.from(BAMBOOHR_API_KEY + ':x').toString('base64')}`;

const MOS_WS_URL = 'ws://localhost:8080/mos-bridge';

function resolveLLC(name) {
  if (fs.existsSync(MAPPING_FILE)) {
    const mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));
    return mapping[name] || mapping[name.toUpperCase()] || null;
  }
  return null;
}

async function getBambooEmployees() {
  try {
    const response = await axios.get(`${BASE_URL}/employees/directory`, {
      headers: { Authorization: AUTH_HEADER, Accept: 'application/json' },
    });
    return response.data.employees;
  } catch (error) {
    console.error('Failed to fetch employees:', error.message);
    throw error;
  }
}

async function _extractTextFromPDF(filePath) {
  try {
    // Use pdftotext (from poppler-utils) for robust extraction
    const stdout = execSync(`pdftotext "${filePath}" -`).toString();
    return stdout;
  } catch (_error) {
    // Fallback for non-PDF files that are just text (common in tests)
    return fs.readFileSync(filePath, 'utf8');
  }
}

async function processPDF(filePath, employees) {
  try {
    const text = execSync(`pdftotext -layout "${filePath}" -`).toString();
    const lines = text.split('\n');

    let paidTo = '';
    for (const line of lines) {
      if (line.includes('Paid To:')) {
        paidTo = line.split('Paid To:')[1].trim();
        break;
      }
    }

    // Try to resolve LLC first
    const resolvedName = resolveLLC(paidTo) || paidTo;

    const fuse = new Fuse(employees, {
      keys: ['displayName', 'firstName', 'lastName'],
      threshold: 0.4,
    });
    const results = [];

    // Pattern for bill lines: Date, Type, Reference, Original Amt, Balance, Discount, Payment
    // Example: 10/18/2025   Bill   DACULA          11,653.15           11,653.15                          11,653.15
    for (const line of lines) {
      const billMatch = line.match(
        /(\d{1,2}\/\d{1,2}\/\d{4})\s+Bill\s+([^\s]+)\s+([\d,]+\.\d{2})\s+([\d,]+\.\d{2})\s+([\d,]+\.\d{2})/,
      );
      if (billMatch) {
        const [_, date, reference, _originalAmt, _balance, payment] = billMatch;

        // Fuzzy match name against BambooHR
        const match = fuse.search(resolvedName);
        const matchedEmployee =
          match.length > 0
            ? match[0].item
            : { id: 'manual-check', displayName: resolvedName };

        results.push({
          employeeId: matchedEmployee.id,
          matchedName: matchedEmployee.displayName,
          originalName: resolvedName,
          date: date,
          amount: payment.replace(/,/g, ''),
          reference: reference,
          hours: 0, // Surgeon stubs use amounts, not hours
          type: 'Bill Payment',
        });
      }
    }

    // For TEST RUN: Sanitize sensitive data
    if (process.env.IS_TEST_RUN === 'true') {
      return results.map((r) => ({
        ...r,
        amount: '[REDACTED]',
        hours: '[REDACTED]',
        note: '*** TEST RUN DATA REDACTED ***',
      }));
    }

    return results;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return [];
  }
}

async function uploadTimeEntries(entries, filePath) {
  const report = { success: [], failed: [] };
  const fileName = path.basename(filePath);
  const uploadName =
    process.env.IS_TEST_RUN === 'true'
      ? `[TEST-RUN-REDACTED]-${fileName}`
      : fileName;

  for (const entry of entries) {
    try {
      // Upload PDF to Employee Documents instead of Time Tracking
      const formData = new FormData();
      formData.append('file', fs.createReadStream(filePath));
      formData.append('category', '1'); // Category ID for Pay Stubs/Payroll
      formData.append('fileName', uploadName);
      formData.append('share', 'yes'); // Share with employee

      await axios.post(
        `${BASE_URL}/employees/${entry.employeeId}/files`,
        formData,
        {
          headers: {
            Authorization: AUTH_HEADER,
            ...formData.getHeaders(),
          },
        },
      );
      report.success.push(entry);
    } catch (error) {
      report.failed.push({ entry, error: error.message });
    }
  }
  return report;
}

async function notifyMOS(status) {
  return new Promise((resolve) => {
    const ws = new WebSocket(MOS_WS_URL);
    ws.on('open', () => {
      ws.send(
        JSON.stringify({
          type: 'PAYROLL_STATUS',
          project: 'NODE_OUT_Master',
          timestamp: new Date().toISOString(),
          data: status,
        }),
      );
      ws.close();
      resolve();
    });
    ws.on('error', () => {
      console.warn('MOS Bridge unavailable, skipping WS notification');
      resolve();
    });
  });
}

async function logVerbose(data) {
  if (!VERBOSE_LOGGING) return;
  const logPath = path.join(
    LOG_DIR,
    `scan-${new Date().toISOString().split('T')[0]}.log.json`,
  );
  const logEntry = {
    timestamp: new Date().toISOString(),
    ...data,
  };
  fs.appendFileSync(logPath, JSON.stringify(logEntry) + '\n');
}

async function run() {
  console.log('Starting Payroll Processing...');
  const employees = await getBambooEmployees();
  const files = fs.readdirSync(INPUT_DIR).filter((f) => f.endsWith('.pdf'));

  if (files.length === 0) {
    console.log('No PDFs found in incoming directory.');
    return;
  }

  for (const file of files) {
    const filePath = path.join(INPUT_DIR, file);
    const results = await processPDF(filePath, employees);

    await logVerbose({
      file,
      extractedCount: results.length,
      matches: results.map((r) => ({ name: r.matchedName })),
      status: 'processed',
    });

    const summary = await uploadTimeEntries(results, filePath);

    const reportPath = path.join(REPORT_DIR, `payroll-report-${Date.now()}.md`);
    const reportContent = `
# Payroll Processing Report - ${new Date().toLocaleDateString()}
**File:** ${file}
**Status:** ${summary.failed.length === 0 ? 'COMPLETE' : 'PARTIAL FAILURE'}

## Successes (${summary.success.length})
${summary.success.map((s) => `- ${s.employee.displayName}: ${s.hours} hours`).join('\n')}

## Failures (${summary.failed.length})
${summary.failed.map((f) => `- ${f.entry.matchedName}: ${f.error}`).join('\n')}
`;
    fs.writeFileSync(reportPath, reportContent);
    console.log(`Report generated: ${reportPath}`);

    await notifyMOS(summary);

    const processedPath = path.join(INPUT_DIR, 'processed', file);
    if (!fs.existsSync(path.dirname(processedPath)))
      fs.mkdirSync(path.dirname(processedPath));
    fs.renameSync(filePath, processedPath);
  }
}

if (process.env.RUN_NOW === 'true') {
  run().catch(console.error);
}

export { run };
