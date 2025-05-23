import { LegendProps } from "recharts";

export const CustomLegend = (props: LegendProps) => {
  const { payload } = props;

  return (
    <ul className="flex flex-wrap gap-4 text-[0.9vw] sm:text-sm whitespace-nowrap overflow-hidden justify-center">
      {payload?.map((entry, index) => (
        <li
          key={`item-${index}`}
          className="flex items-center space-x-1 truncate"
        >
            <span
                className="w-4 h-3"
                style={{ backgroundColor: entry.color }}
            />
            <span style={{ color: entry.color }} className="truncate">
                {entry.value}
            </span>
        </li>
      ))}
    </ul>
  );
};
