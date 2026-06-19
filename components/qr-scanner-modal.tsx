"use client"

import { useEffect, useRef, useState } from "react"
import jsQR from "jsqr"
import { X } from "lucide-react"

interface QRScannerModalProps {
  isOpen: boolean
  onClose: () => void
  onScanSuccess: (cardId: string) => void
}

export function QRScannerModal({ isOpen, onClose, onScanSuccess }: QRScannerModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animFrameIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isOpen) return

    setErrorMsg(null)
    let active = true

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        if (!active) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.setAttribute("playsinline", "true") // Required for iOS Safari
          videoRef.current.play().catch(() => {
            /* Handled auto-play blocks */
          })
        }
        animFrameIdRef.current = requestAnimationFrame(scanFrame)
      })
      .catch((err) => {
        console.error("Camera access failed:", err)
        setErrorMsg("카메라 권한이 필요하거나 카메라를 지원하지 않는 브라우저입니다.")
      })

    function scanFrame() {
      const video = videoRef.current
      const canvas = canvasRef.current
      if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const code = jsQR(imgData.data, imgData.width, imgData.height)
          if (code) {
            const match = code.data.match(/[?&]card=(\d+)/)
            if (match) {
              onScanSuccess(match[1])
              cleanup()
              onClose()
              return
            }
          }
        }
      }
      if (active) {
        animFrameIdRef.current = requestAnimationFrame(scanFrame)
      }
    }

    function cleanup() {
      active = false
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current)
        animFrameIdRef.current = null
      }
    }

    return () => {
      cleanup()
    }
  }, [isOpen, onClose, onScanSuccess])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-[max(2.5rem,env(safe-area-inset-top))] pb-4 text-white">
        <span className="text-sm font-semibold tracking-wide opacity-90">
          QR 코드를 네모 안에 맞춰주세요
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="rounded-full bg-white/10 p-2 text-white transition active:scale-95 hover:bg-white/20"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Viewport */}
      <div className="relative flex-1 overflow-hidden">
        {errorMsg ? (
          <div className="flex h-full flex-col items-center justify-center p-6 text-center text-white/80">
            <p className="text-sm leading-relaxed">{errorMsg}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full bg-white/20 px-6 py-2 text-xs font-bold text-white transition hover:bg-white/30"
            >
              닫기
            </button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              playsInline
              muted
              className="absolute inset-0 h-full w-full object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />

            {/* Scanning Frame Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative size-60 rounded-3xl border-2 border-white/30 shadow-[0_0_0_9999px_rgba(0,0,0,0.6)]">
                {/* Custom corners */}
                <div className="absolute -left-1 -top-1 size-6 rounded-tl-2xl border-t-4 border-l-4 border-white" />
                <div className="absolute -right-1 -top-1 size-6 rounded-tr-2xl border-t-4 border-r-4 border-white" />
                <div className="absolute -left-1 -bottom-1 size-6 rounded-bl-2xl border-b-4 border-l-4 border-white" />
                <div className="absolute -right-1 -bottom-1 size-6 rounded-br-2xl border-b-4 border-r-4 border-white" />

                {/* Pulsing laser line */}
                <div className="absolute inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse" style={{
                  top: '50%',
                }} />
              </div>
            </div>

            <div className="absolute bottom-16 inset-x-0 text-center text-xs font-semibold text-white/70 pointer-events-none">
              QR코드가 인식되면 자동으로 등록됩니다
            </div>
          </>
        )}
      </div>
    </div>
  )
}
