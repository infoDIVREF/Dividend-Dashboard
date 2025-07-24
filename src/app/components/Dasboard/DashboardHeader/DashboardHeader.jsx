import ExportButton from "../GraphicsComponent/GraphicsComponentHeader/ExportButton/ExportButton";
import ToggleDashboardComponent from "../../SideBar/ToggleFiltersComponent/ToggleDashboardComponent";
import GraphicsComponentHeader from "../GraphicsComponent/GraphicsComponentHeader/GraphicsComponentHeader";

export default function DashboardHeader({
  pageToShow,
  setPageToShow,
  toggleSidebar,
  isSidebarOpen,
}) {
  return (
    <div
      className={`${
        isSidebarOpen ? "w-[calc(80vw-13px)]" : "w-[calc(100vw-13px)]"
      }  flex flex-col gap-6 justify-between absolute right-0 items-center h-30 pt-[27px] pb-[27px] px-[54px] z-10 ${
        pageToShow === "map" ? "" : "bg-blanco"
      }`}
      style={{ pointerEvents: "none" }}
    >
      <div className="flex justify-between items-center w-full">
        <div className={`flex ${!isSidebarOpen ? "gap-5" : ""}`}>
          <div className="flex items-center justify-center">
            {!isSidebarOpen ? (
              <ToggleDashboardComponent toggleSidebar={toggleSidebar} />
            ) : (
              ""
            )}
          </div>
          <h1 className={`text-[24px] text-negro`}>
            {pageToShow === "graphics" ? "Dashboard" : ""}
          </h1>
        </div>
        {pageToShow === "graphics" ? <ExportButton /> : null}
      </div>

      <GraphicsComponentHeader
        isSidebarOpen={isSidebarOpen}
        pageToShow={pageToShow}
        setPageToShow={setPageToShow}
      />
    </div>
  );
}
