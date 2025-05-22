"use client";
import { useState } from "react";
import SideBar from "@/app/components/SideBar/SideBar";
import Dashboard from "@/app/components/Dasboard/Dashboard";
import { PageToShow } from "@/types/dashboard";
import DashboardHeader from "@/app/components/Dasboard/DashboardHeader/DashboardHeader";

export default function Home() {
  /*   const [pageToShow, setPageToShow] = useState<PageToShow>("map");
   */ const [pageToShow, setPageToShow] = useState<PageToShow>("graphics");

  return (
    <div className="w-full h-full flex overflow-hidden">
      <div
        className={`
          h-full
          ${pageToShow !== "map" ? "py-5 pl-5 " : ""}
          ${pageToShow === "map" ? "w-0" : "w-[30vw]"}
          min-w-0
          overflow-hidden
        `}
      >
        <SideBar pageToShow={pageToShow} />
      </div>
      <div className="flex flex-col w-full px-5 pb-5">
      <DashboardHeader pageToShow={pageToShow} setPageToShow={setPageToShow} />
      <Dashboard pageToShow={pageToShow} />
      </div>
    </div>
  );
}
