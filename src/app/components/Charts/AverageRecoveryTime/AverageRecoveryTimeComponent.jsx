import React from "react";
import { AverageRecoveryTimeCard } from "./AverageRecoveryTimeCard";
import { useGetAverageRecoveryTime } from "@/hooks/useGetAverageRecoveryTime";
import { useFilters } from "@/contexts/FiltersContext";

export function AverageRecoveryTimeComponent() {
  const {
    selectedFilters: { countries: selectedCountries },
  } = useFilters();

  const { data, loading, error } = useGetAverageRecoveryTime();

  const mockData = [
    {
      country: "DE",
      method: "TJUE",
      averageRecoveryTime: 0,
      minimumRecoveryTime: 0,
      maximumRecoveryTime: 0,
    },
    {
      country: "BE",
      method: "DTTR",
      averageRecoveryTime: 0,
      minimumRecoveryTime: 0,
      maximumRecoveryTime: 0,
    },
    {
      country: "CA",
      method: "TJUE",
      averageRecoveryTime: 13,
      minimumRecoveryTime: 9,
      maximumRecoveryTime: 17,
    },
    {
      country: "IE",
      method: "DTTR",
      averageRecoveryTime: 12,
      minimumRecoveryTime: 7,
      maximumRecoveryTime: 16,
    },
    {
      country: "IT",
      method: "TJUE",
      averageRecoveryTime: 16,
      minimumRecoveryTime: 11,
      maximumRecoveryTime: 21,
    },
    {
      country: "NO",
      method: "DTTR",
      averageRecoveryTime: 18,
      minimumRecoveryTime: 12,
      maximumRecoveryTime: 22,
    },
    {
      country: "PL",
      method: "TJUE",
      averageRecoveryTime: 10,
      minimumRecoveryTime: 6,
      maximumRecoveryTime: 15,
    },
    {
      country: "PT",
      method: "DTTR",
      averageRecoveryTime: 11,
      minimumRecoveryTime: 7,
      maximumRecoveryTime: 14,
    },
    {
      country: "SE",
      method: "TJUE",
      averageRecoveryTime: 12,
      minimumRecoveryTime: 8,
      maximumRecoveryTime: 17,
    },
    {
      country: "CH",
      method: "DTTR",
      averageRecoveryTime: 14,
      minimumRecoveryTime: 9,
      maximumRecoveryTime: 19,
    },
  ];

  // Filter the mockData to keep only countries that are present in selectedCountries
  const selectedCountryCodes = new Set(
    selectedCountries.map((country) => country.isoCode)
  );

  const filteredData = data?.data?.filter((item) =>
    selectedCountryCodes.has(item.country)
  );

  /* const filteredData = mockData.filter((item) =>
    selectedCountryCodes.has(item.country)
  ); */

  if (loading) return <p>Cargando datos...</p>;
  if (error || !data) return <p>Hubo un error al cargar los datos.</p>;
  return (
    <>
      <div className="flex gap-5 mt-6">
        <h3 className="leading-7 text-[1rem]  font-semibold">
          Tiempos de recuperación
        </h3>
        <div className="flex gap-5 text-[17px]">
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
