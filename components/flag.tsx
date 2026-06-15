import { cn } from "@/lib/utils"

export function Flag({
  code,
  className,
}: {
  code: string
  className?: string
}) {
  const normalized = code?.toLowerCase().trim() ?? ""
  
  // Validar si es un código de país estándar (2 letras o excepciones como gb-sct, gb-wls, gb-eng)
  const isCountryCode = /^[a-z]{2}$|^gb-[a-z]{3}$/.test(normalized)

  if (!isCountryCode) {
    return (
      <span
        className={cn(
          "inline-flex h-6 w-9 shrink-0 items-center justify-center rounded-[3px] bg-gradient-to-br from-secondary/50 to-primary/20 text-[10px] font-bold text-foreground/70 ring-1 ring-white/10 shadow-sm",
          className
        )}
      >
        ⚽
      </span>
    )
  }

  return (
    <span
      className={cn(
        "inline-flex h-6 w-9 shrink-0 overflow-hidden rounded-[3px] ring-1 ring-white/15 shadow-sm",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://flagcdn.com/w80/${normalized}.png`}
        srcSet={`https://flagcdn.com/w160/${normalized}.png 2x`}
        alt={`Bandera de ${code}`}
        width={36}
        height={24}
        className="h-full w-full object-cover"
        crossOrigin="anonymous"
        loading="lazy"
      />
    </span>
  )
}
