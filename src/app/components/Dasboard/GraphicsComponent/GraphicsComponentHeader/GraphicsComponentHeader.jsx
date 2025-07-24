import StatusFiltersComponent from "./StatusFiltersComponent/StatusFiltersComponent";

export default function GraphicsComponentHeader({
  isSidebarOpen,
  pageToShow,
  setPageToShow,
}) {
  return (
    <div
      className={`flex  items-center w-full ${
        pageToShow === "map" ? "justify-end" : "justify-between"
      }`}
    >
      <StatusFiltersComponent
        pageToShow={pageToShow}
        isSidebarOpen={isSidebarOpen}
      />

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
    </div>
  );
}
