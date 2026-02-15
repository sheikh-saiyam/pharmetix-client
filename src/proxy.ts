import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { signOut } from "./lib/auth-client";
import { UserStatus } from "./types/user.type";
import { cookies } from "next/headers";
import { UserRole } from "./features/auth/schemas/auth.schema";
import { getSession } from "./lib/get-session";

const AUTH_ROUTES = ["/auth/login", "/auth/register"];
const ADMIN_ROUTES = ["/dashboard/admin"];
const SELLER_ROUTES = ["/dashboard/seller"];
const CUSTOMER_ROUTES = ["/dashboard/customer"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { data: session } = await getSession();

  const cookieStore = await cookies();

  const sessionToken =
    cookieStore.get("better-auth.session_token") ||
    cookieStore.get("better-auth.session-token");

  // 1. If user is logged in and trying to access auth routes, redirect to dashboard
  if (session && AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname.startsWith("/dashboard")) {
    // 2. If user is not logged in and trying to access protected routes, redirect to login
    if (!sessionToken && !session) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    const role = session?.user.role;
    const status = session?.user.status;

    // 3. If user is banned or inactive, redirect to home
    if (status === UserStatus.BANNED || status === UserStatus.INACTIVE) {
      await signOut({ fetchOptions: { headers: request.headers } });
      return NextResponse.redirect(new URL("/", request.url));
    }

    // 4. Protect Admin Routes
    if (ADMIN_ROUTES.some((r) => pathname.startsWith(r))) {
      if (role !== UserRole.ADMIN) {
        return NextResponse.redirect(new URL("/dashboard/admin", request.url));
      }
    }

    // 5. Protect Seller Routes
    if (SELLER_ROUTES.some((r) => pathname.startsWith(r))) {
      if (role !== UserRole.SELLER) {
        return NextResponse.redirect(new URL("/dashboard/seller", request.url));
      }
    }

    // 6. Protect Customer Routes
    if (CUSTOMER_ROUTES.some((r) => pathname.startsWith(r))) {
      if (role !== UserRole.CUSTOMER) {
        return NextResponse.redirect(
          new URL("/dashboard/customer", request.url),
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
