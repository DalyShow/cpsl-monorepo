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
    defineField({
      name: "tone",
      title: "Background",
      type: "string",
      initialValue: "gold",
      options: {
        list: [
          { title: "Gold (default)",     value: "gold"  },
          { title: "Navy",               value: "navy"  },
          { title: "Cream",              value: "cream" },
          { title: "None (transparent)", value: "none"  },
        ],
        layout: "radio",
      },
    }),
  ],
  preview: {
    select: { title: "value", subtitle: "label", tone: "tone" },
    prepare({ title, subtitle, tone }) {
      const toneLabel = tone && tone !== "gold" ? ` · ${tone}` : "";
      return {
        title: title ?? "—",
        subtitle: (subtitle ?? "") + toneLabel,
      };
    },
  },
});
