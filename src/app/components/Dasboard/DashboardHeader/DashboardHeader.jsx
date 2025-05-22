import React from "react";
import ExportButton from "../GraphicsComponent/GraphicsComponentHeader/ExportButton/ExportButton";

export default function DashboardHeader({ pageToShow, setPageToShow }) {
  function togglePageToShow(value) {
    setPageToShow(value);
  }

  return (
    <div className="w-full flex flex-row justify-between relative items-center h-20">
      <h1 className={` text-[32px] text-negro`}>
        {pageToShow === "graphics" ? "Dashboard" : "Mapa"}
      </h1>
      <div className="flex gap-4">
        <button
          onClick={() => togglePageToShow("graphics")}
          className={`flex items-center justify-center gap-2 px-4 py-2 text-black rounded-md transition-all ease-in-out duration-300 w-32 min-w-32 font-bricolage ${
            pageToShow === "graphics"
              ? "bg-blanco-roto text-negro" // Botón activo (color similar al azul oscuro)
              : "bg-transparent text-gris-claro border border-gris-claro " // Botón inactivo (gris claro)
          }`}
        >
          Gráficos
        </button>
        <button
          onClick={() => togglePageToShow("map")}
          className={`flex items-center justify-center gap-2 px-4 py-2 text-black rounded-md transition-all ease-in-out duration-300 w-32 min-w-32 font-bricolage ${
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
