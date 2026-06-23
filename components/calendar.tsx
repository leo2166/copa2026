"use client"

import { useState } from "react"
import Image from "next/image"
import { TodayPanel, ResultsPanel, UpcomingPanel } from "@/components/panels"
import { Loader2, RefreshCw, Trophy, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StandingsModal } from "@/components/standings-modal"

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

      <header className="flex items-center justify-center gap-4 mb-8">
        <h1 className="text-balance text-center bg-gradient-to-b from-primary to-primary/70 bg-clip-text text-3xl font-extrabold uppercase tracking-wide text-transparent sm:text-4xl md:text-5xl">
          Calendario Mundial 2026
        </h1>
        <Trophy className="hidden size-10 text-primary sm:block" aria-hidden />
      </header>

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
        <div className="mt-6 mb-6 flex flex-col gap-4">
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

      {/* Botones de control */}
      <div className="mx-auto mb-8 flex max-w-md flex-wrap items-center justify-center gap-3 px-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsStandingsOpen(true)}
          className="gap-2 border-primary/40 bg-primary/20 hover:bg-primary/30 text-foreground shadow-sm shadow-primary/5 transition-all hover:scale-105 active:scale-95"
        >
          <LayoutGrid className="size-4 text-primary animate-pulse" />
          Fase de Grupos
        </Button>
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
      </div>

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

      {/* Paneles de partidos */}
      {data && !data.error && (
        <div className="flex flex-col gap-6">
          {data.today?.length > 0 && <TodayPanel matches={data.today} />}
          <div className="grid gap-6 md:grid-cols-2">
            <ResultsPanel results={data.yesterday || []} />
            {data.upcoming?.length > 0 && <UpcomingPanel matches={data.upcoming} />}
          </div>
        </div>
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

      {/* Modal de Clasificación */}
      <StandingsModal isOpen={isStandingsOpen} onClose={() => setIsStandingsOpen(false)} />
    </div>
  )
}
