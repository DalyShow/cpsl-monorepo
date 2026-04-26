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
      description:
        "Add a Simple Link for items that go straight to a page, or a Flyout Menu for items that open a dropdown panel with icons and descriptions.",
      type: "array",
      of: [
        { type: "topNavLink" },
        { type: "topNavFlyout" },
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

    defineField({
      name: "logoTicker",
      title: "Logo Ticker",
      type: "object",
      description:
        "Site-wide logo ticker — appears wherever a Logo Ticker block is added to a page. Configure once here.",
      fields: [
        defineField({
          name: "logos",
          title: "Logos",
          type: "array",
          description:
            "Drag and drop multiple files at once to bulk-upload. For accessibility, set the asset's alt text from the image details panel after upload.",
          of: [
            {
              type: "image",
              options: {
                accept: "image/svg+xml,image/png,image/webp,image/jpeg",
              },
            },
          ],
        }),
        defineField({
          name: "durationSeconds",
          title: "Loop Duration (seconds)",
          type: "number",
          initialValue: 80,
          description: "Full loop time. Lower is faster.",
          validation: (R) => R.positive(),
        }),
        defineField({
          name: "reverse",
          title: "Reverse Direction",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "pauseOnHover",
          title: "Pause on Hover",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "edgeFade",
          title: "Soft Edge Fade",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "sectionBackground",
          title: "Section Background",
          type: "string",
          description:
            "Hex value or CSS color name. Leave blank to inherit the page background.",
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "siteName" },
  },
});
