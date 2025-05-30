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

export function FundsChart() {
  const { data, loading, error } = useGetDataByFund();
  const { claimStatus, updateClaimStatus } = useFilters();

  if (loading) return <SkeletonChartVertical height="h-96" />;
  if (error) return <p className="text-sm text-red-500">Error: {error}</p>;

  // Transformamos los datos del objeto a array
  const chartData = data?.data?.byFund
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
          return totalB - totalA; // mayor a menor
        })
    : [];

  return (
    <div className="h-96 w-full">
      <ResponsiveContainer debounce={300} width="100%" height="100%">
        <BarChart data={chartData}>
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
                    {visibleLines.map((line, index) => (
                      <tspan key={index} x="0" dy={index === 0 ? 0 : 14}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              );
            }}
            axisLine={false} // quita la línea principal del eje X
            tickLine={false} // quita las pequeñas líneas de cada tick
          />
          <YAxis
            fontSize={12}
            tickFormatter={(value) => value.toLocaleString("es-ES")}
            axisLine={false} // quita la línea principal del eje X
            tickLine={false} // quita las pequeñas líneas de cada tick
          />
          <Tooltip
            cursor={{ fill: "transparent" }}
            formatter={(value) => value.toLocaleString("es-ES")}
          />
          <Legend content={<CustomLegend />} />
          {claimStatus.includes("EN TRÁMITE") && (
            <Bar
              dataKey="enTramite"
              stackId="a"
              fill="#C9C9C9"
              name="En trámite"
              shape={(props) => <RoundedBar {...props} dataKey="enTramite" />}
            />
          )}

          {claimStatus.includes("ENVIADO") && (
            <Bar
              dataKey="enviado"
              stackId="a"
              fill="#4F84A6"
              name="Enviado"
              shape={(props) => <RoundedBar {...props} dataKey="enviado" />}
            />
          )}

          {claimStatus.includes("RECUPERADO") && (
            <Bar
              dataKey="recuperado"
              stackId="a"
              fill="#244A76"
              name="Recuperado"
              shape={(props) => <RoundedBar {...props} dataKey="recuperado" />}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
