import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { createClient } from "next-sanity";
import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

const client = createClient({
  projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET    || "production",
  apiVersion: "2024-01-01",
  useCdn:     false,
  token:      process.env.SANITY_API_READ_TOKEN,
});

export async function GET(request: Request) {
  try {
    const tokenLen = (process.env.SANITY_API_READ_TOKEN ?? "").length;
    const { isValid, redirectTo = "/" } = await validatePreviewUrl(
      client,
      request.url,
    );
    if (!isValid) {
      return new Response(
        `Invalid secret. Token length: ${tokenLen}.`,
        { status: 401 },
      );
    }
    (await draftMode()).enable();
    return NextResponse.redirect(new URL(redirectTo, request.url));
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack ?? "" : "";
    const tokenLen = (process.env.SANITY_API_READ_TOKEN ?? "").length;
    return new Response(
      `Draft mode enable error\n` +
      `tokenLen=${tokenLen}\n` +
      `message=${msg}\n` +
      `stack=${stack.slice(0, 400)}`,
      { status: 500, headers: { "content-type": "text/plain" } },
    );
  }
}
