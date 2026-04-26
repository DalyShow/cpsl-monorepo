import { defineField, defineType } from "sanity";

const DEFAULT_ITEMS = [
  {
    _type: "faqItem",
    question: "What is the National 1 League?",
    answer:
      "The National 1 League is the top tier of the US Club Soccer National League program — a coast-to-coast competition designed to deliver the most demanding, college-relevant fixture list outside MLS Next and ECNL. CPSL operates the league for the Carolinas territory.",
  },
  {
    _type: "faqItem",
    question: "How does my club apply for admission?",
    answer:
      "Admission runs through the CPSL application portal. Submit your club's competitive history, coaching credentials, and facility profile via GotSport. The competition committee reviews applications quarterly and notifies clubs within 30 days.",
  },
  {
    _type: "faqItem",
    question: "When does the 2026-2027 season begin?",
    answer:
      "Fall fixtures open the weekend of September 5, 2026 and run through early November. The spring half resumes mid-March 2027 with regional finals in late May and the National Championship the second week of June.",
  },
  {
    _type: "faqItem",
    question: "What age groups are eligible?",
    answer:
      "U13 through U19 boys and girls. Each age group plays a 14-game regular-season schedule plus playoffs. U19 receives a condensed fall-only format to align with college recruiting calendars.",
  },
];

export const faqAccordionBlock = defineType({
  name: "faqAccordionBlock",
  title: "FAQ Accordion",
  type: "object",
  fields: [
    defineField({
      name: "background",
      title: "Background",
      type: "string",
      initialValue: "cream",
      options: {
        list: [
          { title: "Cream (default)",      value: "cream"   },
          { title: "White",                value: "white"   },
          { title: "Surface (light grey)", value: "surface" },
          { title: "Navy (dark)",          value: "navy"    },
          { title: "Gold",                 value: "gold"    },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow Label",
      type: "string",
      initialValue: "Frequently Asked",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      initialValue: "EVERYTHING YOU NEED TO KNOW",
    }),
    defineField({
      name: "intro",
      title: "Intro Paragraph",
      type: "text",
      rows: 2,
      description: "Optional supporting copy below the headline.",
      initialValue:
        "Common questions about the National 1 League — admissions, season format, eligibility, and what to expect from the CPSL competition year.",
    }),
    defineField({
      name: "items",
      title: "Questions",
      type: "array",
      of: [{ type: "faqItem" }],
      validation: (R) => R.min(1),
      initialValue: DEFAULT_ITEMS,
    }),
    defineField({
      name: "allowMultiple",
      title: "Allow Multiple Open",
      type: "boolean",
      description: "When on, multiple questions can stay expanded at once. Default: single-open.",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "headline", bg: "background", count: "items" },
    prepare(s) {
      const itemCount = Array.isArray(s.count) ? s.count.length : 0;
      return {
        title:    `FAQ Accordion — ${s.title ?? "Untitled"}`,
        subtitle: `${s.bg ?? "cream"} · ${itemCount} question${itemCount === 1 ? "" : "s"}`,
      };
    },
  },
});
