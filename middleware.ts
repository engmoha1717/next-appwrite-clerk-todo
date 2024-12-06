import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(['/todo(.*)']);


export default clerkMiddleware(async(auth, req) => {
  const user = await auth(); 
  if (!user.userId && isProtectedRoute(req)) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  // if (!auth().userId && isProtectedRoute(req)) {
  //   if (!auth.userId) {
  //     return NextResponse.redirect(new URL('/', req.url));
  //   }
  // }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};