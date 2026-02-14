import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Simple check for session cookie
  // Better-auth uses specific cookie names, often "better-auth.session_token"
  // But without safe implementation of checking session validity on edge, we might just check existence for now
  // or use fetch to validate if critical.

  // For now, let's just check if the path starts with /dashboard
  if (pathname.startsWith("/dashboard")) {
    const sessionToken =
      request.cookies.get("better-auth.session_token") ||
      request.cookies.get("better-auth.session_token.sig");
    // better-auth default cookie name is "better-auth.session_token"

    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
