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

    const espnToday = await fetchEspnScores(todayStr);
    const todayMatchesRaw = OFFICIAL_FIXTURES.filter(m => m.date === todayStr);
    const todayMatches = todayMatchesRaw.map((m) => {
      const matchTime = new Date(`${m.date}T${m.time}:00-04:00`);
      
      if (now > matchTime) {
        const targetTime = matchTime.getTime();
        const event = espnToday.find((e: any) => new Date(e.date).getTime() === targetTime);
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
    });

    const espnYesterday = await fetchEspnScores(yesterdayStr);
    const yesterdayMatchesRaw = OFFICIAL_FIXTURES.filter(m => m.date === yesterdayStr);

    const yesterdayMatches = yesterdayMatchesRaw.map((m) => {
      const matchTime = new Date(`${m.date}T${m.time}:00-04:00`);
      const targetTime = matchTime.getTime();
      const event = espnYesterday.find((e: any) => new Date(e.date).getTime() === targetTime);
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
    });

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