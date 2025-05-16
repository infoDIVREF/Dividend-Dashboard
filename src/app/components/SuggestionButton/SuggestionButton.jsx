"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { ChatIcon } from "@/components/icons/ClaimStatusIcons";

export default function SuggestionButton() {
  const pathname = usePathname();

  const hide = pathname === "/login" || pathname === "/select-collaborator";

  if (hide) return null;

  return (
    <button
      className="flex bg-[#F86338] items-center gap-2 text-white text-sm font-medium px-4 py-2 rounded-full shadow-md hover:bg-[#d44f2b] transition-colors"
      onClick={() => {
        console.log("Sugerencia clicada");
      }}
    >
      <ChatIcon />
      Déjanos tu sugerencia
    </button>
  );
}
