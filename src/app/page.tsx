import Hero from "@/components/sections/Hero";
import ExperienceTunnel from "@/components/sections/ExperienceTunnel";
import AboutArchitecture from "@/components/sections/AboutArchitecture";
import SkillsNetwork from "@/components/sections/SkillsNetwork";
import ContactTerminal from "@/components/sections/ContactTerminal";

export default function Home() {
  return (
    <main className="bg-background relative min-h-screen w-full">
      <Hero />
      <AboutArchitecture />
      <ExperienceTunnel />
      <SkillsNetwork />
      <ContactTerminal />
    </main>
  );
}
