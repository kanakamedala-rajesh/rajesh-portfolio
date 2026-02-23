"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "@/data/resume";
import { useSectionContext } from "@/context/SectionContext";
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

import { MOTION_CONSTANTS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero Section Component
 * Optimized for LCP performance with:
 * - Batched DOM operations to prevent forced reflows
 * - CSS containment for layout isolation
 * - will-change hints for GPU acceleration
 * - Deferred non-critical animations
 */
export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const topHalf = useRef<HTMLDivElement>(null);
  const bottomHalf = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const spline = useRef<SVGPathElement>(null);
  const splineGlow = useRef<SVGPathElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const { registerSection, updateSectionStatus } = useSectionContext();

  useGSAP(
    () => {
      // Read path length inside useGSAP (which uses useLayoutEffect internally)
      // to consolidate forced reflow into a single synchronous pass
      const pathLength = spline.current?.getTotalLength() || 100;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 768px)",
          reduce: "(prefers-reduced-motion: reduce)",
          isDesktop: "(min-width: 769px)",
        },
        (context) => {
          const { isMobile, reduce } = context.conditions as {
            isMobile: boolean;
            reduce: boolean;
          };

          if (isMobile || reduce) {
            // Simplified state for reduced motion OR mobile
            // Batch all gsap.set calls to minimize layout thrashing
            gsap.set([topHalf.current, bottomHalf.current, content.current], {
              clearProps: "all",
            });
            gsap.set(topHalf.current, { yPercent: -100 });
            gsap.set(bottomHalf.current, { yPercent: 100 });
            gsap.set(content.current, {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            });
            // Hide heavy spline on mobile
            gsap.set([spline.current, splineGlow.current], { opacity: 0 });

            // Simple scroll trigger to track status and fade out on exit (Mobile/Reduce)
            gsap.to([content.current, bgRef.current], {
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
                onUpdate: (self) => {
                  updateSectionStatus("hero", "active", self.progress);
                },
              },
            });
          } else {
            // Full Animation Sequence (Desktop only)
            // Batch initial setup to prevent forced reflows
            // Set all initial states in a single GSAP context
            gsap.set([spline.current, splineGlow.current], {
              strokeDasharray: pathLength,
              strokeDashoffset: 0,
              opacity: 1,
            });

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: MOTION_CONSTANTS.SCROLL.PIN_END,
                scrub: MOTION_CONSTANTS.SCROLL.SCRUB,
                pin: true,
                onUpdate: (self) => {
                  // Only mark as exiting in the later half to avoid conflict with "Reveal"
                  if (self.progress > 0.8) {
                    updateSectionStatus("hero", "exiting", self.progress);
                  } else {
                    updateSectionStatus("hero", "active", self.progress);
                  }
                },
              },
            });

            tl
              // 1. Pull apart the halves
              .to(topHalf.current, {
                yPercent: -100,
                ease: MOTION_CONSTANTS.EASE.IN_OUT,
                duration: MOTION_CONSTANTS.DURATIONS.SLOW,
              })
              .to(
                bottomHalf.current,
                {
                  yPercent: 100,
                  ease: MOTION_CONSTANTS.EASE.IN_OUT,
                  duration: MOTION_CONSTANTS.DURATIONS.SLOW,
                },
                "<"
              )
              // 2. Reveal Content (Dramatic Zoom In)
              .to(
                content.current,
                {
                  scale: 1,
                  filter: "blur(0px)",
                  duration: 1.5,
                  ease: MOTION_CONSTANTS.EASE.EXPO_OUT, // "Pop" effect
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
                  duration: MOTION_CONSTANTS.DURATIONS.NORMAL,
                  ease: MOTION_CONSTANTS.EASE.IN,
                },
                "<"
              )
              // 4. Parallax Exit (Integrated into Timeline)
              .to(
                content.current,
                {
                  opacity: 0,
                  scale: 1.5, // Faster foreground zoom
                  duration: MOTION_CONSTANTS.DURATIONS.NORMAL,
                  ease: MOTION_CONSTANTS.EASE.IN,
                },
                "+=0.2"
              )
              .to(
                bgRef.current,
                {
                  opacity: 0,
                  scale: 1.1, // Slower background zoom (Parallax)
                  duration: MOTION_CONSTANTS.DURATIONS.NORMAL,
                  ease: MOTION_CONSTANTS.EASE.IN,
                },
                "<"
              );
          }
        }
      );

      // Register Section
      registerSection("hero");
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="hero"
      className="bg-deep-void relative top-0 z-10 h-screen w-full overflow-hidden md:sticky"
      aria-label="Hero Section"
      style={{
        backgroundColor: "var(--color-deep-void)",
        // NOTE: 'contain: paint' creates a new Stacking Context.
        // This isolates the Hero's z-index from the rest of the page.
        // Ensure global overlays (Modals, Navbar) are outside this section.
        contain: "layout style paint",
      }}
    >
      {/* --- BACKGROUND IMAGE --- */}
      <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform">
        <Image
          src="/home_bg.webp"
          alt=""
          aria-hidden="true"
          fill
          priority
          quality={60}
          sizes="(min-width: 1400px) 1400px, 100vw"
          className="object-cover object-center opacity-60"
        />
        {/* Overlay for text readability */}
        <div className="bg-deep-void/40 absolute inset-0 mix-blend-multiply" />
      </div>

      {/* --- REVEALED CONTENT (Center) --- LCP Element */}
      <div
        id="hero-title"
        ref={content}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 text-center will-change-transform"
        style={{ contain: "layout style" }}
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

        <div className="text-secondary flex flex-wrap justify-center gap-3 font-mono text-xs sm:gap-8 sm:text-base">
          <div className="border-primary/50 bg-accent/5 flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-sm sm:px-4 sm:py-2">
            <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{resumeData.header.title}</span>
          </div>
          <div className="border-secondary/50 bg-accent/5 flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-sm sm:px-4 sm:py-2">
            <div className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full sm:h-2 sm:w-2" />
            <span>{resumeData.header.location}</span>
          </div>
        </div>
      </div>

      {/* --- TOP HALF: CLOUD / WEB --- */}
      <div
        ref={topHalf}
        className="bg-deep-void border-primary/50 gpu-accelerated absolute top-0 left-0 z-20 flex h-1/2 w-full items-end justify-center overflow-hidden border-b shadow-[0_4px_30px_rgba(6,182,212,0.1)] will-change-transform"
        style={{ contain: "layout style paint" }}
      >
        {/* Background Effects */}
        <div className="from-primary/5 pointer-events-none absolute inset-0 bg-linear-to-b to-transparent" />
        <div className="cyber-grid absolute inset-0 opacity-20" />

        {/* Decorative Icons - marked as decorative for containment */}
        <Cloud className="text-primary/5 animate-composited-pulse decorative-icon absolute top-[15%] left-[10%] h-16 w-16 sm:h-24 sm:w-24" />
        <Server className="text-primary/5 decorative-icon absolute top-[25%] right-[15%] h-12 w-12 sm:h-16 sm:w-16" />
        <Database className="text-primary/10 decorative-icon absolute bottom-[20%] left-[20%] h-8 w-8 sm:h-10 sm:w-10" />
        <Globe className="text-primary/5 decorative-icon absolute top-[10%] right-[30%] hidden h-10 w-10 md:block" />
        <Wifi className="text-primary/5 decorative-icon absolute right-[5%] bottom-[30%] hidden h-14 w-14 opacity-50 lg:block" />
        <Share2 className="text-primary/5 decorative-icon absolute top-[40%] left-[5%] hidden h-8 w-8 md:block" />

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
          <span className="text-primary mb-2 font-mono text-[10px] tracking-[0.2em] uppercase opacity-80 sm:text-2xl sm:font-extrabold">
            Cloud Layer
          </span>

          {/* Arrow Indicator (Points Down) */}
          <div className="animate-composited-bounce mb-1 flex flex-col items-center gap-1 opacity-50">
            <div className="bg-primary/50 h-3 w-px" />
            <div className="border-primary/50 h-2 w-2 rotate-45 border-r border-b" />
          </div>

          {/* Node / Socket (Top Half) */}
          {/* Cloud Interface Unit */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Housing */}
            <div className="border-primary/30 bg-primary/5 relative flex h-10 w-36 items-center justify-center gap-3 overflow-hidden rounded-full border shadow-[0_0_30px_rgba(6,182,212,0.2)] backdrop-blur-md sm:h-12 sm:w-48 sm:rounded-xl">
              <div className="bg-grid-white/[0.05] absolute inset-0" />
              {/* Icon Identity */}
              <Cloud
                className="text-primary/80 animate-composited-pulse h-4 w-4 sm:h-6 sm:w-6"
                strokeWidth={2}
              />
              <span className="text-primary/60 font-mono text-[8px] tracking-[0.2em] sm:text-xs">
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
        className="bg-deep-void gpu-accelerated absolute bottom-0 left-0 z-20 flex h-1/2 w-full items-start justify-center overflow-hidden shadow-none will-change-transform"
        style={{ contain: "layout style paint" }}
      >
        {/* Background Effects */}
        <div className="from-secondary/5 pointer-events-none absolute inset-0 bg-linear-to-t to-transparent" />
        <div className="cyber-grid absolute inset-0 opacity-20" />

        {/* Decorative Icons - marked as decorative for containment */}
        <CircuitBoard className="text-secondary/5 decorative-icon absolute right-[8%] bottom-[10%] h-20 w-20 sm:h-32 sm:w-32" />
        <Cpu className="text-secondary/5 animate-composited-pulse decorative-icon absolute bottom-[20%] left-[12%] h-12 w-12 sm:h-20 sm:w-20" />
        <Code className="text-secondary/10 decorative-icon absolute top-[15%] right-[25%] h-8 w-8 sm:h-12 sm:w-12" />
        <Layers className="text-secondary/5 decorative-icon absolute bottom-[30%] left-[5%] hidden h-10 w-10 md:block" />
        <Radio className="text-secondary/5 decorative-icon absolute top-[25%] left-[25%] hidden h-14 w-14 opacity-40 lg:block" />
        <Mic2 className="text-secondary/5 decorative-icon absolute right-[30%] bottom-[15%] hidden h-8 w-8 md:block" />
        <Terminal className="text-secondary/5 decorative-icon absolute top-[40%] right-[5%] hidden h-8 w-8 sm:block" />

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
              {/* Icon Identity */}
              <Cpu
                className="text-secondary/80 animate-composited-pulse h-4 w-4 sm:h-6 sm:w-6"
                strokeWidth={2}
              />
              <span className="text-secondary/60 font-mono text-[8px] tracking-[0.2em] sm:text-xs">
                CORE.SYS
              </span>
            </div>
          </div>

          {/* Arrow Indicator (Points Up) */}
          <div className="animate-composited-bounce mt-3 flex flex-col items-center gap-1 opacity-50">
            <div className="border-secondary/50 h-2 w-2 rotate-45 border-t border-l" />
            <div className="bg-secondary/50 h-3 w-px" />
          </div>

          {/* Label */}
          <span className="text-secondary mt-2 font-mono text-[10px] tracking-[0.2em] uppercase opacity-80 sm:text-2xl sm:font-extrabold">
            Hardware Layer
          </span>
        </div>
      </div>

      {/* --- CONNECTING SPLINE --- */}
      <svg
        className="pointer-events-none absolute inset-0 z-30 hidden h-full w-full mix-blend-screen md:block"
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
