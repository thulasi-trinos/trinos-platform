import type { RequestHandler } from 'express';

import { COOKIES } from '../config/constants';
import { isBlocklisted, verifyAccessToken } from '../lib/tokens';

import { asyncHandler, UnauthorizedError } from './errorHandler';

function extractToken(authorization?: string, cookieToken?: string): string | undefined {
  if (authorization?.startsWith('Bearer ')) return authorization.slice('Bearer '.length).trim();
  return cookieToken;
}

/**
 * Require a valid, non-blocklisted access token. Populates `req.user`.
 * Accepts either an `Authorization: Bearer` header or the access cookie.
 */
export const requireAuth: RequestHandler = asyncHandler(async (req, _res, next) => {
  const cookies = (req as { cookies?: Record<string, string> }).cookies;
  const token = extractToken(req.headers.authorization, cookies?.[COOKIES.ACCESS]);
  if (!token) throw new UnauthorizedError('Missing access token');

  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch {
    throw new UnauthorizedError('Invalid or expired access token');
  }

  if (await isBlocklisted(payload.jti)) {
    throw new UnauthorizedError('Token has been revoked');
  }

  req.user = {
    id: payload.sub,
    roles: payload.roles,
    isSuperAdmin: payload.isSuperAdmin,
    jti: payload.jti,
  };
  next();
});

/** Attach `req.user` if a valid token is present, but never reject. */
export const optionalAuth: RequestHandler = asyncHandler(async (req, _res, next) => {
  const cookies = (req as { cookies?: Record<string, string> }).cookies;
  const token = extractToken(req.headers.authorization, cookies?.[COOKIES.ACCESS]);
  if (token) {
    try {
      const payload = verifyAccessToken(token);
      if (!(await isBlocklisted(payload.jti))) {
        req.user = {
          id: payload.sub,
          roles: payload.roles,
          isSuperAdmin: payload.isSuperAdmin,
          jti: payload.jti,
        };
      }
    } catch {
      /* ignore — optional */
    }
  }
  next();
});
