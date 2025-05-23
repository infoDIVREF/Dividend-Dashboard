type SkeletonCharTypes = {
  height: string;
};

export default function SkeletonChartCircle({ height }: SkeletonCharTypes) {
  return (
    <div className={`${height} w-full animate-pulse flex flex-col items-center justify-between gap-4`}>
      <div className="w-full h-80 flex items-center justify-center">
        {/* Donut chart con conic-gradient */}
        <div
          className="relative w-44 h-44 rounded-full"
          style={{
            background: `conic-gradient(
              #e5e7eb 0% 30%, 
              #e5e7eb 30% 60%, 
              #e5e7eb 60% 100%
            )`,
          }}
        >
          {/* Círculo interior blanco */}
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Simula etiqueta inferior */}

        <div className="w-3/4 h-5 bg-gray-200 rounded-md" />
        <div className="w-3/4 h-5 bg-gray-200 rounded-md" />
        <div className="w-3/4 h-5 bg-gray-200 rounded-md" />
    </div>
  );
}
