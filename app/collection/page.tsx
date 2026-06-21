"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { CARDS, COUPON_MILESTONE, GIFT_MILESTONE } from "@/lib/cards"
import { useCollection } from "@/lib/use-collection"
import { ProgressTracker } from "@/components/progress-tracker"
import { CardCarousel } from "@/components/card-carousel"
import { RewardModal, type RewardType } from "@/components/reward-modal"
import { WaveDivider } from "@/components/wave-divider"
import { QRScannerModal } from "@/components/qr-scanner-modal"

export default function CollectionPage() {
  const { count, isCollected, collect } = useCollection()
  const [reward, setReward] = useState<RewardType>(null)
  const [scannerOpen, setScannerOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState<string | null>(null)

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
    <main className="min-h-screen bg-background pb-16">
      {/* 컬렉션 헤더 배너 */}
      <header className="relative overflow-hidden">
        <div className="relative h-52 w-full md:h-64">
          <Image
            src="/collection-banner.png"
            alt="수박처럼 시원한 하루 배너"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* 뒤로가기 */}
          <Link
            href="/"
            aria-label="홈으로 돌아가기"
            className="absolute left-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/70 text-slate-800 shadow-md backdrop-blur-sm transition active:scale-95"
          >
            <ChevronLeft className="size-5" />
          </Link>
        </div>
        <WaveDivider colorClassName="text-background" />
      </header>

      <ProgressTracker
        count={count}
        total={CARDS.length}
        onClaimGift={() => count >= GIFT_MILESTONE && setReward("gift")}
        onClaimCoupon={() => count >= COUPON_MILESTONE && setReward("coupon")}
      />

      <section className="mx-auto max-w-3xl px-4 py-6">
        <p className="mb-5 text-center text-sm leading-relaxed text-muted-foreground text-pretty">
          좌우로 밀어 카드를 한 장씩 넘겨보세요. 수집한 카드는 사진과 발견 위치가, 아직 못 찾은 카드는 잠금 상태로 표시됩니다.
        </p>
        <CardCarousel isCollected={isCollected} onScan={() => setScannerOpen(true)} />
      </section>

      <RewardModal type={reward} onClose={() => setReward(null)} />

      {/* QR 스캐너 모달 */}
      <QRScannerModal
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
      />

      {/* 토스트 피드백 */}
      {toastMsg && (
        <div className="fixed bottom-28 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-800/95 px-5 py-2.5 text-xs font-bold text-white shadow-xl backdrop-blur-sm transition-all duration-300">
          {toastMsg}
        </div>
      )}
    </main>
  )
}
