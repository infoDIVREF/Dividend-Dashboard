import { isoToName } from "@/consts/isoToName";
export const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;

  const original = payload[0].payload.original;

  const entries = {
    minimumRecoveryTime: "Tiempo mínimo",
    averageRecoveryTime: "Tiempo medio",
    maximumRecoveryTime: "Tiempo máximo",
  };

  const colors = {
    minimumRecoveryTime: "#60C6FF",
    averageRecoveryTime: "#1E3558",
    maximumRecoveryTime: "#A7E3F2",
  };

  return (
    <div className="bg-white p-3 rounded shadow-md border text-sm text-gray-800">
      <strong className="block mb-1">{isoToName[label] || label}</strong>
      {Object.keys(entries).map((key) => (
        <div key={key} className="flex justify-between gap-2">
          <span style={{ color: colors[key] }}>{entries[key]}</span>
          <span style={{ color: colors[key] }}>{original?.[key]} meses</span>
        </div>
      ))}
    </div>
  );
};
