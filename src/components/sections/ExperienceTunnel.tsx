"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import { useSectionTransition } from "@/hooks/useSectionTransition";
import { resumeData } from "@/data/resume";
import { cn } from "@/lib/utils";
import { Maximize2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

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
        "bg-void/60 group flex h-125 w-full max-w-[90vw] shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-xl border p-6 backdrop-blur-md transition-all duration-300 hover:border-white/40 md:h-150 md:w-150 md:p-8",
        // CSS-driven responsive positioning: Sticky on mobile, Relative on desktop
        "sticky md:relative",
        // Apply top from variable on mobile, auto on desktop
        "top-(--card-top) md:top-auto",
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
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <h3
                className={cn(
                  "font-heading mb-1 text-2xl leading-tight font-bold md:text-3xl",
                  theme.textColor
                )}
              >
                {exp.company}
              </h3>
              <p className="text-lg text-white/80 md:text-xl">{exp.role}</p>
            </div>
            <span
              className={cn(
                "self-start rounded-full border px-3 py-1 font-mono text-xs whitespace-nowrap md:self-auto md:text-sm",
                theme.badgeBg,
                theme.badgeBorder,
                theme.badgeText
              )}
            >
              {exp.period}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {exp.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className={cn(
                  "rounded border border-white/5 px-2 py-0.5 text-[10px] md:text-xs",
                  theme.tagBg,
                  theme.tagText
                )}
              >
                {tech}
              </span>
            ))}
            {exp.techStack.length > 4 && (
              <span className="text-muted-foreground px-2 py-0.5 text-[10px] md:text-xs">
                +{exp.techStack.length - 4} more
              </span>
            )}
          </div>
        </div>

        <ul className="text-muted-foreground grow space-y-3 overflow-hidden">
          {exp.description.slice(0, 3).map((desc, i) => (
            <li key={i} className="flex items-start text-sm md:text-base">
              <span
                className={cn(
                  "mt-1.5 mr-3 h-1.5 w-1.5 shrink-0 rounded-full bg-current",
                  theme.accent
                )}
              />
              <span className="line-clamp-2">{desc}</span>
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
            Expand System
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function ExperienceTunnel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Force vertical layout if on mobile OR reduced motion is preferred
  const isVertical = isMobile || !!shouldReduceMotion;

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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useSectionTransition({
    sectionRef,
    contentRef,
    id: "experience-tunnel",
    isPinned: true,
    enableExit: false, // Handle exit internally
  });

  useEffect(() => {
    if (isVertical) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    const content = contentRef.current;

    if (!section || !track || !content) return;

    const ctx = gsap.context(() => {
      // 1. Horizontal Scroll Pin
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth =
          track.parentElement?.clientWidth || window.innerWidth;
        return -(trackWidth - viewportWidth);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount()) + 500}`, // Reduced from 1500 to 500 for tighter scroll
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      tl.to(track, {
        x: getScrollAmount,
        ease: "none",
        duration: 1, // Normalized duration
      });

      // --- EXIT ANIMATION ---
      // This runs at the end of the scroll duration
      tl.to(content, {
        opacity: 0,
        scale: 1.1, // Reduced scale for subtler exit
        filter: "blur(5px)",
        ease: "power1.in",
        duration: 0.1, // Very short duration at end
      });
    }, section);

    return () => ctx.revert();
  }, [isVertical]);

  return (
    <>
      <section
        id="experience"
        ref={sectionRef}
        className="bg-deep-void text-foreground relative z-30 min-h-screen md:h-screen"
        style={{ backgroundColor: "var(--color-deep-void)" }}
      >
        {" "}
        <div
          ref={contentRef}
          className={cn(
            "w-full md:overflow-hidden", // Base classes
            "relative h-auto",
            "origin-center md:flex md:h-screen md:items-center"
          )}
        >
          <div className="pointer-events-none absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white/10 to-transparent" />
          </div>

          <div className="relative z-10 container mx-auto flex h-full flex-col px-4 md:flex-row md:items-center md:px-0">
            <div className="pointer-events-none absolute top-32 bottom-0 left-0 z-0 flex w-12 items-center justify-center overflow-hidden opacity-10 md:hidden">
              <h2
                className="font-heading text-6xl font-bold whitespace-nowrap text-white"
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              >
                EXPERIENCE
              </h2>
            </div>

            <div className="relative z-10 w-full pt-20 pb-10 pl-10 text-left md:hidden">
              <h2 className="font-heading text-primary mb-2 text-3xl font-bold">
                EXPERIENCE
              </h2>
              <p className="text-muted-foreground text-sm">
                Tap cards for details
              </p>
            </div>

            <div className="pointer-events-none absolute top-1/2 left-10 z-0 hidden -translate-y-1/2 opacity-10 select-none md:block">
              <h2 className="font-heading text-gradient text-[12rem] leading-none font-bold whitespace-nowrap">
                EXPERIENCE
              </h2>
            </div>

            <div
              ref={trackRef}
              className={cn(
                "flex gap-8",
                "w-full flex-col items-center pb-20 pl-6",
                !isVertical &&
                  "md:w-auto md:flex-row md:items-center md:px-20 md:pr-[30vw] md:pl-0" // Added significantly more right padding
              )}
            >
              {resumeData.experience.map((exp, index) => (
                <ExperienceCard
                  key={index}
                  exp={exp}
                  index={index}
                  onSelect={handleSelect}
                  isMobile={isVertical}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Modal
        isOpen={!!selectedExp}
        onClose={() => setSelectedExp(null)}
        title={selectedExp?.data.company || ""}
        layoutId={selectedExp ? `card-${selectedExp.data.company}` : undefined}
        className={cn("scrollbar-custom")}
        style={
          {
            // Use type assertion for custom CSS properties
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
