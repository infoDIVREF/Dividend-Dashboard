import { ChevronsLeft } from 'lucide-react';


export default function ToggleSideBarComponent({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  return (
      <button onClick={toggleSidebar} className="flex items-center justify-center gap-2 px-2 py-1 rounded-md transition-all ease-in-out duration-300 bg-blanco-roto text-negro">
         <ChevronsLeft size={26} strokeWidth={1} /> 
      </button>
  );
}
