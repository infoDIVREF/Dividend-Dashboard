import ExportButton from "../GraphicsComponent/GraphicsComponentHeader/ExportButton/ExportButton";
import ToggleDashboardComponent from "../../SideBar/ToggleFiltersComponent/ToggleDashboardComponent";

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
      }  flex flex-row justify-between absolute right-0 items-center h-30 pt-[47px] pb-[27px] px-[54px] z-10 mr-[13px] ${
        pageToShow === "map" ? "" : "bg-blanco"
      }`}
      style={{ pointerEvents: "none" }}
    >
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
      <div className="flex gap-4">
        <button
          onClick={() => setPageToShow("graphics")}
          style={{ pointerEvents: "auto" }}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all ease-in-out duration-300 w-32 min-w-32 font-bricolage ${
            pageToShow === "graphics"
              ? "bg-blanco-roto text-negro"
              : "bg-blanco border border-gris-claro"
          }`}
        >
          Gráficos
        </button>
        <button
          onClick={() => setPageToShow("map")}
          style={{ pointerEvents: "auto" }}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all ease-in-out duration-300 w-32 min-w-32 font-bricolage ${
            pageToShow === "map"
              ? "bg-blanco-roto text-negro"
              : "bg-blanco border border-gris-claro"
          }`}
        >
          Mapa
        </button>
        {pageToShow === "graphics" ? <ExportButton /> : null}
      </div>
    </div>
  );
}
