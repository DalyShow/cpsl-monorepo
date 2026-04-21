import { defineField, defineType } from "sanity";

export const flyoutItem = defineType({
  name: "flyoutItem",
  title: "Flyout Item",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      description: "Short line shown under the label.",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "Relative or absolute URL.",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      options: { accept: "image/svg+xml,image/png" },
      description:
        "SVG preferred. Rendered at 20 × 20 inside the flyout row. Keep it mono-tone so it reads on the navy panel.",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "description", media: "icon" },
  },
});

export const flyoutAction = defineType({
  name: "flyoutAction",
  title: "Flyout Footer Action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      options: { accept: "image/svg+xml,image/png" },
      description: "Small icon (16 × 16) shown next to the action label.",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href", media: "icon" },
  },
});

export const topNavFlyout = defineType({
  name: "topNavFlyout",
  title: "Flyout Menu",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Trigger Label",
      type: "string",
      description: "The top-nav label visitors click to open the flyout.",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "size",
      title: "Panel Size",
      type: "string",
      options: {
        list: [
          { title: "Small (288 px)",  value: "sm" },
          { title: "Medium (448 px)", value: "md" },
          { title: "Large (576 px)",  value: "lg" },
        ],
        layout: "radio",
      },
      initialValue: "md",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "flyoutItem" }],
      validation: (R) => R.min(1),
    }),
    defineField({
      name: "actions",
      title: "Footer Actions",
      type: "array",
      description:
        "Optional row of small links pinned to the bottom of the flyout (e.g. 'View Handbook', 'Contact League').",
      of: [{ type: "flyoutAction" }],
    }),
  ],
  preview: {
    select: { title: "label", items: "items" },
    prepare({ title, items }) {
      const count = Array.isArray(items) ? items.length : 0;
      return {
        title: title || "Flyout",
        subtitle: `Flyout menu · ${count} item${count === 1 ? "" : "s"}`,
      };
    },
  },
});
