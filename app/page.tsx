"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Images } from "lucide-react"
import { CARDS, COUPON_MILESTONE, GIFT_MILESTONE } from "@/lib/cards"
import { useCollection } from "@/lib/use-collection"
import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { ProgressTracker } from "@/components/progress-tracker"
import { ScanBar } from "@/components/scan-bar"
import { RewardModal, type RewardType } from "@/components/reward-modal"
import { CollectCelebration } from "@/components/collect-celebration"
import { QRScannerModal } from "@/components/qr-scanner-modal"

export default function Page() {
  const router = useRouter()
  const {
    count,
    hydrated,
    isCollected,
    collect,
    justCollected,
    clearJustCollected,
  } = useCollection()

  const [reward, setReward] = useState<RewardType>(null)
  const [scannerOpen, setScannerOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const collectionRef = useRef<HTMLDivElement>(null)

  const celebrateCard = justCollected
    ? CARDS.find((c) => c.id === justCollected) ?? null
    : null

  useEffect(() => {
    if (!hydrated) return
    const params = new URLSearchParams(window.location.search)
    const cardId = params.get("card")
    if (cardId) {
      const result = collect(cardId)
      if (result === "duplicate") {
        setToastMsg("이미 수집한 카드입니다")
        setTimeout(() => setToastMsg(null), 2500)
      } else if (result === "invalid") {
        setToastMsg("유효하지 않은 QR 코드입니다")
        setTimeout(() => setToastMsg(null), 2500)
      }
      const url = new URL(window.location.href)
      url.searchParams.delete("card")
      window.history.replaceState({}, "", url.toString())
    }
  }, [hydrated, collect])

  const handleScanSuccess = useCallback((id: string) => {
    const result = collect(id)
    if (result === "duplicate") {
      setToastMsg("이미 수집한 카드입니다")
      setTimeout(() => setToastMsg(null), 2500)
    } else if (result === "invalid") {
      setToastMsg("유효하지 않은 QR 코드입니다")
      setTimeout(() => setToastMsg(null), 2500)
    }
  }, [collect])

  return (
    <main className="min-h-screen bg-background pb-28">
      <HeroSection />

      {/* 보물 카드 컬렉션 보기 버튼 */}
      <div className="mx-auto max-w-md px-4 pt-6 pb-2">
        <div className="flex items-center gap-2 rounded-full border border-border bg-card/95 p-2 shadow-xl backdrop-blur-md">
          <Link
            href="/collection"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground transition-transform active:translate-y-px"
          >
            <Images className="size-4" />
            보물 카드 컬렉션 보기
          </Link>
        </div>
      </div>

      <HowItWorks />

      <div ref={collectionRef} className="scroll-mt-4">
        <ProgressTracker
          count={count}
          total={CARDS.length}
          onClaimGift={() => count >= GIFT_MILESTONE && setReward("gift")}
          onClaimCoupon={() => count >= COUPON_MILESTONE && setReward("coupon")}
        />
      </div>

      <footer className="mx-auto max-w-3xl px-5 pb-8 text-center">
        <p className="text-xs leading-relaxed text-muted-foreground">
          수집 기록은 이 기기에 안전하게 저장돼요. 운영 기간 내내 진행 상황이 유지됩니다.
          <br />
          2026 교내 비즈쿨 BFD 카드 컬렉션 이벤트 · 운영본부 문의 환영
        </p>
      </footer>

      <ScanBar onScan={() => setScannerOpen(true)} done={count >= CARDS.length} />

      <QRScannerModal
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
      />

      <CollectCelebration
        card={celebrateCard}
        count={count}
        total={CARDS.length}
        onClose={clearJustCollected}
        onConfirm={() => { clearJustCollected(); router.push("/collection") }}
      />

      <RewardModal type={reward} onClose={() => setReward(null)} />

      {toastMsg && (
        <div className="fixed bottom-28 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-800/95 px-5 py-2.5 text-xs font-bold text-white shadow-xl backdrop-blur-sm transition-all duration-300">
          {toastMsg}
        </div>
      )}
    </main>
  )
}
