import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const { pathname } = request.nextUrl

  // When accessed from the brand subdomain
  const isBrandSubdomain =
    hostname === 'brand.carolinapremiersoccerleague.com' ||
    hostname.startsWith('brand.') // covers preview/staging aliases

  if (isBrandSubdomain) {
    // /brand/anything → strip the prefix so paths still resolve
    if (pathname.startsWith('/brand')) {
      const stripped = pathname.replace(/^\/brand/, '') || '/'
      return NextResponse.redirect(
        new URL(stripped, request.url)
      )
    }

    // / or any other path → rewrite to /brand/<path>
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = `/brand${pathname === '/' ? '' : pathname}`
    return NextResponse.rewrite(rewriteUrl)
  }

  return NextResponse.next()
}

export const config = {
  // Run on all routes except static files and Next.js internals
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
