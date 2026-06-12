import { Calendar } from "@/components/calendar"

export const metadata = {
  title: "Calendario Mundial 2026 – Copa del Mundo",
  description:
    "Explora el calendario de partidos, resultados y próximos encuentros de la Copa del Mundo 2026.",
  openGraph: {
    title: "Calendario Mundial 2026",
    description: "Calendario interactivo de la Copa del Mundo 2026.",
    images: [{ url: "/trophy.png", alt: "Trofeo Copa del Mundo 2026" }],
    locale: "es_ES",
    type: "website",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/30">
      <Calendar />
    </main>
  )
}
