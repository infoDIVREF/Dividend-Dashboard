import React from "react";
import { AverageRecoveryTimeCard } from "./AverageRecoveryTimeCard";
import { useGetAverageRecoveryTime } from "@/hooks/useGetAverageRecoveryTime";
import { useFilters } from "@/contexts/FiltersContext";

export function AverageRecoveryTimeComponent() {
  const {
    selectedFilters: { countries: selectedCountries },
  } = useFilters();

  const { data, loading, error } = useGetAverageRecoveryTime();

  // Filter the mockData to keep only countries that are present in selectedCountries
  const selectedCountryCodes = new Set(
    selectedCountries.map((country) => country.isoCode)
  );

  const filteredData = data?.data?.filter((item) =>
    selectedCountryCodes.has(item.country)
  );

  if (loading) return <p>Cargando datos...</p>;
  if (error || !data) return <p>Hubo un error al cargar los datos.</p>;
  return (
    <>
      <div className="flex gap-5 mt-6">
        <h3 className="leading-7 text-[1rem]  font-semibold">
          Tiempos de recuperación
        </h3>
        <div className="flex gap-5 text-[12px]">
          <div className="flex items-center gap-2">
            <div className="bg-[#3fb1f8] rounded-2xl w-10 h-6" />
            <span>Mínimos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#244a76] rounded-2xl w-10 h-6" />
            <span>Medios</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#8ed3e4] rounded-2xl w-10 h-6" />
            <span>Máximos</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-1">
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col flex-1 border">
          <h3 className="leading-7 text-[1rem] font-semibold mb-4 translate-y-2 translate-x-4">
            Vía DDTR
          </h3>

          <AverageRecoveryTimeCard
            method="DTTR"
            data={filteredData?.filter((item) => item.method === "DTTR")}
          />
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col flex-1 border">
          <h3 className="leading-7 text-[1rem] font-semibold mb-4 translate-y-2 translate-x-4">
            Vía TJUE
          </h3>
          <AverageRecoveryTimeCard
            method="TJUE"
            data={filteredData?.filter((item) => item.method === "TJUE")}
          />
        </div>
      </div>
    </>
  );
}
