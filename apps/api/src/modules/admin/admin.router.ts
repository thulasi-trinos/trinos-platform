import { Router, type RequestHandler } from 'express';

import {
  assignRoleSchema,
  createTeamSchema,
  createUserSchema,
  updateSystemConfigSchema,
  updateUserSchema,
} from '@trinos/shared';

import { requireAuth } from '../../middleware/auth';
import { requireCapability } from '../../middleware/rbac';
import { validate } from '../../middleware/validate';

export const adminRouter: Router = Router();

const notImplemented: RequestHandler = (_req, res) => {
  res.status(501).json({ error: { code: 'NOT_IMPLEMENTED', message: 'Admin pending' } });
};

adminRouter.use(requireAuth);

adminRouter.post('/users', requireCapability('manageUsers'), validate(createUserSchema), notImplemented);
adminRouter.patch(
  '/users/:id',
  requireCapability('manageUsers'),
  validate(updateUserSchema),
  notImplemented,
);
adminRouter.post(
  '/users/:id/roles',
  requireCapability('assignRoles'),
  validate(assignRoleSchema),
  notImplemented,
);
adminRouter.post('/teams', requireCapability('manageTeams'), validate(createTeamSchema), notImplemented);
adminRouter.get('/audit', requireCapability('viewAuditLogs'), notImplemented);
adminRouter.get('/config', requireCapability('viewSystemConfig'), notImplemented);
adminRouter.put(
  '/config',
  requireCapability('updateSystemConfig'),
  validate(updateSystemConfigSchema),
  notImplemented,
);
adminRouter.get('/reports/export', requireCapability('viewAllReports'), notImplemented);
