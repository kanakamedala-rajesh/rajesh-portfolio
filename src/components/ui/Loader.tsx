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
import { motion, AnimatePresence } from "framer-motion";
import { useLoader } from "@/context/LoaderContext";

const BOOT_SEQUENCE = [
  { text: "> INITIALIZING KERNEL...", color: "text-accent" },
  { text: "> LOADING ANDROID RUNTIME...", color: "text-secondary" },
  { text: "> HYDRATING REACT ROOT...", color: "text-primary" },
];

export default function Loader() {
  const { setIsLoading } = useLoader();
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const [textVisible, setTextVisible] = useState(true);

  // Use ref to track if component is mounted to prevent state updates on unmount
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    // If visited, skip animation
    const visited = sessionStorage.getItem("rk_portfolio_visited");
    if (visited) {
      // Use setTimeout to avoid synchronous setState warning
      const timer = setTimeout(() => {
        setIsLoading(false);
        setVisible(false);
      }, 0);
      return () => clearTimeout(timer);
    }

    // If not visited, setup load listener
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

      // Finish
      sessionStorage.setItem("rk_portfolio_visited", "true");
      setIsLoading(false);
      setVisible(false);
    };

    runSequence();

    return () => {
      isMounted.current = false;
      window.removeEventListener("load", handleLoad);
    };
  }, [setIsLoading]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="initial-loader"
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center font-mono text-xl md:text-2xl"
          initial={{ opacity: 1 }}
          exit={{ transition: { duration: 1.5 } }} // Keep parent mounted for children exit
        >
          {/* Left Curtain */}
          <motion.div
            className="bg-background absolute inset-y-0 left-0 w-1/2"
            initial={{ x: "0%" }}
            exit={{
              x: "-100%",
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            }}
          />
          {/* Right Curtain */}
          <motion.div
            className="bg-background absolute inset-y-0 right-0 w-1/2"
            initial={{ x: "0%" }}
            exit={{
              x: "100%",
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
