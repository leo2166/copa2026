"use client"

import { Flag } from "@/components/flag"
import { cn } from "@/lib/utils"
import { Calendar, Clock, Trophy } from "lucide-react"

export interface BracketMatchCardProps {
  id: string
  homeTeam: string
  homeCode: string
  homeScore: number | null
  awayTeam: string
  awayCode: string
  awayScore: number | null
  date: string
  time: string
  hoveredTeam: string | null
  onTeamHover: (teamName: string | null) => void
  onMatchClick?: () => void
}

export function BracketMatchCard({
  id,
  homeTeam,
  homeCode,
  homeScore,
  awayTeam,
  awayCode,
  awayScore,
  date,
  time,
  hoveredTeam,
  onTeamHover,
  onMatchClick,
}: BracketMatchCardProps) {
  // Un equipo es "real" si tiene código de bandera. Los placeholders ("1° Gr.E") tienen code = ""
  const isHomeReal = !!homeCode
  const isAwayReal = !!awayCode
  const hasHome = homeTeam && homeTeam !== "Por definir"
  const hasAway = awayTeam && awayTeam !== "Por definir"

  // Determinar ganador
  const isFinished = homeScore !== null && awayScore !== null
  const homeWon = isFinished && homeScore! > awayScore!
  const awayWon = isFinished && awayScore! > homeScore!

  // Estados de hover (solo equipos reales, no placeholders)
  const isHomeHovered = hoveredTeam && isHomeReal && homeTeam === hoveredTeam
  const isAwayHovered = hoveredTeam && isAwayReal && awayTeam === hoveredTeam
  const isAnyTeamHovered = hoveredTeam !== null
  
  // Si hay algún equipo hovered en general, pero NO es ninguno de esta tarjeta, atenuamos la tarjeta.
  const shouldDim = isAnyTeamHovered && !isHomeHovered && !isAwayHovered

  const handleHomeMouseEnter = () => {
    // Solo hacer hover en equipos reales (con bandera)
    if (isHomeReal && hasHome) onTeamHover(homeTeam)
  }

  const handleAwayMouseEnter = () => {
    if (isAwayReal && hasAway) onTeamHover(awayTeam)
  }

  return (
    <div
      onClick={onMatchClick}
      className={cn(
        "group relative flex flex-col w-full max-w-[185px] rounded-xl border border-border/60 bg-card/45 p-3 text-card-foreground shadow-lg backdrop-blur-md transition-all duration-300 select-none",
        onMatchClick && "cursor-pointer hover:border-primary/50 hover:bg-card/75 hover:shadow-primary/5",
        shouldDim ? "opacity-35 scale-[0.98] blur-[0.5px]" : "opacity-100 scale-100"
      )}
    >
      {/* Brillo de fondo sutil cuando está hovered el equipo */}
      {(isHomeHovered || isAwayHovered) && (
        <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 opacity-50 blur-lg transition-opacity duration-300" />
      )}

      {/* Cabecera del partido (Fecha y hora) */}
      <div className="flex items-center justify-between border-b border-border/30 pb-2 mb-2 text-[10px] text-white font-semibold tracking-wide">
        <span className="flex items-center gap-1">
          <Calendar className="size-3 text-white/70" />
          {date}
        </span>
        <span className="flex items-center gap-1 font-mono">
          <Clock className="size-3 text-white/70" />
          {time} VET
        </span>
      </div>

      {/* Contenedor de Equipos */}
      <div className="flex flex-col gap-1.5">
        {/* Local */}
        <div
          onMouseEnter={handleHomeMouseEnter}
          onMouseLeave={() => onTeamHover(null)}
          className={cn(
            "flex items-center justify-between rounded-lg px-2 py-1.5 transition-all duration-200",
            isHomeHovered && "bg-primary/20 text-foreground font-semibold ring-1 ring-primary/40 shadow-sm",
            homeWon && "text-foreground",
            awayWon && "text-muted-foreground/50"
          )}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            {/* Bandera real o badge de placeholder */}
            {isHomeReal ? (
              <Flag code={homeCode} className="h-4.5 w-7 shrink-0" />
            ) : (
              <div className="h-[18px] w-7 shrink-0 rounded-sm bg-secondary/40 border border-dashed border-border/60 flex items-center justify-center">
                <span className="text-[8px] font-black text-muted-foreground/50 leading-none">?</span>
              </div>
            )}
            <span className={cn(
              "truncate text-xs font-bold tracking-wide text-primary",
              !isHomeReal && "text-muted-foreground/65 italic font-medium text-[10px]"
            )}>
              {homeTeam}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {homeWon && <Trophy className="size-3 text-primary shrink-0 animate-bounce" />}
            <span className={cn(
              "font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-secondary/30",
              homeScore === null && "text-muted-foreground/40 font-normal",
              homeWon && "text-primary bg-primary/10"
            )}>
              {homeScore !== null ? homeScore : "-"}
            </span>
          </div>
        </div>

        {/* Visitante */}
        <div
          onMouseEnter={handleAwayMouseEnter}
          onMouseLeave={() => onTeamHover(null)}
          className={cn(
            "flex items-center justify-between rounded-lg px-2 py-1.5 transition-all duration-200",
            isAwayHovered && "bg-primary/20 text-foreground font-semibold ring-1 ring-primary/40 shadow-sm",
            awayWon && "text-foreground",
            homeWon && "text-muted-foreground/50"
          )}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            {/* Bandera real o badge de placeholder */}
            {isAwayReal ? (
              <Flag code={awayCode} className="h-4.5 w-7 shrink-0" />
            ) : (
              <div className="h-[18px] w-7 shrink-0 rounded-sm bg-secondary/40 border border-dashed border-border/60 flex items-center justify-center">
                <span className="text-[8px] font-black text-muted-foreground/50 leading-none">?</span>
              </div>
            )}
            <span className={cn(
              "truncate text-xs font-bold tracking-wide text-primary",
              !isAwayReal && "text-muted-foreground/65 italic font-medium text-[10px]"
            )}>
              {awayTeam}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {awayWon && <Trophy className="size-3 text-primary shrink-0 animate-bounce" />}
            <span className={cn(
              "font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-secondary/30",
              awayScore === null && "text-muted-foreground/40 font-normal",
              awayWon && "text-primary bg-primary/10"
            )}>
              {awayScore !== null ? awayScore : "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
