import pino from 'pino';

import { isProd, isTest } from '../config/env';

export const logger = pino({
  level: isTest ? 'silent' : isProd ? 'info' : 'debug',
  transport: isProd
    ? undefined
    : {
        target: 'pino-pretty',
        options: { colorize: true, translateTime: 'SYS:HH:MM:ss', ignore: 'pid,hostname' },
      },
});

export type Logger = typeof logger;
