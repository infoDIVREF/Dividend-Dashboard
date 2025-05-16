import React from "react";
import ExportButton from "../GraphicsComponent/GraphicsComponentHeader/ExportButton/ExportButton";

export default function DashboardHeader({ pageToShow, setPageToShow }) {
  function togglePageToShow(value) {
    setPageToShow(value);
  }

  return (
    <div className="w-full flex flex-row justify-between relative z-20 items-center">
      <h1
        className={`${
          pageToShow === "map" ? "invisible" : ""
        } text-[32px] text-negro`}
      >
        Dashboard
      </h1>
      <div className="flex gap-4">
        <button
          onClick={() => togglePageToShow("graphics")}
          className={`px-10 py-2 rounded-[16.5px] text-md font-semibold transition-all font-bricolage ${
            pageToShow === "graphics"
              ? "bg-blanco-roto text-negro" // Botón activo (color similar al azul oscuro)
              : "bg-transparent text-gris-claro border border-gris-claro " // Botón inactivo (gris claro)
          }`}
        >
          Gráficos
        </button>
        <button
          onClick={() => togglePageToShow("map")}
          className={`px-10 py-2 rounded-[16.5px] text-md font-semibold transition-all font-bricolage ${
            pageToShow === "map"
              ? "bg-blanco-roto text-negro" // Botón activo (color similar al azul oscuro)
              : "bg-transparent text-gris-claro border border-gris-claro" // Botón inactivo (gris claro)
          }`}
        >
          Mapa
        </button>
        {pageToShow === "graphics" ? <ExportButton /> : null}
      </div>
    </div>
  );
}
