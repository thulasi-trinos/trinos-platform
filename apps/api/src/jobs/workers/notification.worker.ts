import { Worker } from 'bullmq';

import { QUEUES } from '../../config/constants';
import { logger } from '../../lib/logger';
import { createQueueConnection } from '../../lib/redis';

export interface NotificationJob {
  userId: string;
  type: string;
  title: string;
  message: string;
  entityType?: string;
  entityId?: string;
}

/**
 * Delivers notifications (in-app persistence + email fan-out). Concrete
 * delivery is wired in the notifications module prompt; this establishes the
 * worker and a safe no-op.
 */
export function createNotificationWorker(): Worker<NotificationJob> {
  const worker = new Worker<NotificationJob>(
    QUEUES.NOTIFICATION,
    async (job) => {
      logger.debug({ jobId: job.id, type: job.data.type }, 'processing notification job');
    },
    { connection: createQueueConnection() },
  );
  worker.on('failed', (job, err) => logger.error({ jobId: job?.id, err }, 'notification job failed'));
  return worker;
}
