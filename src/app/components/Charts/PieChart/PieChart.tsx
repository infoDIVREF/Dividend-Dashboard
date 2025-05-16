import { PieChart as RePieChart, Pie, Cell } from "recharts";

const data = [
  { name: "En trámite", value: 50, color: "#D1D5DB" },
  { name: "Enviado", value: 54, color: "#60A5FA" },
  { name: "Recuperado", value: 73, color: "#1D3557" },
];

export function PieChart() {
  return (
    <div className="relative h-64 w-64">
      <RePieChart width={256} height={256}>
        {data.map((entry, index) => (
          <Pie
            key={entry.name}
            data={[entry]}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={70 - index * 15}
            outerRadius={85 - index * 15}
            startAngle={90}
            endAngle={-270}
          >
            <Cell fill={entry.color} />
          </Pie>
        ))}
      </RePieChart>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-sm">
        <span className="text-xl font-bold text-[#1D3557]">73%</span>
        <span className="text-muted-foreground">Recuperado</span>
      </div>
    </div>
  );
}
