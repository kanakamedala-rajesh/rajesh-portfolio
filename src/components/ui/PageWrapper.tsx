"use client";

import { ReactNode } from "react";
import { useLoader } from "@/context/LoaderContext";

/**
 * PageWrapper
 * - Content sits behind the Loader (z-50) and is revealed when Loader curtains open.
 * - Uses isLoading from LoaderContext to manage visibility and prevent flash of content.
 */
export default function PageWrapper({ children }: { children: ReactNode }) {
  const { isLoading } = useLoader();

  return (
    <main
      className={`relative z-0 transition-opacity duration-400 ${
        isLoading ? "opacity-0" : "opacity-100"
      }`}
    >
      {children}
    </main>
  );
}
