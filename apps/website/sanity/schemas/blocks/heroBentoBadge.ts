import { defineField, defineType } from "sanity";

export const heroBentoBadge = defineType({
  name: "heroBentoBadge",
  title: "Hero Badge",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: 'Number or short string, e.g. "180+" or "14".',
      validation: (R) => R.required().max(20),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: 'Small uppercase line beneath the value, e.g. "College programs".',
      validation: (R) => R.max(40),
    }),
  ],
  preview: {
    select: { title: "value", subtitle: "label" },
  },
});
