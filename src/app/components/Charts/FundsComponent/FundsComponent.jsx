"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useGetDataByFund } from "@/hooks/useGetDataByFund";
import { CustomLegend } from "../CustomLegend";
import { RoundedBar } from "../RoundedBar";
import SkeletonChartVertical from "../SkeletonChartVertical";
import { useFilters } from "@/contexts/FiltersContext";
import {
  mockFunds15,
  mockFunds40,
  mockFunds150,
} from "@/../mockups/funds-mockups";
import { useState } from "react";

// 👉 Lógica para dividir datos en chunks equilibrados
function splitIntoBalancedChunks(data, maxPerChunk) {
  // ... (this function remains the same)
  const total = data.length;
  const numChunks = Math.ceil(total / maxPerChunk);
  const baseSize = Math.floor(total / numChunks);
  const remainder = total % numChunks;
  const result = [];
  let start = 0;
  for (let i = 0; i < numChunks; i++) {
    const size = baseSize + (i < remainder ? 1 : 0);
    result.push(data.slice(start, start + size));
    start += size;
  }
  return result;
}

export function FundsComponent() {
  const [showAll, setShowAll] = useState(false);
  const { data, loading, error, fundsObjectLength } = useGetDataByFund();
  const { claimStatus } = useFilters();

  if (loading) return <SkeletonChartVertical height="h-96" />;
  if (error) return <p className="text-sm text-red-500">Error: {error}</p>;

  const fullChartData = data?.data?.byFund
    ? Object.values(data.data.byFund)
        .map((item) => ({
          name: item.nombre,
          enTramite: item.totalPendiente,
          enviado: item.totalEnviado,
          recuperado: item.totalRecuperado,
        }))
        .sort((a, b) => {
          const totalA = a.enTramite + a.enviado + a.recuperado;
          const totalB = b.enTramite + b.enviado + b.recuperado;
          return totalB - totalA;
        })
    : [];

  // --- START OF THE FIX ---

  // 1. Determine which statuses are active based on the filter
  const isEnTramiteActive = claimStatus.includes("EN TRÁMITE");
  const isEnviadoActive = claimStatus.includes("ENVIADO");
  const isRecuperadoActive = claimStatus.includes("RECUPERADO");

  // 2. Create a new array containing only the funds that have data for the active statuses.
  const displayableFunds = fullChartData.filter((fund) => {
    let fundValue = 0;
    if (isEnTramiteActive) fundValue += fund.enTramite;
    if (isEnviadoActive) fundValue += fund.enviado;
    if (isRecuperadoActive) fundValue += fund.recuperado;
    return fundValue > 0;
  });

  // 3. The new count is the length of this filtered array.
  const totalDisplayableFunds = displayableFunds.length;

  // 4. Create the chart chunks from the `displayableFunds` array.
  //    This is more efficient and makes the old `visibleCharts` filter redundant.
  const charts =
    totalDisplayableFunds > 15 && showAll
      ? splitIntoBalancedChunks(displayableFunds, 15)
      : [displayableFunds.slice(0, 15)];

  // --- END OF THE FIX ---

  return (
    <div className="w-full relative">
      {/* 3. Map over the newly created `visibleCharts` array */}
      {charts.map((chartData, index) => (
        <div key={index} className="relative h-96 w-full mb-6">
          <ResponsiveContainer debounce={300} width="100%" height="100%">
            <BarChart data={chartData}>
              {/* ... (The rest of your BarChart implementation remains the same) ... */}
              <XAxis
                fontSize={12}
                dataKey="name"
                interval={0}
                textAnchor="end"
                height={60}
                tick={({ x, y, payload }) => {
                  const normalizeLabel = (text) => {
                    const [firstWord, ...rest] = text.toLowerCase().split(" ");
                    const capitalizedFirst =
                      firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
                    return [capitalizedFirst, ...rest];
                  };
                  const lines = normalizeLabel(payload.value);
                  const maxLines = 2;
                  const visibleLines = lines.slice(0, maxLines);
                  return (
                    <g transform={`translate(${x},${y + 10})`}>
                      <text
                        x={0}
                        y={0}
                        textAnchor="middle"
                        fontSize={12}
                        fontWeight="500"
                        fontFamily="Bricolage Grotesque, sans-serif"
                      >
                        {visibleLines.map((line, idx) => (
                          <tspan key={idx} x="0" dy={idx === 0 ? 0 : 14}>
                            {line}
                          </tspan>
                        ))}
                      </text>
                    </g>
                  );
                }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                fontSize={12}
                tickFormatter={(value) => value.toLocaleString("es-ES")}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                formatter={(value) => value.toLocaleString("es-ES")}
              />
              <Legend content={<CustomLegend />} />
              {isEnTramiteActive && (
                <Bar
                  dataKey="enTramite"
                  stackId="a"
                  fill="#C9C9C9"
                  name="En trámite"
                  shape={(props) => (
                    <RoundedBar {...props} dataKey="enTramite" />
                  )}
                  maxBarSize={80}
                />
              )}
              {isEnviadoActive && (
                <Bar
                  dataKey="enviado"
                  stackId="a"
                  fill="#4F84A6"
                  name="Enviado"
                  shape={(props) => <RoundedBar {...props} dataKey="enviado" />}
                  maxBarSize={80}
                />
              )}
              {isRecuperadoActive && (
                <Bar
                  dataKey="recuperado"
                  stackId="a"
                  fill="#244A76"
                  name="Recuperado"
                  shape={(props) => (
                    <RoundedBar {...props} dataKey="recuperado" />
                  )}
                  maxBarSize={80}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      ))}

      {totalDisplayableFunds > 15 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="absolute text-white bottom-[0.2rem] right-3 z-0 bg-[#F86338] px-3 py-1 rounded-full text-normal font-medium flex items-center gap-1 hover:bg-[#d44f2b] transition-colors"
        >
          <span>{showAll ? "Ver menos" : "Ver más"}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={showAll ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
            />
          </svg>
        </button>
      )}
    </div>
  );
}
