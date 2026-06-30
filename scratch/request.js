async function main() {
  try {
    console.log("Realizando petición HTTP al API de matches...");
    const res = await fetch("http://localhost:4500/api/matches");
    console.log(`Status: ${res.status}`);
    const data = await res.json();
    console.log("Respuesta de la API recibida con éxito.");
  } catch (error) {
    console.error("Error en la petición:", error.message);
  }
}
main();
