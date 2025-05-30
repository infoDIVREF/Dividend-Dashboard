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
import Flag from "react-world-flags";
import { useGetDataByCountry } from "@/hooks/useGetDataByCountry";
import { CustomLegend } from "../CustomLegend";
import { RoundedBar } from "../RoundedBar";
import { useFilters } from "@/contexts/FiltersContext";
import SkeletonChartHorizontal from "../SkeletonChartHorizontal";
const isoToName = {
  AL: "Albania",
  AD: "Andorra",
  AM: "Armenia",
  AT: "Austria",
  AZ: "Azerbaiyán",
  BY: "Bielorrusia",
  BE: "Bélgica",
  BA: "Bosnia y Herzegovina",
  BG: "Bulgaria",
  HR: "Croacia",
  CA: "Canadá",
  CY: "Chipre",
  CZ: "Chequia",
  DK: "Dinamarca",
  EE: "Estonia",
  FI: "Finlandia",
  FR: "Francia",
  GE: "Georgia",
  DE: "Alemania",
  GR: "Grecia",
  HU: "Hungría",
  IS: "Islandia",
  IE: "Irlanda",
  IT: "Italia",
  KZ: "Kazajistán",
  XK: "Kosovo",
  LV: "Letonia",
  LI: "Liechtenstein",
  LT: "Lituania",
  LU: "Luxemburgo",
  MT: "Malta",
  MD: "Moldavia",
  MC: "Mónaco",
  ME: "Montenegro",
  NL: "Países Bajos",
  MK: "Macedonia del Norte",
  NO: "Noruega",
  PL: "Polonia",
  PT: "Portugal",
  RO: "Rumanía",
  RU: "Rusia",
  SM: "San Marino",
  RS: "Serbia",
  SK: "Eslovaquia",
  SI: "Eslovenia",
  ES: "España",
  SE: "Suecia",
  CH: "Suiza",
  TR: "Turquía",
  UA: "Ucrania",
  GB: "Reino Unido",
  VA: "Ciudad del Vaticano",
};

export function CountriesChart() {
  const { data, loading, error } = useGetDataByCountry();
  const { claimStatus, updateClaimStatus } = useFilters();

  if (loading) return <SkeletonChartHorizontal height="h-96" />;
  if (error) return <p className="text-sm text-red-500">Error: {error}</p>;

  const sortedData = [...(data || [])].sort((a, b) => {
    const totalA = a.recuperado + a.enviado + a.enTramite;
    const totalB = b.recuperado + b.enviado + b.enTramite;
    return totalB - totalA; // orden descendente
  });

  return (
    <div className="h-96 w-full">
      <ResponsiveContainer debounce={300} width="100%" height="100%">
        <BarChart data={sortedData} layout="vertical">
          <XAxis
            fontSize={12}
            type="number"
            tickFormatter={(value) => value.toLocaleString("es-ES")}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            fontSize={12}
            dataKey="name"
            type="category"
            width={100}
            tickFormatter={(iso) => isoToName[iso] || iso}
            axisLine={false}
            tickLine={false}
            tick={({ x, y, payload }) => {
              const iso = payload.value;
              const countryName = isoToName[iso] || iso;

              return (
                <g transform={`translate(${x - 85},${y + 0})`}>
                  <foreignObject x={0} y={-12} width={100} height={24}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <Flag code={iso} style={{ width: 16, height: 12 }} />
                      <span
                        style={{
                          fontSize: 12,
                          fontFamily: "Bricolage Grotesque, sans-serif",
                          color: "#374151" /* gray-700 */,
                        }}
                      >
                        {countryName}
                      </span>
                    </div>
                  </foreignObject>
                </g>
              );
            }}
          />
          <Tooltip
            cursor={{ fill: "transparent" }}
            formatter={(value) => value.toLocaleString("es-ES")}
          />
          <Legend
            wrapperStyle={{ paddingTop: 30 }}
            content={<CustomLegend />}
          />
          {claimStatus.includes("EN TRÁMITE") && (
            <Bar
              dataKey="enTramite"
              stackId="a"
              fill="#C9C9C9"
              name="En trámite"
              shape={(props) => (
                <RoundedBar {...props} dataKey="enTramite" horizontal />
              )}
              barSize={10}
            />
          )}
          {claimStatus.includes("ENVIADO") && (
            <Bar
              dataKey="enviado"
              stackId="a"
              fill="#4F84A6"
              name="Enviado"
              shape={(props) => (
                <RoundedBar {...props} dataKey="enviado" horizontal />
              )}
            />
          )}
          {claimStatus.includes("RECUPERADO") && (
            <Bar
              dataKey="recuperado"
              stackId="a"
              fill="#244A76"
              name="Recuperado"
              shape={(props) => (
                <RoundedBar {...props} dataKey="recuperado" horizontal />
              )}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
