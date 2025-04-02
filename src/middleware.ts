// src/middleware.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // Import the auth function

// Define public routes (accessible without login)
const publicRoutes = [
  "/", // Homepage
  "/about",
  "/contact",
  "/admissions", // Public info page
  "/admissions-page",
  "/facilities",
  "/departments",
  "/news",
  "/gallery",
  "/login",
  "/register", // Add registration page if you have one
  "/api/auth", // NextAuth API routes need to be accessible
  // Add other public routes/api endpoints as needed
];

// Define auth routes (login, register) - redirect if logged in
const authRoutes = ["/login", "/register"];

export default auth(async (req) => {
  const { nextUrl } = req;
  const session = req.auth; // Get session directly from auth middleware
  const isLoggedIn = !!session;

  const isPublicRoute = publicRoutes.some(
    (route) =>
      nextUrl.pathname === route ||
      (route.endsWith("/") && nextUrl.pathname.startsWith(route)) || // Handle root '/'
      nextUrl.pathname.startsWith(route + "/") || // Handle sub-paths like /api/auth/*
      nextUrl.pathname.match(new RegExp(`^${route.replace("*", ".*")}$`)) // Basic wildcard support if needed
  );
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Allow NextAuth API calls
  if (nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // If trying to access auth routes while logged in, redirect to dashboard
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  // If trying to access a protected route without being logged in, redirect to login
  if (!isPublicRoute && !isLoggedIn) {
    // Store the intended URL to redirect back after login
    const callbackUrl = encodeURIComponent(nextUrl.pathname + nextUrl.search);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, nextUrl)
    );
  }

  // Allow access if it's a public route or the user is logged in
  return NextResponse.next();
});

// Define which paths the middleware should run on
export const config = {
  matcher: [
    // Match all routes except static files and _next internal paths
    "/((?!api/auth|api/webhooks|_next/static|_next/image|favicon.ico|assets/).*)",
  ],
};
