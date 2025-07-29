export default function StatusButton({
  label,
  icon,
  selected,
  onClick,
  numValue,
}) {
  const colors = {
    "EN TRÁMITE": "#C9C9C9",
    ENVIADO: "#4F84A6",
    RECUPERADO: "#244A76",
  };

  const color = colors[label] || "#D1D5DB"; // Default color
  const bgColor = selected ? "#FBFBFB" : "#E1E4EB";
  const numBgColor = selected ? color : "#AFAFAF";
  const numTextColor = "#FFFFFF";
  const textColor = selected ? "#2A2A2A" : "#AFAFAF";

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: bgColor, color: textColor }}
      className="px-4 text-[12px] leading-5 font-bold h-10 flex items-center justify-start gap-2 rounded-xl shadow-[3px_3px_4.7px_rgba(0,0,0,0.08)]"
    >
      <span
        className="font-bricolage w-6 h-6 rounded-full flex items-center justify-center text-sm"
        style={{
          backgroundColor: numBgColor,
          color: numTextColor,
        }}
      >
        {numValue}
      </span>
      <div className="flex gap-1 items-center">
        <span>{icon}</span>
        <span className="tracking-wide font-[500]">
          {capitalizeFirstLetter(label)}
        </span>
      </div>
    </button>
  );
}
