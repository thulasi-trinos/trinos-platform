import { Router, type RequestHandler } from 'express';

import { saveDraftSchema, submitReportSchema } from '@trinos/shared';

import { requireAuth } from '../../middleware/auth';
import { requireCapability } from '../../middleware/rbac';
import { validate } from '../../middleware/validate';

export const reportsRouter: Router = Router();

// Handlers implemented in the reports prompt (3.x); routes/RBAC/validation wired now.
const notImplemented: RequestHandler = (_req, res) => {
  res.status(501).json({ error: { code: 'NOT_IMPLEMENTED', message: 'Reports pending' } });
};

reportsRouter.use(requireAuth);

reportsRouter.post(
  '/draft',
  requireCapability('submitReport'),
  validate(saveDraftSchema),
  notImplemented,
);
reportsRouter.post(
  '/',
  requireCapability('submitReport'),
  validate(submitReportSchema),
  notImplemented,
);
reportsRouter.get('/', requireCapability('viewOwnReport'), notImplemented);
reportsRouter.get('/:id', requireCapability('viewOwnReport'), notImplemented);
