const fs = require('fs');
const path = require('path');

const TEAM_MAP = {
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
  "WAL": { name: "Gales", code: "gb-wls" }
};

function getTeamDetails(abbreviation, displayName) {
  const cleanAbb = abbreviation?.toUpperCase().trim() ?? "";
  if (TEAM_MAP[cleanAbb]) {
    return TEAM_MAP[cleanAbb];
  }
  const cleanName = displayName?.toLowerCase().trim() ?? "";
  for (const [k, v] of Object.entries(TEAM_MAP)) {
    if (k.toLowerCase() === cleanName) return v;
  }
  return {
    name: displayName ?? abbreviation ?? "Desconocido",
    code: cleanAbb.substring(0, 2).toLowerCase()
  };
}

try {
  const rawData = JSON.parse(fs.readFileSync('scratch/test-standings.json', 'utf8'));
  const children = rawData.children || [];

  const standings = children.map((group) => {
    const groupName = group.name || group.abbreviation || "Grupo";
    const entries = group.standings?.entries || [];
    const teams = entries.map((entry) => {
      const teamObj = entry.team || {};
      const teamDetails = getTeamDetails(teamObj.abbreviation, teamObj.displayName);

      const stats = entry.stats || [];
      const getValue = (name) => {
        const stat = stats.find((s) => s.name === name);
        return stat ? stat.value : 0;
      };

      return {
        rank: getValue("rank") || entry.note?.rank || 0,
        name: teamDetails.name,
        code: teamDetails.code,
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

    teams.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    });

    teams.forEach((t, i) => { t.rank = i + 1; });

    return {
      groupName,
      teams
    };
  });

  // Mostrar los standings de cada grupo de forma legible
  standings.forEach(g => {
    console.log(`\n=== ${g.groupName} ===`);
    g.teams.forEach(t => {
      console.log(`${t.rank}. ${t.name.padEnd(20)} PJ:${t.played} G:${t.wins} E:${t.draws} P:${t.losses} GF:${t.goalsFor} GC:${t.goalsAgainst} GD:${t.goalDifference} PTS:${t.points}`);
    });
  });

} catch (err) {
  console.error("Error reading/parsing:", err);
}
