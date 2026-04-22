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
      description: "Full-bleed hero background. Also acts as the poster for the optional looping video.",
    }),
    defineField({
      name: "backgroundVideo",
      title: "Background Video",
      type: "file",
      options: { accept: "video/mp4,video/webm,video/quicktime" },
      description: "Optional looping video. MP4 or WebM, muted + autoplay, inline. Keep under ~8 MB for iOS.",
    }),
    defineField({
      name: "height",
      title: "Height",
      type: "string",
      description: "Hero section height. Default '70vh'. Use '100vh' for full viewport, '60vh' for shorter, etc.",
      initialValue: "70vh",
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
