import { Router, type RequestHandler } from 'express';

import { requireAuth } from '../../middleware/auth';
import { requireCapability } from '../../middleware/rbac';

export const dashboardRouter: Router = Router();

const notImplemented: RequestHandler = (_req, res) => {
  res.status(501).json({ error: { code: 'NOT_IMPLEMENTED', message: 'Dashboard pending' } });
};

dashboardRouter.use(requireAuth);
dashboardRouter.get('/me', requireCapability('viewOwnDashboard'), notImplemented);
dashboardRouter.get('/team', requireCapability('viewTeamDashboard'), notImplemented);
dashboardRouter.get('/org', requireCapability('viewOrgDashboard'), notImplemented);
