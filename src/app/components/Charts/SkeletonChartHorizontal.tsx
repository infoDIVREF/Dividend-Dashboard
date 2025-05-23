type SkeletonCharTypes = {
  height: string;
};

export default function SkeletonChartHorizontal({ height }: SkeletonCharTypes) {
  return (
    <div className={`${height} w-full animate-pulse flex flex-col items-center justify-between gap-4`}>
      <div className="w-full h-80 rounded-md">
        <div className="border-l border-b border-gray-200 h-full py-4">
          <div className="flex flex-col justify-around h-full gap-2">
            {[60, 80, 40, 90, 70].map((w, i) => (
              <div
                key={i}
                className="bg-gray-200 rounded-sm h-4"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-4 bg-gray-200 rounded-md" />
    </div>
  );
}
