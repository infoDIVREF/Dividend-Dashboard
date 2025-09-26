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
import { CustomTooltip } from "../CustomTooltip/CustomTooltip";
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
  NL: "Países bajos",
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

export function CountriesChart({ setCalculatedHeight }) {
  const { data, loading, error } = useGetDataByCountry();
  const { claimStatus } = useFilters();

  if (loading) return <SkeletonChartHorizontal height="h-96" />;
  if (error) return <p className="text-sm text-red-500">Error: {error}</p>;

  const sortedData = [...(data || [])].sort((a, b) => {
    const totalA = a.recuperado + a.enviado + a.enTramite;
    const totalB = b.recuperado + b.enviado + b.enTramite;
    return totalB - totalA; // orden descendente
  });

  // 💡 1. Definimos constantes para la altura
  const HEIGHT_PER_COUNTRY = 45; // Altura en píxeles para cada país (barra + espaciado)
  const MIN_CHART_HEIGHT = 384; // Equivalente a h-96, para que no sea demasiado pequeño

  // 💡 2. Calculamos la altura final
  const calculatedHeight = sortedData.length * HEIGHT_PER_COUNTRY;
  const chartHeight = Math.max(MIN_CHART_HEIGHT, calculatedHeight);
  setCalculatedHeight(chartHeight);

  return (
    <div style={{ height: `${chartHeight}px` }}>
      <ResponsiveContainer debounce={300} width="100%" height="100%">
        <BarChart
          data={sortedData}
          layout="vertical"
          barCategoryGap={8} // en píxeles o porcentaje ("10%")
        >
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
            width={130} // 1. AUMENTADO: De 100 a 130 para dar más espacio
            tickFormatter={(iso) => isoToName[iso] || iso}
            axisLine={false}
            tickLine={false}
            interval={0}
            tick={({ x, y, payload }) => {
              const iso = payload.value;
              const countryName = isoToName[iso] || iso;

              // El valor de translación se ajusta. Un buen punto de partida
              // es restarle un poco menos que el nuevo 'width'.
              // Por ejemplo, width - 15 (130 - 15 = 115)
              return (
                <g transform={`translate(${x - 115},${y})`}>
                  {" "}
                  {/* 3. AJUSTADO: El valor de translación en X */}
                  <foreignObject x={0} y={-12} width={130} height={24}>
                    {" "}
                    {/* 2. AUMENTADO: El ancho del foreignObject */}
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <div className="relative w-[28px] h-[20px] overflow-hidden rounded">
                        <Flag
                          code={iso}
                          style={{
                            width: "28px",
                            height: "20px",
                            objectFit: "cover",
                            borderRadius: "4px",
                          }}
                          className="flag-image"
                        />
                        <div className="absolute inset-0 pointer-events-none rounded" />
                      </div>
                      <span
                        style={{
                          fontSize: 12,
                          fontFamily: "Bricolage Grotesque, sans-serif",
                          color: "#374151",
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
            content={<CustomTooltip />}
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
