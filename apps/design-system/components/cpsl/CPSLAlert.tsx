import * as React from "react"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export type AlertSeverity = "info" | "success" | "warning" | "error"

export interface CPSLAlertProps {
  severity?: AlertSeverity
  title?: string
  children: React.ReactNode
  /** Show a dismiss X button */
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
}

const severityConfig: Record<
  AlertSeverity,
  { bg: string; border: string; icon: React.ReactNode; iconColor: string }
> = {
  info: {
    bg: "bg-[#EFF6FF]",
    border: "border-[#BFDBFE]",
    iconColor: "#697279",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
  },
  success: {
    bg: "bg-[#F0FDF4]",
    border: "border-[#BBF7D0]",
    iconColor: "#00C853",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  warning: {
    bg: "bg-[#FFFBEB]",
    border: "border-[#FDE68A]",
    iconColor: "#FFB300",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  error: {
    bg: "bg-[#FEF2F2]",
    border: "border-[#FECACA]",
    iconColor: "#FF1744",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
  },
}

/**
 * CPSLAlert
 *
 * Semantic alert component with CPSL severity styles.
 * Built on shadcn's Alert primitive.
 *
 * @example
 * <CPSLAlert severity="success" title="Registration Confirmed">
 *   Your club has been approved for the 2025–26 CPSL Premiership season.
 * </CPSLAlert>
 */
export function CPSLAlert({
  severity = "info",
  title,
  children,
  dismissible,
  onDismiss,
  className,
}: CPSLAlertProps) {
  const config = severityConfig[severity]

  return (
    <Alert
      data-slot="cpsl-alert"
      data-severity={severity}
      className={cn(
        "relative flex items-start gap-3 rounded-xl border px-4 py-3",
        config.bg,
        config.border,
        className
      )}
    >
      {/* Icon */}
      <span style={{ color: config.iconColor }} className="mt-0.5 shrink-0">
        {config.icon}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <AlertTitle className="text-sm font-semibold text-foreground mb-0.5">
            {title}
          </AlertTitle>
        )}
        <AlertDescription className="text-sm text-muted-foreground leading-snug">
          {children}
        </AlertDescription>
      </div>

      {/* Dismiss */}
      {dismissible && (
        <button
          onClick={onDismiss}
          className="shrink-0 size-5 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-black/10 transition-colors"
          aria-label="Dismiss"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </Alert>
  )
}
