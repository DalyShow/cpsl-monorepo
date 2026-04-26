import { defineLocations, type PresentationPluginOptions } from "sanity/presentation";

/**
 * Maps each editable document type to its frontend URL(s).
 * The Presentation tool uses these to:
 *   - navigate the iframe when a document is selected in the Studio
 *   - show "Used on" location badges on each document
 */
export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    homePage: defineLocations({
      message: "This document is used on the home page.",
      tone:    "positive",
      locations: [{ title: "Home", href: "/" }],
    }),

    brandPage: defineLocations({
      message: "This document is the standalone brand microsite.",
      tone:    "positive",
      locations: [{ title: "Brand", href: "/brand" }],
    }),

    page: defineLocations({
      select: {
        title:      "title",
        slug:       "slug.current",
        parentSlug: "parent->slug.current",
      },
      resolve: (doc) => {
        if (!doc?.slug) return null;
        const path = doc.parentSlug ? `/${doc.parentSlug}/${doc.slug}` : `/${doc.slug}`;
        return {
          locations: [
            { title: doc.title || "Page", href: path },
          ],
        };
      },
    }),

    siteSettings: defineLocations({
      message: "Site-wide settings — affect every page.",
      tone:    "caution",
      locations: [{ title: "Home", href: "/" }],
    }),
  },
};
