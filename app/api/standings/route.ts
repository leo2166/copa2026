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

async function updateStandingsCache(): Promise<any> {
  if (isUpdating) return null;
  isUpdating = true;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000); // 4 segundos de timeout

  try {
    const res = await fetch('https://site.api.espn.com/apis/v2/sports/soccer/fifa.world/standings', {
      next: { revalidate: 0 },
      cache: 'no-store',
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

      teams.sort((a: any, b: any) => a.rank - b.rank);

      return {
        groupName: translatedGroupName,
        teams
      };
    });

    if (standings && standings.length > 0) {
      const dir = path.dirname(CACHE_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const cacheData = {
        timestamp: Date.now(),
        data: standings
      };
      fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData, null, 2), 'utf-8');
      console.log("Caché de standings en disco actualizada con éxito.");
      return standings;
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
  let cachedData: { timestamp: number; data: any } | null = null;

  try {
    if (fs.existsSync(CACHE_FILE)) {
      const rawFile = fs.readFileSync(CACHE_FILE, 'utf-8');
      cachedData = JSON.parse(rawFile);
    }
  } catch (e) {
    console.error("Error al leer la caché de standings en disco:", e);
  }

  // 1. Si hay caché fresca, responder de inmediato (< 20ms)
  if (cachedData && (now - cachedData.timestamp < CACHE_DURATION)) {
    return Response.json(cachedData.data);
  }

  // 2. Si la caché expiró, intentar actualización síncrona para asegurar que el cliente tenga datos reales de inmediato
  if (cachedData) {
    console.log("Caché expirada. Iniciando actualización síncrona...");
    const freshData = await updateStandingsCache();
    if (freshData) {
      return Response.json(freshData);
    }
    // Si falla el fetch síncrono a ESPN, servimos la caché vieja de inmediato como contingencia (no bloquea al cliente)
    console.warn("Fallo al actualizar de ESPN de forma síncrona. Devolviendo caché expirada...");
    return Response.json(cachedData.data);
  }

  // 3. Si no hay caché en absoluto, fetch síncrono inicial
  console.log("No se encontró caché en disco. Realizando fetch inicial síncrono...");
  const data = await updateStandingsCache();
  
  if (data) {
    return Response.json(data);
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
        const dir = path.dirname(CACHE_FILE);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(CACHE_FILE, JSON.stringify({ timestamp: Date.now(), data: standings }, null, 2), 'utf-8');
        return Response.json(standings);
      }
    }
  } catch (backupError) {
    console.error("Error al procesar el archivo de respaldo de scratch:", backupError);
  }

  return Response.json({ error: 'Error al procesar la clasificación inicial.' }, { status: 500 });
}
