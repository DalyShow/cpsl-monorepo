import { defineField, defineType } from "sanity";
import { tileBaseFields } from "./_tileBase";

export const photoTile = defineType({
  name: "photoTile",
  title: "Photo Tile",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Short uppercase label above the title.",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "Optional. Relative (e.g. /news) or absolute URL.",
    }),
    defineField({
      name: "scrim",
      title: "Scrim Darkness",
      type: "number",
      description:
        "0 = no scrim, 1 = fully dark. Raises legibility of the title on busy photos. Default 0.55.",
      initialValue: 0.55,
      validation: (R) => R.min(0).max(1),
    }),
    ...tileBaseFields,
  ],
  preview: {
    select: { title: "title", media: "image", subtitle: "eyebrow" },
    prepare({ title, media, subtitle }) {
      return {
        title: title || "Photo Tile",
        subtitle: subtitle || "Photo",
        media,
      };
    },
  },
});
