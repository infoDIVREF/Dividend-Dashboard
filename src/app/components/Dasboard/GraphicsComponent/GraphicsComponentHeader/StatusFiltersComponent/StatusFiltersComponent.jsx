import { useState, useEffect } from "react";
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
        unselectedColor={"#AFAFAF"}
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
        unselectedColor={"#AFAFAF"}
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
        unselectedColor={"#AFAFAF"}
      />
    ),
    color: "#244A76",
  },
];

export default function ClaimStatusStepper({ isSidebarOpen, pageToShow }) {
  const { claimStatus, updateClaimStatus } = useFilters();

  const isSelected = (status) => claimStatus.includes(status);

  return (
    <div
      className={`flex items-center transition-all gap-[14px] duration-300 w-full pointer-events-auto ${
        isSidebarOpen ? "pl-0 justify-start" : " justify-start"
      } ${pageToShow === "map" ? "hidden" : ""}`}
    >
      {statuses.map((step, index) => (
        <div key={step.label} className="flex items-center">
          <StatusButton
            key={index + 1}
            numValue={index + 1}
            label={step.label}
            icon={step.icon(isSelected(step.label))}
            selected={isSelected(step.label)}
            onClick={() => updateClaimStatus(step.label)}
          />
        </div>
      ))}
    </div>
  );
}
