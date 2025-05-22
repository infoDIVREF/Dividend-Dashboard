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

export function FundsChart() {
  const { data, loading, error } = useGetDataByFund();

  if (loading)
    return <p className="text-sm text-gray-500">Cargando datos...</p>;
  if (error) return <p className="text-sm text-red-500">Error: {error}</p>;

  // Transformamos los datos del objeto a array
  const chartData = data?.data?.byFund
    ? Object.values(data.data.byFund).map((item) => ({
        name: item.nombre,
        enTramite: item.totalPendiente,
        enviado: item.totalEnviado,
        recuperado: item.totalRecuperado,
      }))
    : [];

  if (!chartData.length)
    return <p className="text-sm text-gray-400">No hay datos disponibles.</p>;

  return (
    <div className="h-96 w-full">
      <ResponsiveContainer debounce={300} width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis
            dataKey="name"
            interval={0}
            textAnchor="end"
            height={60}
            tickFormatter={(name) =>
              name.length > 5 ? name.slice(0, 3) + "…" : name
            }
          />{" "}
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="enTramite"
            stackId="a"
            fill="#C9C9C9"
            name="En trámite"
          />
          <Bar dataKey="enviado" stackId="a" fill="#4F84A6" name="Enviado" />
          <Bar
            dataKey="recuperado"
            stackId="a"
            fill="#244A76"
            name="Recuperado"
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
