import { defineField, defineType } from "sanity";

export const matchdayBlock = defineType({
  name: "matchdayBlock",
  title: "Matchday",
  type: "object",
  fields: [
    defineField({
      name: "seasonLabel",
      title: "Season Label",
      type: "string",
      description: "Optional footer label — e.g. '2026–2027 SEASON · MATCHDAY 18'",
    }),
  ],
  preview: {
    select: { label: "seasonLabel" },
    prepare({ label }) {
      return {
        title: "Matchday",
        subtitle: label ?? "Conference schedule with dropdown filter",
      };
    },
  },
});
