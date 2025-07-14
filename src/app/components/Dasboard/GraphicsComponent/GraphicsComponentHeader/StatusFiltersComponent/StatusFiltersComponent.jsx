import { useState, useEffect } from "react";
import { useFilters } from "@/contexts/FiltersContext";
import ConfettiBoom from "react-confetti-boom";
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

export default function ClaimStatusStepper({ isSidebarOpen }) {
  const { claimStatus, updateClaimStatus } = useFilters();

  // --- START OF THE FIX ---

  // 1. State to control the confetti explosion.
  const [isBooming, setIsBooming] = useState(false);

  // 2. useEffect to watch for changes in the claimStatus filter.
  useEffect(() => {
    // Check if the filter array contains exactly one item, and that item is "RECUPERADO".
    const isRecoveredOnly =
      claimStatus.length === 1 && claimStatus[0] === "RECUPERADO";

    if (isRecoveredOnly) {
      // If the condition is met, trigger the boom!
      setIsBooming(true);
    } else {
      // If the condition is not met (or changes), ensure the boom is turned off.
      setIsBooming(false);
    }
    // We want this effect to run every time claimStatus changes.
  }, [claimStatus]);

  // --- END OF THE FIX ---

  const isSelected = (status) => claimStatus.includes(status);

  return (
    <div
      className={`flex items-center transition-all duration-300 w-full mt-4 ${
        isSidebarOpen ? "pl-0 justify-start" : "pl-[8%] justify-start"
      }`}
    >
      {/* --- START OF THE FIX --- */}
      {/* 3. Place the ConfettiBoom component in your layout. It's invisible until triggered. */}
      {/* It will automatically clean itself up after the animation. */}
      {isBooming && (
        <ConfettiBoom
          mode="boom"
          particleCount={197}
          shapeSize={15}
          deg={270}
          effectCount={1}
          effectInterval={4713}
          spreadDeg={700}
          x={0.5}
          y={0.5}
          launchSpeed={1}
          opacityDeltaMultiplier={2}
          colors={["#576aff", "#4a6aff", "#83b6ff", "#ffffff"]}
        />
      )}
      {/* --- END OF THE FIX --- */}

      {/* Línea inicial que se extiende al principio */}
      <div className="relative flex items-center h-[2px] w-[21%]">
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
          <StatusButton
            label={step.label}
            icon={step.icon(isSelected(step.label))}
            selected={isSelected(step.label)}
            onClick={() => updateClaimStatus(step.label)}
          />
          {index < statuses.length - 1 && (
            <div
              className="relative flex items-center"
              style={{ width: "50px", height: "2px" }}
            >
              <div
                className="w-full h-[2px]"
                style={{
                  backgroundColor: isSelected(statuses[index + 1].label)
                    ? statuses[index + 1].color
                    : statuses[index + 1].color,
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
