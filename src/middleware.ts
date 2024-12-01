import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

 
  // Continue to the next middleware or response
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/api/:path*",           // Match all API routes
    "/_next/static/:path*",   // Match static Next.js assets
    "/_next/image/:path*",    // Match Next.js image optimization routes
    "/favicon.ico"            // Match the favicon request
  ],
};
