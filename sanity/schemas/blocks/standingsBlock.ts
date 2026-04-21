import { defineField, defineType } from "sanity";

export const standingsBlock = defineType({
  name: "standingsBlock",
  title: "Standings",
  type: "object",
  fields: [
    defineField({
      name: "seasonLabel",
      title: "Season Label",
      type: "string",
      description: "Optional label shown in the footer — e.g. '2024–25 Season · Updated weekly'",
    }),
  ],
  preview: {
    select: { label: "seasonLabel" },
    prepare({ label }) {
      return {
        title: "Standings",
        subtitle: label ?? "All 8 conferences",
      };
    },
  },
});
