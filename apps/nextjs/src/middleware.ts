import { betterFetch } from "@better-fetch/fetch";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import type { SessionWithUser } from "@whatsflow/auth";
import { baseAuthUrl } from "@whatsflow/auth";

const authRoutes = ["/signin", "/signup"];
const passwordRoutes = ["/reset-password", "/forgot-password"];

export default async function authMiddleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const isAuthRoute = authRoutes.includes(pathName);
  const isPasswordRoute = passwordRoutes.includes(pathName);

  // if it's "/" route, just let the user see the page
  if (pathName === "/") {
    return NextResponse.next();
  }

  const { data: session } = await betterFetch<SessionWithUser>(
    "/api/auth/get-session",
    {
      baseURL: baseAuthUrl,
      headers: {
        //get the cookie from the request
        cookie: request.headers.get("cookie") ?? "",
      },
    },
  );

  console.log("Session: ", session);

  if (!session) {
    if (isAuthRoute || isPasswordRoute) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (isAuthRoute || isPasswordRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
