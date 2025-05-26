"use client";
import { usePathname } from "next/navigation";
import { ChatIcon } from "@/components/icons/ClaimStatusIcons";

export default function SuggestionButton() {
  const pathname = usePathname();

  const hide = pathname === "/login" || pathname === "/select-collaborator";

  if (hide) return null;

  return (
    <a href="mailto:info@dividendrefund.com?subject=Sugerencia%20de%20mejora">
      <button
        className="group flex bg-[#F86338] items-center text-white text-sm font-medium px-4 py-2 rounded-full shadow-md hover:bg-[#d44f2b] transition-colors"
        onClick={() => {}}
      >
        <ChatIcon />
        <span className="overflow-hidden max-w-0 opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 group-hover:ml-2 transition-all duration-500 whitespace-nowrap">
          Déjanos tu sugerencia
        </span>
      </button>
    </a>
  );
}
