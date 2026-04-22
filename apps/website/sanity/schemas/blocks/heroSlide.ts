import { defineField, defineType } from "sanity";

/**
 * One slide inside a promoHeroBlock's slideshow. Either an image,
 * a video, or both (image acts as the video's poster while it loads).
 */
export const heroSlide = defineType({
  name: "heroSlide",
  title: "Hero Slide",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description: "Slide background. Also used as the poster for the video while it loads.",
    }),
    defineField({
      name: "video",
      title: "Video (optional)",
      type: "file",
      options: { accept: "video/mp4,video/webm,video/quicktime" },
      description: "Looping muted video. MP4/WebM, keep under ~8 MB for iOS.",
    }),
  ],
  preview: {
    select: { media: "image" },
    prepare({ media }) {
      return { title: "Slide", media };
    },
  },
});
