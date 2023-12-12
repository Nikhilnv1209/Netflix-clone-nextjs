import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Set CORS headers
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Max-Age", "86400");

  let cookie = request.cookies.get("next-auth.session-token")?.name;
  // console.log("in middleware file cookies", cookie);

  if (!cookie) {
    // redirect to auth page using nextresponse
    return NextResponse.redirect(new URL("/auth", request.url));
    // return new NextResponse(
    //   JSON.stringify({ success: false, message: "authentication failed" }),
    //   { status: 401, headers: { "content-type": "application/json" } }
    // );
  } else {
    return NextResponse.next();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profiles"],
};
