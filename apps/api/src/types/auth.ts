import type { Role } from '@trinos/shared';

/** Decoded JWT access-token payload. */
export interface AccessTokenPayload {
  sub: string; // userId
  roles: Role[];
  isSuperAdmin: boolean;
  /** JWT id — used for the Redis blocklist. */
  jti: string;
  iat?: number;
  exp?: number;
}

/** Authenticated principal attached to `req.user`. */
export interface AuthUser {
  id: string;
  roles: Role[];
  isSuperAdmin: boolean;
  jti: string;
}
