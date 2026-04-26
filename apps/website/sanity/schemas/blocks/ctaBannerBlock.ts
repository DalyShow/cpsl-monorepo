import { defineField, defineType } from "sanity";

export const ctaBannerBlock = defineType({
  name: "ctaBannerBlock",
  title: "CTA Banner",
  type: "object",
  fields: [
    defineField({
      name: "background",
      title: "Background",
      type: "string",
      initialValue: "cream",
      options: {
        list: [
          { title: "Cream (default)",    value: "cream"   },
          { title: "White",              value: "white"   },
          { title: "Surface (light grey)", value: "surface" },
          { title: "Navy (dark)",        value: "navy"    },
          { title: "Gold",               value: "gold"    },
        ],
        layout: "radio",
      },
    }),
    defineField({ name: "eyebrow",        title: "Eyebrow Label",       type: "string",
      initialValue: "2026 Season" }),
    defineField({ name: "headline",       title: "Headline",             type: "string",
      initialValue: "JOIN THE LEAGUE" }),
    defineField({ name: "headlineAccent", title: "Headline Accent Line", type: "string",
      description: "Renders in gold beneath the main headline line.",
      initialValue: "BEFORE APPLICATIONS CLOSE" }),
    defineField({ name: "description",    title: "Description",          type: "text", rows: 2,
      initialValue: "Applications for the 2026 CPSL Premiership and Development League are now open. Secure your spot before the deadline closes." }),

    defineField({ name: "primaryCtaLabel", title: "Primary Button Label", type: "string",
      initialValue: "Apply Now" }),
    defineField({ name: "primaryCtaHref",  title: "Primary Button URL",   type: "url",
      validation: (R) => R.uri({ allowRelative: true }),
      initialValue: "/apply" }),

    defineField({
      name: "showSecondaryButton",
      title: "Show Secondary Button",
      type: "boolean",
      description: "Toggle to add a second (outlined) button alongside the primary CTA.",
      initialValue: false,
    }),
    defineField({ name: "secondaryCtaLabel", title: "Secondary Button Label", type: "string",
      hidden: ({ parent }) => !parent?.showSecondaryButton }),
    defineField({ name: "secondaryCtaHref",  title: "Secondary Button URL",   type: "url",
      validation: (R) => R.uri({ allowRelative: true }),
      hidden: ({ parent }) => !parent?.showSecondaryButton }),
  ],
  preview: {
    select: { title: "headline", accent: "headlineAccent", bg: "background" },
    prepare(s) {
      return { title: `CTA Banner — ${s.title ?? "Untitled"}`, subtitle: `${s.bg ?? "cream"} · ${s.accent ?? ""}` };
    },
  },
});
