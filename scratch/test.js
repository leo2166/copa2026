async function test() {
  const url = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260628';
  try {
    const res = await fetch(url);
    console.log(`URL: ${url}`);
    console.log(`Status: ${res.status}`);
    if (res.ok) {
      const data = await res.json();
      const events = data.events || [];
      console.log(`Encontrados ${events.length} eventos.`);
      events.forEach(event => {
        const name = event.name;
        const statusObj = event.status || {};
        const state = statusObj.type?.state;
        const detail = statusObj.type?.detail;
        console.log(`\nPartido: ${name} | Estado: ${state} (${detail})`);
        
        const comps = event.competitions || [];
        comps.forEach(comp => {
          const competitors = comp.competitors || [];
          competitors.forEach(c => {
            console.log(`  * ${c.team?.displayName} (${c.homeAway}): Score: ${c.score} | Winner: ${c.winner}`);
          });
        });
      });
    }
  } catch (e) {
    console.error(`Error:`, e.message);
  }
}
test();
