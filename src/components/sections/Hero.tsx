"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "@/data/resume";
import {
  CircuitBoard,
  Cloud,
  Cpu,
  Server,
  Code,
  Database,
  Zap,
  Globe,
  Wifi,
  Layers,
  Radio,
  Share2,
  Terminal,
  Mic2,
  Plug,
  Cable,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const topHalf = useRef<HTMLDivElement>(null);
  const bottomHalf = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const spline = useRef<SVGPathElement>(null);
  const splineGlow = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      // Spline Logic
      const path = spline.current;
      const pathLength = path?.getTotalLength() || 100;

      // Set initial dash states for "drawing" effect
      gsap.set([spline.current, splineGlow.current], {
        strokeDasharray: pathLength,
        strokeDashoffset: 0,
        opacity: 1,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=250%",
          scrub: 1,
          pin: true,
        },
      });

      // Animation Sequence
      tl
        // 1. Pull apart the halves
        .to(topHalf.current, {
          yPercent: -100,
          ease: "power2.inOut",
          duration: 2,
        })
        .to(
          bottomHalf.current,
          {
            yPercent: 100,
            ease: "power2.inOut",
            duration: 2,
          },
          "<"
        )
        // 2. Reveal Content (Dramatic Zoom In)
        .fromTo(
          content.current,
          {
            opacity: 0,
            scale: 0.5,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "expo.out", // "Pop" effect
          },
          "-=1"
        )
        // 3. Spline Interaction: Stretch and "Break"
        .to(
          [spline.current, splineGlow.current],
          {
            attr: { d: "M 50 100 Q 50 50 50 0" }, // Straighten
            strokeDashoffset: -pathLength * 2, // Flow effect
            opacity: 0,
            duration: 1,
            ease: "power1.in",
          },
          "<"
        )
        // 4. EXIT PHASE: Zoom through content
        .to(
          content.current,
          {
            scale: 2,
            opacity: 0,
            filter: "blur(20px)",
            duration: 1,
            ease: "power2.in",
          },
          "+=0.5" // Small pause before exit
        )
        .to(
          [topHalf.current, bottomHalf.current],
          {
            opacity: 0,
            duration: 1,
          },
          "<"
        );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="bg-background relative h-screen w-full overflow-hidden"
      aria-label="Hero Section"
    >
      {/* --- REVEALED CONTENT (Center) --- */}
      <div
        id="hero-title"
        ref={content}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 text-center opacity-0"
      >
        <div className="relative w-full max-w-[90vw]">
          {/* Glowing Back-light for text */}
          <div className="bg-primary/5 absolute inset-0 rounded-full mix-blend-normal blur-2xl md:mix-blend-screen md:blur-[120px]" />

          <h1 className="font-space via-primary to-primary/50 wrap-break-words relative mb-4 bg-linear-to-br from-white bg-clip-text text-4xl font-bold tracking-tighter text-transparent drop-shadow-[0_0_10px_rgba(6,182,212,0.25)] sm:mb-6 sm:text-6xl md:text-8xl lg:text-9xl">
            {resumeData.header.name.split(" ")[0]}
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            {resumeData.header.name.split(" ")[1]}
          </h1>
        </div>

        <p className="text-muted-foreground font-inter mb-6 max-w-[85vw] text-sm leading-relaxed font-light tracking-wide sm:mb-8 sm:text-xl md:max-w-2xl md:text-3xl">
          {resumeData.header.tagline}
        </p>

        <div className="text-accent flex flex-wrap justify-center gap-3 font-mono text-xs sm:gap-8 sm:text-base">
          <div className="border-accent/20 bg-accent/5 flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-sm sm:px-4 sm:py-2">
            <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{resumeData.header.title}</span>
          </div>
          <div className="border-accent/20 bg-accent/5 flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-sm sm:px-4 sm:py-2">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500 sm:h-2 sm:w-2" />
            <span>{resumeData.header.location}</span>
          </div>
        </div>
      </div>

      {/* --- TOP HALF: CLOUD / WEB --- */}
      <div
        ref={topHalf}
        className="bg-deep-void border-primary/50 absolute top-0 left-0 z-20 flex h-1/2 w-full items-end justify-center overflow-hidden border-b shadow-[0_4px_30px_rgba(6,182,212,0.1)] will-change-transform"
      >
        {/* Background Effects */}
        <div className="from-primary/5 pointer-events-none absolute inset-0 bg-linear-to-b to-transparent" />
        <div className="cyber-grid absolute inset-0 opacity-20" />

        {/* Decorative Icons */}
        <Cloud className="text-primary/5 animate-pulse-slow absolute top-[15%] left-[10%] h-16 w-16 sm:h-24 sm:w-24" />
        <Server className="text-primary/5 absolute top-[25%] right-[15%] h-12 w-12 sm:h-16 sm:w-16" />
        <Database className="text-primary/10 absolute bottom-[20%] left-[20%] h-8 w-8 sm:h-10 sm:w-10" />
        <Globe className="text-primary/5 absolute top-[10%] right-[30%] hidden h-10 w-10 md:block" />
        <Wifi className="text-primary/5 absolute right-[5%] bottom-[30%] hidden h-14 w-14 opacity-50 lg:block" />
        <Share2 className="text-primary/5 absolute top-[40%] left-[5%] hidden h-8 w-8 md:block" />

        {/* Floating Code Snippet Visual - React */}
        <div className="bg-primary/10 border-primary/20 text-primary pointer-events-none absolute top-[20%] left-[40%] h-24 w-48 -translate-x-1/2 overflow-hidden rounded-md border p-2 font-mono text-[8px] opacity-10 select-none sm:h-32 sm:w-64 sm:text-[10px]">
          {`import { Future } from 'react';`}
          <br />
          {`const App = () => {`}
          <br />
          {`  return <Experience />`}
          <br />
          {`}`}
        </div>

        {/* Connector Point - Top */}
        <div className="absolute bottom-0 left-0 z-30 flex w-full flex-col items-center">
          {/* Label */}
          <span className="text-primary mb-2 font-mono text-[10px] tracking-[0.2em] uppercase opacity-80 sm:text-xs">
            Cloud Layer
          </span>

          {/* Arrow Indicator (Points Down) */}
          <div className="mb-1 flex animate-bounce flex-col items-center gap-1 opacity-50">
            <div className="bg-primary/50 h-3 w-px" />
            <div className="border-primary/50 h-2 w-2 rotate-45 border-r border-b" />
          </div>

          {/* Node / Socket (Top Half) */}
          {/* Cloud Interface Unit */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Housing */}
            <div className="border-primary/30 bg-primary/5 relative flex h-10 w-36 items-center justify-center gap-3 overflow-hidden rounded-full border shadow-[0_0_30px_rgba(6,182,212,0.2)] backdrop-blur-md sm:h-12 sm:w-48 sm:rounded-xl">
              <div className="bg-grid-white/[0.05] absolute inset-0" />
              {/* Active Status Light */}
              <div className="bg-primary absolute top-2 right-3 h-1.5 w-1.5 animate-pulse rounded-full shadow-[0_0_5px_var(--color-primary)]" />

              {/* Icon Identity */}
              <Cloud
                className="text-primary/80 h-4 w-4 sm:h-5 sm:w-5"
                strokeWidth={1.5}
              />
              <span className="text-primary/60 font-mono text-[8px] tracking-[0.2em] sm:text-[10px]">
                CLOUD.UPLINK
              </span>
            </div>

            {/* The Plug */}
            <div className="relative flex flex-col items-center">
              {/* Neck */}
              <div className="border-primary/30 bg-deep-void w-8 border-x" />
              {/* Connector Head */}
              <div className="border-primary/40 from-deep-void to-primary/10 flex h-6 w-12 items-center justify-center rounded-b-lg border bg-linear-to-b shadow-lg">
                <Plug className="text-primary h-4 w-4 rotate-180" />
              </div>
              {/* Pin Tip (Connects to spline) */}
              <div className="bg-primary/50 h-3 w-0.5" />
            </div>
          </div>
        </div>
      </div>

      {/* --- BOTTOM HALF: HARDWARE / KERNEL --- */}
      <div
        ref={bottomHalf}
        className="bg-deep-void border-secondary/50 absolute bottom-0 left-0 z-20 flex h-1/2 w-full items-start justify-center overflow-hidden border-t shadow-[0_-4px_30px_rgba(251,191,36,0.1)] will-change-transform"
      >
        {/* Background Effects */}
        <div className="from-secondary/5 pointer-events-none absolute inset-0 bg-linear-to-t to-transparent" />
        <div className="cyber-grid absolute inset-0 opacity-20" />

        {/* Decorative Icons */}
        <CircuitBoard className="text-secondary/5 absolute right-[8%] bottom-[10%] h-20 w-20 sm:h-32 sm:w-32" />
        <Cpu className="text-secondary/5 animate-pulse-slow absolute bottom-[20%] left-[12%] h-12 w-12 sm:h-20 sm:w-20" />
        <Code className="text-secondary/10 absolute top-[15%] right-[25%] h-8 w-8 sm:h-12 sm:w-12" />
        <Layers className="text-secondary/5 absolute bottom-[30%] left-[5%] hidden h-10 w-10 md:block" />
        <Radio className="text-secondary/5 absolute top-[25%] left-[25%] hidden h-14 w-14 opacity-40 lg:block" />
        <Mic2 className="text-secondary/5 absolute right-[30%] bottom-[15%] hidden h-8 w-8 md:block" />
        <Terminal className="text-secondary/5 absolute top-[40%] right-[5%] hidden h-8 w-8 sm:block" />

        {/* Floating Code Snippet Visual - Embedded/C++ */}
        <div className="bg-secondary/10 border-secondary/20 text-secondary pointer-events-none absolute bottom-[15%] left-[60%] h-24 w-48 -translate-x-1/2 overflow-hidden rounded-md border p-2 font-mono text-[8px] opacity-10 select-none sm:h-32 sm:w-64 sm:text-[10px]">
          {`#include <linux/module.h>`}
          <br />
          {`static int __init init(void) {`}
          <br />
          {`  printk("Kernel Active");`}
          <br />
          {`  printk("నా చావు నేను చస్తా");`}
          <br />
          {`  return 0;`}
          <br />
          {`}`}
        </div>

        {/* Connector Point - Bottom */}
        <div className="absolute top-0 left-0 z-30 flex w-full flex-col items-center">
          {/* Node / Socket (Bottom Half) */}
          {/* Hardware Port Unit */}
          <div className="relative z-10 flex flex-col items-center">
            {/* The Socket */}
            <div className="relative -mb-1 flex flex-col items-center">
              {/* Pin Entry (Connects to spline) */}
              <div className="bg-secondary/50 h-3 w-0.5" />
              {/* Socket Head */}
              <div className="border-secondary/40 from-deep-void to-secondary/10 flex h-6 w-12 items-center justify-center rounded-t-lg border bg-linear-to-t shadow-lg">
                <Cable className="text-secondary h-4 w-4" />
              </div>
              {/* Neck */}
              <div className="border-secondary/30 bg-deep-void w-8 border-x" />
            </div>

            {/* Housing */}
            <div className="border-secondary/30 bg-deep-void relative flex h-10 w-36 items-center justify-center gap-3 overflow-hidden rounded-full border shadow-[0_0_30px_rgba(251,191,36,0.15)] sm:h-12 sm:w-48 sm:rounded-xl">
              {/* Tech Texture */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-secondary)_1px,transparent_1px)] bg-size-[4px_4px] opacity-10" />

              {/* Active Status Light */}
              <div className="bg-secondary absolute bottom-2 left-3 h-1.5 w-1.5 animate-pulse rounded-full shadow-[0_0_5px_var(--color-secondary)]" />

              {/* Icon Identity */}
              <Cpu
                className="text-secondary/80 h-4 w-4 sm:h-5 sm:w-5"
                strokeWidth={1.5}
              />
              <span className="text-secondary/60 font-mono text-[8px] tracking-[0.2em] sm:text-[10px]">
                CORE.SYS
              </span>
            </div>
          </div>

          {/* Arrow Indicator (Points Up) */}
          <div className="mt-3 flex animate-bounce flex-col items-center gap-1 opacity-50">
            <div className="border-secondary/50 h-2 w-2 rotate-45 border-t border-l" />
            <div className="bg-secondary/50 h-3 w-px" />
          </div>

          {/* Label */}
          <span className="text-secondary mt-2 font-mono text-[10px] tracking-[0.2em] uppercase opacity-80 sm:text-xs">
            Hardware Layer
          </span>
        </div>
      </div>

      {/* --- CONNECTING SPLINE --- */}
      <svg
        className="pointer-events-none absolute inset-0 z-30 h-full w-full mix-blend-screen"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Glow Layer */}
        <path
          ref={splineGlow}
          d="M 50 50 Q 50 50 50 50"
          stroke="url(#splineGradient)"
          strokeWidth="2"
          fill="none"
          vectorEffect="non-scaling-stroke"
          className="opacity-50 blur-xs"
        />
        {/* Core Line */}
        <path
          ref={spline}
          d="M 50 50 Q 50 50 50 50"
          stroke="url(#splineGradient)"
          strokeWidth="0.8"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        <defs>
          <linearGradient id="splineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="50%" stopColor="#fff" />
            <stop offset="100%" stopColor="var(--color-secondary)" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
}
