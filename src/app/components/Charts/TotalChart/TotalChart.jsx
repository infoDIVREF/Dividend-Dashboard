"use client";

import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetTotalChartData } from "@/hooks/useGetTotalChartData";

const COLORS = {
  pendiente: "#D1D5DB",
  enviado: "#60A5FA",
  recuperado: "#1D3557",
};

export function TotalChart() {
  const { data, loading, error } = useGetTotalChartData();

  if (loading)
    return <p className="text-sm text-gray-500">Cargando datos totales...</p>;
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
    <div className="flex flex-col items-center justify-center">
      <ResponsiveContainer width={220} height={220}>
        <RePieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            startAngle={90}
            endAngle={-270}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `${value.toLocaleString()} €`}
            wrapperStyle={{ fontSize: "0.875rem" }}
          />
        </RePieChart>
      </ResponsiveContainer>

      {/* Texto porcentual por estado */}
      <div className="mt-4 text-center space-y-1">
        <p className="text-sm font-medium" style={{ color: COLORS.pendiente }}>
          {porcentajePendiente}% En trámite
        </p>
        <p className="text-sm font-medium" style={{ color: COLORS.enviado }}>
          {porcentajeEnviado}% Enviado
        </p>
        <p className="text-lg font-bold" style={{ color: COLORS.recuperado }}>
          {porcentajeRecuperado}% Recuperado
        </p>
      </div>
    </div>
  );
}
