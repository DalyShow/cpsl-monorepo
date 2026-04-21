import PageHeader from "@/components/PageHeader"
import Section from "@/components/Section"
import CodeBlock from "@/components/CodeBlock"
import { ScoreboardWidget } from "@/components/cpsl/ScoreboardWidget"
import { MatchCard } from "@/components/cpsl/MatchCard"
import { CPSLAlert } from "@/components/cpsl/CPSLAlert"
import { CPSLInput } from "@/components/cpsl/CPSLInput"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const scoreboardCode = `import { ScoreboardWidget } from "@/components/cpsl/ScoreboardWidget"

<ScoreboardWidget
  home={{ name: "Charlotte FC Academy", shortName: "CFA", score: 3 }}
  away={{ name: "Raleigh Railhawks U19", shortName: "RLH", score: 1 }}
  status="live"
  minute={72}
  competition="CPSL Premiership"
/>`

const matchCardCode = `import { MatchCard } from "@/components/cpsl/MatchCard"

// Upcoming
<MatchCard
  home={{ name: "Charlotte FC", shortName: "CFA" }}
  away={{ name: "Durham United", shortName: "DUR" }}
  status="upcoming"
  date="Sat 1 Mar"
  kickoff="3:00 PM"
  venue="Matthews Sportsplex"
/>

// Full-time with result
<MatchCard
  home={{ name: "Charlotte FC", shortName: "CFA", score: 2 }}
  away={{ name: "Raleigh Railhawks", shortName: "RLH", score: 0 }}
  status="fulltime"
  perspectiveTeam="home"
  date="Sat 22 Feb"
/>`

export default function PatternsPage() {
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <PageHeader
        section="10 — Patterns"
        title="Patterns"
        description="Composite UI patterns specific to CPSL products — the live scoreboard widget, match card states, alert system, and the full authentication flow. All built from the shadcn component layer."
      />
      <div className="px-12 py-12">

        {/* Live Scoreboard */}
        <Section title="Live Scoreboard Widget — Live Component">
          <div className="flex gap-8 items-start">
            {/* Live state */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Live Match</p>
              <ScoreboardWidget
                home={{ name: "Charlotte FC Academy", shortName: "CFA", score: 3 }}
                away={{ name: "Raleigh Railhawks", shortName: "RLH", score: 1 }}
                status="live"
                minute={72}
                competition="CPSL Premiership"
              />
            </div>

            {/* Half time */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Half Time</p>
              <ScoreboardWidget
                home={{ name: "Durham United", shortName: "DUR", score: 0 }}
                away={{ name: "Triangle FC", shortName: "TFC", score: 2 }}
                status="halftime"
                competition="CPSL Cup"
              />
            </div>

            {/* Upcoming */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Upcoming</p>
              <ScoreboardWidget
                home={{ name: "Greensboro FC", shortName: "GFC", score: 0 }}
                away={{ name: "Winston-Salem SC", shortName: "WSS", score: 0 }}
                status="upcoming"
                kickoff="3:00 PM"
                competition="CPSL League"
              />
            </div>
          </div>
          <div className="mt-4">
            <CodeBlock code={scoreboardCode} language="tsx" />
          </div>
        </Section>

        {/* Match Cards */}
        <Section title="Match Card States — Live Components">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Upcoming</p>
              <MatchCard
                home={{ name: "Charlotte FC Academy", shortName: "CFA" }}
                away={{ name: "Durham United", shortName: "DUR" }}
                status="upcoming"
                date="Sat 1 Mar"
                kickoff="3:00 PM"
                venue="Matthews Sportsplex"
                competition="CPSL Premiership"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Full Time — WIN</p>
              <MatchCard
                home={{ name: "Charlotte FC Academy", shortName: "CFA", score: 2 }}
                away={{ name: "Raleigh Railhawks", shortName: "RLH", score: 0 }}
                status="fulltime"
                perspectiveTeam="home"
                date="Sat 22 Feb"
                competition="CPSL Premiership"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Full Time — LOSS</p>
              <MatchCard
                home={{ name: "Triangle FC", shortName: "TFC", score: 3 }}
                away={{ name: "Charlotte FC Academy", shortName: "CFA", score: 1 }}
                status="fulltime"
                perspectiveTeam="away"
                date="Sun 16 Feb"
                competition="CPSL Cup"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Draw</p>
              <MatchCard
                home={{ name: "Greensboro FC", shortName: "GFC", score: 1 }}
                away={{ name: "Winston-Salem SC", shortName: "WSS", score: 1 }}
                status="fulltime"
                perspectiveTeam="home"
                date="Sat 8 Feb"
                competition="CPSL League"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Live Match</p>
              <MatchCard
                home={{ name: "Durham United", shortName: "DUR", score: 0 }}
                away={{ name: "Triangle FC", shortName: "TFC", score: 1 }}
                status="live"
                minute={38}
                competition="CPSL Cup"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Postponed</p>
              <MatchCard
                home={{ name: "Outer Banks FC", shortName: "OBK" }}
                away={{ name: "Asheville City SC", shortName: "AVL" }}
                status="postponed"
                date="Sat 1 Feb"
                competition="CPSL League"
              />
            </div>
          </div>
          <CodeBlock code={matchCardCode} language="tsx" />
        </Section>

        {/* Alerts */}
        <Section title="Alert System — CPSL Semantic Alerts">
          <div className="flex flex-col gap-3">
            <CPSLAlert severity="info" title="Season Registration Open">
              Club registration for the 2025–26 CPSL Premiership season is now open. Deadline is April 30.
            </CPSLAlert>
            <CPSLAlert severity="success" title="Club Approved">
              Charlotte FC Academy has been approved for admission to the CPSL Premiership. Welcome to the league.
            </CPSLAlert>
            <CPSLAlert severity="warning" title="Compliance Review Required">
              Your club&apos;s insurance documents expire in 14 days. Upload updated certificates before the deadline.
            </CPSLAlert>
            <CPSLAlert severity="error" title="Match Result Disputed" dismissible>
              The result of the Feb 22 match has been marked as disputed and is under review by the CPSL committee.
            </CPSLAlert>
          </div>
        </Section>

        <Separator className="my-8" />

        {/* Auth flow */}
        <Section title="Auth — Sign In Form">
          <div className="flex gap-8 items-start">
            {/* Sign-in card */}
            <div className="w-[380px] shrink-0 rounded-2xl p-8 border bg-white border-[#E2E8F0] shadow-sm">
              <div className="flex flex-col items-center mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: "#697279" }}>
                  <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
                    <path d="M2 2L22 2L22 18C22 24 12 27 12 27C12 27 2 24 2 18Z" fill="none" stroke="white" strokeWidth="2" />
                    <path d="M7 14L12 9L17 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="text-xl font-bold mb-1 text-foreground">Welcome back</div>
                <div className="text-sm text-muted-foreground">Sign in to CPSL Portal</div>
              </div>

              <div className="flex flex-col gap-4 mb-5">
                <CPSLInput
                  label="Email address"
                  type="email"
                  placeholder="coach@yourclub.com"
                  defaultValue="coach@charlottefc.com"
                  leftIcon={
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  }
                />
                <CPSLInput
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  hint="Forgot password?"
                  leftIcon={
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                  }
                />
              </div>

              <Button className="w-full" size="lg">Sign in</Button>

              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <Button variant="secondary" className="w-full" size="default">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path d="M15.68 8.18c0-.57-.05-1.11-.15-1.64H8v3.1h4.3a3.67 3.67 0 01-1.6 2.41v2h2.6c1.52-1.4 2.38-3.45 2.38-5.87z" fill="#4285F4" />
                  <path d="M8 16c2.16 0 3.97-.72 5.3-1.95l-2.6-2a4.77 4.77 0 01-2.7.77c-2.08 0-3.85-1.41-4.48-3.31H.85v2.07A8 8 0 008 16z" fill="#34A853" />
                  <path d="M3.52 9.51A4.8 4.8 0 013.27 8c0-.52.09-1.03.25-1.51V4.42H.85A8 8 0 000 8c0 1.3.31 2.52.85 3.58l2.67-2.07z" fill="#FBBC05" />
                  <path d="M8 3.19c1.17 0 2.22.4 3.05 1.2l2.28-2.28C11.96.72 10.15 0 8 0A8 8 0 00.85 4.42L3.52 6.49C4.15 4.59 5.92 3.19 8 3.19z" fill="#EA4335" />
                </svg>
                Continue with Google
              </Button>
            </div>

            {/* States */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Error */}
              <div className="rounded-xl p-5 border bg-white border-[#E2E8F0]">
                <p className="text-xs font-bold uppercase tracking-widest text-destructive mb-3">Error State</p>
                <CPSLInput
                  label="Email address"
                  type="email"
                  defaultValue="wrong@email"
                  error="Please enter a valid email address"
                />
              </div>

              {/* 2FA */}
              <div className="rounded-xl p-5 border bg-white border-[#E2E8F0]">
                <p className="text-xs font-bold uppercase tracking-widest text-[#00875A] mb-3">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground mb-3">We sent a 6-digit code to coach@charlottefc.com</p>
                <div className="flex gap-2 mb-3">
                  {["4", "8", "2", "", "", ""].map((v, i) => (
                    <div
                      key={i}
                      className="w-10 h-12 rounded-lg flex items-center justify-center text-base font-bold border-2 transition-colors"
                      style={{
                        borderColor: i < 3 ? "#697279" : "#E2E8F0",
                        background: i < 3 ? "#FAFCFF" : "white",
                        color: i < 3 ? "#091628" : "#94A3B8",
                      }}
                    >
                      {v || "—"}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Resend code in{" "}
                  <span className="text-primary font-semibold">0:42</span>
                </p>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}
