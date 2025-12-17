# Implementation Plan: Cinematic Scrolly-telling Portfolio

**Status**: Ready for Implementation
**Branch**: `001-cinematic-portfolio`

## Phase 1: Setup & Data Foundation

1.  **Dependencies**: Install `framer-motion`, `gsap`, `lucide-react`, `lenis`, `clsx`, `tailwind-merge`.
2.  **Structure**:
    - `src/app/globals.css` (Tailwind v4 Theme)
    - `src/lib/utils.ts` (Classname helper)
    - `src/data/resume.ts` (Implement `ResumeData` interface and populate with mapped data).

## Phase 2: Core UI System

1.  **Typography**: Configure `next/font` (`Space Grotesk`, `Inter`, `JetBrains Mono`) in `layout.tsx`.
2.  **Smooth Scroll**: Implement `Lenis` provider in `layout.tsx`.
3.  **Loader**: Create `src/components/ui/Loader.tsx` ("System Boot" sequence).
4.  **Navbar**: Create `src/components/ui/Navbar.tsx` (Liquid Morph effect).

## Phase 3: Hero & About ("The Convergence")

1.  **Hero**: Create `src/components/sections/Hero.tsx`.
    - Split screen layout (Cyan/Amber).
    - Scroll-linked SVG Path animation (Spline).
2.  **About**: Create `src/components/sections/AboutArchitecture.tsx`.
    - GSAP ScrollTrigger setup.
    - Isometric visual construction (Hardware -> Middleware -> Cloud).

## Phase 4: Experience & Skills ("The Tunnel & Network")

1.  **Experience**: Create `src/components/sections/ExperienceTunnel.tsx`.
    - Sticky container `h-[400vh]`.
    - `transform: translateX` based on scroll.
    - Mobile Fallback (Vertical list).
    - **Special**: Eagle Creek card 3D Tilt (Framer Motion).
2.  **Skills**: Create `src/components/sections/SkillsNetwork.tsx`.
    - Force-Directed Graph (D3 or Framer Motion physics).
    - Magnetic nodes.

## Phase 5: Contact & Polishing ("The Terminal")

1.  **Contact**: Create `src/components/sections/ContactTerminal.tsx`.
    - CLI Input logic.
    - Footer reveal animation.
2.  **Composition**: Assemble all sections in `src/app/page.tsx`.
3.  **Review**: Verify against `AGENTS.md` specs and `data-mapping.md`.
