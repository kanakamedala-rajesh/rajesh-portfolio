"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useSectionTransition } from "@/hooks/useSectionTransition";
import { resumeData } from "@/data/resume";
import { cn } from "@/lib/utils";
import { Maximize2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { useSectionContext } from "@/context/SectionContext";

gsap.registerPlugin(ScrollTrigger);

// Define Theme Colors
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

interface ExperienceCardProps {
  exp: (typeof resumeData.experience)[0];
  index: number;
  onSelect: (exp: (typeof resumeData.experience)[0], index: number) => void;
  isMobile: boolean;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
  // Desktop variant is handled by GSAP, so we just set initial state
  desktop: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0 },
  },
};

const ExperienceCard = ({
  exp,
  index,
  onSelect,
  isMobile,
}: ExperienceCardProps) => {
  const theme = THEMES[index % 3];
  const isVR = exp.type === "VR/AR";

  return (
    <motion.div
      variants={cardVariants}
      initial={isMobile ? "hidden" : "desktop"}
      whileInView={isMobile ? "visible" : "desktop"}
      viewport={{ once: true, amount: 0.2 }}
      style={
        {
          // CSS Variable for sticky top position, applied only on mobile via class
          "--card-top": `calc(15vh + ${index * 20}px)`,
        } as React.CSSProperties
      }
      className={cn(
        "experience-card group relative flex shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-xl border backdrop-blur-md",
        // Performance Enhancements
        "perspective-1000 transform-gpu will-change-[width,transform,opacity] backface-hidden",
        // Mobile styles
        "h-125 w-full max-w-[90vw] p-6",
        // Desktop styles (Larger Dimensions & Snappy Transition)
        "md:h-[70vh] md:w-[500px] md:p-10",
        "md:transition-[width,border-color] md:duration-400 md:ease-[cubic-bezier(0.2,0,0,1)]",
        "md:hover:w-[750px] md:hover:border-white/60",
        // Responsive positioning
        "sticky md:relative",
        "top-(--card-top) md:top-auto",
        "bg-void/60", // Base background
        theme.borderColor
      )}
      onClick={() => onSelect(exp, index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(exp, index);
        }
      }}
    >
      {/* Background decoration */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          theme.decoration
        )}
      />

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 z-[-1] opacity-10 transition-opacity group-hover:opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            transform: isVR ? "perspective(500px) rotateX(60deg)" : "none",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-6 border-b border-white/10 pb-6">
          <div className="flex flex-col gap-2">
            <span
              className={cn(
                "w-fit rounded-full border px-3 py-1 font-mono text-xs whitespace-nowrap md:text-xs",
                theme.badgeBg,
                theme.badgeBorder,
                theme.badgeText
              )}
            >
              {exp.period}
            </span>
            <div className="min-w-0">
              <h3
                className={cn(
                  "font-heading mb-1 text-2xl leading-tight font-bold whitespace-nowrap md:text-4xl",
                  theme.textColor
                )}
              >
                {exp.company}
              </h3>
              <p className="truncate text-lg text-white/80 md:text-2xl">
                {exp.role}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {exp.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className={cn(
                  "rounded border border-white/5 px-2 py-0.5 text-[10px] md:text-sm",
                  theme.tagBg,
                  theme.tagText
                )}
              >
                {tech}
              </span>
            ))}
            {exp.techStack.length > 4 && (
              <span className="text-muted-foreground px-2 py-0.5 text-[10px] md:text-sm">
                +{exp.techStack.length - 4} more
              </span>
            )}
          </div>
        </div>

        <ul className="text-muted-foreground grow space-y-4 overflow-hidden">
          {exp.description.slice(0, 3).map((desc, i) => (
            <li key={i} className="flex items-start text-sm md:text-lg">
              <span
                className={cn(
                  "mt-2 mr-3 h-1.5 w-1.5 shrink-0 rounded-full bg-current",
                  theme.accent
                )}
              />
              <span className="line-clamp-2 leading-relaxed">{desc}</span>
            </li>
          ))}
        </ul>

        {/* Card Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex gap-4 font-mono text-xs text-white/40">
            <span>TYPE :: {exp.type.toUpperCase()}</span>
          </div>

          <button
            className={cn(
              "flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors hover:text-white",
              theme.textColor
            )}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(exp, index);
            }}
          >
            <Maximize2 className="h-3 w-3" />
            <span className="hidden md:inline">Expand System</span>
            <span className="md:hidden">Expand</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function DesktopExperience() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activePeriodRef = useRef<HTMLHeadingElement>(null);
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
    sectionRef: wrapperRef,
    contentRef: trackRef, // Animating the track directly via GSAP
    id: "experience-tunnel",
    isPinned: true,
    enableExit: false,
  });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const section = sectionRef.current;
    const track = trackRef.current;
    const activePeriod = activePeriodRef.current;

    if (!wrapper || !section || !track || !activePeriod) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".experience-card") as HTMLDivElement[];

      // Calculate Scroll Amounts
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        // Scroll enough to show the last card fully + some padding
        return -(trackWidth - viewportWidth + 100);
      };

      let lastActiveIndex = -1;

      // 1. The Main Horizontal Scroll
      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "+=300%", // 3x height for scroll distance
          pin: section,
          scrub: 0.5, // Smooth scrubbing
          invalidateOnRefresh: true,
          anticipatePin: 1,
          fastScrollEnd: true, // Performance optimization
          onToggle: (self) => {
            updateSectionStatus(
              "experience-tunnel",
              self.isActive ? "active" : "idle",
              self.progress
            );
          },
          onUpdate: () => {
            // 2. The "Parallax Lens" Effect (Physics Loop)
            // Optimized: Batch all DOM reads first, then batch all writes
            const viewportCenter = window.innerWidth / 2;

            // BATCH READ PHASE: Read all card positions at once
            const cardData = cards.map((card) => {
              const rect = card.getBoundingClientRect();
              return {
                card,
                cardCenter: rect.left + rect.width / 2,
              };
            });

            let closestDist = Infinity;
            let closestIndex = -1;

            // Calculate all values without DOM writes
            const updates = cardData.map(({ card, cardCenter }, index) => {
              const dist = Math.abs(viewportCenter - cardCenter);

              if (dist < closestDist) {
                closestDist = dist;
                closestIndex = index;
              }

              const range = 800;
              const normalizedDist = Math.min(dist / range, 1);

              return {
                card,
                scale: gsap.utils.interpolate(1.05, 0.92, normalizedDist),
                opacity: gsap.utils.interpolate(1, 0.5, normalizedDist),
                brightness: gsap.utils.interpolate(100, 60, normalizedDist),
                zIndex: 10 - Math.floor(normalizedDist * 10),
              };
            });

            // BATCH WRITE PHASE: Apply all transforms at once using gsap.set
            updates.forEach(({ card, scale, opacity, brightness, zIndex }) => {
              gsap.set(card, {
                scale,
                opacity,
                filter: `brightness(${brightness}%)`,
                zIndex,
              });
            });

            // 3. Dynamic Background Text Update
            if (closestIndex !== -1 && closestIndex !== lastActiveIndex) {
              lastActiveIndex = closestIndex;

              // Cinematic Text Switch
              const newText = resumeData.experience[closestIndex].period;

              // Calculate optimal font size to fit ~90% width
              // Formula: 90vw / (charCount * avgCharWidthRatio)
              // Avg char width for bold grostesk is approx 0.6em
              const charCount = newText.length;
              const calculatedVw = 90 / (charCount * 0.6);
              // Clamp: Min 4vw (readability), Max 18vw (height constraint)
              const fontSizeVw = Math.max(4, Math.min(18, calculatedVw));

              gsap
                .timeline()
                .to(activePeriod, {
                  opacity: 0,
                  y: 20,
                  filter: "blur(10px)",
                  duration: 0.2,
                  ease: "power2.in",
                })
                .add(() => {
                  activePeriod.innerText = newText;
                  activePeriod.style.fontSize = `${fontSizeVw}vw`;
                })
                .to(activePeriod, {
                  opacity: 0.05, // Keep it subtle
                  y: 0,
                  filter: "blur(0px)",
                  duration: 0.4,
                  ease: "power2.out",
                });
            }
          },
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, [updateSectionStatus]);

  return (
    <>
      <div ref={wrapperRef} className="hidden md:block">
        <section
          id="experience"
          ref={sectionRef}
          className="bg-deep-void text-foreground relative z-30 h-screen overflow-hidden"
          style={{
            backgroundColor: "var(--color-deep-void)",
            contain: "layout style paint",
          }}
        >
          {/* Dynamic Parallax Background Layer */}
          <div className="pointer-events-none absolute inset-0 z-0 flex h-full w-full items-center justify-center select-none">
            <span
              ref={activePeriodRef}
              aria-hidden="true"
              className="font-heading max-w-[90vw] text-center leading-none font-bold whitespace-nowrap text-white opacity-5 will-change-[opacity,filter,transform]"
              style={{ fontSize: "5vw" }} // Initial fallback
            >
              {resumeData.experience[0]?.period}
            </span>
          </div>

          {/* Accessible section heading (visually hidden) for sequential heading hierarchy */}
          <h2 className="sr-only">Experience</h2>

          <div className="relative z-10 flex h-full items-center">
            {/* Horizontal Track */}
            <div
              ref={trackRef}
              className="flex items-center gap-8 px-[50vw]"
              // px-[50vw] centers the first card initially
            >
              {resumeData.experience.map((exp, index) => (
                <ExperienceCard
                  key={index}
                  exp={exp}
                  index={index}
                  onSelect={handleSelect}
                  isMobile={false}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      <Modal
        isOpen={!!selectedExp}
        onClose={() => setSelectedExp(null)}
        title={selectedExp?.data.company || ""}
        layoutId={selectedExp ? `card-${selectedExp.data.company}` : undefined}
        className={cn("scrollbar-custom")}
        style={
          {
            "--scrollbar-thumb":
              selectedExp &&
              resumeData.experience.indexOf(selectedExp.data) % 3 === 0
                ? "var(--color-primary)"
                : selectedExp &&
                    resumeData.experience.indexOf(selectedExp.data) % 3 === 1
                  ? "var(--color-secondary)"
                  : "var(--color-accent)",
          } as React.CSSProperties
        }
      >
        {selectedExp && (
          <div className="space-y-8">
            <div>
              <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <p className="text-xl text-white/80 md:text-2xl">
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
                    className="text-muted-foreground flex items-start text-base leading-relaxed md:text-lg"
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
    </>
  );
}
