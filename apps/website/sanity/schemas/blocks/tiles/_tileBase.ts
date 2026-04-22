import { defineField, type FieldDefinition } from "sanity";

/**
 * Shared grid + reveal fields for every tile type in a promoGridBlock.
 * Imported by photoTile / promoTile / graphicTile so the editor UX is
 * consistent across them.
 */
export const tileBaseFields: FieldDefinition[] = [
  defineField({
    name: "colSpan",
    title: "Column Span",
    type: "number",
    description: "How many columns the tile occupies (1–12).",
    initialValue: 4,
    validation: (R) => R.min(1).max(12).integer(),
  }),
  defineField({
    name: "rowSpan",
    title: "Row Span",
    type: "number",
    description: "How many rows the tile occupies (usually 1–3).",
    initialValue: 1,
    validation: (R) => R.min(1).max(6).integer(),
  }),
  defineField({
    name: "minHeight",
    title: "Minimum Height (px)",
    type: "number",
    description: "Keeps short tiles tall enough. Leave blank for default.",
  }),
  defineField({
    name: "reveal",
    title: "Reveal Animation",
    type: "string",
    initialValue: "stripe",
    options: {
      list: [
        { title: "Base fade",        value: "base"   },
        { title: "Hex iris",         value: "hex"    },
        { title: "Field stripe",     value: "stripe" },
        { title: "Goal iris",        value: "goal"   },
        { title: "Silk curtain",     value: "silk"   },
      ],
      layout: "radio",
    },
  }),
  defineField({
    name: "loadOnMount",
    title: "Animate on page load",
    type: "boolean",
    description:
      "Turn on for above-the-fold tiles so the reveal plays on load instead of waiting for the visitor to scroll.",
    initialValue: false,
  }),
  defineField({
    name: "delay",
    title: "Stagger Delay (ms)",
    type: "number",
    description:
      "Optional millisecond delay before the reveal starts. Useful for cascading a row of tiles.",
    initialValue: 0,
    validation: (R) => R.min(0).max(5000).integer(),
  }),
];
