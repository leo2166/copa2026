import { generateText } from "ai"
import { google } from "@ai-sdk/google"

const OFFICIAL_FIXTURES = [
  { date: "2026-06-11", homeTeam: "México", homeCode: "mx", awayTeam: "Sudáfrica", awayCode: "za", time: "15:00" },
  { date: "2026-06-11", homeTeam: "Rep. de Corea", homeCode: "kr", awayTeam: "Rep. Checa", awayCode: "cz", time: "22:00" },
  { date: "2026-06-12", homeTeam: "Canadá", homeCode: "ca", awayTeam: "Bosnia y Herz.", awayCode: "ba", time: "15:00" },
  { date: "2026-06-12", homeTeam: "Estados Unidos", homeCode: "us", awayTeam: "Paraguay", awayCode: "py", time: "21:00" },
  { date: "2026-06-13", homeTeam: "Catar", homeCode: "qa", awayTeam: "Suiza", awayCode: "ch", time: "15:00" },
  { date: "2026-06-13", homeTeam: "Brasil", homeCode: "br", awayTeam: "Marruecos", awayCode: "ma", time: "18:00" },
  { date: "2026-06-13", homeTeam: "Haití", homeCode: "ht", awayTeam: "Escocia", awayCode: "gb-sct", time: "21:00" },
  { date: "2026-06-13", homeTeam: "Australia", homeCode: "au", awayTeam: "Turquía", awayCode: "tr", time: "00:00" },
  { date: "2026-06-14", homeTeam: "Alemania", homeCode: "de", awayTeam: "Curazao", awayCode: "cw", time: "13:00" },
  { date: "2026-06-14", homeTeam: "Países Bajos", homeCode: "nl", awayTeam: "Japón", awayCode: "jp", time: "16:00" },
  { date: "2026-06-14", homeTeam: "Costa de Marfil", homeCode: "ci", awayTeam: "Ecuador", awayCode: "ec", time: "19:00" },
  { date: "2026-06-14", homeTeam: "Suecia", homeCode: "se", awayTeam: "Túnez", awayCode: "tn", time: "22:00" },
  { date: "2026-06-15", homeTeam: "España", homeCode: "es", awayTeam: "Cabo Verde", awayCode: "cv", time: "12:00" },
  { date: "2026-06-15", homeTeam: "Bélgica", homeCode: "be", awayTeam: "Egipto", awayCode: "eg", time: "15:00" },
  { date: "2026-06-15", homeTeam: "Arabia Saudí", homeCode: "sa", awayTeam: "Uruguay", awayCode: "uy", time: "18:00" },
  { date: "2026-06-15", homeTeam: "RI de Irán", homeCode: "ir", awayTeam: "Nueva Zelanda", awayCode: "nz", time: "21:00" },
  { date: "2026-06-16", homeTeam: "Francia", homeCode: "fr", awayTeam: "Senegal", awayCode: "sn", time: "15:00" },
  { date: "2026-06-16", homeTeam: "Irak", homeCode: "iq", awayTeam: "Noruega", awayCode: "no", time: "18:00" },
  { date: "2026-06-16", homeTeam: "Argentina", homeCode: "ar", awayTeam: "Argelia", awayCode: "dz", time: "21:00" },
  { date: "2026-06-16", homeTeam: "Austria", homeCode: "at", awayTeam: "Jordania", awayCode: "jo", time: "00:00" },
]

export async function GET() {
  try {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const todayMatchesRaw = OFFICIAL_FIXTURES.filter(m => m.date === todayStr);
    const todayMatches = await Promise.all(todayMatchesRaw.map(async (m) => {
      const matchTime = new Date(`${m.date}T${m.time}:00`);
      
      if (now > matchTime) {
        try {
          const result = await generateText({
            model: google("gemini-2.5-flash"),
            prompt: `Busca el resultado final del partido de fútbol del Mundial 2026: ${m.homeTeam} vs ${m.awayTeam} jugado el ${m.date}. Devuelve SOLO el marcador en formato 'Home-Away' (ej: 2-1). Si no ha terminado o no hay dato, devuelve '0-0'.`,
          });
          const scores = result.text.trim().split('-').map(s => parseInt(s) || 0);
          return {
            homeTeam: m.homeTeam, homeCode: m.homeCode, awayTeam: m.awayTeam, awayCode: m.awayCode,
            homeScore: scores[0] || 0, awayScore: scores[1] || 0,
          };
        } catch {
          return { homeTeam: m.homeTeam, homeCode: m.homeCode, awayTeam: m.awayTeam, awayCode: m.awayCode, time: m.time };
        }
      }
      return { homeTeam: m.homeTeam, homeCode: m.homeCode, awayTeam: m.awayTeam, awayCode: m.awayCode, time: m.time };
    }));

    const yesterdayMatchesRaw = OFFICIAL_FIXTURES.filter(m => m.date === yesterdayStr);
// ... (rest of the code for yesterdayMatches and upcomingMatches)

    const yesterdayMatches = await Promise.all(yesterdayMatchesRaw.map(async (m) => {
      try {
        const result = await generateText({
          model: google("gemini-2.5-flash"),
          prompt: `Busca el resultado final del partido de fútbol del Mundial 2026: ${m.homeTeam} vs ${m.awayTeam} jugado el ${m.date}. Devuelve SOLO el marcador en formato 'Home-Away' (ej: 2-1). Si no ha terminado o no hay dato, devuelve '0-0'.`,
        });
        const scores = result.text.trim().split('-').map(s => parseInt(s) || 0);
        return {
          homeTeam: m.homeTeam, homeCode: m.homeCode, awayTeam: m.awayTeam, awayCode: m.awayCode,
          homeScore: scores[0] || 0, awayScore: scores[1] || 0,
        };
      } catch {
        return { homeTeam: m.homeTeam, homeCode: m.homeCode, awayTeam: m.awayTeam, awayCode: m.awayCode, homeScore: 0, awayScore: 0 };
      }
    }));

    const upcomingMatches = OFFICIAL_FIXTURES
      .filter(m => m.date > todayStr)
      .map(m => ({
        homeTeam: m.homeTeam, homeCode: m.homeCode, awayTeam: m.awayTeam, awayCode: m.awayCode,
        date: m.date.split('-')[1] === '06' ? `${m.date.split('-')[2]} Junio` : m.date
      }));

    return Response.json({ today: todayMatches, yesterday: yesterdayMatches, upcoming: upcomingMatches });
  } catch (error) {
    return Response.json({ error: "Error al procesar los datos." }, { status: 500 });
  }
}