"use client"

import { useState } from "react"
import Image from "next/image"
import { TodayPanel, ResultsPanel, UpcomingPanel } from "@/components/panels"
import { Loader2, RefreshCw, Trophy, LayoutGrid, CalendarRange } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StandingsModal } from "@/components/standings-modal"
import { BracketView } from "@/components/bracket-view"
import { cn } from "@/lib/utils"

import { useMatches } from "@/hooks/useMatches"
import useSWR from "swr"

// ── Tipos ────────────────────────────────────────────────────────────────────

type LiveMatch = {
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  minute?: string | number
}

type LiveResponse = {
  matches: LiveMatch[]
}

// ── Fetcher con timeout de 8 s ────────────────────────────────────────────────

async function fetcher<T>(url: string): Promise<T> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)
  try {
    const res = await fetch(url, { signal: controller.signal })
    const json = await res.json()
    if (!res.ok || json.error) throw new Error(json.error ?? `Error ${res.status}`)
    return json as T
  } finally {
    clearTimeout(timeout)
  }
}

// ── Componente principal ──────────────────────────────────────────────────────

export function Calendar() {
  const { mounted, data, error, isLoading, mutate, isValidating } = useMatches()
  const [isStandingsOpen, setIsStandingsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"daily" | "elimination">("daily")

  // Resultados en vivo – refresca cada 30 s, deduplicando peticiones en 10 s
  const {
    data: liveData,
    error: liveError,
    isLoading: liveLoading,
  } = useSWR<LiveResponse>("/api/fifa-live", fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 30000,
    dedupingInterval: 10000,
    fallbackData: { matches: [] },
    revalidateIfStale: true,
  })

  if (!mounted) return null

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-12 animate-fade-in">

      <header className="flex flex-col items-center justify-center gap-2 mb-8 text-center">
        <div className="flex items-center gap-3">
          <Trophy className="size-8 text-primary sm:size-10" aria-hidden />
          <h1 className="text-balance bg-gradient-to-b from-primary via-primary to-primary/75 bg-clip-text text-3xl font-black uppercase tracking-wider text-transparent sm:text-4xl md:text-5xl">
            Mundial 2026
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground font-semibold tracking-wide uppercase">
          Seguimiento Oficial de Partidos y Resultados
        </p>
      </header>

      {/* Selector de Pestañas Principal */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-card/45 border border-border/50 rounded-2xl p-1 backdrop-blur-md shadow-lg shadow-black/10">
          <button
            onClick={() => setActiveTab("daily")}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300",
              activeTab === "daily"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <CalendarRange className="size-4" />
            Partidos Diarios
          </button>
          <button
            onClick={() => setActiveTab("elimination")}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300",
              activeTab === "elimination"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Trophy className="size-4" />
            Fase Eliminatoria
          </button>
        </div>
      </div>

      {/* Botones de control flotantes/secundarios */}
      <div className="mx-auto mb-8 flex max-w-md flex-wrap items-center justify-center gap-3 px-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsStandingsOpen(true)}
          className="gap-2 border-primary/40 bg-primary/20 hover:bg-primary/30 text-foreground shadow-sm shadow-primary/5 transition-all hover:scale-105 active:scale-95"
        >
          <LayoutGrid className="size-4 text-primary" />
          Tabla de Grupos
        </Button>
        
        {activeTab === "daily" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => mutate()}
            disabled={isValidating}
            className="gap-2 border-primary/40 bg-card/60 text-foreground hover:bg-secondary transition-all hover:scale-105 active:scale-95"
          >
            <RefreshCw className={`size-4 ${isValidating ? "animate-spin" : ""}`} />
            Actualizar datos
          </Button>
        )}
      </div>

      {/* CONTENIDO DE LA PESTAÑA: PARTIDOS DIARIOS */}
      {activeTab === "daily" && (
        <div className="flex flex-col gap-6">
          {/* Resultados en vivo FIFA */}
          {liveLoading && (
            <div className="flex flex-col items-center py-4 text-muted-foreground">
              <Loader2 className="size-6 animate-spin" />
              <p className="text-sm">Cargando resultados en vivo...</p>
            </div>
          )}

          {liveError && (
            <div className="mx-auto max-w-xl rounded-2xl border border-destructive/40 bg-card/60 p-4 text-center text-destructive">
              <p className="text-sm">Error al cargar los resultados en vivo.</p>
            </div>
          )}

          {(liveData?.matches?.length ?? 0) > 0 && (
            <div className="mt-2 mb-4 flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-primary">Resultados en vivo</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {liveData!.matches.map((m, idx) => (
                  <div key={idx} className="rounded-lg border p-3 bg-card/60">
                    <p className="font-medium">{m.homeTeam} vs {m.awayTeam}</p>
                    <p className="text-sm text-muted-foreground">
                      {m.homeScore} - {m.awayScore} ({m.minute ?? "0"}&apos;)
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cargando fixtures */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground">
              <Loader2 className="size-8 animate-spin text-primary" />
              <p className="text-sm">Buscando partidos en internet...</p>
            </div>
          )}

          {/* Error fixtures */}
          {error && (
            <div className="mx-auto max-w-xl rounded-2xl border border-destructive/40 bg-card/60 p-6 text-center">
              <p className="text-pretty text-sm leading-relaxed text-destructive">{error.message}</p>
            </div>
          )}

          {/* Paneles de partidos diarios */}
          {data && (
            <div className="flex flex-col gap-6">
              {data.today?.length > 0 && <TodayPanel matches={data.today} />}
              <div className="grid gap-6 md:grid-cols-2">
                <ResultsPanel results={data.yesterday || []} />
                {data.upcoming?.length > 0 && <UpcomingPanel matches={data.upcoming} />}
              </div>
            </div>
          )}
        </div>
      )}

      {/* CONTENIDO DE LA PESTAÑA: FASE ELIMINATORIA */}
      {activeTab === "elimination" && (
        <BracketView />
      )}

      {/* Trofeo decorativo */}
      <div className="pointer-events-none mt-10 flex flex-col items-center justify-center">
        <Image
          src="/trophy.png"
          alt="Trofeo de la Copa del Mundo"
          width={240}
          height={240}
          className="h-48 w-auto drop-shadow-[0_0_40px_rgba(212,175,90,0.35)] sm:h-60"
          priority
        />
        <p className="mt-4 text-center text-xs font-medium text-muted-foreground/60">
          Diseño y Desarrollo: ING LF
        </p>
      </div>

      {/* Modal de Clasificación de Grupos */}
      <StandingsModal isOpen={isStandingsOpen} onClose={() => setIsStandingsOpen(false)} />
    </div>
  )
}

