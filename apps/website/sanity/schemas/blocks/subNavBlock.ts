import { defineField, defineType } from "sanity";

export const subNavBlock = defineType({
  name: "subNavBlock",
  title: "Sub Navigation",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Links",
      type: "array",
      description:
        "Child page links shown directly below the main nav. Usually added to the top of a parent section's pages.",
      initialValue: [
        { _type: "subNavLink", label: "Overview",  href: "/" },
        { _type: "subNavLink", label: "Rules",     href: "/" },
        { _type: "subNavLink", label: "Handbook",  href: "/" },
        { _type: "subNavLink", label: "Contact",   href: "/" },
      ],
      of: [
        {
          type: "object",
          name: "subNavLink",
          title: "Link",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "href",
              title: "URL",
              type: "string",
              description: "Relative (e.g. /league-info/rules) or absolute.",
              validation: (R) => R.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare({ items }: { items?: unknown[] }) {
      const count = Array.isArray(items) ? items.length : 0;
      return {
        title: "Sub Navigation",
        subtitle: `${count} link${count === 1 ? "" : "s"}`,
      };
    },
  },
});
