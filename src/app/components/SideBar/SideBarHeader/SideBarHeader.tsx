"use client";
import ToggleSideBarComponent from "../ToggleFiltersComponent/ToggleSideBarComponent";
import type { Filters } from "@/contexts/FiltersContext"; // Importa el tipo

interface SideBarHeaderProps {
  onClear: () => void;
  toggleSidebar: () => void;
  selectedFilters: Filters;
}

export default function SideBarHeader({
  onClear,
  toggleSidebar,
  selectedFilters,
}: SideBarHeaderProps) {
  const hasSelectedFilters = Object.entries(selectedFilters).some(
    ([key, val]) =>
      key !== "claimStatus" && Array.isArray(val) && val.length > 0
  );

  return (
    <div className="flex flex-col justify-between items-center border-b pb-[1.25rem]">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-[24px] font-regular font-bricolage">Filtros</h2>
        <ToggleSideBarComponent toggleSidebar={toggleSidebar} />
      </div>
      <button
        onClick={onClear}
        className={`${!hasSelectedFilters ? "opacity-40 cursor-not-allowed" : "cursor-pointer" } bg-blanco-roto text-[16px] px-3 py-1 rounded shadow font-bricolage mt-5`}
        disabled={!hasSelectedFilters}
      >
        QUITAR FILTROS ✕
      </button>
    </div>
  );
}
