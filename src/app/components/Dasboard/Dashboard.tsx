import React from "react";
import GraphicsComponent from "./GraphicsComponent/GraphicsComponent";
import MapComponent from "./AirBnbMapComponent/AirBnbMapComponent";

type PageToShow = "map" | "graphics";

interface DashboardProps {
  pageToShow: PageToShow;
}

function Dashboard({ pageToShow }: DashboardProps) {

  return (
    <div  
      className={`
        relative w-full h-full 
        ${pageToShow === "graphics" ? "overflow-auto" : "overflow-hidden"}
      `}
    >
      <div
        className={`
          absolute inset-0 transition-opacity duration-300
          ${pageToShow === "graphics" ? "opacity-100 z-10" : "opacity-0 -z-10 pointer-events-none"}
        `}
      >
        <GraphicsComponent />
      </div>

      <div
        className={`
          absolute inset-0 transition-opacity duration-300
          ${pageToShow === "map" ? "opacity-100 z-10 overflow-hidden" : "opacity-0 -z-10 pointer-events-none"}
        `}
      >
        <MapComponent />
      </div>
    </div>  

  );
}

export default React.memo(Dashboard);
