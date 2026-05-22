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

    // page: deliberately omitted — the locations resolver hangs on
    // newly-created pages (likely waiting on a Sanity API call that
    // needs a SANITY_API_READ_TOKEN we don't have yet). Re-add once a
    // Viewer token is in env. Site navigation isn't affected — only
    // the "Used on" badge.

    siteSettings: defineLocations({
      message: "Site-wide settings — affect every page.",
      tone:    "caution",
      locations: [{ title: "Home", href: "/" }],
    }),
  },
};
