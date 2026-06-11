import { createApp } from './app';
import { env } from './config/env';
import { registerEventHandlers } from './events/handlers';
import { createHttpServer } from './http/server';
import { scheduleOverdueJob, startWorkers, stopQueues } from './jobs/queues';
import { logger } from './lib/logger';
import { connectPrisma, disconnectPrisma } from './lib/prisma';
import { connectRedis, disconnectRedis } from './lib/redis';
import { closeIo } from './realtime/io';

async function bootstrap(): Promise<void> {
  // 1. Env is validated at import time (config/env). Fail fast already happened.
  logger.info({ env: env.NODE_ENV }, 'starting Trinos API');

  // 2. Connect Prisma
  await connectPrisma();
  logger.info('Prisma connected');

  // 3. Connect Redis
  await connectRedis();
  logger.info('Redis connected');

  // 4. Start BullMQ workers
  startWorkers();

  // 5/6. Create http server + attach Socket.io
  const app = createApp();
  const { httpServer } = createHttpServer(app);

  // Domain event handlers
  registerEventHandlers();

  // 7. Listen
  await new Promise<void>((resolve) => httpServer.listen(env.PORT, resolve));
  logger.info(`API listening on http://localhost:${env.PORT}`);

  // 8. Schedule the daily overdue-marking job
  await scheduleOverdueJob();

  // 9. Graceful shutdown
  let shuttingDown = false;
  const shutdown = async (signal: string): Promise<void> => {
    if (shuttingDown) return;
    shuttingDown = true;
    logger.info({ signal }, 'shutting down gracefully');

    const timeout = setTimeout(() => {
      logger.error('graceful shutdown timed out — forcing exit');
      process.exit(1);
    }, 15_000);

    try {
      await new Promise<void>((resolve, reject) =>
        httpServer.close((err) => (err ? reject(err) : resolve())),
      );
      await closeIo();
      await stopQueues();
      await disconnectRedis();
      await disconnectPrisma();
      clearTimeout(timeout);
      logger.info('shutdown complete');
      process.exit(0);
    } catch (err) {
      logger.error({ err }, 'error during shutdown');
      process.exit(1);
    }
  };

  process.on('SIGINT', () => void shutdown('SIGINT'));
  process.on('SIGTERM', () => void shutdown('SIGTERM'));
}

bootstrap().catch((err) => {
  logger.error({ err }, 'fatal: failed to start API');
  process.exit(1);
});
