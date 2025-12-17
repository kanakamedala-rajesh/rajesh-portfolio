<!--
Sync Impact Report:
- Version: 0.0.0 -> 1.0.0
- List of modified principles:
    - [PRINCIPLE_1_NAME] -> Design Philosophy: "Lively, Grand, & Cyber-Physical"
    - [PRINCIPLE_2_NAME] -> Modern Tech Stack (Bleeding Edge)
    - [PRINCIPLE_3_NAME] -> Scrolly-telling Motion Script
    - [PRINCIPLE_4_NAME] -> Dynamic Data Layer
    - [PRINCIPLE_5_NAME] -> Removed
- Added sections:
    - Execution Deliverables
    - Responsiveness & Fallbacks
- Removed sections: None
- Templates requiring updates:
    - .specify/templates/plan-template.md (✅ updated implicitly via reference)
    - .specify/templates/spec-template.md (✅ updated implicitly via reference)
    - .specify/templates/tasks-template.md (✅ updated implicitly via reference)
- Follow-up TODOs: None
-->
# Rajesh Kanakamedala Portfolio Constitution

## Core Principles

### Design Philosophy: "Lively, Grand, & Cyber-Physical"

The site represents the data flow from low-level hardware (Embedded) to high-level UI (React/VR).

- **Concept:** "From Silicon to Cloud."
- **Color System:** MUST use OKLCH for maximum gamut. 
  - Primary: Neon Cyan (`oklch(85% 0.2 160)`)
  - Secondary: Solar Amber (`oklch(75% 0.18 60)`)
  - Accent: Signal Green (`oklch(70% 0.25 140)`)
  - Base: Deep Void (`oklch(15% 0.02 260)`) to Light Gray (`oklch(95% 0.01 260)`).
- **Texture:** Implement a subtle SVG "Noise" or "Scanline" overlay (`opacity: 0.03`, `pointer-events-none`) globally.
- **Typography:** Space Grotesk (Headers), Inter (Body), JetBrains Mono (Code).

### Modern Tech Stack (Bleeding Edge)

STRICT adherence to the following stack and constraints:

- **Framework:** Next.js (Latest Stable, App Router, Turbopack).
- **Language:** TypeScript (Strict Mode).
- **Styling:** Tailwind CSS v4 (CSS-First Config). **CONSTRAINT:** NO `tailwind.config.js`. Define all theme variables and `@theme` blocks directly in `src/app/globals.css`.
- **Motion:** Lenis (Smooth Scroll), Framer Motion (Component Interactions), GSAP (ScrollTrigger for pinning/scrubbing).
- **Icons:** Lucide React.

### Scrolly-telling Motion Script

The application is defined by specific motion interactions which MUST be implemented as specified:

- **Preloader:** "System Boot" sequence (Kernel -> Android -> React).
- **Nav:** "Liquid Morph" (Transparent -> Pill).
- **Hero:** "The Convergence" (Split screen pulling apart; Cloud vs Hardware).
- **About:** "The Full Stack Architecture" (GSAP Pin, Isometric stack build-up).
- **Experience:** "The Timeline Tunnel" (Sticky Horizontal Scroll with VR tilt effect).
- **Skills:** "The Neural Network" (Force-directed graph, magnetic nodes).
- **Contact:** "The Terminal" (Footer reveal + interactive CLI).

### Dynamic Data Layer

Content MUST be driven by a strongly-typed data layer (`src/data/resume.ts`).

- **Schema:** Defined `ResumeData` interface including header, summary, skills, experience (with specific "Embedded" | "VR/AR" | "Full Stack" types), and contact.
- **Parsing:** Data is derived/parsed from the user's `Profile.pdf` context.

## Execution Deliverables

The project MUST adhere to this specific file structure and deliverable list:

1. `src/app/layout.tsx`: Root layout, Lenis provider, Metadata.
2. `src/app/globals.css`: Tailwind v4 `@theme` configuration.
3. `src/lib/utils.ts`: Helper for `cn`.
4. `src/data/resume.ts`: The parsed data object.
5. `src/components/ui/Loader.tsx`: The boot sequence.
6. `src/components/ui/Navbar.tsx`: Liquid morph navigation.
7. `src/components/sections/Hero.tsx`: Convergence effect.
8. `src/components/sections/AboutArchitecture.tsx`: The Isometric Stack.
9. `src/components/sections/ExperienceTunnel.tsx`: Horizontal scroll.
10. `src/components/sections/SkillsNetwork.tsx`: Magnetic nodes.
11. `src/components/sections/ContactTerminal.tsx`: Footer + CLI.
12. `src/app/page.tsx`: Main orchestration.

## Responsiveness & Fallbacks

- **Mobile First:** All complex animations MUST have functional mobile fallbacks.
- **Experience Section:** On devices `< 768px`, disable horizontal scroll. Render cards as a standard vertical timeline with a connecting dashed line on the left.
- **VR Effects:** 3D Tilt effects should be disabled or simplified on touch devices.

## Governance

### Implementation Standards

- **Strict Typing:** No `any`. All data structures must be defined in TypeScript interfaces.
- **Component Structure:** Atomic design principles not strictly enforced but modularity is required.
- **Version Control:** Commit messages must follow conventional commits.

**Version**: 1.0.0 | **Ratified**: 2025-12-17 | **Last Amended**: 2025-12-17
