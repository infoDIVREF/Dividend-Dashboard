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
import { useGetDataByYear } from "@/hooks/useGetDataByYear";
import { CustomLegend } from "../CustomLegend";
import { RoundedBar } from "../RoundedBar";

// Inline shape personalizado para aplicar border-radius solo si es la barra superior

export function YearsChart() {
  const { data, loading, error } = useGetDataByYear();

  if (loading)
    return <p className="text-sm text-gray-500">Cargando datos por año...</p>;
  if (error) return <p className="text-sm text-red-500">Error: {error}</p>;
  if (!data.length)
    return <p className="text-sm text-gray-400">No hay datos disponibles.</p>;

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer debounce={300} width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis fontSize={14} dataKey="name" />
          <YAxis fontSize={14} />
          <Tooltip />
          <Legend
            wrapperStyle={{ paddingTop: 10 }}
            content={<CustomLegend />}
          />
          <Bar
            dataKey="enTramite"
            stackId="a"
            fill="#C9C9C9"
            name="En trámite"
            shape={(props) => <RoundedBar {...props} dataKey="enTramite" />}
          />
          <Bar
            dataKey="enviado"
            stackId="a"
            fill="#4F84A6"
            name="Enviado"
            shape={(props) => <RoundedBar {...props} dataKey="enviado" />}
          />
          <Bar
            dataKey="recuperado"
            stackId="a"
            fill="#244A76"
            name="Recuperado"
            shape={(props) => <RoundedBar {...props} dataKey="recuperado" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
