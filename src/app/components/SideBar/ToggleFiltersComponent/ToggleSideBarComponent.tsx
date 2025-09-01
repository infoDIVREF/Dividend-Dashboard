import { ChevronsLeft } from "lucide-react";

export default function ToggleSideBarComponent({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  return (
    <button
      onClick={toggleSidebar}
      className="flex items-center justify-center gap-2 px-2 py-2 rounded-full transition-all ease-in-out duration-300 bg-blanco-roto text-negro hover-reduce-opacity"
    >
      <ChevronsLeft size={20} strokeWidth={1} />
    </button>
  );
}
