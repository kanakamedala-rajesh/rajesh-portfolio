"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Define the context type
interface ScrollContextType {
  lenis: Lenis | null;
}

const ScrollContext = createContext<ScrollContextType>({
  lenis: null,
});

export const useScroll = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Skip Lenis in Headless/Automation environments to prevent scroll hijacking
    if (navigator.userAgent.includes("HeadlessChrome") || navigator.webdriver) {
      return;
    }

    // Initialize Lenis
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(lenisInstance);

    // Synchronize Lenis with GSAP ScrollTrigger
    lenisInstance.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(ticker);

    // Disable GSAP's native lag smoothing to prevent stutter with Lenis
    // REMOVED: gsap.ticker.lagSmoothing(0); // High battery usage risk. Re-enabling default smoothing.

    return () => {
      lenisInstance.destroy();
      gsap.ticker.remove(ticker);
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ lenis }}>
      {children}
    </ScrollContext.Provider>
  );
};
