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
      description: "Sits 32px below the headline.",
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
      title: "Hero Image (right column)",
      type: "image",
      options: { hotspot: true },
      description:
        "The large photo on the right. When no Sub Image is set, this spans the full right column.",
    }),
    defineField({
      name: "subImage",
      title: "Sub Image (optional)",
      type: "image",
      options: { hotspot: true },
      description:
        "Optional second photo stacked below the hero. Leave blank to render a single full-height hero image.",
    }),

    defineField({
      name: "badges",
      title: "Badges",
      type: "array",
      description:
        "Up to 3 gold proof-point badges anchored top-right of the hero photo. On mobile they reflow into a full-width grid strip across the bottom of the photo.",
      of: [{ type: "heroBentoBadge" }],
      validation: (R) => R.max(3),
      initialValue: [
        { _type: "heroBentoBadge", value: "180+", label: "College programs" },
      ],
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
