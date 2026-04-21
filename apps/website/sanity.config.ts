import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "cpsl",
  title: "CPSL",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
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
  ],
  schema: {
    types: schemaTypes,
  },
});
