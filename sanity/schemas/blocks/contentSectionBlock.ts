import { defineField, defineType } from "sanity";

export const contentSectionBlock = defineType({
  name: "contentSectionBlock",
  title: "Content Section",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow Label",  type: "string" }),
    defineField({ name: "heading", title: "Heading",        type: "string" }),
    defineField({
      name: "image",
      title: "Image (below heading)",
      description: "Optional. Displays full-width between the heading and lead paragraph.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),
    defineField({ name: "lead",    title: "Lead Paragraph", type: "text", rows: 3 }),
    defineField({
      name: "paragraphs",
      title: "Body Paragraphs",
      description: "Each paragraph is a separate block of text.",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "background",
      title: "Background",
      type: "string",
      options: {
        list: [
          { title: "Cream (default)", value: "cream" },
          { title: "White",           value: "white" },
          { title: "Surface (light grey)", value: "surface" },
          { title: "Navy",            value: "navy" },
          { title: "Gold",            value: "gold" },
        ],
        layout: "radio",
      },
      initialValue: "cream",
    }),
    defineField({
      name: "columns",
      title: "Body Columns",
      type: "number",
      options: {
        list: [
          { title: "1 column — editorial, short copy", value: 1 },
          { title: "2 columns — default, longer copy", value: 2 },
        ],
        layout: "radio",
      },
      initialValue: 2,
    }),
    defineField({
      name: "lottie",
      title: "Lottie Animation (below heading)",
      description: "Optional. Upload a .lottie or .json file. Sits in the same slot as the image — between heading and lead. Takes precedence over image if both are set.",
      type: "file",
      options: { accept: ".lottie,.json,application/json" },
      fields: [
        defineField({ name: "loop",     title: "Loop",     type: "boolean", initialValue: true }),
        defineField({ name: "autoplay", title: "Autoplay", type: "boolean", initialValue: true }),
      ],
    }),
    defineField({
      name: "bottomImage",
      title: "Bottom Image",
      description: "Optional. Displays below all content with 120px of spacing.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),
    defineField({
      name: "bottomLottie",
      title: "Bottom Lottie Animation",
      description: "Optional. Upload a .lottie or .json file. Displays at the bottom of the section with 120px of spacing. Takes precedence over bottom image if both are set.",
      type: "file",
      options: { accept: ".lottie,.json,application/json" },
      fields: [
        defineField({ name: "loop",     title: "Loop",     type: "boolean", initialValue: true }),
        defineField({ name: "autoplay", title: "Autoplay", type: "boolean", initialValue: true }),
      ],
    }),
  ],
  preview: {
    select: { title: "heading", bg: "background" },
    prepare(s) {
      return { title: `Content Section — ${s.title ?? "Untitled"}`, subtitle: s.bg ?? "cream" };
    },
  },
});
