import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Colour-tiered penalty / discipline matrix.
 *
 * Generalises the weather-guidelines table to 2–4 columns so it can
 * reproduce the printed Penalties Matrix (offense → min games → time,
 * severity-tinted rows) and the US Club Soccer Discipline Matrix
 * (offense → player / coach / spectator minimums).
 */

const TIERS = [
  { title: "Normal (striped, no tint)", value: "normal"   },
  { title: "Warning (yellow)",          value: "warning"  },
  { title: "High (orange)",             value: "high"     },
  { title: "Severe (red)",              value: "severe"   },
  { title: "Critical (dark red)",       value: "critical" },
] as const;

// ── Rich-text config for block.intro + block.footnote ───────────────────────
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

export const penaltyMatrixRow = defineType({
  name: "penaltyMatrixRow",
  title: "Penalty Matrix Row",
  type: "object",
  fields: [
    defineField({
      name: "offense",
      title: "Offense",
      description: 'First-column label, e.g. "Physical Assault (Major)".',
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "detail",
      title: "Offense detail",
      description: "Optional description rendered under the offense label.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "cells",
      title: "Cells",
      description:
        "One entry per data column, in header order. Line breaks inside a cell render as stacked lines — the first line is emphasised.",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      validation: (R) => R.min(1).max(3),
    }),
    defineField({
      name: "tier",
      title: "Row Tier",
      description: "Tints the offense cell by severity. Normal rows stripe automatically.",
      type: "string",
      initialValue: "normal",
      options: { list: [...TIERS], layout: "radio" },
    }),
  ],
  preview: {
    select: { offense: "offense", tier: "tier" },
    prepare({ offense, tier }) {
      return { title: offense || "(offense)", subtitle: (tier as string) || "normal" };
    },
  },
});

export const penaltyMatrixBlock = defineType({
  name: "penaltyMatrixBlock",
  title: "Penalty Matrix",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      description: 'e.g. "Non-Physical Offenses".',
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      description: "Small caps label above the title. Optional.",
      type: "string",
    }),
    defineField({
      name: "intro",
      title: "Intro Paragraph",
      description: "Optional — one or two sentences framing the table.",
      ...richText,
    }),
    defineField({
      name: "offenseHeader",
      title: "Offense column header",
      type: "string",
      initialValue: "Offense",
    }),
    defineField({
      name: "columns",
      title: "Data column headers",
      description: 'The columns after Offense, e.g. "Min. Games", "Time".',
      type: "array",
      of: [{ type: "string" }],
      validation: (R) => R.min(1).max(3),
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [{ type: "penaltyMatrixRow" }],
      validation: (R) => R.min(1),
    }),
    defineField({
      name: "footnote",
      title: "Footnote",
      description: "Small print below the table (e.g. disclaimers).",
      ...richText,
    }),
  ],
  preview: {
    select: { title: "title", rows: "rows" },
    prepare({ title, rows }) {
      const count = Array.isArray(rows) ? rows.length : 0;
      return { title: title || "Penalty Matrix", subtitle: `${count} row${count === 1 ? "" : "s"}` };
    },
  },
});
