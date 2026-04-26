import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { createClient } from "next-sanity";

/**
 * Presentation-tool draft-mode enable route.
 *
 * The Sanity Studio's Presentation tool calls this when an editor
 * opens a document, passing a Sanity-issued auth header that
 * `defineEnableDraftMode` validates against the project. On success
 * it flips Next.js draftMode on for the iframe session so all
 * subsequent sanityFetch calls return draft content with stega
 * encoding (the invisible chars that power click-to-edit overlays).
 *
 * Distinct from the older /api/draft/enable route, which uses a
 * static SANITY_PREVIEW_SECRET for the legacy "Preview" button.
 */
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET    || "production";

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn:     false,
  token:      process.env.SANITY_API_READ_TOKEN,
});

export const { GET } = defineEnableDraftMode({ client });
