"use client"

import { QrCode } from "lucide-react"

export function ScanBar({
  onScan,
  done,
}: {
  onScan: () => void
  done: boolean
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2">
      <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-border bg-card/95 p-2 shadow-xl backdrop-blur-md">
        <button
          type="button"
          onClick={onScan}
          disabled={done}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground transition-transform active:translate-y-px disabled:opacity-50"
        >
          <QrCode className="size-4" />
          {done ? "모든 카드 수집 완료!" : "QR 스캔하기"}
        </button>
      </div>
    </div>
  )
}
