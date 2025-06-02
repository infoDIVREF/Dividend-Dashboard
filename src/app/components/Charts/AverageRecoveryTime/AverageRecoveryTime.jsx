"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { RoundedBar } from "../RoundedBar";
import { useGetAverageRecoveryTime } from "@/hooks/useGetAverageRecoveryTime";
import Flag from "react-world-flags";

const nameToIso = {
  Albania: "AL",
  Andorra: "AD",
  Armenia: "AM",
  Austria: "AT",
  Azerbaiyán: "AZ",
  Bielorrusia: "BY",
  Bélgica: "BE",
  "Bosnia y Herzegovina": "BA",
  Bulgaria: "BG",
  Croacia: "HR",
  Canadá: "CA",
  Chipre: "CY",
  Chequia: "CZ",
  Dinamarca: "DK",
  Estonia: "EE",
  Finlandia: "FI",
  Francia: "FR",
  Georgia: "GE",
  Alemania: "DE",
  Grecia: "GR",
  Hungría: "HU",
  Islandia: "IS",
  Irlanda: "IE",
  Italia: "IT",
  Kazajistán: "KZ",
  Kosovo: "XK",
  Letonia: "LV",
  Liechtenstein: "LI",
  Lituania: "LT",
  Luxemburgo: "LU",
  Malta: "MT",
  Moldavia: "MD",
  Mónaco: "MC",
  Montenegro: "ME",
  "Países Bajos": "NL",
  "Macedonia del Norte": "MK",
  Noruega: "NO",
  Polonia: "PL",
  Portugal: "PT",
  Rumanía: "RO",
  Rusia: "RU",
  "San Marino": "SM",
  Serbia: "RS",
  Eslovaquia: "SK",
  Eslovenia: "SI",
  España: "ES",
  Suecia: "SE",
  Suiza: "CH",
  Turquía: "TR",
  Ucrania: "UA",
  "Reino Unido": "GB",
  "Ciudad del Vaticano": "VA",
};

export function AverageRecoveryTime({ method }) {
  const { data, loading, error } = useGetAverageRecoveryTime();

  const mockData = [
    { name: "Alemania", min: 10, mid: 15, max: 20 },
    { name: "Bélgica", min: 8, mid: 14, max: 18 },
    { name: "Canadá", min: 9, mid: 13, max: 17 },
    { name: "Irlanda", min: 7, mid: 12, max: 16 },
    { name: "Italia", min: 11, mid: 16, max: 21 },
    { name: "Noruega", min: 12, mid: 18, max: 22 },
    { name: "Polonia", min: 6, mid: 10, max: 15 },
    { name: "Portugal", min: 7, mid: 11, max: 14 },
    { name: "Suecia", min: 8, mid: 12, max: 17 },
    { name: "Suiza", min: 9, mid: 14, max: 19 },
  ];

  const barSize = Math.max(8, 25 - mockData.length);

  return (
    <div className="h-96 w-full">
      <ResponsiveContainer debounce={300} width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={mockData}
          margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
          barCategoryGap={22}
        >
          <XAxis
            type="number"
            domain={[0, 60]}
            tickFormatter={(v) => `${v} meses`}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={110}
            axisLine={false}
            tickLine={false}
            tick={({ x, y, payload }) => {
              const name = payload.value;
              const iso = nameToIso[name] || "";

              return (
                <g transform={`translate(${x - 90},${y - 12})`}>
                  <foreignObject x={0} y={0} width={100} height={24}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12,
                        fontFamily: "Bricolage Grotesque, sans-serif",
                        color: "#374151",
                      }}
                    >
                      <Flag code={iso} style={{ width: 16, height: 12 }} />
                      <span>{name}</span>
                    </div>
                  </foreignObject>
                </g>
              );
            }}
          />
          <Tooltip cursor={{ fill: "transparent" }} />
          <Bar dataKey="min" stackId="a" fill="#60C6FF" barSize={barSize} />
          <Bar dataKey="mid" stackId="a" fill="#1E3558" barSize={barSize} />
          <Bar
            dataKey="max"
            stackId="a"
            fill="#A7E3F2"
            barSize={barSize}
            shape={(props) => (
              <RoundedBar {...props} dataKey="recuperado" horizontal />
            )}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
