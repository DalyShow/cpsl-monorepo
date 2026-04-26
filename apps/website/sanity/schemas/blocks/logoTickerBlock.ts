import { defineField, defineType } from "sanity";

/**
 * Logo Ticker — site-wide reusable block.
 *
 * The block itself carries no per-instance config. Logos and timing
 * live in Site Settings → Logo Ticker, so adding the block is just a
 * placement marker: drop it into a page and it renders the same logo
 * strip everywhere it appears. Edit it once in Site Settings and
 * every page that uses the block updates.
 */
export const logoTickerBlock = defineType({
  name: "logoTickerBlock",
  title: "Logo Ticker",
  type: "object",
  fields: [
    defineField({
      name: "note",
      title: "Heads up",
      type: "string",
      readOnly: true,
      initialValue:
        "Configured globally in Site Settings → Logo Ticker. No per-page config needed.",
      description:
        "This block is a placement marker. To change the logos, timing, or background, edit Site Settings → Logo Ticker.",
    }),
  ],
  preview: {
    prepare() {
      return {
        title:    "Logo Ticker",
        subtitle: "Site-wide — configured in Site Settings",
      };
    },
  },
});
