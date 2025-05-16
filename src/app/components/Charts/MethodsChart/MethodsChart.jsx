"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { useGetDataByMethod } from "@/hooks/useGetDataByMethod";

export function MethodsChart() {
  const { data, loading, error } = useGetDataByMethod();

  if (loading)
    return <p className="text-sm text-gray-500">Cargando datos por vía...</p>;
  if (error) return <p className="text-sm text-red-500">Error: {error}</p>;
  if (!data.length)
    return <p className="text-sm text-gray-400">No hay datos disponibles.</p>;

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
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
