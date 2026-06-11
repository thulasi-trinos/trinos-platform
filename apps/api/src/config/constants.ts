// Static, non-secret constants for the API runtime.

/** Redis logical databases. */
export const REDIS_DB = {
  /** BullMQ queues. */
  QUEUES: 0,
  /** Cache + JWT blocklist. */
  CACHE: 1,
} as const;

/** Auth cookie names. */
export const COOKIES = {
  ACCESS: 'trinos_access',
  REFRESH: 'trinos_refresh',
} as const;

/** Token lifetimes. */
export const TOKEN_TTL = {
  /** Access token — 8h per FR-AUTH-04 / NFR-SEC-05. */
  ACCESS: '8h',
  /** Refresh token — 7d. */
  REFRESH: '7d',
} as const;

export const REFRESH_TTL_SECONDS = 7 * 24 * 60 * 60;

/** bcrypt work factor. */
export const BCRYPT_COST = 12;

/** BullMQ queue names. */
export const QUEUES = {
  NOTIFICATION: 'notification',
  OVERDUE: 'overdue',
  REMINDER: 'reminder',
} as const;

/** Socket.io room naming helpers. */
export const ROOMS = {
  user: (userId: string) => `user:${userId}`,
  role: (role: string) => `role:${role}`,
  entity: (type: string, id: string) => `${type}:${id}`,
} as const;
