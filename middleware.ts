import { NextRequest, NextResponse } from "next/server"
import { auth } from "./auth"

const protectedRoutes = ["/app"]
const unprotectedRoutes = ["/", "/auth"]

export default async function middleware(request: NextRequest) {
  const session = await auth()

  const isProtectedRoute = protectedRoutes.some((prefix) => request.nextUrl.pathname.startsWith(prefix))
  if (!session && isProtectedRoute) {
    const absoluteURL = new URL("/", request.nextUrl.origin)
    return NextResponse.redirect(absoluteURL.toString())
  }

  if (session && unprotectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL("/app", request.nextUrl.origin)
    return NextResponse.redirect(absoluteURL.toString())
  }
}

export const config = {
  unstable_allowDynamic: ["/node_modules/mongoose/dist/browser.umd.js"],
}
