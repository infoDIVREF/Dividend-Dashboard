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

const data = [
  {
    name: "Fondo A",
    enTramite: 400000,
    enviado: 500000,
    recuperado: 700000,
  },
  {
    name: "Fondo B",
    enTramite: 300000,
    enviado: 400000,
    recuperado: 500000,
  },
  {
    name: "Fondo C",
    enTramite: 200000,
    enviado: 300000,
    recuperado: 300000,
  },
  {
    name: "Fondo D",
    enTramite: 500000,
    enviado: 600000,
    recuperado: 900000,
  },
];

export function VerticalChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
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
            radius={[5, 5, 0, 0]} // top-left y top-right
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
