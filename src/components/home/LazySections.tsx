"use client";

import dynamic from "next/dynamic";

const AboutArchitecture = dynamic(
  () => import("@/components/sections/AboutArchitecture"),
  {
    loading: () => (
      <div className="bg-deep-void content-auto relative min-h-screen w-full" />
    ),
  }
);
const ExperienceTunnel = dynamic(
  () => import("@/components/sections/ExperienceTunnel"),
  {
    loading: () => (
      <div className="bg-deep-void content-auto relative min-h-screen w-full" />
    ),
  }
);
const SkillsNetwork = dynamic(
  () => import("@/components/sections/SkillsNetwork"),
  {
    loading: () => (
      <div className="bg-deep-void content-auto relative min-h-screen w-full" />
    ),
  }
);
const ContactTerminal = dynamic(
  () => import("@/components/sections/ContactTerminal"),
  {
    loading: () => (
      <div className="bg-deep-void content-auto relative min-h-screen w-full" />
    ),
  }
);

export default function LazySections() {
  return (
    <div className="relative w-full">
      <AboutArchitecture />
      <ExperienceTunnel />
      <SkillsNetwork />
      <ContactTerminal />
    </div>
  );
}
