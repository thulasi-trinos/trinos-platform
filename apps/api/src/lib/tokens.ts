import jwt from 'jsonwebtoken';

import type { Role } from '@trinos/shared';

import { TOKEN_TTL } from '../config/constants';
import { env } from '../config/env';
import type { AccessTokenPayload } from '../types/auth';

import { cache } from './redis';

const BLOCKLIST_PREFIX = 'blocklist:jti:';

export interface SignAccessArgs {
  userId: string;
  roles: Role[];
  isSuperAdmin: boolean;
  jti: string;
}

export function signAccessToken(args: SignAccessArgs): string {
  const payload: Omit<AccessTokenPayload, 'iat' | 'exp'> = {
    sub: args.userId,
    roles: args.roles,
    isSuperAdmin: args.isSuperAdmin,
    jti: args.jti,
  };
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: TOKEN_TTL.ACCESS });
}

export function signRefreshToken(userId: string, jti: string): string {
  return jwt.sign({ sub: userId, jti }, env.JWT_REFRESH_SECRET, {
    expiresIn: TOKEN_TTL.REFRESH,
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload;
}

export function verifyRefreshToken(token: string): { sub: string; jti: string } {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as { sub: string; jti: string };
}

/** Add a token's jti to the blocklist until its natural expiry (logout). */
export async function blocklistJti(jti: string, ttlSeconds: number): Promise<void> {
  await cache.set(`${BLOCKLIST_PREFIX}${jti}`, '1', 'EX', Math.max(1, ttlSeconds));
}

export async function isBlocklisted(jti: string): Promise<boolean> {
  const hit = await cache.get(`${BLOCKLIST_PREFIX}${jti}`);
  return hit !== null;
}
