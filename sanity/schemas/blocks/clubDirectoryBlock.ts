import { defineField, defineType } from "sanity";

export const clubDirectoryBlock = defineType({
  name: "clubDirectoryBlock",
  title: "Club Directory",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Section Heading",
      type: "string",
      initialValue: "CLUB DIRECTORY",
      description: "Override the default heading. Leave blank to use the default.",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "string",
      initialValue: "All member clubs of the Carolina Premier Soccer League across North and South Carolina.",
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare(s) { return { title: `Club Directory — ${s.title ?? "All Clubs"}` }; },
  },
});
