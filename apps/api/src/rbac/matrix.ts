// Re-export the single source of truth from @trinos/shared so API code has one
// import site. Never redefine the matrix here.
export { RBAC, hasCapability, ROLE_LABELS } from '@trinos/shared';
export type { Role } from '@trinos/shared';
