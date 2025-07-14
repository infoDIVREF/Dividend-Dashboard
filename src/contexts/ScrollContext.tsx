"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

// 1. Add the new visibility state to the context type
interface ScrollContextType {
  scrollPosition: number;
  setScrollPosition: (position: number) => void;
  isNavBarVisible: boolean; // <-- NEW
}

const ScrollContext = createContext<ScrollContextType | null>(null);

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // 2. Move the state and logic from NavBar into the provider
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavBarVisible, setIsNavBarVisible] = useState(true);

  useEffect(() => {
    // Hide if scrolling down past a threshold, show if scrolling up
    if (scrollPosition > lastScrollY && scrollPosition > 100) {
      setIsNavBarVisible(false);
    } else {
      setIsNavBarVisible(true);
    }
    setLastScrollY(scrollPosition);
  }, [scrollPosition]);

  // 3. Provide the new state in the context value
  const value = { scrollPosition, setScrollPosition, isNavBarVisible };

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
};

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
};
