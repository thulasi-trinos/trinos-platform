import { Router, type RequestHandler } from 'express';

import { requireAuth } from '../../middleware/auth';

export const usersRouter: Router = Router();

const notImplemented: RequestHandler = (_req, res) => {
  res.status(501).json({ error: { code: 'NOT_IMPLEMENTED', message: 'Users pending' } });
};

usersRouter.use(requireAuth);
usersRouter.get('/me', notImplemented);
usersRouter.get('/', notImplemented);
