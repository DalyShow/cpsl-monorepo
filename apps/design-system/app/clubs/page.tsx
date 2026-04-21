import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import CodeBlock from "@/components/CodeBlock";
import { ClubCard } from "@/components/cpsl/clubs/ClubCard";
import { ClubDirectory } from "@/components/cpsl/clubs/ClubDirectory";
import { fetchClubs, CLUBS } from "@/lib/clubs";

// ─── Code samples ─────────────────────────────────────────────────────────────

const directoryCode = `import { ClubDirectory } from "@/components/cpsl/clubs"
import { CLUBS } from "@/lib/clubs"

// Static data — swap for an Airtable fetch with no component changes:
// const clubs = await fetchClubsFromAirtable()

<ClubDirectory clubs={CLUBS} onClubClick={(club) => router.push(\`/clubs/\${club.id}\`)} />`;

const cardCode = `import { ClubCard } from "@/components/cpsl/clubs"

<ClubCard
  club={{
    id: "charlotte-fc",
    name: "Charlotte FC",
    location: "Charlotte, NC",
    logoSlug: "charlotte-fc",   // → /public/logos/charlotte-fc.svg
    conference: "East",
    record: { wins: 12, draws: 3, losses: 2 },
    director: "Marcus Webb",
  }}
  onClick={() => router.push("/clubs/charlotte-fc")}
/>`;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ClubDirectoryPage() {
  // Fetches from Airtable when env vars are present; falls back to static data
  const clubs = await fetchClubs();

  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <PageHeader
        section="15 — Components"
        title="Club Directory"
        description="Filterable club directory with conference grouping, crest logos, record stats, and points. Data-source agnostic — drop in a static array or wire to Airtable with no component changes."
      />

      <div className="px-12 py-12">

        {/* ── Live Directory ── */}
        <Section title="1 — ClubDirectory — Live Component">
          <p className="text-xs text-muted-foreground mb-4">
            Fully interactive — filter by conference. Auto-sorted by points (W×3 + D×1) descending. 10 clubs across NC and SC.
          </p>
          <div
            className="rounded-2xl p-8 border"
            style={{ background: "#091628", borderColor: "#1E2D45" }}
          >
            <ClubDirectory clubs={clubs} />
          </div>
          <div className="mt-4">
            <CodeBlock code={directoryCode} language="tsx" />
          </div>
        </Section>

        {/* ── ClubCard single ── */}
        <Section title="2 — ClubCard — All Variants">
          <p className="text-xs text-muted-foreground mb-6">
            Conference determines the left accent colour and badge — blue for East, crimson for West. Pass{" "}
            <code className="bg-secondary px-1.5 py-0.5 rounded">onClick</code> to enable hover state and pointer cursor.
          </p>
          <div
            className="rounded-2xl p-8 border flex flex-col gap-6"
            style={{ background: "#091628", borderColor: "#1E2D45" }}
          >
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#475569" }}>East Conference</div>
              <div className="flex flex-col gap-3">
                <ClubCard club={clubs[0]} />
                <ClubCard club={clubs[1]} />
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#475569" }}>West Conference</div>
              <div className="flex flex-col gap-3">
                <ClubCard club={clubs[5]} />
                <ClubCard club={clubs[6]} />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <CodeBlock code={cardCode} language="tsx" />
          </div>
        </Section>

        {/* ── Component API ── */}
        <Section title="3 — Component API">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Club (data shape)",
                code: `interface Club {
  id: string
  name: string
  location: string
  logoSlug: string   // /public/logos/{slug}.svg
  conference: "East" | "West"
  record: {
    wins: number
    draws: number
    losses: number
  }
  director: string
}`,
              },
              {
                title: "ClubDirectory props",
                code: `<ClubDirectory
  clubs={Club[]}            // any Club array
  onClubClick={(club) => {}} // optional
/>

// Built-in:
//   Filter: ALL / EAST / WEST
//   Sort:   pts desc (W×3 + D×1)`,
              },
              {
                title: "ClubCard props",
                code: `<ClubCard
  club={Club}
  onClick={() => {}}  // enables hover + pointer
/>`,
              },
              {
                title: "Logo convention",
                code: `// Logos live in /public/logos/
// Named after club.logoSlug:
//   "charlotte-fc"  → /logos/charlotte-fc.svg
//   "durham-united" → /logos/durham-united.svg
//
// Airtable: store logoSlug as a text field.
// Keep SVGs in /public/logos/ alongside code.
// Never store logos as Airtable attachments
// (URLs expire every few hours).`,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border overflow-hidden"
                style={{ background: "white", borderColor: "#E2E8F0" }}
              >
                <div className="px-4 py-2.5 border-b" style={{ background: "#FAFBFF", borderColor: "#F1F5F9" }}>
                  <span className="text-xs font-bold" style={{ color: "#091628" }}>{item.title}</span>
                </div>
                <pre
                  className="text-[11px] leading-relaxed p-4 overflow-x-auto"
                  style={{ fontFamily: "'Fira Code', monospace", color: "#475569" }}
                >
                  {item.code}
                </pre>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  );
}
