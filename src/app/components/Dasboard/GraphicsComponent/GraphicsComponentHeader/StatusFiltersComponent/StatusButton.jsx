export default function StatusButton({
  label,
  icon,
  selected,
  onClick,
  numValue,
}) {
  const colors = {
    "EN TRÁMITE": "#AFAFAF",
    ENVIADO: "#4F84A6",
    RECUPERADO: "#244A76",
  };

  const color = colors[label] || "#D1D5DB"; // Default color
  const bgColor = selected ? color : "#E1E4EB";
  const numBgColor = "#FAFBFE";
  const numTextColor = selected ? color : "";
  const textColor = selected ? "#FAFBFE" : "#AFAFAF";

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: bgColor, color: textColor }}
      className="px-4 min-w-[177.655px] min-h-[41.801px] leading-5 font-bold h-10 flex items-center justify-center gap-2 rounded-xl shadow-[3px_3px_4.7px_rgba(0,0,0,0.08)]"
    >
      <span
        className="font-bricolage w-[30px] h-[30px] rounded-full flex items-center justify-center text-[15.675px]"
        style={{
          backgroundColor: numBgColor,
          color: numTextColor,
        }}
      >
        {numValue}
      </span>
      <div className="flex gap-1 items-center">
        {/* ICON COLORS ARE COMING FROM PARENT COMPONENT
        StatusFilterComponent.jsx */}
        <span>{icon}</span>
        <span className="font-[500] text-[14.63px]">
          {capitalizeFirstLetter(label)}
        </span>
      </div>
    </button>
  );
}
