// src/components/SideBar/Sidebar.tsx
"use client";
import SideBarHeader from "./SideBarHeader/SideBarHeader";
//import ActiveFilters from "./ActiveFilters/ActiveFilters";
import FilterSection from "./FiltersSection/FiltersSection";
import { useFilters } from "@/contexts/FiltersContext";
import { InProgressIcon } from "@/components/icons/ClaimStatusIcons";
import { RecoveredIcon } from "@/components/icons/ClaimStatusIcons";
import { SentIcon } from "@/components/icons/ClaimStatusIcons";
import Flag from "react-world-flags";

export default function SideBar({
  toggleSidebar,
}: {
  pageToShow: string;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) {
  const {
    initialFilters,
    selectedFilters,
    updateSelectedFilter,
    clearSelectedFilters,
    claimStatus,
    updateClaimStatus,
  } = useFilters();

  const handleClearFilters = () => {
    clearSelectedFilters(initialFilters);
  };
  const allFundsSelected =
    selectedFilters.funds.length === initialFilters.funds.length;

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
    <div
      className={`
        flex flex-col h-full w-full text-[13px]
        transition-all duration-300 ease-in-out
        gap-5 overflow-y-auto overflow-x-hidden p-5 pt-3 bg-[#f6f7f9]
      `}
    >
      <SideBarHeader
        onClear={handleClearFilters}
        toggleSidebar={toggleSidebar}
        selectedFilters={selectedFilters}
      />

      {/* <ActiveFilters /> */}
      <FilterSection
        title={
          allFundsSelected ? (
            <button className="cursor-not-allowed text-gray-400 border-[1px] border-gray-400 p-1 px-3 rounded-sm">
              Selecciona un fondo
            </button>
          ) : (
            <button
              onClick={handleClearFilters}
              className="text-gray-600 border-[1px] border-gray-600 p-1 px-3 rounded-sm no-wrap"
            >
              Seleccionar todo
            </button>
          )
        }
        customClassName="grid grid-cols-1 gap-2"
      >
        {initialFilters.funds?.map((fund) => {
          const isSelectedFund = selectedFilters?.funds.some(
            (selectedFund) => selectedFund.id === fund.id
          );

          return (
            <button
              key={fund.id}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={() => updateSelectedFilter("funds", fund as any)}
              className={`mt-0! border py-1 rounded ${
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
            className={`mt-0! border py-1 rounded ${
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
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={() => updateSelectedFilter("countries", country as any)}
              className={`mt-0! border pl-2 py-1 rounded flex items-center gap-2 ${
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
        {["DTTR", "TJUE"].map((method) => (
          <button
            key={method}
            onClick={() => updateSelectedFilter("methods", method)}
            className={`mt-0!  py-1 rounded border ${
              selectedFilters?.methods.includes(method)
                ? "bg-azul text-white"
                : "text-gris-claro-2 border border-gris-oscuro"
            }`}
          >
            {method}
          </button>
        ))}
      </FilterSection>

      <FilterSection title="Estado" customClassName="grid grid-cols-3 gap-2">
        {statuses.map(({ label, icon, color }) => {
          const isSelected = claimStatus.includes(label);
          return (
            <button
              key={label}
              onClick={() => updateClaimStatus(label)}
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
    </div>
  );
}
