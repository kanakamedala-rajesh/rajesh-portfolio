"use client";

import { ReactNode } from "react";

// Content sits behind the Loader (z-50) and is revealed when Loader curtains open.
// Removed Framer Motion wrapper to prevent artificial LCP delay.
export default function PageWrapper({ children }: { children: ReactNode }) {
  return <main className="relative z-0">{children}</main>;
}
