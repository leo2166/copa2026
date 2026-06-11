import { Flag } from "@/components/flag"

type TodayMatch = { homeTeam: string; homeCode: string; awayTeam: string; awayCode: string; time: string }
type Result = {
  homeTeam: string
  homeCode: string
  awayTeam: string
  awayCode: string
  homeScore: number
  awayScore: number
}
type Upcoming = { homeTeam: string; homeCode: string; awayTeam: string; awayCode: string; date: string }

function Panel({
  title,
  titleClass,
  children,
}: {
  title: string
  titleClass?: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-border bg-card/60 p-5 shadow-lg backdrop-blur-sm sm:p-6">
      <h2
        className={`mb-4 text-center text-lg font-bold uppercase tracking-wide sm:text-xl ${titleClass ?? "text-foreground"}`}
      >
        {title}
      </h2>
      <div className="mx-auto mb-4 h-px w-2/3 bg-border" />
      {children}
    </section>
  )
}

export function TodayPanel({ matches }: { matches: TodayMatch[] }) {
  return (
    <Panel title="Partidos de Hoy" titleClass="text-accent">
      <ul className="flex flex-col gap-4">
        {matches.map((m, i) => (
          <li key={i} className="flex items-center justify-center gap-3 sm:gap-4">
            <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
              <span className="text-right text-sm font-semibold sm:text-base">{m.homeTeam}</span>
              <Flag code={m.homeCode} />
            </div>
            <span className="min-w-[3.5rem] text-center text-base font-bold text-accent tabular-nums sm:text-lg">
              {m.time}
            </span>
            <div className="flex flex-1 items-center gap-2 sm:gap-3">
              <Flag code={m.awayCode} />
              <span className="text-sm font-semibold sm:text-base">{m.awayTeam}</span>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  )
}

export function ResultsPanel({ results }: { results: Result[] }) {
  return (
    <Panel title="Resultados de Ayer" titleClass="text-chart-3">
      <ul className="flex flex-col gap-4">
        {results.map((r, i) => (
          <li key={i} className="flex items-center gap-3">
            <Flag code={r.homeCode} />
            <span className="flex-1 text-sm font-semibold sm:text-base">{r.homeTeam}</span>
            <span className="rounded-md bg-secondary px-2 py-0.5 text-sm font-bold tabular-nums sm:text-base">
              {r.homeScore} - {r.awayScore}
            </span>
            <span className="flex-1 text-right text-sm font-semibold sm:text-base">{r.awayTeam}</span>
            <Flag code={r.awayCode} />
          </li>
        ))}
      </ul>
    </Panel>
  )
}

export function UpcomingPanel({ matches }: { matches: Upcoming[] }) {
  return (
    <Panel title="Próximos Partidos" titleClass="text-chart-4">
      <ul className="flex flex-col gap-4">
        {matches.map((m, i) => (
          <li key={i} className="flex items-center gap-3">
            <Flag code={m.homeCode} />
            <span className="flex-1 text-sm font-semibold sm:text-base">
              {m.homeTeam} <span className="text-muted-foreground">vs</span> {m.awayTeam}
            </span>
            <Flag code={m.awayCode} />
            <span className="min-w-[4.5rem] text-right text-xs font-medium text-muted-foreground sm:text-sm">
              {m.date}
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  )
}
