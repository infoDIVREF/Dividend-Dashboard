"use client";
import React from "react";

interface FilterSectionProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  customClassName?: string; // Nuevo prop para clases personalizadas
  wrapperCustomClassName?: string; // Nuevo prop para clases personalizadas del wrapper
}

export default function FilterSection({
  wrapperCustomClassName = "pb-[1rem]", //Valor por defecto vacío
  title,
  children,
  customClassName = "", // Valor por defecto vacío
}: FilterSectionProps) {
  if (!children || (Array.isArray(children) && children.length === 0))
    return null;

  return (
    <div className={`${wrapperCustomClassName}`}>
      <h3 className="text-[13px]  font-bricolage font-bold mb-2">{title}</h3>
      <div className={`${customClassName} max-h-[86px]`}>{children}</div>
    </div>
  );
}
