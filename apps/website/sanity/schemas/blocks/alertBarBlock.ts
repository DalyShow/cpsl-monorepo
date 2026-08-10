import { defineField, defineType } from "sanity";

const TONES = [
  { title: "Info (navy)",       value: "info"     },
  { title: "Warning (gold)",    value: "warning"  },
  { title: "Success (green)",   value: "success"  },
  { title: "Danger (red)",      value: "danger"   },
  { title: "Neutral (cream)",   value: "neutral"  },
];

export const alertBarBlock = defineType({
  name: "alertBarBlock",
  title: "Alert Bar",
  type: "object",
  fields: [
    defineField({
      name: "tone",
      title: "Tone",
      type: "string",
      initialValue: "info",
      options: { list: TONES, layout: "radio" },
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: 'Optional short tag rendered in caps at the left (e.g. "Update", "New", "Registration").',
    }),
    defineField({
      name: "text",
      title: "Message",
      type: "string",
      description: "The alert copy. One line reads best.",
      validation: (R) => R.required().min(2),
    }),
    defineField({
      name: "linkLabel",
      title: "Link Label",
      type: "string",
      description: 'Text of the link at the right (e.g. "Register now", "Read more"). Leave blank to render just the message.',
    }),
    defineField({
      name: "linkHref",
      title: "Link URL",
      type: "url",
      description: "External link or relative path (e.g. /apply). Ignored if no link label is set.",
      validation: (R) => R.uri({ allowRelative: true }),
    }),
    defineField({
      name: "linkNewWindow",
      title: "Open link in new window",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { text: "text", label: "label", tone: "tone" },
    prepare({ text, label, tone }) {
      return {
        title:    text || "Alert Bar",
        subtitle: `${label ? `[${label}] ` : ""}${tone ?? "info"}`,
      };
    },
  },
});
