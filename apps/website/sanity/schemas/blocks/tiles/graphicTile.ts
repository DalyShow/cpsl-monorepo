import { defineField, defineType } from "sanity";
import { tileBaseFields } from "./_tileBase";

export const graphicTile = defineType({
  name: "graphicTile",
  title: "Graphic Tile",
  type: "object",
  fields: [
    defineField({
      name: "tone",
      title: "Tone",
      type: "string",
      initialValue: "navy",
      options: {
        list: [
          { title: "Navy",    value: "navy"    },
          { title: "Crimson", value: "crimson" },
          { title: "Gold",    value: "gold"    },
        ],
        layout: "radio",
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "pattern",
      title: "Background Pattern",
      type: "string",
      initialValue: "hex",
      options: {
        list: [
          { title: "Soccer field (centre circle + halfway line)", value: "hex"     },
          { title: "Mowed stripes",                               value: "stripes" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "stat",
      title: "Stat (big number)",
      type: "string",
      description: "e.g. '24' or '84%'. Rendered at hero scale.",
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "Short uppercase caption beneath the stat.",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image (optional)",
      type: "image",
      options: { hotspot: true },
      description:
        "Adds a photo behind the pattern. Tone colour becomes a scrim so the pattern + stat stay visible.",
    }),
    defineField({
      name: "backgroundVideo",
      title: "Background Video (optional)",
      type: "file",
      options: { accept: "video/mp4,video/webm,video/quicktime" },
      description:
        "Adds a looping video behind the pattern. MP4 or WebM, muted + autoplay.",
    }),
    defineField({
      name: "mediaOverlay",
      title: "Media Overlay Opacity",
      type: "number",
      description:
        "Alpha of the tone scrim over media. Default 0.70.",
      initialValue: 0.70,
      validation: (R) => R.min(0).max(1),
    }),
    ...tileBaseFields,
  ],
  preview: {
    select: { stat: "stat", label: "label", tone: "tone" },
    prepare({ stat, label, tone }) {
      return {
        title: stat ? `${stat} ${label ?? ""}` : label || "Graphic Tile",
        subtitle: `${tone} graphic`,
      };
    },
  },
});
