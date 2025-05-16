"use client";
import React, { useEffect, useState } from "react";

export default function ExportButton() {
  const handleExport = () => {
    // Aquí puedes agregar la lógica de exportación (por ejemplo, exportar datos a un archivo)
    console.log("Exporting data...");
  };
  return (
    <button
      onClick={handleExport}
      className="bg-exportButton-green flex items-center gap-2 px-4 py-2 text-white rounded-[12px] transition-all"
    >
      Exportar
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <path
          d="M9.72726 8.27273L17 1"
          stroke="#FFFFFF"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 6.81818L16.9991 1.00091L11.1818 1"
          stroke="#FFFFFF"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.0909 9.72736V16.2728C14.0909 16.4657 14.0143 16.6507 13.8779 16.7871C13.7415 16.9235 13.5565 17.0001 13.3636 17.0001H1.72727C1.53439 17.0001 1.3494 16.9235 1.21301 16.7871C1.07662 16.6507 1 16.4657 1 16.2728V4.63645C1 4.44357 1.07662 4.25858 1.21301 4.12219C1.3494 3.9858 1.53439 3.90918 1.72727 3.90918H8.27273"
          stroke="#FFFFFF"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
