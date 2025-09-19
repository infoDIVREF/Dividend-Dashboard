const CustomExportLegend = ({}) => {
  const items = [
    { color: "#d1d5db", label: "En trámite" },
    { color: "#6082a3", label: "Enviado" },
    { color: "#2c3e50", label: "Recuperado" },
  ];

  return (
    // Usamos la prop className para añadir clases al contenedor
    <div
      className={`flex items-center justify-center gap-x-6 py-4 export-legend`}
      style={{ display: "none" }}
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-x-4">
          <span
            className="w-12 h-8 rounded-sm"
            style={{ backgroundColor: item.color }}
          ></span>
          <span className="text-lg text-gray-600 font-medium export-legend-text">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomExportLegend;
