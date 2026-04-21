const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET    || "production";
const API_VER    = "2024-01-01";

/**
 * Fetch data from Sanity's CDN using a GROQ query.
 * Returns null if the project ID is missing or the request fails.
 */
export async function sanityFetch<T = unknown>(
  query: string,
  params?: Record<string, string>
): Promise<T | null> {
  if (!PROJECT_ID) return null;
  try {
    let url =
      `https://${PROJECT_ID}.api.sanity.io/v${API_VER}/data/query/${DATASET}` +
      `?query=${encodeURIComponent(query)}`;

    // Append GROQ parameters as $key="value" pairs
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        url += `&$${key}=${encodeURIComponent(JSON.stringify(value))}`;
      }
    }

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json() as { result: T };
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
