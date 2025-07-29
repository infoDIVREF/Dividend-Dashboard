import { ChevronsRight } from "lucide-react";

export default function ToggleDashboardComponent({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  return (
    <button
      onClick={toggleSidebar}
      className="pointer-events-auto flex items-center justify-center gap-2 px-2 py-2 rounded-[15px] transition-all ease-in-out duration-300 w-32 font-bricolage bg-blanco-roto text-negro"
    >
      Filtros
      <ChevronsRight size={20} strokeWidth={1.5} />
    </button>
  );
}
