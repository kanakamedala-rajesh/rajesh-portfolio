/**
 * Global animation and motion constants for consistent cinematic feel.
 */
export const MOTION_CONSTANTS = {
  // Durations
  DURATIONS: {
    FAST: 0.5,
    NORMAL: 1.0,
    SLOW: 2.0,
    EXTENDED: 3.0,
  },

  // Easings (GSAP compatible strings)
  EASE: {
    IN_OUT: "power2.inOut",
    OUT: "power2.out",
    IN: "power1.in",
    EXPO_OUT: "expo.out",
    SMOOTH: "power3.inOut",
  },

  // Scroll Configuration
  SCROLL: {
    PIN_END: "+=250%",
    SCRUB: 1,
  },
} as const;
