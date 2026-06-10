import type { ReportStatus, DayComplianceStatus, BlockerStatus } from '../types/report.js';

export const REPORT_STATUS_LABELS: Record<ReportStatus, string> = {
  DRAFT: 'Draft',
  SUBMITTED: 'Submitted',
};

export const REPORT_STATUS_COLOURS: Record<ReportStatus, string> = {
  DRAFT: '#F59E0B',
  SUBMITTED: '#10B981',
};

export const DAY_COMPLIANCE_LABELS: Record<DayComplianceStatus, string> = {
  SUBMITTED: 'Submitted',
  DRAFT: 'Draft',
  MISSING: 'Missing',
  NOT_DUE: 'Not Due',
};

export const DAY_COMPLIANCE_COLOURS: Record<DayComplianceStatus, string> = {
  SUBMITTED: '#10B981',
  DRAFT: '#F59E0B',
  MISSING: '#EF4444',
  NOT_DUE: '#6B7280',
};

export const BLOCKER_STATUS_LABELS: Record<BlockerStatus, string> = {
  OPEN: 'Open',
  ESCALATED: 'Escalated',
  RESOLVED: 'Resolved',
};

export const BLOCKER_STATUS_COLOURS: Record<BlockerStatus, string> = {
  OPEN: '#EF4444',
  ESCALATED: '#F97316',
  RESOLVED: '#10B981',
};
