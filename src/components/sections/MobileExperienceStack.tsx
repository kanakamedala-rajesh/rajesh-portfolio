"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { resumeData } from "@/data/resume";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useSectionTransition } from "@/hooks/useSectionTransition";
import { Modal } from "@/components/ui/Modal";
import { Maximize2 } from "lucide-react";
import { useSectionContext } from "@/context/SectionContext";

gsap.registerPlugin(ScrollTrigger);

// Define Theme Colors (Duplicated from ExperienceTunnel to be self-contained)
const THEMES = [
  {
    borderColor: "border-primary/20",
    textColor: "text-primary",
    badgeBg: "bg-primary/5",
    badgeBorder: "border-primary/10",
    badgeText: "text-primary",
    tagBg: "bg-primary/10",
    tagText: "text-primary",
    decoration: "bg-primary/5",
    accent: "text-primary",
  },
  {
    borderColor: "border-secondary/20",
    textColor: "text-secondary",
    badgeBg: "bg-secondary/5",
    badgeBorder: "border-secondary/10",
    badgeText: "text-secondary",
    tagBg: "bg-secondary/10",
    tagText: "text-secondary",
    decoration: "bg-secondary/5",
    accent: "text-secondary",
  },
  {
    borderColor: "border-accent/20",
    textColor: "text-accent",
    badgeBg: "bg-accent/5",
    badgeBorder: "border-accent/10",
    badgeText: "text-accent",
    tagBg: "bg-accent/10",
    tagText: "text-accent",
    decoration: "bg-accent/5",
    accent: "text-accent",
  },
];

export default function MobileExperienceStack() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const yearRef = useRef<HTMLSpanElement>(null);
  const { updateSectionStatus } = useSectionContext();

  const [selectedExp, setSelectedExp] = useState<{
    data: (typeof resumeData.experience)[0];
    theme: (typeof THEMES)[0];
  } | null>(null);

  const handleSelect = (
    exp: (typeof resumeData.experience)[0],
    index: number
  ) => {
    setSelectedExp({ data: exp, theme: THEMES[index % 3] });
  };

  useSectionTransition({
    sectionRef: wrapperRef, // Track the wrapper for section visibility
    contentRef: contentRef,
    id: "experience-tunnel",
    isPinned: true,
    enableEntry: false, // DISABLE global entry animation to prevent ScrollTrigger conflict
    enableExit: false, // DISABLE global exit animation
  });

  useGSAP(
    () => {
      if (!containerRef.current || !wrapperRef.current) return;

      const cards = cardsRef.current.filter(Boolean);
      const totalCards = cards.length;

      // Calculate extracted periods
      const periods = resumeData.experience.map((exp) => exp.period);

      // Create a master timeline linked to the scroll of the container
      const scrollDistance = (totalCards - 1) * 300;

      let lastIdx = 0;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: `+=${scrollDistance}vh`,
          scrub: 2, // Smooth scrub catch-up
          pin: containerRef.current,
          onToggle: (self) => {
            updateSectionStatus(
              "experience-tunnel",
              self.isActive ? "active" : "idle",
              self.progress
            );
          },
          onUpdate: (self) => {
            // Update active year based on which card is currently "on top"
            const idx = Math.round(self.progress * (totalCards - 1));

            if (idx !== lastIdx && yearRef.current) {
              const newText = periods[idx] || periods[0];
              const el = yearRef.current;

              // Manual GSAP "AnimatePresence" logic to bypass React Render Cycle
              // 1. Slide Out
              gsap.to(el, {
                y: -20,
                opacity: 0,
                duration: 0.15,
                ease: "power2.in",
                onComplete: () => {
                  // 2. Swap Text
                  el.innerText = newText;
                  // 3. Reset Position for Slide In
                  gsap.set(el, { y: 20 });
                  // 4. Slide In
                  gsap.to(el, {
                    y: 0,
                    opacity: 1,
                    duration: 0.15,
                    ease: "power2.out",
                  });
                },
              });

              lastIdx = idx;
            }
          },
        },
      });

      cards.forEach((card, i) => {
        // Ensure z-index follows order (0 at bottom, last at top)
        gsap.set(card, {
          zIndex: i + 1,
        });

        const duration = 1;

        if (i === 0) {
          // CARD 0 (Base):
          tl.to(
            card,
            {
              scale: 0.9,
              filter: "brightness(0.6)",
              duration: duration,
              ease: "none",
            },
            0
          );
        } else {
          // CARD i > 0:
          tl.fromTo(
            card,
            { y: "110vh", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }, // Start off screen
            { y: "0vh", duration: duration, ease: "none" },
            i - 1
          );

          // Exit (Stacking):
          if (i < totalCards - 1) {
            tl.to(
              card,
              {
                scale: 0.9,
                filter: "brightness(0.6)",
                duration: duration,
                ease: "none",
              },
              i
            );
          }
        }
      });
    },
    { scope: wrapperRef, dependencies: [updateSectionStatus] }
  );

  return (
    <div ref={wrapperRef} id="experience" className="relative z-20 md:hidden">
      {/* Accessible section heading (visually hidden) for sequential heading hierarchy */}
      <h2 className="sr-only">Experience</h2>
      <div
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden bg-[var(--color-background)] text-[var(--color-foreground)]"
        style={{ contain: "layout style paint" }}
      >
        <div ref={contentRef} className="relative flex h-full w-full">
          {/* Left Sticky Sidebar (12%) */}
          <div className="bg-deep-void/50 absolute top-0 bottom-0 left-0 z-50 flex w-[12%] flex-col items-center justify-center border-r border-white/10 backdrop-blur-sm">
            <div className="relative flex h-full w-full items-center justify-center">
              {/* Vertical Line Decoration */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  height: ["80%", "85%", "80%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-[1px] bg-gradient-to-b from-transparent via-[var(--color-primary)] to-transparent"
              />

              {/* Animated Vertical Period Text */}
              <div className="fixed-vertical-container flex rotate-[-90deg] items-center pl-4">
                <span
                  ref={yearRef}
                  className="font-heading block text-xl font-bold tracking-tight whitespace-nowrap text-white"
                >
                  {resumeData.experience[0].period}
                </span>
              </div>
            </div>
          </div>

          {/* Ambient Background Elements (Shifted Right) */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-20">
            <div className="absolute top-1/4 left-[20%] h-64 w-64 rounded-full bg-[var(--color-primary)] blur-[100px]" />
            <div className="absolute -right-20 bottom-1/4 h-64 w-64 rounded-full bg-[var(--color-secondary)] blur-[100px]" />
          </div>

          {/* Cards Container (Right 88%) */}
          <div className="perspective-1000 relative z-10 ml-[12%] flex h-full w-[88%] items-center justify-center p-4">
            {resumeData.experience.map((exp, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={cn(
                  "absolute h-[65vh] w-full max-w-[90%] p-5", // INCREASED HEIGHT
                  "flex cursor-pointer flex-col justify-between",
                  "rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl",
                  "origin-bottom"
                )}
                style={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                }}
                onClick={() => handleSelect(exp, index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(exp, index);
                  }
                }}
              >
                {/* Card Header */}
                <div>
                  <div className="mb-3 flex items-start justify-between">
                    <span
                      className={cn(
                        "rounded border px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase",
                        index % 3 === 0
                          ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                          : index % 3 === 1
                            ? "border-[var(--color-secondary)] bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]"
                            : "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                      )}
                    >
                      {exp.type}
                    </span>
                    <span className="font-mono text-[10px] text-white/40">
                      {exp.period}
                    </span>
                  </div>

                  <h3 className="font-heading mb-1 line-clamp-2 text-2xl leading-none font-bold text-white">
                    {exp.company}
                  </h3>
                  <p className="truncate text-sm font-medium text-white/70">
                    {exp.role}
                  </p>
                </div>

                {/* Tech Stack Grid */}
                <div className="my-3 flex flex-wrap gap-1.5">
                  {exp.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] text-white/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Description Snippet */}
                <div className="mt-auto">
                  <p className="line-clamp-3 text-xs leading-relaxed text-white/50">
                    {exp.description[0]}
                  </p>
                  <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                    <div className="flex items-center gap-2 text-[9px] font-bold tracking-widest text-white/60 uppercase">
                      <Maximize2 className="h-3 w-3" />
                      Details
                    </div>
                    {/* Decorative Arrow */}
                    <div className="flex h-5 w-5 items-center justify-center rounded-full border border-white/20">
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Glass Shine Effect */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 to-transparent" />
              </div>
            ))}
          </div>

          {/* Modal for Details */}
          <Modal
            isOpen={!!selectedExp}
            onClose={() => setSelectedExp(null)}
            title={selectedExp?.data.company || ""}
            layoutId={
              selectedExp
                ? `mobile-card-${selectedExp.data.company}`
                : undefined
            }
            className={cn("scrollbar-custom")}
            style={
              {
                "--scrollbar-thumb":
                  selectedExp &&
                  resumeData.experience.indexOf(selectedExp.data) % 3 === 0
                    ? "var(--color-primary)"
                    : selectedExp &&
                        resumeData.experience.indexOf(selectedExp.data) % 3 ===
                          1
                      ? "var(--color-secondary)"
                      : "var(--color-accent)",
              } as React.CSSProperties
            }
          >
            {selectedExp && (
              <div className="space-y-8">
                <div>
                  <div className="mb-4 flex flex-col justify-between gap-4">
                    <p className="text-xl text-white/80">
                      {selectedExp.data.role}
                    </p>
                    <span
                      className={cn(
                        "w-fit rounded border px-3 py-1 font-mono text-sm",
                        selectedExp.theme.badgeBg,
                        selectedExp.theme.badgeBorder,
                        selectedExp.theme.badgeText
                      )}
                    >
                      {selectedExp.data.period}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedExp.data.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={cn(
                          "rounded border px-3 py-1 text-sm",
                          selectedExp.theme.tagBg,
                          selectedExp.theme.tagText,
                          "border-white/5"
                        )}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="border-b border-white/10 pb-2 text-sm font-bold tracking-widest text-white/40 uppercase">
                    Execution Log
                  </h4>
                  <ul className="space-y-4">
                    {selectedExp.data.description.map((desc, i) => (
                      <motion.li
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="text-muted-foreground flex items-start text-base leading-relaxed"
                      >
                        <span
                          className={cn(
                            "mt-1.5 mr-4 font-mono",
                            selectedExp.theme.textColor
                          )}
                        >
                          0{i + 1}
                        </span>
                        <span>{desc}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
}
