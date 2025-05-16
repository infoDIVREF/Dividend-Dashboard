"use client";
import { useState } from "react";
import SideBar from "@/app/components/SideBar/SideBar";
import Dashboard from "@/app/components/Dasboard/Dashboard";
import { PageToShow } from "@/types/dashboard";

export default function Home() {
  /*   const [pageToShow, setPageToShow] = useState<PageToShow>("map");
   */ const [pageToShow, setPageToShow] = useState<PageToShow>("graphics");

  return (
    <div className="w-full h-[calc(100%-93px)] flex">
      <SideBar pageToShow={pageToShow} />
      <Dashboard pageToShow={pageToShow} setPageToShow={setPageToShow} />
    </div>
  );
}
