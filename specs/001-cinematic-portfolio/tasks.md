# Tasks: Cinematic Scrolly-telling Portfolio

**Feature**: `001-cinematic-portfolio`
**Status**: Pending
**Progress**: 5/33

## Phase 1: Setup

**Goal**: Initialize project dependencies, global styles, and data layer.
**Independent Test Criteria**: Project builds without errors; global styles (fonts, colors) are visible.

- [x] T001 Install dependencies (framer-motion, gsap, @gsap/react, lenis, lucide-react, three, @types/three, @react-three/fiber, @react-three/drei, d3-force, @types/d3-force)
- [x] T002 Configure Tailwind v4 colors and fonts in `src/app/globals.css`
- [x] T003 Create `cn` utility in `src/lib/utils.ts`
- [x] T004 Create typed data layer in `src/data/resume.ts`
- [x] T005 Setup Playwright for E2E testing with `npx playwright install`

## Phase 2: Foundational

**Goal**: Establish the core layout and scrolling infrastructure.
**Independent Test Criteria**: Page scrolls smoothly; Layout wraps content correctly.

- [x] T006 [P] Create `SmoothScroll` client component in `src/components/ui/SmoothScroll.tsx`
- [x] T007 Integrate `SmoothScroll` provider in `src/app/layout.tsx`
- [x] T007a Implement global "Noise/Scanline" SVG overlay in `src/app/layout.tsx` (pointer-events-none)

## Phase 3: User Story 1 - System Boot & Navigation (P1)

**Goal**: Implement the "System Boot" preloader and morphing navigation bar.
**Independent Test Criteria**: Boot sequence plays on first visit only; Navbar morphs on scroll; Mobile menu works.

- [ ] T008 [US1] Create `Loader` component in `src/components/ui/Loader.tsx` with typewriter effect and vertical split exit animation
- [ ] T009 [US1] Implement session storage logic for "play once" in `src/components/ui/Loader.tsx`
- [ ] T010 [US1] Create `Navbar` component in `src/components/ui/Navbar.tsx`
- [ ] T011 [US1] Implement scroll-triggered morph animation (Transparent -> Pill) in `src/components/ui/Navbar.tsx`
- [ ] T012 [US1] Implement mobile "Glitch" menu overlay in `src/components/ui/Navbar.tsx`
- [ ] T013 [US1] Add E2E test for Boot sequence and Navbar behavior in `tests/boot-nav.spec.ts`

## Phase 4: User Story 2 - The Convergence (Hero) (P1)

**Goal**: Build the split-screen Hero section with "Hardware to Cloud" visualization.
**Independent Test Criteria**: Split screen separates on scroll; Spline connects halves.

- [ ] T014 [US2] Create `Hero` section component in `src/components/sections/Hero.tsx`
- [ ] T015 [US2] Implement split-screen layout (Hardware vs Cloud) with CSS Grid/Flex in `src/components/sections/Hero.tsx`
- [ ] T016 [US2] Implement scroll-linked "pull apart" animation with GSAP/Framer in `src/components/sections/Hero.tsx`
- [ ] T017 [US2] Add E2E test for Hero scroll interaction in `tests/hero.spec.ts`

## Phase 5: User Story 3 - Experience Tunnel (P2)

**Goal**: Create the horizontal scrolling timeline with mobile fallback.
**Independent Test Criteria**: Desktop scrolls horizontally; Mobile lists vertically; VR cards tilt.

- [ ] T018 [US3] Create `ExperienceTunnel` component in `src/components/sections/ExperienceTunnel.tsx`
- [ ] T019 [US3] Implement horizontal scroll behavior using GSAP ScrollTrigger in `src/components/sections/ExperienceTunnel.tsx`
- [ ] T020 [US3] Implement mobile vertical fallback layout (CSS media queries) in `src/components/sections/ExperienceTunnel.tsx`
- [ ] T021 [US3] Implement 3D Tilt effect for VR/AR cards in `src/components/sections/ExperienceTunnel.tsx`
- [ ] T022 [US3] Add E2E test for Experience section (horizontal vs vertical) in `tests/experience.spec.ts`

## Phase 6: User Story 4 - Skills & Architecture (P2)

**Goal**: Visualize the tech stack (Isometric) and skills (Force Graph).
**Independent Test Criteria**: Isometric stack builds on scroll; Nodes repel/attract cursor.

- [ ] T023 [US4] Create `AboutArchitecture` component in `src/components/sections/AboutArchitecture.tsx`
- [ ] T024 [US4] Implement isometric stack build-up animation in `src/components/sections/AboutArchitecture.tsx`
- [ ] T025 [US4] Create `SkillsNetwork` component in `src/components/sections/SkillsNetwork.tsx`
- [ ] T026 [US4] Implement Force-Directed Graph physics (or simulation) in `src/components/sections/SkillsNetwork.tsx`
- [ ] T027 [US4] Add E2E test for Skills interaction in `tests/skills.spec.ts`

## Phase 7: User Story 5 - Contact Terminal (P3)

**Goal**: Build the interactive CLI terminal and footer reveal.
**Independent Test Criteria**: Footer reveals on scroll; CLI accepts commands.

- [ ] T028 [US5] Create `ContactTerminal` component in `src/components/sections/ContactTerminal.tsx`
- [ ] T029 [US5] Implement CLI input logic (command parsing, history) in `src/components/sections/ContactTerminal.tsx`
- [ ] T030 [US5] Implement footer reveal animation (z-index/fixed logic) in `src/components/sections/ContactTerminal.tsx`
- [ ] T031 [US5] Add E2E test for Terminal commands in `tests/contact.spec.ts`

## Phase 8: Polish & Cross-Cutting

**Goal**: Finalize accessibility, performance, and responsiveness.
**Independent Test Criteria**: 100% Lighthouse Accessibility; 60fps animations.

- [ ] T032 Verify and fix `prefers-reduced-motion` behavior across all animations
- [ ] T033 Verify mobile responsiveness on all sections (landscape/portrait)

## Dependencies

- **US1** blocks **US2** (Navigation needs to exist for context)
- **US2** blocks **US3** (Sequential scroll flow)
- **US3** blocks **US4** (Sequential scroll flow)
- **US4** blocks **US5** (Sequential scroll flow)

## Implementation Strategy

1.  **MVP Scope**: Phases 1, 2, 3, and 4 (Setup, Foundational, Boot, Hero). This gives a "landing page" feel.
2.  **Full Scope**: Add Phases 5, 6, 7 for the complete portfolio experience.
3.  **Parallelism**:
    - `Loader` (T008) and `Navbar` (T010) can be built in parallel.
    - `AboutArchitecture` (T023) and `SkillsNetwork` (T025) are independent components.
