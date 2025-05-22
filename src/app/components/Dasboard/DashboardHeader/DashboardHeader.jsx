import ExportButton from "../GraphicsComponent/GraphicsComponentHeader/ExportButton/ExportButton";
import ToggleDashboardComponent from "../../SideBar/ToggleFiltersComponent/ToggleDashboardComponent";

export default function DashboardHeader({
  pageToShow,
  setPageToShow,
  toggleSidebar,
  isSidebarOpen,
}) {
  return (
    <div className="w-full flex flex-row justify-between relative items-center h-20">
      <div className={`flex ${!isSidebarOpen ? "gap-5" : ""}`}>
        <div className="flex items-center justify-center">
          {!isSidebarOpen && pageToShow !== "map" ? (
            <ToggleDashboardComponent toggleSidebar={toggleSidebar} />
          ) : (
            ""
          )}
        </div>
        <h1 className={` text-[32px] text-negro`}>
          {pageToShow === "graphics" ? "Dashboard" : "Mapa"}
        </h1>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => setPageToShow("graphics")}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all ease-in-out duration-300 w-32 min-w-32 font-bricolage ${
            pageToShow === "graphics"
              ? "bg-blanco-roto text-negro" // Botón activo (color similar al azul oscuro)
              : "bg-transparent border border-gris-claro " // Botón inactivo (gris claro)
          }`}
        >
          Gráficos
        </button>
        <button
          onClick={() => setPageToShow("map")}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all ease-in-out duration-300 w-32 min-w-32 font-bricolage ${
            pageToShow === "map"
              ? "bg-blanco-roto text-negro" // Botón activo (color similar al azul oscuro)
              : "bg-transparent border border-gris-claro" // Botón inactivo (gris claro)
          }`}
        >
          Mapa
        </button>
        {pageToShow === "graphics" ? <ExportButton /> : null}
      </div>
    </div>
  );
}
