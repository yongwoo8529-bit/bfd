import Image from "next/image"
import { WaveDivider } from "./wave-divider"

export function HeroSection() {
  return (
    <header className="relative overflow-hidden">
      <div className="relative h-56 w-full sm:h-64 md:h-72 lg:h-80">
        <Image
          src="/hero-banner.jpg"
          alt="BFD 카드 컬렉션 QR 스탬프 투어 배너"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>
      <WaveDivider colorClassName="text-background" />
    </header>
  )
}
