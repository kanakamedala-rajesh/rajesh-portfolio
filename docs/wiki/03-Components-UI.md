# Components & UI System

This section details the reusable UI components and the global styling strategy that defines the "Cinematic" look and feel.

## 1. Global Styling (`src/app/globals.css`)

The project utilizes **Tailwind CSS v4** with a "CSS-first" configuration approach. Instead of a `tailwind.config.js`, variables are defined directly in the CSS using the `@theme` directive.

### Color Palette (OKLCH)

The system uses the OKLCH color space for maximum vibrancy on modern displays.

- **Primary (`--color-primary`)**: Neon Cyan (`oklch(85% 0.2 160)`) - Represents Cloud/Web.
- **Secondary (`--color-secondary`)**: Solar Amber (`oklch(75% 0.18 60)`) - Represents Hardware/Kernel.
- **Accent (`--color-accent`)**: Signal Green (`oklch(70% 0.25 140)`) - Represents Active State/Signals.
- **Background (`--color-deep-void`)**: Deep Void (`oklch(15% 0.02 260)`) - The base canvas.

### Custom Utilities

- **`.texture-overlay`**: An SVG fractal noise filter applied globally to give a tactical, hardware grain to the UI.
- **`.moving-border-overlay`**: A CSS animation that creates a "laser beam" traveling along the border of the navigation pill.
- **`.cyber-grid`**: A background pattern resembling a schematic grid.
- **`.glass-panel`**: A standardized class for glassmorphic elements (`bg-deep-void/60`, `backdrop-blur-xl`, `border-white/10`) used in the Architecture HUD and Skills Instruction pill.

## 2. Core UI Components (`src/components/ui/`)

### `Loader.tsx` ("The System Boot")

- **Purpose**: Simulates a kernel boot sequence on initial load.
- **Behavior**:
  - Displays lines of text sequentially (Kernel -> Runtime -> React).
  - Uses a "curtain" reveal effect to transition to the main page.
  - **Optimization**: Checks `sessionStorage` ("rk_portfolio_visited") to skip the animation on subsequent visits.
  - **Accessibility**: Respects `prefers-reduced-motion` to simplify the exit animation.

### `Navbar.tsx` ("The Liquid Morph" + "Liquid Dissolve")

- **Purpose**: Global navigation that adapts to scroll state and direction.
- **Behavior**:
  - **State A (Top)**: Transparent, full-width.
  - **State B (Scrolled)**: Morphs into a centered, glassmorphic pill shape (`rounded-full`) with a "laser beam" moving border.
  - **Directional Awareness**:
    - **Scroll Down**: The navbar executes a "Liquid Dissolve" (translates up, blurs, and stretches horizontally) to maximize content immersion.
    - **Scroll Up**: Instantly snaps back into view.
  - **Active Section Highlighting**:
    - **Visual Detection**: Uses direct DOM measurement (`getBoundingClientRect`) to identify which section covers the viewport center. This ensures 100% accuracy for pinned sections (About/Experience) and standard sections (Skills/Contact).
    - **Style**: The active link is highlighted in **Neon Cyan (`--color-primary`)** with a subtle drop-shadow glow.
  - **Mobile**: Features a full-screen overlay menu with staggered entry animations for links.
- **Interaction**:
  - Links trigger smooth scrolling via `Lenis` (or native fallback).
  - **Hover Effect**:
    - High-contrast **Solar Amber (`--color-secondary`)** underline.
    - **Optimized Performance**: 3px thick line with "spring" physics.
    - **Flicker-Free**: Hover logic is handled at the container level to maintain continuous animation when moving between links.
- **Tech Stack**: Uses `gsap.ScrollTrigger` for robust direction detection and `framer-motion` for the dissolve/snap animations.

### `PageWrapper.tsx`

- **Purpose**: Wraps the page content to ensure consistent padding/margins or to apply global page transitions if needed.
- **Current Usage**: Ensures content sits above the fixed background layers.
