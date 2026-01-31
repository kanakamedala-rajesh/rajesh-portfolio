"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useSectionTransition } from "@/hooks/useSectionTransition";
import { useSectionContext } from "@/context/SectionContext";
import { cn } from "@/lib/utils";
import {
  Cloud,
  Cpu,
  Layers,
  Server,
  Smartphone,
  Globe,
  Database,
  Code,
  Zap,
  LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- COMPONENTS ---

interface InfoCardProps {
  title: string;
  subtitle: string;
  items: { icon: LucideIcon; text: string }[];
  colorClass: string; // e.g., "text-secondary"
  glowClass: string; // e.g., "shadow-secondary/20"
  align?: "left" | "right"; // Desktop alignment preference
  className?: string;
}

const InfoCard = ({
  title,
  subtitle,
  items,
  colorClass,
  glowClass,
  align = "left",
  className,
}: InfoCardProps) => (
  <div
    className={cn(
      "glass-panel bg-deep-void/60 pointer-events-auto relative w-[90vw] max-w-sm overflow-hidden rounded-xl border border-white/10 p-6 backdrop-blur-xl transition-all duration-500 md:w-96",
      glowClass, // Add specific glow
      "shadow-2xl hover:border-white/20", // Hover effect
      className
    )}
  >
    {/* Decorative Gradient Blob */}
    <div
      className={cn(
        "absolute -top-10 -right-10 h-32 w-32 opacity-20 blur-3xl",
        colorClass.replace("text-", "bg-")
      )}
    />

    <h3
      className={cn(
        "font-space mb-1 text-3xl font-bold tracking-tighter",
        colorClass
      )}
    >
      {title}
    </h3>
    <p
      className={cn(
        "mb-6 font-mono text-xs tracking-widest uppercase opacity-80",
        colorClass
      )}
    >
      {subtitle}
    </p>

    <ul className="space-y-3">
      {items.map((Item, i) => (
        <li key={i} className="flex items-center gap-3 text-sm font-light">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg bg-white/5",
              colorClass
            )}
          >
            <Item.icon className="h-4 w-4" />
          </div>
          <span className="text-foreground/90">{Item.text}</span>
        </li>
      ))}
    </ul>

    {/* Alignment decoration (Desktop only) */}
    <div
      className={cn(
        "absolute top-1/2 hidden h-8 w-1 -translate-y-1/2 rounded-full opacity-50 md:block",
        colorClass.replace("text-", "bg-"),
        align === "left" ? "left-0" : "right-0"
      )}
    />
  </div>
);

export default function AboutArchitecture() {
  const container = useRef<HTMLDivElement>(null);
  const contentWrapper = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const { updateSectionStatus } = useSectionContext();

  useSectionTransition({
    sectionRef: container,
    contentRef: contentWrapper,
    id: "about-architecture",
    isPinned: true,
    enableExit: false,
  });

  // Layer Refs
  const hardwareLayer = useRef<HTMLDivElement>(null);
  const middlewareLayer = useRef<HTMLDivElement>(null);
  const cloudLayer = useRef<HTMLDivElement>(null);

  // Card Refs
  const hardwareCard = useRef<HTMLDivElement>(null);
  const middlewareCard = useRef<HTMLDivElement>(null);
  const cloudCard = useRef<HTMLDivElement>(null);

  // Data Pipes (SVG)
  const pipesRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (!container.current || !stackRef.current) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isMobile, reduce } = context.conditions as {
            isMobile: boolean;
            isDesktop: boolean;
            reduce: boolean;
          };

          // --- TIMELINE SETUP ---
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container.current,
              start: "top top",
              end: "+=350%", // Slightly longer for better pacing
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              fastScrollEnd: true,
              onToggle: (self) => {
                updateSectionStatus(
                  "about-architecture",
                  self.isActive ? "active" : "idle",
                  self.progress
                );
              },
            },
          });

          // Configs
          const spreadY = isMobile ? 90 : 160;
          const spreadZ = isMobile ? 30 : 60;

          // Card Movement Config
          // Mobile: Cards slide up from bottom (+20% y to 0%)
          // Desktop: Cards slide in from sides
          const cardEntryConfig = isMobile
            ? { y: 50, autoAlpha: 0 }
            : { x: -50, autoAlpha: 0 };

          // --- INITIAL STATES ---
          // Stack (Start hidden for fade-in effect)
          gsap.set(
            [
              hardwareLayer.current,
              middlewareLayer.current,
              cloudLayer.current,
            ],
            { z: 0, opacity: 0, scale: 0.85, filter: "blur(0px)" }
          );

          // Cards (Hidden)
          gsap.set(
            [hardwareCard.current, middlewareCard.current, cloudCard.current],
            { ...cardEntryConfig, scale: 0.95 }
          );

          gsap.set(pipesRef.current, { opacity: 0 });

          if (reduce) {
            // Simplified Fade Logic could go here
            // For now, let's just make the standard timeline gentle enough
          }

          // --- PHASE 0: FADE IN ---
          tl.to(
            [
              hardwareLayer.current,
              middlewareLayer.current,
              cloudLayer.current,
            ],
            {
              opacity: 1,
              duration: 0.5,
              ease: "power1.inOut",
            }
          );

          // --- PHASE 1: EXPANSION (0% - 20%) ---
          tl.to(
            [
              hardwareLayer.current,
              middlewareLayer.current,
              cloudLayer.current,
            ],
            {
              scale: 1,
              duration: 1.5,
              stagger: 0.05,
              ease: "power3.out",
            }
          )
            // Move Layers Apart
            .to(hardwareLayer.current, { z: 0, y: spreadY, duration: 2 }, "<")
            .to(middlewareLayer.current, { z: spreadZ, y: 0, duration: 2 }, "<")
            .to(
              cloudLayer.current,
              { z: spreadZ * 2, y: -spreadY, duration: 2 },
              "<"
            )
            // Show Pipes
            .to(pipesRef.current, { opacity: 1, duration: 1 }, "-=1");

          // --- PHASE 2: HARDWARE FOCUS (20% - 40%) ---
          // Highlight Layer
          tl.to(hardwareLayer.current, {
            scale: 1.05,
            borderColor: "var(--color-secondary)",
            boxShadow: "0 0 40px rgba(251,191,36,0.15)",
            backgroundColor: "rgba(251,191,36,0.05)",
            filter: "brightness(1.2)",
            duration: 0.8,
          })
            // Dim others
            .to(
              [middlewareLayer.current, cloudLayer.current],
              {
                opacity: 0.15,
                filter: "blur(4px) grayscale(0.5)",
                duration: 0.8,
              },
              "<"
            )
            // Show Card
            .to(
              hardwareCard.current,
              {
                autoAlpha: 1,
                x: 0, // Reset desktop offset
                y: 0, // Reset mobile offset
                scale: 1,
                duration: 1.2, // Slowed down
                ease: "power3.out", // Smoother ease
              },
              "<+=0.1"
            )
            .to({}, { duration: 1 }); // READ TIME

          // --- PHASE 3: MIDDLEWARE FOCUS (40% - 60%) ---
          // Hide HW
          tl.to(hardwareCard.current, {
            autoAlpha: 0,
            y: isMobile ? -20 : 0, // Slide up out on mobile
            scale: 0.95,
            duration: 0.5,
          })
            .to(hardwareLayer.current, {
              scale: 0.95,
              opacity: 0.15,
              filter: "blur(4px) grayscale(0.5)",
              boxShadow: "none",
              borderColor: "rgba(255,255,255,0.1)",
              backgroundColor: "transparent",
              duration: 0.8,
            })
            // Show MW Layer
            .to(
              middlewareLayer.current,
              {
                opacity: 1,
                scale: 1.05,
                borderColor: "var(--color-accent)",
                boxShadow: "0 0 40px rgba(34,197,94,0.15)",
                backgroundColor: "rgba(34,197,94,0.05)",
                filter: "brightness(1.2) blur(0px) grayscale(0)",
                duration: 0.8,
              },
              "<"
            )
            // Show MW Card (Enter from Right on Desktop)
            .fromTo(
              middlewareCard.current,
              {
                autoAlpha: 0,
                x: isMobile ? 0 : 50, // Right side
                y: isMobile ? 50 : 0,
                scale: 0.95,
              },
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: 1.2, // Slowed down
                ease: "power3.out", // Smoother ease
              },
              "<+=0.1"
            )
            .to({}, { duration: 1 }); // READ TIME

          // --- PHASE 4: CLOUD FOCUS (60% - 80%) ---
          // Hide MW
          tl.to(middlewareCard.current, {
            autoAlpha: 0,
            y: isMobile ? -20 : 0,
            scale: 0.95,
            duration: 0.5,
          })
            .to(middlewareLayer.current, {
              scale: 0.95,
              opacity: 0.15,
              filter: "blur(4px) grayscale(0.5)",
              boxShadow: "none",
              borderColor: "rgba(255,255,255,0.1)",
              backgroundColor: "transparent",
              duration: 0.8,
            })
            // Show Cloud Layer
            .to(
              cloudLayer.current,
              {
                opacity: 1,
                scale: 1.05,
                borderColor: "var(--color-primary)",
                boxShadow: "0 0 40px rgba(6,182,212,0.15)",
                backgroundColor: "rgba(6,182,212,0.05)",
                filter: "brightness(1.2) blur(0px) grayscale(0)",
                duration: 0.8,
              },
              "<"
            )
            // Show Cloud Card (Enter from Top-Left or Top-Center)
            .fromTo(
              cloudCard.current,
              {
                autoAlpha: 0,
                x: isMobile ? 0 : -50,
                y: isMobile ? 50 : -20, // Slightly from top on desktop
                scale: 0.95,
              },
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: 1.2, // Slowed down
                ease: "power3.out", // Smoother ease
              },
              "<+=0.1"
            )
            .to({}, { duration: 1 }); // READ TIME

          // --- PHASE 5: EXIT (80% - 100%) ---
          tl.to(cloudCard.current, {
            autoAlpha: 0,
            scale: 0.95,
            duration: 0.5,
          })
            .to(
              [
                hardwareLayer.current,
                middlewareLayer.current,
                cloudLayer.current,
              ],
              {
                y: 0,
                z: 0,
                scale: 0.5,
                opacity: 0,
                duration: 1.5,
                ease: "power2.in",
              }
            )
            .to(pipesRef.current, { opacity: 0, duration: 0.5 }, "<")
            .to(
              contentWrapper.current,
              {
                opacity: 0,
                scale: 1.1,
                filter: "blur(10px)",
                duration: 1.5,
              },
              "<"
            );
        }
      );
    },
    { scope: container, dependencies: [updateSectionStatus] }
  );

  return (
    <section
      ref={container}
      id="about"
      className="bg-deep-void content-auto relative z-20 flex min-h-screen w-full items-center justify-center overflow-hidden py-10 [perspective:2000px] md:py-20"
      style={{ contain: "layout style paint" }}
    >
      <div
        ref={contentWrapper}
        className="relative flex h-full w-full flex-col items-center justify-center will-change-[opacity,transform,filter] md:flex-row"
      >
        {/* Background Ambience */}
        <div className="cyber-grid absolute inset-0 opacity-20" />
        <div className="from-deep-void/0 via-primary/5 to-deep-void/0 bg-radial-gradient absolute inset-0 opacity-30" />

        {/* --- TEXT CONTENT (GLASS HUD) --- */}
        <div className="pointer-events-none absolute inset-0 z-50">
          {/* Hardware Card (Bottom Left Desktop / Bottom Mobile) */}
          <div
            ref={hardwareCard}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 md:bottom-20 md:left-20 md:translate-x-0"
          >
            <InfoCard
              title="HARDWARE"
              subtitle="Embedded Linux & BSP"
              colorClass="text-secondary"
              glowClass="shadow-secondary/10"
              align="left"
              items={[
                { icon: Cpu, text: "Kernel & Device Drivers" },
                { icon: Server, text: "CAN Protocol & Networking" },
                { icon: Zap, text: "Real-time System Control" },
              ]}
            />
          </div>

          {/* Middleware Card (Center Right Desktop / Bottom Mobile) */}
          <div
            ref={middlewareCard}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 md:top-1/2 md:right-20 md:bottom-auto md:left-auto md:translate-x-0 md:-translate-y-1/2"
          >
            <InfoCard
              title="MIDDLEWARE"
              subtitle="Android Native & HAL"
              colorClass="text-accent"
              glowClass="shadow-accent/10"
              align="right"
              items={[
                { icon: Smartphone, text: "Android System Architecture" },
                { icon: Code, text: "JNI & C++ Bridges" },
                { icon: Layers, text: "Service Daemons (ZMQ)" },
              ]}
            />
          </div>

          {/* Cloud Card (Top Left Desktop / Bottom Mobile) */}
          <div
            ref={cloudCard}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 md:top-32 md:bottom-auto md:left-32 md:translate-x-0"
          >
            <InfoCard
              title="APPLICATION"
              subtitle="Cloud & Front-End"
              colorClass="text-primary"
              glowClass="shadow-primary/10"
              align="left"
              items={[
                { icon: Cloud, text: "Next.js & React Ecosystem" },
                { icon: Database, text: "Scalable Backend APIs" },
                { icon: Globe, text: "Immersive Web Experiences" },
              ]}
            />
          </div>
        </div>

        {/* --- THE ISOMETRIC STACK (Center) --- */}
        <div
          ref={stackRef}
          className="relative flex h-[300px] w-[300px] transform-[rotateX(60deg)_rotateZ(-45deg)] items-center justify-center transform-3d md:h-[450px] md:w-[450px]"
        >
          {/* 
          Data Pipes (SVG) 
          Drawn in the 3D space, connecting the layers.
          The SVG plane needs to align with the stack.
        */}
          <svg
            ref={pipesRef}
            className="pointer-events-none absolute inset-0 z-0 h-full w-full transform-[translateZ(-50px)] overflow-visible"
            viewBox="0 0 400 600"
          >
            <defs>
              <linearGradient id="pipe-gradient" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="var(--color-secondary)" />
                <stop offset="50%" stopColor="var(--color-accent)" />
                <stop offset="100%" stopColor="var(--color-primary)" />
              </linearGradient>
              <mask id="fade-mask">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <rect x="0" y="0" width="100%" height="20%" fill="black" />
                <rect x="0" y="80%" width="100%" height="20%" fill="black" />
              </mask>
            </defs>

            {/* Vertical Data Lines - Responsive Stroke Width */}
            <path
              d="M 100 600 L 100 0"
              stroke="url(#pipe-gradient)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="10 10"
              className="animate-[dash_10s_linear_infinite]"
              mask="url(#fade-mask)"
            />
            <path
              d="M 300 600 L 300 0"
              stroke="url(#pipe-gradient)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="15 15"
              className="animate-[dash_15s_linear_infinite]"
              mask="url(#fade-mask)"
            />
            <path
              d="M 200 600 L 200 0"
              stroke="url(#pipe-gradient)"
              strokeWidth="4"
              fill="none"
              strokeDasharray="20 5"
              className="animate-[dash_5s_linear_infinite]"
              opacity="0.5"
              mask="url(#fade-mask)"
            />

            {/* Data Particles */}
            <circle
              r="4"
              fill="var(--color-primary)"
              className="blur-[2px] filter"
            >
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                path="M 100 600 L 100 0"
              />
            </circle>
            <circle
              r="3"
              fill="var(--color-secondary)"
              className="blur-[2px] filter"
            >
              <animateMotion
                dur="6s"
                repeatCount="indefinite"
                path="M 300 600 L 300 0"
                begin="1.5s"
              />
            </circle>
            <circle
              r="5"
              fill="var(--color-accent)"
              opacity="0.6"
              className="blur-[3px] filter"
            >
              <animateMotion
                dur="8s"
                repeatCount="indefinite"
                path="M 200 600 L 200 0"
                begin="3s"
              />
            </circle>
          </svg>

          {/* --- LAYER 3: CLOUD (Top) --- */}
          <div
            ref={cloudLayer}
            className="bg-primary/5 border-primary/30 absolute z-30 flex h-full w-full items-center justify-center rounded-2xl border backdrop-blur-sm transition-all will-change-[transform,opacity,filter]"
          >
            <div className="animate-background-shine absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.05)_50%,transparent_75%,transparent_100%)] bg-size-[250%_250%,100%_100%]" />

            {/* Cloud Network Mesh Decoration */}
            <div className="absolute inset-0">
              <div className="border-primary/20 absolute top-0 right-0 h-16 w-16 rounded-tr-xl border-t-2 border-r-2" />
              <div className="border-primary/20 absolute bottom-0 left-0 h-16 w-16 rounded-bl-xl border-b-2 border-l-2" />

              {/* Floating Data Nodes */}
              <div className="bg-primary/40 absolute top-1/4 left-1/4 h-2 w-2 animate-pulse rounded-full" />
              <div className="bg-primary/40 absolute right-1/4 bottom-1/4 h-2 w-2 animate-pulse rounded-full delay-700" />
              <div className="bg-primary/30 absolute top-1/3 right-1/3 h-1.5 w-1.5 animate-pulse rounded-full delay-300" />
            </div>

            {/* Top Surface Decoration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Cloud className="text-primary/20 h-24 w-24 -rotate-45 md:h-32 md:w-32" />
            </div>
            <div className="border-primary/20 absolute inset-4 rounded-xl border border-dashed" />
          </div>

          {/* --- LAYER 2: MIDDLEWARE (Middle) --- */}
          <div
            ref={middlewareLayer}
            className="bg-accent/5 border-accent/30 absolute z-20 flex h-full w-full items-center justify-center rounded-2xl border backdrop-blur-sm transition-all will-change-[transform,opacity,filter]"
          >
            {/* Matrix / Code Rain Effect Texture */}
            <div
              className="absolute inset-0 overflow-hidden opacity-20"
              style={{
                backgroundImage:
                  "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGR5PSIuMzVlbSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzIyYzU1ZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMCI+MTA8L3RleHQ+PC9zdmc+')",
              }}
            />

            {/* Middleware Ports/Connectors */}
            <div className="absolute top-1/2 -left-1 flex h-32 -translate-y-1/2 flex-col justify-around">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-accent/30 h-4 w-2 rounded-r" />
              ))}
            </div>
            <div className="absolute top-1/2 -right-1 flex h-32 -translate-y-1/2 flex-col justify-around">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-accent/30 h-4 w-2 rounded-l" />
              ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <Layers className="text-accent/20 h-24 w-24 -rotate-45 md:h-32 md:w-32" />
            </div>
            <div className="border-accent/20 absolute inset-4 rounded-xl border border-dotted" />
          </div>

          {/* --- LAYER 1: HARDWARE (Bottom) --- */}
          <div
            ref={hardwareLayer}
            className="bg-secondary/5 border-secondary/30 absolute z-10 flex h-full w-full items-center justify-center rounded-2xl border backdrop-blur-sm transition-all will-change-[transform,opacity,filter]"
          >
            {/* PCB Pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(var(--color-secondary) 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />
            {/* Edge Pins / Traces */}
            <div className="absolute inset-x-0 top-0 flex h-1 justify-around px-8">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-secondary/40 h-full w-1 rounded-full"
                />
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-0 flex h-1 justify-around px-8">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-secondary/40 h-full w-1 rounded-full"
                />
              ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <Cpu className="text-secondary/20 h-24 w-24 -rotate-45 md:h-32 md:w-32" />
            </div>
            <div className="border-secondary/20 absolute inset-4 rounded-xl border" />
          </div>
        </div>
      </div>
    </section>
  );
}
