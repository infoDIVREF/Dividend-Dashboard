import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetAverageRecoveryTime } from "@/hooks/useGetAverageRecoveryTime";

export function AverageRecoveryTime() {
  const { data, loading, error } = useGetAverageRecoveryTime();

  //   return (
  //     <ResponsiveContainer width="100%" height={600}>
  //       <BarChart
  //         layout="vertical"
  //         data={data}
  //         margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
  //       >
  //         <CartesianGrid strokeDasharray="3 3" />
  //         <XAxis
  //           type="number"
  //           domain={[0, 60]}
  //           tickFormatter={(v) => `${v} meses`}
  //         />
  //         <YAxis dataKey="name" type="category" width={100} />
  //         <Tooltip />
  //         <Bar dataKey="min" stackId="a" fill="#60C6FF" />
  //         <Bar dataKey="mid" stackId="a" fill="#1E3558" />
  //         <Bar dataKey="max" stackId="a" fill="#A7E3F2" />
  //       </BarChart>
  //     </ResponsiveContainer>
  //   );
  return <p>Información de las graficas</p>;
}
