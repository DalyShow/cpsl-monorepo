import { defineField, defineType } from "sanity";

export const heroBentoBlock = defineType({
  name: "heroBentoBlock",
  title: "Hero — Bento",
  type: "object",
  fields: [
    defineField({ name: "eyebrow",     title: "Eyebrow",            type: "string" }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: "Renders in Barlow Condensed uppercase.",
    }),
    defineField({ name: "description", title: "Description",        type: "text", rows: 3 }),

    defineField({ name: "ctaLabel",    title: "CTA Label",           type: "string" }),
    defineField({
      name: "ctaHref",
      title: "CTA URL",
      type: "url",
      validation: (R) => R.uri({ allowRelative: true }),
    }),

    defineField({
      name: "heroImage",
      title: "Hero Image (large, top-right)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "subImage",
      title: "Sub Image (smaller, bottom-right)",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "badge",
      title: "Badge Value",
      type: "string",
      description: 'Optional gold proof-point — short value like "180+" or "14 clubs". Leave blank to hide the badge.',
    }),
    defineField({
      name: "badgeLabel",
      title: "Badge Label",
      type: "string",
      description: 'Small uppercase line under the badge value, e.g. "College programs".',
    }),
  ],
  preview: {
    select: { title: "headline", eyebrow: "eyebrow", media: "heroImage" },
    prepare(s) {
      return {
        title:    `Hero Bento — ${s.title ?? "Untitled"}`,
        subtitle: s.eyebrow ?? "",
        media:    s.media,
      };
    },
  },
});
