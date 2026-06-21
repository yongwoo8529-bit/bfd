import Image from "next/image"
import Link from "next/link"
import { WaveDivider } from "./wave-divider"

export function HeroSection() {
  return (
    <header className="relative overflow-hidden">
      {/* 배너 전체를 링크로 감싸서 이미지 속 버튼 클릭 시 이동 */}
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
        </div>
      </Link>
      <WaveDivider colorClassName="text-background" />
    </header>
  )
}
