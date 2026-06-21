import Image from "next/image"
import { WaveDivider } from "./wave-divider"

export function HeroSection() {
  return (
    <header className="relative overflow-hidden">
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
      <WaveDivider colorClassName="text-background" />
    </header>
  )
}
