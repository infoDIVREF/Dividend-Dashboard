type SkeletonCharTypes = {
  height: string
};

export default function SkeletonChartVertical({height}: SkeletonCharTypes) {
  return (
    <div className={`${height} w-full animate-pulse flex flex-col items-center justify-between gap-4`}>
      <div className="w-full h-80 rounded-md" >
        <div className="border-l border-b border-gray-200 h-full">
          <div className="flex items-end justify-around h-full gap-2">
        {[60, 80, 40, 90, 70].map((h, i) => (
          <div
            key={i}
            className={`bg-gray-200 rounded-sm w-6`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
        </div>
      </div>
      <div className="w-full h-4 bg-gray-200 rounded-md" />
    </div>
  );
}

