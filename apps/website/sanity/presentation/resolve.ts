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
      // Project only fields on the document itself — no parent->slug deref.
      // The deref can hang for newly-created drafts whose parent reference
      // points at another unsaved draft the server doesn't have yet, leaving
      // the "Resolving locations..." spinner stuck. The [...slug] catch-all
      // route resolves either /child or /parent/child to the same page, so
      // dropping the prefix here is a cosmetic loss only.
      select: {
        title: "title",
        slug:  "slug.current",
      },
      resolve: (doc) => {
        if (!doc?.slug) return null;
        return {
          locations: [
            { title: doc.title || "Page", href: `/${doc.slug}` },
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
