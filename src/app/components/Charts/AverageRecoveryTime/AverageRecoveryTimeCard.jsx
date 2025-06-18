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
import Flag from "react-world-flags";

// --- NEW: Map from ISO code back to name for display ---
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

export function AverageRecoveryTimeCard({ method, data }) {
  const barSize = Math.max(8, 25 - data.length);

  const maxValue = Math.max(
    ...data.flatMap((d) => [
      d.minimumRecoveryTime,
      d.averageRecoveryTime,
      d.maximumRecoveryTime,
    ])
  );

  const roundedMax = Math.ceil(maxValue / 5) * 5;

  return (
    <div className="h-96 w-full">
      <ResponsiveContainer debounce={300} width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
          barCategoryGap={30}
        >
          <XAxis
            type="number"
            domain={[0, roundedMax]}
            tickFormatter={(v) => `${v} meses`}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="country"
            width={110}
            axisLine={false}
            tickLine={false}
            tick={({ x, y, payload }) => {
              const isoCode = payload.value;
              const name = isoToName[isoCode] || isoCode;

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
                      <div className="relative w-7 h-5 overflow-hidden rounded">
                        <Flag
                          // --- UPDATED: Directly use the isoCode ---
                          code={isoCode}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          className="flag-image"
                        />
                        <div className="absolute inset-0 pointer-events-none rounded" />
                      </div>
                      {/* Display the full country name */}
                      <span>{name}</span>
                    </div>
                  </foreignObject>
                </g>
              );
            }}
          />
          <Tooltip cursor={{ fill: "transparent" }} />
          <Bar
            dataKey="minimumRecoveryTime"
            fill="#60C6FF"
            barSize={barSize}
            shape={(props) => (
              <RoundedBar {...props} dataKey="recuperado" horizontal />
            )}
          />
          <Bar
            dataKey="averageRecoveryTime"
            fill="#1E3558"
            barSize={barSize}
            shape={(props) => (
              <RoundedBar {...props} dataKey="recuperado" horizontal />
            )}
          />
          <Bar
            dataKey="maximumRecoveryTime"
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
