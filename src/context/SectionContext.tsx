"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useMemo,
  ReactNode,
  useCallback,
} from "react";

/**
 * Section status type for high-level coordination.
 */
type SectionStatus = "entering" | "active" | "exiting" | "idle";

interface SectionContextType {
  registerSection: (id: string) => void;
  updateSectionStatus: (
    id: string,
    status: SectionStatus,
    progress: number
  ) => void;
  getSectionStatus: (id: string) => { status: SectionStatus; progress: number };
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

/**
 * SectionProvider manages the global state of page sections.
 *
 * Performance Optimization:
 * Progress updates are high-frequency (every scroll frame). Storing them in React state
 * causes global re-renders. We use a `useRef` to store progress values and only
 * use `useState` for discrete status changes.
 */
export const SectionProvider = ({ children }: { children: ReactNode }) => {
  // Discrete status updates trigger re-renders
  const [sectionStatuses, setSectionStatuses] = useState<
    Record<string, SectionStatus>
  >({});

  // High-frequency progress updates are stored in a ref to avoid re-renders
  const progressMap = useRef<Record<string, number>>({});

  const registerSection = useCallback((id: string) => {
    setSectionStatuses((prev) => {
      if (prev[id]) return prev;
      progressMap.current[id] = 0;
      return { ...prev, [id]: "idle" };
    });
  }, []);

  const updateSectionStatus = useCallback(
    (id: string, status: SectionStatus, progress: number) => {
      // Update progress ref (no re-render)
      progressMap.current[id] = progress;

      // Only trigger state update if status actually changed
      setSectionStatuses((prev) => {
        if (prev[id] === status) return prev;
        return { ...prev, [id]: status };
      });
    },
    []
  );

  /**
   * Returns the current status and progress of a section.
   *
   * @warning `progress` is read from a Ref and does NOT trigger re-renders.
   * Do not use `progress` in dependency arrays for effects that need to react to changes.
   * Use `useFrame` or `gsap.ticker` to poll it if needed for animation.
   */
  const getSectionStatus = useCallback(
    (id: string) => {
      return {
        status: sectionStatuses[id] || "idle",
        progress: progressMap.current[id] || 0,
      };
    },
    [sectionStatuses]
  );

  const value = useMemo(
    () => ({
      registerSection,
      updateSectionStatus,
      getSectionStatus,
    }),
    [registerSection, updateSectionStatus, getSectionStatus]
  );

  return (
    <SectionContext.Provider value={value}>{children}</SectionContext.Provider>
  );
};

export const useSectionContext = () => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error("useSectionContext must be used within a SectionProvider");
  }
  return context;
};
