"use client"

import { useState, useMemo } from "react"
import useSWR from "swr"
import { BracketMatchCard } from "./bracket-match-card"
import { Flag } from "@/components/flag"
import { cn } from "@/lib/utils"
import { GitMerge, ListFilter, Sparkles, MapPin, Calendar, Clock, Trophy, Loader2, RefreshCw } from "lucide-react"

// Tipos
type Match = {
  id: string
  homeTeam: string
  homeCode: string
  homeScore: number | null
  homePenalty?: number | null
  awayTeam: string
  awayCode: string
  awayScore: number | null
  awayPenalty?: number | null
  date: string
  time: string
  nextMatchId: string | null
  nextMatchSlot: "home" | "away" | null
}

type BracketData = {
  "16avos": Match[]
  octavos: Match[]
  cuartos: Match[]
  semis: Match[]
  final: Match[]
}

// ── Fetcher SWR ──────────────────────────────────────────────────────────────
const fetcher = (url: string) =>
  fetch(url).then(async (r) => {
    const json = await r.json()
    if (!r.ok || json.error) throw new Error(json.error ?? `Error ${r.status}`)
    return json as BracketData
  })

export function BracketView() {
  const [hoveredTeam, setHoveredTeam] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"tree" | "list">("tree")
  const [activeListRound, setActiveListRound] = useState<keyof BracketData>("16avos")
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)

  // ── Carga dinámica desde /api/bracket ────────────────────────────────────────
  const {
    data: rawBracket,
    error: bracketError,
    isLoading: bracketLoading,
    isValidating,
    mutate,
  } = useSWR<BracketData>("/api/bracket", fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 60000, // refresca cada 60 s automáticamente
    dedupingInterval: 30000,
  })

  // Propagar ganadores a las siguientes fases a partir de los datos frescos de la API
  const bracketData = useMemo(() => {
    if (!rawBracket) return null

    const bracket = JSON.parse(JSON.stringify(rawBracket)) as BracketData

    const roundsOrder: Array<keyof BracketData> = ["16avos", "octavos", "cuartos", "semis", "final"]
    for (let i = 0; i < roundsOrder.length - 1; i++) {
      const currentRound = roundsOrder[i]
      const nextRound = roundsOrder[i + 1]

      bracket[currentRound].forEach((match) => {
        if (match.nextMatchId && match.nextMatchSlot) {
          const nextMatch = bracket[nextRound].find((m) => m.id === match.nextMatchId)
          if (nextMatch) {
            let winnerName = "Por definir"
            let winnerCode = ""

            const homeScore = match.homeScore
            const awayScore = match.awayScore
            const homePenalty = match.homePenalty
            const awayPenalty = match.awayPenalty

            if (homeScore !== null && awayScore !== null) {
              const homeWon = homeScore > awayScore || (homeScore === awayScore && homePenalty !== undefined && homePenalty !== null && awayPenalty !== undefined && awayPenalty !== null && homePenalty > awayPenalty)
              const awayWon = awayScore > homeScore || (homeScore === awayScore && homePenalty !== undefined && homePenalty !== null && awayPenalty !== undefined && awayPenalty !== null && awayPenalty > homePenalty)

              if (homeWon) {
                winnerName = match.homeTeam
                winnerCode = match.homeCode
              } else if (awayWon) {
                winnerName = match.awayTeam
                winnerCode = match.awayCode
              } else {
                winnerName = `Ganador ${match.id.toUpperCase()}`
                winnerCode = ""
              }
            } else {
              const isHomeReal = match.homeCode !== "" && match.homeTeam !== "Por definir" && !match.homeTeam.startsWith("Ganador") && !match.homeTeam.startsWith("G.")
              const isAwayReal = match.awayCode !== "" && match.awayTeam !== "Por definir" && !match.awayTeam.startsWith("Ganador") && !match.awayTeam.startsWith("G.")

              if (isHomeReal && isAwayReal) {
                winnerName = `Gan. ${match.homeTeam}/${match.awayTeam}`
              } else {
                winnerName = `G. ${match.id.toUpperCase()}`
              }
              winnerCode = ""
            }

            if (match.nextMatchSlot === "home") {
              nextMatch.homeTeam = winnerName
              nextMatch.homeCode = winnerCode
            } else {
              nextMatch.awayTeam = winnerName
              nextMatch.awayCode = winnerCode
            }
          }
        }
      })
    }

    return bracket
  }, [rawBracket])

  // Encontrar el camino del equipo hovered para resaltar líneas o tarjetas
  const getIsTeamInMatch = (match: Match, team: string | null) => {
    if (!team) return false
    return match.homeTeam === team || match.awayTeam === team
  }


  // ── Estados de carga y error ─────────────────────────────────────────────────
  if (bracketLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-muted-foreground">
        <Loader2 className="size-8 animate-spin text-primary" />
        <p className="text-sm font-semibold">Cargando bracket eliminatorio...</p>
      </div>
    )
  }

  if (bracketError || !bracketData) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-destructive/40 bg-card/60 p-6 text-center">
        <p className="text-sm text-destructive font-semibold">Error al cargar el bracket. Intenta de nuevo.</p>
        <button
          onClick={() => mutate()}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors"
        >
          <RefreshCw className="size-3.5" />
          Reintentar
        </button>
      </div>
    )
  }

  // ── Derivaciones del bracket (bracketData garantizado no-null aquí) ──────────
  const left16avos = bracketData["16avos"].slice(0, 8)
  const leftOctavos = bracketData["octavos"].slice(0, 4)
  const leftCuartos = bracketData["cuartos"].slice(0, 2)
  const leftSemis = bracketData["semis"].slice(0, 1)
  const right16avos = bracketData["16avos"].slice(8, 16)
  const rightOctavos = bracketData["octavos"].slice(4, 8)
  const rightCuartos = bracketData["cuartos"].slice(2, 4)
  const rightSemis = bracketData["semis"].slice(1, 2)
  const finalMatch = bracketData["final"][0]

  return (
    <div className="w-full flex flex-col gap-6 select-none animate-fade-in">
      {/* Barra superior de controles */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card/25 border border-border/40 rounded-2xl p-4 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-primary animate-pulse" />
          <div>
            <h2 className="text-sm font-bold text-foreground sm:text-base flex items-center gap-2 flex-wrap">
              Fase de Eliminación Directa
              <span className="inline-flex items-center text-[9px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                En Vivo ✓
              </span>
            </h2>
            <p className="text-xs text-muted-foreground">Sigue el camino a la gloria – El que pierde se va</p>
          </div>
        </div>

        {/* Alternador de vistas + botón actualizar */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => mutate()}
            disabled={isValidating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border border-border/40 bg-card/40 text-muted-foreground hover:text-foreground transition-all duration-200 disabled:opacity-50"
            title="Actualizar bracket"
          >
            <RefreshCw className={`size-3.5 ${isValidating ? "animate-spin" : ""}`} />
          </button>
          <div className="flex items-center gap-2 bg-secondary/30 rounded-xl p-1 border border-border/30">
            <button
              onClick={() => setViewMode("tree")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",
                viewMode === "tree"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <GitMerge className="size-3.5" />
              Cuadro Completo
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",
                viewMode === "list"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <ListFilter className="size-3.5" />
              Por Rondas
            </button>
          </div>
        </div>
      </div>

      {/* Leyenda y guías de ayuda */}
      {hoveredTeam && (
        <div className="flex items-center justify-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2.5 rounded-xl text-xs font-semibold animate-pulse">
          <Trophy className="size-4 shrink-0" />
          <span>Trazando trayectoria de: <strong className="text-foreground">{hoveredTeam}</strong></span>
        </div>
      )}

      {/* VISTA 1: CUADRO COMPLETO (ÁRBOL DE DOBLE ALA EN GRID) */}
      {viewMode === "tree" && (
        <div className="w-full overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent rounded-2xl border border-border/30 bg-card/10">
          <div className="min-w-[1780px] grid grid-cols-9 gap-4 px-6 py-8 h-[960px] items-stretch justify-items-center">
            
            {/* Columna 1: 16avos Izquierda */}
            <div className="flex flex-col justify-around h-full py-1 w-full items-center">
              {left16avos.map((m) => (
                <BracketMatchCard
                  key={m.id}
                  {...m}
                  hoveredTeam={hoveredTeam}
                  onTeamHover={setHoveredTeam}
                  onMatchClick={() => setSelectedMatch(m)}
                />
              ))}
            </div>

            {/* Columna 2: Octavos Izquierda */}
            <div className="flex flex-col justify-around h-full py-8 w-full items-center">
              {leftOctavos.map((m) => (
                <BracketMatchCard
                  key={m.id}
                  {...m}
                  hoveredTeam={hoveredTeam}
                  onTeamHover={setHoveredTeam}
                  onMatchClick={() => setSelectedMatch(m)}
                />
              ))}
            </div>

            {/* Columna 3: Cuartos Izquierda */}
            <div className="flex flex-col justify-around h-full py-20 w-full items-center">
              {leftCuartos.map((m) => (
                <BracketMatchCard
                  key={m.id}
                  {...m}
                  hoveredTeam={hoveredTeam}
                  onTeamHover={setHoveredTeam}
                  onMatchClick={() => setSelectedMatch(m)}
                />
              ))}
            </div>

            {/* Columna 4: Semis Izquierda */}
            <div className="flex flex-col justify-around h-full py-40 w-full items-center">
              {leftSemis.map((m) => (
                <BracketMatchCard
                  key={m.id}
                  {...m}
                  hoveredTeam={hoveredTeam}
                  onTeamHover={setHoveredTeam}
                  onMatchClick={() => setSelectedMatch(m)}
                />
              ))}
            </div>

            {/* Columna 5: CENTRO (Gran Final + Trofeo) */}
            <div className="flex flex-col items-center justify-center h-full gap-8 w-full">
              <div className="text-center flex flex-col items-center gap-1.5 bg-gradient-to-b from-primary/10 to-transparent p-3 rounded-2xl border border-primary/20 shadow-lg w-full max-w-[185px]">
                <Trophy className="size-8 text-primary drop-shadow-[0_0_12px_rgba(212,175,90,0.5)] animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-primary">Gran Final</span>
                <span className="text-[8px] text-muted-foreground font-semibold">19 Julio - NY/NJ</span>
              </div>

              <BracketMatchCard
                key={finalMatch.id}
                {...finalMatch}
                hoveredTeam={hoveredTeam}
                onTeamHover={setHoveredTeam}
                onMatchClick={() => setSelectedMatch(finalMatch)}
              />

              <div className="h-12 w-[1px] bg-gradient-to-b from-border/50 to-transparent" />
            </div>

            {/* Columna 6: Semis Derecha */}
            <div className="flex flex-col justify-around h-full py-40 w-full items-center">
              {rightSemis.map((m) => (
                <BracketMatchCard
                  key={m.id}
                  {...m}
                  hoveredTeam={hoveredTeam}
                  onTeamHover={setHoveredTeam}
                  onMatchClick={() => setSelectedMatch(m)}
                />
              ))}
            </div>

            {/* Columna 7: Cuartos Derecha */}
            <div className="flex flex-col justify-around h-full py-20 w-full items-center">
              {rightCuartos.map((m) => (
                <BracketMatchCard
                  key={m.id}
                  {...m}
                  hoveredTeam={hoveredTeam}
                  onTeamHover={setHoveredTeam}
                  onMatchClick={() => setSelectedMatch(m)}
                />
              ))}
            </div>

            {/* Columna 8: Octavos Derecha */}
            <div className="flex flex-col justify-around h-full py-8 w-full items-center">
              {rightOctavos.map((m) => (
                <BracketMatchCard
                  key={m.id}
                  {...m}
                  hoveredTeam={hoveredTeam}
                  onTeamHover={setHoveredTeam}
                  onMatchClick={() => setSelectedMatch(m)}
                />
              ))}
            </div>

            {/* Columna 9: 16avos Derecha */}
            <div className="flex flex-col justify-around h-full py-1 w-full items-center">
              {right16avos.map((m) => (
                <BracketMatchCard
                  key={m.id}
                  {...m}
                  hoveredTeam={hoveredTeam}
                  onTeamHover={setHoveredTeam}
                  onMatchClick={() => setSelectedMatch(m)}
                />
              ))}
            </div>

          </div>
        </div>
      )}

      {/* VISTA 2: LISTA POR RONDAS (MÓVIL / RESPONSIVA) */}
      {viewMode === "list" && (
        <div className="flex flex-col gap-4">
          {/* Sub-pestañas de rondas */}
          <div className="flex flex-wrap gap-1 bg-secondary/20 p-1.5 rounded-xl border border-border/30 justify-center">
            {(["16avos", "octavos", "cuartos", "semis", "final"] as Array<keyof BracketData>).map((round) => {
              const label =
                round === "16avos"
                  ? "16avos"
                  : round === "octavos"
                  ? "Octavos"
                  : round === "cuartos"
                  ? "Cuartos"
                  : round === "semis"
                  ? "Semifinal"
                  : "Final"
              const count = bracketData[round].length
              return (
                <button
                  key={round}
                  onClick={() => setActiveListRound(round)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",
                    activeListRound === round
                      ? "bg-primary text-primary-foreground shadow"
                      : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
                  )}
                >
                  {label} ({count})
                </button>
              )
            })}
          </div>

          {/* Lista de partidos de la ronda activa */}
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
            {bracketData[activeListRound].map((m) => (
              <BracketMatchCard
                key={m.id}
                {...m}
                hoveredTeam={hoveredTeam}
                onTeamHover={setHoveredTeam}
                onMatchClick={() => setSelectedMatch(m)}
              />
            ))}
          </div>
        </div>
      )}

      {/* MODAL DE DETALLE DE PARTIDO */}
      {selectedMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background/85 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
            onClick={() => setSelectedMatch(null)}
          />
          <div className="relative z-10 flex flex-col w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl p-6 overflow-hidden animate-scale-in">
            {/* Encabezado */}
            <div className="flex items-center justify-between border-b border-border/30 pb-3 mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs text-primary font-bold uppercase tracking-wider">
                <Sparkles className="size-3.5 text-primary" />
                Detalle del Encuentro
              </span>
              <button
                onClick={() => setSelectedMatch(null)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors font-semibold"
              >
                Cerrar
              </button>
            </div>

            {/* Fecha, Hora, Lugar */}
            <div className="flex flex-col gap-2 mb-6 bg-secondary/20 border border-border/30 rounded-xl p-3.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-primary/70 shrink-0" />
                <span>Fecha: <strong className="text-foreground">{selectedMatch.date}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-primary/70 shrink-0" />
                <span>Hora: <strong className="text-foreground">{selectedMatch.time} VET</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-primary/70 shrink-0" />
                <span>Estadio: <strong className="text-foreground">Sede oficial FIFA</strong></span>
              </div>
            </div>

            {/* Marcador Enfoque */}
            <div className="flex items-center justify-around py-4 bg-secondary/10 border border-border/20 rounded-xl">
              {/* Local */}
              <div className="flex flex-col items-center gap-2 w-1/3">
                <Flag code={selectedMatch.homeCode} className="h-9 w-14 shadow-md" />
                <span className="text-xs font-black text-center truncate w-full">
                  {selectedMatch.homeTeam}
                </span>
              </div>

              {/* VS / Goles */}
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-2 font-mono text-2xl font-black">
                  <div className="flex items-baseline gap-0.5">
                    <span className={cn(selectedMatch.homeScore !== null && (selectedMatch.homeScore > (selectedMatch.awayScore || 0) || (selectedMatch.homeScore === selectedMatch.awayScore && selectedMatch.homePenalty !== undefined && selectedMatch.homePenalty !== null && selectedMatch.awayPenalty !== undefined && selectedMatch.awayPenalty !== null && selectedMatch.homePenalty > selectedMatch.awayPenalty)) && "text-primary")}>
                      {selectedMatch.homeScore !== null ? selectedMatch.homeScore : "-"}
                    </span>
                    {selectedMatch.homePenalty !== undefined && selectedMatch.homePenalty !== null && (
                      <span className="text-sm text-muted-foreground/80 font-normal">({selectedMatch.homePenalty})</span>
                    )}
                  </div>
                  <span className="text-muted-foreground/30 text-sm">:</span>
                  <div className="flex items-baseline gap-0.5">
                    <span className={cn(selectedMatch.awayScore !== null && (selectedMatch.awayScore > (selectedMatch.homeScore || 0) || (selectedMatch.homeScore === selectedMatch.awayScore && selectedMatch.homePenalty !== undefined && selectedMatch.homePenalty !== null && selectedMatch.awayPenalty !== undefined && selectedMatch.awayPenalty !== null && selectedMatch.awayPenalty > selectedMatch.homePenalty)) && "text-primary")}>
                      {selectedMatch.awayScore !== null ? selectedMatch.awayScore : "-"}
                    </span>
                    {selectedMatch.awayPenalty !== undefined && selectedMatch.awayPenalty !== null && (
                      <span className="text-sm text-muted-foreground/80 font-normal">({selectedMatch.awayPenalty})</span>
                    )}
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 mt-1">VS</span>
              </div>

              {/* Visitante */}
              <div className="flex flex-col items-center gap-2 w-1/3">
                <Flag code={selectedMatch.awayCode} className="h-9 w-14 shadow-md" />
                <span className="text-xs font-black text-center truncate w-full">
                  {selectedMatch.awayTeam}
                </span>
              </div>
            </div>

            <p className="mt-4 text-[10px] text-muted-foreground/60 text-center leading-relaxed">
              El ganador avanzará directamente al partido de la siguiente ronda.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
