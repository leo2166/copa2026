// Forzar renderización dinámica: nunca usar la caché de Next.js
export const dynamic = 'force-dynamic';

import fs from 'fs';
import path from 'path';

// ── Helpers reutilizados de /api/matches ─────────────────────────────────────

const TEAM_MAP: Record<string, { name: string; code: string }> = {
  "MEX": { name: "México", code: "mx" }, "RSA": { name: "Sudáfrica", code: "za" },
  "KOR": { name: "Rep. de Corea", code: "kr" }, "CZE": { name: "Rep. Checa", code: "cz" },
  "CAN": { name: "Canadá", code: "ca" }, "BIH": { name: "Bosnia y Herz.", code: "ba" },
  "USA": { name: "Estados Unidos", code: "us" }, "PAR": { name: "Paraguay", code: "py" },
  "QAT": { name: "Catar", code: "qa" }, "SUI": { name: "Suiza", code: "ch" },
  "BRA": { name: "Brasil", code: "br" }, "MAR": { name: "Marruecos", code: "ma" },
  "HAI": { name: "Haití", code: "ht" }, "SCO": { name: "Escocia", code: "gb-sct" },
  "AUS": { name: "Australia", code: "au" }, "TUR": { name: "Turquía", code: "tr" },
  "GER": { name: "Alemania", code: "de" }, "CUW": { name: "Curazao", code: "cw" },
  "NED": { name: "Países Bajos", code: "nl" }, "JPN": { name: "Japón", code: "jp" },
  "CIV": { name: "Costa de Marfil", code: "ci" }, "ECU": { name: "Ecuador", code: "ec" },
  "SWE": { name: "Suecia", code: "se" }, "TUN": { name: "Túnez", code: "tn" },
  "ESP": { name: "España", code: "es" }, "CPV": { name: "Cabo Verde", code: "cv" },
  "BEL": { name: "Bélgica", code: "be" }, "EGY": { name: "Egipto", code: "eg" },
  "KSA": { name: "Arabia Saudí", code: "sa" }, "URU": { name: "Uruguay", code: "uy" },
  "IRN": { name: "RI de Irán", code: "ir" }, "NZL": { name: "Nueva Zelanda", code: "nz" },
  "FRA": { name: "Francia", code: "fr" }, "SEN": { name: "Senegal", code: "sn" },
  "IRQ": { name: "Irak", code: "iq" }, "NOR": { name: "Noruega", code: "no" },
  "ARG": { name: "Argentina", code: "ar" }, "ALG": { name: "Argelia", code: "dz" },
  "AUT": { name: "Austria", code: "at" }, "JOR": { name: "Jordania", code: "jo" },
  "POR": { name: "Portugal", code: "pt" }, "COD": { name: "RD Congo", code: "cd" },
  "ENG": { name: "Inglaterra", code: "gb-eng" }, "CRO": { name: "Croacia", code: "hr" },
  "GHA": { name: "Ghana", code: "gh" }, "PAN": { name: "Panamá", code: "pa" },
  "UZB": { name: "Uzbekistán", code: "uz" }, "COL": { name: "Colombia", code: "co" },
  "ANG": { name: "Angola", code: "ao" }, "POL": { name: "Polonia", code: "pl" },
  "SVN": { name: "Eslovenia", code: "si" }, "WAL": { name: "Gales", code: "gb-wls" },
  // nombres en minúscula
  "canada": { name: "Canadá", code: "ca" }, "brazil": { name: "Brasil", code: "br" },
  "germany": { name: "Alemania", code: "de" }, "netherlands": { name: "Países Bajos", code: "nl" },
  "japan": { name: "Japón", code: "jp" }, "paraguay": { name: "Paraguay", code: "py" },
  "france": { name: "Francia", code: "fr" }, "sweden": { name: "Suecia", code: "se" },
  "mexico": { name: "México", code: "mx" }, "ecuador": { name: "Ecuador", code: "ec" },
  "england": { name: "Inglaterra", code: "gb-eng" }, "dr congo": { name: "RD Congo", code: "cd" },
  "belgium": { name: "Bélgica", code: "be" }, "senegal": { name: "Senegal", code: "sn" },
  "united states": { name: "Estados Unidos", code: "us" }, "bosnia and herzegovina": { name: "Bosnia y Herz.", code: "ba" },
  "spain": { name: "España", code: "es" }, "austria": { name: "Austria", code: "at" },
  "portugal": { name: "Portugal", code: "pt" }, "croatia": { name: "Croacia", code: "hr" },
  "switzerland": { name: "Suiza", code: "ch" }, "algeria": { name: "Argelia", code: "dz" },
  "australia": { name: "Australia", code: "au" }, "egypt": { name: "Egipto", code: "eg" },
  "argentina": { name: "Argentina", code: "ar" }, "cape verde": { name: "Cabo Verde", code: "cv" },
  "colombia": { name: "Colombia", code: "co" }, "ghana": { name: "Ghana", code: "gh" },
  "morocco": { name: "Marruecos", code: "ma" }, "south africa": { name: "Sudáfrica", code: "za" },
  "norway": { name: "Noruega", code: "no" }, "ivory coast": { name: "Costa de Marfil", code: "ci" },
  "côte d'ivoire": { name: "Costa de Marfil", code: "ci" }, "turkey": { name: "Turquía", code: "tr" },
  "türkiye": { name: "Turquía", code: "tr" }, "curacao": { name: "Curazao", code: "cw" },
  "curaçao": { name: "Curazao", code: "cw" }, "korea republic": { name: "Rep. de Corea", code: "kr" },
  "saudi arabia": { name: "Arabia Saudí", code: "sa" }, "iran": { name: "RI de Irán", code: "ir" },
  "new zealand": { name: "Nueva Zelanda", code: "nz" }, "tunisia": { name: "Túnez", code: "tn" },
  "uruguay": { name: "Uruguay", code: "uy" }, "iraq": { name: "Irak", code: "iq" },
  "qatar": { name: "Catar", code: "qa" }, "scotland": { name: "Escocia", code: "gb-sct" },
  "jordan": { name: "Jordania", code: "jo" }, "uzbekistan": { name: "Uzbekistán", code: "uz" },
  "angola": { name: "Angola", code: "ao" }, "poland": { name: "Polonia", code: "pl" },
  "slovenia": { name: "Eslovenia", code: "si" }, "wales": { name: "Gales", code: "gb-wls" },
  "haiti": { name: "Haití", code: "ht" }, "panama": { name: "Panamá", code: "pa" },
};

function getTeamDetails(abbreviation?: string, displayName?: string): { name: string; code: string } {
  const cleanAbb = abbreviation?.toUpperCase().trim() ?? "";
  if (TEAM_MAP[cleanAbb]) return TEAM_MAP[cleanAbb];
  const cleanName = displayName?.toLowerCase().trim() ?? "";
  if (TEAM_MAP[cleanName]) return TEAM_MAP[cleanName];
  return { name: displayName ?? abbreviation ?? "Desconocido", code: cleanAbb.substring(0, 2).toLowerCase() };
}

function getTodayStr(): string {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Caracas', year: 'numeric', month: '2-digit', day: '2-digit'
  });
  return formatter.format(new Date());
}

function parseBracketDate(dateStr: string): string {
  const clean = dateStr.toLowerCase().trim();
  const match = clean.match(/^(\d+)\s+de\s+(\w+)$/);
  if (!match) return "";
  const day = match[1].padStart(2, '0');
  const monthStr = match[2];
  if (monthStr.startsWith("jun")) return `2026-06-${day}`;
  if (monthStr.startsWith("jul")) return `2026-07-${day}`;
  return "";
}

async function fetchEspnScores(dateStr: string): Promise<any[]> {
  try {
    const formatted = dateStr.replace(/-/g, '');
    const res = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=${formatted}`,
      { cache: 'no-store' }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.events || [];
  } catch {
    return [];
  }
}

/**
 * GET /api/bracket
 *
 * Lee bracket.json del build (solo lectura, funciona en Vercel) y
 * complementa los marcadores faltantes consultando ESPN EN MEMORIA,
 * sin escribir nada al disco. Compatible con entornos serverless.
 */
export async function GET() {
  try {
    const bracketFilePath = path.join(process.cwd(), 'data', 'bracket.json');

    if (!fs.existsSync(bracketFilePath)) {
      return Response.json({ error: 'No se encontró bracket.json.' }, { status: 404 });
    }

    const bracket = JSON.parse(fs.readFileSync(bracketFilePath, 'utf-8'));
    const todayStr = getTodayStr();
    const rounds = ["16avos", "octavos", "cuartos", "semis", "final"];

    // Caché en memoria para las peticiones de ESPN durante esta solicitud
    const espnCache: Record<string, any[]> = {};

    async function getCachedEspnScores(dateStr: string): Promise<any[]> {
      if (espnCache[dateStr]) return espnCache[dateStr];
      const scores = await fetchEspnScores(dateStr);
      espnCache[dateStr] = scores;
      return scores;
    }

    // Procesar ronda por ronda para propagar ganadores secuencialmente y buscar sus marcadores en ESPN
    for (let i = 0; i < rounds.length; i++) {
      const currentRound = rounds[i];
      const matches = bracket[currentRound];
      if (!Array.isArray(matches)) continue;

      // ── 1. Recopilar fechas de partidos de la ronda actual que necesitan score ──
      const pendingDatesSet = new Set<string>();
      const pendingItems: Array<{ match: any; dateStr: string }> = [];

      for (const match of matches) {
        const hasTeams =
          match.homeCode && match.awayCode &&
          match.homeTeam !== "Por definir" && match.awayTeam !== "Por definir";
        const needsScore = match.homeScore === null || match.awayScore === null;

        if (hasTeams && needsScore) {
          const dateStr = parseBracketDate(match.date);
          if (dateStr && dateStr <= todayStr) {
            pendingDatesSet.add(dateStr);
            pendingItems.push({ match, dateStr });
          }
        }
      }

      // ── 2. Consultar ESPN para los partidos pendientes de esta ronda ──
      if (pendingItems.length > 0) {
        const datesList = Array.from(pendingDatesSet);
        const espnResults = await Promise.all(datesList.map(d => getCachedEspnScores(d)));

        const eventsByDate: Record<string, any[]> = {};
        datesList.forEach((d, idx) => { eventsByDate[d] = espnResults[idx]; });

        for (const { match, dateStr } of pendingItems) {
          const events = eventsByDate[dateStr] || [];

          const matchingEvent = events.find((event: any) => {
            const competitors = event.competitions?.[0]?.competitors || [];
            if (competitors.length < 2) return false;
            const teamA = getTeamDetails(competitors[0].team?.abbreviation, competitors[0].team?.displayName);
            const teamB = getTeamDetails(competitors[1].team?.abbreviation, competitors[1].team?.displayName);
            return (teamA.code === match.homeCode && teamB.code === match.awayCode) ||
                   (teamA.code === match.awayCode && teamB.code === match.homeCode);
          });

          if (matchingEvent) {
            const comp = matchingEvent.competitions?.[0];
            const state = comp?.status?.type?.state;

            // Incluir scores tanto si el partido terminó ('post') como si está en curso ('in')
            if (state === 'post' || state === 'in') {
              const competitors = comp.competitors || [];
              const homeComp = competitors.find((c: any) =>
                getTeamDetails(c.team?.abbreviation, c.team?.displayName).code === match.homeCode
              );
              const awayComp = competitors.find((c: any) =>
                getTeamDetails(c.team?.abbreviation, c.team?.displayName).code === match.awayCode
              );
              if (homeComp && awayComp) {
                match.homeScore = parseInt(homeComp.score) ?? 0;
                match.awayScore = parseInt(awayComp.score) ?? 0;
                match.homePenalty = homeComp.shootoutScore !== undefined ? parseInt(homeComp.shootoutScore) : null;
                match.awayPenalty = awayComp.shootoutScore !== undefined ? parseInt(awayComp.shootoutScore) : null;
              }
            }
          }
        }
      }

      // ── 3. Propagar los ganadores de la ronda actual a la siguiente ronda ──
      const nextRound = rounds[i + 1];
      if (nextRound && bracket[nextRound]) {
        matches.forEach((match) => {
          if (match.nextMatchId && match.nextMatchSlot) {
            const nextMatch = bracket[nextRound].find((m: any) => m.id === match.nextMatchId);
            if (nextMatch) {
              let winnerName = "Por definir";
              let winnerCode = "";

              const homeScore = match.homeScore;
              const awayScore = match.awayScore;
              const homePenalty = match.homePenalty;
              const awayPenalty = match.awayPenalty;

              if (homeScore !== null && awayScore !== null) {
                const homeWon = homeScore > awayScore || 
                  (homeScore === awayScore && 
                   homePenalty !== undefined && homePenalty !== null && 
                   awayPenalty !== undefined && awayPenalty !== null && 
                   homePenalty > awayPenalty);
                const awayWon = awayScore > homeScore || 
                  (homeScore === awayScore && 
                   homePenalty !== undefined && homePenalty !== null && 
                   awayPenalty !== undefined && awayPenalty !== null && 
                   awayPenalty > homePenalty);

                if (homeWon) {
                  winnerName = match.homeTeam;
                  winnerCode = match.homeCode;
                } else if (awayWon) {
                  winnerName = match.awayTeam;
                  winnerCode = match.awayCode;
                } else {
                  winnerName = `Ganador ${match.id.toUpperCase()}`;
                  winnerCode = "";
                }
              } else {
                const isHomeReal = match.homeCode !== "" && match.homeTeam !== "Por definir" && !match.homeTeam.startsWith("Ganador") && !match.homeTeam.startsWith("G.");
                const isAwayReal = match.awayCode !== "" && match.awayTeam !== "Por definir" && !match.awayTeam.startsWith("Ganador") && !match.awayTeam.startsWith("G.");

                if (isHomeReal && isAwayReal) {
                  winnerName = `Gan. ${match.homeTeam}/${match.awayTeam}`;
                } else {
                  winnerName = `G. ${match.id.toUpperCase()}`;
                }
                winnerCode = "";
              }

              if (match.nextMatchSlot === "home") {
                nextMatch.homeTeam = winnerName;
                nextMatch.homeCode = winnerCode;
              } else {
                nextMatch.awayTeam = winnerName;
                nextMatch.awayCode = winnerCode;
              }
            }
          }
        });
      }
    }

    return Response.json(bracket, {
      headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' },
    });

  } catch (error) {
    console.error('Error en /api/bracket:', error);
    return Response.json({ error: 'Error al procesar el bracket.' }, { status: 500 });
  }
}
