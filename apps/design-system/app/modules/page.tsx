import Link from "next/link"
import { DocsHeader } from "@/components/docs/DocsHeader"

export const metadata = { title: "Body Modules — CPSL Design System" }

interface ModuleCard {
  slug:        string
  title:       string
  description: string
  isNew?:      boolean
}

const MODULES: ModuleCard[] = [
  { slug: "stats-bar",                title: "League Stats Bar",         description: "Full-width counter strip. Sits below a hero." },
  { slug: "feature-highlights",       title: "Feature Highlights",        description: "Three-column icon + title + body grid." },
  { slug: "results-fixtures-tabs",    title: "Results & Fixtures Tabs",   description: "Tabs switching between recent results and upcoming fixtures." },
  { slug: "standings-table",          title: "Standings Table",           description: "shadcn Table skinned with CPSL tokens." },
  { slug: "mls-standings-table",      title: "MLS-Style Standings",       description: "Full-bleed dark standings block with conference tabs." },
  { slug: "club-directory",           title: "Club Directory",            description: "Card grid with crest, name, city, and tier badge." },
  { slug: "news-grid",                title: "News & Stories",            description: "Three-column article card grid." },
  { slug: "player-spotlight",         title: "Player Spotlight",          description: "Featured player card with stats and progress bars." },
  { slug: "cta-banner",               title: "CTA Banner",                description: "Five-variant call-to-action band." },
  { slug: "skeleton-loader",          title: "Skeleton Loader",           description: "Shimmer placeholder for card grids and tables." },
  { slug: "content-section-centered", title: "Content Section: Centered", description: "Full-width centered editorial section." },
  { slug: "matchday-block",           title: "Matchday Block",            description: "Conference-scoped matchday view with live indicators." },
  { slug: "faq-accordion",            title: "FAQ Accordion",             description: "Question/answer accordion with five background variants.", isNew: true },
]

export default function ModulesIndex() {
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <DocsHeader
        crumbs={[{ label: "Components", href: "/" }, { label: "Body Modules" }]}
        title="Body Modules"
        status="stable"
        description="Reusable page sections built from shadcn primitives, skinned with CPSL design tokens. Drop these below any hero to assemble a complete page."
      />

      <div className="px-12 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULES.map((m) => (
            <Link
              key={m.slug}
              href={`/modules/${m.slug}`}
              className="group border rounded-2xl p-5 bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              style={{ borderColor: "#E2E8F0" }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3
                  className="text-lg font-bold leading-tight"
                  style={{ color: "#091628", fontFamily: "'Barlow Condensed', sans-serif", textTransform: "uppercase", letterSpacing: "-0.01em" }}
                >
                  {m.title}
                </h3>
                {m.isNew && (
                  <span
                    className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded shrink-0"
                    style={{ background: "#10B98122", color: "#10B981", border: "1px solid #10B98144" }}
                  >
                    new
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "#475569" }}>
                {m.description}
              </p>
              <div className="text-xs font-mono flex items-center gap-1 transition-colors" style={{ color: "#94A3B8" }}>
                /modules/{m.slug}
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
