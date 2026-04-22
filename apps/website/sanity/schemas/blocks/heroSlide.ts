import { defineField, defineType } from "sanity";

/**
 * One slide inside a promoHeroBlock's slideshow. Carries both the
 * background (image/video) AND its own copy — so each slide can
 * have a unique headline, sub, eyebrow, and CTA. Fields left blank
 * render as blank on that slide; they do NOT inherit from the
 * parent hero or the previous slide.
 */
export const heroSlide = defineType({
  name: "heroSlide",
  title: "Hero Slide",
  type: "object",
  fields: [
    defineField({
      name: "graphic",
      title: "Graphic (above headline)",
      type: "image",
      description:
        "Optional logo, crest, or emblem shown directly above the headline. Recommended 200 × 200 px (scales down responsively).",
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Leave blank to render no eyebrow on this slide.",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: "Leave blank to render no headline on this slide.",
    }),
    defineField({
      name: "subheadline",
      title: "Subheadline",
      type: "text",
      rows: 2,
      description: "Leave blank to render no subheadline on this slide.",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
      description: "Leave blank to render no CTA on this slide.",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Link",
      type: "string",
      description: "Leave blank to render no CTA on this slide.",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description: "Slide background. Also used as the poster for the video while it loads.",
    }),
    defineField({
      name: "video",
      title: "Video (optional)",
      type: "file",
      options: { accept: "video/mp4,video/webm,video/quicktime" },
      description: "Looping muted video. MP4/WebM, keep under ~8 MB for iOS.",
    }),
  ],
  preview: {
    select: { title: "headline", subtitle: "eyebrow", media: "image" },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Slide",
        subtitle: subtitle || "hero slide",
        media,
      };
    },
  },
});
