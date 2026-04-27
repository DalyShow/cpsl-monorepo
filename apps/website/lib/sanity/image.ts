import { client } from "./client";

/**
 * Build a Sanity CDN image URL from an image reference object.
 * Usage: urlFor(image).width(800).url()
 */
export function urlFor(source: { asset?: { _ref?: string } }) {
  const ref = source?.asset?._ref ?? "";
  // Parse Sanity image ref format: image-<id>-<width>x<height>-<ext>
  const [, id, dimensions, ext] = ref.split("-");
  if (!id) return { url: () => "" };
  const path = `images/${client.projectId}/${client.dataset}/${id}-${dimensions}.${ext}`;
  const url = `https://cdn.sanity.io/${path}`;
  return {
    url: () => url,
    width: (w: number) => ({ url: () => `${url}?w=${w}` }),
  };
}

/**
 * Append modern-format + sharpening params to a raw Sanity CDN URL.
 *
 * Defaults applied across the site:
 *   - auto=format → AVIF/WebP when the browser supports it (smaller files)
 *   - q=88        → JPEG quality (Sanity's default is 75 — bumped for hero photography)
 *   - sharp=18    → unsharp-mask filter; 0–100 scale, 18 is a tasteful crispening
 *                   that survives downscaling without looking processed
 *
 * Pass an options object to tune per-call (e.g. logos do better with sharp=8,
 * portrait headshots tolerate sharp=22). Pass `null` for any key to drop the
 * default and emit no value for that key.
 *
 * Idempotent — if the URL already has a query string with these keys, the
 * caller's params take precedence.
 */
export function enhanceImageUrl(
  url: string | undefined | null,
  opts: { sharp?: number | null; q?: number | null; auto?: string | null } = {},
): string | undefined {
  if (!url) return undefined;

  const sharp = opts.sharp === undefined ? 18 : opts.sharp;
  const q     = opts.q     === undefined ? 88 : opts.q;
  const auto  = opts.auto  === undefined ? "format" : opts.auto;

  const params = new URLSearchParams();
  if (auto  != null) params.set("auto",  auto);
  if (q     != null) params.set("q",     String(q));
  if (sharp != null) params.set("sharp", String(sharp));

  if (params.toString().length === 0) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}${params.toString()}`;
}
