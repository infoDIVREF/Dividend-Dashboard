import StatusFiltersComponent from "./StatusFiltersComponent/StatusFiltersComponent";
import { DotsIcon } from "@/components/icons/ClaimStatusIcons";

export default function GraphicsComponentHeader({
  isSidebarOpen,
  pageToShow,
  setPageToShow,
}) {
  return (
    <div
      className={`flex  items-center w-full gap-[21px] ${
        pageToShow === "map" ? "justify-end" : "justify-between"
      }`}
    >
      <DotsIcon />

      <StatusFiltersComponent
        pageToShow={pageToShow}
        isSidebarOpen={isSidebarOpen}
      />
    </div>
  );
}
