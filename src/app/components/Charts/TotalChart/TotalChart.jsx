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
import SkeletonChartCircle from "../YearsChart/SkeletonChartCircle";
import { useFilters } from "@/contexts/FiltersContext";
import { CustomTooltip } from "../CustomTooltip/CustomTooltip";
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
    <div className="flex flex-col items-center justify-center h-full min-h-[486px]">
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
            <Tooltip content={<CustomTooltip />} />
          </RePieChart>
        </ResponsiveContainer>
      </div>

      {/* Texto porcentual por estado */}
      <div className="font-bricolage relative mt-4 text-center mb-1">
        {claimStatus.includes("EN TRÁMITE") && (
          <div
            className="absolute flex flex-col items-center text-sm font-medium"
            style={{ color: COLORS.pendiente, top: "-280px", left: "80px" }}
          >
            <p className="text-[1.5rem]">{porcentajePendiente}%</p>
            <p className="whitespace-nowrap">En trámite</p>
          </div>
        )}
        {claimStatus.includes("ENVIADO") && (
          <div
            className="absolute flex flex-col items-center text-sm font-semibold"
            style={{ color: COLORS.enviado, top: "0", left: "-30px" }}
          >
            <p className="text-[1.5rem]">{porcentajeEnviado}%</p>
            <p className=" text-sm font-semibold">Enviado</p>
          </div>
        )}
        {claimStatus.includes("RECUPERADO") && (
          <div
            className="absolute flex flex-col items-center text-sm font-bold"
            style={{
              top: "-280px",
              left: "-130px",
              color: COLORS.recuperado,
            }}
          >
            <p className="text-[1.5rem]">{porcentajeRecuperado}% </p>
            <p>Recuperado</p>
          </div>
        )}
      </div>
    </div>
  );
}
