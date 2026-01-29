# Feature Sections

This section deep-dives into the complex, scroll-driven sections of the portfolio.

## 1. Hero Section ("The Convergence")

**File**: `src/components/sections/Hero.tsx`

The Hero section visualizes the bridge between Hardware and Cloud.

- **Visual Structure**:
  - **Top Half**: Represents "Cloud/Application" (Cyan theme, floating code, cloud icons).
  - **Bottom Half**: Represents "Hardware/Kernel" (Amber theme, PCB patterns, C++ code). **Note**: The bottom border and shadow have been removed to ensure a seamless visual blend with the subsequent "About" section's deep-void background.
  - **Connection**: A 3D SVG spline connects the two halves.
- **Animation (GSAP)**:
  - **Trigger**: Scroll.
  - **Effect**:
    1. The section is pinned.
    2. As user scrolls, the top and bottom halves move apart (`yPercent: -100` / `100`).
    3. The central content (Name, Title) "pops" in with a blur reveal.
    4. The connecting spline straightens and "snaps" as if transferring data.
- **Parallax**: Background and content move at different speeds during exit.

## 2. About Section ("The Architecture Stack")

**File**: `src/components/sections/AboutArchitecture.tsx`

An isometric representation of Rajesh's full-stack expertise, updated with a "Glass HUD" aesthetic.

- **Visual Structure**:
  - **3D Stack**: Three isometric layers with distinct visual themes:
    1.  **Bottom (Hardware)**: Amber theme with PCB pattern.
    2.  **Middle (Middleware)**: Green theme with digital rain texture and side connector ports.
    3.  **Top (Cloud)**: Cyan theme with a network mesh overlay and floating data nodes.
  - **Text Content**: Replaced plain text with **Glassmorphic Info Cards** (`backdrop-blur-xl`, `bg-deep-void/60`) for better readability and a premium feel.
- **Layout Strategy**:
  - **Desktop**: A dynamic "Zig-Zag" pattern (Hardware: Bottom-Left -> Middleware: Center-Right -> Cloud: Top-Left) to guide the eye.
  - **Mobile**: A unified "Bottom Sheet" approach where cards slide up from the bottom while the stack remains centered.
- **Animation (GSAP)**:
  - **Trigger**: Scroll (Pinned for 350% viewport height).
  - **Timing**: Text card reveals are slowed to `1.2s` with `power3.out` easing for a "buttery smooth" entrance.
  - **Logic**: Uses `gsap.matchMedia` to execute distinct timeline logic for Mobile vs. Desktop.

## 3. Experience Section ("The Tunnel")

**File**: `src/components/sections/ExperienceTunnel.tsx`

A chronological timeline of professional experience.

- **Architecture**:
  - Uses a **Split Implementation** strategy based on screen width.
  - **Desktop (`DesktopExperience.tsx`)**:
    - **Horizontal Scroll**: A container pinned explicitly while content translates horizontally (`x: -100%`).
    - **3D Tilt**: Cards (specifically VR/AR roles) respond to mouse movement with a 3D tilt effect.
  - **Mobile (`MobileExperienceStack.tsx`)**:
    - **Vertical Stack**: A standard vertical list or a "stacking cards" effect for better mobile usability.
    - **Logic**: A `useEffect` listener toggles between the two components based on window width (`< 768px`).

## 4. Skills Section ("The Network")

**File**: `src/components/sections/SkillsNetwork.tsx`

A visually rich, interactive representation of technical skills.

- **Visual Updates**:
  - Removed shadow artifacts from category nodes for cleaner blending.
  - Added **Vertical HUD Sidebars**: Fixed bracket-style indicators on the left and right edges (Desktop) to guide interaction (e.g., "HOVER TO DECRYPT").
- **Desktop Layout ("Curated Constellation")**:
  - **Deterministic Generation**: Nodes placed based on pre-calculated centers (`CATEGORY_CENTERS`).
  - **Parallax**:
    - **Mouse**: `framer-motion` `useSpring` creates a 3D depth effect.
    - **Scroll**: Added `useScroll` transforms. The Background Title ("SKILLS") moves slower than the scroll (`y` transform), and the main graph scales/fades on entry/exit.
- **Mobile Layout ("The Data Centrifuge")**:
  - **Concept**: "Scrolly-telling" with a sticky background layer.
  - **Layout**: The "Neural HUD" stays fixed (sticky) while content cards scroll over it.

## 5. Contact Section ("The Terminal")

**File**: `src/components/sections/ContactTerminal.tsx`

A functional, retro-futuristic CLI terminal.

- **Visual Updates**:
  - Removed the top gradient overlay to eliminate the visible seam between the Skills and Contact sections.
- **Animation (GSAP Parallax)**:
  - **Trigger**: `ScrollTrigger` with `scrub: 1`.
  - **Effect**:
    - **Left Column (Text)**: Scrubs `y` from `100` to `0`.
    - **Right Column (Terminal)**: Scrubs `y` from `200` to `0` with a slight delay. This difference in speed creates a "heavy," cinematic parallax reveal as the section enters the viewport.
- **Terminal Logic**:
  - Functional CLI (help, email, linkedin, resume, clear, whoami).
