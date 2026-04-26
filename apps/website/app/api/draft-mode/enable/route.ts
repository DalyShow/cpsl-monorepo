import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { createClient } from "next-sanity";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Presentation-tool draft-mode enable route.
 *
 * The Sanity Studio's Presentation tool calls this when an editor
 * opens a document. We validate the Sanity-issued preview secret,
 * flip Next.js draftMode on, and redirect to the target slug so the
 * iframe renders the draft with stega encoding.
 *
 * NOTE: We're NOT using next-sanity's `defineEnableDraftMode` —
 * its built-in cookie-rewriting hack (re-setting `__prerender_bypass`
 * with sameSite=none) breaks on Next.js 16 because the cookie value
 * is undefined on first call → "TypeError: Cannot convert undefined
 * to string". Studio is embedded in this same Next.js app at
 * /studio, so the iframe is same-origin and the default sameSite=lax
 * cookie set by draftMode().enable() works fine.
 */
const client = createClient({
  projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET    || "production",
  apiVersion: "2024-01-01",
  useCdn:     false,
  token:      process.env.SANITY_API_READ_TOKEN,
});

export async function GET(request: Request) {
  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    client,
    request.url,
  );
  if (!isValid) {
    return new Response("Invalid secret", { status: 401 });
  }
  (await draftMode()).enable();
  redirect(redirectTo);
}
