import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import getOrCreateDb from './models/server/dbSetup'
import getOrCreateStorage from './models/server/storagesetup'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  await Promise.all([
    getOrCreateDb(),
    getOrCreateStorage(),
  ])
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {

  /*
  - api
  - _next/static
  - _next/image
  - favicon.com
  */

  matcher: [
    "/^(\/api|\/_next\/static|\/_next\/image|\/favicon\.com)/"
  ],
}