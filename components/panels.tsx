import Card from "@/components/ui/card";
import { Flag } from "@/components/flag";

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
    <Card className="rounded-2xl border border-border bg-card/60 p-5 sm:p-6 shadow-lg backdrop-blur-sm">
      <h2
        className={`mb-4 text-center text-lg font-bold uppercase tracking-wide sm:text-xl ${titleClass ?? "text-foreground"}`}
      >
        {title}
      </h2>
      <div className="mx-auto mb-4 h-px w-2/3 bg-border" />
      {children}
    </Card>
  )
}

export function TodayPanel({ matches }: { matches: any[] }) {
  return (
    <Panel title="Partidos de Hoy" titleClass="text-accent">
      <ul className="flex flex-col gap-4">
        {matches.map((m, i) => (
          <li key={i} className="flex items-center justify-center gap-3 sm:gap-4">
            <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
              <span className="text-right text-sm font-semibold sm:text-base">{m.homeTeam}</span>
              <Flag code={m.homeCode} />
            </div>
            <span className="min-w-[4.5rem] text-center text-base font-bold text-accent tabular-nums sm:text-lg">
              {m.homeScore !== undefined ? `${m.homeScore} - ${m.awayScore}` : m.time}
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
      <div className="grid grid-cols-1 gap-4">
        {results.slice(0, 3).map((r, i) => (
          <div 
            key={i} 
            className="flex items-center justify-between rounded-xl border border-border bg-secondary/30 p-3 transition-all hover:bg-secondary/50 hover:shadow-md"
          >
            <div className="flex items-center gap-3 flex-1">
              <Flag code={r.homeCode} />
              <span className="text-sm font-semibold truncate">{r.homeTeam}</span>
            </div>
            
            <div className="flex flex-col items-center px-4">
              <span className="rounded-md bg-foreground text-background px-2 py-0.5 text-xs font-bold tabular-nums">
                {r.homeScore} - {r.awayScore}
              </span>
              <span className="text-[10px] uppercase font-bold text-muted-foreground mt-1">Final</span>
            </div>

            <div className="flex items-center gap-3 flex-1 justify-end">
              <span className="text-sm font-semibold text-right truncate">{r.awayTeam}</span>
              <Flag code={r.awayCode} />
            </div>
          </div>
        ))}
        {results.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-4">Esperando resultados...</p>
        )}
      </div>
    </Panel>
  )
}

export function UpcomingPanel({ matches }: { matches: Upcoming[] }) {
  return (
    <Panel title="Próximos Partidos" titleClass="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-yellow-300 to-yellow-600">
      <div className="grid grid-cols-1 gap-4">
        {matches.slice(0, 3).map((m, i) => (
          <div 
            key={i} 
            className="flex items-center justify-between rounded-xl border border-border bg-secondary/30 p-3 transition-all hover:bg-secondary/50 hover:shadow-md"
          >
            <div className="flex items-center gap-3 flex-1">
              <Flag code={m.homeCode} />
              <span className="text-sm font-semibold truncate">{m.homeTeam}</span>
            </div>
            
            <div className="flex flex-col items-center px-4">
              <span className="text-[10px] uppercase font-bold text-muted-foreground mb-1">vs</span>
              <span className="text-xs font-bold text-[#39FF14]">{m.date}</span>
            </div>

            <div className="flex items-center gap-3 flex-1 justify-end">
              <span className="text-sm font-semibold text-right truncate">{m.awayTeam}</span>
              <Flag code={m.awayCode} />
            </div>
          </div>
        ))}
        {matches.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-4">No hay partidos programados</p>
        )}
      </div>
    </Panel>
  )
}


