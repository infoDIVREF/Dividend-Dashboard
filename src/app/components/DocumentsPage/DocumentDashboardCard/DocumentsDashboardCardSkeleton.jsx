export default function DocumentsDashboardCardSkeleton() {
  return (
    <div className="animate-pulse font-bricolage bg-gris-claro-3 rounded-[12px] p-6 flex flex-col gap-3">
      {/* Título */}
      <div className="h-6 w-3/4 bg-gray-300 rounded" />

      {/* Pendientes */}
      <div className="mt-3 flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <div className="bg-gray-300 p-2 rounded-md w-8 h-8" />
          <div className="h-5 w-20 bg-gray-300 rounded" />
        </div>
        <div className="h-6 w-6 bg-gray-300 rounded" />
      </div>

      {/* Recibidos */}
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <div className="bg-gray-300 p-2 rounded-md w-8 h-8" />
          <div className="h-5 w-20 bg-gray-300 rounded" />
        </div>
        <div className="h-6 w-6 bg-gray-300 rounded" />
      </div>
    </div>
  );
}
