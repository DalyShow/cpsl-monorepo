import Link from "next/link"

interface Crumb {
  label: string
  href?: string
}

interface DocsHeaderProps {
  crumbs?:     Crumb[]
  title:       string
  status?:     "stable" | "beta" | "draft"
  description: string
}

const statusStyle: Record<NonNullable<DocsHeaderProps["status"]>, { bg: string; fg: string; border: string }> = {
  stable: { bg: "#10B98114", fg: "#059669", border: "#10B98144" },
  beta:   { bg: "#C9A74C22", fg: "#C9A74C", border: "#C9A74C44" },
  draft:  { bg: "#94A3B822", fg: "#475569", border: "#94A3B844" },
}

export function DocsHeader({ crumbs, title, status = "stable", description }: DocsHeaderProps) {
  const s = statusStyle[status]
  return (
    <div className="border-b px-12 pt-10 pb-7" style={{ borderColor: "#E2E8F0", background: "white" }}>
      {crumbs && crumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium mb-4" style={{ color: "#697279" }}>
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {c.href ? (
                <Link href={c.href} className="hover:underline">{c.label}</Link>
              ) : (
                <span style={{ color: "#94A3B8" }}>{c.label}</span>
              )}
              {i < crumbs.length - 1 && <span aria-hidden style={{ color: "#CBD5E1" }}>/</span>}
            </span>
          ))}
        </nav>
      )}

      <div className="flex items-baseline gap-3 mb-3 flex-wrap">
        <h1 className="text-4xl font-bold tracking-tight" style={{ color: "#091628", letterSpacing: "-0.5px" }}>
          {title}
        </h1>
        <span
          className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
          style={{ background: s.bg, color: s.fg, border: `1px solid ${s.border}` }}
        >
          {status}
        </span>
      </div>

      <p className="text-base max-w-3xl leading-relaxed" style={{ color: "#475569" }}>
        {description}
      </p>
    </div>
  )
}
