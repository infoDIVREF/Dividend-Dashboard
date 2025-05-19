"use client";

import { useEffect, useState } from "react";
import { useFilters } from "@/contexts/FiltersContext";
import { useAuth } from "@/hooks/useAuth";

export function useGetDataByCountry() {
  const { selectedFilters } = useFilters();
  const { token, collaboratorId } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collaboratorId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const isoCodes = selectedFilters.countries
        .map((c) => c.isoCode)
        .join(",");

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/claims/total-by-country/${collaboratorId}?countries=${isoCodes}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Error al obtener datos por país");

        const json = await res.json();

        // Transformamos el objeto byCountry en array
        const parsed = Object.entries(json.data.byCountry).map(
          ([isoCode, values]) => ({
            name: isoCode,
            // @ts-expect-error sorry dayan
            enTramite: values.totalPendiente,
            // @ts-expect-error sorry dayan
            enviado: values.totalEnviado,
            // @ts-expect-error sorry dayan
            recuperado: values.totalRecuperado,
          })
        );

        // @ts-expect-error sorry dayan
        setData(parsed);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedFilters.countries, collaboratorId]);

  return { data, loading, error };
}
