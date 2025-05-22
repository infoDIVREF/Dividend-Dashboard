"use client";

import GraphicsComponentHeader from "./GraphicsComponentHeader/GraphicsComponentHeader";
import { FundsChart } from "../../Charts/FundsChart/FundsChart";
import { CountriesChart } from "../../Charts/CountriesChart/CountriesChart";
import { YearsChart } from "../../Charts/YearsChart/YearsChart";
import { MethodsChart } from "../../Charts/MethodsChart/MethodsChart";
import { TotalChart } from "../../Charts/TotalChart/TotalChart";
import { AverageRecoveryTime } from "@/app/components/Charts/AverageRecoveryTime/AverageRecoveryTime";

export default function GraphicsComponent() {
  return (
    <div id="dashboard-capture" >
      <GraphicsComponentHeader />

      <div className="flex flex-col gap-4 mt-8">
        <div className="flex gap-4">
          {/* Primera fila: cada una ocupa 6 columnas = 50% */}
          <div className="bg-white rounded-xl shadow-md p-4 col-span-1 flex-1 border">
            <h3 className="text-lg font-semibold mb-2">Por fondo</h3>
            {/* Grafica de funds */}
            <FundsChart />
          </div>


          <div className="bg-white rounded-xl shadow-md p-4 col-span-1 flex-1 border">
            <h3 className="text-lg font-semibold mb-2">Por país</h3>
            {/* Grafica de country */}
            <CountriesChart />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="bg-white rounded-xl shadow-md p-4 flex-1 border">
            <h3 className="text-lg font-semibold mb-2">Por año</h3>
            {/* Grafica de year */}
            <YearsChart />
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 flex-1 border">
            <h3 className="text-lg font-semibold mb-2">Por vía</h3>
            {/* Grafica de vía (DTTR, TJUE) */}
            <MethodsChart />
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center flex-1 border">
            {/*  Gráfica de total */}
            <TotalChart />
          </div>
        </div>
         {/* Gráfica de tiempos de devolución
        <div className="flex gap-5 mt-6">
          <h3 className="text-2xl">Tiempos de recuperación</h3>
          <div className="flex gap-5 text-lg">
            <div className="flex items-center gap-2">
              <div className="bg-[#3fb1f8] rounded-2xl w-10 h-5" />
              <span>Mínimos</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-[#244a76] rounded-2xl w-10 h-5" />
              <span>Medios</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-[#8ed3e4] rounded-2xl w-10 h-5" />
              <span>Máximos</span>
            </div>
          </div>

        </div>
        <div className="flex gap-4 mb-1">
          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center flex-1 border">
            <h3 className="text-lg font-semibold mb-2">Vía DDTR</h3>
            <AverageRecoveryTime />
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center flex-1 border">
            <h3 className="text-lg font-semibold mb-2">Vía TJUE</h3>
            <AverageRecoveryTime />
          </div>
        </div> */}
      </div>
    </div>
  );
}
