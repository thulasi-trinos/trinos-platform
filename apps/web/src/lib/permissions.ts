import { hasCapability } from '@trinos/shared';

import type { Role, User } from '@trinos/shared';

/**
 * A user holds multiple roles; they have a capability if ANY of their roles
 * grant it. Super admins bypass the matrix entirely.
 */
export function can(user: Pick<User, 'roles' | 'isSuperAdmin'> | null, capability: string): boolean {
  if (!user) return false;
  if (user.isSuperAdmin) return true;
  return user.roles.some((role) => hasCapability(role, capability));
}

/** Highest-privilege role a user holds, used to pick a default landing view. */
export function primaryRole(user: Pick<User, 'roles' | 'isSuperAdmin'> | null): Role | 'SUPER_ADMIN' | null {
  if (!user) return null;
  if (user.isSuperAdmin) return 'SUPER_ADMIN';
  const order: Role[] = ['ADMIN', 'MD', 'TEAM_LEAD', 'EMPLOYEE'];
  return order.find((r) => user.roles.includes(r)) ?? null;
}
