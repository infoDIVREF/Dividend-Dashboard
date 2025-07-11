"use client";
//import { useState, useEffect } from 'react';
import SideBarHeader from "./SideBarHeader/SideBarHeader";
import FilterSection from "./FiltersSection/FiltersSection";
import { useFilters } from "@/contexts/FiltersContext";
import { InProgressIcon } from "@/components/icons/ClaimStatusIcons";
import { RecoveredIcon } from "@/components/icons/ClaimStatusIcons";
import { SentIcon } from "@/components/icons/ClaimStatusIcons";
import { useState, useEffect } from "react";
import Flag from "react-world-flags";
import React from "react";

export default function SideBar({
  toggleSidebar,
  isSidebarOpen,
}: {
  pageToShow: string;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) {
  console.log("DESDE LA SIDEBAR", isSidebarOpen);
  const {
    initialFilters,
    selectedFilters,
    updateSelectedFilter,
    clearSelectedFilters,
    claimStatus,
    updateClaimStatus,
  } = useFilters();

  const [screenSize, setScreenSize] = useState<"small" | "medium" | "large">(
    "medium"
  );

  useEffect(() => {
    const height = window.innerHeight;
    if (height < 702) {
      setScreenSize("small");
    } else if (height < 768) {
      setScreenSize("medium");
    } else {
      setScreenSize("large");
    }
  }, []);

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
          width={16}
          height={16}
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
          width={16}
          height={16}
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
          width={16}
          height={16}
        />
      ),
      color: "#244A76",
    },
  ];

  return (
    <div
      className={`
    flex flex-col h-full justify-between w-full text-[11.5px]
    transition-all duration-300 ease-in-out
    gap-5 p-3 pt-2 bg-[#f6f7f9] overflow-auto ${
      isSidebarOpen ? "min-w-[20vw]" : ""
    }
  `}
      style={{ height: "calc(100vh - 80px)" }}
    >
      <div className="flex flex-col gap-4 shrink-0">
        <SideBarHeader toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex-1 flex flex-col justify-between overflow-auto mt-[-15px]">
        <FilterSection
          title={
            allFundsSelected ? (
              <div className="flex items-center justify-between">
                <button className="cursor-not-allowed text-gray-400 border border-gray-400 py-0.5 px-2 rounded-sm">
                  Selecciona un fondo
                </button>
                <div className="h-[25.5px] flex flex-col justify-end">
                  <p className="text-[#6B686B] text-[11px] leading-[16px] font-normal font-[Bricolage Grotesque]">
                    Total: {initialFilters?.funds.length} fondos
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <button
                  onClick={handleClearFilters}
                  className="text-gray-600 border-[1px] border-gray-600 py-0.5 px-2 rounded-sm no-wrap"
                >
                  Seleccionar todo
                </button>
                <div className="h-[25.5px] flex flex-col justify-end">
                  <p className="text-[#6B686B] text-[11px] leading-[16px] font-normal font-[Bricolage Grotesque]">
                    Total: {initialFilters?.funds.length} fondos
                  </p>
                </div>
              </div>
            )
          }
          customClassName={`
            grid grid-cols-1 gap-[2px] flex-1 overflow-y-auto
            ${screenSize === "small" ? "max-h-[90px]" : ""}
            ${screenSize === "medium" ? "max-h-[90px]" : ""}
            ${screenSize === "large" ? "max-h-[90px]" : ""}
          `}
          wrapperCustomClassName="pb-[0.5rem]"
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
                className={`mt-0! border py-1 rounded h-7 ${
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
          title={
            <div className="flex items-center justify-between">
              <p>Año dividendo</p>
              <p className="text-[#6B686B] text-[11px] leading-[16px] font-normal font-[Bricolage Grotesque]">
                Total: {initialFilters?.years.length} años
              </p>
            </div>
          }
          /* customClassName={`grid grid-cols-4 gap-[2px] flex-1 overflow-y-auto max-h-[56px] ${
            screenSize === "small" ? "max-h-[56px]" : ""
          }
            ${screenSize === "medium" ? "max-h-[88px]" : ""}
            ${screenSize === "large" ? "max-h-[88px]" : ""}`} */
          customClassName={` mr-[11px] grid grid-cols-4 gap-[2px] flex-1 overflow-y-auto  ${
            screenSize === "small" ? "" : ""
          }
              ${screenSize === "medium" ? "" : ""}
              ${screenSize === "large" ? "" : ""}`}
          wrapperCustomClassName="pb-[0.5rem]"
        >
          {initialFilters.years?.map((y) => (
            <button
              key={y}
              onClick={() => updateSelectedFilter("years", y)}
              className={`mt-0! border py-1 rounded  ${
                selectedFilters?.years.includes(y)
                  ? "bg-azul text-white"
                  : "text-gris-claro-2 border border-gris-oscuro"
              }`}
            >
              {y}
            </button>
          ))}
        </FilterSection>

        <FilterSection
          title={
            <div className="flex items-center justify-between">
              <p>País</p>
              <p className="text-[#6B686B] text-[11px] leading-[16px] font-normal font-[Bricolage Grotesque]">
                Total: {initialFilters?.countries.length} países
              </p>
            </div>
          }
          /* customClassName={`grid grid-cols-2 gap-[2px] flex-1 overflow-y-auto max-h-[64px] ${
            screenSize === "small" ? "max-h-[64px]" : ""
          }
            ${screenSize === "medium" ? "max-h-[88px]" : ""}
            ${screenSize === "large" ? "max-h-[95px]" : ""}`} */
          customClassName={`grid grid-cols-2 gap-[2px] flex-1 overflow-y-auto max-h-[93px] ${
            screenSize === "small" ? "" : ""
          }
              ${screenSize === "medium" ? "" : ""}
              ${screenSize === "large" ? "" : ""}`}
          wrapperCustomClassName=""
        >
          {initialFilters.countries?.map((country) => {
            const isSelectedCountry = selectedFilters?.countries.some(
              (selectedCountry) => selectedCountry.isoCode === country.isoCode
            );

            return (
              <button
                key={country.isoCode}
                onClick={() =>
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  updateSelectedFilter("countries", country as any)
                }
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
      </div>

      <div className="shrink-0">
        <FilterSection title="Vía" customClassName="grid grid-cols-2 gap-2">
          {initialFilters.methods?.map((method) => (
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
                  ${
                    isSelected ? "text-white" : "text-black border border-black"
                  }`}
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
    </div>
  );
}
