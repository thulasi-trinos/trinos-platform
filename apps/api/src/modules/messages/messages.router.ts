import { Router, type RequestHandler } from 'express';

import { broadcastSchema, createChannelSchema, sendMessageSchema } from '@trinos/shared';

import { requireAuth } from '../../middleware/auth';
import { requireCapability } from '../../middleware/rbac';
import { validate } from '../../middleware/validate';

export const messagesRouter: Router = Router();

const notImplemented: RequestHandler = (_req, res) => {
  res.status(501).json({ error: { code: 'NOT_IMPLEMENTED', message: 'Messages pending' } });
};

messagesRouter.use(requireAuth);
messagesRouter.post('/channels', validate(createChannelSchema), notImplemented);
messagesRouter.post(
  '/',
  requireCapability('chatInTeamChannel'),
  validate(sendMessageSchema),
  notImplemented,
);
messagesRouter.post(
  '/broadcast',
  requireCapability('broadcastMessage'),
  validate(broadcastSchema),
  notImplemented,
);
