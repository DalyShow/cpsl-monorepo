import { defineField, defineType } from "sanity";

/**
 * One side of a dualPanelBlock. Each panel carries its own image
 * (+ optional video), eyebrow, headline, sub, and CTA — independent
 * of the other panel so editors can mix a photo + copy pair on the
 * left with a different pair on the right.
 */
export const dualPanelItem = defineType({
  name: "dualPanelItem",
  title: "Dual Panel Item",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
      description: "Fills the panel. Also serves as the poster for the optional looping video.",
    }),
    defineField({
      name: "video",
      title: "Background Video (optional)",
      type: "file",
      options: { accept: "video/mp4,video/webm,video/quicktime" },
      description: "Looping muted video. MP4/WebM, keep under ~8 MB for iOS.",
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "subheadline",
      title: "Subheadline",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Link",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "headline", subtitle: "eyebrow", media: "image" },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Dual Panel Item",
        subtitle: subtitle || "panel",
        media,
      };
    },
  },
});
