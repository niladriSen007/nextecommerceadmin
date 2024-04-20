import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    /* publicRoutes = ['/login', '/signup', '/verifyemail', '/api/:path*']; */

    const pathname = request.nextUrl.pathname;

    const isPublicPath = pathname === '/login' || pathname === '/signup' || pathname === '/verifyemail' || pathname === '/api/:path*';

    const token = request.cookies.get('token')?.value;

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }



  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:[
    '/',
    '/login',
    '/signup',
    '/verifyemail',
    '/profile',
  ]
}