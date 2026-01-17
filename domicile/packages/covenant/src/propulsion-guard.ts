import {
  MINIMUM_PROPULSION_GUARD,
  QVSCA_Auditor_Agent,
  type AuditReport,
} from "../../agents/src/qvsca-auditor";

export interface PropulsionGuardResult {
  report: AuditReport;
  allowed: boolean;
}

export function enforcePropulsionGuard(report: AuditReport): PropulsionGuardResult {
  const allowed = report.cvc_score >= MINIMUM_PROPULSION_GUARD;
  return { report, allowed };
}

export async function auditBytecodeWithCovenant(bytecode: string): Promise<PropulsionGuardResult> {
  const auditor = new QVSCA_Auditor_Agent();
  const report = await auditor.audit_contract(bytecode);
  return enforcePropulsionGuard(report);
}
