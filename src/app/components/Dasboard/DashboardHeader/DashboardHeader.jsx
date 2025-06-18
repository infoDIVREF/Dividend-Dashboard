import ExportButton from "../GraphicsComponent/GraphicsComponentHeader/ExportButton/ExportButton";
import ToggleDashboardComponent from "../../SideBar/ToggleFiltersComponent/ToggleDashboardComponent";

export default function DashboardHeader({
  pageToShow,
  setPageToShow,
  toggleSidebar,
  isSidebarOpen,
}) {
  return (
    <div className={`w-[80vw] flex flex-row justify-between absolute right-0 items-center h-40 pt-[67px] px-[54px] z-30 ${pageToShow === "map" ? "": "bg-blanco"}`}>
      <div className={`flex ${!isSidebarOpen ? "gap-5" : ""}`}>
        <div className="flex items-center justify-center">
          {!isSidebarOpen && pageToShow !== "map" ? (
            <ToggleDashboardComponent toggleSidebar={toggleSidebar} />
          ) : (
            ""
          )}
        </div>
        <h1 className={` text-[24px] text-negro`}>
          {pageToShow === "graphics" ? "Dashboard" : ""}
        </h1>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => setPageToShow("graphics")}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all ease-in-out duration-300 w-32 min-w-32 font-bricolage ${
            pageToShow === "graphics"
              ? "bg-blanco-roto text-negro" 
              : "bg-transparent border border-gris-claro " 
          }`}
        >
          Gráficos
        </button>
        <button
          onClick={() => setPageToShow("map")}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all ease-in-out duration-300 w-32 min-w-32 font-bricolage ${
            pageToShow === "map"
              ? "bg-blanco-roto text-negro" 
              : "bg-transparent border border-gris-claro" 
          }`}
        >
          Mapa
        </button>
        {pageToShow === "graphics" ? <ExportButton /> : null}
      </div>
    </div>
  );
}
