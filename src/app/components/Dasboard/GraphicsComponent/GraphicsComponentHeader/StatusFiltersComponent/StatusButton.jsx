export default function StatusButton({ label, icon, selected, onClick }) {
  const colors = {
    "EN TRÁMITE": "#C9C9C9",
    ENVIADO: "#4F84A6",
    RECUPERADO: "#244A76",
  };

  const color = colors[label] || "#D1D5DB";

  const bgColor = selected ? color : "#FFFFFF";
  const borderColor = selected ? color : "#D1D5DB";
  const textColor = selected ? "#FFFFFF" : "#6B7280"; // gray-500
  const iconColor = selected ? "#FFFFFF" : "#9CA3AF"; // gray-400

  return (
    <button
      onClick={onClick}
      className="min-w-[162px] h-[42px] px-5 gap-3  flex items-center rounded-[12.66px] text-sm font-semibold transition-all"
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {icon}

      {/* Texto */}
      <span className="uppercase tracking-wide">{label}</span>
    </button>
  );
}
