<!--
Sync Impact Report:
- Version: 1.0.0 -> 1.1.0
- List of modified principles:
    - Dynamic Data Layer: Added specific parsing rules and schema details.
    - Scrolly-telling Motion Script: Added detailed implementation specs for each section.
    - Added "Execution Deliverables" section.
- Added sections:
    - Execution Deliverables (Explicit file list)
- Removed sections: None
- Templates requiring updates:
    - .specify/templates/plan-template.md (✅)
    - .specify/templates/spec-template.md (✅)
    - .specify/templates/tasks-template.md (✅)
- Follow-up TODOs: None
-->
# Rajesh Portfolio Constitution

## Core Principles

### Design Philosophy: "Lively, Grand, & Cyber-Physical"

The site represents the data flow from low-level hardware (Embedded) to high-level UI (React/VR). "From Silicon to Cloud."

- **Color System:** MUST use OKLCH for maximum gamut and vibrancy.
  - Primary (Cloud/Web): Neon Cyan (`oklch(85% 0.2 160)`).
  - Secondary (Hardware/Kernel): Solar Amber (`oklch(75% 0.18 60)`).
  - Accent (Signals): Signal Green (`oklch(70% 0.25 140)`).
  - Base: Deep Void (`oklch(15% 0.02 260)`) to Light Gray (`oklch(95% 0.01 260)`).
- **Texture:** Implement a subtle SVG "Noise" or "Scanline" overlay (`opacity: 0.03`, `pointer-events-none`) over the entire app.
- **Typography:** `next/font`.
  - Headers: **Space Grotesk** (Tech/Industrial feel).
  - Body: **Inter** (Variable).
  - Code/Accents: **JetBrains Mono**.

### Modern Tech Stack (Bleeding Edge)

- **Framework:** **Next.js (Latest Stable)** (App Router, Turbopack).
- **Language:** **TypeScript** (Strict Mode).
- **Styling:** **Tailwind CSS v4** (CSS-First Config).
  - *Constraint:* **NO `tailwind.config.js`**. Define all theme variables and `@theme` blocks directly in `src/app/globals.css`.
- **Scroll Engine:** **Lenis** (Smooth scrolling).
- **Animation:** **Framer Motion** (Component interactions) + **GSAP** (ScrollTrigger for pinning/scrubbing).
- **Icons:** **Lucide React**.

### Dynamic Data Layer

The application content MUST be derived from `src/data/resume.ts`, which is parsed from `docs/profile.pdf`.

- **Schema:**
  - `header`: name, title, tagline, location.
  - `summary`: string.
  - `skills`: categorized (Languages, Frameworks, Embedded/Systems, Cloud/DB).
  - `experience`: company, role, period, type ("Embedded" | "VR/AR" | "Full Stack"), description (bullets), techStack.
  - `contact`: email, phone, linkedin.
- **Contextual Parsing Rules:**
  - "CNH Industrial" -> Type: "Embedded" (Focus on CAN Protocol, BSP, Linux Daemons).
  - "Eagle Creek" -> Type: "VR/AR" (Focus on Unity 3D, OpenGL, Android).
  - "VoxVilla" -> Type: "Full Stack" (Focus on Java, Angular, REST).

### Scrolly-telling Motion Script

Strict implementation specifications for motion and interaction:

- **Preloader:** "System Boot". Typewriter sequence (Kernel -> Android -> React). Splits vertically on exit. Skips if session exists.
- **Global Navigation:** "The Liquid Morph". Transparent full-width -> Centered "Pill" (`bg-void/80`). Mobile "Glitch" menu.
- **Hero:** "The Convergence". Split screen (Cloud vs Hardware) connected by a 3D wireframe spline. Halves pull apart on scroll.
- **About:** "The Full Stack Architecture". GSAP Pin. Isometric stack build-up (Chip -> Middleware -> App).
- **Experience:** "The Timeline Tunnel". Sticky Horizontal Scroll. Glassmorphic cards. VR "3D Tilt" effect on VR/AR cards.
  - *Mobile Fallback:* Vertical timeline for `< 768px`.
- **Skills:** "The Neural Network". Force-Directed Graph. Magnetic nodes. Hover highlights connections.
- **Contact:** "The Terminal". Footer reveal. Retro-modern terminal with interactive CLI (`help`, `email`, etc.).

## Execution Deliverables

The project requires the following file structure and components:

1.  **`src/app/layout.tsx`**: Root layout, Lenis provider, Metadata.
2.  **`src/app/globals.css`**: Tailwind v4 `@theme` configuration.
3.  **`src/lib/utils.ts`**: Helper for `cn`.
4.  **`src/data/resume.ts`**: The parsed data object.
5.  **`src/components/ui/Loader.tsx`**: The boot sequence.
6.  **`src/components/ui/Navbar.tsx`**: Liquid morph navigation.
7.  **`src/components/sections/Hero.tsx`**: Convergence effect.
8.  **`src/components/sections/AboutArchitecture.tsx`**: The Isometric Stack (GSAP).
9.  **`src/components/sections/ExperienceTunnel.tsx`**: Horizontal scroll + Mobile Fallback.
10. **`src/components/sections/SkillsNetwork.tsx`**: Magnetic nodes.
11. **`src/components/sections/ContactTerminal.tsx`**: Footer + CLI.
12. **`src/app/page.tsx`**: Main orchestration.

## Governance

### Amendment Process
1.  Review the "Sync Impact Report" before any change.
2.  Update version number according to Semantic Versioning.
3.  Update `Last Amended` date.

**Version**: 1.1.0 | **Ratified**: 2025-12-17 | **Last Amended**: 2025-12-17