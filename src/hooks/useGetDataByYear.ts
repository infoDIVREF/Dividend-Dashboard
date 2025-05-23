import { useEffect, useState } from "react";
import { useFilters } from "@/contexts/FiltersContext";
import { useAuth } from "@/hooks/useAuth";
import axiosInstance from "@/lib/axiosInstance";

export function useGetDataByYear() {
  const { selectedFilters } = useFilters();
  const { token, collaboratorId } = useAuth();
  const [data, setData] = useState([]); // ← array directamente usable en el gráfico
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!collaboratorId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const years = selectedFilters.years.join(",");

      try {
        const res = await axiosInstance.get(
          `/claims/total-by-year/${collaboratorId}?years=${years}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );


        const parsed = Object.entries(res.data.data.byYear).map(
          ([year, values]) => ({
            name: year,
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
        // @ts-expect-error sorry dayan

        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedFilters.years, collaboratorId, token]);

  return { data, loading, error };
}
