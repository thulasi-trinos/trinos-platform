import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

/**
 * Edge auth guard. The API sets an httpOnly JWT cookie on login; we cannot
 * read its contents here (httpOnly), only its presence. Pages under the
 * (app) route group require it — unauthenticated requests bounce to /login
 * with a `next` param so we can return the user after sign-in.
 */
const AUTH_COOKIE = 'trinos_token';

// Paths that never require authentication.
const PUBLIC_PATHS = ['/login', '/forgot-password', '/reset-password'];

export function middleware(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl;
  const isPublic = PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const hasToken = req.cookies.has(AUTH_COOKIE);

  // Signed-in users have no business on the auth screens.
  if (isPublic && hasToken) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (!isPublic && !hasToken) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  /**
   * Run on everything except Next internals, API routes, and static assets.
   * The negative lookahead keeps `_next/*`, files with extensions, and
   * `favicon.ico` out of the guard.
   */
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
