import { NextRequest } from "next/server";

// Copy the relevant parts of route.ts here to run it locally and check what it returns:
const OFFICIAL_FIXTURES = [
  // ── 19 de Junio ──
  { date: "2026-06-19", homeTeam: "Escocia",        homeCode: "gb-sct", awayTeam: "Marruecos",       awayCode: "ma",     time: "18:00" },
  { date: "2026-06-19", homeTeam: "Brasil",         homeCode: "br",     awayTeam: "Haití",           awayCode: "ht",     time: "20:30" },
  { date: "2026-06-19", homeTeam: "Turquía",        homeCode: "tr",     awayTeam: "Paraguay",        awayCode: "py",     time: "23:00" },
  { date: "2026-06-19", homeTeam: "Estados Unidos", homeCode: "us",     awayTeam: "Australia",       awayCode: "au",     time: "15:00" },
];

async function fetchEspnScores(dateStr: string) {
  try {
    const formattedDate = dateStr.replace(/-/g, '');
    const res = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=${formattedDate}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.events || [];
  } catch (e) {
    return [];
  }
}

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

function getEspnDate(dateStr: string, timeStr: string): string {
  const mt = getMatchTime(dateStr, timeStr);
  const fmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' });
  return fmt.format(mt).replace(/-/g, '');
}

async function testGet() {
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

  console.log("todayMatches JSON:\n", JSON.stringify(todayMatches, null, 2));
}

testGet();
