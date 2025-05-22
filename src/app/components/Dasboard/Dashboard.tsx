"use client";
import GraphicsComponent from "./GraphicsComponent/GraphicsComponent";
import MapComponent from "./AirBnbMapComponent/AirBnbMapComponent";

type PageToShow = "map" | "graphics";

interface DashboardProps {
  pageToShow: PageToShow;
}

export default function Dashboard({
  pageToShow,
}: DashboardProps) {
  return (
    <div className="w-full h-full overflow-auto">
      {pageToShow === "map" && <MapComponent />}
      {pageToShow === "graphics" && <GraphicsComponent />}
    </div>
  );
}
