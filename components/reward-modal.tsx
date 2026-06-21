"use client"

import { Gift, Ticket, Sparkles } from "lucide-react"
import { Modal } from "./modal"

export type RewardType = "gift" | "coupon" | null

export function RewardModal({
  type,
  onClose,
}: {
  type: RewardType
  onClose: () => void
}) {
  const isCoupon = type === "coupon"

  return (
    <Modal open={type !== null} onClose={onClose} labelledBy="reward-title">
      <div className="text-center">
        <div
          className={`mx-auto flex size-16 items-center justify-center rounded-2xl ${
            isCoupon
              ? "bg-coral text-coral-foreground"
              : "bg-accent text-accent-foreground"
          }`}
        >
          {isCoupon ? (
            <Ticket className="size-8" />
          ) : (
            <Gift className="size-8" />
          )}
        </div>

        <p className="mt-4 inline-flex items-center gap-1 text-xs font-bold tracking-widest text-primary">
          <Sparkles className="size-3.5" />
          {isCoupon ? "7장 완성 보상" : "4장 달성 보상"}
        </p>

        <h2 id="reward-title" className="mt-1 text-2xl font-extrabold text-foreground">
          {isCoupon ? "축하합니다! 🎉" : "보상 획득!"}
        </h2>

        {isCoupon ? (
          <>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              모든 BFD 카드를 모았어요! 운영본부에 이 화면을 보여주시면{" "}
              <strong className="text-foreground">BFD 최종 특별 보상</strong>을 지급해 드립니다.
            </p>
            <p className="mt-3 text-[11px] text-muted-foreground">
              운영본부에 이 화면을 보여주시면 보상을 등록해 드립니다.
            </p>
          </>
        ) : (
          <>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              카드 4장을 모았어요! 운영본부에 이 화면을 보여주고{" "}
              <strong className="text-foreground">소정의 중간 상품</strong>을 받아가세요.
            </p>
            <div className="mt-4 rounded-2xl border-2 border-dashed border-accent/60 bg-accent/10 p-4">
              <p className="text-sm font-extrabold text-foreground">
                🎁 4장 달성 기념품 교환권
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                선착순 소진 시 조기 마감될 수 있어요.
              </p>
            </div>
          </>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground transition-transform active:translate-y-px"
        >
          확인
        </button>
      </div>
    </Modal>
  )
}
