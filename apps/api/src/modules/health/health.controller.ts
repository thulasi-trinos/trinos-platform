import type { Request, Response } from 'express';

import { pingDatabase } from '../../lib/prisma';
import { pingRedis } from '../../lib/redis';

/** GET /healthz — liveness + dependency snapshot. Always 200. */
export async function healthz(_req: Request, res: Response): Promise<void> {
  const [db, redis] = await Promise.all([pingDatabase(), pingRedis()]);
  const ok = db && redis;
  res.status(200).json({
    status: ok ? 'ok' : 'degraded',
    db: db ? 'up' : 'down',
    redis: redis ? 'up' : 'down',
    uptime: Math.round(process.uptime()),
  });
}

/** GET /readyz — readiness for the load balancer. 503 if any dependency is down. */
export async function readyz(_req: Request, res: Response): Promise<void> {
  const [db, redis] = await Promise.all([pingDatabase(), pingRedis()]);
  const ready = db && redis;
  res.status(ready ? 200 : 503).json({
    status: ready ? 'ready' : 'not_ready',
    db: db ? 'up' : 'down',
    redis: redis ? 'up' : 'down',
  });
}
