import { Router, type RequestHandler } from 'express';

import { requireAuth } from '../../middleware/auth';

export const notificationsRouter: Router = Router();

const notImplemented: RequestHandler = (_req, res) => {
  res.status(501).json({ error: { code: 'NOT_IMPLEMENTED', message: 'Notifications pending' } });
};

notificationsRouter.use(requireAuth);
notificationsRouter.get('/', notImplemented);
notificationsRouter.post('/:id/read', notImplemented);
notificationsRouter.get('/preferences', notImplemented);
