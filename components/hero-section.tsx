import Link from "next/link"
import { Compass, Sparkles } from "lucide-react"
import { WaveDivider } from "./wave-divider"

export function HeroSection() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-b from-[#4A6FD4] via-[#3D5AA8] to-[#2B3F7E] text-primary-foreground">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -top-8 right-6 size-28 rounded-full bg-blue-400/30 blur-2xl md:size-40" />
      <div className="pointer-events-none absolute top-10 left-8 size-3 rounded-full bg-primary-foreground/30" />
      <div className="pointer-events-none absolute top-24 left-24 size-2 rounded-full bg-primary-foreground/20" />
      <div className="pointer-events-none absolute top-16 right-40 size-2 rounded-full bg-primary-foreground/20" />

      <div className="relative mx-auto max-w-2xl px-5 pt-12 pb-20 text-center md:pt-16">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold tracking-wide backdrop-blur-sm">
          <Sparkles className="size-3.5" />
          2026 선린 비즈쿨 이벤트
        </span>

        {/* logo */}
        <div className="mx-auto mt-6 flex justify-center">
          <img src="/bfd-logo-new.png" alt="BFD Logo" className="h-16 object-contain" />
        </div>

        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-balance md:text-5xl">
          BFD 카드 컬렉션
          <br />
          <span className="text-accent">QR 스탬프 투어</span>
        </h1>

        <p className="mx-auto mt-4 max-w-md break-keep text-pretty text-sm leading-relaxed text-primary-foreground/90 md:text-base">
          교내 곳곳에 숨겨진 7개의 QR코드를 스캔하여 카드를 수집해 보세요. 7장 완성을 목표로 도전하세요!
        </p>

        <Link
          href="/collection"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-lg shadow-[#3D5AA8]/30 transition-transform active:translate-y-px"
        >
          <Compass className="size-4" />
          내 카드 컬렉션 보기
        </Link>
      </div>

      <WaveDivider colorClassName="text-background" />
    </header>
  )
}
