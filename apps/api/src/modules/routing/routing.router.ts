import { Router, type RequestHandler } from 'express';

import { requireAuth } from '../../middleware/auth';
import { requireCapability } from '../../middleware/rbac';

export const routingRouter: Router = Router();

const notImplemented: RequestHandler = (_req, res) => {
  res.status(501).json({ error: { code: 'NOT_IMPLEMENTED', message: 'Routing pending' } });
};

routingRouter.use(requireAuth);
routingRouter.get('/inbox', requireCapability('viewTeamReports'), notImplemented);
