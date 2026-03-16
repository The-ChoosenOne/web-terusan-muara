import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 1. Ambil cookie login (yang lo set di LoginPage tadi)
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value

  // 2. Ambil path yang lagi diakses
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard')
  const isLoginPage = request.nextUrl.pathname === '/login'

  // LOGIKA PROTEKSI:
  // Kalau mau ke dashboard tapi GAK ADA cookie login -> Tendang ke login
  if (isDashboardPage && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Kalau udah login tapi mau ke halaman login lagi -> Lempar ke dashboard
  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

// Atur halaman mana aja yang kena filter middleware ini
export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}