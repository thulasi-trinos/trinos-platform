export type Role = 'EMPLOYEE' | 'TEAM_LEAD' | 'MD' | 'ADMIN';

export const ROLE_LABELS: Record<Role, string> = {
  EMPLOYEE: 'Employee',
  TEAM_LEAD: 'Team Lead',
  MD: 'Managing Director',
  ADMIN: 'Administrator',
};

/**
 * RBAC capability matrix — mirrors PRD §7 access matrix.
 * Each key is a capability; value is the set of roles that have it.
 */
export const RBAC: Record<string, Role[]> = {
  // Report capabilities
  submitReport: ['EMPLOYEE', 'TEAM_LEAD', 'MD'],
  editOwnReport: ['EMPLOYEE', 'TEAM_LEAD', 'MD'],
  viewOwnReport: ['EMPLOYEE', 'TEAM_LEAD', 'MD'],
  viewTeamReports: ['TEAM_LEAD', 'MD', 'ADMIN'],
  viewAllReports: ['MD', 'ADMIN'],

  // Blocker capabilities
  flagBlocker: ['TEAM_LEAD', 'MD'],
  escalateBlocker: ['TEAM_LEAD'],
  resolveBlocker: ['TEAM_LEAD', 'MD'],
  viewBlockers: ['TEAM_LEAD', 'MD', 'ADMIN'],

  // Messaging capabilities
  chatInTeamChannel: ['EMPLOYEE', 'TEAM_LEAD', 'MD'],
  sendDirectMessage: ['TEAM_LEAD', 'MD'],
  broadcastMessage: ['MD', 'ADMIN'],

  // Dashboard capabilities
  viewOwnDashboard: ['EMPLOYEE', 'TEAM_LEAD', 'MD', 'ADMIN'],
  viewTeamDashboard: ['TEAM_LEAD', 'MD', 'ADMIN'],
  viewOrgDashboard: ['MD', 'ADMIN'],

  // Admin capabilities
  manageUsers: ['ADMIN'],
  manageTeams: ['ADMIN'],
  assignRoles: ['ADMIN'],
  viewAuditLogs: ['ADMIN'],
  viewSystemConfig: ['ADMIN'],
  updateSystemConfig: ['ADMIN'],
};

export function hasCapability(role: Role, capability: string): boolean {
  return (RBAC[capability] ?? []).includes(role);
}
