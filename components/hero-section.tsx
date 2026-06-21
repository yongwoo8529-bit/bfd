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
            alt="BFD 여름 이벤트 배너"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* 원본 이미지 텍스트('BFD 카드 컬렉션 / QR 스탬프 투어') 가리기 */}
          <div
            className="absolute"
            style={{
              left: "0%",
              top: "10%",
              width: "52%",
              height: "72%",
              background: "linear-gradient(to right, #c4eaf8 70%, transparent 100%)",
            }}
          />

          {/* 새 텍스트 */}
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
              <div className="max-w-[50%]">
                <h1 className="text-lg font-extrabold leading-snug tracking-tight text-[#1B2B5E] sm:text-xl md:text-2xl lg:text-3xl">
                  모험중인 비곰이와
                  <br />
                  <span className="text-[#1565C0]">비비를 찾아라!</span>
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
