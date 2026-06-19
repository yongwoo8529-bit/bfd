"use client"

import { useCallback, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Lock, MapPin, QrCode } from "lucide-react"
import { CARDS, rarityLabel, type TreasureCard } from "@/lib/cards"

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
    ring: "ring-primary/50",
    badge: "bg-primary text-primary-foreground",
    glow: "from-primary/20",
  },
  legend: {
    ring: "ring-accent",
    badge: "bg-accent text-accent-foreground",
    glow: "from-accent/30",
  },
}

// 각 슬라이드가 차지하는 뷰포트 너비(%). 100보다 작아서 양옆 카드가 살짝 보인다.
const SLIDE_W = 76

export function CardCarousel({
  isCollected,
  onScan,
}: {
  isCollected: (id: string) => boolean
  onScan: () => void
}) {
  const [index, setIndex] = useState(0)
  const [drag, setDrag] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startX = useRef<number | null>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const total = CARDS.length

  const goTo = useCallback(
    (next: number) => {
      setIndex(Math.max(0, Math.min(total - 1, next)))
    },
    [total],
  )
  const prev = useCallback(() => goTo(index - 1), [goTo, index])
  const next = useCallback(() => goTo(index + 1), [goTo, index])

  // 마우스 + 터치 모두 지원하는 포인터 기반 드래그
  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX
    setDragging(true)
    try {
      ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
    } catch {
      /* 일부 환경에서 pointer capture 미지원 */
    }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (startX.current === null) return
    setDrag(e.clientX - startX.current)
  }
  const endDrag = () => {
    if (startX.current === null) return
    const width = viewportRef.current?.offsetWidth ?? 1
    const threshold = Math.min(60, width * 0.18)
    if (drag < -threshold) next()
    else if (drag > threshold) prev()
    setDrag(0)
    setDragging(false)
    startX.current = null
  }

  // 활성 슬라이드를 화면 중앙에 오도록 이동량 계산
  const offsetPct = (100 - SLIDE_W) / 2 - index * SLIDE_W

  return (
    <div className="w-full select-none">
      {/* 카운터 */}
      <div className="mb-3 flex items-center justify-center gap-2">
        <span className="rounded-full bg-card px-4 py-1.5 text-sm font-extrabold text-foreground shadow-sm ring-1 ring-border">
          <span className="text-primary">{index + 1}</span>
          <span className="text-muted-foreground"> / {total}</span>
        </span>
      </div>

      {/* 슬라이드 뷰포트 */}
      <div className="relative">
        <div
          ref={viewportRef}
          className="overflow-hidden touch-pan-y"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={() => {
            if (dragging) endDrag()
          }}
        >
          <div
            className="flex"
            style={{
              transform: `translateX(calc(${offsetPct}% + ${drag}px))`,
              transition: dragging ? "none" : "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {CARDS.map((card, i) => (
              <div
                key={card.id}
                className="shrink-0 px-2"
                style={{ width: `${SLIDE_W}%` }}
              >
                <Slide
                  card={card}
                  collected={isCollected(card.id)}
                  active={i === index}
                  onScan={onScan}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 좌우 화살표 */}
        <button
          type="button"
          onClick={prev}
          disabled={index === 0}
          aria-label="이전 카드"
          className="absolute left-1 top-[42%] flex -translate-y-1/2 items-center justify-center rounded-full bg-card/90 p-2 text-foreground shadow-md ring-1 ring-border transition disabled:opacity-30 hover:bg-card"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={next}
          disabled={index === total - 1}
          aria-label="다음 카드"
          className="absolute right-1 top-[42%] flex -translate-y-1/2 items-center justify-center rounded-full bg-card/90 p-2 text-foreground shadow-md ring-1 ring-border transition disabled:opacity-30 hover:bg-card"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* 점 인디케이터 */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {CARDS.map((card, i) => (
          <button
            key={card.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`${i + 1}번 카드로 이동`}
            className={`h-2 rounded-full transition-all ${
              i === index
                ? "w-6 bg-primary"
                : isCollected(card.id)
                  ? "w-2 bg-primary/40"
                  : "w-2 bg-border"
            }`}
          />
        ))}
      </div>

      <p className="mt-4 text-center text-xs font-medium text-muted-foreground">
        좌우로 밀어 카드를 넘겨보세요
      </p>
    </div>
  )
}

function Slide({
  card,
  collected,
  active,
  onScan,
}: {
  card: TreasureCard
  collected: boolean
  active: boolean
  onScan: () => void
}) {
  const styles = rarityStyles[card.rarity]

  // 좌우 카드는 작고 흐리게, 가운데 카드는 크고 또렷하게
  const scaleClass = active ? "scale-100 opacity-100" : "scale-90 opacity-50"

  // 미수집 카드: 사진 없이 자물쇠만
  if (!collected) {
    return (
      <article
        className={`mx-auto w-full overflow-hidden rounded-3xl bg-card ring-2 ring-border transition-all duration-300 ${scaleClass} ${
          active ? "shadow-xl" : "shadow-sm"
        }`}
      >
        <div className="relative aspect-square w-full">
          <span className="absolute left-4 top-4 z-10 rounded-lg bg-muted px-2.5 py-1 text-xs font-extrabold text-muted-foreground">
            No.{card.no}
          </span>
          <div className="flex h-full flex-col items-center justify-center gap-4 bg-secondary/40 p-6 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-muted">
              <Lock className="size-9 text-muted-foreground" />
            </div>
            <p className="text-lg font-extrabold text-muted-foreground">??? 보물</p>
          </div>
        </div>
        <div className="px-5 py-5 text-center">
          <p className="text-sm leading-relaxed text-muted-foreground">
            아직 찾지 못한 보물이에요.
            <br />
            QR코드를 스캔하면 카드가 공개됩니다.
          </p>
          <button
            type="button"
            onClick={onScan}
            className="mt-4 inline-flex items-center justify-center gap-2 w-full rounded-2xl bg-primary py-2.5 text-xs font-bold text-primary-foreground shadow-md transition active:scale-98 hover:bg-primary/95"
          >
            <QrCode className="size-3.5" />
            QR 스캔하기
          </button>
        </div>
      </article>
    )
  }

  // 수집 카드: 사진 + 정보(이름/설명/위치)를 항상 표시
  return (
    <article
      className={`mx-auto block w-full overflow-hidden rounded-3xl bg-card ring-2 transition-all duration-300 ${styles.ring} ${scaleClass} ${
        active ? "shadow-xl" : "shadow-sm"
      }`}
    >
      <div className="relative aspect-square w-full">
        <span
          className={`absolute left-4 top-4 z-20 rounded-lg px-2.5 py-1 text-xs font-extrabold ${styles.badge}`}
        >
          No.{card.no}
        </span>
        <span className="absolute right-4 top-4 z-20 rounded-lg bg-foreground/75 px-2.5 py-1 text-[10px] font-bold tracking-wider text-background">
          {rarityLabel[card.rarity]}
        </span>

        {/* 사진 */}
        <div className={`absolute inset-0 bg-gradient-to-b ${styles.glow} to-transparent`} />
        <Image
          src={card.image || "/placeholder.svg"}
          alt={card.name}
          fill
          sizes="(max-width: 640px) 70vw, 320px"
          className="object-cover"
          priority={active}
          draggable={false}
        />
      </div>

      {/* 상세 정보 (항상 표시) */}
      <div className="px-5 py-4">
        <h3 className="text-xl font-extrabold leading-tight text-foreground text-balance">
          {card.name}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
          {card.subtitle}
        </p>
        <div className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
          <MapPin className="size-3.5" />
          {card.spot}에서 발견
        </div>
      </div>
    </article>
  )
}
