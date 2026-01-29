# Architecture Overview

## The Cyber-Physical Concept

The **Rajesh Kanakamedala Portfolio** is a concept-driven application designed to represent the bridge between "Silicon" (Hardware/Embedded) and "Cloud" (Software/Web). This duality drives every architectural decision, from the color palette (Amber for Hardware, Cyan for Cloud) to the interaction models (GSAP ScrollTrigger for mechanical feeling, Framer Motion for fluid UI).

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
  - Uses `experimental-edge` runtime where possible for performance.
  - Leverages React Server Components (RSC) for initial shell rendering.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
  - **No `tailwind.config.js`**: All configuration is handled via CSS variables and the `@theme` directive in `src/app/globals.css`.
  - **OKLCH Colors**: Uses the OKLCH color space for vibrant, wide-gamut neon tones.
- **State Management**: React Context (`LoaderContext`, `ScrollContext`) for global UI states.
- **Animation Orchestration**:
  - **Lenis**: Provides smooth, momentum-based scrolling to normalize the experience across devices.
  - **GSAP**: The primary engine for scroll-driven choreography. It handles:
    - **Pinning**: In Hero and About sections.
    - **Scrubbing**: For frame-by-frame animation control in About, Experience, and Contact sections.
    - **Parallax**: Managing the differential scrolling speeds of layers.
  - **Framer Motion**: Manages component-level transitions, layout animations (Shared Layout), and gesture interactions (3D tilt, magnetic hover).

## Directory Structure

```text
src/
├── app/                  # Next.js App Router
│   ├── globals.css       # Global styles & Tailwind v4 config
│   ├── layout.tsx        # Root layout, providers, and SEO
│   └── page.tsx          # Home page composition
├── components/
│   ├── sections/         # Large-scale feature sections (Hero, etc.)
│   └── ui/               # Atomic UI components
├── context/              # Global state (Loader, Scroll)
├── data/                 # Static data layer (Resume)
├── hooks/                # Custom React hooks
├── lib/                  # Utilities
└── middleware.ts         # Edge runtime security (CSP)
```

## Deployment Architecture

The application is designed to be deployed on **Cloudflare Pages** via **OpenNext**.

- **`wrangler.toml`**: Configures the Cloudflare worker environment.
- **`open-next.config.ts`**: Configures the build process to adapt Next.js output for the Cloudflare runtime.
- **Edge Compatibility**: The `middleware.ts` ensures all headers (CSP, Security) are set at the edge, and `next.config.ts` is tuned for this environment.
