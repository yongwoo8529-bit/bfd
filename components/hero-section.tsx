import Image from "next/image"
import Link from "next/link"
import { WaveDivider } from "./wave-divider"

export function HeroSection() {
  return (
    <header className="relative overflow-hidden">
      <Link href="/collection" aria-label="QR 스탬프 찾으러 가기">
        <div className="relative w-full aspect-[16/5]">
          <Image
            src="/hero-banner.jpg"
            alt="BFD 카드 컬렉션 QR 스탬프 투어 배너"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* 텍스트 오버레이 */}
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-3xl px-6 md:px-8">
              <div className="max-w-[52%]">
                <h1 className="text-xl font-extrabold leading-tight tracking-tight text-[#1B2B5E] sm:text-2xl md:text-3xl lg:text-4xl">
                  모험중인 비곰이와
                  <br />
                  비비를 찾아라!
                </h1>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <WaveDivider colorClassName="text-background" />
    </header>
  )
}
