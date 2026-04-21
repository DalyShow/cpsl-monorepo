import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      initialValue: "CPSL — Carolina Premier Soccer League",
    }),
    defineField({
      name: "siteDescription",
      title: "Meta Description",
      type: "text",
      rows: 2,
      initialValue:
        "The premier soccer league spanning North and South Carolina. Live scores, standings, match schedules, and team profiles.",
    }),
    defineField({
      name: "navItems",
      title: "Navigation Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Link", type: "string" }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    }),
    defineField({
      name: "ogImage",
      title: "Social / OG Image",
      description: "Shown when the site is shared on social media (Twitter, iMessage, etc.). Recommended size: 1200 × 630 px.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "string",
      initialValue: "Join Our League",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Button Link",
      type: "string",
      initialValue: "#contact",
    }),
  ],
  preview: {
    select: { title: "siteName" },
  },
});
