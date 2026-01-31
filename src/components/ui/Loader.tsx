"use client";

/**
 * @file Loader.tsx
 * @description Implements the "System Boot" preloader sequence.
 * - Uses theme colors (Deep Void).
 * - Always visible on reload (Session storage check disabled for dev/demo).
 * - Waits for actual window load event before completing.
 * - Coordinates with Navbar via LoaderContext.
 * - Ensures text fades out BEFORE curtains open.
 * - CSS-only transitions for reduced bundle size.
 */

import { useEffect, useState, useRef } from "react";
import { useLoader } from "@/context/LoaderContext";
import { useScroll } from "@/context/ScrollContext";

const BOOT_SEQUENCE = [
  { text: "> INITIALIZING KERNEL...", color: "text-accent" },
  { text: "> LOADING ANDROID RUNTIME...", color: "text-secondary" },
  { text: "> HYDRATING REACT ROOT...", color: "text-primary" },
];

export default function Loader() {
  const { isLoading, setIsLoading, hasHydrated } = useLoader();
  const { lenis } = useScroll();
  const [step, setStep] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const isMounted = useRef(true);
  const sequenceStarted = useRef(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    isMounted.current = true;
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    return () => {
      isMounted.current = false;
    };
  }, [lenis]);

  const shouldShow = hasHydrated && !animationComplete;

  useEffect(() => {
    if (!hasHydrated || !isLoading || sequenceStarted.current) return;
    sequenceStarted.current = true;

    const runSequence = async () => {
      if (!isMounted.current) return;
      setStep(0);
      await new Promise((r) => setTimeout(r, 200));

      if (!isMounted.current) return;
      setStep(1);
      await new Promise((r) => setTimeout(r, 300));

      if (!isMounted.current) return;
      setStep(2);
      await new Promise((r) => setTimeout(r, 200));

      if (!isMounted.current) return;
      setTextVisible(false);
      await new Promise((r) => setTimeout(r, 200));

      try {
        sessionStorage.setItem("rk_portfolio_visited", "true");
      } catch {
        /* ignore */
      }

      setIsLoading(false);

      // Allow CSS transition to finish before unmounting
      await new Promise((r) => setTimeout(r, 800));
      if (isMounted.current) {
        setAnimationComplete(true);
      }
    };

    runSequence();
  }, [hasHydrated, isLoading, setIsLoading]);

  if (!shouldShow) return null;

  return (
    <div
      id="initial-loader"
      className={`pointer-events-none fixed inset-0 z-50 flex items-center justify-center font-mono text-xl transition-opacity duration-500 md:text-2xl ${
        !isLoading ? "opacity-0 delay-500" : "opacity-100"
      }`}
    >
      {/* Left Curtain */}
      <div
        className={`bg-background absolute inset-y-0 left-0 w-1/2 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          !isLoading ? "-translate-x-full" : "translate-x-0"
        }`}
      />
      {/* Right Curtain */}
      <div
        className={`bg-background absolute inset-y-0 right-0 w-1/2 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          !isLoading ? "translate-x-full" : "translate-x-0"
        }`}
      />

      {/* Text Container */}
      <div
        className={`relative z-10 flex flex-col items-start gap-2 p-8 transition-opacity duration-500 ${
          textVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {BOOT_SEQUENCE.map((line, index) => (
          <div
            key={index}
            className={`${line.color} transition-all duration-300 ${
              index <= step
                ? "translate-y-0 opacity-100"
                : "translate-y-2 opacity-0"
            }`}
          >
            <span className="mr-2 opacity-50">
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </span>
            {line.text}
            {index === step && (
              <span className="ml-1 inline-block h-5 w-2 animate-pulse bg-current align-middle" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
