import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import api from "./lib/axios";
import { store } from "./lib/store";
import { logger } from "./logger";


const locales = ["vi", "en"];

const getLocales = (request: NextRequest): string => {
  return request.cookies.get("locale")?.value || "vi";
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = cookies().get("access-token")?.value || "";
  // validateToken(accessToken)
  if (!!accessToken?.length) {
    api.defaults.headers.common["X-Access-Token"] = accessToken;
  }
  if (JSON.stringify(request.nextUrl).includes(JSON.stringify(config))) {
    return NextResponse.next();
  }

  if (!accessToken?.length && pathname !== "/sign-in") {
    if (routeNeedAuthen.some((path) => pathname.startsWith(path))) {
      request.nextUrl.pathname = "/sign-in";
      return NextResponse.redirect(request.nextUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};


const routeNeedAuthen = ["/posts", "/profile", "/setting", "/notification"];
