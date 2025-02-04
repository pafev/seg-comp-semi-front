import {
  type MiddlewareConfig,
  NextResponse,
  type NextRequest,
} from "next/server";

export default async function Middleware(req: NextRequest) {
  const {
    nextUrl: { pathname },
    cookies,
    url,
  } = req;
  const token = cookies.get("auth.token");

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", url));
  }

  if (pathname === "/sign-in" || pathname === "/sign-up") {
    return NextResponse.redirect(new URL("/", url));
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    "/",
    "/files",
    "/upload-file",
    {
      source: "/",
      missing: [{ type: "cookie", key: "auth.token" }],
    },
    {
      source: "/sign-in",
      has: [{ type: "cookie", key: "auth.token" }],
    },
    {
      source: "/forgot-password",
      has: [{ type: "cookie", key: "auth.token" }],
    },
  ],
};
