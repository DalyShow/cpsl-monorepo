import { defineField, defineType } from "sanity";

/**
 * Full-viewport 2/3 + 1/3 showcase. Two panels side-by-side on
 * desktop, stacked on mobile. Each panel has its own media, eyebrow,
 * headline, subhead and CTA. On load the left wipes in then the
 * right follows; below 768 px the content drops below the image.
 */
export const dualPanelBlock = defineType({
  name: "dualPanelBlock",
  title: "Dual Panel",
  type: "object",
  fields: [
    defineField({
      name: "leftPanel",
      title: "Left Panel (2/3 width)",
      type: "dualPanelItem",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "rightPanel",
      title: "Right Panel (1/3 width)",
      type: "dualPanelItem",
      validation: (R) => R.required(),
    }),
  ],
  preview: {
    select: {
      leftTitle: "leftPanel.headline",
      rightTitle: "rightPanel.headline",
      media: "leftPanel.image",
    },
    prepare({ leftTitle, rightTitle, media }) {
      const left = leftTitle || "Left";
      const right = rightTitle || "Right";
      return {
        title: "Dual Panel",
        subtitle: `${left} · ${right}`,
        media,
      };
    },
  },
});
