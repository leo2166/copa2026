"use client"

import { useState, useMemo } from "react"
import { BracketMatchCard } from "./bracket-match-card"
import { Flag } from "@/components/flag"
import { cn } from "@/lib/utils"
import { GitMerge, ListFilter, HelpCircle, Sparkles, MapPin, Calendar, Clock, Trophy } from "lucide-react"
import { useStandings, GroupStanding } from "@/hooks/useStandings"
import bracketDataRaw from "@/data/bracket.json"

// Tipos
type Match = {
  id: string
  homeTeam: string
  homeCode: string
  homeScore: number | null
  awayTeam: string
  awayCode: string
  awayScore: number | null
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

type SlotDetail = {
  group: string
  pos: number
  label: string
}

type ThirdSlotDetail = {
  type: "third"
  label: string
  groups: string[]
}

type MatchSlotConfig = {
  home: SlotDetail
  away: SlotDetail | ThirdSlotDetail
}

const SLOT_MAP: Record<string, MatchSlotConfig> = {
  m1: {
    home: { group: "A", pos: 2, label: "2° Gr.A" },
    away: { group: "B", pos: 2, label: "2° Gr.B" }
  },
  m2: {
    home: { group: "E", pos: 1, label: "1° Gr.E" },
    away: { type: "third", label: "3° Gr.ABCDF", groups: ["A", "B", "C", "D", "F"] }
  },
  m3: {
    home: { group: "F", pos: 1, label: "1° Gr.F" },
    away: { group: "C", pos: 2, label: "2° Gr.C" }
  },
  m4: {
    home: { group: "C", pos: 1, label: "1° Gr.C" },
    away: { type: "third", label: "3° Gr.CDFGH", groups: ["C", "D", "F", "G", "H"] }
  },
  m5: {
    home: { group: "I", pos: 1, label: "1° Gr.I" },
    away: { group: "F", pos: 2, label: "2° Gr.F" }
  },
  m6: {
    home: { group: "E", pos: 2, label: "2° Gr.E" },
    away: { group: "I", pos: 2, label: "2° Gr.I" }
  },
  m7: {
    home: { group: "A", pos: 1, label: "1° Gr.A" },
    away: { type: "third", label: "3° Gr.CEFHI", groups: ["C", "E", "F", "H", "I"] }
  },
  m8: {
    home: { group: "L", pos: 1, label: "1° Gr.L" },
    away: { type: "third", label: "3° Gr.EHIJK", groups: ["E", "H", "I", "J", "K"] }
  },
  m9: {
    home: { group: "D", pos: 1, label: "1° Gr.D" },
    away: { type: "third", label: "3° Gr.BEFIJ", groups: ["B", "E", "F", "I", "J"] }
  },
  m10: {
    home: { group: "G", pos: 1, label: "1° Gr.G" },
    away: { type: "third", label: "3° Gr.AEHIJ", groups: ["A", "E", "H", "I", "J"] }
  },
  m11: {
    home: { group: "K", pos: 2, label: "2° Gr.K" },
    away: { group: "L", pos: 2, label: "2° Gr.L" }
  },
  m12: {
    home: { group: "H", pos: 1, label: "1° Gr.H" },
    away: { group: "J", pos: 2, label: "2° Gr.J" }
  },
  m13: {
    home: { group: "B", pos: 1, label: "1° Gr.B" },
    away: { type: "third", label: "3° Gr.EFGIJ", groups: ["E", "F", "G", "I", "J"] }
  },
  m14: {
    home: { group: "K", pos: 1, label: "1° Gr.K" },
    away: { type: "third", label: "3° Gr.DEJL", groups: ["D", "E", "J", "L"] }
  },
  m15: {
    home: { group: "J", pos: 1, label: "1° Gr.J" },
    away: { group: "H", pos: 2, label: "2° Gr.H" }
  },
  m16: {
    home: { group: "D", pos: 2, label: "2° Gr.D" },
    away: { group: "G", pos: 2, label: "2° Gr.G" }
  }
}

type ThirdPlaceTeam = {
  name: string
  code: string
  group: string
  points: number
  goalDifference: number
  goalsFor: number
}

function calculateBestThirds(standings: GroupStanding[]): ThirdPlaceTeam[] {
  const thirds: ThirdPlaceTeam[] = []
  standings.forEach((group) => {
    const letter = group.groupName.replace(/grupo\s+/i, "").replace(/group\s+/i, "").trim().toUpperCase()
    const team = group.teams.find(t => t.rank === 3) || group.teams[2]
    if (team) {
      thirds.push({
        name: team.name,
        code: team.code,
        group: letter,
        points: team.points,
        goalDifference: team.goalDifference,
        goalsFor: team.goalsFor
      })
    }
  })

  // Ordenar según criterios FIFA
  thirds.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference
    return b.goalsFor - a.goalsFor
  })

  return thirds
}

function resolveThirdPlaceTeam(
  slotLabel: string,
  allowedGroups: string[],
  bestThirds: ThirdPlaceTeam[],
  matchId: string,
  assignedThirds: Record<string, string>
): ThirdPlaceTeam | null {
  const qualifiedThirds = bestThirds.slice(0, 8)
  const candidates = qualifiedThirds.filter(
    (t) => allowedGroups.includes(t.group) && !assignedThirds[t.name]
  )

  if (candidates.length > 0) {
    const selected = candidates[0]
    assignedThirds[selected.name] = matchId
    return selected
  }

  return null
}

export function BracketView() {
  const { standings, isLoading } = useStandings()
  const [hoveredTeam, setHoveredTeam] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"tree" | "list">("tree")
  const [activeListRound, setActiveListRound] = useState<keyof BracketData>("16avos")
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)

  // Procesamiento dinámico del bracket en base a los standings de la fase de grupos y marcadores jugados
  const bracketData = useMemo(() => {
    // Clonar profundamente el bracket crudo original
    const bracket = JSON.parse(JSON.stringify(bracketDataRaw)) as BracketData

    if (!standings || standings.length === 0) {
      return bracket
    }

    const assignedThirds: Record<string, string> = {}
    const bestThirds = calculateBestThirds(standings)
    // Verificar si todos los grupos han terminado
    const allGroupsFinished = standings.every((g) => g.teams.every((t) => t.played === 3))

    // 1. Resolver la ronda de 16avos de final
    bracket["16avos"] = bracket["16avos"].map((match) => {
      const config = SLOT_MAP[match.id]
      if (!config) return match

      let homeTeam = match.homeTeam
      let homeCode = match.homeCode
      let awayTeam = match.awayTeam
      let awayCode = match.awayCode

      // Local
      if (config.home) {
        const { group, pos, label } = config.home
        const groupData = standings.find((g) => {
          const letter = g.groupName.replace(/grupo\s+/i, "").replace(/group\s+/i, "").trim().toUpperCase()
          return letter === group
        })

        if (groupData) {
          const isFinished = groupData.teams.every((t) => t.played === 3)
          if (isFinished) {
            const team = groupData.teams[pos - 1]
            if (team) {
              homeTeam = team.name
              homeCode = team.code
            }
          } else {
            homeTeam = label
            homeCode = ""
          }
        }
      }

      // Visitante
      if (config.away) {
        if ("type" in config.away && config.away.type === "third") {
          // Es una posición para el mejor tercero
          if (allGroupsFinished) {
            const team = resolveThirdPlaceTeam(
              config.away.label,
              config.away.groups,
              bestThirds,
              match.id,
              assignedThirds
            )
            if (team) {
              awayTeam = team.name
              awayCode = team.code
            }
          } else {
            awayTeam = config.away.label
            awayCode = ""
          }
        } else {
          // Es 1° o 2° de grupo
          const { group, pos, label } = config.away as SlotDetail
          const groupData = standings.find((g) => {
            const letter = g.groupName.replace(/grupo\s+/i, "").replace(/group\s+/i, "").trim().toUpperCase()
            return letter === group
          })

          if (groupData) {
            const isFinished = groupData.teams.every((t) => t.played === 3)
            if (isFinished) {
              const team = groupData.teams[pos - 1]
              if (team) {
                awayTeam = team.name
                awayCode = team.code
              }
            } else {
              awayTeam = label
              awayCode = ""
            }
          }
        }
      }

      return {
        ...match,
        homeTeam,
        homeCode,
        awayTeam,
        awayCode
      }
    })

    // 2. Propagar ganadores a las siguientes fases (octavos, cuartos, semis, final)
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

            if (homeScore !== null && awayScore !== null) {
              // El partido ya se jugó
              if (homeScore > awayScore) {
                winnerName = match.homeTeam
                winnerCode = match.homeCode
              } else if (awayScore > homeScore) {
                winnerName = match.awayTeam
                winnerCode = match.awayCode
              } else {
                // Empate técnico (penales)
                winnerName = `Ganador ${match.id.toUpperCase()}`
                winnerCode = ""
              }
            } else {
              // El partido no se ha jugado
              // Verificamos si los equipos de este partido origen ya están confirmados
              const isHomeReal = match.homeCode !== "" && !match.homeTeam.includes("Gr.") && match.homeTeam !== "Por definir" && !match.homeTeam.startsWith("Ganador") && !match.homeTeam.startsWith("G.")
              const isAwayReal = match.awayCode !== "" && !match.awayTeam.includes("Gr.") && match.awayTeam !== "Por definir" && !match.awayTeam.startsWith("Ganador") && !match.awayTeam.startsWith("G.")

              if (isHomeReal && isAwayReal) {
                winnerName = `Ganador ${match.homeTeam}/${match.awayTeam}`
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
  }, [standings])

  // Encontrar el camino del equipo hovered para resaltar líneas o tarjetas
  const getIsTeamInMatch = (match: Match, team: string | null) => {
    if (!team) return false
    return match.homeTeam === team || match.awayTeam === team
  }

  // Filtrar partidos por ala para la vista de árbol
  // Ala Izquierda
  const left16avos = bracketData["16avos"].slice(0, 8)
  const leftOctavos = bracketData["octavos"].slice(0, 4)
  const leftCuartos = bracketData["cuartos"].slice(0, 2)
  const leftSemis = bracketData["semis"].slice(0, 1)

  // Ala Derecha
  const right16avos = bracketData["16avos"].slice(8, 16)
  const rightOctavos = bracketData["octavos"].slice(4, 8)
  const rightCuartos = bracketData["cuartos"].slice(2, 4)
  const rightSemis = bracketData["semis"].slice(1, 2)

  // Final (Centro)
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
              {standings && standings.length > 0 && (
                <span className="inline-flex items-center text-[9px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse">
                  Cruces Dinámicos
                </span>
              )}
            </h2>
            <p className="text-xs text-muted-foreground">Sigue el camino a la gloria – El que pierde se va</p>
          </div>
        </div>

        {/* Alternador de vistas */}
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
                  <span className={cn(selectedMatch.homeScore !== null && selectedMatch.homeScore > (selectedMatch.awayScore || 0) && "text-primary")}>
                    {selectedMatch.homeScore !== null ? selectedMatch.homeScore : "-"}
                  </span>
                  <span className="text-muted-foreground/30 text-sm">:</span>
                  <span className={cn(selectedMatch.awayScore !== null && selectedMatch.awayScore > (selectedMatch.homeScore || 0) && "text-primary")}>
                    {selectedMatch.awayScore !== null ? selectedMatch.awayScore : "-"}
                  </span>
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
