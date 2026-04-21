"use client";

// Thin re-export of the canonical LogoTicker from @cpsl/ui.
// Source of truth: packages/ui/src/components/logo-ticker.tsx.
// Edit the component there; this file exists so legacy imports
// (@/components/cpsl/modules/LogoTicker) continue to resolve.

export {
  LogoTicker,
  type LogoTickerProps,
  type LogoTickerLogo,
} from "@cpsl/ui";
