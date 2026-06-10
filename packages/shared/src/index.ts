// Types
export type {
  User,
  UserStatus,
} from './types/user.js';
export type { Team } from './types/team.js';
export type {
  Report,
  ReportStatus,
  DayComplianceStatus,
  BlockerStatus,
  BlockerFlag,
} from './types/report.js';
export type { RoutingLog, RoutingChannel } from './types/routing.js';
export type { Channel, ChannelType, Message, MessageReceipt } from './types/message.js';
export type {
  Notification,
  NotificationChannel,
  NotificationPreference,
} from './types/notification.js';
export type { AuditLog } from './types/audit.js';
export type { SystemConfig } from './types/config.js';

// Constants
export { ROLE_LABELS, RBAC, hasCapability } from './constants/roles.js';
export type { Role } from './constants/roles.js';
export {
  REPORT_STATUS_LABELS,
  REPORT_STATUS_COLOURS,
  DAY_COMPLIANCE_LABELS,
  DAY_COMPLIANCE_COLOURS,
  BLOCKER_STATUS_LABELS,
  BLOCKER_STATUS_COLOURS,
} from './constants/statuses.js';
export { REPORT_FIELDS } from './constants/report-fields.js';
export type { ReportFieldDef } from './constants/report-fields.js';
export { EVENTS } from './constants/events.js';
export type { EventName } from './constants/events.js';

// Schemas
export {
  registerUserSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from './schemas/auth.schema.js';
export type {
  RegisterUserInput,
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  ChangePasswordInput,
} from './schemas/auth.schema.js';
export {
  saveDraftSchema,
  submitReportSchema,
  editReportSchema,
} from './schemas/report.schema.js';
export type {
  SaveDraftInput,
  SubmitReportInput,
  EditReportInput,
} from './schemas/report.schema.js';
export {
  sendMessageSchema,
  createChannelSchema,
  broadcastSchema,
} from './schemas/message.schema.js';
export type {
  SendMessageInput,
  CreateChannelInput,
  BroadcastInput,
} from './schemas/message.schema.js';
export {
  createUserSchema,
  updateUserSchema,
  createTeamSchema,
  assignRoleSchema,
  updateSystemConfigSchema,
} from './schemas/admin.schema.js';
export type {
  CreateUserInput,
  UpdateUserInput,
  CreateTeamInput,
  AssignRoleInput,
  UpdateSystemConfigInput,
} from './schemas/admin.schema.js';
