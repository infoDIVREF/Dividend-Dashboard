import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { iso2to3 } from "@/utils/iso2to3";
import axiosInstance from "@/lib/axiosInstance";

export interface CountryMapData {
  isoCode: string;
  isoCode3: string;
  country: string;
  totalPending: number;
  totalSent: number;
  totalRecovered: number;
}

interface ApiResponse {
  status: "success" | "error";
  data: CountryMapData[];
}

export const useGetMapData = () => {
  const { collaboratorId, token } = useAuth();
  const [mapData, setMapData] = useState<CountryMapData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMapData = useCallback(async () => {
    if (!collaboratorId) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await axiosInstance.get<ApiResponse>(
        `/totalByCountry/${collaboratorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (res.data.status !== "success") {
        throw new Error("Respuesta inválida del servidor");
      }

      setMapData(
        res.data.data.map((item) => ({
          ...item,
          isoCode3: iso2to3[item.isoCode] || item.isoCode,
        }))
      );
    } catch (err) {
      console.error("Error en useGetMapData:", err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  }, [collaboratorId, token]);

  useEffect(() => {
    fetchMapData();
  }, [fetchMapData]);

  return { mapData, isLoading, error };
};
