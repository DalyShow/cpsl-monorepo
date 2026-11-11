import { defineField, defineType } from "sanity";

const TYPE_TITLES: Record<string, string> = {
  text:     "Short text",
  email:    "Email",
  tel:      "Phone",
  textarea: "Long text",
  select:   "Dropdown",
  checkbox: "Checkbox",
};

export const formField = defineType({
  name: "formField",
  title: "Form Field",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "Shown above the field and used as the row label in the email you receive.",
      validation: (R) => R.required().max(120),
    }),
    defineField({
      name: "type",
      title: "Field Type",
      type: "string",
      initialValue: "text",
      options: {
        list: Object.entries(TYPE_TITLES).map(([value, title]) => ({ title, value })),
        layout: "radio",
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "required",
      title: "Required",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "options",
      title: "Dropdown Choices",
      type: "array",
      of: [{ type: "string" }],
      hidden: ({ parent }) => parent?.type !== "select",
      validation: (R) =>
        R.custom((value, ctx) => {
          const parent = ctx.parent as { type?: string } | undefined;
          if (parent?.type === "select" && (!Array.isArray(value) || value.length === 0)) {
            return "Add at least one choice for a dropdown.";
          }
          return true;
        }),
    }),
    defineField({
      name: "placeholder",
      title: "Placeholder",
      type: "string",
      description: "Optional hint text inside the empty field. For dropdowns, replaces “Choose one”.",
      hidden: ({ parent }) => parent?.type === "checkbox",
    }),
    defineField({
      name: "width",
      title: "Width",
      type: "string",
      initialValue: "full",
      description: "Two half-width fields in a row sit side by side on tablet and desktop. Phones always stack.",
      options: {
        list: [
          { title: "Full width", value: "full" },
          { title: "Half width", value: "half" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      hidden: ({ parent }) => parent?.type === "textarea" || parent?.type === "checkbox",
    }),
    defineField({
      name: "helpText",
      title: "Help Text",
      type: "string",
      description: "Optional small note under the field.",
    }),
  ],
  preview: {
    select: { label: "label", type: "type", required: "required" },
    prepare({ label, type, required }) {
      return {
        title:    label ?? "Untitled field",
        subtitle: `${TYPE_TITLES[type as string] ?? type}${required ? " · required" : ""}`,
      };
    },
  },
});
