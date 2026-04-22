import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
      description: "The URL segment for this page (auto-generated from title).",
    }),
    defineField({
      name: "parent",
      title: "Parent Page",
      type: "reference",
      to: [{ type: "page" }],
      description:
        "Optional. Set a parent to nest this page in the hierarchy — e.g. a parent of 'League Information' makes this page live at /league-information/this-page.",
    }),
    defineField({
      name: "navOrder",
      title: "Sub-nav Order",
      type: "number",
      description:
        "Controls where this page appears in the auto-generated sub navigation relative to its siblings. Lower numbers come first. Leave blank to fall back to alphabetical.",
    }),
    defineField({
      name: "navLabel",
      title: "Sub-nav Label",
      type: "string",
      description:
        "Optional short label shown in the sub navigation. Falls back to the page title when blank.",
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        { type: "heroBlock" },
        { type: "sectionHeaderBlock" },
        { type: "contentSectionBlock" },
        { type: "ctaBannerBlock" },
        { type: "clubDirectoryBlock" },
        { type: "calendarDayViewBlock" },
        { type: "standingsBlock" },
        { type: "matchdayBlock" },
        { type: "logoTickerBlock" },
        { type: "subNavBlock" },
        { type: "promoGridBlock" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      parentSlug: "parent.slug.current",
      slug: "slug.current",
    },
    prepare({ title, parentSlug, slug }) {
      const path = parentSlug ? `/${parentSlug}/${slug}` : `/${slug}`;
      return { title, subtitle: path };
    },
  },
});
