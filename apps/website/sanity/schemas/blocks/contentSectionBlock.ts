import { defineField, defineType } from "sanity";

export const contentSectionBlock = defineType({
  name: "contentSectionBlock",
  title: "Content Section",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow Label",  type: "string", initialValue: "About the league" }),
    defineField({ name: "heading", title: "Heading",        type: "string", initialValue: "A new era for youth soccer in the Carolinas" }),
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
    defineField({
      name: "lead",
      title: "Lead Paragraph",
      description:
        "Rich text — use the toolbar for bold, italic, and links. Keep it short (2–3 sentences).",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [
              { title: "Bold",      value: "strong" },
              { title: "Italic",    value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (R) =>
                      R.uri({
                        scheme: ["http", "https", "mailto", "tel"],
                        allowRelative: true,
                      }),
                  }),
                  defineField({
                    name: "newWindow",
                    title: "Open in new tab",
                    type: "boolean",
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "paragraphs",
      title: "Body",
      description:
        "Rich text body — bold, italic, underline, bullet/numbered lists, and links. Split across two columns automatically when the Body Columns option is set to 2.",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal",     value: "normal" },
            { title: "Subheading", value: "h4" },
          ],
          lists: [
            { title: "Bullet",   value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold",      value: "strong" },
              { title: "Italic",    value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (R) =>
                      R.uri({
                        scheme: ["http", "https", "mailto", "tel"],
                        allowRelative: true,
                      }),
                  }),
                  defineField({
                    name: "newWindow",
                    title: "Open in new tab",
                    type: "boolean",
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        },
      ],
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
