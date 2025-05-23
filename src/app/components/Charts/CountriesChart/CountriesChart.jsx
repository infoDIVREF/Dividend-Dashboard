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
import { useGetDataByCountry } from "@/hooks/useGetDataByCountry";
import { CustomLegend } from "../CustomLegend";
import { RoundedBar } from "../RoundedBar";
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

  if (loading) return <SkeletonChartHorizontal height="h-96" />;
  if (error) return <p className="text-sm text-red-500">Error: {error}</p>;

  return (
    <div className="h-96 w-full">
      <ResponsiveContainer debounce={300} width="100%" height="100%">
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            fontSize={12}
            type="number"
            tickFormatter={(value) => value.toLocaleString("es-ES")}
          />
          <YAxis
            fontSize={12}
            dataKey="name"
            type="category"
            width={70}
            tickFormatter={(iso) => isoToName[iso] || iso}
          />
          <Tooltip formatter={(value) => value.toLocaleString("es-ES")} />
          <Legend
            wrapperStyle={{ paddingTop: 30 }}
            content={<CustomLegend />}
          />
          <Bar
            dataKey="enTramite"
            stackId="a"
            fill="#C9C9C9"
            name="En trámite"
            activeBar={{ fill: "#9d9d9d" }}
            shape={(props) => (
              <RoundedBar {...props} dataKey="enTramite" horizontal />
            )}
          />
          <Bar
            dataKey="enviado"
            stackId="a"
            fill="#4F84A6"
            name="Enviado"
            activeBar={{ fill: "#417191" }}
            shape={(props) => (
              <RoundedBar {...props} dataKey="enviado" horizontal />
            )}
          />
          <Bar
            dataKey="recuperado"
            stackId="a"
            fill="#244A76"
            name="Recuperado"
            activeBar={{ fill: "#1f436c" }}
            shape={(props) => (
              <RoundedBar {...props} dataKey="recuperado" horizontal />
            )}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
