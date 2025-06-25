"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { RoundedBar } from "../RoundedBar";
import { RoundedBarMiddle } from "./RoundedBarMiddle";
import { RoundedBarEnd } from "./RoundedBarEnd";
import { RoundedBarStart } from "./RoundedBarStart";
import { CustomTooltip } from "./CustomTooltip";
import Flag from "react-world-flags";
import { isoToName } from "@/consts/isoToName";

// --- NEW: Map from ISO code back to name for display ---

export function AverageRecoveryTimeCard({ method, data }) {
  const barSize = Math.max(8, 20 - data?.length);

  const maxValue = Math.max(
    ...data?.flatMap((d) => [
      d.minimumRecoveryTime,
      d.averageRecoveryTime,
      d.maximumRecoveryTime,
    ])
  );

  const roundedMax = Math.ceil(maxValue / 5) * 5;

  const cleanedData = data.filter(
    (d) =>
      d.minimumRecoveryTime > 0 &&
      d.averageRecoveryTime > 0 &&
      d.maximumRecoveryTime > 0 &&
      d.minimumRecoveryTime < d.averageRecoveryTime &&
      d.averageRecoveryTime < d.maximumRecoveryTime
  );

  const transformedData = cleanedData.map((d) => ({
    ...d,
    original: { ...d }, // solo ese país
    averageRecoveryTime: d.averageRecoveryTime - d.minimumRecoveryTime,
    maximumRecoveryTime: d.maximumRecoveryTime - d.averageRecoveryTime,
  }));

  return (
    <div className="h-96 w-full">
      <ResponsiveContainer debounce={300} width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={transformedData}
          margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
          barCategoryGap={30}
        >
          <XAxis
            type="number"
            domain={[0, roundedMax]}
            tickFormatter={(v) => `${v} meses`}
            axisLine={false}
            tickLine={false}
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
                          // --- UPDATED: Directly use the isoCode ---
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
                      {/* Display the full country name */}
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
