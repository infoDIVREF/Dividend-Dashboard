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
  console.log("claimStatus", claimStatus);

  if (loading) return <SkeletonChartVertical height="h-96" />;
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
            tickFormatter={(name) =>
              name.length > 5 ? name.slice(0, 3) + "…" : name
            }
          />
          <YAxis
            fontSize={12}
            tickFormatter={(value) => value.toLocaleString("es-ES")}
          />
          <Tooltip formatter={(value) => value.toLocaleString("es-ES")} />
          <Legend content={<CustomLegend />} />
          {claimStatus.includes("EN TRÁMITE") && (
            <Bar
              dataKey="enTramite"
              stackId="a"
              fill="#C9C9C9"
              name="En trámite"
              activeBar={{ fill: "#9d9d9d" }}
              shape={(props) => <RoundedBar {...props} dataKey="enTramite" />}
            />
          )}

          {claimStatus.includes("ENVIADO") && (
            <Bar
              dataKey="enviado"
              stackId="a"
              fill="#4F84A6"
              name="Enviado"
              activeBar={{ fill: "#417191" }}
              shape={(props) => <RoundedBar {...props} dataKey="enviado" />}
            />
          )}

          {claimStatus.includes("RECUPERADO") && (
            <Bar
              dataKey="recuperado"
              stackId="a"
              fill="#244A76"
              name="Recuperado"
              activeBar={{ fill: "#1f436c" }}
              shape={(props) => <RoundedBar {...props} dataKey="recuperado" />}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
