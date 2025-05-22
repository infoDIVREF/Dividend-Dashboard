import { useFilters } from "@/contexts/FiltersContext";
import {
  InProgressIcon,
  SentIcon,
  RecoveredIcon,
} from "@/components/icons/ClaimStatusIcons";
import StatusButton from "./StatusButton";

const statuses = [
  {
    label: "EN TRÁMITE",
    icon: (isSelected) => (
      <InProgressIcon
        selected={isSelected}
        selectedColor={"#FAFBFE"}
        unselectedColor={"#6B7280"}
      />
    ),
    color: "#C9C9C9",
  },
  {
    label: "ENVIADO",
    icon: (isSelected) => (
      <SentIcon
        selected={isSelected}
        selectedColor={"#FAFBFE"}
        unselectedColor={"#6B7280"}
      />
    ),
    color: "#4F84A6",
  },
  {
    label: "RECUPERADO",
    icon: (isSelected) => (
      <RecoveredIcon
        selected={isSelected}
        selectedColor={"#FAFBFE"}
        unselectedColor={"#6B7280"}
      />
    ),
    color: "#244A76",
  },
];

export default function ClaimStatusStepper() {
  const { selectedFilters, updateSelectedFilter } = useFilters();

  const isSelected = (status) => selectedFilters.claimStatus.includes(status);

  return (
    <div className="flex items-center justify-start w-full mt-4">
      {/* Línea inicial que se extiende al principio */}
      <div className="relative flex items-center h-[2px] w-[25%]">
        <div
          className="w-full h-[2px]"
          style={{
            backgroundImage: `linear-gradient(to left, ${statuses[0].color} 70%, transparent 100%)`,
          }}
        ></div>
      </div>

      {/* Contenedor de los botones centrados */}
      {statuses.map((step, index) => (
        <div key={step.label} className="flex items-center">
          {/* mx-2 para margen entre botones */}
          <StatusButton
            label={step.label}
            icon={step.icon(isSelected(step.label))}
            selected={isSelected(step.label)}
            onClick={() => updateSelectedFilter("claimStatus", step.label)}
          />
          {/* Líneas entre los botones */}
          {index < statuses.length - 1 && (
            <div
              className="relative flex items-center"
              style={{ width: "50px", height: "2px" }}
            >
              <div
                className="w-full h-[2px]"
                style={{
                  backgroundColor: isSelected(statuses[index + 1].label)
                    ? statuses[index + 1].color // Color de la línea si está seleccionado
                    : statuses[index + 1].color, // Color constante
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
