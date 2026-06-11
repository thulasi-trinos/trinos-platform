import { Redis } from 'ioredis';

import { REDIS_DB } from '../config/constants';
import { env } from '../config/env';

// BullMQ requires `maxRetriesPerRequest: null` on its connection.
export function createQueueConnection(): Redis {
  return new Redis(env.REDIS_URL, {
    db: REDIS_DB.QUEUES,
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    lazyConnect: false,
  });
}

// Shared cache / blocklist connection (Redis db 1).
export const cache = new Redis(env.REDIS_URL, {
  db: REDIS_DB.CACHE,
  lazyConnect: true,
  maxRetriesPerRequest: 2,
});

export async function connectRedis(): Promise<void> {
  if (cache.status === 'wait' || cache.status === 'end') {
    await cache.connect();
  }
}

export async function disconnectRedis(): Promise<void> {
  if (cache.status !== 'end') {
    await cache.quit();
  }
}

export async function pingRedis(): Promise<boolean> {
  try {
    const res = await cache.ping();
    return res === 'PONG';
  } catch {
    return false;
  }
}
