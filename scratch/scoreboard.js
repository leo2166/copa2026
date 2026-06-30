async function getScoreboard() {
  const url = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard';
  try {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      const events = data.events || [];
      console.log(`Encontrados ${events.length} eventos.`);
      events.forEach(event => {
        const statusObj = event.status || {};
        const state = statusObj.type?.state; // "pre", "in", "post"
        const detail = statusObj.type?.detail;
        const name = event.name;
        const date = event.date;
        console.log(`- Match: ${name} | Fecha: ${date} | Estado: ${state} (${detail})`);
        
        const competitions = event.competitions || [];
        competitions.forEach(comp => {
          const competitors = comp.competitors || [];
          competitors.forEach(c => {
            console.log(`  * Team: ${c.team?.displayName} (${c.homeAway}) | Score: ${c.score} | Winner: ${c.winner}`);
          });
        });
      });
    } else {
      console.log(`Error: ${res.status}`);
    }
  } catch (e) {
    console.error(e);
  }
}
getScoreboard();
