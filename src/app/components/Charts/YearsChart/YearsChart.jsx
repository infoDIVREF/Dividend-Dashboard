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
import { useGetDataByYear } from "@/hooks/useGetDataByYear";
import { CustomLegend } from "../CustomLegend";
import { RoundedBar } from "../RoundedBar";
import SkeletonChartVertical from "../SkeletonChartVertical";
import { useFilters } from "@/contexts/FiltersContext";
import { CustomTooltip } from "../CustomTooltip/CustomTooltip";

// Inline shape personalizado para aplicar border-radius solo si es la barra superior
export function YearsChart({ calculatedHeight, isWideFundsChart }) {
  const { data, loading, error } = useGetDataByYear();
  const { claimStatus } = useFilters();

  if (loading) return <SkeletonChartVertical height="h-80" />;
  if (error) return <p className="text-sm text-red-500">Error: {error}</p>;

  // Objeto de estilos dinámicos
  const dynamicStyles = {
    // Si la condición se cumple, usa la altura calculada en píxeles.
    // Si no, el estilo 'height' no se aplica y la clase de Tailwind tomará el control.
    height:
      calculatedHeight && isWideFundsChart
        ? `${calculatedHeight}px`
        : undefined,
  };

  return (
    // Aplicamos las clases estáticas y el estilo dinámico
    <div
      className="absolute top-0 left-0 w-full h-[90%]" // Dejamos un 'height' por defecto
      style={dynamicStyles}
    >
      <ResponsiveContainer debounce={300} width="100%" height="100%">
        <BarChart data={data}>
          {/* ... el resto de tu componente ... */}
          <XAxis fontSize={12} dataKey="name" />
          <YAxis
            fontSize={12}
            tickFormatter={(value) => value.toLocaleString("es-ES")}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: "transparent" }}
            content={<CustomTooltip />}
          />
          <Legend
            content={<CustomLegend />}
            wrapperStyle={{ paddingTop: 30 }}
          />
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
