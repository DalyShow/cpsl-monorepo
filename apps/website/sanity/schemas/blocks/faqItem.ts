import { defineField, defineType } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "object",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (R) => R.required().max(160),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "array",
      description:
        "Rich text — use the toolbar for bold, italic, links, and bullet/numbered lists.",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [
            { title: "Bullet",   value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold",      value: "strong" },
              { title: "Italic",    value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (R) =>
                      R.uri({
                        scheme: ["http", "https", "mailto", "tel"],
                        allowRelative: true,
                      }),
                  }),
                  defineField({
                    name: "newWindow",
                    title: "Open in new tab",
                    type: "boolean",
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        },
      ],
      validation: (R) => R.required().min(1),
    }),
  ],
  preview: {
    select: { title: "question", answer: "answer" },
    prepare({ title, answer }) {
      // answer is now Portable Text — flatten the first block's text for the
      // sub-title preview.
      let preview = "";
      if (Array.isArray(answer)) {
        const first = answer.find((b: { _type?: string }) => b?._type === "block") as
          | { children?: { text?: string }[] }
          | undefined;
        preview = (first?.children ?? [])
          .map((c) => c?.text ?? "")
          .join(" ")
          .trim();
      } else if (typeof answer === "string") {
        preview = answer;
      }
      return {
        title:    title ?? "Untitled question",
        subtitle: preview ? preview.slice(0, 80) : "",
      };
    },
  },
});
