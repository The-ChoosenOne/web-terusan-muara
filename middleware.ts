import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export default function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('isLoggedIn')
  const { pathname } = request.nextUrl

  // Jangan hadang login atau file sistem
  if (
    pathname.startsWith('/login') || 
    pathname.startsWith('/_next') || 
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Jaga folder dashboard
  if (pathname.startsWith('/dashboard') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}