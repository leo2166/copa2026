async function run() {
  const dateStr = "20260611"; // YYYYMMDD format
  const res = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=${dateStr}`);
  const data = await res.json();
  data.events.forEach((event: any) => {
    const eventTime = new Date(event.date).getTime();
    console.log(event.name, event.date, eventTime);
  });
  
  const ourTime1 = new Date(`2026-06-11T15:00:00-04:00`).getTime();
  const ourTime2 = new Date(`2026-06-11T22:00:00-04:00`).getTime();
  console.log("Our times:", ourTime1, ourTime2);
}
run();
