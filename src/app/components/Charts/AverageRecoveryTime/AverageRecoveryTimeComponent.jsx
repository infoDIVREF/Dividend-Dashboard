import React from "react";
import { AverageRecoveryTimeCard } from "./AverageRecoveryTimeCard";
import { useGetAverageRecoveryTime } from "@/hooks/useGetAverageRecoveryTime";

export function AverageRecoveryTimeComponent() {
  const { data, loading, error } = useGetAverageRecoveryTime();
  const mockData = [
    {
      country: "DE",
      method: "TJUE",
      averageRecoveryTime: 15,
      minimumRecoveryTime: 10,
      maximumRecoveryTime: 20,
    },
    {
      country: "BE",
      method: "DTTR",
      averageRecoveryTime: 14,
      minimumRecoveryTime: 8,
      maximumRecoveryTime: 18,
    },
    {
      country: "CA",
      method: "TJUE",
      averageRecoveryTime: 13,
      minimumRecoveryTime: 9,
      maximumRecoveryTime: 17,
    },
    {
      country: "IE",
      method: "DTTR",
      averageRecoveryTime: 12,
      minimumRecoveryTime: 7,
      maximumRecoveryTime: 16,
    },
    {
      country: "IT",
      method: "TJUE",
      averageRecoveryTime: 16,
      minimumRecoveryTime: 11,
      maximumRecoveryTime: 21,
    },
    {
      country: "NO",
      method: "DTTR",
      averageRecoveryTime: 18,
      minimumRecoveryTime: 12,
      maximumRecoveryTime: 22,
    },
    {
      country: "PL",
      method: "TJUE",
      averageRecoveryTime: 10,
      minimumRecoveryTime: 6,
      maximumRecoveryTime: 15,
    },
    {
      country: "PT",
      method: "DTTR",
      averageRecoveryTime: 11,
      minimumRecoveryTime: 7,
      maximumRecoveryTime: 14,
    },
    {
      country: "SE",
      method: "TJUE",
      averageRecoveryTime: 12,
      minimumRecoveryTime: 8,
      maximumRecoveryTime: 17,
    },
    {
      country: "CH",
      method: "DTTR",
      averageRecoveryTime: 14,
      minimumRecoveryTime: 9,
      maximumRecoveryTime: 19,
    },
  ];
  return (
    <>
      <div className="flex gap-5 mt-6">
        <h3 className="text-[18px]">Tiempos de recuperación</h3>
        <div className="flex gap-5 text-[17px]">
          <div className="flex items-center gap-2">
            <div className="bg-[#3fb1f8] rounded-2xl w-10 h-6" />
            <span>Mínimos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#244a76] rounded-2xl w-10 h-6" />
            <span>Medios</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#8ed3e4] rounded-2xl w-10 h-6" />
            <span>Máximos</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-1">
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col flex-1 border">
          <h3 className="text-lg font-semibold mb-4 translate-y-2 translate-x-4">
            Vía DDTR
          </h3>
          <AverageRecoveryTimeCard
            method="DTTR"
            data={mockData.filter((item) => item.method === "DTTR")}
          />
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col flex-1 border">
          <h3 className="text-lg font-semibold mb-4 translate-y-2 translate-x-4">
            Vía TJUE
          </h3>
          <AverageRecoveryTimeCard
            method="TJUE"
            data={mockData.filter((item) => item.method === "TJUE")}
          />
        </div>
      </div>
    </>
  );
}
