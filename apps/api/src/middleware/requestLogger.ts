import { randomUUID } from 'node:crypto';

import pinoHttp from 'pino-http';

import { logger } from '../lib/logger';

export const requestLogger = pinoHttp({
  logger,
  genReqId: (req, res) => {
    const existing = req.headers['x-request-id'];
    const id = (Array.isArray(existing) ? existing[0] : existing) ?? randomUUID();
    res.setHeader('x-request-id', id);
    return id;
  },
  // Quieten health probes.
  autoLogging: {
    ignore: (req) => req.url === '/healthz' || req.url === '/readyz',
  },
  customLogLevel: (_req, res, err) => {
    if (err || res.statusCode >= 500) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },
});
