import { Worker } from 'bullmq';

import { QUEUES } from '../../config/constants';
import { logger } from '../../lib/logger';
import { createQueueConnection } from '../../lib/redis';

/**
 * Sends submission reminders ahead of the daily deadline. Concrete scheduling
 * and recipient resolution is wired in the notifications prompt.
 */
export function createReminderWorker(): Worker {
  const worker = new Worker(
    QUEUES.REMINDER,
    async (job) => {
      logger.debug({ jobId: job.id }, 'processing reminder job');
    },
    { connection: createQueueConnection() },
  );
  worker.on('failed', (job, err) => logger.error({ jobId: job?.id, err }, 'reminder job failed'));
  return worker;
}
