interface WaveDividerProps {
  className?: string
  /** Tailwind text-* color class controlling the fill */
  colorClassName?: string
  flip?: boolean
}

export function WaveDivider({
  className = "",
  colorClassName = "text-background",
  flip = false,
}: WaveDividerProps) {
  return (
    <div
      className={`pointer-events-none w-full overflow-hidden leading-[0] ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className={`h-[40px] w-full md:h-[64px] ${colorClassName} ${flip ? "rotate-180" : ""}`}
      >
        <path
          d="M0,40 C150,100 350,0 600,40 C850,80 1050,10 1200,50 L1200,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}
