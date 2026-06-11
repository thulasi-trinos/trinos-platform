import type { AuthUser } from './auth';

// Augment Express' Request with the authenticated principal set by `requireAuth`.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export {};
