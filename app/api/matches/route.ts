// Forzar renderización dinámica en cada petición (sin caché estática de Next.js)
export const dynamic = 'force-dynamic';

// ─── Fixture completo Fase de Grupos — Mundial 2026 ───────────────────────────
// Todos los horarios en hora de Venezuela (VZT = UTC-4 = EDT verano EE.UU.)
// Un partido a las 00:00 pertenece al día anterior en la lógica de programación/transmisión.
const OFFICIAL_FIXTURES = [
  // ── 11 de Junio ──
  { date: "2026-06-11", homeTeam: "México",         homeCode: "mx",     awayTeam: "Sudáfrica",       awayCode: "za",     time: "15:00" },
  { date: "2026-06-11", homeTeam: "Rep. de Corea",  homeCode: "kr",     awayTeam: "Rep. Checa",      awayCode: "cz",     time: "22:00" },
  // ── 12 de Junio ──
  { date: "2026-06-12", homeTeam: "Canadá",         homeCode: "ca",     awayTeam: "Bosnia y Herz.",  awayCode: "ba",     time: "15:00" },
  { date: "2026-06-12", homeTeam: "Estados Unidos", homeCode: "us",     awayTeam: "Paraguay",        awayCode: "py",     time: "21:00" },
  // ── 13 de Junio ──
  { date: "2026-06-13", homeTeam: "Catar",          homeCode: "qa",     awayTeam: "Suiza",           awayCode: "ch",     time: "15:00" },
  { date: "2026-06-13", homeTeam: "Brasil",         homeCode: "br",     awayTeam: "Marruecos",       awayCode: "ma",     time: "18:00" },
  { date: "2026-06-13", homeTeam: "Haití",          homeCode: "ht",     awayTeam: "Escocia",         awayCode: "gb-sct", time: "21:00" },
  { date: "2026-06-13", homeTeam: "Australia",      homeCode: "au",     awayTeam: "Turquía",         awayCode: "tr",     time: "00:00" }, // jornada del 13, kick-off 00:00 del 14 EDT
  // ── 14 de Junio ──
  { date: "2026-06-14", homeTeam: "Alemania",       homeCode: "de",     awayTeam: "Curazao",         awayCode: "cw",     time: "13:00" },
  { date: "2026-06-14", homeTeam: "Países Bajos",   homeCode: "nl",     awayTeam: "Japón",           awayCode: "jp",     time: "16:00" },
  { date: "2026-06-14", homeTeam: "Costa de Marfil",homeCode: "ci",     awayTeam: "Ecuador",         awayCode: "ec",     time: "19:00" },
  { date: "2026-06-14", homeTeam: "Suecia",         homeCode: "se",     awayTeam: "Túnez",           awayCode: "tn",     time: "22:00" },
  // ── 15 de Junio ──
  { date: "2026-06-15", homeTeam: "España",         homeCode: "es",     awayTeam: "Cabo Verde",      awayCode: "cv",     time: "12:00" },
  { date: "2026-06-15", homeTeam: "Bélgica",        homeCode: "be",     awayTeam: "Egipto",          awayCode: "eg",     time: "15:00" },
  { date: "2026-06-15", homeTeam: "Arabia Saudí",   homeCode: "sa",     awayTeam: "Uruguay",         awayCode: "uy",     time: "18:00" },
  { date: "2026-06-15", homeTeam: "RI de Irán",     homeCode: "ir",     awayTeam: "Nueva Zelanda",   awayCode: "nz",     time: "21:00" },
  // ── 16 de Junio ──
  { date: "2026-06-16", homeTeam: "Francia",        homeCode: "fr",     awayTeam: "Senegal",         awayCode: "sn",     time: "15:00" },
  { date: "2026-06-16", homeTeam: "Irak",           homeCode: "iq",     awayTeam: "Noruega",         awayCode: "no",     time: "18:00" },
  { date: "2026-06-16", homeTeam: "Argentina",      homeCode: "ar",     awayTeam: "Argelia",         awayCode: "dz",     time: "21:00" },
  { date: "2026-06-16", homeTeam: "Austria",        homeCode: "at",     awayTeam: "Jordania",        awayCode: "jo",     time: "00:00" }, // jornada del 16, kick-off 00:00 del 17 EDT
  // ── 17 de Junio ──
  { date: "2026-06-17", homeTeam: "Portugal",       homeCode: "pt",     awayTeam: "RD Congo",        awayCode: "cd",     time: "13:00" },
  { date: "2026-06-17", homeTeam: "Inglaterra",     homeCode: "gb-eng", awayTeam: "Croacia",         awayCode: "hr",     time: "16:00" },
  { date: "2026-06-17", homeTeam: "Ghana",          homeCode: "gh",     awayTeam: "Panamá",          awayCode: "pa",     time: "19:00" },
  { date: "2026-06-17", homeTeam: "Uzbekistán",     homeCode: "uz",     awayTeam: "Colombia",        awayCode: "co",     time: "22:00" },
  // ── 18 de Junio ──
  { date: "2026-06-18", homeTeam: "Rep. Checa",     homeCode: "cz",     awayTeam: "Sudáfrica",       awayCode: "za",     time: "12:00" },
  { date: "2026-06-18", homeTeam: "Suiza",          homeCode: "ch",     awayTeam: "Bosnia y Herz.",  awayCode: "ba",     time: "15:00" },
  { date: "2026-06-18", homeTeam: "Canadá",         homeCode: "ca",     awayTeam: "Catar",           awayCode: "qa",     time: "18:00" },
  { date: "2026-06-18", homeTeam: "México",         homeCode: "mx",     awayTeam: "Rep. de Corea",   awayCode: "kr",     time: "21:00" },
  // ── 19 de Junio ──
  { date: "2026-06-19", homeTeam: "Escocia",        homeCode: "gb-sct", awayTeam: "Marruecos",       awayCode: "ma",     time: "18:00" },
  { date: "2026-06-19", homeTeam: "Brasil",         homeCode: "br",     awayTeam: "Haití",           awayCode: "ht",     time: "20:30" },
  { date: "2026-06-19", homeTeam: "Turquía",        homeCode: "tr",     awayTeam: "Paraguay",        awayCode: "py",     time: "23:00" },
  { date: "2026-06-19", homeTeam: "Estados Unidos", homeCode: "us",     awayTeam: "Australia",       awayCode: "au",     time: "15:00" },
  // ── 20 de Junio ──
  { date: "2026-06-20", homeTeam: "Japón",          homeCode: "jp",     awayTeam: "Túnez",           awayCode: "tn",     time: "12:00" },
  { date: "2026-06-20", homeTeam: "Alemania",       homeCode: "de",     awayTeam: "Suecia",          awayCode: "se",     time: "15:00" },
  { date: "2026-06-20", homeTeam: "España",         homeCode: "es",     awayTeam: "Egipto",          awayCode: "eg",     time: "18:00" },
  { date: "2026-06-20", homeTeam: "Nueva Zelanda",  homeCode: "nz",     awayTeam: "Bélgica",         awayCode: "be",     time: "21:00" },
  // ── 21 de Junio ──
  { date: "2026-06-21", homeTeam: "Senegal",        homeCode: "sn",     awayTeam: "Noruega",         awayCode: "no",     time: "12:00" },
  { date: "2026-06-21", homeTeam: "Ecuador",        homeCode: "ec",     awayTeam: "Países Bajos",    awayCode: "nl",     time: "15:00" },
  { date: "2026-06-21", homeTeam: "Argelia",        homeCode: "dz",     awayTeam: "Irak",            awayCode: "iq",     time: "18:00" },
  { date: "2026-06-21", homeTeam: "Uruguay",        homeCode: "uy",     awayTeam: "RI de Irán",      awayCode: "ir",     time: "21:00" },
  // ── 22 de Junio ──
  { date: "2026-06-22", homeTeam: "Jordania",       homeCode: "jo",     awayTeam: "Portugal",        awayCode: "pt",     time: "12:00" },
  { date: "2026-06-22", homeTeam: "Argentina",      homeCode: "ar",     awayTeam: "Austria",         awayCode: "at",     time: "13:00" },
  { date: "2026-06-22", homeTeam: "Angola",         homeCode: "ao",     awayTeam: "Polonia",         awayCode: "pl",     time: "18:00" },
  { date: "2026-06-22", homeTeam: "Noruega",        homeCode: "no",     awayTeam: "Senegal",         awayCode: "sn",     time: "20:00" },
  { date: "2026-06-22", homeTeam: "Argelia",        homeCode: "dz",     awayTeam: "Jordania",        awayCode: "jo",     time: "23:00" },
  // ── 23 de Junio ──
  { date: "2026-06-23", homeTeam: "Francia",        homeCode: "fr",     awayTeam: "Irak",            awayCode: "iq",     time: "12:00" },
  { date: "2026-06-23", homeTeam: "Arabia Saudí",   homeCode: "sa",     awayTeam: "Eslovenia",       awayCode: "si",     time: "15:00" },
  { date: "2026-06-23", homeTeam: "Países Bajos",   homeCode: "nl",     awayTeam: "Turquía",         awayCode: "tr",     time: "18:00" },
  { date: "2026-06-23", homeTeam: "Marruecos",      homeCode: "ma",     awayTeam: "Brasil",          awayCode: "br",     time: "21:00" },
  // ── 24 de Junio ──
  { date: "2026-06-24", homeTeam: "Suiza",          homeCode: "ch",     awayTeam: "Canadá",          awayCode: "ca",     time: "15:00" },
  { date: "2026-06-24", homeTeam: "Bosnia y Herz.", homeCode: "ba",     awayTeam: "Catar",           awayCode: "qa",     time: "15:00" },
  { date: "2026-06-24", homeTeam: "Rep. Checa",     homeCode: "cz",     awayTeam: "México",          awayCode: "mx",     time: "21:00" },
  { date: "2026-06-24", homeTeam: "Sudáfrica",      homeCode: "za",     awayTeam: "Rep. de Corea",   awayCode: "kr",     time: "21:00" },
  // ── 25 de Junio ──
  { date: "2026-06-25", homeTeam: "Japón",          homeCode: "jp",     awayTeam: "Curazao",         awayCode: "cw",     time: "12:00" },
  { date: "2026-06-25", homeTeam: "Alemania",       homeCode: "de",     awayTeam: "Ecuador",         awayCode: "ec",     time: "12:00" },
  { date: "2026-06-25", homeTeam: "Haití",          homeCode: "ht",     awayTeam: "Australia",       awayCode: "au",     time: "16:00" },
  { date: "2026-06-25", homeTeam: "Paraguay",       homeCode: "py",     awayTeam: "Estados Unidos",  awayCode: "us",     time: "16:00" },
  { date: "2026-06-25", homeTeam: "Nueva Zelanda",  homeCode: "nz",     awayTeam: "Arabia Saudí",    awayCode: "sa",     time: "20:00" },
  { date: "2026-06-25", homeTeam: "Egipto",         homeCode: "eg",     awayTeam: "España",          awayCode: "es",     time: "20:00" },
  // ── 26 de Junio ──
  { date: "2026-06-26", homeTeam: "Costa de Marfil",homeCode: "ci",     awayTeam: "Suecia",          awayCode: "se",     time: "12:00" },
  { date: "2026-06-26", homeTeam: "Túnez",          homeCode: "tn",     awayTeam: "Países Bajos",    awayCode: "nl",     time: "12:00" },
  { date: "2026-06-26", homeTeam: "Turquía",        homeCode: "tr",     awayTeam: "Australia",       awayCode: "au",     time: "16:00" },
  { date: "2026-06-26", homeTeam: "Paraguay",       homeCode: "py",     awayTeam: "Haití",           awayCode: "ht",     time: "16:00" },
  { date: "2026-06-26", homeTeam: "Uruguay",        homeCode: "uy",     awayTeam: "Bélgica",         awayCode: "be",     time: "20:00" },
  { date: "2026-06-26", homeTeam: "RI de Irán",     homeCode: "ir",     awayTeam: "Cabo Verde",      awayCode: "cv",     time: "20:00" },
  // ── 27 de Junio ──
  { date: "2026-06-27", homeTeam: "Angola",         homeCode: "ao",     awayTeam: "Eslovenia",       awayCode: "si",     time: "12:00" },
  { date: "2026-06-27", homeTeam: "Portugal",       homeCode: "pt",     awayTeam: "Polonia",         awayCode: "pl",     time: "12:00" },
  { date: "2026-06-27", homeTeam: "Jordania",       homeCode: "jo",     awayTeam: "Francia",         awayCode: "fr",     time: "16:00" },
  { date: "2026-06-27", homeTeam: "Noruega",        homeCode: "no",     awayTeam: "Irak",            awayCode: "iq",     time: "16:00" },
  { date: "2026-06-27", homeTeam: "Argelia",        homeCode: "dz",     awayTeam: "Austria",         awayCode: "at",     time: "22:00" },
  { date: "2026-06-27", homeTeam: "Senegal",        homeCode: "sn",     awayTeam: "Argentina",       awayCode: "ar",     time: "22:00" },
  // ── Dieciseisavos de Final (Ronda de 32) ──
  { date: "2026-06-28", homeTeam: "2° Grupo A",     homeCode: "2a",     awayTeam: "2° Grupo B",      awayCode: "2b",     time: "15:00" }, // Partido 73
  { date: "2026-06-29", homeTeam: "1° Grupo E",     homeCode: "1e",     awayTeam: "3° A/B/C/D/F",    awayCode: "3a",     time: "16:30" }, // Partido 74
  { date: "2026-06-29", homeTeam: "1° Grupo F",     homeCode: "1f",     awayTeam: "2° Grupo C",      awayCode: "2c",     time: "21:00" }, // Partido 75
  { date: "2026-06-29", homeTeam: "1° Grupo C",     homeCode: "1c",     awayTeam: "2° Grupo F",      awayCode: "2f",     time: "13:00" }, // Partido 76
  { date: "2026-06-30", homeTeam: "1° Grupo I",     homeCode: "1i",     awayTeam: "3° C/D/F/G/H",    awayCode: "3c",     time: "17:00" }, // Partido 77
  { date: "2026-06-30", homeTeam: "2° Grupo E",     homeCode: "2e",     awayTeam: "2° Grupo I",      awayCode: "2i",     time: "13:00" }, // Partido 78
  { date: "2026-06-30", homeTeam: "1° Grupo A",     homeCode: "1a",     awayTeam: "3° C/E/F/H/I",    awayCode: "3c",     time: "21:00" }, // Partido 79
  { date: "2026-07-01", homeTeam: "1° Grupo L",     homeCode: "1l",     awayTeam: "3° E/H/I/J/K",    awayCode: "3e",     time: "12:00" }, // Partido 80
  { date: "2026-07-01", homeTeam: "1° Grupo D",     homeCode: "1d",     awayTeam: "3° B/E/F/I/J",    awayCode: "3b",     time: "20:00" }, // Partido 81
  { date: "2026-07-01", homeTeam: "1° Grupo G",     homeCode: "1g",     awayTeam: "3° A/E/H/I/J",    awayCode: "3a",     time: "16:00" }, // Partido 82
  { date: "2026-07-02", homeTeam: "2° Grupo K",     homeCode: "2k",     awayTeam: "2° Grupo L",      awayCode: "2l",     time: "19:00" }, // Partido 83
  { date: "2026-07-02", homeTeam: "1° Grupo H",     homeCode: "1h",     awayTeam: "2° Grupo J",      awayCode: "2j",     time: "15:00" }, // Partido 84
  { date: "2026-07-02", homeTeam: "1° Grupo B",     homeCode: "1b",     awayTeam: "3° E/F/G/I/J",    awayCode: "3e",     time: "23:00" }, // Partido 85
  { date: "2026-07-03", homeTeam: "1° Grupo J",     homeCode: "1j",     awayTeam: "2° Grupo H",      awayCode: "2h",     time: "18:00" }, // Partido 86
  { date: "2026-07-03", homeTeam: "1° Grupo K",     homeCode: "1k",     awayTeam: "3° D/E/I/J/L",    awayCode: "3d",     time: "21:30" }, // Partido 87
  { date: "2026-07-03", homeTeam: "2° Grupo D",     homeCode: "2d",     awayTeam: "2° Grupo G",      awayCode: "2g",     time: "14:00" }, // Partido 88

  // ── Octavos de Final ──
  { date: "2026-07-04", homeTeam: "Ganador 74",     homeCode: "g74",    awayTeam: "Ganador 77",      awayCode: "g77",    time: "17:00" }, // Partido 89
  { date: "2026-07-04", homeTeam: "Ganador 73",     homeCode: "g73",    awayTeam: "Ganador 75",      awayCode: "g75",    time: "13:00" }, // Partido 90
  { date: "2026-07-05", homeTeam: "Ganador 76",     homeCode: "g76",    awayTeam: "Ganador 78",      awayCode: "g78",    time: "16:00" }, // Partido 91
  { date: "2026-07-05", homeTeam: "Ganador 79",     homeCode: "g79",    awayTeam: "Ganador 80",      awayCode: "g80",    time: "20:00" }, // Partido 92
  { date: "2026-07-06", homeTeam: "Ganador 83",     homeCode: "g83",    awayTeam: "Ganador 84",      awayCode: "g84",    time: "15:00" }, // Partido 93
  { date: "2026-07-06", homeTeam: "Ganador 81",     homeCode: "g81",    awayTeam: "Ganador 82",      awayCode: "g82",    time: "20:00" }, // Partido 94
  { date: "2026-07-07", homeTeam: "Ganador 86",     homeCode: "g86",    awayTeam: "Ganador 88",      awayCode: "g88",    time: "12:00" }, // Partido 95
  { date: "2026-07-07", homeTeam: "Ganador 85",     homeCode: "g85",    awayTeam: "Ganador 87",      awayCode: "g87",    time: "16:00" }, // Partido 96

  // ── Cuartos de Final ──
  { date: "2026-07-09", homeTeam: "Ganador 89",     homeCode: "g89",    awayTeam: "Ganador 90",      awayCode: "g90",    time: "16:00" }, // Partido 97
  { date: "2026-07-10", homeTeam: "Ganador 93",     homeCode: "g93",    awayTeam: "Ganador 94",      awayCode: "g94",    time: "15:00" }, // Partido 98
  { date: "2026-07-11", homeTeam: "Ganador 91",     homeCode: "g91",    awayTeam: "Ganador 92",      awayCode: "g92",    time: "17:00" }, // Partido 99
  { date: "2026-07-11", homeTeam: "Ganador 95",     homeCode: "g95",    awayTeam: "Ganador 96",      awayCode: "g96",    time: "21:00" }, // Partido 100

  // ── Semifinales ──
  { date: "2026-07-14", homeTeam: "Ganador 97",     homeCode: "g97",    awayTeam: "Ganador 98",      awayCode: "g98",    time: "15:00" }, // Partido 101
  { date: "2026-07-15", homeTeam: "Ganador 99",     homeCode: "g99",    awayTeam: "Ganador 100",     awayCode: "g100",   time: "15:00" }, // Partido 102

  // ── Tercer Puesto ──
  { date: "2026-07-18", homeTeam: "Perdedor 101",   homeCode: "p101",   awayTeam: "Perdedor 102",    awayCode: "p102",   time: "17:00" }, // Partido 103

  // ── Final ──
  { date: "2026-07-19", homeTeam: "Ganador 101",    homeCode: "g101",   awayTeam: "Ganador 102",     awayCode: "g102",   time: "15:00" }, // Partido 104
];

async function fetchEspnScores(dateStr: string) {
  try {
    const formattedDate = dateStr.replace(/-/g, '');
    const res = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=${formattedDate}`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.events || [];
  } catch (e) {
    return [];
  }
}

// Devuelve el Date real del kick-off para buscar en ESPN y comparar con now.
// Partidos con time="00:00" ocurren a la medianoche del día SIGUIENTE en el calendario
// (D+1 00:00 EDT), pero pertenecen a la jornada D para su visualización.
function getMatchTime(dateStr: string, timeStr: string): Date {
  if (timeStr === "00:00") {
    const [year, month, day] = dateStr.split("-").map(Number);
    const next = new Date(year, month - 1, day + 1);
    const y = next.getFullYear();
    const mo = String(next.getMonth() + 1).padStart(2, '0');
    const d = String(next.getDate()).padStart(2, '0');
    return new Date(`${y}-${mo}-${d}T00:00:00-04:00`);
  }
  return new Date(`${dateStr}T${timeStr}:00-04:00`);
}

// Devuelve la fecha en formato YYYYMMDD que ESPN usa para el partido.
function getEspnDate(dateStr: string, timeStr: string): string {
  const mt = getMatchTime(dateStr, timeStr);
  // ESPN indexa los partidos por la fecha en hora del Este (UTC-4)
  const fmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' });
  return fmt.format(mt).replace(/-/g, '');
}

export async function GET() {
  try {
    const now = new Date();
    const vzlaFormatter = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Caracas', year: 'numeric', month: '2-digit', day: '2-digit' });
    const todayStr = vzlaFormatter.format(now);
    
    const yesterdayDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const yesterdayStr = vzlaFormatter.format(yesterdayDate);

    const espnCache: Record<string, any[]> = {};
    async function getEspnEventsForDate(dateStr: string) {
      if (espnCache[dateStr]) return espnCache[dateStr];
      const events = await fetchEspnScores(dateStr);
      espnCache[dateStr] = events;
      return events;
    }

    const todayMatchesRaw = OFFICIAL_FIXTURES.filter(m => m.date === todayStr);
    const todayMatches = await Promise.all(todayMatchesRaw.map(async (m) => {
      const matchTime = getMatchTime(m.date, m.time);

      if (now > matchTime) {
        const targetTime = matchTime.getTime();
        const espnDateStr = getEspnDate(m.date, m.time);

        const espnEvents = await getEspnEventsForDate(espnDateStr);
        const event = espnEvents.find((e: any) => new Date(e.date).getTime() === targetTime);
        if (event && event.competitions && event.competitions[0]) {
          const comp = event.competitions[0];
          const home = comp.competitors.find((c: any) => c.homeAway === "home");
          const away = comp.competitors.find((c: any) => c.homeAway === "away");
          return {
            homeTeam: m.homeTeam, homeCode: m.homeCode, awayTeam: m.awayTeam, awayCode: m.awayCode,
            homeScore: parseInt(home?.score) || 0, awayScore: parseInt(away?.score) || 0, time: m.time,
          };
        }
        return { homeTeam: m.homeTeam, homeCode: m.homeCode, awayTeam: m.awayTeam, awayCode: m.awayCode, homeScore: 0, awayScore: 0, time: m.time };
      }
      return { homeTeam: m.homeTeam, homeCode: m.homeCode, awayTeam: m.awayTeam, awayCode: m.awayCode, time: m.time };
    }));

    const yesterdayMatchesRaw = OFFICIAL_FIXTURES.filter(m => m.date === yesterdayStr);
    const yesterdayMatches = await Promise.all(yesterdayMatchesRaw.map(async (m) => {
      const matchTime = getMatchTime(m.date, m.time);
      const targetTime = matchTime.getTime();
      const espnDateStr = getEspnDate(m.date, m.time);

      const espnEvents = await getEspnEventsForDate(espnDateStr);
      const event = espnEvents.find((e: any) => new Date(e.date).getTime() === targetTime);
      if (event && event.competitions && event.competitions[0]) {
        const comp = event.competitions[0];
        const home = comp.competitors.find((c: any) => c.homeAway === "home");
        const away = comp.competitors.find((c: any) => c.homeAway === "away");
        return {
          homeTeam: m.homeTeam, homeCode: m.homeCode, awayTeam: m.awayTeam, awayCode: m.awayCode,
          homeScore: parseInt(home?.score) || 0, awayScore: parseInt(away?.score) || 0,
        };
      }
      return { homeTeam: m.homeTeam, homeCode: m.homeCode, awayTeam: m.awayTeam, awayCode: m.awayCode, homeScore: 0, awayScore: 0 };
    }));

    const MONTH_NAMES: Record<string, string> = { '06': 'Junio', '07': 'Julio' };

    const upcomingMatches = OFFICIAL_FIXTURES
      .filter(m => m.date > todayStr)
      .sort((a, b) => getMatchTime(a.date, a.time).getTime() - getMatchTime(b.date, b.time).getTime())
      .slice(0, 4)
      .map(m => {
        const [, month, day] = m.date.split('-');
        const monthName = MONTH_NAMES[month] ?? m.date;
        return {
          homeTeam: m.homeTeam, homeCode: m.homeCode, awayTeam: m.awayTeam, awayCode: m.awayCode,
          date: `${day} ${monthName}`,
        };
      });

    return Response.json({ today: todayMatches, yesterday: yesterdayMatches, upcoming: upcomingMatches });
  } catch (error) {
    return Response.json({ error: "Error al procesar los datos." }, { status: 500 });
  }
}