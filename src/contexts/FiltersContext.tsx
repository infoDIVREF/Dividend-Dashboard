// src/contexts/FiltersContext.tsx

"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "@/hooks/useAuth";

type Country = {
  name: string;
  isoCode: string;
};

type Fund = {
  id: number;
  name: string;
};

interface Filters {
  years: string[];
  countries: Country[];
  methods: string[];
  funds: Fund[];
  claimStatus: string[];
}

interface FiltersContextType {
  initialFilters: Filters;
  selectedFilters: Filters;
  isLoading: boolean;
  error: string | null;
  clearSelectedFilters: (filters: Filters) => void;
  setSelectedFilters: (filters: Filters) => void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateSelectedFilter: (key: keyof Filters, value: any) => void;
  reloadFilters: () => void;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

const defaultFilters: Filters = {
  years: [],
  countries: [],
  methods: [],
  funds: [],
  claimStatus: ["EN TRÁMITE", "ENVIADO", "RECUPERADO"],
};

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const { collaboratorId, token } = useAuth();

  const [initialFilters, setInitialFilters] = useState<Filters>(defaultFilters);
  const [selectedFilters, setSelectedFilters] =
    useState<Filters>(defaultFilters);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* const fetchFilters = useCallback(async () => {
    if (!collaboratorId) return;
    setIsLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/filters/all/${collaboratorId}`,
        { headers }
      );

      if (!response.ok) {
        throw new Error(`Error fetching filters: ${response.statusText}`);
      }

      const data = await response.json();

      const { years, methods, countries, funds } = data;
      // Ahora puedes usar `years`, `methods` y `countries` según sea necesario
      const loadedFilters: Filters = {
        years: years,
        countries: countries,
        methods: ["DTTR", "TJUE"],
        funds: funds,
        claimStatus: ["EN TRÁMITE", "ENVIADO", "RECUPERADO"],
      };

      setInitialFilters(loadedFilters);
      setSelectedFilters(defaultFilters);
    } catch (error) {
      console.error("Error fetching filters:", error);
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  }, [collaboratorId, token]); */

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const loadInitialFilters = useCallback(async () => {
    if (!collaboratorId) return;
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/filters/all/${collaboratorId}`,
        { headers }
      );
      const data = await response.json();
      const loaded: Filters = {
        years: data.years,
        countries: data.countries,
        methods: ["DTTR", "TJUE"],
        funds: data.funds,
        claimStatus: ["EN TRÁMITE", "ENVIADO", "RECUPERADO"],
      };
      setInitialFilters(loaded);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  }, [collaboratorId]);

  const updateFiltersBySelection = async (filters: Filters) => {
    if (!collaboratorId) return;
    setIsLoading(true);
    const params = new URLSearchParams();
    if (filters.years.length) params.append("year", filters.years.join(","));
    if (filters.countries.length)
      params.append(
        "country",
        filters.countries.map((c) => c.isoCode).join(",")
      );
    if (filters.methods.length)
      params.append("method", filters.methods.join(","));
    if (filters.funds.length)
      params.append("fund", filters.funds.map((f) => f.id).join(","));

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/filters/all/${collaboratorId}?${params.toString()}`,
        { headers }
      );

      const data = await response.json();
      const updatedFilters: Filters = {
        years: data.years,
        countries: data.countries,
        methods: ["DTTR", "TJUE"],
        funds: data.funds,
        claimStatus: ["EN TRÁMITE", "ENVIADO", "RECUPERADO"],
      };

      setSelectedFilters(updatedFilters);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  };

  /* useEffect(() => {
    fetchFilters();
  }, [fetchFilters]); */

  useEffect(() => {
    loadInitialFilters();
  }, [loadInitialFilters]);

  const updateSelectedFilter = (key: keyof Filters, value: string) => {
    console.log("CLICK");
    // Creamos una copia local del filtro actual
    const current = new Set<string>(
      selectedFilters[key] as string[] // string[], ids o isoCodes según el filtro
    );
    if (current.has(value)) {
      current.delete(value);
    } else {
      current.add(value);
    }
    const updatedFilters: Filters = {
      ...selectedFilters,
      [key]: Array.from(current),
    };
    // Actualizamos el estado
    setSelectedFilters(updatedFilters);
    // Disparamos la llamada a la API con los filtros actualizados manualmente
    updateFiltersBySelection(updatedFilters);
  };

  const clearSelectedFilters = () => {
    setSelectedFilters(defaultFilters);
  };

  return (
    <FiltersContext.Provider
      value={{
        initialFilters,
        selectedFilters,
        isLoading,
        error,
        clearSelectedFilters,
        setSelectedFilters,
        updateSelectedFilter,
        reloadFilters: loadInitialFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FiltersContext);
  if (!context)
    throw new Error("useFilters debe usarse dentro de FiltersProvider");
  return context;
}
