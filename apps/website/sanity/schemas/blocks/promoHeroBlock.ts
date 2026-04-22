import { defineField, defineType } from "sanity";

export const promoHeroBlock = defineType({
  name: "promoHeroBlock",
  title: "Promo Hero",
  type: "object",
  description: "70vh full-bleed hero with eyebrow, headline, subhead, CTA and optional image/video background.",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Short uppercase label above the headline.",
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
      initialValue: "Apply for Admission",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Link",
      type: "string",
      initialValue: "#apply",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
      description:
        "Full-bleed hero background. Also acts as the poster for the optional looping video. Ignored if Slides are set below.",
    }),
    defineField({
      name: "backgroundVideo",
      title: "Background Video",
      type: "file",
      options: { accept: "video/mp4,video/webm,video/quicktime" },
      description:
        "Optional looping video. MP4 or WebM, muted + autoplay, inline. Keep under ~8 MB for iOS. Ignored if Slides are set below.",
    }),
    defineField({
      name: "slides",
      title: "Slides",
      type: "array",
      description:
        "Optional slideshow. When ≥1 slide is set, this overrides the single Background Image / Video above. Slides crossfade on a timer with a circular progress ring on the far left.",
      of: [{ type: "heroSlide" }],
    }),
    defineField({
      name: "slideDuration",
      title: "Seconds per slide",
      type: "number",
      description: "Timer length for each slide. Default 6. Only applies when Slides is set.",
      initialValue: 6,
      validation: (R) => R.min(1).max(30),
    }),
    defineField({
      name: "fullHeight",
      title: "Fill Viewport",
      type: "boolean",
      description:
        "When on, the hero fills the visible viewport below the nav (100dvh with safe-area handling). Overrides the Height field below.",
      initialValue: false,
    }),
    defineField({
      name: "height",
      title: "Height (manual)",
      type: "string",
      description:
        "Hero section height when Fill Viewport is off. Default '70vh'. Use '60vh' for shorter, '80vh' for taller, etc.",
      initialValue: "70vh",
      hidden: ({ parent }) => !!parent?.fullHeight,
    }),
    defineField({
      name: "layout",
      title: "Content Layout",
      type: "string",
      description:
        "'Center' = large centered headline (default). 'Left' = smaller headline + copy pinned to the left edge — good as an alternate hero style for secondary pages.",
      initialValue: "center",
      options: {
        list: [
          { title: "Center",         value: "center" },
          { title: "Left (smaller)", value: "left"   },
        ],
        layout: "radio",
      },
    }),
  ],
  preview: {
    select: { title: "headline", subtitle: "eyebrow", media: "backgroundImage" },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Promo Hero",
        subtitle: subtitle || "hero section",
        media,
      };
    },
  },
});
