"use client";
import ToggleSideBarComponent from "../ToggleFiltersComponent/ToggleSideBarComponent";

interface SideBarHeaderProps {
  toggleSidebar: () => void;
}

export default function SideBarHeader({ toggleSidebar }: SideBarHeaderProps) {
  return (
    <div className="flex flex-col justify-between items-center border-b pb-[1.25rem] border-gris">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-[1rem] font-regular font-bricolage">Filtros</h2>
        <ToggleSideBarComponent toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
}
