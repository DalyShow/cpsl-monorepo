import { defineField, defineType } from "sanity";

export const topNavLink = defineType({
  name: "topNavLink",
  title: "Simple Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "Relative (e.g. /league-info) or absolute URL.",
      validation: (R) => R.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
    prepare({ title, subtitle }) {
      return { title: title || "Untitled link", subtitle };
    },
  },
});
