import { useState, useEffect } from "react";
import useSWR from "swr";

export type Fixtures = {
  today: { homeTeam: string; homeCode: string; awayTeam: string; awayCode: string; time: string }[];
  yesterday: {
    homeTeam: string;
    homeCode: string;
    awayTeam: string;
    awayCode: string;
    homeScore: number;
    awayScore: number;
  }[];
  upcoming: { homeTeam: string; homeCode: string; awayTeam: string; awayCode: string; date: string }[];
};

const fetcher = (url: string) =>
  fetch(url)
    .then(async (r) => {
      const json = await r.json();
      if (!r.ok || json.error) throw new Error(json.error || "Error al obtener los partidos.");
      return json;
    })
    .catch((e) => {
      console.error("Fetcher error:", e);
      throw e;
    });

/**
 * Hook reutilizable para cargar los fixtures de la Copa del Mundo.
 * Devuelve los datos, estado de carga, errores y la función `mutate` para refrescar.
 */
export function useMatches() {
  const [mounted, setMounted] = useState(false);
  const { data, error, isLoading, mutate, isValidating } = useSWR<Fixtures>("/api/matches", fetcher, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return { mounted, data, error, isLoading, mutate, isValidating };
}
