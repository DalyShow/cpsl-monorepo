import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "sections",
      title: "Page Sections",
      description: "Add, remove, and reorder sections to build the page. Each section maps to a design system component.",
      type: "array",
      of: [
        { type: "heroBlock" },
        { type: "contentSectionBlock" },
        { type: "ctaBannerBlock" },
        { type: "clubDirectoryBlock" },
        { type: "calendarDayViewBlock" },
        { type: "logoTickerBlock" },
        { type: "subNavBlock" },
      ],
    }),
  ],
  preview: {
    prepare() { return { title: "Home Page" }; },
  },
});
