import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import CodeBlock from "@/components/CodeBlock";
import { LogoTicker } from "@/components/cpsl/modules/LogoTicker";
import type { LogoTickerLogo } from "@/components/cpsl/modules/LogoTicker";
import { sanityFetch } from "@/lib/sanity";

// ─── Sample data ────────────────────────────────────────────────────────────
// Live-pulls logos from the website's Sanity-driven homepage LogoTickerBlock
// so the showcase stays in sync with whatever editors upload. Falls back to
// placeholder shields in /public/logos if Sanity is unreachable.

const fallbackLogos: LogoTickerLogo[] = [
  { key: "asheville-fc",     url: "/logos/asheville-fc.svg",     alt: "Asheville FC" },
  { key: "charleston-fc",    url: "/logos/charleston-fc.svg",    alt: "Charleston FC" },
  { key: "charlotte-fc",     url: "/logos/charlotte-fc.svg",     alt: "Charlotte FC" },
  { key: "coastal-sc",       url: "/logos/coastal-sc.svg",       alt: "Coastal SC" },
  { key: "columbia-united",  url: "/logos/columbia-united.svg",  alt: "Columbia United" },
  { key: "durham-united",    url: "/logos/durham-united.svg",    alt: "Durham United" },
  { key: "greensboro-fc",    url: "/logos/greensboro-fc.svg",    alt: "Greensboro FC" },
  { key: "raleigh-athletic", url: "/logos/raleigh-athletic.svg", alt: "Raleigh Athletic" },
  { key: "triangle-fc",      url: "/logos/triangle-fc.svg",      alt: "Triangle FC" },
  { key: "winston-salem-sc", url: "/logos/winston-salem-sc.svg", alt: "Winston-Salem SC" },
];

type SanityLogo = {
  _key?: string;
  asset?: { url?: string };
  alt?: string;
};

async function fetchLogos(): Promise<LogoTickerLogo[]> {
  const result = await sanityFetch<SanityLogo[]>(
    `*[_type == "homePage"][0].sections[_type == "logoTickerBlock"][0].logos[]{
      _key,
      "alt": asset->altText,
      asset->{ url }
    }`,
  );
  if (!result || result.length === 0) return fallbackLogos;
  const mapped = result
    .filter((l): l is SanityLogo & { asset: { url: string } } => !!l?.asset?.url)
    .map((l, i) => ({
      key: l._key ?? String(i),
      url: l.asset.url,
      alt: l.alt ?? "",
    }));
  return mapped.length > 0 ? mapped : fallbackLogos;
}

const sampleCode = `import { LogoTicker } from "@cpsl/ui"

<LogoTicker
  logos={[
    { url: "/logos/charlotte-fc.svg",     alt: "Charlotte FC" },
    { url: "/logos/raleigh-athletic.svg", alt: "Raleigh Athletic" },
    // …
  ]}
  heading="Member Clubs"
  durationSeconds={80}
  pauseOnHover
  edgeFade
/>`;

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function TickerPage() {
  const logos = await fetchLogos();
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <PageHeader
        section="16 — Components"
        title="Logo Ticker"
        description="Horizontal marquee of club crests — seamless infinite scroll with pause-on-hover and soft edge fades. 37 px tiles with a 30 px gap; crests wear a soft drop shadow so they read on cream, navy, or image backgrounds. Pure CSS animation; respects prefers-reduced-motion. Only scrolls when the content actually overflows the container."
      />

      <div className="px-12 py-12">

        {/* ── 1. Default — on Light ── */}
        <Section title="1 — Default — on Light">
          <p className="text-xs text-muted-foreground mb-4">
            Eighty-second loop, pause on hover, soft edge fade. Default canvas is transparent so the drop-shadowed crests sit directly on whatever surface is below.
          </p>
          <div
            className="rounded-2xl p-10 border"
            style={{ background: "white", borderColor: "#E2E8F0" }}
          >
            <LogoTicker logos={logos} sectionBackground="white" />
          </div>
          <div className="mt-4">
            <CodeBlock code={sampleCode} language="tsx" />
          </div>
        </Section>

        {/* ── 2. On Dark Navy ── */}
        <Section title="2 — On Dark Navy">
          <p className="text-xs text-muted-foreground mb-4">
            Same component on the navy surface. The drop shadow softens but keeps the crests lifted off the background — pass the container color via <code className="bg-secondary px-1.5 py-0.5 rounded">sectionBackground</code> so the edge fade matches.
          </p>
          <div
            className="rounded-2xl p-10 border"
            style={{ background: "#091628", borderColor: "#1E2D45" }}
          >
            <LogoTicker logos={logos} sectionBackground="#091628" />
          </div>
        </Section>

        {/* ── 3. With heading ── */}
        <Section title="3 — With heading">
          <p className="text-xs text-muted-foreground mb-4">
            Optional eyebrow rendered above the marquee in Barlow Condensed, uppercase, 20 px. Inherits text colour from the parent section.
          </p>
          <div
            className="rounded-2xl p-10 border"
            style={{ background: "white", borderColor: "#E2E8F0", color: "#091628" }}
          >
            <LogoTicker logos={logos} heading="Member Clubs" sectionBackground="white" />
          </div>
        </Section>

        {/* ── 4. Reversed — Faster ── */}
        <Section title="4 — Reversed · Faster">
          <p className="text-xs text-muted-foreground mb-4">
            Reverse direction with a shorter duration — useful for stacking two tickers travelling in opposite directions.
          </p>
          <div
            className="rounded-2xl p-10 border flex flex-col gap-4"
            style={{ background: "white", borderColor: "#E2E8F0" }}
          >
            <LogoTicker logos={logos} sectionBackground="white" durationSeconds={40} />
            <LogoTicker logos={logos} sectionBackground="white" durationSeconds={40} reverse />
          </div>
        </Section>

        {/* ── 5. Props ── */}
        <Section title="Props">
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#E2E8F0" }}>
            <div className="px-6 py-3 border-b" style={{ background: "#091628", borderColor: "#1E2D45" }}>
              <span className="text-xs font-bold text-white">LogoTickerProps</span>
            </div>
            <div className="bg-white divide-y" style={{ borderColor: "#F1F5F9" }}>
              {[
                { name: "logos",             type: "LogoTickerLogo[]", def: "—",            desc: "Array of { url, alt, key }. Typically Sanity image asset URLs in production." },
                { name: "heading",           type: "string",           def: "undefined",    desc: "Optional uppercase eyebrow above the marquee." },
                { name: "durationSeconds",   type: "number",           def: "80",           desc: "Full loop time when content overflows. Lower is faster." },
                { name: "reverse",           type: "boolean",          def: "false",        desc: "Reverse the scroll direction." },
                { name: "pauseOnHover",      type: "boolean",          def: "true",         desc: "Pause the animation while the pointer is over the ticker." },
                { name: "edgeFade",          type: "boolean",          def: "true",         desc: "Soft gradient fade on the left/right edges. Only rendered when the ticker is actually scrolling." },
                { name: "sectionBackground", type: "string",           def: "'transparent'", desc: "Background color of the wrapping section; also drives the edge fade colour." },
              ].map((p) => (
                <div key={p.name} className="grid grid-cols-[180px_180px_140px_1fr] gap-4 px-6 py-3 text-xs">
                  <span className="font-mono font-semibold" style={{ color: "#091628" }}>{p.name}</span>
                  <span className="font-mono"             style={{ color: "#475569" }}>{p.type}</span>
                  <span className="font-mono"             style={{ color: "#94A3B8" }}>{p.def}</span>
                  <span className="text-muted-foreground">{p.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
}
