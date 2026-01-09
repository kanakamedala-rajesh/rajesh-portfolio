# Feature Sections

This section deep-dives into the complex, scroll-driven sections of the portfolio.

## 1. Hero Section ("The Convergence")

**File**: `src/components/sections/Hero.tsx`

The Hero section visualizes the bridge between Hardware and Cloud.

- **Visual Structure**:
  - **Top Half**: Represents "Cloud/Application" (Cyan theme, floating code, cloud icons).
  - **Bottom Half**: Represents "Hardware/Kernel" (Amber theme, PCB patterns, C++ code).
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

An isometric representation of Rajesh's full-stack expertise.

- **Visual Structure**: Three 3D planes stacked vertically in an isometric view.
  1. **Bottom**: Hardware (Embedded Linux).
  2. **Middle**: Middleware (Android/HAL).
  3. **Top**: Cloud (React/Next.js).
- **Animation (GSAP)**:
  - **Trigger**: Scroll (Pinned for 300% viewport height).
  - **Sequence**:
    1. **Explosion**: Layers expand vertically from a compressed state.
    2. **Focus Steps**: Scroll progress highlights each layer sequentially (Hardware -> Middleware -> Cloud) while dimming the others. Text panels on the left fade in/out to match the active layer.
    3. **Exit**: Layers collapse and fade out.

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

- **Desktop Layout ("Curated Constellation")**:
  - **Deterministic Generation**: Unlike a live simulation, nodes are placed based on pre-calculated centers (`CATEGORY_CENTERS`) with a slight random offset for an organic look. This ensures layout stability.
  - **Parallax**: Uses `framer-motion` `useSpring` and `useTransform` to create a 3D depth effect where categories (background) and skills (foreground) move at different rates based on cursor position.
  - **Interaction**:
    - **Hover**: Highlights the node and its connections (via SVG lines).
    - **Click**: "Locks" the focus on a node.
- **Mobile Layout ("The Data Centrifuge")**:
  - **Concept**: A "Scrolly-telling" experience where scrolling triggers a rotation of a central "Neural HUD".
  - **Mechanism**: `framer-motion` `whileInView` triggers state updates (`setActiveCategoryIndex`) which rotates the fixed background HUD to match the active skill category.

## 5. Contact Section ("The Terminal")

**File**: `src/components/sections/ContactTerminal.tsx`

A functional, retro-futuristic CLI terminal that doubles as the site footer.

- **Footer Reveal Effect**:
  - **Mechanism**: Achieved via `src/app/page.tsx`.
    - Main content has `mb-[100vh]` (margin-bottom equal to viewport height).
    - Footer is `fixed` at the bottom with `z-0`.
    - As the user scrolls the last screen of main content, the footer is "revealed" underneath.
- **Terminal Logic**:
  - **State**: Tracks `input` and `history` (array of commands/outputs).
  - **Commands**:
    - `help`: Lists commands.
    - `email`: Opens `mailto`.
    - `linkedin`, `resume`: Opens external links.
    - `clear`: Resets history.
    - `whoami`: Returns user identity.
- **Visuals**:
  - Uses `scrollRef` to auto-scroll to the bottom of the terminal on new output.
  - Styled with a "Cyber Grid" background and glassmorphic panels.
