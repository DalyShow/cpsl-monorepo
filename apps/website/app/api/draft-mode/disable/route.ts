import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Disable draft mode and return to the homepage.
 * Used by the floating "Disable Draft Mode" button on the live site.
 */
export async function GET(request: Request) {
  (await draftMode()).disable();
  return NextResponse.redirect(new URL("/", request.url));
}
