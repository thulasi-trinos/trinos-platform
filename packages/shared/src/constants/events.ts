export const EVENTS = {
  REPORT_SUBMITTED: 'report.submitted',
  REPORT_EDITED: 'report.edited',
  REPORT_DRAFT_SAVED: 'report.draft_saved',
  REPORT_OVERDUE: 'report.overdue',

  BLOCKER_FLAGGED: 'blocker.flagged',
  BLOCKER_ESCALATED: 'blocker.escalated',
  BLOCKER_RESOLVED: 'blocker.resolved',

  MESSAGE_SENT: 'message.sent',
  MESSAGE_BROADCAST: 'message.broadcast',

  USER_ROLE_CHANGED: 'user.role_changed',
  USER_DEACTIVATED: 'user.deactivated',
  TEAM_MEMBERSHIP_CHANGED: 'team.membership_changed',
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];
