// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Protect dashboard routes - redirect to /login if no session
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Check for session cookie
    const session = request.cookies.get('session')
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}
