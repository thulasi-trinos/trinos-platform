import { Router, type RequestHandler } from 'express';

import { loginSchema, registerUserSchema } from '@trinos/shared';

import { authRateLimit } from '../../middleware/rateLimit';
import { validate } from '../../middleware/validate';

export const authRouter: Router = Router();

// Handlers are implemented in the auth prompt (2.x); routes/validation are wired now.
const notImplemented: RequestHandler = (_req, res) => {
  res.status(501).json({ error: { code: 'NOT_IMPLEMENTED', message: 'Auth pending' } });
};

authRouter.post('/register', authRateLimit, validate(registerUserSchema), notImplemented);
authRouter.post('/login', authRateLimit, validate(loginSchema), notImplemented);
authRouter.post('/refresh', notImplemented);
authRouter.post('/logout', notImplemented);
