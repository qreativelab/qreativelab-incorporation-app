import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const VALID_PASSWORD = '@LoMax@$0204@$Showinc';
const AUTH_COOKIE_NAME = 'qreativelab-inc-auth';

export function middleware(request: NextRequest) {
  // Skip middleware for API routes and static files
  if (
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/favicon') ||
    request.nextUrl.pathname === '/login'
  ) {
    return NextResponse.next();
  }

  // Check for auth cookie
  const authCookie = request.cookies.get(AUTH_COOKIE_NAME);

  if (authCookie?.value === 'authenticated') {
    return NextResponse.next();
  }

  // Redirect to login page
  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
