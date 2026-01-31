"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MobileExperienceStack = dynamic(() => import("./MobileExperienceStack"), {
  ssr: false,
});
const DesktopExperience = dynamic(() => import("./DesktopExperience"), {
  ssr: false,
});

export default function ExperienceTunnel() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Return null or a lightweight placeholder until we know the device type
  // This prevents hydration mismatch and loading unnecessary bundles
  if (isMobile === null) {
    return <div className="bg-deep-void content-auto min-h-screen w-full" />;
  }

  if (isMobile) {
    return <MobileExperienceStack />;
  }

  return <DesktopExperience />;
}

/*
DESIGN MANIFESTO
1. Aesthetic Direction: "Cyber-Physical Editorial" — A blend of high-fidelity glassmorphism with raw data physics. The interface treats cards as physical objects in a viscous digital medium.
2. Key Interaction: "The Liquid Lens" — Notice how the timeline breathes. As cards traverse the viewport center, they swell and brighten (Scale 1.1x, Opacity 100%), simulating a focal depth field, while peripheral items recede into the void. Hovering triggers a hydraulic expansion, pushing peers aside to reveal dense technical data.
*/

/*
EXPECTED CSS VARIABLES (defined in globals.css):
--color-background
--color-foreground
--color-primary
--color-secondary
--color-accent
--color-deep-void
--font-heading (Space Grotesk)
--font-sans (Inter)
--font-mono (JetBrains Mono)
*/
