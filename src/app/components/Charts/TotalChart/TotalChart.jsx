"use client";

import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useGetTotalChartData } from "@/hooks/useGetTotalChartData";
import { CustomLegend } from "../CustomLegend";
import SkeletonChartCircle from "../YearsChart/SkeletonChartCircle";
import { useFilters } from "@/contexts/FiltersContext";
const COLORS = {
  pendiente: "#c9c9c9",
  enviado: "#5b83a3",
  recuperado: "#2d4973",
};

export function TotalChart() {
  const { data, loading, error } = useGetTotalChartData();
  const { claimStatus, updateClaimStatus } = useFilters();

  if (loading) return <SkeletonChartCircle height="h-80" />;
  if (error) return <p className="text-sm text-red-500">Error: {error}</p>;

  const total = data?.data?.total;
  if (!total)
    return <p className="text-sm text-gray-400">No hay datos disponibles.</p>;

  const { totalPendiente, totalEnviado, totalRecuperado } = total;
  const totalSum = totalPendiente + totalEnviado + totalRecuperado || 1;

  const chartData = [
    {
      name: "En trámite",
      value: totalPendiente,
      color: COLORS.pendiente,
    },
    {
      name: "Enviado",
      value: totalEnviado,
      color: COLORS.enviado,
    },
    {
      name: "Recuperado",
      value: totalRecuperado,
      color: COLORS.recuperado,
    },
  ];

  // Porcentajes individuales
  const porcentajePendiente = Math.round((totalPendiente / totalSum) * 100);
  const porcentajeEnviado = Math.round((totalEnviado / totalSum) * 100);
  const porcentajeRecuperado = Math.round((totalRecuperado / totalSum) * 100);

  return (
    <div className="flex flex-col items-center justify-between h-full">
      <div className="h-80 w-full" style={{ width: 220, height: 220 }}>
        <ResponsiveContainer height={"100%"} width={"100%"}>
          <RePieChart>
            {(() => {
              let startAngle = 90;
              const filteredChartData = chartData.filter((entry) => {
                return (
                  (entry.name === "En trámite" &&
                    claimStatus.includes("EN TRÁMITE")) ||
                  (entry.name === "Enviado" &&
                    claimStatus.includes("ENVIADO")) ||
                  (entry.name === "Recuperado" &&
                    claimStatus.includes("RECUPERADO"))
                );
              });
              return filteredChartData.map((entry) => {
                const angle = (entry.value / totalSum) * 360;
                const endAngle = startAngle - angle;

                const outerRadius =
                  entry.name === "Recuperado"
                    ? 105
                    : entry.name === "Enviado"
                    ? 100
                    : 90;

                const pie = (
                  <Pie
                    key={entry.name}
                    data={[entry]}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    isAnimationActive={false}
                    cornerRadius={5}
                  >
                    <Cell fill={entry.color} />
                  </Pie>
                );

                startAngle = endAngle; // avanzar al siguiente segmento
                return pie;
              });
            })()}
            <Tooltip
              formatter={(value) => value.toLocaleString("es-ES")}
              wrapperStyle={{ fontSize: "0.875rem" }}
            />
            {/* <Legend content={<CustomLegend />} /> */}
          </RePieChart>
        </ResponsiveContainer>
      </div>

      {/* Texto porcentual por estado */}
      <div className="mt-4 text-center mb-1">
        {claimStatus.includes("EN TRÁMITE") && (
          <p
            className="text-sm font-medium"
            style={{ color: COLORS.pendiente }}
          >
            {porcentajePendiente}% En trámite
          </p>
        )}
        {claimStatus.includes("ENVIADO") && (
          <p
            className="text-sm font-semibold"
            style={{ color: COLORS.enviado }}
          >
            {porcentajeEnviado}% Enviado
          </p>
        )}
        {claimStatus.includes("RECUPERADO") && (
          <p className="text-sm font-bold" style={{ color: COLORS.recuperado }}>
            {porcentajeRecuperado}% Recuperado
          </p>
        )}
      </div>
    </div>
  );
}
