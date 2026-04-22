import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Enables Next.js draft mode and redirects to the requested slug.
 * Sanity Studio's "Preview" button hits this route with a signed
 * secret — once draft mode is on, sanityFetch starts pulling
 * unpublished drafts on every page for the rest of the session.
 *
 * GET /api/draft/enable?secret=<SANITY_PREVIEW_SECRET>&slug=/some-path
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug") ?? "/";

  const expected = process.env.SANITY_PREVIEW_SECRET;

  if (!expected) {
    return new NextResponse(
      "SANITY_PREVIEW_SECRET is not configured on the server.",
      { status: 500 },
    );
  }
  if (secret !== expected) {
    return new NextResponse("Invalid preview token.", { status: 401 });
  }

  // Only allow relative paths to prevent open-redirect attacks.
  const safeSlug = slug.startsWith("/") ? slug : "/";

  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(new URL(safeSlug, request.url));
}
