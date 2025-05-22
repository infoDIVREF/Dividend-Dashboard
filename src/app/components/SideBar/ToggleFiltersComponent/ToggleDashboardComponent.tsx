import { ChevronsRight } from 'lucide-react';


export default function ToggleDashboardComponent({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  return (
      <button onClick={toggleSidebar} className="flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all ease-in-out duration-300 w-32 font-bricolage bg-blanco-roto text-negro">
        Filtros
        <ChevronsRight size={26} strokeWidth={1} />
      </button>
  );
}
