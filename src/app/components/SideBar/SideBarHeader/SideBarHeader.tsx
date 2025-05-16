// src/components/SideBar/FiltersHeader.tsx
"use client";
import React from "react";

export default function SideBarHeader({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex justify-between items-center border-b pb-[1.25rem]">
      <h2 className="text-[24px] font-regular font-bricolage">Filtros</h2>
      <button
        onClick={onClear}
        className="bg-blanco-roto text-[16px] px-3 py-1 rounded shadow font-bricolage"
      >
        QUITAR FILTROS ✕
      </button>
    </div>
  );
}
