# Code Wiki: Rajesh Kanakamedala Portfolio

Welcome to the comprehensive technical documentation for the **Cinematic Scrolly-telling Portfolio**. This wiki covers the architecture, core utilities, UI components, feature implementation, data layer, and testing strategy.

## 📚 Documentation Index

### [01. Architecture & Concept](./01-Architecture.md)

- **The "Cyber-Physical" Philosophy**: Design principles and color theory.
- **Tech Stack**: Next.js 16, Tailwind v4, Lenis, Edge Runtime.
- **Directory Structure**: Overview of the codebase organization.
- **Deployment**: Cloudflare Workers/Pages integration.

### [02. Core Utilities & Global State](./02-Core-Utilities.md)

- **Contexts**: `LoaderContext` (Boot sequence), `ScrollContext` (Lenis), `SectionContext` (Scroll coordination).
- **Hooks**: `useSectionTransition` for GSAP integration.
- **Middleware**: Edge security, CSP, and headers.
- **Utilities**: `cn` (Tailwind merge), `constants.ts`.

### [03. Components & UI System](./03-Components-UI.md)

- **Global Styling**: Tailwind v4 `@theme` configuration, OKLCH colors, and custom effects (`.texture-overlay`, `.moving-border-overlay`).
- **Core UI**:
  - `Loader.tsx`: The "System Boot" preloader.
  - `Navbar.tsx`: The liquid morphing navigation pill.
  - `PageWrapper.tsx`.

### [04. Feature Sections](./04-Sections.md)

Deep dive into the complex, interactive sections:

- **Hero**: "The Convergence" (Split screen, 3D Spline).
- **About**: "Architecture Stack" (Isometric scroll animation).
- **Experience**: "The Tunnel" (Desktop horizontal scroll vs. Mobile vertical stack).
- **Skills**: "The Network" (Constellation layout & Mobile Centrifuge).
- **Contact**: "The Terminal" (CLI & Footer Reveal).

### [05. Data Layer](./05-Data-Layer.md)

- **Schema**: The `ResumeData` interface.
- **Source**: `src/data/resume.ts`.
- **Security**: Handling sensitive contact info via environment variables.

### [06. Testing Strategy](./06-Testing.md)

- **Playwright Setup**: Configuration and environment.
- **Test Suites**: Coverage for Boot, Hero, Architecture, and Experience sections.
- **Execution**: How to run and debug tests.

---

## 🚀 Quick Links

- **Repository Root**: [../..](../../README.md)
- **Project Specification**: [../../specs/001-cinematic-portfolio/spec.md](../../specs/001-cinematic-portfolio/spec.md)
