// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from "./route";

export function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const isLoggedIn =
    !!req.cookies.get("next-auth.session-token") ||
    !!req.cookies.get("__Secure-next-auth.session-token");

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.some(
    (route) =>
      nextUrl.pathname === route || nextUrl.pathname.startsWith(`${route}/`)
  );
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Allow API auth routes to pass through
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // Redirect authenticated users away from auth routes
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  // Allow access to public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Require authentication for protected routes
  if (!isLoggedIn) {
    const callbackUrl = encodeURIComponent(nextUrl.pathname + nextUrl.search);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, nextUrl)
    );
  }

  return NextResponse.next();
}

// Define which paths the middleware should run on
export const config = {
  matcher: [
    // Match all routes except static files and _next internal paths
    "/((?!_next/static|_next/image|favicon.ico|assets/).*)",
  ],
};
