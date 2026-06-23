import { useState, useEffect } from "react";
import useSWR from "swr";

export type TeamStanding = {
  rank: number;
  name: string;
  code: string;
  logo: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
};

export type GroupStanding = {
  groupName: string;
  teams: TeamStanding[];
};

const fetcher = (url: string) =>
  fetch(url)
    .then(async (r) => {
      const json = await r.json();
      if (!r.ok || json.error) throw new Error(json.error || "Error al obtener la clasificación.");
      return json;
    })
    .catch((e) => {
      console.error("Fetcher error for standings:", e);
      throw e;
    });

/**
 * Hook para cargar la clasificación por grupos del Mundial 2026.
 */
export function useStandings() {
  const [mounted, setMounted] = useState(false);
  const { data, error, isLoading, mutate, isValidating } = useSWR<GroupStanding[]>("/api/standings", fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    dedupingInterval: 60000, // Evitar peticiones repetidas en menos de 1 minuto
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    mounted,
    standings: data,
    error,
    isLoading,
    mutate,
    isValidating
  };
}
