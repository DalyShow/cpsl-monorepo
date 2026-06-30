import { defineField, defineType } from "sanity";

/**
 * Document Asset — a reusable upload (PDF, DOC, XLSX, etc.) stored once
 * and referenced from anywhere on the site (CTA banners, links, etc.).
 *
 * Editors manage these in `Studio → Documents`. The actual file is stored
 * on Sanity's CDN; references resolve to the asset URL plus original
 * filename so download links carry a sensible name.
 */
export const documentAsset = defineType({
  name: "documentAsset",
  title: "Document",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        "Display name used in the Sanity picker. Editors see this when choosing a file.",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Optional. A short note about what this file contains.",
    }),
    defineField({
      name: "file",
      title: "File",
      type: "file",
      options: {
        accept:
          ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.csv,.txt,.zip,application/pdf",
        storeOriginalFilename: true,
      },
      validation: (R) => R.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      filename: "file.asset.originalFilename",
      size: "file.asset.size",
    },
    prepare({ title, filename, size }) {
      const kb = typeof size === "number" ? Math.round(size / 1024) : null;
      const sizeLabel = kb == null
        ? ""
        : kb < 1024 ? `${kb} KB` : `${(kb / 1024).toFixed(1)} MB`;
      return {
        title: title ?? "Untitled document",
        subtitle: [filename, sizeLabel].filter(Boolean).join(" · "),
      };
    },
  },
  orderings: [
    {
      title: "Title (A → Z)",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
    {
      title: "Recently updated",
      name: "updatedDesc",
      by: [{ field: "_updatedAt", direction: "desc" }],
    },
  ],
});
