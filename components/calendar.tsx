"use client"

import useSWR from "swr"
import { TodayPanel, ResultsPanel, UpcomingPanel } from "@/components/panels"
import { Loader2, RefreshCw, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"

type Fixtures = {
  today: { homeTeam: string; homeCode: string; awayTeam: string; awayCode: string; time: string }[]
  yesterday: {
    homeTeam: string
    homeCode: string
    awayTeam: string
    awayCode: string
    homeScore: number
    awayScore: number
  }[]
  upcoming: { homeTeam: string; homeCode: string; awayTeam: string; awayCode: string; date: string }[]
}

const fetcher = (url: string) =>
  fetch(url).then(async (r) => {
    const json = await r.json()
    if (!r.ok || json.error) throw new Error(json.error || "Error al obtener los partidos.")
    return json
  })

export function Calendar() {
  const { data, error, isLoading, mutate, isValidating } = useSWR<Fixtures>("/api/matches", fetcher, {
    revalidateOnFocus: false,
  })

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-12">
      {/* Header */}
      <header className="relative mb-8 flex items-center justify-center gap-3 text-center">
        <h1 className="text-balance bg-gradient-to-b from-primary to-primary/70 bg-clip-text text-3xl font-extrabold uppercase tracking-wide text-transparent sm:text-4xl md:text-5xl">
          Calendario Mundial 2026
        </h1>
        <Trophy className="hidden size-10 text-primary sm:block" aria-hidden />
      </header>

      <div className="mx-auto mb-8 flex max-w-xs items-center justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => mutate()}
          disabled={isValidating}
          className="gap-2 border-primary/40 bg-card/60 text-foreground hover:bg-secondary"
        >
          <RefreshCw className={`size-4 ${isValidating ? "animate-spin" : ""}`} />
          Actualizar datos
        </Button>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="text-sm">Buscando partidos en internet...</p>
        </div>
      )}

      {error && (
        <div className="mx-auto max-w-xl rounded-2xl border border-destructive/40 bg-card/60 p-6 text-center">
          <p className="text-pretty text-sm leading-relaxed text-destructive">{error.message}</p>
        </div>
      )}

      {data && !data.error && (
        <div className="flex flex-col gap-6">
          {data.today?.length > 0 && <TodayPanel matches={data.today} />}
          <div className="grid gap-6 md:grid-cols-2">
            {data.yesterday?.length > 0 && <ResultsPanel results={data.yesterday} />}
            {data.upcoming?.length > 0 && <UpcomingPanel matches={data.upcoming} />}
          </div>
        </div>
      )}

      {/* Trophy */}
      <div className="pointer-events-none mt-10 flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/trophy.png" alt="Trofeo de la Copa del Mundo" className="h-48 w-auto drop-shadow-[0_0_40px_rgba(212,175,90,0.35)] sm:h-60" />
      </div>
    </div>
  )
}
