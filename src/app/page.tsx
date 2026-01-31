import Hero from "@/components/sections/Hero";
import LazySections from "@/components/home/LazySections";

export default function Home() {
  return (
    <main className="bg-background relative min-h-screen w-full">
      <Hero />
      <LazySections />
    </main>
  );
}
