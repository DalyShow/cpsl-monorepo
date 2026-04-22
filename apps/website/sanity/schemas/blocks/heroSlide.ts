import { defineField, defineType } from "sanity";

/**
 * One slide inside a promoHeroBlock's slideshow. Carries both the
 * background (image/video) AND its own copy — so each slide can
 * have a unique headline, sub, eyebrow, and CTA. Any slide field
 * left blank falls back to the hero's top-level value for that
 * field on the parent promoHeroBlock.
 */
export const heroSlide = defineType({
  name: "heroSlide",
  title: "Hero Slide",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Leave blank to use the hero's default eyebrow.",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: "Leave blank to use the hero's default headline.",
    }),
    defineField({
      name: "subheadline",
      title: "Subheadline",
      type: "text",
      rows: 2,
      description: "Leave blank to use the hero's default subheadline.",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
      description: "Leave blank to use the hero's default CTA label.",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Link",
      type: "string",
      description: "Leave blank to use the hero's default CTA link.",
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
