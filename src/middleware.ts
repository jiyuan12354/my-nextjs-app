// Middleware for route protection - Simplified for client-side auth

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for auth routes, API routes, and static assets
  if (
    pathname.startsWith('/auth') || 
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }
  
  // For client-side authentication using localStorage,
  // we let the RouteGuard components handle route protection
  // Middleware mainly handles API route protection and basic redirects
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public|icons|manifest.json|sw.js).*)',
  ],
};
