import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Colour-tiered weather guidelines table (Hot / Cold / etc.).
 *
 * Reproduces the "temperature range → CPSL guideline" tables from the
 * Inclement Weather Plan PDF, with per-row tier tints that carry the
 * same visual weight the paper document does.
 */

const TIERS = [
  { title: "Normal (no tint)",       value: "normal"  },
  { title: "Caution (blue)",         value: "caution" },
  { title: "Emphasis (bold, cream)", value: "emphasis"},
  { title: "Warning (yellow)",       value: "warning" },
  { title: "Stop (red)",             value: "stop"    },
] as const;

// ── Rich-text config reused for row.guideline + block.intro + block.footnote ──
const richText = {
  type: "array" as const,
  of: [
    defineArrayMember({
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [{ title: "Bullet", value: "bullet" }],
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
    }),
  ],
};

export const weatherGuidelineRow = defineType({
  name: "weatherGuidelineRow",
  title: "Weather Guideline Row",
  type: "object",
  fields: [
    defineField({
      name: "range",
      title: "Range",
      description: 'e.g. "Below 90°F", "90-94°F", "105°F+".',
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "guideline",
      title: "Guideline",
      description: "The action / rule for this range. Bold, italic and links supported.",
      ...richText,
      validation: (R) => R.required(),
    }),
    defineField({
      name: "tier",
      title: "Row Tier",
      description: "Drives the row's background tint. Use warning / stop to draw attention to danger thresholds.",
      type: "string",
      initialValue: "normal",
      options: { list: [...TIERS], layout: "radio" },
    }),
  ],
  preview: {
    select: { range: "range", tier: "tier" },
    prepare({ range, tier }) {
      return { title: range || "(range)", subtitle: (tier as string) || "normal" };
    },
  },
});

export const weatherGuidelinesBlock = defineType({
  name: "weatherGuidelinesBlock",
  title: "Weather Guidelines",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      description: 'e.g. "Hot Weather Guidelines".',
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      description: 'Small caps label above the title. Optional.',
      type: "string",
    }),
    defineField({
      name: "intro",
      title: "Intro Paragraph",
      description: "Optional — one or two sentences framing the table.",
      ...richText,
    }),
    defineField({
      name: "rangeHeader",
      title: "Range column header",
      type: "string",
      initialValue: "Heat Index / Feels Like",
    }),
    defineField({
      name: "guidelineHeader",
      title: "Guideline column header",
      type: "string",
      initialValue: "CPSL Guideline",
    }),
    defineField({
      name: "rows",
      title: "Rows",
      description: "Add one row per tier. Assign a tier to colour-code danger levels.",
      type: "array",
      of: [{ type: "weatherGuidelineRow" }],
      validation: (R) => R.min(1),
    }),
    defineField({
      name: "footnote",
      title: "Footnote",
      description: "Small print below the table (e.g. hydration break rules, illness signs).",
      ...richText,
    }),
  ],
  preview: {
    select: { title: "title", rows: "rows" },
    prepare({ title, rows }) {
      const count = Array.isArray(rows) ? rows.length : 0;
      return { title: title || "Weather Guidelines", subtitle: `${count} row${count === 1 ? "" : "s"}` };
    },
  },
});
