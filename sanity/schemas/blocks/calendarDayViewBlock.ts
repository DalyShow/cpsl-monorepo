import { defineField, defineType } from "sanity";

export const calendarDayViewBlock = defineType({
  name: "calendarDayViewBlock",
  title: "Calendar — Day View",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Section Heading",
      type: "string",
      initialValue: "MATCH SCHEDULE",
    }),
    defineField({
      name: "monthLabel",
      title: "Month Label",
      type: "string",
      initialValue: "MARCH 2026",
      description: "Display label shown above the calendar (e.g. MARCH 2026).",
    }),
  ],
  preview: {
    select: { title: "monthLabel" },
    prepare(s) { return { title: `Calendar — ${s.title ?? "Day View"}` }; },
  },
});
