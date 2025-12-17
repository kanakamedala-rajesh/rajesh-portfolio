"use client";

/**
 * @file SmoothScroll.tsx
 * @description Implements smooth scrolling using Lenis, synchronized with GSAP's ScrollTrigger.
 * This component is essential for the "scrolly-telling" experience, ensuring 60fps animations
 * and precise scroll-linked interactions.
 */

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * SmoothScroll Component
 *
 * Initializes the Lenis smooth scroll instance and binds it to GSAP's ticker.
 * This integration allows GSAP ScrollTrigger animations to work seamlessly with the
 * virtual scroll provided by Lenis.
 *
 * @returns {null} This component does not render any DOM elements.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Initialize Lenis with custom easing for a "cinematic" feel
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Synchronize Lenis scroll events with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Custom GSAP ticker to update Lenis
    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    // Add the custom ticker to GSAP
    gsap.ticker.add(ticker);

    // Disable GSAP lag smoothing to ensure strict synchronization
    gsap.ticker.lagSmoothing(0);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove(ticker);
    };
  }, []);

  return null;
}
