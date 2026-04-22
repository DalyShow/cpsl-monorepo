import { draftMode } from "next/headers";

/**
 * Renders a thin banner at the very top of the page when draft mode
 * is enabled, with a link that flips draft mode off. Lets editors
 * confirm at a glance whether they're looking at drafts or the
 * published site — and escape back to published whenever they want.
 *
 * Safe to include on every layout: it returns null outside draft mode.
 */
export async function DraftPreviewBanner() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: "8px 16px",
        background: "#D4B949",
        color: "#041124",
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 700,
        fontSize: 12,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
    >
      <span>Draft Preview — showing unpublished changes</span>
      <a
        href="/api/draft/disable"
        style={{
          color: "#041124",
          textDecoration: "underline",
          fontWeight: 700,
        }}
      >
        Exit Preview
      </a>
    </div>
  );
}
