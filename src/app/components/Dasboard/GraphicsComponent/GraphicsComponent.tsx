"use client";

import GraphicsComponentHeader from "./GraphicsComponentHeader/GraphicsComponentHeader";
import { FundsComponent } from "../../Charts/FundsComponent/FundsComponent";
import { CountriesChart } from "../../Charts/CountriesChart/CountriesChart";
import { YearsChart } from "../../Charts/YearsChart/YearsChart";
import { MethodsChart } from "../../Charts/MethodsChart/MethodsChart";
import { TotalChart } from "../../Charts/TotalChart/TotalChart";
import { AverageRecoveryTimeComponent } from "@/app/components/Charts/AverageRecoveryTime/AverageRecoveryTimeComponent";
import { useGetDataByFund } from "@/hooks/useGetDataByFund";

import React from "react";
// import { AverageRecoveryTime } from "@/app/components/Charts/AverageRecoveryTime/AverageRecoveryTime";

type GraphicsComponentProps = {
  isSidebarOpen: boolean;
};

function GraphicsComponent({ isSidebarOpen }: GraphicsComponentProps) {
  const { fundsObjectLength } = useGetDataByFund();
  const isWideFundsChart = fundsObjectLength > 7;

  return (
    <div>
      <GraphicsComponentHeader isSidebarOpen={isSidebarOpen} />

      <div id="dashboard-capture" className="flex flex-col gap-4 mt-8">
        {/* 🔷 Fila 1: Por fondo (siempre) */}
        <div className="flex gap-4">
          <div
            className={`bg-white rounded-xl shadow-md p-4 border ${
              isWideFundsChart ? "w-full" : "flex-1"
            }`}
          >
            <h3 className="text-lg font-semibold mb-4">Por fondo</h3>
            <FundsComponent />
          </div>

          {!isWideFundsChart && (
            <div className="bg-white rounded-xl shadow-md p-4 flex-1 border">
              <h3 className="text-lg font-semibold mb-4">Por país</h3>
              <CountriesChart />
            </div>
          )}
        </div>

        {/* 🔷 Fila 2: País + Año (si fondo es ancho) | Año + Vía + Total (si fondo es normal) */}
        {isWideFundsChart ? (
          <div className="flex gap-4">
            <div className="bg-white rounded-xl shadow-md p-4 flex-1 border">
              <h3 className="text-lg font-semibold mb-4">Por país</h3>
              <CountriesChart />
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 flex-1 border">
              <h3 className="text-lg font-semibold mb-4">Por año</h3>
              <YearsChart />
            </div>
          </div>
        ) : (
          <div className="flex gap-4 mb-2">
            <div className="bg-white rounded-xl shadow-md p-4 flex-1 border">
              <h3 className="text-lg font-semibold mb-4">Por año</h3>
              <YearsChart />
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 flex-1 border">
              <h3 className="text-lg font-semibold mb-4">Por vía</h3>
              <MethodsChart />
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center flex-1 border">
              <TotalChart />
            </div>
          </div>
        )}

        {/* 🔷 Fila 3: Vía + Total (solo si fondo es ancho) */}
        {isWideFundsChart && (
          <div className="flex gap-4 mb-2">
            <div className="bg-white rounded-xl shadow-md p-4 flex-1 border">
              <h3 className="text-lg font-semibold mb-4">Por vía</h3>
              <MethodsChart />
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center flex-1 border">
              <TotalChart />
            </div>
          </div>
        )}

        {/* 🔷 Fila final: tiempos de recuperación */}
        <AverageRecoveryTimeComponent />
      </div>
    </div>
  );
}

export default React.memo(GraphicsComponent);
