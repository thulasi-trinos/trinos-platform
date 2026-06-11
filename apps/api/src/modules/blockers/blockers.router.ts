import { Router, type RequestHandler } from 'express';

import { requireAuth } from '../../middleware/auth';
import { requireCapability } from '../../middleware/rbac';

export const blockersRouter: Router = Router();

const notImplemented: RequestHandler = (_req, res) => {
  res.status(501).json({ error: { code: 'NOT_IMPLEMENTED', message: 'Blockers pending' } });
};

blockersRouter.use(requireAuth);
blockersRouter.get('/', requireCapability('viewBlockers'), notImplemented);
blockersRouter.post('/:reportId/flag', requireCapability('flagBlocker'), notImplemented);
blockersRouter.post('/:id/escalate', requireCapability('escalateBlocker'), notImplemented);
blockersRouter.post('/:id/resolve', requireCapability('resolveBlocker'), notImplemented);
