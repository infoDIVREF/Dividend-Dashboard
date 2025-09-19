import StatusFiltersComponent from "./StatusFiltersComponent/StatusFiltersComponent";
import { DotsIcon } from "@/components/icons/ClaimStatusIcons";

export default function GraphicsComponentHeader({ isSidebarOpen, pageToShow }) {
  return (
    <div
      className={`flex  items-center w-full gap-[21px] ${
        pageToShow === "map" ? "justify-end" : "justify-between"
      }`}
    >
      {pageToShow === "graphics" && <DotsIcon />}

      <StatusFiltersComponent
        pageToShow={pageToShow}
        isSidebarOpen={isSidebarOpen}
      />
    </div>
  );
}
