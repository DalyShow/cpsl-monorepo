import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from "./sanity/schemas";
import { resolve as presentationResolve } from "./sanity/presentation/resolve";

/**
 * Builds the draft-preview URL Studio uses when an editor clicks
 * "Open preview" on a document. Hits our /api/draft/enable route,
 * which validates the shared secret, flips Next.js draftMode on,
 * and redirects to the live slug so the draft renders in place of
 * the published version.
 */
function buildPreviewUrl(pathname: string): string | undefined {
  const secret = process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET;
  if (!secret) return undefined;
  const safe = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const params = new URLSearchParams({ secret, slug: safe });
  return `/api/draft/enable?${params.toString()}`;
}

function resolvePreviewPath(doc: unknown): string | undefined {
  if (!doc || typeof doc !== "object") return undefined;
  const d = doc as {
    _type?: string;
    slug?: { current?: string };
    parent?: { _ref?: string };
  };
  if (d._type === "homePage") return "/";
  if (d._type === "brandPage") return "/brand";
  if (d._type === "page") {
    const slug = d.slug?.current;
    if (!slug) return undefined;
    // Two-level paths (/parent/child) resolve on the site via the
    // [...slug] route — Studio only knows the child slug here, which
    // is enough to preview a published + parented draft together.
    return `/${slug}`;
  }
  return undefined;
}

export default defineConfig({
  name: "cpsl",
  title: "CPSL",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  document: {
    productionUrl: async (prev, context) => {
      const path = resolvePreviewPath(context.document);
      if (!path) return prev;
      return buildPreviewUrl(path) ?? prev;
    },
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.listItem()
              .title("Home Page")
              .id("homePage")
              .child(S.document().schemaType("homePage").documentId("homePage")),
            S.listItem()
              .title("Brand Page")
              .id("brandPage")
              .child(S.document().schemaType("brandPage").documentId("brandPage")),
            S.divider(),
            S.listItem()
              .title("Pages")
              .id("pages")
              .schemaType("page")
              .child(
                S.documentTypeList("page")
                  .title("Pages")
                  .defaultOrdering([{ field: "title", direction: "asc" }])
              ),
          ]),
    }),

    /**
     * Presentation tool — the Framer-style visual editor.
     *
     * Loads the live website inside an iframe alongside the document
     * form. With stega encoding active in draft mode (see
     * lib/sanity/client.ts), every editable text element on the page
     * is wrapped in a click-to-edit overlay; clicking any element
     * jumps the form to the matching field.
     *
     * The iframe origin is the same Next.js app (Studio is embedded
     * at /studio), so we resolve it from NEXT_PUBLIC_SITE_URL with a
     * localhost fallback for dev.
     */
    presentationTool({
      resolve: presentationResolve,
      previewUrl: {
        origin:
          process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
