import { defineField, defineType } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "object",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (R) => R.required().max(160),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      validation: (R) => R.required(),
    }),
  ],
  preview: {
    select: { title: "question", subtitle: "answer" },
    prepare({ title, subtitle }) {
      return {
        title:    title    ?? "Untitled question",
        subtitle: subtitle ? subtitle.slice(0, 80) : "",
      };
    },
  },
});
