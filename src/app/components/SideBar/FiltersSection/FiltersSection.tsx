"use client";
import React from "react";

interface FilterSectionProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  customClassName?: string; // Nuevo prop para clases personalizadas
}

export default function FilterSection({
  title,
  children,
  customClassName = "", // Valor por defecto vacío
}: FilterSectionProps) {
  if (!children || (Array.isArray(children) && children.length === 0))
    return null;

  return (
    <div className={` pb-[1.25rem] `}>
      <h3 className="text-[15px] text-base font-bricolage font-bold mb-2">
        {title}
      </h3>
      <div className={`${customClassName}`}>{children}</div>
    </div>
  );
}
