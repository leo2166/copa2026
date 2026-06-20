// Forzar renderización dinámica en cada petición (sin caché estática de Next.js)
export const dynamic = 'force-dynamic';

const TEAM_MAP: Record<string, { name: string; code: string }> = {
  // Abreviaciones de ESPN (FIFA o común)
  "MEX": { name: "México", code: "mx" },
  "RSA": { name: "Sudáfrica", code: "za" },
  "KOR": { name: "Rep. de Corea", code: "kr" },
  "CZE": { name: "Rep. Checa", code: "cz" },
  "CAN": { name: "Canadá", code: "ca" },
  "BIH": { name: "Bosnia y Herz.", code: "ba" },
  "USA": { name: "Estados Unidos", code: "us" },
  "PAR": { name: "Paraguay", code: "py" },
  "QAT": { name: "Catar", code: "qa" },
  "SUI": { name: "Suiza", code: "ch" },
  "BRA": { name: "Brasil", code: "br" },
  "MAR": { name: "Marruecos", code: "ma" },
  "HAI": { name: "Haití", code: "ht" },
  "SCO": { name: "Escocia", code: "gb-sct" },
  "AUS": { name: "Australia", code: "au" },
  "TUR": { name: "Turquía", code: "tr" },
  "GER": { name: "Alemania", code: "de" },
  "CUW": { name: "Curazao", code: "cw" },
  "NED": { name: "Países Bajos", code: "nl" },
  "JPN": { name: "Japón", code: "jp" },
  "CIV": { name: "Costa de Marfil", code: "ci" },
  "ECU": { name: "Ecuador", code: "ec" },
  "SWE": { name: "Suecia", code: "se" },
  "TUN": { name: "Túnez", code: "tn" },
  "ESP": { name: "España", code: "es" },
  "CPV": { name: "Cabo Verde", code: "cv" },
  "BEL": { name: "Bélgica", code: "be" },
  "EGY": { name: "Egipto", code: "eg" },
  "KSA": { name: "Arabia Saudí", code: "sa" },
  "URU": { name: "Uruguay", code: "uy" },
  "IRN": { name: "RI de Irán", code: "ir" },
  "NZL": { name: "Nueva Zelanda", code: "nz" },
  "FRA": { name: "Francia", code: "fr" },
  "SEN": { name: "Senegal", code: "sn" },
  "IRQ": { name: "Irak", code: "iq" },
  "NOR": { name: "Noruega", code: "no" },
  "ARG": { name: "Argentina", code: "ar" },
  "ALG": { name: "Argelia", code: "dz" },
  "AUT": { name: "Austria", code: "at" },
  "JOR": { name: "Jordania", code: "jo" },
  "POR": { name: "Portugal", code: "pt" },
  "COD": { name: "RD Congo", code: "cd" },
  "ENG": { name: "Inglaterra", code: "gb-eng" },
  "CRO": { name: "Croacia", code: "hr" },
  "GHA": { name: "Ghana", code: "gh" },
  "PAN": { name: "Panamá", code: "pa" },
  "UZB": { name: "Uzbekistán", code: "uz" },
  "COL": { name: "Colombia", code: "co" },
  "ANG": { name: "Angola", code: "ao" },
  "POL": { name: "Polonia", code: "pl" },
  "SVN": { name: "Eslovenia", code: "si" },
  "WAL": { name: "Gales", code: "gb-wls" },

  // Nombres en minúscula en inglés/español
  "mexico": { name: "México", code: "mx" },
  "south africa": { name: "Sudáfrica", code: "za" },
  "korea republic": { name: "Rep. de Corea", code: "kr" },
  "czech republic": { name: "Rep. Checa", code: "cz" },
  "canada": { name: "Canadá", code: "ca" },
  "bosnia and herzegovina": { name: "Bosnia y Herz.", code: "ba" },
  "united states": { name: "Estados Unidos", code: "us" },
  "paraguay": { name: "Paraguay", code: "py" },
  "qatar": { name: "Catar", code: "qa" },
  "switzerland": { name: "Suiza", code: "ch" },
  "brazil": { name: "Brasil", code: "br" },
  "morocco": { name: "Marruecos", code: "ma" },
  "haiti": { name: "Haití", code: "ht" },
  "scotland": { name: "Escocia", code: "gb-sct" },
  "australia": { name: "Australia", code: "au" },
  "turkey": { name: "Turquía", code: "tr" },
  "türkiye": { name: "Turquía", code: "tr" },
  "germany": { name: "Alemania", code: "de" },
  "curacao": { name: "Curazao", code: "cw" },
  "curaçao": { name: "Curazao", code: "cw" },
  "netherlands": { name: "Países Bajos", code: "nl" },
  "japan": { name: "Japón", code: "jp" },
  "ivory coast": { name: "Costa de Marfil", code: "ci" },
  "côte d'ivoire": { name: "Costa de Marfil", code: "ci" },
  "ecuador": { name: "Ecuador", code: "ec" },
  "sweden": { name: "Suecia", code: "se" },
  "tunisia": { name: "Túnez", code: "tn" },
  "spain": { name: "España", code: "es" },
  "cape verde": { name: "Cabo Verde", code: "cv" },
  "belgium": { name: "Bélgica", code: "be" },
  "egypt": { name: "Egipto", code: "eg" },
  "saudi arabia": { name: "Arabia Saudí", code: "sa" },
  "uruguay": { name: "Uruguay", code: "uy" },
  "iran": { name: "RI de Irán", code: "ir" },
  "new zealand": { name: "Nueva Zelanda", code: "nz" },
  "france": { name: "Francia", code: "fr" },
  "senegal": { name: "Senegal", code: "sn" },
  "iraq": { name: "Irak", code: "iq" },
  "norway": { name: "Noruega", code: "no" },
  "argentina": { name: "Argentina", code: "ar" },
  "algeria": { name: "Argelia", code: "dz" },
  "austria": { name: "Austria", code: "at" },
  "jordan": { name: "Jordania", code: "jo" },
  "portugal": { name: "Portugal", code: "pt" },
  "dr congo": { name: "RD Congo", code: "cd" },
  "england": { name: "Inglaterra", code: "gb-eng" },
  "croatia": { name: "Croacia", code: "hr" },
  "ghana": { name: "Ghana", code: "gh" },
  "panama": { name: "Panamá", code: "pa" },
  "uzbekistan": { name: "Uzbekistán", code: "uz" },
  "colombia": { name: "Colombia", code: "co" },
  "angola": { name: "Angola", code: "ao" },
  "poland": { name: "Polonia", code: "pl" },
  "slovenia": { name: "Eslovenia", code: "si" },
  "wales": { name: "Gales", code: "gb-wls" }
};

function getTeamDetails(abbreviation?: string, displayName?: string): { name: string; code: string } {
  const cleanAbb = abbreviation?.toUpperCase().trim() ?? "";
  if (TEAM_MAP[cleanAbb]) {
    return TEAM_MAP[cleanAbb];
  }
  const cleanName = displayName?.toLowerCase().trim() ?? "";
  if (TEAM_MAP[cleanName]) {
    return TEAM_MAP[cleanName];
  }
  return {
    name: displayName ?? abbreviation ?? "Desconocido",
    code: cleanAbb.substring(0, 2).toLowerCase()
  };
}

async function fetchEspnScores(dateStr: string) {
  try {
    const formattedDate = dateStr.replace(/-/g, '');
    const res = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=${formattedDate}`, { next: { revalidate: 30 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.events || [];
  } catch (e) {
    return [];
  }
}

function getDateStr(offset: number): string {
  const d = new Date();
  const offsetDate = new Date(d.getTime() + offset * 24 * 60 * 60 * 1000);
  const formatter = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Caracas', year: 'numeric', month: '2-digit', day: '2-digit' });
  return formatter.format(offsetDate);
}

/**
 * Regla de "día de transmisión" (VET):
 * Los partidos que arrancan a las 00:xx VET del día siguiente
 * pertenecen al programa del día actual (sábado → domingo 00:00 = sábado).
 * ESPN los indexa un día adelante en UTC, así que hay que buscarlos
 * en los eventos de mañana y moverlos a "hoy".
 */
function isMidnightCarryover(eventDate: string): boolean {
  const matchDate = new Date(eventDate);
  const timeStr = new Intl.DateTimeFormat('es-VE', {
    timeZone: 'America/Caracas',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(matchDate);
  
  // Solo la medianoche exacta (00:00 VET) pertenece al día de transmisión anterior.
  // Desde las 00:01 (12:01 AM) en adelante, pertenece al nuevo día calendario.
  return timeStr === '00:00';
}


function buildMatchObj(e: any, includeScore = false) {
  const comp = e.competitions?.[0];
  if (!comp) return null;
  const home = comp.competitors?.find((c: any) => c.homeAway === 'home');
  const away = comp.competitors?.find((c: any) => c.homeAway === 'away');
  if (!home || !away) return null;

  const homeDetails = getTeamDetails(home.team?.abbreviation, home.team?.displayName);
  const awayDetails = getTeamDetails(away.team?.abbreviation, away.team?.displayName);
  const matchDate = new Date(e.date);

  const timeFormatter = new Intl.DateTimeFormat('es-VE', {
    timeZone: 'America/Caracas',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const time = timeFormatter.format(matchDate);

  const matchObj: any = {
    homeTeam: homeDetails.name,
    homeCode: homeDetails.code,
    awayTeam: awayDetails.name,
    awayCode: awayDetails.code,
    time,
    timestamp: matchDate.getTime(),
  };

  const state = comp.status?.type?.state;
  if (includeScore || state === 'in' || state === 'post') {
    matchObj.homeScore = parseInt(home.score) || 0;
    matchObj.awayScore = parseInt(away.score) || 0;
  }

  return matchObj;
}

export async function GET() {
  try {
    const todayStr = getDateStr(0);
    const yesterdayStr = getDateStr(-1);
    // También necesitamos los eventos de mañana para capturar los partidos de medianoche VET
    const tomorrowStr = getDateStr(1);

    // Fetch en paralelo: ayer, hoy y mañana
    const [eventsYesterday, eventsToday, eventsTomorrow] = await Promise.all([
      fetchEspnScores(yesterdayStr),
      fetchEspnScores(todayStr),
      fetchEspnScores(tomorrowStr),
    ]);

    // ── Resultados de ayer ────────────────────────────────────────────────────
    const yesterdayMatches = eventsYesterday.map((e: any) => {
      const comp = e.competitions?.[0];
      if (!comp) return null;
      const home = comp.competitors?.find((c: any) => c.homeAway === 'home');
      const away = comp.competitors?.find((c: any) => c.homeAway === 'away');
      if (!home || !away) return null;
      const homeDetails = getTeamDetails(home.team?.abbreviation, home.team?.displayName);
      const awayDetails = getTeamDetails(away.team?.abbreviation, away.team?.displayName);
      return {
        homeTeam: homeDetails.name,
        homeCode: homeDetails.code,
        awayTeam: awayDetails.name,
        awayCode: awayDetails.code,
        homeScore: parseInt(home.score) || 0,
        awayScore: parseInt(away.score) || 0,
      };
    }).filter(Boolean);

    // ── Partidos de hoy: incluye los de medianoche VET del día siguiente ─────
    // Los partidos que en VET caen a las 00:xx del mañana pertenecen al día actual.
    const midnightCarryovers = eventsTomorrow.filter((e: any) => isMidnightCarryover(e.date));
    const midnightIds = new Set(midnightCarryovers.map((e: any) => e.id));

    const allTodayEvents = [...eventsToday, ...midnightCarryovers];
    const todayMatches = allTodayEvents
      .map((e: any) => buildMatchObj(e))
      .filter(Boolean);

    // Ordenar por timestamp para respetar el orden cronológico en VET
    todayMatches.sort((a: any, b: any) => a.timestamp - b.timestamp);
    const cleanedToday = todayMatches.map(({ timestamp, ...rest }: any) => rest);

    // ── Próximos partidos (días 1-3), excluyendo los de medianoche ya usados ──
    const upcomingDays = [tomorrowStr, getDateStr(2), getDateStr(3)];
    const upcomingEventsList = await Promise.all(upcomingDays.map((d: string) => fetchEspnScores(d)));
    const rawUpcomingEvents = upcomingEventsList.flat()
      // Excluir los partidos de medianoche que ya se mostraron en "hoy"
      .filter((e: any) => !midnightIds.has(e.id));

    const upcomingMatches = rawUpcomingEvents.map((e: any) => {
      const comp = e.competitions?.[0];
      if (!comp) return null;
      const home = comp.competitors?.find((c: any) => c.homeAway === 'home');
      const away = comp.competitors?.find((c: any) => c.homeAway === 'away');
      if (!home || !away) return null;

      const homeDetails = getTeamDetails(home.team?.abbreviation, home.team?.displayName);
      const awayDetails = getTeamDetails(away.team?.abbreviation, away.team?.displayName);
      const matchDate = new Date(e.date);

      const dateFormatter = new Intl.DateTimeFormat('es-VE', {
        timeZone: 'America/Caracas',
        day: 'numeric',
        month: 'long',
      });
      const dateStrRaw = dateFormatter.format(matchDate);
      const date = dateStrRaw
        .replace(/\s*de\s*/gi, ' ')
        .replace(/\b[a-z]/g, (char: string) => char.toUpperCase());

      return {
        homeTeam: homeDetails.name,
        homeCode: homeDetails.code,
        awayTeam: awayDetails.name,
        awayCode: awayDetails.code,
        date,
        timestamp: matchDate.getTime(),
      };
    }).filter(Boolean);

    upcomingMatches.sort((a: any, b: any) => a.timestamp - b.timestamp);
    const cleanedUpcoming = upcomingMatches
      .map(({ timestamp, ...rest }: any) => rest)
      .slice(0, 4);

    return Response.json({
      today: cleanedToday,
      yesterday: yesterdayMatches,
      upcoming: cleanedUpcoming,
    });
  } catch (error) {
    return Response.json({ error: 'Error al procesar los datos.' }, { status: 500 });
  }
}