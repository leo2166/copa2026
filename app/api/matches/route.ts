// ─── Fixture completo Fase de Grupos — Mundial 2026 ───────────────────────────
// Todos los horarios en hora de Venezuela (VZT = UTC-4 = EDT verano EE.UU.)
// Un partido a las 00:00 pertenece al día de su fecha (m.date), NO al día siguiente.
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
  { date: "2026-06-13", homeTeam: "Australia",      homeCode: "au",     awayTeam: "Turquía",         awayCode: "tr",     time: "00:00" },
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
  { date: "2026-06-16", homeTeam: "Austria",        homeCode: "at",     awayTeam: "Jordania",        awayCode: "jo",     time: "00:00" },
  // ── 17 de Junio ──
  { date: "2026-06-17", homeTeam: "Portugal",       homeCode: "pt",     awayTeam: "Angola",          awayCode: "ao",     time: "12:00" },
  { date: "2026-06-17", homeTeam: "México",         homeCode: "mx",     awayTeam: "Rep. Checa",      awayCode: "cz",     time: "15:00" },
  { date: "2026-06-17", homeTeam: "Sudáfrica",      homeCode: "za",     awayTeam: "Rep. de Corea",   awayCode: "kr",     time: "18:00" },
  { date: "2026-06-17", homeTeam: "Polonia",        homeCode: "pl",     awayTeam: "Eslovenia",       awayCode: "si",     time: "21:00" },
  // ── 18 de Junio ──
  { date: "2026-06-18", homeTeam: "Rep. Checa",     homeCode: "cz",     awayTeam: "Sudáfrica",       awayCode: "za",     time: "12:00" },
  { date: "2026-06-18", homeTeam: "Suiza",          homeCode: "ch",     awayTeam: "Bosnia y Herz.",  awayCode: "ba",     time: "15:00" },
  { date: "2026-06-18", homeTeam: "Canadá",         homeCode: "ca",     awayTeam: "Catar",           awayCode: "qa",     time: "18:00" },
  { date: "2026-06-18", homeTeam: "México",         homeCode: "mx",     awayTeam: "Rep. de Corea",   awayCode: "kr",     time: "21:00" },
  // ── 19 de Junio ──
  { date: "2026-06-19", homeTeam: "Escocia",        homeCode: "gb-sct", awayTeam: "Marruecos",       awayCode: "ma",     time: "12:00" },
  { date: "2026-06-19", homeTeam: "Brasil",         homeCode: "br",     awayTeam: "Haití",           awayCode: "ht",     time: "15:00" },
  { date: "2026-06-19", homeTeam: "Turquía",        homeCode: "tr",     awayTeam: "Paraguay",        awayCode: "py",     time: "18:00" },
  { date: "2026-06-19", homeTeam: "Estados Unidos", homeCode: "us",     awayTeam: "Australia",       awayCode: "au",     time: "21:00" },
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
  // ── Grupos adicionales (Fase de Grupos Días 7-9) ──
  { date: "2026-06-17", homeTeam: "Eslovenia",      homeCode: "si",     awayTeam: "Arabia Saudí",    awayCode: "sa",     time: "00:00" },
  { date: "2026-06-18", homeTeam: "Cabo Verde",     homeCode: "cv",     awayTeam: "Bélgica",         awayCode: "be",     time: "00:00" },
  { date: "2026-06-19", homeTeam: "Angola",         homeCode: "ao",     awayTeam: "Portugal",        awayCode: "pt",     time: "00:00" },
  { date: "2026-06-20", homeTeam: "Curazao",        homeCode: "cw",     awayTeam: "Costa de Marfil", awayCode: "ci",     time: "00:00" },
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

export async function GET() {
  try {
    // Hora real del sistema
    const now = new Date();
    // Fechas y horas en base a Venezuela (UTC-4)
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
      // La fecha del fixture en Venezuela (m.date) determina a qué día pertenece el partido.
      // Un partido a las 00:00 pertenece al día m.date — NO se desplaza al día siguiente.
      const matchTime = new Date(`${m.date}T${m.time}:00-04:00`);

      if (now > matchTime) {
        const targetTime = matchTime.getTime();
        // ESPN usa EDT (UTC-4) = misma zona que Venezuela.
        // La fecha para ESPN es m.date directamente (no se convierte a UTC).
        const espnDateStr = m.date.replace(/-/g, '');

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
      // Mismo principio: el partido pertenece al día del fixture (m.date en Venezuela).
      // La fecha UTC del matchTime se usa para consultar ESPN.
      const matchTime = new Date(`${m.date}T${m.time}:00-04:00`);
      
      const targetTime = matchTime.getTime();
      // ESPN usa EDT (UTC-4) = misma zona que Venezuela.
      // La fecha para ESPN es m.date directamente (no se convierte a UTC).
      const espnDateStr = m.date.replace(/-/g, '');

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
      .sort((a, b) => {
        const ta = new Date(`${a.date}T${a.time}:00-04:00`).getTime();
        const tb = new Date(`${b.date}T${b.time}:00-04:00`).getTime();
        return ta - tb;
      })
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