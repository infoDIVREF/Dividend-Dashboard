import React, { useEffect, useRef } from "react";
import GraphicsComponent from "./GraphicsComponent/GraphicsComponent";
import MapComponent from "./AirBnbMapComponent/AirBnbMapComponent";
import { useScroll } from "@/contexts/ScrollContext";

type PageToShow = "map" | "graphics";

interface DashboardProps {
  pageToShow: PageToShow;
  isSidebarOpen: boolean;
  setPageToShow: (page: PageToShow) => void;
}

// Define how much space (in pixels) you want to leave at the bottom
const SCROLL_LIMIT_OFFSET = 200; // Prevents scrolling past the last 200px

function Dashboard({
  pageToShow,
  isSidebarOpen,
  setPageToShow,
}: DashboardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setScrollPosition } = useScroll();

  useEffect(() => {
    if (pageToShow === "map") {
      containerRef.current?.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pageToShow]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;

      // Calculate the maximum scroll position allowed
      const maxScroll = scrollHeight - clientHeight - SCROLL_LIMIT_OFFSET;

      // If the user scrolls beyond the limit, force it back
      if (scrollTop > maxScroll) {
        container.scrollTop = maxScroll;
      }

      // Update the context with the current (and possibly corrected) scroll position
      setScrollPosition(container.scrollTop);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [setScrollPosition]);

  return (
    <div
      ref={containerRef}
      className={`
        relative w-full h-full 
        ${pageToShow === "graphics" ? "overflow-auto" : "overflow-hidden"}
      `}
    >
      <div
        className={`
          absolute inset-0 transition-opacity duration-300 px-[54px] pt-[6rem]
          ${
            pageToShow === "graphics"
              ? "opacity-100"
              : "opacity-0 -z-10 pointer-events-none"
          }
        `}
      >
        <GraphicsComponent
          isSidebarOpen={isSidebarOpen}
          pageToShow={pageToShow}
          setPageToShow={setPageToShow}
        />
      </div>

      <div
        className={`
          absolute inset-0 transition-opacity duration-300
          ${
            pageToShow === "map"
              ? "opacity-100 overflow-hidden"
              : "opacity-0 -z-10 pointer-events-none"
          }
        `}
      >
        <MapComponent />
      </div>
    </div>
  );
}

export default React.memo(Dashboard);
