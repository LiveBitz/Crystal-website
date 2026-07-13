import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/auth";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/crystal171admin/login")) {
    return NextResponse.next();
  }

  const session = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;

  if (await isValidAdminSession(session)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/crystal171admin/login", req.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/crystal171admin/:path*"],
};
