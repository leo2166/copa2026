"use client"

import { useState, useEffect, useRef } from "react"
import { X, ChevronLeft, ChevronRight, Loader2, Info } from "lucide-react"
import { Flag } from "@/components/flag"
import { useStandings, GroupStanding } from "@/hooks/useStandings"
import { cn } from "@/lib/utils"

interface StandingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function StandingsModal({ isOpen, onClose }: StandingsModalProps) {
  const { standings, isLoading, error } = useStandings()
  const [activeIdx, setActiveIdx] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  // Resetear el índice activo al abrir el modal
  useEffect(() => {
    if (isOpen) {
      setActiveIdx(0)
    }
  }, [isOpen])

  // Manejar el cierre con la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
      // Bloquear scroll de la página de fondo
      document.body.style.overflow = "hidden"
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const groups = standings || []

  // Funciones de navegación para el Slider
  const prevGroup = () => {
    if (groups.length === 0) return
    setActiveIdx((prev) => (prev === 0 ? groups.length - 1 : prev - 1))
  }

  const nextGroup = () => {
    if (groups.length === 0) return
    setActiveIdx((prev) => (prev === groups.length - 1 ? 0 : prev + 1))
  }

  // Soporte para deslizamiento táctil (Swipe)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const diff = touchStartX.current - touchEndX.current
    const swipeThreshold = 50 // Umbral mínimo en px

    if (diff > swipeThreshold) {
      // Deslizar a la izquierda -> Siguiente grupo
      nextGroup()
    } else if (diff < -swipeThreshold) {
      // Deslizar a la derecha -> Grupo anterior
      prevGroup()
    }

    // Resetear refs
    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fondo difuminado con animación fade-in */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />

      {/* Contenedor del Modal Centrado */}
      <div 
        className="relative z-10 flex flex-col w-full max-w-2xl max-h-[90vh] rounded-2xl border border-border bg-card/90 shadow-2xl backdrop-blur-sm overflow-hidden animate-scale-in"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Cabecera */}
        <header className="flex items-center justify-between border-b border-border px-5 py-4 bg-secondary/20">
          <div>
            <h3 className="text-lg font-bold text-foreground sm:text-xl">
              Clasificación Fase de Grupos
            </h3>
            <p className="text-xs text-muted-foreground">
              Mundial 2026 – Tabla de posiciones en tiempo real
            </p>
          </div>
          <button 
            onClick={onClose}
            className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="size-5" />
          </button>
        </header>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="size-8 animate-spin text-primary mb-3" />
              <p className="text-sm font-medium">Cargando clasificación por grupos...</p>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-5 text-center text-destructive">
              <p className="text-sm font-semibold">Ha ocurrido un error al cargar la clasificación.</p>
              <p className="text-xs mt-1 text-destructive/80">{error.message}</p>
            </div>
          )}

          {groups.length > 0 && (
            <div className="flex flex-col h-full">
              {/* Barra rápida de navegación entre grupos (A-L) */}
              <div className="flex flex-wrap gap-1 justify-center mb-6 max-w-full overflow-x-auto py-1 scrollbar-none">
                {groups.map((g, idx) => {
                  const letter = g.groupName.replace(/grupo\s+/i, "").trim();
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveIdx(idx)}
                      className={cn(
                        "flex items-center justify-center size-8 sm:size-9 rounded-lg text-xs sm:text-sm font-bold border transition-all duration-200",
                        activeIdx === idx
                          ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                          : "bg-secondary/40 border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>

              {/* Slider / Carrusel del Grupo Activo */}
              <div className="relative flex items-center justify-between w-full min-h-[300px] border border-border/60 rounded-2xl bg-secondary/15 p-4 sm:p-5">
                {/* Flecha Izquierda */}
                <button
                  onClick={prevGroup}
                  className="absolute left-2 sm:left-4 z-10 flex items-center justify-center size-8 sm:size-10 rounded-full border border-border bg-card/80 hover:bg-secondary text-foreground hover:shadow-md transition-all active:scale-95"
                  aria-label="Grupo anterior"
                >
                  <ChevronLeft className="size-5" />
                </button>

                {/* Flecha Derecha */}
                <button
                  onClick={nextGroup}
                  className="absolute right-2 sm:right-4 z-10 flex items-center justify-center size-8 sm:size-10 rounded-full border border-border bg-card/80 hover:bg-secondary text-foreground hover:shadow-md transition-all active:scale-95"
                  aria-label="Grupo siguiente"
                >
                  <ChevronRight className="size-5" />
                </button>

                {/* Tabla de Posiciones del Grupo */}
                <div className="w-full px-8 sm:px-10 animate-fade-in transition-all">
                  <h4 className="text-center text-lg sm:text-xl font-extrabold uppercase tracking-widest bg-gradient-to-r from-primary/80 to-primary text-transparent bg-clip-text mb-4">
                    {groups[activeIdx].groupName}
                  </h4>

                  <div className="overflow-x-auto w-full scrollbar-thin">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-border/80 text-muted-foreground uppercase font-bold text-[10px] sm:text-xs">
                          <th className="py-2 text-center w-8">Pos</th>
                          <th className="py-2 pl-2">Selección</th>
                          <th className="py-2 text-center px-1.5">PJ</th>
                          <th className="py-2 text-center px-1.5">G</th>
                          <th className="py-2 text-center px-1.5">E</th>
                          <th className="py-2 text-center px-1.5">P</th>
                          <th className="py-2 text-center px-1.5 hidden xs:table-cell">GF</th>
                          <th className="py-2 text-center px-1.5 hidden xs:table-cell">GC</th>
                          <th className="py-2 text-center px-1.5">DG</th>
                          <th className="py-2 text-center px-2 font-black text-foreground">PTS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groups[activeIdx].teams.map((t, index) => {
                          // Rango 1 y 2 clasifican directamente
                          const isDirectClass = t.rank <= 2;
                          // Rango 3 clasifica según los mejores terceros
                          const isThirdClass = t.rank === 3;

                          return (
                            <tr
                              key={index}
                              className={cn(
                                "border-b border-border/40 hover:bg-secondary/20 transition-colors py-2",
                                isDirectClass && "bg-emerald-500/5 hover:bg-emerald-500/10"
                              )}
                            >
                              {/* Rango / Posición */}
                              <td className="py-2.5 text-center font-bold relative">
                                {isDirectClass && (
                                  <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-emerald-500 rounded-full" />
                                )}
                                {isThirdClass && (
                                  <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-amber-500 rounded-full" />
                                )}
                                <span className={cn(
                                  "inline-flex items-center justify-center size-5 rounded-full text-[10px] sm:text-xs",
                                  t.rank === 1 && "bg-emerald-500 text-white font-bold",
                                  t.rank === 2 && "bg-emerald-500/80 text-white font-bold",
                                  t.rank === 3 && "bg-amber-500 text-white font-medium",
                                  t.rank > 3 && "bg-secondary text-muted-foreground"
                                )}>
                                  {t.rank}
                                </span>
                              </td>

                              {/* Equipo / Bandera */}
                              <td className="py-2.5 pl-2 font-medium">
                                <div className="flex items-center gap-2">
                                  <Flag code={t.code} className="h-4.5 w-7 shrink-0 shadow-sm border border-white/5" />
                                  <span className="truncate max-w-[100px] sm:max-w-[140px] font-semibold text-foreground text-xs sm:text-sm">
                                    {t.name}
                                  </span>
                                </div>
                              </td>

                              {/* Estadísticas */}
                              <td className="py-2.5 text-center font-medium text-muted-foreground px-1.5 tabular-nums">{t.played}</td>
                              <td className="py-2.5 text-center font-medium text-muted-foreground px-1.5 tabular-nums">{t.wins}</td>
                              <td className="py-2.5 text-center font-medium text-muted-foreground px-1.5 tabular-nums">{t.draws}</td>
                              <td className="py-2.5 text-center font-medium text-muted-foreground px-1.5 tabular-nums">{t.losses}</td>
                              <td className="py-2.5 text-center font-medium text-muted-foreground px-1.5 hidden xs:table-cell tabular-nums">{t.goalsFor}</td>
                              <td className="py-2.5 text-center font-medium text-muted-foreground px-1.5 hidden xs:table-cell tabular-nums">{t.goalsAgainst}</td>
                              <td className={cn(
                                "py-2.5 text-center font-bold px-1.5 tabular-nums text-xs sm:text-sm",
                                t.goalDifference > 0 ? "text-emerald-500" : t.goalDifference < 0 ? "text-rose-500" : "text-muted-foreground"
                              )}>
                                {t.goalDifference > 0 ? `+${t.goalDifference}` : t.goalDifference}
                              </td>
                              <td className="py-2.5 text-center font-extrabold px-2 text-[#39FF14] text-xs sm:text-base tabular-nums">
                                {t.points}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Leyenda explicativa al pie */}
              <footer className="mt-5 flex flex-col gap-2 rounded-xl bg-secondary/20 p-3 text-[11px] text-muted-foreground sm:text-xs">
                <div className="flex items-start gap-1.5">
                  <Info className="size-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">Regla de clasificación:</span> Avanzan a dieciseisavos de final (Ronda de 32) los dos primeros equipos de cada grupo (1º y 2º) y los ocho mejores terceros lugares de toda la fase de grupos.
                  </div>
                </div>
                <div className="flex gap-4 justify-center mt-1 border-t border-border/30 pt-2 font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 bg-emerald-500 rounded-full" /> Clasificación Directa (1º y 2º)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 bg-amber-500 rounded-full" /> Posible Clasificación (3º)
                  </span>
                </div>
              </footer>
            </div>
          )}

          {groups.length === 0 && !isLoading && !error && (
            <p className="text-center text-sm text-muted-foreground py-10">No hay datos de clasificación disponibles en este momento.</p>
          )}
        </div>
      </div>
    </div>
  )
}
