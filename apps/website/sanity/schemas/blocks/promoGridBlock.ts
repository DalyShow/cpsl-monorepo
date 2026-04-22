import { defineField, defineType } from "sanity";

export const promoGridBlock = defineType({
  name: "promoGridBlock",
  title: "Promo Grid",
  type: "object",
  fields: [
    defineField({
      name: "cols",
      title: "Grid Columns",
      type: "number",
      description:
        "Number of columns in the grid (desktop). 12 is the default editorial rhythm.",
      initialValue: 12,
      validation: (R) => R.min(2).max(24).integer(),
    }),
    defineField({
      name: "gap",
      title: "Gap (px)",
      type: "number",
      description: "Spacing between tiles in pixels.",
      initialValue: 16,
      validation: (R) => R.min(0).max(64).integer(),
    }),
    defineField({
      name: "fullBleed",
      title: "Full-bleed (edge-to-edge)",
      type: "boolean",
      description:
        "When on, the grid spans the viewport edge-to-edge and tiles lose their rounded corners.",
      initialValue: true,
    }),
    defineField({
      name: "tiles",
      title: "Tiles",
      type: "array",
      description:
        "Add Photo Tiles, Promo Tiles, or Graphic Tiles. Drag to reorder — tiles fill the grid left-to-right, top-to-bottom based on their column and row spans.",
      of: [
        { type: "photoTile"   },
        { type: "promoTile"   },
        { type: "graphicTile" },
      ],
      validation: (R) => R.min(1),
    }),
  ],
  preview: {
    select: { tiles: "tiles", cols: "cols", fullBleed: "fullBleed" },
    prepare({ tiles, cols, fullBleed }: { tiles?: unknown[]; cols?: number; fullBleed?: boolean }) {
      const count = Array.isArray(tiles) ? tiles.length : 0;
      return {
        title: "Promo Grid",
        subtitle: `${count} tile${count === 1 ? "" : "s"} · ${cols ?? 12} col${fullBleed ? " · full-bleed" : ""}`,
      };
    },
  },
});
