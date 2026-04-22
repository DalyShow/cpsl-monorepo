import { draftMode } from "next/headers";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET    || "production";
const API_VER    = "2024-01-01";

/**
 * Fetch data from Sanity's CDN using a GROQ query.
 * Returns null if the project ID is missing or the request fails.
 *
 * When Next.js draftMode is enabled (via /api/draft/enable) and a
 * SANITY_API_READ_TOKEN is configured, this requests the
 * "previewDrafts" perspective so unpublished changes are included
 * in the response. Outside draft mode it uses the public "published"
 * perspective and no auth — safe for static paths and the CDN edge
 * cache.
 */
export async function sanityFetch<T = unknown>(
  query: string,
  params?: Record<string, string>,
): Promise<T | null> {
  if (!PROJECT_ID) return null;

  // Detect draft mode. `draftMode()` is only callable in server
  // contexts; we guard with try/catch so this client can still run
  // from non-request scopes (build-time static generation).
  let isDraft = false;
  try {
    isDraft = (await draftMode()).isEnabled;
  } catch {
    isDraft = false;
  }

  const token = process.env.SANITY_API_READ_TOKEN;
  const usePreview = isDraft && !!token;

  try {
    let url =
      `https://${PROJECT_ID}.api.sanity.io/v${API_VER}/data/query/${DATASET}` +
      `?query=${encodeURIComponent(query)}`;

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        url += `&$${key}=${encodeURIComponent(JSON.stringify(value))}`;
      }
    }
    if (usePreview) {
      url += `&perspective=previewDrafts`;
    }

    const res = await fetch(url, {
      cache: usePreview ? "no-store" : "no-store",
      headers: usePreview
        ? { Authorization: `Bearer ${token}` }
        : undefined,
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { result: T };
    return json.result ?? null;
  } catch {
    return null;
  }
}

// Legacy alias kept for image helper compatibility
export const client = {
  projectId: PROJECT_ID,
  dataset:   DATASET,
};
