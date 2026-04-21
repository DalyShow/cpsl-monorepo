"use client";
import { useState } from "react";

export type AlertType = "success" | "warning" | "error" | "info";

export interface AlertBannerProps {
  type: AlertType;
  title: string;
  message: string;
  /** Show a dismiss (✕) button that hides the banner */
  dismissible?: boolean;
}

const ALERT_STYLES: Record<AlertType, { bg: string; border: string; color: string; icon: string }> = {
  success: { bg: "#E8FFF2", border: "#A7F3D0", color: "#00875A", icon: "✓" },
  warning: { bg: "#FFF8E1", border: "#FFE082", color: "#E65100", icon: "⚠" },
  error:   { bg: "#FFF0F0", border: "#FFC5CC", color: "#FF1744", icon: "✕" },
  info:    { bg: "#E3F2FD", border: "#90CAF9", color: "#697279", icon: "ℹ" },
};

export function AlertBanner({ type, title, message, dismissible = true }: AlertBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const { bg, border, color, icon } = ALERT_STYLES[type];

  if (dismissed) return null;

  return (
    <div
      className="flex items-start gap-3 px-5 py-4 rounded-xl border"
      style={{ background: bg, borderColor: border }}
    >
      <span className="font-bold text-base mt-0.5 flex-shrink-0" style={{ color }}>{icon}</span>
      <div className="flex-1">
        <span className="text-sm font-bold" style={{ color }}>{title}: </span>
        <span className="text-sm" style={{ color }}>{message}</span>
      </div>
      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          className="text-sm flex-shrink-0"
          style={{ color, opacity: 0.6 }}
          aria-label="Dismiss"
        >
          ✕
        </button>
      )}
    </div>
  );
}
