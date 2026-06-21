"use client"

import { Gift, Ticket, Check } from "lucide-react"
import { COUPON_MILESTONE, GIFT_MILESTONE } from "@/lib/cards"

interface ProgressTrackerProps {
  count: number
  total: number
  onClaimGift: () => void
  onClaimCoupon: () => void
}

export function ProgressTracker({
  count,
  total,
  onClaimGift,
  onClaimCoupon,
}: ProgressTrackerProps) {
  const pct = Math.min(100, Math.round((count / total) * 100))
  const giftReached = count >= GIFT_MILESTONE
  const couponReached = count >= COUPON_MILESTONE

  return (
    <section
      className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur-md"
      aria-label="수집 진행 현황"
    >
      <div className="mx-auto max-w-3xl px-5 py-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-bold tracking-widest text-primary">
              MY COLLECTION
            </p>
            <p className="text-2xl font-extrabold text-foreground">
              {count}
              <span className="text-base font-bold text-muted-foreground">
                {" "}
                / {total}장 수집
              </span>
            </p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-extrabold text-primary">{pct}%</span>
          </div>
        </div>

        {/* progress bar with milestone markers */}
        <div className="relative mt-3">
          <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-300 via-primary to-primary transition-[width] duration-700 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          {/* milestone dots */}
          <Milestone position={(GIFT_MILESTONE / total) * 100} active={giftReached} />
          <Milestone position={(COUPON_MILESTONE / total) * 100} active={couponReached} />
        </div>

        {/* reward chips */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <RewardChip
            icon={<Gift className="size-4" />}
            label="4장 달성"
            reward="소정의 상품"
            reached={giftReached}
            remaining={GIFT_MILESTONE - count}
            onClaim={onClaimGift}
            tone="accent"
          />
          <RewardChip
            icon={<Ticket className="size-4" />}
            label="7장 완성"
            reward="BFD 최종 특별 보상"
            reached={couponReached}
            remaining={COUPON_MILESTONE - count}
            onClaim={onClaimCoupon}
            tone="coral"
          />
        </div>
      </div>
    </section>
  )
}

function Milestone({ position, active }: { position: number; active: boolean }) {
  return (
    <div
      className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${position}%` }}
    >
      <div
        className={`flex size-5 items-center justify-center rounded-full border-2 transition-colors ${
          active
            ? "border-background bg-accent text-accent-foreground"
            : "border-background bg-muted-foreground/40 text-background"
        }`}
      >
        {active && <Check className="size-3" strokeWidth={3} />}
      </div>
    </div>
  )
}

function RewardChip({
  icon,
  label,
  reward,
  reached,
  remaining,
  onClaim,
  tone,
}: {
  icon: React.ReactNode
  label: string
  reward: string
  reached: boolean
  remaining: number
  onClaim: () => void
  tone: "accent" | "coral"
}) {
  const toneRing = tone === "coral" ? "text-coral" : "text-accent-foreground"
  return (
    <button
      type="button"
      onClick={reached ? onClaim : undefined}
      disabled={!reached}
      className={`flex flex-col items-start gap-1 rounded-2xl border p-3 text-left transition-all ${
        reached
          ? "border-primary/30 bg-card shadow-sm hover:-translate-y-0.5"
          : "cursor-default border-dashed border-border bg-secondary/40"
      }`}
    >
      <span className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
        <span className={reached ? toneRing : "text-muted-foreground"}>{icon}</span>
        {label}
      </span>
      <span className="text-sm font-extrabold text-foreground">{reward}</span>
      <span
        className={`mt-0.5 text-[11px] font-semibold ${
          reached ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {reached ? "받기 가능 · 터치하여 확인" : `${remaining}장 더 모으면 달성`}
      </span>
    </button>
  )
}
