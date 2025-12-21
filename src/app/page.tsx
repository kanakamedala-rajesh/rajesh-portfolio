import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main className="bg-background min-h-screen w-full">
      <Hero />
      {/* Placeholder for upcoming sections to enable scrolling */}
      <section className="bg-background border-void flex h-[200vh] w-full items-center justify-center border-t">
        <div className="p-8 text-center">
          <h2 className="mb-4 text-4xl font-bold">Future Content</h2>
          <p className="text-muted-foreground">
            Scroll down to see the pin release...
          </p>
        </div>
      </section>
    </main>
  );
}
