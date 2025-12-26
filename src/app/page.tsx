import Hero from "@/components/sections/Hero";
import ExperienceTunnel from "@/components/sections/ExperienceTunnel";
import AboutArchitecture from "@/components/sections/AboutArchitecture";
import SkillsNetwork from "@/components/sections/SkillsNetwork";
import { SectionProvider } from "@/context/SectionContext";

export default function Home() {
  return (
    <SectionProvider>
      <main className="bg-background min-h-screen w-full">
        <Hero />
        <AboutArchitecture />
        <ExperienceTunnel />
        <SkillsNetwork />

        {/* Placeholder for Contact Section */}
        <section
          id="contact"
          className="flex min-h-screen items-center justify-center border-t border-white/10"
        >
          <h2 className="text-4xl font-bold text-white/20">
            CONTACT TERMINAL...
          </h2>
        </section>
      </main>
    </SectionProvider>
  );
}
