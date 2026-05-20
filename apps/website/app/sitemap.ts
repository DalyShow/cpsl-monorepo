import type { MetadataRoute } from "next";
import { sanityFetch } from "@/lib/sanity/client";

const SITE_URL = "https://carolinapremiersoccerleague.com";

type PageDoc = {
  slug: string;
  parentSlug?: string | null;
  updatedAt: string;
};

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: SITE_URL,                         changeFrequency: "weekly",  priority: 1.0 },
  { url: `${SITE_URL}/clubs`,              changeFrequency: "weekly",  priority: 0.8 },
  { url: `${SITE_URL}/schedule`,           changeFrequency: "daily",   priority: 0.8 },
  { url: `${SITE_URL}/brand`,              changeFrequency: "monthly", priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let pages: PageDoc[] = [];
  try {
    pages =
      (await sanityFetch<PageDoc[]>(
        `*[_type == "page" && defined(slug.current)]{
           "slug":       slug.current,
           "parentSlug": parent->slug.current,
           "updatedAt":  _updatedAt
         }`
      )) ?? [];
  } catch {
    // Sanity unavailable — fall back to static routes only.
  }

  const dynamicRoutes: MetadataRoute.Sitemap = pages.map((p) => {
    const path = p.parentSlug ? `/${p.parentSlug}/${p.slug}` : `/${p.slug}`;
    return {
      url: `${SITE_URL}${path}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : undefined,
      changeFrequency: "weekly",
      priority: 0.6,
    };
  });

  return [...STATIC_ROUTES, ...dynamicRoutes];
}
