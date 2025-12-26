"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useSectionTransition } from "@/hooks/useSectionTransition";
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
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutArchitecture() {
  const container = useRef<HTMLDivElement>(null);
  const contentWrapper = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useSectionTransition({
    sectionRef: container,
    contentRef: contentWrapper,
    id: "about-architecture",
    isPinned: true,
    enableExit: false, // Handle exit internally
  });

  // Layer Refs
  const hardwareLayer = useRef<HTMLDivElement>(null);
  const middlewareLayer = useRef<HTMLDivElement>(null);
  const cloudLayer = useRef<HTMLDivElement>(null);

  // Text Refs
  const hardwareText = useRef<HTMLDivElement>(null);
  const middlewareText = useRef<HTMLDivElement>(null);
  const cloudText = useRef<HTMLDivElement>(null);

  // Data Pipes (SVG)
  const pipesRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (!container.current || !stackRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=300%", // 3x height for scroll duration
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // --- INITIAL STATE SETUP ---
      // Layers start compressed together
      gsap.set(
        [hardwareLayer.current, middlewareLayer.current, cloudLayer.current],
        {
          z: 0,
          opacity: 0,
          scale: 0.8,
          filter: "blur(10px)",
        }
      );

      // Hide Text initially
      gsap.set(
        [hardwareText.current, middlewareText.current, cloudText.current],
        {
          opacity: 0,
          x: -50,
          pointerEvents: "none",
        }
      );

      // Hide Pipes initially
      gsap.set(pipesRef.current, { opacity: 0 });

      // --- ANIMATION SEQUENCE ---

      // 1. EXPLOSION PHASE (0% - 20%)
      // Expand the stack vertically and fade in
      tl.to(
        [hardwareLayer.current, middlewareLayer.current, cloudLayer.current],
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
        }
      )
        .to(
          hardwareLayer.current,
          { z: 0, y: 150, duration: 2, ease: "power2.inOut" },
          "<"
        )
        .to(
          middlewareLayer.current,
          { z: 50, y: 0, duration: 2, ease: "power2.inOut" },
          "<"
        )
        .to(
          cloudLayer.current,
          { z: 100, y: -150, duration: 2, ease: "power2.inOut" },
          "<"
        )
        // Show pipes
        .to(pipesRef.current, { opacity: 1, duration: 1 }, "-=1");

      // 2. FOCUS: HARDWARE (20% - 40%)
      tl.to(hardwareLayer.current, {
        scale: 1.1,
        filter: "brightness(1.5)",
        boxShadow: "0 0 50px rgba(251,191,36,0.3)", // Amber glow
        borderColor: "var(--color-secondary)",
        duration: 0.5,
      })
        .to(
          [middlewareLayer.current, cloudLayer.current],
          { opacity: 0.3, scale: 1, filter: "brightness(1)", duration: 0.5 },
          "<"
        )
        .to(
          hardwareText.current,
          { opacity: 1, x: 0, pointerEvents: "auto", duration: 0.5 },
          "<"
        );

      // Hold Hardware Focus
      tl.to({}, { duration: 1 });

      // 3. FOCUS: MIDDLEWARE (40% - 60%)
      // Reset Hardware, Focus Middleware
      tl.to(hardwareText.current, { opacity: 0, x: -20, duration: 0.5 })
        .to(hardwareLayer.current, {
          scale: 1,
          filter: "brightness(1)",
          boxShadow: "none",
          borderColor: "rgba(255,255,255,0.1)",
          duration: 0.5,
        })
        .to(middlewareLayer.current, {
          scale: 1.1,
          opacity: 1,
          filter: "brightness(1.5)",
          boxShadow: "0 0 50px rgba(34,197,94,0.3)", // Green glow
          borderColor: "var(--color-accent)",
          duration: 0.5,
        })
        .to(
          middlewareText.current,
          { opacity: 1, x: 0, pointerEvents: "auto", duration: 0.5 },
          "<"
        );

      // Hold Middleware Focus
      tl.to({}, { duration: 1 });

      // 4. FOCUS: CLOUD (60% - 80%)
      // Reset Middleware, Focus Cloud
      tl.to(middlewareText.current, { opacity: 0, x: -20, duration: 0.5 })
        .to(middlewareLayer.current, {
          scale: 1,
          opacity: 0.3,
          filter: "brightness(1)",
          boxShadow: "none",
          borderColor: "rgba(255,255,255,0.1)",
          duration: 0.5,
        })
        .to(cloudLayer.current, {
          scale: 1.1,
          opacity: 1,
          filter: "brightness(1.5)",
          boxShadow: "0 0 50px rgba(6,182,212,0.3)", // Cyan glow
          borderColor: "var(--color-primary)",
          duration: 0.5,
        })
        .to(
          cloudText.current,
          { opacity: 1, x: 0, pointerEvents: "auto", duration: 0.5 },
          "<"
        );

      // Hold Cloud Focus
      tl.to({}, { duration: 1 });

      // 5. EXIT PHASE (80% - 90%)
      // All connect/pulse together
      tl.to(cloudText.current, { opacity: 0, x: -20, duration: 0.5 })
        .to(
          [hardwareLayer.current, middlewareLayer.current, cloudLayer.current],
          {
            y: 0,
            z: 0,
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: "power2.in",
          }
        )
        .to(pipesRef.current, { opacity: 0, duration: 0.5 }, "<");

      // --- GLOBAL SECTION EXIT (90% - 100%) ---
      // This replicates the "Fly Through" effect manually at the end of the pin
      tl.to(contentWrapper.current, {
        opacity: 0,
        scale: 1.2,
        filter: "blur(10px)",
        duration: 2, // Use remaining timeline duration
        ease: "power1.in",
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="about"
      className="bg-deep-void relative z-20 flex min-h-screen w-full items-center justify-center overflow-hidden py-20 [perspective:2000px]"
    >
      <div
        ref={contentWrapper}
        className="relative flex h-full w-full items-center justify-center"
      >
        {/* Background Ambience */}
        <div className="cyber-grid absolute inset-0 opacity-20" />
        <div className="from-deep-void/0 via-primary/5 to-deep-void/0 bg-radial-gradient absolute inset-0 opacity-30" />

        {/* --- TEXT CONTENT PANELS (Left Side) --- */}
        {/* These are absolutely positioned but controlled by GSAP to appear in sequence */}
        <div className="pointer-events-none absolute top-1/2 left-4 z-50 w-full max-w-sm -translate-y-1/2 px-4 md:left-20">
          {/* Hardware Info */}
          <div ref={hardwareText} className="absolute top-1/2 -translate-y-1/2">
            <h3 className="font-space text-secondary mb-2 text-4xl font-bold tracking-tighter">
              HARDWARE
            </h3>
            <p className="text-secondary/80 mb-4 font-mono text-sm tracking-widest uppercase">
              Embedded Linux & BSP
            </p>
            <ul className="text-foreground/80 space-y-2 font-light">
              <li className="flex items-center gap-3">
                <Cpu className="text-secondary h-4 w-4" />
                <span>Kernel & Device Drivers</span>
              </li>
              <li className="flex items-center gap-3">
                <Server className="text-secondary h-4 w-4" />
                <span>CAN Protocol & Networking</span>
              </li>
              <li className="flex items-center gap-3">
                <Zap className="text-secondary h-4 w-4" />
                <span>Real-time System Control</span>
              </li>
            </ul>
          </div>

          {/* Middleware Info */}
          <div
            ref={middlewareText}
            className="absolute top-1/2 -translate-y-1/2"
          >
            <h3 className="font-space text-accent mb-2 text-4xl font-bold tracking-tighter">
              MIDDLEWARE
            </h3>
            <p className="text-accent/80 mb-4 font-mono text-sm tracking-widest uppercase">
              Android Native & HAL
            </p>
            <ul className="text-foreground/80 space-y-2 font-light">
              <li className="flex items-center gap-3">
                <Smartphone className="text-accent h-4 w-4" />
                <span>Android System Architecture</span>
              </li>
              <li className="flex items-center gap-3">
                <Code className="text-accent h-4 w-4" />
                <span>JNI & C++ Bridges</span>
              </li>
              <li className="flex items-center gap-3">
                <Layers className="text-accent h-4 w-4" />
                <span>Service Daemons (ZMQ)</span>
              </li>
            </ul>
          </div>

          {/* Cloud Info */}
          <div ref={cloudText} className="absolute top-1/2 -translate-y-1/2">
            <h3 className="font-space text-primary mb-2 text-4xl font-bold tracking-tighter">
              APPLICATION
            </h3>
            <p className="text-primary/80 mb-4 font-mono text-sm tracking-widest uppercase">
              Cloud & Front-End
            </p>
            <ul className="text-foreground/80 space-y-2 font-light">
              <li className="flex items-center gap-3">
                <Cloud className="text-primary h-4 w-4" />
                <span>Next.js & React Ecosystem</span>
              </li>
              <li className="flex items-center gap-3">
                <Database className="text-primary h-4 w-4" />
                <span>Scalable Backend APIs</span>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="text-primary h-4 w-4" />
                <span>Immersive Web Experiences</span>
              </li>
            </ul>
          </div>
        </div>

        {/* --- THE ISOMETRIC STACK (Center/Right) --- */}
        <div
          ref={stackRef}
          className="relative flex h-150 w-75 transform-[rotateX(60deg)_rotateZ(-45deg)] items-center justify-center transform-3d md:w-100"
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

            {/* Vertical Data Lines */}
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
              r="3"
              fill="var(--color-primary)"
              className="blur-[1px] filter"
            >
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                path="M 100 600 L 100 0"
              />
            </circle>
            <circle
              r="2"
              fill="var(--color-secondary)"
              className="blur-[1px] filter"
            >
              <animateMotion
                dur="6s"
                repeatCount="indefinite"
                path="M 300 600 L 300 0"
                begin="1.5s"
              />
            </circle>
            <circle
              r="4"
              fill="var(--color-accent)"
              opacity="0.4"
              className="blur-[2px] filter"
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
            className="bg-primary/5 border-primary/30 absolute z-30 flex h-75 w-full items-center justify-center rounded-2xl border backdrop-blur-sm transition-all will-change-[transform,opacity,filter]"
          >
            <div className="animate-background-shine absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.05)_50%,transparent_75%,transparent_100%)] bg-size-[250%_250%,100%_100%]" />

            {/* Top Surface Decoration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Cloud className="text-primary/20 h-32 w-32 -rotate-45" />
            </div>
            <div className="border-primary/20 absolute inset-4 rounded-xl border border-dashed" />
          </div>

          {/* --- LAYER 2: MIDDLEWARE (Middle) --- */}
          <div
            ref={middlewareLayer}
            className="bg-accent/5 border-accent/30 absolute z-20 flex h-75 w-full items-center justify-center rounded-2xl border backdrop-blur-sm transition-all will-change-[transform,opacity,filter]"
          >
            {/* Matrix / Code Rain Effect Texture */}
            <div
              className="absolute inset-0 overflow-hidden opacity-20"
              style={{
                backgroundImage:
                  "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGR5PSIuMzVlbSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzIyYzU1ZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMCI+MTA8L3RleHQ+PC9zdmc+')",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Layers className="text-accent/20 h-32 w-32 -rotate-45" />
            </div>
            <div className="border-accent/20 absolute inset-4 rounded-xl border border-dotted" />
          </div>

          {/* --- LAYER 1: HARDWARE (Bottom) --- */}
          <div
            ref={hardwareLayer}
            className="bg-secondary/5 border-secondary/30 absolute z-10 flex h-75 w-full items-center justify-center rounded-2xl border backdrop-blur-sm transition-all will-change-[transform,opacity,filter]"
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
              <Cpu className="text-secondary/20 h-32 w-32 -rotate-45" />
            </div>
            <div className="border-secondary/20 absolute inset-4 rounded-xl border" />
          </div>
        </div>
      </div>
    </section>
  );
}
