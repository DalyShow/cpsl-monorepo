import { defineField, defineType } from "sanity";
import { tileBaseFields } from "./_tileBase";

export const promoTile = defineType({
  name: "promoTile",
  title: "Promo Tile",
  type: "object",
  fields: [
    defineField({
      name: "tone",
      title: "Tone",
      type: "string",
      initialValue: "gold",
      options: {
        list: [
          { title: "Gold (navy text)",      value: "gold"    },
          { title: "Crimson (cream text)",  value: "crimson" },
          { title: "Cream (navy text)",     value: "cream"   },
        ],
        layout: "radio",
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
      description: "Optional supporting copy beneath the title.",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Link",
      type: "string",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image (optional)",
      type: "image",
      options: { hotspot: true },
      description:
        "Adds a photo behind the tile. The tone colour becomes a translucent scrim over it so the text stays legible.",
    }),
    defineField({
      name: "backgroundVideo",
      title: "Background Video (optional)",
      type: "file",
      options: { accept: "video/mp4,video/webm,video/quicktime" },
      description:
        "Adds a looping video behind the tile. MP4 or WebM, muted + autoplay. If you also add a background image, the video uses it as its poster.",
    }),
    defineField({
      name: "mediaOverlay",
      title: "Media Overlay Opacity",
      type: "number",
      description:
        "Alpha of the tone colour over media. 0 = media full-strength, 1 = tone fully opaque. Default 0.75.",
      initialValue: 0.75,
      validation: (R) => R.min(0).max(1),
    }),
    ...tileBaseFields,
  ],
  preview: {
    select: { title: "title", tone: "tone", eyebrow: "eyebrow" },
    prepare({ title, tone, eyebrow }) {
      const toneLabel =
        tone === "gold" ? "Gold" : tone === "crimson" ? "Crimson" : "Cream";
      return {
        title: title || "Promo Tile",
        subtitle: `${toneLabel} · ${eyebrow ?? "promo"}`,
      };
    },
  },
});
