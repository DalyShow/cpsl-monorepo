import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export type SkeletonVariant = "card-grid" | "table" | "card-grid-table"

export interface SkeletonLoaderProps {
  variant?: SkeletonVariant
  cardCount?: number
  tableRows?: number
}

export function SkeletonLoader({ variant = "card-grid-table", cardCount = 3, tableRows = 4 }: SkeletonLoaderProps) {
  return (
    <div className="flex flex-col gap-4">
      {(variant === "card-grid" || variant === "card-grid-table") && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {Array.from({ length: cardCount }).map((_, i) => (
            <Card key={i} className="bg-white border-[#E2E8F0]">
              <CardContent className="pt-5">
                <Skeleton className="h-32 w-full rounded-lg mb-4" />
                <div className="flex items-center gap-3 mb-3">
                  <Skeleton className="w-9 h-9 rounded-full shrink-0" />
                  <div className="flex-1">
                    <Skeleton className="h-3.5 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
                <Skeleton className="h-3 w-full mb-2" />
                <Skeleton className="h-3 w-5/6" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {(variant === "table" || variant === "card-grid-table") && (
        <div className="rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden">
          <div className="px-5 py-3 border-b border-[#E2E8F0]" style={{ background: "#F4F6FA" }}>
            <Skeleton className="h-3 w-48" />
          </div>
          {Array.from({ length: tableRows }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3.5 border-b border-[#F1F5F9]">
              <Skeleton className="w-6 h-6 rounded-full shrink-0" />
              <Skeleton className="h-3 flex-1" />
              <Skeleton className="h-3 w-8" />
              <Skeleton className="h-3 w-8" />
              <Skeleton className="h-3 w-8" />
              <Skeleton className="h-5 w-10 rounded-md" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
