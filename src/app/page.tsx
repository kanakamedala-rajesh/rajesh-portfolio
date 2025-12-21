import Hero from "@/components/sections/Hero";
import ExperienceTunnel from "@/components/sections/ExperienceTunnel";

export default function Home() {
  return (
    <main className="bg-background min-h-screen w-full">
      <Hero />
      <ExperienceTunnel />

      {/* Placeholder for Skills Section */}
      <section
        id="skills"
        className="flex min-h-screen items-center justify-center border-t border-white/10"
      >
        <h2 className="text-4xl font-bold text-white/20">SKILLS LOADING...</h2>
      </section>

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
  );
}
