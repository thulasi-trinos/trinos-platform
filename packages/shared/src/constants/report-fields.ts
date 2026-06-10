import type { Report } from '../types/report.js';

export interface ReportFieldDef {
  key: keyof Pick<Report, 'fieldDidToday' | 'fieldNext' | 'fieldBlockers' | 'fieldNotes'>;
  label: string;
  mandatory: boolean;
  minLen: number;
  richText: boolean;
  helper?: string;
}

export const REPORT_FIELDS: ReportFieldDef[] = [
  {
    key: 'fieldDidToday',
    label: 'What I Did Today',
    mandatory: true,
    minLen: 20,
    richText: true,
  },
  {
    key: 'fieldNext',
    label: "What's Next",
    mandatory: true,
    minLen: 10,
    richText: true,
  },
  {
    key: 'fieldBlockers',
    label: 'Blockers / Needs Attention',
    mandatory: true,
    minLen: 1,
    richText: true,
    helper: 'Type "None" if there are no blockers. Blockers are auto-flagged to your team lead.',
  },
  {
    key: 'fieldNotes',
    label: 'Notes',
    mandatory: false,
    minLen: 0,
    richText: true,
  },
];
