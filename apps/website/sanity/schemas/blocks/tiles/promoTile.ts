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
