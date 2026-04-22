import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Disables Next.js draft mode and redirects the user back to the
 * page they were on (or home). Used by the exit-preview banner
 * when an editor is done reviewing draft content.
 *
 * GET /api/draft/disable?redirect=/some-path
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirect = searchParams.get("redirect") ?? "/";
  const safeRedirect = redirect.startsWith("/") ? redirect : "/";

  const draft = await draftMode();
  draft.disable();

  return NextResponse.redirect(new URL(safeRedirect, request.url));
}
