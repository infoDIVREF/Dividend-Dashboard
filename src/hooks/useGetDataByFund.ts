import { useEffect, useState } from "react";
import { useFilters } from "@/contexts/FiltersContext";
import { useAuth } from "@/hooks/useAuth";

export function useGetDataByFund() {
  const { selectedFilters } = useFilters();
  const { token, collaboratorId } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collaboratorId || selectedFilters.funds.length === 0) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const ids = selectedFilters.funds.map((f) => f.id).join(",");
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/claims/total-by-fund/${collaboratorId}?funds=${ids}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) throw new Error("Error al obtener datos por fondo");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedFilters.funds, collaboratorId]);

  return { data, loading, error };
}
