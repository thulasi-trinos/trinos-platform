import { Router, type RequestHandler } from 'express';

import { requireAuth } from '../../middleware/auth';

export const teamsRouter: Router = Router();

const notImplemented: RequestHandler = (_req, res) => {
  res.status(501).json({ error: { code: 'NOT_IMPLEMENTED', message: 'Teams pending' } });
};

teamsRouter.use(requireAuth);
teamsRouter.get('/', notImplemented);
teamsRouter.get('/:id', notImplemented);
