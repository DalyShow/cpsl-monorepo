/**
 * CPSL Design System — Component Library
 * ─────────────────────────────────────────────────────────────────────────────
 * Public API for all design system components. Import from here in your
 * application code rather than reaching into sub-directories directly.
 *
 * @example
 * import { Button, Badge, ScoreboardWidget, MatchCard } from "@/components"
 *
 * Version: 1.0.0
 * Docs: https://cpsl-design-system.vercel.app
 */

// ── shadcn/ui primitives (with CPSL token overrides) ─────────────────────────
export { Button, buttonVariants } from "@/components/ui/button"
export type { ButtonProps } from "@/components/ui/button"

export { Badge, badgeVariants } from "@/components/ui/badge"
export type { BadgeProps } from "@/components/ui/badge"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

export { Input } from "@/components/ui/input"
export { Label } from "@/components/ui/label"
export { Textarea } from "@/components/ui/textarea"
export { Checkbox } from "@/components/ui/checkbox"
export { Switch } from "@/components/ui/switch"
export { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
export { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
export { Separator } from "@/components/ui/separator"
export { Skeleton } from "@/components/ui/skeleton"
export { Progress } from "@/components/ui/progress"
export { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export { Toaster } from "@/components/ui/sonner"

// ── CPSL composite & branded components ──────────────────────────────────────
export { ScoreboardWidget } from "@/components/cpsl/ScoreboardWidget"
export type { ScoreboardWidgetProps, TeamScore, MatchStatus } from "@/components/cpsl/ScoreboardWidget"

export { MatchCard } from "@/components/cpsl/MatchCard"
export type { MatchCardProps } from "@/components/cpsl/MatchCard"

export { StandingsTable } from "@/components/cpsl/StandingsTable"
export type { StandingsTableProps, StandingsRow } from "@/components/cpsl/StandingsTable"

export { StatCard } from "@/components/cpsl/StatCard"
export type { StatCardProps } from "@/components/cpsl/StatCard"

export { CPSLAvatar, AvatarGroup } from "@/components/cpsl/CPSLAvatar"
export type { CPSLAvatarProps, AvatarGroupProps, AvatarStatus, AvatarSize } from "@/components/cpsl/CPSLAvatar"

export { CPSLAlert } from "@/components/cpsl/CPSLAlert"
export type { CPSLAlertProps, AlertSeverity } from "@/components/cpsl/CPSLAlert"

export { CPSLInput } from "@/components/cpsl/CPSLInput"
export type { CPSLInputProps } from "@/components/cpsl/CPSLInput"

export { LogoTicker } from "@/components/cpsl/modules/LogoTicker"
export type { LogoTickerProps, LogoTickerItem } from "@/components/cpsl/modules/LogoTicker"

// ── Utility ───────────────────────────────────────────────────────────────────
export { cn } from "@/lib/utils"
