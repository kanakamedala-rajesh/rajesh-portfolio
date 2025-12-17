"use client";

import { motion } from "framer-motion";
import { useLoader } from "@/context/LoaderContext";
import { ReactNode } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
  const { isLoading } = useLoader();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 0 : 1 }}
      transition={{ duration: 0.5, delay: 0.4 }} // Wait for curtains to open more
      className="relative z-0"
    >
      {children}
    </motion.main>
  );
}
