"use client";

// Thin re-export of the canonical FlyoutMenu from @cpsl/ui.
// Source of truth: packages/ui/src/components/flyout-menu.tsx.
// Edit the component there; this file exists so legacy imports
// (@/components/cpsl/navigation/FlyoutMenu) continue to resolve.

export {
  FlyoutMenu,
  type FlyoutMenuProps,
  type FlyoutItem,
  type FlyoutAction,
} from "@cpsl/ui";
