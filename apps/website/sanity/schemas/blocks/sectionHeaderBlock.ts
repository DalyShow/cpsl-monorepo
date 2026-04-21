import { defineField, defineType } from "sanity";

export const sectionHeaderBlock = defineType({
  name: "sectionHeaderBlock",
  title: "Hero-slim",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (R) => R.required(),
      description: "The large headline — e.g. 'Standings'",
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      description: "Optional inline label shown in gold next to the title — e.g. '2024–25 Season'",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "Optional muted description shown below the title",
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Dark (Navy)", value: "dark" },
          { title: "Light (Cream)", value: "light" },
        ],
        layout: "radio",
      },
      initialValue: "dark",
    }),
  ],
  preview: {
    select: { title: "title", badge: "badge", variant: "variant" },
    prepare({ title, badge, variant }) {
      const label = badge ? `${title} — ${badge}` : title;
      return {
        title: `Hero-slim — ${label ?? "Untitled"}`,
        subtitle: variant === "light" ? "Light / Cream" : "Dark / Navy",
      };
    },
  },
});
