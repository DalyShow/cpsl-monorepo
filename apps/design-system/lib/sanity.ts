// Thin read-only Sanity fetch for the design-system showcase.
// Modelled after apps/website/lib/sanity/client.ts — no SDK, public dataset.

const PROJECT_ID = "6fq1zd6y";
const DATASET = "production";
const API_VER = "2024-01-01";

export async function sanityFetch<T = unknown>(
  query: string,
): Promise<T | null> {
  try {
    const url =
      `https://${PROJECT_ID}.api.sanity.io/v${API_VER}/data/query/${DATASET}` +
      `?query=${encodeURIComponent(query)}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = (await res.json()) as { result: T };
    return json.result ?? null;
  } catch {
    return null;
  }
}
