async function test() {
  const urls = [
    'https://site.api.espn.com/apis/v2/sports/soccer/fifa.world/standings',
    'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/standings?season=2026',
    'https://site.api.espn.com/apis/v2/sports/soccer/fifa.world/standings?season=2026',
    'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard'
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url);
      console.log(`URL: ${url}`);
      console.log(`Status: ${res.status}`);
      if (res.ok) {
        const data = await res.json();
        const keys = Object.keys(data);
        console.log(`Keys:`, keys);
        if (keys.length > 0) {
          // Guardar el primero que funcione
          const fs = require('fs');
          fs.writeFileSync('scratch/test-standings.json', JSON.stringify(data, null, 2));
          console.log(`Saved non-empty data from ${url} to scratch/test-standings.json`);
          break;
        }
      }
    } catch (e) {
      console.error(`Error for ${url}:`, e.message);
    }
  }
}
test();
