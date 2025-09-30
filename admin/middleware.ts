import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rutas que no requieren autenticación ni chequeo de cookie
const PUBLIC_PATHS = [
  '/login',
  '/api',
  '/favicon.ico',
  '/site.webmanifest',
]

function isPublicPath(pathname: string) {
  if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) return true
  if (pathname.startsWith('/_next')) return true
  if (pathname.startsWith('/assets')) return true
  if (pathname.startsWith('/images')) return true
  if (pathname.startsWith('/logos')) return true
  if (pathname.startsWith('/placeholder.svg')) return true
  return false
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (isPublicPath(pathname)) {
    return NextResponse.next()
  }

  // Cookie simple de sesión seteada en login del cliente
  const isAuth = req.cookies.get('gp_auth')?.value === '1'
  if (!isAuth) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}


