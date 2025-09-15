"use client";

import { FundsComponent } from "../../Charts/FundsComponent/FundsComponent";
import { CountriesChart } from "../../Charts/CountriesChart/CountriesChart";
import { YearsChart } from "../../Charts/YearsChart/YearsChart";
import { MethodsChart } from "../../Charts/MethodsChart/MethodsChart";
import { TotalChart } from "../../Charts/TotalChart/TotalChart";
import { AverageRecoveryTimeComponent } from "@/app/components/Charts/AverageRecoveryTime/AverageRecoveryTimeComponent";
import { useGetDataByFund } from "@/hooks/useGetDataByFund";
import React, { useEffect, useState } from "react";
import { useFilters } from "@/contexts/FiltersContext";
import ConfettiBoom from "react-confetti-boom";

type PageToShow = "map" | "graphics";

type GraphicsComponentProps = {
  isSidebarOpen: boolean;
  pageToShow: PageToShow;
  setPageToShow: (page: PageToShow) => void;
};

function GraphicsComponent({}: GraphicsComponentProps) {
  const { fundsObjectLength } = useGetDataByFund();
  const isWideFundsChart = fundsObjectLength > 7;
  const { claimStatus } = useFilters();

  const [calculatedHeight, setCalculatedHeight] = useState(null);
  const [isBooming, setIsBooming] = useState(false);

  useEffect(() => {
    const isRecoveredOnly =
      claimStatus.length === 1 && claimStatus[0] === "RECUPERADO";

    if (isRecoveredOnly) {
      setIsBooming(true);
    } else {
      setIsBooming(false);
    }
  }, [claimStatus]);

  return (
    <div className="pb-8">
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
          className="z-50"
        />
      )}

      <div id="dashboard-capture" className="flex flex-col gap-4 mt-[2.5rem]">
        {/* 🔷 Fila 1: Por fondo (siempre) */}
        <div className="flex gap-4">
          <div
            className={`bg-white rounded-xl shadow-md p-4 border ${
              isWideFundsChart ? "w-full" : "flex-1"
            }`}
          >
            <h3 className="leading-7 text-[1rem] font-semibold mb-4">
              Por fondo
            </h3>
            <div className="flex-1 h-full relative w-full">
              <FundsComponent isWideFundsChart={isWideFundsChart} />
            </div>
          </div>

          {!isWideFundsChart && (
            <div className="bg-white rounded-xl shadow-md p-4 flex-1 border">
              <h3 className="leading-7 text-[1rem] font-semibold mb-4">
                Por país
              </h3>
              <CountriesChart setCalculatedHeight={setCalculatedHeight} />
            </div>
          )}
        </div>

        {/* 🔷 Fila 2: País (si fondo es ancho) + Año (siempre) + Vía + Total */}
        <div className="flex gap-4 mb-2 min-h-[486px]">
          {isWideFundsChart && (
            <div className="bg-white rounded-xl shadow-md p-4 flex-1 border">
              <h3 className="leading-7 text-[1rem] font-semibold mb-4">
                Por país
              </h3>
              <CountriesChart setCalculatedHeight={setCalculatedHeight} />
            </div>
          )}

          <div className="bg-white rounded-xl shadow-md p-4 flex-1 border">
            <h3 className="leading-7 text-[1rem] font-semibold mb-4">
              Por año
            </h3>
            <div className="flex-1 h-full relative w-full">
              <YearsChart
                calculatedHeight={calculatedHeight}
                isWideFundsChart={isWideFundsChart}
              />
            </div>{" "}
          </div>

          {!isWideFundsChart && (
            <>
              <div className="bg-white rounded-xl shadow-md p-4 flex-1 border min-h-[486px]">
                <h3 className="leading-7 text-[1rem] font-semibold mb-4">
                  Por vía
                </h3>
                <MethodsChart />
              </div>

              <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center flex-1 border min-h-[486px]">
                <TotalChart />
              </div>
            </>
          )}
        </div>

        {/* 🔷 Fila 3: Vía + Total (solo si fondo es ancho) */}
        {isWideFundsChart && (
          <div className="flex gap-4 mb-2">
            <div className="bg-white rounded-xl shadow-md p-4 flex-1 border flex flex-col justify-around">
              <h3 className="leading-7 text-[1rem] font-semibold mb-4">
                Por vía
              </h3>
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
