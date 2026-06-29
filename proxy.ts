import { auth } from "@/lib/auth";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const intlMiddleware = createIntlMiddleware(routing);

/** Root-level SEO files — must not receive a locale prefix. */
const SEO_PATHS = new Set(["/robots.txt", "/sitemap.xml", "/sitemap", "/llms.txt"]);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (SEO_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  // ── Admin routes: require auth with admin role ─────────────────────────
  if (pathname.startsWith("/admin")) {
    // Allow login page without auth
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    const session = await auth();
    if (!session?.user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    const role = (session.user as { role?: string }).role;
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  // ── Public routes: next-intl locale handling ───────────────────────────
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Admin routes
    "/admin/:path*",
    // All public routes (next-intl): skip static files and API
    "/((?!api|_next/static|_next/image|favicon.ico|images|robots\\.txt|sitemap\\.xml|sitemap|llms\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)).*)",
  ],
};
