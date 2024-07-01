import NextAuth from "next-auth";

import authConfig from "@/lib/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoutes = apiAuthPrefix.some(prefix => nextUrl.pathname.startsWith(prefix));
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoutes) {
    return undefined;
  }

  if (isAuthRoutes) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return undefined;
  }

  if (!isLoggedIn && !isPublicRoutes) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return undefined;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
