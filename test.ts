import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function run() {
  try {
    const m = { homeTeam: "México", awayTeam: "Sudáfrica", date: "2026-06-11" };
    const result = await generateText({
      model: google("gemini-2.5-flash", { useSearchGrounding: true }),
      prompt: `Busca el resultado final del partido de fútbol del Mundial 2026: ${m.homeTeam} vs ${m.awayTeam} jugado el ${m.date}. También puedes buscar en futbol2026.vercel.app. Devuelve SOLO el marcador en formato 'Home-Away' (ej: 2-1). Si no ha terminado o no hay dato, devuelve '0-0'.`,
    });
    console.log("Raw Result:", JSON.stringify(result.text));
    
    // Original parsing
    const scores = result.text.trim().split('-').map(s => parseInt(s) || 0);
    console.log("Original parsed scores:", scores);
    
    // Regex parsing
    const match = result.text.match(/(\d+)\s*-\s*(\d+)/);
    console.log("Regex parsed scores:", match ? [parseInt(match[1]), parseInt(match[2])] : "No match");
  } catch (error) {
    console.error("Error:", error);
  }
}
run();
