import { defineField, defineType } from "sanity";

export const heroBentoBlock = defineType({
  name: "heroBentoBlock",
  title: "Hero — Bento",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "2026–2027 SEASON",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: "Renders in Barlow Condensed uppercase.",
      initialValue: "WHERE COLLEGE COACHES SCOUT NEXT.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      initialValue:
        "Three showcases per year. NCSA-published feeds for every fixture. 180+ college programs in attendance last cycle.",
    }),

    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
      initialValue: "View showcases",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA URL",
      type: "url",
      validation: (R) => R.uri({ allowRelative: true }),
      initialValue: "/showcases",
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
      initialValue: "180+",
    }),
    defineField({
      name: "badgeLabel",
      title: "Badge Label",
      type: "string",
      description: 'Small uppercase line under the badge value, e.g. "College programs".',
      initialValue: "College programs",
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
