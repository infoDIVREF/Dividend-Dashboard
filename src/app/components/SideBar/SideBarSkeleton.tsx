export default function SidebarSkeleton() {
  return (
    <div className="flex flex-col h-full w-full gap-5 overflow-y-auto overflow-x-hidden p-5 bg-[#f6f7f9] animate-pulse text-[13px]">
      {[...Array(5)].map((_, sectionIndex) => (
        <div
          key={sectionIndex}
          className="border-b pb-[1.25rem] border-gris"
        >
          {/* Título del filtro */}
          <div className="w-1/3 h-4 bg-gray-200 rounded mb-3" />

          {/* Botones o elementos del filtro */}
          <div className="grid grid-cols-3 gap-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-6 bg-gray-200 rounded"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
