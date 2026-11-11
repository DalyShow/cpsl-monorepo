import { defineField, defineType } from "sanity";

const DEFAULT_FIELDS = [
  { _type: "formField", _key: "name",    label: "Name",    type: "text",     required: true,  width: "half" },
  { _type: "formField", _key: "email",   label: "Email",   type: "email",    required: true,  width: "half" },
  { _type: "formField", _key: "message", label: "Message", type: "textarea", required: true },
];

export const formBlock = defineType({
  name: "formBlock",
  title: "Form",
  type: "object",
  groups: [
    { name: "content",  title: "Content", default: true },
    { name: "fields",   title: "Fields" },
    { name: "delivery", title: "Delivery" },
  ],
  fields: [
    defineField({
      name: "background",
      title: "Background",
      type: "string",
      group: "content",
      initialValue: "cream",
      options: {
        list: [
          { title: "Cream (default)",      value: "cream"   },
          { title: "White",                value: "white"   },
          { title: "Surface (light grey)", value: "surface" },
          { title: "Navy (dark)",          value: "navy"    },
          { title: "Gold",                 value: "gold"    },
          { title: "None (site background)", value: "none"  },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "fillScreen",
      title: "Fill screen & centre vertically",
      type: "boolean",
      group: "content",
      initialValue: false,
      description: "Makes the section at least the height of the screen (below the nav and logo ticker) and centres the form in it. Best when the form is the only thing on the page.",
    }),
    defineField({ name: "eyebrow",  title: "Eyebrow Label", type: "string", group: "content", initialValue: "Get in touch" }),
    defineField({ name: "headline", title: "Headline",      type: "string", group: "content", initialValue: "CONTACT THE LEAGUE" }),
    defineField({
      name: "intro",
      title: "Intro Paragraph",
      type: "text",
      rows: 2,
      group: "content",
      description: "Optional supporting copy below the headline.",
    }),
    defineField({
      name: "submitLabel",
      title: "Submit Button Label",
      type: "string",
      group: "content",
      initialValue: "Send message",
    }),
    defineField({
      name: "successTitle",
      title: "Success Title",
      type: "string",
      group: "content",
      initialValue: "Message sent",
      description: "Replaces the form once it has been sent.",
    }),
    defineField({
      name: "successMessage",
      title: "Success Message",
      type: "text",
      rows: 2,
      group: "content",
      initialValue: "Thanks — we've got it and will be in touch soon.",
    }),
    defineField({
      name: "fields",
      title: "Fields",
      type: "array",
      group: "fields",
      of: [{ type: "formField" }],
      initialValue: DEFAULT_FIELDS,
      validation: (R) => R.required().min(1).max(25),
    }),
    defineField({
      name: "recipients",
      title: "Send Submissions To",
      type: "array",
      group: "delivery",
      of: [{ type: "string", validation: (R) => R.email() }],
      description: "Email addresses that receive each submission. The first Email field the visitor fills in is set as Reply-To, so you can hit Reply to answer them.",
      validation: (R) => R.required().min(1).max(5),
    }),
    defineField({
      name: "subject",
      title: "Email Subject",
      type: "string",
      group: "delivery",
      initialValue: "New website enquiry",
      validation: (R) => R.max(150),
    }),
  ],
  preview: {
    select: { title: "headline", fields: "fields", to: "recipients" },
    prepare(s) {
      const n  = Array.isArray(s.fields) ? s.fields.length : 0;
      const to = Array.isArray(s.to) && s.to.length ? s.to.join(", ") : "no recipient set";
      return {
        title:    `Form — ${s.title ?? "Untitled"}`,
        subtitle: `${n} field${n === 1 ? "" : "s"} → ${to}`,
      };
    },
  },
});
