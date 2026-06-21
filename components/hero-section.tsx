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
            alt="모험중인 비곰이와 비비를 찾아라 배너"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </Link>
      <WaveDivider colorClassName="text-background" />
    </header>
  )
}
