import { Queue, type Worker } from 'bullmq';

import { QUEUES } from '../config/constants';
import { createQueueConnection } from '../lib/redis';
import { logger } from '../lib/logger';

import { createNotificationWorker } from './workers/notification.worker';
import { createOverdueWorker } from './workers/overdue.worker';
import { createReminderWorker } from './workers/reminder.worker';

// One shared ioredis connection for producers; each worker gets its own.
const connection = createQueueConnection();

export const notificationQueue = new Queue(QUEUES.NOTIFICATION, { connection });
export const overdueQueue = new Queue(QUEUES.OVERDUE, { connection });
export const reminderQueue = new Queue(QUEUES.REMINDER, { connection });

let workers: Worker[] = [];

/** Instantiate all BullMQ workers. Called during bootstrap (step 4). */
export function startWorkers(): void {
  workers = [createNotificationWorker(), createOverdueWorker(), createReminderWorker()];
  logger.info({ count: workers.length }, 'BullMQ workers started');
}

/**
 * Schedule the daily overdue-marking job (FR-REP overdue). Idempotent — uses a
 * fixed jobId so repeated bootstraps don't stack schedules.
 */
export async function scheduleOverdueJob(): Promise<void> {
  await overdueQueue.add(
    'mark-overdue',
    {},
    {
      repeat: { pattern: '5 0 * * *' }, // 00:05 daily
      jobId: 'daily-overdue',
      removeOnComplete: true,
      removeOnFail: 100,
    },
  );
  logger.info('scheduled daily overdue-marking job');
}

/** Drain and close all workers, then producer queues. */
export async function stopQueues(): Promise<void> {
  await Promise.all(workers.map((w) => w.close()));
  await Promise.all([notificationQueue.close(), overdueQueue.close(), reminderQueue.close()]);
  await connection.quit();
  logger.info('BullMQ workers and queues closed');
}
