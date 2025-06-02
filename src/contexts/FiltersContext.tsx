"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "@/hooks/useAuth";
import axiosInstance from "@/lib/axiosInstance";

// Tipos y interfaces de filtros
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
  claimStatus: string[];
  isLoading: boolean;
  error: string | null;
  clearSelectedFilters: (filters: Filters) => void;
  setSelectedFilters: (filters: Filters) => void;
  updateSelectedFilter: (key: keyof Filters, value: string) => void;

  updateClaimStatus: (value: string) => void;
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
  const [claimStatus, setClaimStatus] = useState<string[]>(
    defaultFilters.claimStatus
  );

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // Cargar filtros iniciales
  const loadInitialFilters = useCallback(async () => {
    if (!collaboratorId) return;
    setIsLoading(true);

    try {
      const response = await axiosInstance.get(
        `/filters/all/${collaboratorId}`,
        { headers }
      );
      const data = response.data;
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

  // Actualizar filtros seleccionados por el usuario
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
      const response = await axiosInstance.get(
        `/filters/all/${collaboratorId}?${params.toString()}`,
        { headers }
      );
      const data = response.data;
      const updatedFilters: Filters = {
        years: data.years,
        countries: data.countries,
        methods: ["DTTR", "TJUE"],
        funds: data.funds,
        claimStatus: claimStatus,
      };
      setSelectedFilters(updatedFilters);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInitialFilters();
  }, [loadInitialFilters]);

  // Función para actualizar los filtros seleccionados
  const updateSelectedFilter = (key: keyof Filters, value: string) => {
    const current = new Set<string>(selectedFilters[key] as string[]);
    if (current.has(value)) {
      current.delete(value);
    } else {
      current.add(value);
    }
    const updatedFilters: Filters = {
      ...selectedFilters,
      [key]: Array.from(current),
    };
    setSelectedFilters(updatedFilters);
    updateFiltersBySelection(updatedFilters);
  };

  // Función específica para actualizar el claimStatus
  const updateClaimStatus = (value: string) => {
    if (claimStatus.length === 1 && claimStatus.includes(value)) {
      console.warn("No claim status available to update.");
      return;
    }
    const current = new Set<string>(claimStatus);
    if (current.has(value)) {
      current.delete(value);
    } else {
      current.add(value);
    }
    setClaimStatus(Array.from(current));
  };

  const clearSelectedFilters = () => {
    setSelectedFilters(defaultFilters);
    setClaimStatus(defaultFilters.claimStatus); // Reseteamos también el claimStatus
  };

  return (
    <FiltersContext.Provider
      value={{
        initialFilters,
        selectedFilters,
        claimStatus,
        isLoading,
        error,
        clearSelectedFilters,
        setSelectedFilters,
        updateSelectedFilter,
        updateClaimStatus, // Añadimos la nueva función para manejar claimStatus
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

export type { Filters };
