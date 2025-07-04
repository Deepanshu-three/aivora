import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/", "/sign-in(.*)", "/sign-up(.*)", "/products(.*)", "/contact",
  "/faq", "/privacy", "/returns", "/terms", "/blogs", "/about",
  "/api/products(.*)", "/api/cart", "/logo.png", "/api/category", "/printedpart.jpg",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

if (isAdminRoute(request)) {
  const { sessionClaims } = await auth();

  // Clerk exposes it as 'publicMetadata', not 'metadata'
  const metadata = sessionClaims?.metadata as { role?: string };

  if (metadata?.role !== 'admin') {
    const url = new URL('/', request.url);
    return NextResponse.redirect(url);
  }
}

});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}