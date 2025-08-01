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
      }  flex  gap-6 justify-between absolute flex-col right-0 items-center h-30 pt-[14px] pb-[23px] pr-[54px] pl-[42px] z-10 ${
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
        <div className="flex gap-[14px]">
          <div className="flex gap-[5px] bg-blanco-roto px-1 py-1 rounded-xl">
            <button
              onClick={() => setPageToShow("graphics")}
              style={{ pointerEvents: "auto" }}
              className={`text-[12px] leading-4 font-semibold flex items-center justify-center gap-2 px-2 py-1 rounded-md transition-all ease-in-out duration-300 w-24 min-w-24 font-bricolage ${
                pageToShow === "graphics"
                  ? "bg-[#FAFBFE] text-negro shadow-[3px_3px_4.7px_rgba(0,0,0,0.08)]"
                  : "text-[#AFAFAF]"
              }`}
            >
              Gráficos
            </button>
            <button
              onClick={() => setPageToShow("map")}
              style={{ pointerEvents: "auto" }}
              className={`text-[12px] leading-4 font-semibold flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all ease-in-out duration-300 w-24 min-w-24 font-bricolage ${
                pageToShow === "map"
                  ? "bg-[#FAFBFE] text-negro shadow-[3px_3px_4.7px_rgba(0,0,0,0.08)]"
                  : "text-[#AFAFAF]"
              }`}
            >
              Mapa
            </button>
          </div>
          {pageToShow === "graphics" ? <ExportButton /> : null}
        </div>
      </div>

      <GraphicsComponentHeader
        isSidebarOpen={isSidebarOpen}
        pageToShow={pageToShow}
        setPageToShow={setPageToShow}
      />
    </div>
  );
}
