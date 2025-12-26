import Hero from "@/components/sections/Hero";
import ExperienceTunnel from "@/components/sections/ExperienceTunnel";
import AboutArchitecture from "@/components/sections/AboutArchitecture";
import SkillsNetwork from "@/components/sections/SkillsNetwork";
import ContactTerminal from "@/components/sections/ContactTerminal";
import { SectionProvider } from "@/context/SectionContext";

export default function Home() {
  return (
    <SectionProvider>
      <main className="relative min-h-screen w-full">
        {/* Main Content Wrapper - Lifts up to reveal footer on Desktop only */}
        <div className="bg-background relative z-10 mb-0 rounded-b-3xl shadow-2xl lg:mb-[100vh] lg:rounded-b-[3rem]">
          <Hero />
          <AboutArchitecture />
          <ExperienceTunnel />
          <SkillsNetwork />
        </div>

        {/* Footer Container - Static on Mobile, Fixed Reveal on Desktop */}
        <div className="relative bottom-0 left-0 z-0 flex h-auto w-full items-end lg:fixed lg:h-screen">
          <ContactTerminal />
        </div>
      </main>
    </SectionProvider>
  );
}
