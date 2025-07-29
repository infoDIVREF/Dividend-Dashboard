// src/components/CustomTooltip.jsx (The new, improved version)

export const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const title = label || payload[0].name;

    return (
      <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
        <p className="font-semibold mb-2 text-gray-800">{title}</p>

        <ul className="space-y-1">
          {payload.map((entry, index) => (
            <li key={`item-${index}`} className="flex items-center text-sm">
              <span
                className="w-3 h-3 mr-2 rounded-sm"
                style={{ backgroundColor: entry.color || entry.payload.color }}
              ></span>

              <span className="text-gray-600 mr-2">{`${entry.name}:`}</span>

              <span className="font-medium text-gray-800">
                {entry.value.toLocaleString("es-ES")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};
