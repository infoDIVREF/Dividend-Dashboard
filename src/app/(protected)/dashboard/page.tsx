"use client";
import { useState } from "react";
import SideBar from "@/app/components/SideBar/SideBar";
import Dashboard from "@/app/components/Dasboard/Dashboard";
import { PageToShow } from "@/types/dashboard";
import DashboardHeader from "@/app/components/Dasboard/DashboardHeader/DashboardHeader";

export default function Home() {
  const [pageToShow, setPageToShow] = useState<PageToShow>("graphics");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="w-full h-full flex overflow-hidden">
      {/* Wrapper que ocupa espacio siempre */}
      <div
        className={`
          h-full
          transition-all duration-300 ease-in-out
          overflow-hidden
          ${!isSidebarOpen ? "w-0 -translate-x-full" : "w-[20vw] translate-x-0"}
        `}
      >
        <SideBar
          pageToShow={pageToShow}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />
      </div>
      <DashboardHeader
        pageToShow={pageToShow}
        setPageToShow={setPageToShow}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />

      <div
        className={`
          flex flex-col transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "w-[80vw]" : "w-full"} 
        `}
        /* ${!isSidebarOpen || pageToShow === "map" ? "w-full" : "w-[80vw]"} */
      >
        <Dashboard
          pageToShow={pageToShow}
          setPageToShow={setPageToShow}
          isSidebarOpen={isSidebarOpen}
        />
      </div>
    </div>
  );
}
