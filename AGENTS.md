# Critical Implementation Rules

**STRICT ADHERENCE REQUIRED:**

1. **NO HALLUCINATIONS OR ASSUMPTIONS:** Do not invent data, files, or requirements.
2. **VERIFY CONTEXT:** Always check existing project structure, files, and configuration before acting.
3. **USE EXPLICIT DATA:** Rely solely on provided inputs (e.g., `Profile.pdf`, specifications).
4. **REFERENCE PATTERNS:** Follow established code styles and architectural patterns.
5. **VALIDATE SCHEMA:** Ensure all data and code strictly match defined schemas (e.g., `ResumeData`).
6. **CONFIRM REQUIREMENTS:** Double-check specifications against the prompt.
7. **SEEK CLARIFICATION:** If ambiguity exists, **ASK THE USER** before proceeding.
8. **VERIFY LATEST DOCS:** Use the Context7 tools `resolve-library-id` and `get-library-docs` to retrieve up-to-date API usage for critical dependencies (Next.js 16, React 19, Tailwind v4, GSAP, Framer Motion) before coding.
9. **WEB SEARCHES:** For general web searches, use the `google_web_search` tool.
10. **PACKAGE MANAGER:** Always use `pnpm` instead of `npm` or `yarn` for all package management and script execution tasks.
11. **VERIFY STANDARDS:** Before finalizing the implementation, run `pnpm lint`, `pnpm check-format`, `pnpm type-check`, `pnpm test` and `pnpm build`. Ensure these scripts pass **WITHOUT ANY WARNINGS OR ERRORS**. Fix all issues before considering the task complete.
12. **DOCUMENTATION:** All newly written code MUST include comprehensive JSDoc comments for functions, interfaces, and components. Explain the 'why' and 'how' of complex logic. Ensure top-level file comments describe the file's purpose.
13. **ISSUES FIXING:** **ALWAYS** understand the issue and find the root cause first before fixing it, **STRICTLY** Try find an efficient way to fix the issue.

# Role: Principal Frontend Architect & Creative Technologist

**Objective:** Generate the **complete, runnable source code** for a high-performance, cinematic **"Scrolly-telling"** portfolio for **Rajesh Kanakamedala**.
**Input Data:** The user will provide a file named `docs/profile.pdf`. Parse this file to extract **all** content (Summary, Experience, Skills, Contact) for the data layer.

## 1. Design Philosophy: "Lively, Grand, & Cyber-Physical"

- **Concept:** "From Silicon to Cloud." The site represents the data flow from low-level hardware (Embedded) to high-level UI (React/VR).
- **Color System (OKLCH):** Use **OKLCH** for maximum gamut and vibrancy.
  - _Primary (Cloud/Web):_ Neon Cyan (`oklch(85% 0.2 160)`).
  - _Secondary (Hardware/Kernel):_ Solar Amber (`oklch(75% 0.18 60)`).
  - _Accent (Signals):_ Signal Green (`oklch(70% 0.25 140)`).
  - _Base:_ Deep Void (`oklch(15% 0.02 260)`) to Light Gray (`oklch(95% 0.01 260)`).
- **Texture:** Implement a subtle SVG "Noise" or "Scanline" overlay (`opacity: 0.03`, `pointer-events-none`) over the entire app to give it a tactical, hardware feel.
- **Typography:** `next/font`.
  - Headers: **Space Grotesk** (Tech/Industrial feel).
  - Body: **Inter** (Variable).
  - Code/Accents: **JetBrains Mono**.

## 2. Modern Tech Stack (Bleeding Edge)

- **Framework:** **Next.js (Latest Stable)** (App Router, Turbopack).
- **Language:** **TypeScript** (Strict Mode).
- **Styling:** **Tailwind CSS v4** (CSS-First Config).
  - _Constraint:_ **NO `tailwind.config.js`**. Define all theme variables and `@theme` blocks directly in `src/app/globals.css`.
- **Scroll Engine:** **Lenis** (Smooth scrolling).
- **Animation:** **Framer Motion** (Component interactions) + **GSAP** (ScrollTrigger for pinning/scrubbing).
- **Icons:** **Lucide React**.

## 3. Dynamic Data Layer (`src/data/resume.ts`)

- **Requirement:** Parse `docs/profile.pdf` and export a strongly-typed `const resumeData`.
- **Schema Definition:**

  ```typescript
  interface ResumeData {
    header: { name: string; title: string; tagline: string; location: string };
    summary: string;
    skills: {
      category: "Languages" | "Frameworks" | "Embedded/Systems" | "Cloud/DB";
      items: string[];
    }[];
    experience: {
      company: string;
      role: string;
      period: string;
      type: "Embedded" | "VR/AR" | "Full Stack"; // Deriving from PDF context
      description: string[]; // Bullet points
      techStack: string[];
    }[];
    contact: { email: string; phone: string; linkedin: string };
  }
  ```

- **Contextual Parsing Rules:**
  - Extract "CNH Industrial" -> Type: "Embedded" (Focus on CAN Protocol, BSP, Linux Daemons).
  - Extract "Eagle Creek" -> Type: "VR/AR" (Focus on Unity 3D, OpenGL, Android).
  - Extract "VoxVilla" -> Type: "Full Stack" (Focus on Java, Angular, REST).

## 4. Scrolly-telling Motion Script (Strict Implementation Specs)

### 0. The Preloader: "System Boot"

- **Initial State:** Full screen black overlay (`z-index: 50`).
- **Sequence:**
  1. Typewriter text: `> INITIALIZING KERNEL...` (Green).
  2. `> LOADING ANDROID RUNTIME...` (Amber).
  3. `> HYDRATING REACT ROOT...` (Cyan).
- **Exit:** Overlay splits vertically (curtain effect).
- **UX Requirement:** If user has visited before (sessionStorage), skip animation.

### 1. Global Navigation: "The Liquid Morph"

- **State A (Top):** Transparent, full width. Logo: "RK" (Monospace).
- **State B (Scrolled):** Morphs into a centered "Pill" (`bg-void/80`, `backdrop-blur`).
- **Mobile:** Hamburger menu triggers a full-screen "Glitch" overlay effect before showing links.

### 2. Section A: Hero -> "The Convergence"

- **Layout:** `h-screen`, `sticky`, `top-0`.
- **Visual:** Split screen representing Rajesh's dual expertise.
  - _Top Half (Cloud):_ Cyan glow, floating abstract UI elements (React symbols).
  - _Bottom Half (Hardware):_ Amber glow, wireframe PCB traces.
  - _The Connection:_ A 3D wireframe spline connects the bottom to the top.
- **Scroll Interaction:**
  - As user scrolls, the two halves "pull apart" to reveal the content.
  - The connecting spline glows (SVG path length animation) as if data is transmitting from Hardware to Cloud.

### 3. Section B: About -> "The Full Stack Architecture"

- **Mechanism:** **GSAP Pin**. `trigger: section, start: "top top", end: "+=300%"`.
- **Visual:** An isometric representation of an Architecture Stack (Bottom-up).
- **Timeline:**
  1. **Phase 1 (Hardware):** A "Chip" or PCB graphic slides in. Text: "Embedded Linux & BSP" (Resume: CNH Industrial details).
  2. **Phase 2 (Middleware):** A block drops onto the Chip. Text: "Android Native & HAL" (Resume: JNI, C++ Daemons).
  3. **Phase 3 (Application):** A UI layer floats on top. Text: "Cloud & React" (Resume: Web/VR Apps).
- **Decoration:** Animated "particles" flow continuously from the bottom block to the top block.

### 4. Section C: Experience -> "The Timeline Tunnel"

- **Mechanism:** **Sticky Horizontal Scroll**.
- **Structure:** A `div` with `h-[400vh]` acts as the scroll track. The content `div` is sticky and translates `x` based on scroll progress.
- **Cards:** Glassmorphic cards containing Experience data.
- **VR Special Effect (Eagle Creek Card):**
  - When this card enters the viewport, trigger a "3D Tilt" effect based on mouse position (use `framer-motion` `useMotionValue`).
  - Background of this card should use a subtle WebGL distortion or static image of a wireframe mesh to signify VR.
- **Mobile Fallback:** On devices `< 768px`, disable horizontal scroll. Render cards as a standard vertical timeline with a connecting dashed line on the left.

### 5. Section D: Skills -> "The Neural Network"

- **Layout:** `min-h-screen`.
- **Visual:** Force-Directed Graph simulation (simulated via Framer Motion layout).
- **Nodes:** Skills (Java, C++, React, etc.) are circles.
- **Edges:** Draw SVG lines between related skills (e.g., Line between "Java" and "Android", "C++" and "Embedded Linux").
- **Interaction:**
  - _Magnetic:_ Nodes slightly follow the cursor within a radius.
  - _Hover:_ Hovering a node highlights all connected nodes (e.g., Hover "Android" -> highlights "Java", "Kotlin", "JNI").

### 6. Section E: Contact -> "The Terminal"

- **Layout:** Footer Reveal (Fixed bottom, previous section lifts up).
- **Design:** A retro-modern Terminal window.
- **Content:**
  - Left col: Contact Info (parsed from PDF).
  - Right col: An interactive command line input `user@rk-portfolio:~$`.
  - _Interaction:_ If user types `help`, list commands (`email`, `linkedin`, `resume`). Typing `email` opens `mailto`.

## 5. Execution Deliverables

_Generate the complete code for the following file structure. Ensure rigorous type safety._

1. **`src/app/layout.tsx`**: Root layout, Lenis provider, Metadata (SEO).
2. **`src/app/globals.css`**: Tailwind v4 `@theme` configuration.
3. **`src/lib/utils.ts`**: Helper for `cn` (clsx/tailwind-merge).
4. **`src/data/resume.ts`**: The parsed data object.
5. **`src/components/ui/Loader.tsx`**: The boot sequence.
6. **`src/components/ui/Navbar.tsx`**: Liquid morph navigation.
7. **`src/components/sections/Hero.tsx`**: Convergence effect.
8. **`src/components/sections/AboutArchitecture.tsx`**: The Isometric Stack (GSAP).
9. **`src/components/sections/ExperienceTunnel.tsx`**: Horizontal scroll + Mobile Fallback.
10. **`src/components/sections/SkillsNetwork.tsx`**: Magnetic nodes.
11. **`src/components/sections/ContactTerminal.tsx`**: Footer + CLI.
12. **`src/app/page.tsx`**: Main orchestration.
