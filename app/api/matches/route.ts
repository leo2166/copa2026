import { generateText, Output } from "ai"
import { z } from "zod"

export const maxDuration = 60

const MatchSchema = z.object({
  homeTeam: z.string().describe("Nombre del equipo local en español"),
  homeCode: z.string().describe("Código ISO de 2 letras del país local en minúsculas, ej. 'es', 'br'"),
  awayTeam: z.string().describe("Nombre del equipo visitante en español"),
  awayCode: z.string().describe("Código ISO de 2 letras del país visitante en minúsculas, ej. 'fr', 'mx'"),
})

const ResultSchema = MatchSchema.extend({
  homeScore: z.number().describe("Goles del equipo local"),
  awayScore: z.number().describe("Goles del equipo visitante"),
})

const UpcomingSchema = MatchSchema.extend({
  date: z.string().describe("Fecha del partido, ej. '12 Junio'"),
})

const FixtureSchema = z.object({
  today: z
    .array(MatchSchema.extend({ time: z.string().describe("Hora del partido en formato 24h, ej. '18:00'") }))
    .describe("Partidos que se juegan hoy"),
  yesterday: z.array(ResultSchema).describe("Resultados de los partidos de ayer"),
  upcoming: z.array(UpcomingSchema).describe("Próximos partidos"),
})

export async function GET() {
  try {
    // Paso 1: buscar en internet con Google Search grounding (texto libre)
    const search = await generateText({
      model: "google/gemini-3-flash",
      system:
        "Eres un asistente experto en fútbol que busca información ACTUALIZADA en internet sobre partidos internacionales de selecciones nacionales (mundial, clasificatorias, amistosos). Responde siempre en español.",
      prompt:
        "Busca en internet los partidos de fútbol de selecciones nacionales más relevantes y recientes. Indica claramente: los partidos de HOY con su hora, los resultados de AYER con sus marcadores, y los PRÓXIMOS partidos con su fecha. Incluye el nombre de los países.",
      providerOptions: { google: { useSearchGrounding: true } },
    })

    // Paso 2: estructurar el texto encontrado en JSON
    const { experimental_output } = await generateText({
      model: "openai/gpt-5-mini",
      system:
        "Conviertes información de fútbol en datos estructurados. Responde en español. Usa códigos ISO de país de 2 letras en minúsculas para las banderas (ej. 'es', 'br', 'ar', 'fr', 'mx', 'de', 'jp', 'uy', 'us', 'co', 'kr', 'pt', 'it', 'nl', 'be', 'hr').",
      prompt: `A partir de la siguiente información encontrada en internet, extrae hasta 4 partidos de HOY (con hora), hasta 4 resultados de AYER (con marcadores) y hasta 4 próximos partidos (con fecha):\n\n${search.text}`,
      experimental_output: Output.object({ schema: FixtureSchema }),
    })

    return Response.json(experimental_output)
  } catch (error) {
    console.log("[v0] Error fetching matches:", error)
    const message = error instanceof Error ? error.message : String(error)
    const needsBilling = message.includes("credit card") || message.includes("requires a valid")
    return Response.json(
      {
        error: needsBilling
          ? "El Vercel AI Gateway necesita una tarjeta de crédito registrada para activar tus créditos gratuitos. Agrégala en la configuración de tu proyecto y vuelve a intentarlo."
          : "No se pudo obtener la información. Intenta actualizar.",
      },
      { status: 500 },
    )
  }
}
