"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export interface Club {
  abbr: string
  name: string
  city: string
  color: string
  tier: "premier" | "elite" | "academy"
}

export interface ClubDirectoryProps {
  clubs: Club[]
  onViewClub?: (club: Club) => void
}

export function ClubDirectory({ clubs, onViewClub }: ClubDirectoryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {clubs.map((c) => (
        <Card key={c.abbr} className="bg-white border-[#E2E8F0] hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-4">
              <Avatar size="lg">
                <AvatarFallback className="text-white font-bold text-sm" style={{ background: c.color }}>
                  {c.abbr}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm text-[#091628] leading-tight">{c.name}</CardTitle>
                <p className="text-xs text-[#94A3B8] mt-0.5">{c.city}, NC</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Badge variant={c.tier} className="capitalize">{c.tier}</Badge>
          </CardContent>
          <CardFooter className="border-t border-[#F1F5F9] pt-3">
            <Button variant="ghost" size="sm" className="text-primary px-0 h-auto text-xs font-semibold" onClick={() => onViewClub?.(c)}>
              View Club →
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
