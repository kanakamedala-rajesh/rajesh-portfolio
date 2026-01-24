# AGENTS.md — Rajesh Kanakamedala Portfolio

> **Purpose**: This document provides AI assistants and developers with comprehensive guidelines for contributing to this cinematic scrolly-telling portfolio project.

---

## Project Overview

A high-performance, cinematic **"Scrolly-telling"** portfolio for **Rajesh Kanakamedala**, showcasing expertise spanning Embedded Systems to Cloud Applications. The design philosophy is **"From Silicon to Cloud"**—visualizing the data flow from low-level hardware to high-level UI.

---

## 1. Critical Rules

**STRICT ADHERENCE REQUIRED:**

1. **NO HALLUCINATIONS**: Never invent data, files, APIs, or requirements. Verify existence before referencing.
2. **VERIFY CONTEXT FIRST**: Always check existing project structure and files before making changes.
3. **FOLLOW EXISTING PATTERNS**: Reference established code styles in the codebase.
4. **SEEK CLARIFICATION**: If ambiguity exists, **ASK** before proceeding.
5. **VALIDATE BEFORE COMPLETION**: Run `pnpm commit:validate` before finalizing. Fix ALL warnings and errors.
6. **DOCUMENT CODE**: Include JSDoc comments for functions, interfaces, and components.
7. **UPDATE WIKI**: When modifying code logic, **you MUST update** the corresponding `docs/wiki/` page.

---

## 2. Tech Stack

| Category          | Technology                                          |
| ----------------- | --------------------------------------------------- |
| **Framework**     | Next.js 16 (App Router, React Compiler enabled)     |
| **Language**      | TypeScript (Strict Mode)                            |
| **Styling**       | Tailwind CSS v4 (CSS-First Config via `@theme`)     |
| **Scroll Engine** | Lenis (Smooth scrolling)                            |
| **Animation**     | GSAP (ScrollTrigger) + Framer Motion                |
| **3D Graphics**   | Three.js via @react-three/fiber & @react-three/drei |
| **Icons**         | Lucide React                                        |
| **Deployment**    | Cloudflare Workers via OpenNext                     |
| **Testing**       | Playwright (E2E)                                    |
| **Package Mgr**   | **pnpm** (Always use `pnpm`, never `npm` or `yarn`) |

---

## 3. Directory Structure

```text
src/
├── app/                     # Next.js App Router
│   ├── globals.css          # Tailwind v4 @theme config & custom utilities
│   ├── layout.tsx           # Root layout, providers, fonts, SEO
│   └── page.tsx             # Home page composition
├── components/
│   ├── sections/            # Feature sections (Hero, About, Experience, Skills, Contact)
│   └── ui/                  # Atomic UI (Loader, Navbar, Modal, PageWrapper)
├── context/                 # React Contexts (LoaderContext, ScrollContext, SectionContext)
├── data/                    # Data layer (resume.ts with ResumeData interface)
├── hooks/                   # Custom hooks (useSectionTransition)
├── lib/                     # Utilities (cn, constants)
└── middleware.ts            # Edge runtime security (CSP, headers)

docs/wiki/                   # Technical documentation (MUST be kept in sync)
tests/                       # Playwright E2E tests
specs/                       # Project specifications
```

---

## 4. Design System

### Color Palette (OKLCH)

| Token                | Value                 | Usage                  |
| -------------------- | --------------------- | ---------------------- |
| `--color-primary`    | `oklch(85% 0.2 160)`  | Neon Cyan (Cloud/Web)  |
| `--color-secondary`  | `oklch(75% 0.18 60)`  | Solar Amber (Hardware) |
| `--color-accent`     | `oklch(70% 0.25 140)` | Signal Green (Accents) |
| `--color-background` | `oklch(15% 0.02 260)` | Deep Void (Dark base)  |
| `--color-foreground` | `oklch(95% 0.01 260)` | Light Gray (Text)      |

### Typography (via `next/font`)

- **Headers**: Space Grotesk (`--font-space`)
- **Body**: Inter (`--font-inter`)
- **Code/Monospace**: JetBrains Mono (`--font-mono`)

### Custom CSS Utilities

Defined in `src/app/globals.css`:

- `.text-gradient` — Cyan-to-Amber gradient text
- `.glass-panel` — Glassmorphic panel with backdrop blur
- `.texture-overlay` — SVG noise overlay for tactile feel
- `.moving-border-overlay` — Animated border shimmer effect
- `.cyber-grid` — Grid background pattern

---

## 5. Data Layer

### Schema (`src/data/resume.ts`)

```typescript
interface ResumeData {
  header: { name: string; title: string; tagline: string; location: string };
  summary: string;
  skills: {
    category:
      | "Languages"
      | "Frameworks"
      | "Embedded/Systems"
      | "Cloud/DB"
      | "Methodologies";
    items: string[];
  }[];
  experience: {
    company: string;
    role: string;
    period: string;
    type: "Embedded" | "VR/AR" | "Full Stack";
    description: string[];
    techStack: string[];
  }[];
  contact: { email: string; phone: string; linkedin: string };
}
```

### Contact Info Security

Contact fields use environment variables with fallbacks:

```typescript
email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "user@example.com";
```

---

## 6. Section Architecture

| Section        | File                             | Mechanism                                           |
| -------------- | -------------------------------- | --------------------------------------------------- |
| **Loader**     | `ui/Loader.tsx`                  | Boot sequence with typewriter text                  |
| **Navbar**     | `ui/Navbar.tsx`                  | Liquid morph (pill on scroll)                       |
| **Hero**       | `sections/Hero.tsx`              | Split-screen convergence, GSAP pin                  |
| **About**      | `sections/AboutArchitecture.tsx` | Isometric stack, GSAP 300% pin                      |
| **Experience** | `sections/ExperienceTunnel.tsx`  | Desktop: Horizontal scroll / Mobile: Vertical stack |
| **Skills**     | `sections/SkillsNetwork.tsx`     | Constellation layout with parallax                  |
| **Contact**    | `sections/ContactTerminal.tsx`   | CLI terminal                                        |

### Responsive Patterns

- **Desktop** (`≥768px`): Full animations, horizontal scroll, parallax effects
- **Mobile** (`<768px`): Simplified layouts, vertical stacks, touch-optimized

---

## 7. Context Providers

| Context          | Purpose                                         |
| ---------------- | ----------------------------------------------- |
| `LoaderContext`  | Manages boot sequence state (`isLoading`)       |
| `ScrollContext`  | Provides Lenis instance for programmatic scroll |
| `SectionContext` | Tracks section status for animation sync        |

Usage pattern:

```tsx
const { isLoading, setIsLoading } = useLoader();
const { lenis } = useScroll();
const { registerSection, updateSectionStatus } = useSectionContext();
```

---

## 8. Animation Guidelines

### GSAP (Scroll-linked)

- Use for: Pinning, scrubbing, complex timelines
- Always use `@gsap/react` hook: `useGSAP()`
- Clean up ScrollTrigger instances in hook cleanup

### Framer Motion (Component-level)

- Use for: Entrances, exits, layout animations, gestures
- Prefer `whileInView` for viewport-triggered animations
- Use `useMotionValue` and `useTransform` for cursor-based effects

### Lenis (Smooth Scroll)

- Accessed via `ScrollContext`
- Pause during modals: `lenis?.stop()` / `lenis?.start()`

---

## 9. Commands Reference

| Command                | Description                                            |
| ---------------------- | ------------------------------------------------------ |
| `pnpm dev`             | Start development server                               |
| `pnpm build`           | Production build                                       |
| `pnpm lint`            | Run ESLint                                             |
| `pnpm type-check`      | TypeScript type checking                               |
| `pnpm format`          | Format code with Prettier                              |
| `pnpm test`            | Run Playwright E2E tests                               |
| `pnpm commit`          | Interactive conventional commit                        |
| `pnpm commit:validate` | **Full validation** (lint + type-check + build + test) |
| `pnpm cf:deploy`       | Deploy to Cloudflare                                   |

---

## 10. Testing Strategy

**Framework**: Playwright

**Test Suites** (`tests/`):

- `boot-nav.spec.ts` — Loader sequence, session storage, navbar morph
- `hero.spec.ts` — Hero visuals and responsiveness
- `architecture.spec.ts` — Architecture layers rendering
- `experience.spec.ts` — Experience cards and mobile fallback
- `skills.spec.ts` — Skills network rendering
- `contact.spec.ts` — Terminal functionality
- `security.spec.ts` — Security headers validation

**Run Tests**:

```bash
pnpm test                              # Headless
pnpm exec playwright test --ui         # Interactive UI
pnpm exec playwright test --debug      # Debug mode
```

---

## 11. Security

### Middleware (`src/middleware.ts`)

- **Runtime**: `experimental-edge`
- **CSP**: Nonce-based, strict-dynamic scripts
- **Headers**: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`

### Best Practices

- Never hardcode sensitive data
- Use `NEXT_PUBLIC_*` env vars for client-exposed config
- Validate all external inputs

---

## 12. Documentation Requirements

### Code Documentation

- **JSDoc**: Required for all exported functions, interfaces, and components
- **File Headers**: Describe the file's purpose at the top
- **Complex Logic**: Explain the "why" and "how" inline

### Wiki Maintenance (`docs/wiki/`)

| Wiki Page              | Covers                                      |
| ---------------------- | ------------------------------------------- |
| `01-Architecture.md`   | Tech stack, directory structure, deployment |
| `02-Core-Utilities.md` | Contexts, hooks, middleware, utilities      |
| `03-Components-UI.md`  | Global styling, UI components               |
| `04-Sections.md`       | Feature section implementations             |
| `05-Data-Layer.md`     | ResumeData schema, data handling            |
| `06-Testing.md`        | Playwright setup and test suites            |

**Rule**: Any code change affecting architecture or features **MUST** have a corresponding Wiki update.

---

## 13. Commit Convention

Uses **Conventional Commits** enforced via Commitlint:

```text
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`

**Examples**:

```text
feat(hero): add 3D spline connection animation
fix(navbar): resolve mobile menu z-index issue
docs(wiki): update architecture section with deployment info
```

---

## 14. AI Assistant Guidelines

### Before Starting Work

1. Read relevant `docs/wiki/` pages for context
2. Check existing patterns in similar files
3. Verify the component/feature doesn't already exist

### During Implementation

1. Follow TypeScript strict mode
2. Use existing utilities (`cn`, contexts, hooks)
3. Match the established animation patterns (GSAP vs Framer Motion)
4. Ensure responsive design (desktop and mobile)

### Before Completing

1. Run `pnpm commit:validate` — fix ALL issues
2. Update relevant Wiki documentation
3. Verify no regressions with `pnpm test`

### Tool Usage

- **Context7**: Use `resolve-library-id` + `get-library-docs` for up-to-date API docs
- **Package Manager**: Always use `pnpm`, never `npm` or `yarn`
- **Root Cause Analysis**: Understand issues fully before applying fixes
