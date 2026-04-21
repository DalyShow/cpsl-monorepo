import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { AlertBanner, Toast, ProgressBar, StatusBadge, EmptyState } from "@/components/cpsl/feedback";

export default function FeedbackPage() {
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <PageHeader
        section="08 — Components"
        title="Feedback & Overlays"
        description="Alert banners, toasts, progress bars, badges/tags, and empty states. Always pair color with an icon or text label — never rely on color alone."
      />
      <div className="px-12 py-12">

        <Section title="Alert Banners">
          <p className="text-xs text-muted-foreground mb-4">
            Four semantic variants — success, warning, error, info. Dismiss button hides the banner via local state. Pass <code className="bg-secondary px-1.5 py-0.5 rounded">dismissible={"{false}"}</code> to lock it visible.
          </p>
          <div className="flex flex-col gap-3">
            <AlertBanner type="success" title="Match recorded"      message="Charlotte FC 3–1 Raleigh Athletic has been confirmed and published." />
            <AlertBanner type="warning" title="Match postponed"     message="Triangle FC vs Greensboro has been postponed due to adverse weather." />
            <AlertBanner type="error"   title="Submission failed"   message="Unable to submit lineup. Check your connection and try again." />
            <AlertBanner type="info"    title="Transfer window open" message="The winter transfer window closes on February 28, 2026 at midnight." />
          </div>
        </Section>

        <Section title="Toast Notifications">
          <p className="text-xs text-muted-foreground mb-4">
            Dark-navy toasts for non-blocking feedback. Each instance manages its own dismiss state. Pass <code className="bg-secondary px-1.5 py-0.5 rounded">onDismiss</code> to hook into a toast queue.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Toast icon="✓" color="#00C853" title="Lineup saved"    subtitle="Your changes are live." />
            <Toast icon="✕" color="#FF1744" title="Export failed"   subtitle="Try again in a moment." />
            <Toast icon="ℹ" color="#697279" title="New match added" subtitle="Mar 8 vs Triangle FC." />
          </div>
        </Section>

        <Section title="Progress Bars">
          <p className="text-xs text-muted-foreground mb-4">
            Labeled progress bars with per-bar color control. Value is clamped 0–100.
          </p>
          <div className="rounded-2xl p-6 border" style={{ background: "white", borderColor: "#E2E8F0" }}>
            <div className="flex flex-col gap-5">
              <ProgressBar label="Season progress"       value={75}  color="#697279" />
              <ProgressBar label="Registration complete" value={100} color="#00C853" />
              <ProgressBar label="Upload: kit assets"    value={45}  color="#BF1D2D" />
            </div>
          </div>
        </Section>

        <Section title="Badges & Tags">
          <p className="text-xs text-muted-foreground mb-4">
            Eight semantic variants built in. Pass <code className="bg-secondary px-1.5 py-0.5 rounded">bg</code>, <code className="bg-secondary px-1.5 py-0.5 rounded">color</code>, and <code className="bg-secondary px-1.5 py-0.5 rounded">border</code> props for custom one-offs.
          </p>
          <div className="rounded-2xl p-6 border" style={{ background: "white", borderColor: "#E2E8F0" }}>
            <div className="flex flex-wrap gap-3">
              <StatusBadge label="Live"      variant="live" />
              <StatusBadge label="Win"       variant="win" />
              <StatusBadge label="Postponed" variant="postponed" />
              <StatusBadge label="Loss"      variant="loss" />
              <StatusBadge label="Draw"      variant="draw" />
              <StatusBadge label="Cup"       variant="cup" />
              <StatusBadge label="Featured"  variant="featured" />
              <StatusBadge label="New"       variant="new" />
            </div>
          </div>
        </Section>

        <Section title="Empty State">
          <p className="text-xs text-muted-foreground mb-4">
            Centered illustration slot, title, description, and optional CTA button. Pass a custom <code className="bg-secondary px-1.5 py-0.5 rounded">icon</code> node to swap the default plus-circle SVG.
          </p>
          <EmptyState
            title="No matches scheduled"
            description="There are no upcoming matches for this team. Add a match to get started."
            cta="+ Schedule Match"
          />
        </Section>

      </div>
    </div>
  );
}
