import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { AverageRecoveryTimeCard } from "./AverageRecoveryTimeCard";
import { useGetAverageRecoveryTime } from "@/hooks/useGetAverageRecoveryTime";
import { useFilters } from "@/contexts/FiltersContext";

export function AverageRecoveryTimeComponent() {
  const {
    selectedFilters: { countries: selectedCountries },
    selectedFilters: { methods: selectedMethods },
  } = useFilters();

  const { data, loading, error } = useGetAverageRecoveryTime();

  if (loading) return <p>Cargando datos...</p>;
  if (error || !data) return <p>Hubo un error al cargar los datos.</p>;

  // --- START OF THE FIX ---

  // 1. Filter data by selected countries first.
  const selectedCountryCodes = new Set(
    selectedCountries.map((country) => country.isoCode)
  );
  const countryFilteredData = data.data?.filter((item) =>
    selectedCountryCodes.has(item.country)
  );

  // 2. Pre-filter the data for each specific method. Use `|| []` as a safe fallback.
  const dttrData =
    countryFilteredData?.filter((item) => item.method === "DTTR") || [];
  const tjueData =
    countryFilteredData?.filter((item) => item.method === "TJUE") || [];

  // 3. The new visibility logic: A card should only render if its method is selected AND it has data.
  const shouldRenderDTTR =
    selectedMethods.includes("DTTR") && dttrData.length > 0;
  const shouldRenderTJUE =
    selectedMethods.includes("TJUE") && tjueData.length > 0;

  // 4. Update the width calculation to use the new, accurate visibility flags.
  const bothVisible = shouldRenderDTTR && shouldRenderTJUE;
  const widthClass = bothVisible ? "w-1/2" : "w-full";

  // --- END OF THE FIX ---

  return (
    <>
      <div className="flex gap-5 mt-6">
        {/* ... (your legend/header code remains the same) ... */}
        <h3 className="leading-7 text-[1rem]  font-semibold">
          Tiempos de recuperación
        </h3>
        <div className="flex gap-5 text-[14px]">
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
        <AnimatePresence mode="wait">
          {/* 5. Use the new visibility flag here */}
          {shouldRenderDTTR && (
            <motion.div
              key="dttr-card"
              layout
              // Corrected exit animation: opacity should be 0 to fade out
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={`bg-white rounded-xl shadow-md p-4 flex flex-col border ${widthClass}`}
            >
              <h3 className="leading-7 text-[1rem] font-semibold mb-4 translate-y-2 translate-x-4">
                Vía DDTR
              </h3>
              {/* 6. Pass the pre-filtered data array */}
              <AverageRecoveryTimeCard method="DTTR" data={dttrData} />
            </motion.div>
          )}

          {/* Use the new visibility flag here */}
          {shouldRenderTJUE && (
            <motion.div
              key="tjue-card"
              layout
              // Corrected exit animation: opacity should be 0 to fade out
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={`bg-white rounded-xl shadow-md p-4 flex flex-col border ${widthClass}`}
            >
              <h3 className="leading-7 text-[1rem] font-semibold mb-4 translate-y-2 translate-x-4">
                Vía TJUE
              </h3>
              {/* Pass the pre-filtered data array */}
              <AverageRecoveryTimeCard method="TJUE" data={tjueData} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
