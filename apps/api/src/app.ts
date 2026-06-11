import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';

import { corsOrigins } from './config/env';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { globalRateLimit } from './middleware/rateLimit';
import { requestLogger } from './middleware/requestLogger';
import { adminRouter } from './modules/admin/admin.router';
import { authRouter } from './modules/auth/auth.router';
import { blockersRouter } from './modules/blockers/blockers.router';
import { dashboardRouter } from './modules/dashboard/dashboard.router';
import { healthRouter } from './modules/health/health.router';
import { messagesRouter } from './modules/messages/messages.router';
import { notificationsRouter } from './modules/notifications/notifications.router';
import { reportsRouter } from './modules/reports/reports.router';
import { routingRouter } from './modules/routing/routing.router';
import { teamsRouter } from './modules/teams/teams.router';
import { usersRouter } from './modules/users/users.router';

/** Build the Express application: middleware → routers → error handlers. */
export function createApp(): Express {
  const app = express();

  // Behind Railway's proxy — trust it so rate-limit/ip detection works.
  app.set('trust proxy', 1);

  // Security + parsing
  app.use(helmet());
  app.use(cors({ origin: corsOrigins, credentials: true }));
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(hpp());

  // Observability + global throttle
  app.use(requestLogger);
  app.use(globalRateLimit);

  // Health probes live at the root (no /api prefix) for Railway.
  app.use(healthRouter);

  // Feature modules under /api
  app.use('/api/auth', authRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/teams', teamsRouter);
  app.use('/api/reports', reportsRouter);
  app.use('/api/routing', routingRouter);
  app.use('/api/blockers', blockersRouter);
  app.use('/api/dashboard', dashboardRouter);
  app.use('/api/messages', messagesRouter);
  app.use('/api/notifications', notificationsRouter);
  app.use('/api/admin', adminRouter);

  // 404 + centralised error handling (must be last)
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
