"use client"

import Image from "next/image"
import { Lock, MapPin } from "lucide-react"
import { rarityLabel, type TreasureCard } from "@/lib/cards"

const rarityStyles: Record<
  TreasureCard["rarity"],
  { ring: string; badge: string; glow: string }
> = {
  normal: {
    ring: "ring-border",
    badge: "bg-secondary text-secondary-foreground",
    glow: "from-sky-100",
  },
  rare: {
    ring: "ring-primary/40",
    badge: "bg-primary text-primary-foreground",
    glow: "from-primary/15",
  },
  legend: {
    ring: "ring-accent",
    badge: "bg-accent text-accent-foreground",
    glow: "from-accent/25",
  },
}

export function TreasureCardItem({
  card,
  collected,
  onClick,
}: {
  card: TreasureCard
  collected: boolean
  onClick: () => void
}) {
  const styles = rarityStyles[card.rarity]

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative aspect-[3/4] w-full overflow-hidden rounded-2xl text-left ring-2 transition-all active:scale-[0.98] ${
        collected
          ? `${styles.ring} bg-card shadow-md hover:-translate-y-1 hover:shadow-lg`
          : "ring-border bg-secondary/50"
      }`}
      aria-label={
        collected
          ? `${card.name} 카드 (수집 완료)`
          : `${card.no}번 카드 (미수집) — ${card.spot}에서 찾아보세요`
      }
    >
      {/* card number */}
      <span
        className={`absolute left-2 top-2 z-10 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
          collected ? styles.badge : "bg-muted text-muted-foreground"
        }`}
      >
        No.{card.no}
      </span>

      {collected ? (
        <>
          <span className="absolute right-2 top-2 z-10 rounded-md bg-foreground/70 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-background">
            {rarityLabel[card.rarity]}
          </span>
          <div
            className={`absolute inset-0 bg-gradient-to-b ${styles.glow} to-transparent`}
          />
          <div className="relative flex h-full flex-col">
            <div className="relative flex-1">
              <Image
                src={card.image || "/placeholder.svg"}
                alt={card.name}
                fill
                sizes="(max-width: 768px) 45vw, 220px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="relative bg-card/95 px-2.5 py-2 backdrop-blur-sm">
              <p className="truncate text-sm font-extrabold text-foreground">
                {card.name}
              </p>
              <p className="truncate text-[11px] text-muted-foreground">
                {card.subtitle}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2 p-3 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <Lock className="size-5 text-muted-foreground" />
          </div>
          <p className="text-xs font-bold text-muted-foreground">??? 보물</p>
          <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-background px-2 py-1 text-[10px] font-semibold text-primary">
            <MapPin className="size-3" />
            {card.spot}
          </span>
        </div>
      )}
    </button>
  )
}
