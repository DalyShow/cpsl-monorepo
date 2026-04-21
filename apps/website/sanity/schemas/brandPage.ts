import { defineField, defineType } from "sanity";
import { ColorHexInput } from "../components/ColorHexInput";

export const brandPage = defineType({
  name: "brandPage",
  title: "Brand Page",
  type: "document",
  fields: [

    // ── SECTIONS (drag to reorder, ⋮ menu to duplicate) ──────────────────────
    defineField({
      name: "sections",
      title: "Page Sections",
      description: "Drag to reorder sections. Click the ⋮ menu on any section to duplicate it.",
      type: "array",
      of: [

        // ── Hero ──────────────────────────────────────────────────────────────
        {
          type: "object",
          name: "brandHero",
          title: "Hero",
          fields: [
            defineField({ name: "sectionTitle", title: "Block Name", type: "string", description: "Custom label shown in the sections list — helps identify duplicates." }),
            defineField({ name: "tagline",     title: "Tagline (after CPSL —)",     type: "string", initialValue: "BRAND SYSTEM" }),
            defineField({ name: "year",        title: "Edition Year",               type: "string", initialValue: "2026 Edition" }),
            defineField({ name: "line1",       title: "Headline Line 1 (White)",    type: "string", initialValue: "CAROLINA" }),
            defineField({ name: "line2",       title: "Headline Line 2 (Gold)",     type: "string", initialValue: "PREMIER" }),
            defineField({ name: "line3",       title: "Headline Line 3 (White)",    type: "string", initialValue: "SOCCER" }),
            defineField({
              name: "description", title: "Description (bottom-right)", type: "text", rows: 3,
              initialValue: "Official brand guidelines for the\nCarolina Premier Soccer League —\nNC & SC.",
              description: "Use line breaks to control wrapping.",
            }),
          ],
          preview: {
            select: { title: "sectionTitle" },
            prepare: ({ title }: { title?: string }) => ({ title: title || "Hero" }),
          },
        },

        // ── Primary Mark ──────────────────────────────────────────────────────
        {
          type: "object",
          name: "brandPrimaryMark",
          title: "Primary Mark",
          fields: [
            defineField({ name: "sectionTitle", title: "Block Name", type: "string", description: "Custom label shown in the sections list — helps identify duplicates." }),
            defineField({ name: "heading", title: "Section Heading", type: "string", initialValue: "THE CREST" }),
            defineField({
              name: "body", title: "Description Paragraph", type: "text", rows: 4,
              initialValue: "The primary mark. A shield anchored by the NC/SC diagonal border — the defining line that gives CPSL its identity. Always maintain the crest's protected clearspace equal to the width of the shield icon.",
            }),
            defineField({
              name: "markImage", title: "Crest Image", type: "file",
              options: { accept: ".svg,.png,.jpg,.webp" },
            }),
            defineField({
              name: "markDownload", title: "Crest Download File", type: "file",
              description: "Leave blank to use the Crest Image above.",
              options: { accept: ".svg,.png,.pdf,.zip" },
            }),
            defineField({
              name: "specs", title: "Specification Tiles", type: "array",
              of: [{
                type: "object", name: "spec", title: "Spec",
                fields: [
                  defineField({ name: "label", title: "Label", type: "string", description: "E.g. 'Min. size print'" }),
                  defineField({ name: "value", title: "Value", type: "string", description: "E.g. '25mm'" }),
                  defineField({ name: "hex",   title: "Background Hex", type: "string", description: "Optional. E.g. '#C9A74C'. Leave blank for default." }),
                ],
                preview: { select: { title: "label", subtitle: "value" } },
              }],
            }),
          ],
          preview: {
            select: { title: "sectionTitle" },
            prepare: ({ title }: { title?: string }) => ({ title: title || "01 — Primary Mark" }),
          },
        },

        // ── Full Bleed Image ──────────────────────────────────────────────────
        {
          type: "object",
          name: "brandFullBleedImage",
          title: "Full Bleed Image",
          fields: [
            defineField({ name: "sectionTitle", title: "Block Name", type: "string", description: "Custom label shown in the sections list — helps identify duplicates." }),
            defineField({ name: "heading", title: "Section Heading", type: "string" }),
            defineField({ name: "body", title: "Description Paragraph", type: "text", rows: 4 }),
            defineField({
              name: "image", title: "Image (fills left panel)", type: "file",
              description: "SVG, PNG, or JPG. The image will fill the entire left half of the section.",
              options: { accept: ".svg,.png,.jpg,.webp" },
            }),
            defineField({
              name: "imageFit", title: "Image Fit", type: "string", initialValue: "cover",
              description: "Cover fills and may crop. Contain fits the whole image (shows background). Tile repeats the image.",
              options: {
                list: [
                  { title: "Cover (fill & crop)", value: "cover" },
                  { title: "Contain (fit inside)", value: "contain" },
                  { title: "Tile (repeat pattern)", value: "tile" },
                ],
                layout: "radio",
              },
            }),
            defineField({
              name: "panelBg", title: "Panel Background Colour", type: "string",
              description: "Hex code for the panel behind the image — visible when using Contain or Tile fit. E.g. #041124",
              initialValue: "#041124",
            }),
            defineField({
              name: "imageDownload", title: "Download File", type: "file",
              description: "Leave blank to use the Image above as the download.",
              options: { accept: ".svg,.png,.pdf,.zip" },
            }),
            defineField({
              name: "specs", title: "Specification Tiles", type: "array",
              of: [{
                type: "object", name: "spec", title: "Spec",
                fields: [
                  defineField({ name: "label", title: "Label", type: "string", description: "E.g. 'Tile size'" }),
                  defineField({ name: "value", title: "Value", type: "string", description: "E.g. '180 × 140px'" }),
                  defineField({ name: "hex",   title: "Background Hex", type: "string", description: "Optional. E.g. '#C9A74C'. Leave blank for default." }),
                ],
                preview: { select: { title: "label", subtitle: "value" } },
              }],
            }),
          ],
          preview: {
            select: { title: "sectionTitle" },
            prepare: ({ title }: { title?: string }) => ({ title: title || "Full Bleed Image" }),
          },
        },

        // ── Logo Suite ────────────────────────────────────────────────────────
        {
          type: "object",
          name: "brandLogoSuite",
          title: "Logo Suite",
          fields: [
            defineField({ name: "sectionTitle", title: "Block Name", type: "string", description: "Custom label shown in the sections list — helps identify duplicates." }),
            defineField({ name: "heading", title: "Section Heading", type: "string", initialValue: "LOCKUPS & MARKS" }),
            defineField({
              name: "lockups", title: "Logo Lockup Variants", type: "array",
              of: [{
                type: "object", name: "lockup", title: "Lockup",
                fields: [
                  defineField({ name: "label", title: "Panel Label", type: "string" }),
                  defineField({
                    name: "assetFile", title: "Logo File", type: "image",
                    description: "Upload the logo. Used for both display and the download button.",
                    options: { accept: "image/*,.svg" },
                  }),
                  defineField({ name: "invertImage", title: "Invert Image (dark logo on light bg)", type: "boolean", initialValue: false }),
                  defineField({
                    name: "displayStyle", title: "Display Size", type: "string", initialValue: "lockup",
                    description: "Use 'lockup' for wide horizontal logos, 'crest' for tall shield marks.",
                    options: { list: [{ title: "Lockup (wide)", value: "lockup" }, { title: "Crest (tall)", value: "crest" }], layout: "radio" },
                  }),
                  defineField({
                    name: "bgVariant", title: "Background", type: "string", initialValue: "dark",
                    options: { list: [{ title: "Deep Navy (dark)", value: "dark" }, { title: "Charcoal", value: "charcoal" }, { title: "Championship Gold", value: "gold" }], layout: "radio" },
                  }),
                ],
                preview: { select: { title: "label", subtitle: "bgVariant" } },
              }],
            }),
            defineField({
              name: "usageDonts", title: "Usage Don'ts", type: "array",
              description: "Each entry gets a red ✕ prefix.",
              of: [{ type: "string" }],
            }),
          ],
          preview: {
            select: { title: "sectionTitle" },
            prepare: ({ title }: { title?: string }) => ({ title: title || "02 — Logo Suite" }),
          },
        },

        // ── Color System ──────────────────────────────────────────────────────
        {
          type: "object",
          name: "brandColorSystem",
          title: "Color System",
          fields: [
            defineField({ name: "sectionTitle", title: "Block Name", type: "string", description: "Custom label shown in the sections list — helps identify duplicates." }),
            defineField({ name: "heading", title: "Section Heading", type: "string", initialValue: "THE PALETTE" }),
            defineField({
              name: "colors", title: "Color Swatches", type: "array",
              of: [{
                type: "object", name: "colorSwatch", title: "Swatch",
                fields: [
                  defineField({ name: "name",      title: "Color Name",       type: "string" }),
                  defineField({ name: "role",      title: "Usage Role",       type: "string" }),
                  defineField({ name: "hex",       title: "Swatch Color",     type: "string", components: { input: ColorHexInput } }),
                  defineField({ name: "rgb",       title: "RGB (n / n / n)", type: "string" }),
                  defineField({ name: "textColor", title: "Label Text Color", type: "string", components: { input: ColorHexInput } }),
                ],
                preview: { select: { title: "name", subtitle: "hex" } },
              }],
            }),
          ],
          preview: {
            select: { title: "sectionTitle" },
            prepare: ({ title }: { title?: string }) => ({ title: title || "03 — Color System" }),
          },
        },

        // ── Typography ────────────────────────────────────────────────────────
        {
          type: "object",
          name: "brandTypography",
          title: "Typography",
          fields: [
            defineField({ name: "sectionTitle", title: "Block Name", type: "string", description: "Custom label shown in the sections list — helps identify duplicates." }),
            defineField({ name: "displaySample",   title: "Large Display Sample",        type: "string", initialValue: "Aa", description: "The oversized letters shown at the top of the Typography section." }),
            defineField({ name: "displayName",    title: "Display Font Name",          type: "string", initialValue: "Barlow Condensed" }),
            defineField({ name: "displayWeights", title: "Display Font Weights Label",  type: "string", initialValue: "Black 900 · Bold 700 · SemiBold 600" }),
            defineField({ name: "bodyName",       title: "Body Font Name",             type: "string", initialValue: "Inter" }),
            defineField({ name: "bodyWeights",    title: "Body Font Weights Label",    type: "string", initialValue: "Light 300 · Regular 400 · Medium 500" }),
            defineField({
              name: "bodySample", title: "Body Sample Paragraph", type: "text", rows: 3,
              initialValue: "The Carolina Premier Soccer League was formed in 2026 by leading clubs seeking a competitive platform that reflects the evolving needs of the modern soccer club.",
            }),
          ],
          preview: {
            select: { title: "sectionTitle" },
            prepare: ({ title }: { title?: string }) => ({ title: title || "04 — Typography" }),
          },
        },

        // ── Downloads ─────────────────────────────────────────────────────────
        {
          type: "object",
          name: "brandDownloads",
          title: "Asset Downloads",
          fields: [
            defineField({ name: "sectionTitle", title: "Block Name", type: "string", description: "Custom label shown in the sections list — helps identify duplicates." }),
            defineField({ name: "heading", title: "Section Heading", type: "string", initialValue: "BRAND ASSETS" }),
            defineField({
              name: "assets", title: "Downloadable Assets", type: "array",
              description: "Each item gets a gold Download button.",
              of: [{
                type: "object", name: "asset", title: "Asset",
                fields: [
                  defineField({ name: "label",  title: "Asset Name",     type: "string" }),
                  defineField({ name: "format", title: "Format",         type: "string", initialValue: "SVG", description: "E.g. SVG, PNG, PDF" }),
                  defineField({ name: "note",   title: "Note",           type: "string" }),
                  defineField({ name: "size",   title: "Size / Variant", type: "string", initialValue: "Vector" }),
                  defineField({
                    name: "file", title: "Upload File", type: "file",
                    description: "The file users will download.",
                    options: { accept: ".svg,.png,.jpg,.pdf,.zip,.ai,.eps" },
                  }),
                ],
                preview: { select: { title: "label", subtitle: "format" } },
              }],
            }),
          ],
          preview: {
            select: { title: "sectionTitle" },
            prepare: ({ title }: { title?: string }) => ({ title: title || "05 — Asset Downloads" }),
          },
        },

      ],
    }),

    // ── FOOTER (always at bottom) ─────────────────────────────────────────────
    defineField({ name: "footerName",      title: "Footer — League Name",    type: "string", initialValue: "CPSL — CAROLINA PREMIER SOCCER LEAGUE" }),
    defineField({ name: "footerCopyright", title: "Footer — Copyright Text", type: "string", initialValue: "© 2026 · Brand System v1.0" }),

  ],

  preview: {
    prepare() { return { title: "Brand Page" }; },
  },
});
