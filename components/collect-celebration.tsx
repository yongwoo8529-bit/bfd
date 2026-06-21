"use client"

import Image from "next/image"
import { Sparkles } from "lucide-react"
import { type TreasureCard } from "@/lib/cards"
import { Modal } from "./modal"

export function CollectCelebration({
  card,
  count,
  total,
  onClose,
  onConfirm,
}: {
  card: TreasureCard | null
  count: number
  total: number
  onClose: () => void
  onConfirm?: () => void
}) {
  return (
    <Modal open={card !== null} onClose={onClose} labelledBy="celebrate-title">
      {card && (
        <div className="text-center">
          <p className="inline-flex items-center gap-1 text-xs font-bold tracking-widest text-primary">
            <Sparkles className="size-3.5" />
            보물 발견!
          </p>
          <h2
            id="celebrate-title"
            className="mt-1 text-2xl font-extrabold text-foreground"
          >
            새로운 카드를 획득했어요
          </h2>

          <div className="animate-float relative mx-auto mt-5 aspect-[3/4] w-40 overflow-hidden rounded-2xl shadow-xl ring-2 ring-accent">
            <Image
              src={card.image || "/placeholder.svg"}
              alt={`No.${card.no} 카드`}
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>

          <p className="mt-4 text-sm font-bold text-primary">
            {count} / {total}장 수집 완료
            {count < total ? ` · ${total - count}장 남았어요!` : " · 컴플리트!"}
          </p>

          <button
            type="button"
            onClick={onConfirm ?? onClose}
            className="mt-5 w-full rounded-full bg-accent py-3 text-sm font-bold text-accent-foreground transition-transform active:translate-y-px"
          >
            컬렉션에 보관하기
          </button>
        </div>
      )}
    </Modal>
  )
}
