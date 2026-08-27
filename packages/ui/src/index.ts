export { cn } from "./lib/utils";

export { Button, buttonVariants } from "./components/button";
export type { ButtonProps } from "./components/button";

export { Input } from "./components/input";

export { TopNav } from "./components/top-nav";
export type { TopNavProps, TopNavItem } from "./components/top-nav";
export { TopNavSliding } from "./components/top-nav-sliding";

export { SubNav } from "./components/sub-nav";
export type { SubNavProps, SubNavItem } from "./components/sub-nav";

export { LogoTicker } from "./components/logo-ticker";
export type { LogoTickerProps, LogoTickerLogo } from "./components/logo-ticker";

export { FlyoutMenu } from "./components/flyout-menu";
export type {
  FlyoutMenuProps,
  FlyoutItem,
  FlyoutAction,
} from "./components/flyout-menu";

export {
  PhotoTile,
  PromoTile,
  GraphicTile,
  PromoGrid,
  PromoHero,
  PromoReveal,
} from "./components/promo-tiles";

export { DualPanel } from "./components/dual-panel";
export type { DualPanelProps, DualPanelItem } from "./components/dual-panel";
export type {
  PhotoTileProps,
  PromoTileProps,
  GraphicTileProps,
  PromoGridProps,
  PromoHeroProps,
  RevealVariant,
} from "./components/promo-tiles";

export { FAQAccordion } from "./components/faq-accordion";
export type {
  FAQAccordionProps,
  FAQAccordionBackground,
  FAQItem,
  FAQAnswer,
} from "./components/faq-accordion";

export { ArrowPillButton } from "./components/arrow-pill-button";
export type {
  ArrowPillButtonProps,
  ArrowPillTone,
  ArrowPillSize,
} from "./components/arrow-pill-button";

export { HeroBento } from "./components/hero-bento";
export type {
  HeroBentoProps,
  HeroBentoBadge,
  HeroBentoBadgeTone,
  HeroBentoSectionBackground,
} from "./components/hero-bento";

export { ScrollReveal } from "./components/scroll-reveal";
export type { ScrollRevealProps } from "./components/scroll-reveal";

export { AlertBar } from "./components/alert-bar";
export type { AlertBarProps, AlertBarTone } from "./components/alert-bar";

// ── League calendar (mockup v1) ──────────────────────────────────────────────
export {
  MatchCard,
  WeekendSection,
  LeagueCalendarFilters,
  DEFAULT_FILTER_VALUE,
  defaultFilterValue,
  upcomingSaturdayISO,
  isFiltered,
  CalendarEmptyState,
} from "./components/league-calendar";
export type {
  MatchCardProps,
  WeekendSectionProps,
  LeagueCalendarFiltersProps,
  LeagueCalendarFilterValue,
  CalendarEmptyStateProps,
  CalendarClub,
  CalendarMatch,
  CalendarWeekend,
  Competition,
  AgeGroup,
} from "./components/league-calendar";
