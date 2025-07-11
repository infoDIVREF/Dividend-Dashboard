"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import Flag from "react-world-flags";
import { isoToName } from "@/consts/isoToName";
import { RoundedBarStart } from "./RoundedBarStart";
import { RoundedBarMiddle } from "./RoundedBarMiddle";
import { RoundedBarEnd } from "./RoundedBarEnd";

export function AverageRecoveryTimeCard({ method, data }) {
  const barSize = Math.max(8, 20 - (data?.length || 0));

  const maxValue = Math.max(
    0,
    ...(data?.flatMap((d) => [
      d.minimumRecoveryTime,
      d.averageRecoveryTime,
      d.maximumRecoveryTime,
    ]) || [])
  );

  const roundedMax = Math.ceil(maxValue / 5) * 5;

  const cleanedData =
    data?.filter(
      (d) =>
        d.minimumRecoveryTime > 0 &&
        d.averageRecoveryTime > 0 &&
        d.maximumRecoveryTime > 0 &&
        d.minimumRecoveryTime < d.averageRecoveryTime &&
        d.averageRecoveryTime < d.maximumRecoveryTime
    ) || [];

  const transformedData = cleanedData.map((d) => ({
    ...d,
    original: { ...d },
    averageRecoveryTime: d.averageRecoveryTime - d.minimumRecoveryTime,
    maximumRecoveryTime: d.maximumRecoveryTime - d.averageRecoveryTime,
  }));

  // --- START OF THE FIX ---
  // Sort data by the SUM of the original min, avg, and max recovery times.
  const sortedData = transformedData.sort((a, b) => {
    // Calculate the total sum for item 'a'
    const totalA =
      a.original.minimumRecoveryTime +
      a.original.averageRecoveryTime +
      a.original.maximumRecoveryTime;

    // Calculate the total sum for item 'b'
    const totalB =
      b.original.minimumRecoveryTime +
      b.original.averageRecoveryTime +
      b.original.maximumRecoveryTime;

    // For descending order (bigger number first), subtract totalA from totalB.
    return totalB - totalA;
  });
  // --- END OF THE FIX ---

  return (
    <div className="h-96 w-full">
      <ResponsiveContainer debounce={300} width="100%" height="100%">
        <BarChart
          layout="vertical"
          // Use the correctly sorted data
          data={sortedData}
          margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
          barCategoryGap={30}
        >
          {/* ... The rest of your component remains the same ... */}
          <XAxis
            type="number"
            domain={[0, roundedMax]}
            tickFormatter={(v) => `${v} meses`}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 14 }}
          />
          <YAxis
            type="category"
            dataKey="country"
            width={110}
            axisLine={false}
            tickLine={false}
            tick={({ x, y, payload }) => {
              const isoCode = payload.value;
              const name = isoToName[isoCode] || isoCode;
              return (
                <g transform={`translate(${x - 90},${y - 12})`}>
                  <foreignObject x={0} y={0} width={100} height={24}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12,
                        fontFamily: "Bricolage Grotesque, sans-serif",
                        color: "#374151",
                      }}
                    >
                      <div className="relative w-7 h-5 overflow-hidden rounded">
                        <Flag
                          code={isoCode}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          className="flag-image"
                        />
                        <div className="absolute inset-0 pointer-events-none rounded" />
                      </div>
                      <span>{name}</span>
                    </div>
                  </foreignObject>
                </g>
              );
            }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />
          <Bar
            dataKey="minimumRecoveryTime"
            fill="#60C6FF"
            stackId="a"
            barSize={barSize}
            shape={<RoundedBarStart />}
          />
          <Bar
            dataKey="averageRecoveryTime"
            fill="#1E3558"
            stackId="a"
            barSize={barSize}
            shape={<RoundedBarMiddle />}
          />
          <Bar
            dataKey="maximumRecoveryTime"
            fill="#A7E3F2"
            stackId="a"
            barSize={barSize}
            shape={<RoundedBarEnd />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
