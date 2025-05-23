import { useEffect, useState } from "react";
import { useFilters } from "@/contexts/FiltersContext";
import { useAuth } from "@/hooks/useAuth";
import axiosInstance from "@/lib/axiosInstance";

export function useGetTotalChartData() {
  const { selectedFilters } = useFilters();
  const { token, collaboratorId } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collaboratorId) return;

    const fetchData = async () => {
      setLoading(true);
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
        const res = await axiosInstance.get(
          `/claims/total/${collaboratorId}?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setData(res.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedFilters, collaboratorId, token]);

  return { data, loading, error };
}
