import rateLimit from 'express-rate-limit';

import { isTest } from '../config/env';

// Generous global limiter — protects the API from runaway clients.
export const globalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isTest ? 100_000 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { code: 'RATE_LIMITED', message: 'Too many requests' } },
});

// Strict limiter for auth endpoints (brute-force defence, complements lockout).
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isTest ? 100_000 : 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { code: 'RATE_LIMITED', message: 'Too many auth attempts' } },
});
