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
