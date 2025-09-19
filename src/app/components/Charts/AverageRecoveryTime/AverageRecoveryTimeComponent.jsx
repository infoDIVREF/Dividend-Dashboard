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

  // Filter data (this part remains the same)
  const selectedCountryCodes = new Set(
    selectedCountries.map((country) => country.isoCode)
  );
  const countryFilteredData = data.data?.filter((item) =>
    selectedCountryCodes.has(item.country)
  );

  const dttrData =
    countryFilteredData?.filter((item) => item.method === "DTTR") || [];
  const tjueData =
    countryFilteredData?.filter((item) => item.method === "TJUE") || [];

  const shouldRenderDTTR =
    selectedMethods.includes("DTTR") && dttrData.length > 0;
  const shouldRenderTJUE =
    selectedMethods.includes("TJUE") && tjueData.length > 0;

  // --- NEW: LOGIC FOR SYNCED HEIGHT ---

  // 1. Define the constants for height calculation in the parent.
  const ROW_HEIGHT = 50; // Controls the space for each country bar.
  const MARGIN_HEIGHT = 40; // Accounts for top/bottom chart margins.

  // 2. Determine the maximum number of countries that will be displayed in either chart.
  const dttrCount = shouldRenderDTTR ? dttrData.length : 0;
  const tjueCount = shouldRenderTJUE ? tjueData.length : 0;
  const maxItems = Math.max(dttrCount, tjueCount);

  // 3. Calculate the single, shared height for both charts.
  // Use a fallback height (e.g., 400px) if there's no data.
  const sharedChartHeight =
    maxItems > 0 ? maxItems * ROW_HEIGHT + MARGIN_HEIGHT : 400;

  // --- END OF THE FIX ---

  const bothVisible = shouldRenderDTTR && shouldRenderTJUE;
  const widthClass = bothVisible ? "w-1/2" : "w-full";
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
            <span className="averageText">Mínimos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#244a76] rounded-2xl w-10 h-6" />
            <span className="averageText">Medios</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#8ed3e4] rounded-2xl w-10 h-6" />
            <span className="averageText">Máximos</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-[200px] items-stretch">
        <AnimatePresence mode="wait">
          {shouldRenderDTTR && (
            <motion.div
              key="dttr-card"
              layout
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={`bg-white rounded-xl shadow-md p-4 flex flex-col border ${widthClass}`}
            >
              <h3 className="leading-7 text-[1rem] font-semibold mb-4 translate-y-2 translate-x-4">
                Vía DDTR
              </h3>
              {/* 4. Pass the calculated height as a prop */}
              <AverageRecoveryTimeCard
                method="DTTR"
                data={dttrData}
                chartHeight={sharedChartHeight}
              />
            </motion.div>
          )}

          {shouldRenderTJUE && (
            <motion.div
              key="tjue-card"
              layout
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={`bg-white rounded-xl shadow-md p-4 flex flex-col border ${widthClass}`}
            >
              <h3 className="leading-7 text-[1rem] font-semibold mb-4 translate-y-2 translate-x-4">
                Vía TJUE
              </h3>
              {/* 4. Pass the SAME calculated height as a prop */}
              <AverageRecoveryTimeCard
                method="TJUE"
                data={tjueData}
                chartHeight={sharedChartHeight}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
