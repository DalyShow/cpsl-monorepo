import { NewsGrid } from "@/components/cpsl/modules/NewsGrid"
import { DocsHeader } from "@/components/docs/DocsHeader"
import { PreviewPane } from "@/components/docs/PreviewPane"
import { PropsTable } from "@/components/docs/PropsTable"
import CodeBlock from "@/components/CodeBlock"
import { demoNews } from "@/components/docs/demo-data"
import type { PropDoc } from "@/components/docs/types"

const PROP_DOCS: PropDoc[] = [
  { name: "articles", type: "NewsArticle[]", required: true, description: "Array of `{ category, date, title, excerpt }` objects." },
]

const code = `<NewsGrid articles={news} />`

export const metadata = { title: "News & Stories — CPSL Design System" }

export default function NewsGridDocs() {
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <DocsHeader
        crumbs={[{ label: "Components", href: "/" }, { label: "Body Modules", href: "/modules" }, { label: "News & Stories" }]}
        title="News & Stories"
        status="stable"
        description="Three-column article Card grid. Category Badge, date, headline, excerpt, and read-more link."
      />
      <div className="px-12 py-10 flex flex-col gap-6">
        <PreviewPane label="Live Preview" canvas="surface" padding={24}>
          <NewsGrid articles={demoNews} />
        </PreviewPane>
        <CodeBlock code={code} language="tsx" />
        <PropsTable props={PROP_DOCS} />
      </div>
    </div>
  )
}
