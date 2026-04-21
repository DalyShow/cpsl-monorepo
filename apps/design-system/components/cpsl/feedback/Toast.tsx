"use client";
import { useState } from "react";

export interface ToastProps {
  icon: string;
  color: string;
  title: string;
  subtitle: string;
  /** Called when the dismiss button is clicked */
  onDismiss?: () => void;
}

export function Toast({ icon, color, title, subtitle, onDismiss }: ToastProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      className="rounded-xl px-4 py-3 border flex items-center gap-3 shadow-lg"
      style={{ background: "#0A1628", borderColor: "#1E2D45" }}
    >
      <span className="text-base" style={{ color }}>{icon}</span>
      <div>
        <div className="text-sm font-semibold text-white">{title}</div>
        <div className="text-xs" style={{ color: "#64748B" }}>{subtitle}</div>
      </div>
      <button
        onClick={handleDismiss}
        className="ml-2 text-xs"
        style={{ color: "#475569" }}
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  );
}
