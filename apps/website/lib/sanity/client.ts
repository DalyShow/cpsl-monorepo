import { draftMode } from "next/headers";
import { createClient } from "next-sanity";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET    || "production";
const API_VER    = "2024-01-01";

const publishedClient = createClient({
  projectId:  PROJECT_ID,
  dataset:    DATASET,
  apiVersion: API_VER,
  useCdn:     true,
});

const previewClient = createClient({
  projectId:   PROJECT_ID,
  dataset:     DATASET,
  apiVersion:  API_VER,
  useCdn:      false,
  token:       process.env.SANITY_API_READ_TOKEN,
  perspective: "drafts",
});

/**
 * Fetch data from Sanity using a GROQ query.
 * Returns null if the project ID is missing or the request fails.
 *
 * In Next.js draftMode (after a Studio "Preview" click hits
 * /api/draft/enable) and with SANITY_API_READ_TOKEN configured,
 * this hits the `drafts` perspective so unpublished changes surface
 * in the live preview. Outside draft mode it uses the public CDN
 * with no auth — safe for static paths and edge caching.
 */
export async function sanityFetch<T = unknown>(
  query: string,
  params?: Record<string, string | string[]>,
): Promise<T | null> {
  if (!PROJECT_ID) return null;

  let isDraft = false;
  try {
    isDraft = (await draftMode()).isEnabled;
  } catch {
    isDraft = false;
  }

  const useDraft = isDraft && !!process.env.SANITY_API_READ_TOKEN;
  const client   = useDraft ? previewClient : publishedClient;

  try {
    return await client.fetch<T>(query, params ?? {});
  } catch {
    return null;
  }
}

// Legacy alias kept for image helper compatibility
export const client = {
  projectId: PROJECT_ID,
  dataset:   DATASET,
};
