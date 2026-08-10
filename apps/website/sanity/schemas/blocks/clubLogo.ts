import { defineField, defineType } from "sanity";

/**
 * A single club crest, tagged with the club's display name.
 *
 * Lives inside `siteSettings.logoTicker.logos[]` (and eventually anywhere
 * else that renders a crest). Attaching a name here is what turns the
 * ticker asset into a real "Club" — the source of truth for the Match
 * Calendar's club dropdown and, later, a proper `club` document type.
 */
export const clubLogo = defineType({
  name: "clubLogo",
  title: "Club",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Club Name",
      type: "string",
      description: "e.g. Charlotte FC, Raleigh Athletic. Used everywhere the crest appears.",
      validation: (R) => R.required().min(2),
    }),
    defineField({
      name: "logo",
      title: "Crest",
      type: "image",
      options: {
        accept: "image/svg+xml,image/png,image/webp,image/jpeg",
      },
      validation: (R) => R.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "logo",
    },
  },
});
