import { Worker } from 'bullmq';

import { QUEUES } from '../../config/constants';
import { logger } from '../../lib/logger';
import { createQueueConnection } from '../../lib/redis';

/**
 * Marks reports overdue once the daily deadline passes (FR-REP overdue,
 * report.overdue event). Concrete logic is wired in the reports/routing prompt.
 */
export function createOverdueWorker(): Worker {
  const worker = new Worker(
    QUEUES.OVERDUE,
    async (job) => {
      logger.debug({ jobId: job.id }, 'processing overdue-marking job');
    },
    { connection: createQueueConnection() },
  );
  worker.on('failed', (job, err) => logger.error({ jobId: job?.id, err }, 'overdue job failed'));
  return worker;
}
