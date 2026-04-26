import { defineField, defineType } from "sanity";

export const faqAccordionBlock = defineType({
  name: "faqAccordionBlock",
  title: "FAQ Accordion",
  type: "object",
  fields: [
    defineField({
      name: "background",
      title: "Background",
      type: "string",
      initialValue: "cream",
      options: {
        list: [
          { title: "Cream (default)",      value: "cream"   },
          { title: "White",                value: "white"   },
          { title: "Surface (light grey)", value: "surface" },
          { title: "Navy (dark)",          value: "navy"    },
          { title: "Gold",                 value: "gold"    },
        ],
        layout: "radio",
      },
    }),
    defineField({ name: "eyebrow",  title: "Eyebrow Label", type: "string" }),
    defineField({ name: "headline", title: "Headline",       type: "string" }),
    defineField({
      name: "intro",
      title: "Intro Paragraph",
      type: "text",
      rows: 2,
      description: "Optional supporting copy below the headline.",
    }),
    defineField({
      name: "items",
      title: "Questions",
      type: "array",
      of: [{ type: "faqItem" }],
      validation: (R) => R.min(1),
    }),
    defineField({
      name: "allowMultiple",
      title: "Allow Multiple Open",
      type: "boolean",
      description: "When on, multiple questions can stay expanded at once. Default: single-open.",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "headline", bg: "background", count: "items" },
    prepare(s) {
      const itemCount = Array.isArray(s.count) ? s.count.length : 0;
      return {
        title:    `FAQ Accordion — ${s.title ?? "Untitled"}`,
        subtitle: `${s.bg ?? "cream"} · ${itemCount} question${itemCount === 1 ? "" : "s"}`,
      };
    },
  },
});
