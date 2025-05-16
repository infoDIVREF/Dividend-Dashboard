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
    name: "Alemania",
    enTramite: 300000,
    enviado: 400000,
    recuperado: 500000,
  },
  {
    name: "Bélgica",
    enTramite: 200000,
    enviado: 500000,
    recuperado: 800000,
  },
  {
    name: "Suiza",
    enTramite: 250000,
    enviado: 700000,
    recuperado: 1050000,
  },
  {
    name: "Francia",
    enTramite: 300000,
    enviado: 800000,
    recuperado: 1500000,
  },
  {
    name: "España",
    enTramite: 200000,
    enviado: 900000,
    recuperado: 1900000,
  },
  {
    name: "Italia",
    enTramite: 400000,
    enviado: 1100000,
    recuperado: 1900000,
  },
];

export function HorizontalChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical">
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
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
            radius={[0, 5, 5, 0]} // top-left y top-right
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
