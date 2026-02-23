import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSectionContext } from "@/context/SectionContext";

gsap.registerPlugin(ScrollTrigger);

interface UseSectionTransitionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLElement | null>;
  id: string;
  isPinned?: boolean;
  enableExit?: boolean;
  enableEntry?: boolean;
}

export const useSectionTransition = ({
  sectionRef,
  contentRef,
  id,
  isPinned = false,
  enableExit = true,
  enableEntry = true,
}: UseSectionTransitionProps) => {
  const { registerSection, updateSectionStatus } = useSectionContext();

  useEffect(() => {
    registerSection(id);

    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // --- ENTRY ANIMATION ---
      if (enableEntry) {
        gsap.fromTo(
          content,
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 1,
            scale: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",
              scrub: true,
              onUpdate: (self) => {
                updateSectionStatus(id, "entering", self.progress);
              },
              onLeave: () => {
                updateSectionStatus(id, "active", 1);
              },
              onEnterBack: () => {
                updateSectionStatus(id, "entering", 1);
              },
            },
          }
        );
      } else {
        // If entry is disabled, assume active immediately or handled elsewhere
        updateSectionStatus(id, "active", 0);
      }

      // --- EXIT ANIMATION ---
      if (enableExit) {
        gsap.fromTo(
          content,
          {
            opacity: 1,
            scale: 1,
          },
          {
            opacity: 0,
            scale: 1.2,
            ease: "power1.in",
            scrollTrigger: {
              trigger: section,
              // For standard sections: Exit starts when bottom of section hits bottom of viewport
              // and ends when bottom of section hits top of viewport.
              start: "bottom bottom",
              end: "bottom top",
              scrub: true,
              onUpdate: (self) => {
                updateSectionStatus(id, "exiting", self.progress);
              },
              onEnterBack: () => {
                updateSectionStatus(id, "exiting", 1);
              },
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [
    sectionRef,
    contentRef,
    id,
    isPinned,
    enableExit,
    enableEntry,
    registerSection,
    updateSectionStatus,
  ]);
};
