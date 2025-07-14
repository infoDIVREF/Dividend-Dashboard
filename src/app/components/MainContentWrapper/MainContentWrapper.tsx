"use client";
import React from "react";
import { useScroll } from "@/contexts/ScrollContext";

// Define a constant for the Navbar height for consistency.
const NAVBAR_HEIGHT = 80; // This is the pixel equivalent of h-20 / pt-20

export function MainContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isNavBarVisible } = useScroll();

  return (
    // 1. The outer container now has FIXED padding. It doesn't animate.
    // This permanently reserves the space for the NavBar, preventing content jumps.
    <div
      className="h-full overflow-hidden"
      style={{
        paddingTop: `${NAVBAR_HEIGHT}px`,
      }}
    >
      {/* 2. The new inner wrapper is the element that we will animate. */}
      <div
        style={{
          // 3. Apply the transform based on the NavBar's visibility.
          transform: isNavBarVisible
            ? "translateY(0)" // Default position
            : `translateY(-${NAVBAR_HEIGHT}px)`, // Slide UP by the height of the navbar

          // 4. Use a transition on the high-performance `transform` property.
          transition: "transform 0.3s ease-in-out",
          height: isNavBarVisible ? "100%" : "calc(100% + 80px)", // Increase height by 80px when the navbar is hidden
        }}
      >
        {children}
      </div>
    </div>
  );
}
