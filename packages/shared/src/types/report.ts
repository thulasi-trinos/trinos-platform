import type { Role } from '../constants/roles.js';

export type ReportStatus = 'DRAFT' | 'SUBMITTED';

export type DayComplianceStatus = 'SUBMITTED' | 'DRAFT' | 'MISSING' | 'NOT_DUE';

export type BlockerStatus = 'OPEN' | 'ESCALATED' | 'RESOLVED';

export interface Report {
  id: string;
  /** Format: RPT-YYYY-NNNN */
  code: string;
  authorId: string;
  teamId: string;
  /** One report per author per calendar date (FR-REP-05) */
  reportDate: Date;
  /** Mandatory rich text, min 20 chars */
  fieldDidToday: string;
  /** Mandatory rich text, min 10 chars */
  fieldNext: string;
  /** Mandatory; "None" if no blockers */
  fieldBlockers: string;
  /** Optional */
  fieldNotes?: string;
  /** Computed: fieldBlockers.trim().toLowerCase() !== 'none' */
  hasBlockers: boolean;
  status: ReportStatus;
  submittedAt?: Date;
  /** FR-REP-06 edit window */
  editableUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlockerFlag {
  id: string;
  reportId: string;
  flaggedById: string;
  flaggedByRole: Role;
  status: BlockerStatus;
  note?: string;
  /** SR-TL-06 escalation to super admins */
  escalatedToSuperAdmins: boolean;
  resolvedById?: string;
  resolvedAt?: Date;
  createdAt: Date;
}
