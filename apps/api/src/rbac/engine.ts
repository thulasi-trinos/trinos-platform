import { hasCapability, type Role } from '@trinos/shared';

import { ForbiddenError } from '../middleware/errorHandler';

/** True if any of the user's roles grants the capability. */
export function can(roles: Role[], capability: string): boolean {
  return roles.some((role) => hasCapability(role, capability));
}

/** Throw ForbiddenError unless one of `roles` grants `capability`. */
export function assertCan(roles: Role[], capability: string): void {
  if (!can(roles, capability)) {
    throw new ForbiddenError(`Missing capability: ${capability}`);
  }
}

/** Super admins bypass capability checks (escalation terminus). */
export function canOrSuperAdmin(
  roles: Role[],
  isSuperAdmin: boolean,
  capability: string,
): boolean {
  return isSuperAdmin || can(roles, capability);
}
