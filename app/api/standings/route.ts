import fs from 'fs';
import path from 'path';

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
  "czechia": { name: "Rep. Checa", code: "cz" },
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

const CACHE_FILE = path.join(process.cwd(), 'data', 'standings-cache.json');
const CACHE_DURATION = 5 * 60 * 1000;
let isUpdating = false;
let memoryCache: { timestamp: number; data: any } | null = null;

// ─────────────────────────────────────────────────────────────────────────────
// CORRECCIONES MANUALES: Se aplican SOBRE los datos de ESPN cuando la API
// externa tarda en actualizar sus cachés. Borrar una entrada cuando ESPN
// ya refleje los datos reales.
// ─────────────────────────────────────────────────────────────────────────────
type TeamCorrection = {
  rank: number; played: number; wins: number; draws: number; losses: number;
  goalsFor: number; goalsAgainst: number; goalDifference: number; points: number;
};
const GROUP_CORRECTIONS: Record<string, Record<string, TeamCorrection>> = {
  "Grupo L": {
    "Croacia":  { rank: 3, played: 2, wins: 1, draws: 0, losses: 1, goalsFor: 3, goalsAgainst: 4, goalDifference: -1, points: 3 },
    "Panamá":   { rank: 4, played: 2, wins: 0, draws: 0, losses: 2, goalsFor: 0, goalsAgainst: 2, goalDifference: -2, points: 0 },
  },
};

function applyCorrections(standings: any[]): any[] {
  return standings.map(group => {
    const corrections = GROUP_CORRECTIONS[group.groupName];
    if (!corrections) return group;

    const correctedTeams = group.teams.map((t: any) => {
      if (corrections[t.name]) {
        return { ...t, ...corrections[t.name] };
      }
      return t;
    });

    // Re-ordenar con los datos corregidos
    correctedTeams.sort((a: any, b: any) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    });
    correctedTeams.forEach((t: any, i: number) => { t.rank = i + 1; });

    return { ...group, teams: correctedTeams };
  });
}

async function updateStandingsCache(): Promise<any> {
  if (isUpdating) return null;
  isUpdating = true;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000); // 4 segundos de timeout

  try {
    // Añadir timestamp para romper la caché CDN de ESPN
    const espnUrl = `https://site.api.espn.com/apis/v2/sports/soccer/fifa.world/standings?_=${Date.now()}`;
    const res = await fetch(espnUrl, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Error en API externa: ${res.status}`);
    }

    const rawData = await res.json();
    const children = rawData.children || [];

    const standings = children.map((group: any) => {
      const groupName = group.name || group.abbreviation || "Grupo";
      let translatedGroupName = groupName;
      if (groupName.toLowerCase().startsWith("group ")) {
        translatedGroupName = groupName.replace(/group /i, "Grupo ");
      }

      const entries = group.standings?.entries || [];
      const teams = entries.map((entry: any) => {
        const teamObj = entry.team || {};
        const teamDetails = getTeamDetails(teamObj.abbreviation, teamObj.displayName);

        const stats = entry.stats || [];
        const getValue = (name: string) => {
          const stat = stats.find((s: any) => s.name === name);
          return stat ? stat.value : 0;
        };

        return {
          rank: getValue("rank") || entry.note?.rank || 0,
          name: teamDetails.name,
          code: teamDetails.code,
          logo: teamObj.logos?.[0]?.href || `https://a.espncdn.com/i/teamlogos/countries/500/${teamDetails.code}.png`,
          played: getValue("gamesPlayed"),
          wins: getValue("wins"),
          draws: getValue("ties"),
          losses: getValue("losses"),
          goalsFor: getValue("pointsFor"),
          goalsAgainst: getValue("pointsAgainst"),
          goalDifference: getValue("pointDifferential"),
          points: getValue("points"),
        };
      });

      // Ordenar por criterios FIFA: puntos → diferencia de goles → goles a favor
      // (No confiamos en el campo `rank` de ESPN que puede estar desactualizado)
      teams.sort((a: any, b: any) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
        return b.goalsFor - a.goalsFor;
      });

      // Reasignar el rank según el orden correcto calculado
      teams.forEach((t: any, i: number) => { t.rank = i + 1; });

      return {
        groupName: translatedGroupName,
        teams
      };
    });

    const correctedStandings = applyCorrections(standings);

    if (correctedStandings && correctedStandings.length > 0) {
      // Actualizar caché en memoria
      memoryCache = {
        timestamp: Date.now(),
        data: correctedStandings
      };

      // Intentar actualizar caché en disco de forma segura (fallará en Vercel, pero se captura silenciosamente)
      try {
        const dir = path.dirname(CACHE_FILE);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        const cacheData = {
          timestamp: Date.now(),
          data: correctedStandings
        };
        fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData, null, 2), 'utf-8');
        console.log("Caché de standings en disco actualizada con éxito.");
      } catch (writeError) {
        console.warn("No se pudo escribir la caché en disco (normal en Vercel Serverless):", writeError);
      }
      return correctedStandings;
    }
    return null;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("Error al actualizar la caché de standings:", error);
    return null;
  } finally {
    isUpdating = false;
  }
}

export async function GET() {
  const now = Date.now();
  
  // 0. Si hay caché en memoria fresca, responder de inmediato (< 1ms)
  if (memoryCache && (now - memoryCache.timestamp < CACHE_DURATION)) {
    console.log("Sirviendo clasificación desde caché en memoria fresca...");
    return Response.json(memoryCache.data, {
      headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' }
    });
  }

  let cachedData: { timestamp: number; data: any } | null = null;

  try {
    if (fs.existsSync(CACHE_FILE)) {
      const rawFile = fs.readFileSync(CACHE_FILE, 'utf-8');
      cachedData = JSON.parse(rawFile);
      // Al alimentar la caché en memoria por primera vez desde el disco
      if (cachedData && !memoryCache) {
        memoryCache = cachedData;
      }
    }
  } catch (e) {
    console.error("Error al leer la caché de standings en disco:", e);
  }

  // 1. Si hay caché fresca en disco (y no estaba en memoria), responder de inmediato
  if (cachedData && (now - cachedData.timestamp < CACHE_DURATION)) {
    return Response.json(cachedData.data, {
      headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' }
    });
  }

  // 2. Si la caché expiró, intentar actualización síncrona
  if (cachedData) {
    console.log("Caché expirada. Iniciando actualización síncrona...");
    const freshData = await updateStandingsCache();
    if (freshData) {
      return Response.json(freshData, {
        headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' }
      });
    }
    // Si falla el fetch síncrono, servimos la caché vieja de inmediato como contingencia
    console.warn("Fallo al actualizar de ESPN de forma síncrona. Devolviendo caché expirada...");
    return Response.json(cachedData.data, {
      headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' }
    });
  }

  // 3. Si no hay caché en absoluto, fetch síncrono inicial
  console.log("No se encontró caché. Realizando fetch inicial síncrono...");
  const data = await updateStandingsCache();
  
  if (data) {
    return Response.json(data, {
      headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' }
    });
  }

  // 4. Si falla todo y no hay nada en caché, contingencia con backup de scratch
  try {
    const backupPath = path.join(process.cwd(), 'scratch', 'test-standings.json');
    if (fs.existsSync(backupPath)) {
      console.warn("Usando archivo de respaldo de scratch debido a fallo total en fetch inicial...");
      const rawBackup = fs.readFileSync(backupPath, 'utf-8');
      const backupJson = JSON.parse(rawBackup);
      
      const children = backupJson.children || [];
      const standings = children.map((group: any) => {
        const groupName = group.name || group.abbreviation || "Grupo";
        let translatedGroupName = groupName;
        if (groupName.toLowerCase().startsWith("group ")) {
          translatedGroupName = groupName.replace(/group /i, "Grupo ");
        }

        const entries = group.standings?.entries || [];
        const teams = entries.map((entry: any) => {
          const teamObj = entry.team || {};
          const teamDetails = getTeamDetails(teamObj.abbreviation, teamObj.displayName);
          const stats = entry.stats || [];
          const getValue = (name: string) => {
            const stat = stats.find((s: any) => s.name === name);
            return stat ? stat.value : 0;
          };
          return {
            rank: getValue("rank") || entry.note?.rank || 0,
            name: teamDetails.name,
            code: teamDetails.code,
            logo: teamObj.logos?.[0]?.href || `https://a.espncdn.com/i/teamlogos/countries/500/${teamDetails.code}.png`,
            played: getValue("gamesPlayed"),
            wins: getValue("wins"),
            draws: getValue("ties"),
            losses: getValue("losses"),
            goalsFor: getValue("pointsFor"),
            goalsAgainst: getValue("pointsAgainst"),
            goalDifference: getValue("pointDifferential"),
            points: getValue("points"),
          };
        });
        teams.sort((a: any, b: any) => a.rank - b.rank);
        return { groupName: translatedGroupName, teams };
      });

      if (standings.length > 0) {
        // Guardar en memoria
        memoryCache = { timestamp: Date.now(), data: standings };
        
        // Intentar escribir en disco
        try {
          const dir = path.dirname(CACHE_FILE);
          if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(CACHE_FILE, JSON.stringify({ timestamp: Date.now(), data: standings }, null, 2), 'utf-8');
        } catch (writeError) {
          console.warn("No se pudo escribir la caché de respaldo en disco:", writeError);
        }
        return Response.json(standings, {
          headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' }
        });
      }
    }
  } catch (backupError) {
    console.error("Error al procesar el archivo de respaldo de scratch:", backupError);
  }

  return Response.json(
    { error: 'Error al procesar la clasificación inicial.' },
    {
      status: 500,
      headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' }
    }
  );
}
