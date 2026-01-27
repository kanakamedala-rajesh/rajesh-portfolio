"use client";

/**
 * @file Loader.tsx
 * @description Implements the "System Boot" preloader sequence.
 * - Uses theme colors (Deep Void).
 * - Always visible on reload (Session storage check disabled for dev/demo).
 * - Waits for actual window load event before completing.
 * - Coordinates with Navbar via LoaderContext.
 * - Ensures text fades out BEFORE curtains open.
 */

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  const shouldReduceMotion = useReducedMotion();

  // Use ref to track if component is mounted to prevent state updates on unmount
  const isMounted = useRef(true);
  // Track if boot sequence has already started
  const sequenceStarted = useRef(false);
  // Track animation completion for first-time visitors
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    isMounted.current = true;

    // Enforce scroll to top on refresh/load
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

  // Determine if loader should be shown:
  // - Before hydration: don't show (prevents flash)
  // - After hydration: show only if isLoading is true AND animation not complete
  const shouldShow = hasHydrated && isLoading && !animationComplete;

  // Run boot sequence only for first-time visitors after hydration
  useEffect(() => {
    if (!hasHydrated || !isLoading || sequenceStarted.current) return;
    sequenceStarted.current = true;

    // First-time visitor - run the boot sequence
    let isPageLoaded = document.readyState === "complete";
    const handleLoad = () => {
      isPageLoaded = true;
    };

    if (!isPageLoaded) {
      window.addEventListener("load", handleLoad);
    }

    const runSequence = async () => {
      // Step 1
      if (!isMounted.current) return;
      setStep(0);
      await new Promise((r) => setTimeout(r, 600));

      // Step 2
      if (!isMounted.current) return;
      setStep(1);
      await new Promise((r) => setTimeout(r, 800));

      // Step 3
      if (!isMounted.current) return;
      setStep(2);

      // Wait for page load
      if (!isPageLoaded) {
        await new Promise<void>((resolve) => {
          const interval = setInterval(() => {
            if (isPageLoaded || document.readyState === "complete") {
              clearInterval(interval);
              resolve();
            }
          }, 100);
        });
      }

      if (!isMounted.current) return;

      // Buffer
      await new Promise((r) => setTimeout(r, 600));

      // Fade text
      setTextVisible(false);
      await new Promise((r) => setTimeout(r, 500));

      // Finish - mark as visited and update context
      try {
        sessionStorage.setItem("rk_portfolio_visited", "true");
      } catch {
        // sessionStorage not available
      }
      setIsLoading(false);
      setAnimationComplete(true);
    };

    runSequence();

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, [hasHydrated, isLoading, setIsLoading]);

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          id="initial-loader"
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center font-mono text-xl md:text-2xl"
          initial={{ opacity: 1 }}
          exit={{ transition: { duration: 1.5 } }} // Keep parent mounted for children exit
        >
          {/* Left Curtain */}
          <motion.div
            className="bg-background absolute inset-y-0 left-0 w-1/2"
            initial={{ x: "0%", opacity: 1 }}
            exit={{
              x: shouldReduceMotion ? "0%" : "-100%",
              opacity: shouldReduceMotion ? 0 : 1,
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            }}
          />
          {/* Right Curtain */}
          <motion.div
            className="bg-background absolute inset-y-0 right-0 w-1/2"
            initial={{ x: "0%", opacity: 1 }}
            exit={{
              x: shouldReduceMotion ? "0%" : "100%",
              opacity: shouldReduceMotion ? 0 : 1,
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            }}
          />

          {/* Text Container */}
          <motion.div
            className="relative z-10 flex flex-col items-start gap-2 p-8"
            animate={{ opacity: textVisible ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {BOOT_SEQUENCE.map(
              (line, index) =>
                index <= step && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${line.color}`}
                  >
                    <span className="mr-2 opacity-50">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                    {line.text}
                    {index === step && (
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                        className="ml-1 inline-block h-5 w-2 bg-current align-middle"
                      />
                    )}
                  </motion.div>
                )
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
