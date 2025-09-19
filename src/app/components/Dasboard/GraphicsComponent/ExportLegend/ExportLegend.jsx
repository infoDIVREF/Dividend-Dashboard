const CustomExportLegend = ({}) => {
  const items = [
    { color: "#AFAFAF", label: "En trámite" },
    { color: "#4F84A6", label: "Enviado" },
    { color: "#244A76", label: "Recuperado" },
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
