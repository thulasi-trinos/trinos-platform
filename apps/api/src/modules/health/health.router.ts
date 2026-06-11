import { Router } from 'express';

import { asyncHandler } from '../../middleware/errorHandler';

import { healthz, readyz } from './health.controller';

export const healthRouter: Router = Router();

healthRouter.get('/healthz', asyncHandler(healthz));
healthRouter.get('/readyz', asyncHandler(readyz));
