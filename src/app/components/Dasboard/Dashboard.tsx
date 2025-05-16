"use client";
import GraphicsComponent from "./GraphicsComponent/GraphicsComponent";
import DashboardHeader from "./DashboardHeader/DashboardHeader";
import MapComponent from "./AirBnbMapComponent/AirBnbMapComponent";

type PageToShow = "map" | "graphics";

interface DashboardProps {
  pageToShow: PageToShow;
  setPageToShow: React.Dispatch<React.SetStateAction<PageToShow>>;
}

export default function Dashboard({
  pageToShow,
  setPageToShow,
}: DashboardProps) {
  return (
    <div className="flex flex-col gap-6 p-[53px] w-full h-full overflow-scroll bg-blanco">
      <DashboardHeader pageToShow={pageToShow} setPageToShow={setPageToShow} />
      {pageToShow === "map" && <MapComponent width={600} height={600} />}
      {pageToShow === "graphics" && <GraphicsComponent />}
    </div>
  );
}
