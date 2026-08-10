"use client";

export interface CalendarEmptyStateProps {
  /** Shown as the primary line. */
  message?:     string;
  /** Called when the user clicks the reset button. If not provided, no button renders. */
  onReset?:     () => void;
  resetLabel?:  string;
}

export function CalendarEmptyState({
  message    = "No matches match those filters.",
  onReset,
  resetLabel = "Clear filters",
}: CalendarEmptyStateProps) {
  return (
    <div
      role="status"
      style={{
        border:         "1px dashed #1E2D45",
        padding:        "48px 24px",
        textAlign:      "center",
        color:          "#94A3B8",
      }}
    >
      <p
        style={{
          margin:         "0 0 4px",
          fontFamily:     "'Barlow Condensed', sans-serif",
          fontWeight:     700,
          fontSize:       20,
          letterSpacing:  "0.02em",
          textTransform:  "uppercase",
          color:          "#F4EFE6",
        }}
      >
        {message}
      </p>
      <p
        style={{
          margin:     "0 0 16px",
          fontFamily: "Inter, sans-serif",
          fontSize:   13,
          color:      "#7A9BAA",
        }}
      >
        Try loosening a filter — or reset all of them.
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          style={{
            appearance:     "none",
            border:         "1px solid #D4B949",
            padding:        "8px 18px",
            background:     "transparent",
            color:          "#D4B949",
            fontFamily:     "'Barlow Condensed', sans-serif",
            fontWeight:     700,
            fontSize:       12,
            letterSpacing:  "0.14em",
            textTransform:  "uppercase",
            borderRadius:   6,
            cursor:         "pointer",
          }}
        >
          {resetLabel}
        </button>
      )}
    </div>
  );
}
