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
      initialValue: {
        eyebrow:     "A new era",
        headline:    "League operator for the new National 1 League",
        subheadline: "Now accepting applications for the 2026 – 2027 season.",
        ctaLabel:    "Apply for admission",
        ctaHref:     "/apply",
      },
    }),
    defineField({
      name: "rightPanel",
      title: "Right Panel (1/3 width)",
      type: "dualPanelItem",
      validation: (R) => R.required(),
      initialValue: {
        eyebrow:     "Know before we go",
        headline:    "The new National 1 League explained",
        subheadline: "Get to know the new league and what it means for the future of our sport.",
        ctaLabel:    "Learn more",
        ctaHref:     "/league-information",
      },
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
