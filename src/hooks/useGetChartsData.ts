// src/hooks/useChartData.ts
import { useEffect, useState } from "react";
import { useFilters } from "@/contexts/FiltersContext";
import { useAuth } from "@/hooks/useAuth";

export function useGetChartData() {
  const { selectedFilters } = useFilters();
  const { token, collaboratorId } = useAuth();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collaboratorId) return;

    const fetchChartData = async () => {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (selectedFilters.years.length)
        params.append("years", selectedFilters.years.join(","));
      if (selectedFilters.countries.length)
        params.append(
          "countries",
          selectedFilters.countries.map((c) => c.isoCode).join(",")
        );
      if (selectedFilters.methods.length)
        params.append("methods", selectedFilters.methods.join(","));
      if (selectedFilters.funds.length)
        params.append(
          "funds",
          selectedFilters.funds.map((f) => f.id).join(",")
        );

      try {
        const response = await fetch(
          `https://pre-dividend.dseos.com/api/claims/total/${collaboratorId}?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al cargar los datos de los gráficos");
        }

        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartData();
  }, [selectedFilters, collaboratorId]);

  return { data, isLoading, error };
}
