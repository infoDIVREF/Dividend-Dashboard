// src/components/SideBar/Sidebar.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import SideBarHeader from "./SideBarHeader/SideBarHeader";
//import ActiveFilters from "./ActiveFilters/ActiveFilters";
import FilterSection from "./FiltersSection/FiltersSection";
import { useFilters } from "@/contexts/FiltersContext";
import ToggleSideBarComponent from "./ToggleSideBarComponent/ToggleSideBarComponent";
import { InProgressIcon } from "@/components/icons/ClaimStatusIcons";
import { RecoveredIcon } from "@/components/icons/ClaimStatusIcons";
import { SentIcon } from "@/components/icons/ClaimStatusIcons";
import Flag from "react-world-flags";

export default function SideBar({ pageToShow }: { pageToShow: string }) {
  const {
    initialFilters,
    selectedFilters,
    updateSelectedFilter,
    clearSelectedFilters,
  } = useFilters();

  const handleClearFilters = () => {
    clearSelectedFilters({
      years: [],
      countries: [],
      methods: [],
      funds: [],
      claimStatus: [],
    });
  };

  const statuses = [
    {
      label: "EN TRÁMITE",
      icon: (selected: boolean) => (
        <InProgressIcon
          selected={selected}
          selectedColor={"#FAFBFE"}
          unselectedColor={"#424242"}
          width={20}
          height={20}
        />
      ),
      color: "#C9C9C9",
    },
    {
      label: "ENVIADO",
      icon: (selected: boolean) => (
        <SentIcon
          selected={selected}
          selectedColor={"#FAFBFE"}
          unselectedColor={"#424242"}
          width={20}
          height={20}
        />
      ),
      color: "#4F84A6",
    },
    {
      label: "RECUPERADO",
      icon: (selected: boolean) => (
        <RecoveredIcon
          selected={selected}
          selectedColor={"#FAFBFE"}
          unselectedColor={"#424242"}
          width={20}
          height={20}
        />
      ),
      color: "#244A76",
    },
  ];

  return (
    <motion.div
      className={`flex flex-col h-full w-full bg-[#f6f7f9] gap-5 overflow-y-auto overflow-x-hidden p-5`}
      animate={{
        width: pageToShow === "map" ? 0 : "100%",
        opacity: pageToShow === "map" ? 0 : 1,
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{ pointerEvents: pageToShow === "map" ? "none" : "auto" }}
    >
      <ToggleSideBarComponent />
      <SideBarHeader onClear={handleClearFilters} />
      {/* <ActiveFilters /> */}

      <FilterSection
        title="Nombre del Fondo"
        customClassName="grid grid-cols-1 gap-2"
      >
        {initialFilters.funds?.map((fund) => {
          const isSelectedFund = selectedFilters?.funds.some(
            (selectedFund) => selectedFund.id === fund.id
          );

          return (
            <button
              key={fund.id}
              onClick={() => updateSelectedFilter("funds", fund as unknown)}
              className={`mt-0! border py-1 text-[15px] rounded ${
                isSelectedFund
                  ? "bg-azul text-white"
                  : "text-gris-claro-2 border border-gris-oscuro"
              }`}
            >
              {fund.name.toUpperCase()}
            </button>
          );
        })}
      </FilterSection>

      <FilterSection
        title="Año dividendo"
        customClassName="grid grid-cols-4 gap-2"
      >
        {initialFilters.years?.map((y) => (
          <button
            key={y}
            onClick={() => updateSelectedFilter("years", y)}
            className={`mt-0! border py-1 text-[15px] rounded ${
              selectedFilters?.years.includes(y)
                ? "bg-azul text-white"
                : "text-gris-claro-2 border border-gris-oscuro"
            }`}
          >
            {y}
          </button>
        ))}
      </FilterSection>

      <FilterSection title="País" customClassName="grid grid-cols-2 gap-2">
        {initialFilters.countries?.map((country) => {
          const isSelectedCountry = selectedFilters?.countries.some(
            (selectedCountry) => selectedCountry.isoCode === country.isoCode
          );

          return (
            <button
              key={country.isoCode}
              onClick={() => updateSelectedFilter("countries", country)}
              className={`mt-0! border pl-2 py-1 text-[15px] rounded flex items-center gap-2 ${
                isSelectedCountry
                  ? "bg-azul text-white"
                  : "text-gris-claro-2 border border-gris-oscuro"
              }`}
            >
              <div className="relative w-7 h-5 overflow-hidden rounded">
                <Flag
                  code={country.isoCode}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: isSelectedCountry ? 1 : 0.5,
                  }}
                />
                <div className="absolute inset-0 pointer-events-none rounded" />
              </div>
              {country.name}
            </button>
          );
        })}
      </FilterSection>

      <FilterSection title="Vía" customClassName="grid grid-cols-2 gap-2">
        {["DTTR", "TJUE"].map((via) => (
          <button
            key={via}
            onClick={() => updateSelectedFilter("methods", via)}
            className={`mt-0!  py-1 text-[15px] rounded border ${
              selectedFilters?.methods.includes(via)
                ? "bg-azul text-white"
                : "text-gris-claro-2 border border-gris-oscuro"
            }`}
          >
            {via}
          </button>
        ))}
      </FilterSection>

      <FilterSection title="Estado" customClassName="grid grid-cols-3 gap-2">
        {statuses.map(({ label, icon, color }) => {
          const isSelected = selectedFilters?.claimStatus.includes(label);
          return (
            <button
              key={label}
              onClick={() => updateSelectedFilter("claimStatus", label)}
              className={`flex items-center justify-center gap-2 rounded border px-3 py-2 transition-all
              ${isSelected ? "text-white" : "text-black border border-black"}`}
              style={{
                backgroundColor: isSelected ? color : "transparent",
              }}
            >
              {icon(isSelected)}
            </button>
          );
        })}
      </FilterSection>
    </motion.div>
  );
}
