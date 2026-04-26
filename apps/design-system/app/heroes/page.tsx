import Link from "next/link"
import { DocsHeader } from "@/components/docs/DocsHeader"

export const metadata = { title: "Hero Sections — CPSL Design System" }

interface HeroCard {
  slug:        string
  title:       string
  description: string
  isNew?:      boolean
}

const HEROES: HeroCard[] = [
  { slug: "hero-bento",          title: "Hero Bento",          description: "Contained bento-style hero (~640px tall, not full viewport). Cream text + two stacked photos.", isNew: true },
  { slug: "cinematic-gradient",  title: "Cinematic Gradient",  description: "Full-bleed background with a directional gradient mask + bottom match ticker." },
  { slug: "split-frame",         title: "Split Frame",         description: "Dark navy content panel left, diagonal-clipped action photo right." },
  { slug: "glass-card",          title: "Glass Card",          description: "Frosted glass card floats over a full-bleed dark stadium background." },
  { slug: "magazine-overlap",    title: "Magazine Overlap",    description: "Editorial grid — huge headline bleeds over a right-hand photo panel." },
  { slug: "full-width-image",    title: "Full Width Image",    description: "Photo-first hero — headline anchored bottom-left over a gradient scrim." },
  { slug: "section-header",      title: "Section Header",      description: "Compact module-level header. Sits above data-heavy sections like Standings or Schedule." },
]

export default function HeroesIndex() {
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <DocsHeader
        crumbs={[{ label: "Components", href: "/" }, { label: "Hero Sections" }]}
        title="Hero Sections"
        status="stable"
        description="Production-ready hero layouts built from CPSL design tokens. Each accepts a photo or video background — swap the placeholder for an <img> or <video> tag."
      />

      <div className="px-12 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HEROES.map((h) => (
            <Link
              key={h.slug}
              href={`/heroes/${h.slug}`}
              className="group border rounded-2xl p-5 bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              style={{ borderColor: "#E2E8F0" }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3
                  className="text-lg font-bold leading-tight"
                  style={{ color: "#091628", fontFamily: "'Barlow Condensed', sans-serif", textTransform: "uppercase", letterSpacing: "-0.01em" }}
                >
                  {h.title}
                </h3>
                {h.isNew && (
                  <span
                    className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded shrink-0"
                    style={{ background: "#10B98122", color: "#10B981", border: "1px solid #10B98144" }}
                  >
                    new
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "#475569" }}>
                {h.description}
              </p>
              <div className="text-xs font-mono flex items-center gap-1" style={{ color: "#94A3B8" }}>
                /heroes/{h.slug}
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
