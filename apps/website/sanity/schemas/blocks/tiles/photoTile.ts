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
      description:
        "Used as the tile background — and as the poster for the looping video while it loads. Optional; without it the tile renders a navy placeholder so layout isn't broken before you upload.",
    }),
    defineField({
      name: "video",
      title: "Background Video",
      type: "file",
      options: { accept: "video/mp4,video/webm,video/quicktime" },
      description:
        "Optional. MP4 or WebM. Plays muted, looped, autoplay, inline. Keep it under ~8 MB — iOS Safari gets picky above that.",
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
