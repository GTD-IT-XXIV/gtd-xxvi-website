import NextAuth from "next-auth";

import authConfig from "@/lib/nextauth/config";

const { auth } = NextAuth(authConfig);

export default auth((request) => {
  const isLoggedIn = !!request.auth;
  console.log("Route: ", request.nextUrl.pathname);
  console.log("Is logged in? ", isLoggedIn);
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
