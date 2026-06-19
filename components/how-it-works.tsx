import { QrCode, MapPin, Layers, Gift } from "lucide-react"

const STEPS = [
  {
    icon: MapPin,
    title: "BFD QR 부스를 찾아요",
    desc: "교내 곳곳에 지정된 7개의 BFD QR 장소를 찾아 떠나세요.",
  },
  {
    icon: QrCode,
    title: "QR코드를 스캔해요",
    desc: "각 장소에 부착된 QR코드를 휴대폰 카메라로 스캔하면 카드가 즉시 수집돼요.",
  },
  {
    icon: Layers,
    title: "카드를 모아요",
    desc: "수집한 카드는 기기에 안전하게 저장돼요. 실시간 진행률을 확인하세요.",
  },
  {
    icon: Gift,
    title: "보상을 받아요",
    desc: "4장을 모으면 중간 보상(소정의 상품), 7장을 모두 모으면 특별 최종 보상을 드려요.",
  },
]

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-10" aria-labelledby="how-title">
      <div className="text-center">
        <p className="text-xs font-bold tracking-widest text-primary">
          HOW IT WORKS
        </p>
        <h2 id="how-title" className="mt-1 text-2xl font-extrabold text-foreground">
          보물찾기, 이렇게 진행돼요
        </h2>
      </div>

      <ol className="mt-7 grid gap-4 sm:grid-cols-2">
        {STEPS.map((step, i) => {
          const Icon = step.icon
          return (
            <li
              key={step.title}
              className="relative flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <Icon className="size-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-primary">
                    STEP {i + 1}
                  </span>
                </div>
                <h3 className="mt-0.5 font-bold text-foreground">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
