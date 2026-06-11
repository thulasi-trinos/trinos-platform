import type { RequestHandler } from 'express';

import { canOrSuperAdmin } from '../rbac/engine';

import { ForbiddenError, UnauthorizedError } from './errorHandler';

/**
 * Guard a route by capability. Super admins always pass. Must run after
 * `requireAuth`. RBAC is enforced server-side here — never trust client roles.
 */
export function requireCapability(capability: string): RequestHandler {
  return (req, _res, next) => {
    if (!req.user) return next(new UnauthorizedError());
    if (!canOrSuperAdmin(req.user.roles, req.user.isSuperAdmin, capability)) {
      return next(new ForbiddenError(`Missing capability: ${capability}`));
    }
    next();
  };
}

/** Guard a route by super-admin flag (escalation terminus, SR-TL-06). */
export const requireSuperAdmin: RequestHandler = (req, _res, next) => {
  if (!req.user) return next(new UnauthorizedError());
  if (!req.user.isSuperAdmin) return next(new ForbiddenError('Super admin only'));
  next();
};
