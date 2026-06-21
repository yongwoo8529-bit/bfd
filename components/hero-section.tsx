import Image from "next/image"
import Link from "next/link"
import { Compass, Sparkles } from "lucide-react"
import { WaveDivider } from "./wave-divider"

export function HeroSection() {
  return (
    <header className="relative overflow-hidden">
      <div className="relative w-full">
        {/* 배너 이미지 */}
        <div className="relative h-56 w-full sm:h-64 md:h-72 lg:h-80">
          <Image
            src="/hero-banner.jpg"
            alt="BFD 카드 컬렉션 QR 스탬프 투어 배너"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />

          {/* 텍스트 오버레이 — 좌측 영역 */}
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-3xl px-6 md:px-8">
              <div className="max-w-[55%]">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-[11px] font-bold tracking-wide text-[#1B2B5E] backdrop-blur-sm">
                  <Sparkles className="size-3.5" />
                  2026 선린 비즈쿨 이벤트
                </span>

                <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-[#1B2B5E] sm:text-3xl md:text-4xl">
                  모험중인 비곰이와 비비를
                  <br />
                  <span className="text-[#1565C0]">찾아라!</span>
                </h1>

                <p className="mt-2.5 max-w-xs break-keep text-xs leading-relaxed text-[#1B2B5E]/80 sm:text-sm">
                  교내 곳곳에 숨겨진 QR코드를 스캔하고<br className="hidden sm:block" />
                  특별한 보상을 받아가세요!
                </p>

                <Link
                  href="/collection"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1565C0] px-5 py-2.5 text-xs font-bold text-white shadow-md transition-transform active:translate-y-px sm:text-sm"
                >
                  <Compass className="size-3.5" />
                  QR 스탬프 찾으러 가기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WaveDivider colorClassName="text-background" />
    </header>
  )
}
