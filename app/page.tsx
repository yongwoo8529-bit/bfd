"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, Images } from "lucide-react"
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

  // 방금 수집한 카드 객체
  const celebrateCard = justCollected
    ? CARDS.find((c) => c.id === justCollected) ?? null
    : null

  // QR코드 스캔 처리: URL의 ?card=ID 값을 읽어 자동 수집
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
      // 쿼리 파라미터 제거 (새로고침 시 중복 방지)
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

      <HowItWorks />

      <div ref={collectionRef} className="scroll-mt-4">
        <ProgressTracker
          count={count}
          total={CARDS.length}
          onClaimGift={() => count >= GIFT_MILESTONE && setReward("gift")}
          onClaimCoupon={() => count >= COUPON_MILESTONE && setReward("coupon")}
        />

        <section className="mx-auto max-w-3xl px-5 py-8">
          <Link
            href="/collection"
            className="group flex items-center gap-4 rounded-3xl bg-card p-5 shadow-md ring-1 ring-border transition active:scale-[0.99] hover:shadow-lg"
          >
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Images className="size-7" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold tracking-widest text-primary">TREASURE CARDS</p>
              <h2 className="text-lg font-extrabold text-foreground">보물 카드 컬렉션 보기</h2>
              <p className="truncate text-sm text-muted-foreground">
                {count}/{CARDS.length}장 수집 · 한 장씩 넘겨보기
              </p>
            </div>
            <ArrowRight className="size-5 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
          </Link>
        </section>
      </div>

      <footer className="mx-auto max-w-3xl px-5 pb-8 text-center">
        <p className="text-xs leading-relaxed text-muted-foreground">
          수집 기록은 이 기기에 안전하게 저장돼요. 운영 기간 내내 진행 상황이 유지됩니다.
          <br />
          2026 교내 비즈쿨 BFD 카드 컬렉션 이벤트 · 운영본부 문의 환영
        </p>
      </footer>

      <ScanBar onScan={() => setScannerOpen(true)} done={count >= CARDS.length} />

      {/* QR 스캐너 모달 */}
      <QRScannerModal
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
      />

      {/* 신규 수집 축하 모달 */}
      <CollectCelebration
        card={celebrateCard}
        count={count}
        total={CARDS.length}
        onClose={clearJustCollected}
      />

      {/* 보상 모달 */}
      <RewardModal type={reward} onClose={() => setReward(null)} />

      {/* 토스트 피드백 */}
      {toastMsg && (
        <div className="fixed bottom-28 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-800/95 px-5 py-2.5 text-xs font-bold text-white shadow-xl backdrop-blur-sm transition-all duration-300">
          {toastMsg}
        </div>
      )}
    </main>
  )
}
