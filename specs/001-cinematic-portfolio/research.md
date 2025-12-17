# Research & Decisions

## Testing Strategy
**Unknown**: Preferred testing framework for high-fidelity animations and interactions.
**Decision**: **Playwright**.
**Rationale**: 
- The "Acceptance Scenarios" rely heavily on viewport visibility ("When it enters viewport"), scroll position ("When scrolled to the bottom"), and complex interactions (Drag/Hover).
- Playwright offers robust cross-browser engine support to verify scroll-linked animations and 3D contexts better than JSDOM-based tools like Jest.
- Visual comparisons can be added later if needed.
**Alternatives Considered**:
- *Jest + React Testing Library*: Good for logic, but poor for "scroll to X" or "tilt 3D card" verification.
- *Cypress*: Slower execution and more complex setup for this specific stack compared to Playwright.

## Tailwind CSS v4 Configuration
**Unknown**: Configuration without `tailwind.config.js`.
**Decision**: Use CSS-native configuration in `src/app/globals.css`.
**Rationale**: 
- Tailwind v4 promotes moving configuration to CSS.
- We will use the `@theme` directive to define our OKLCH color palette and font families.
- Example:
  ```css
  @theme {
    --color-primary: oklch(85% 0.2 160);
    --font-sans: var(--font-inter);
  }
  ```

## Animation Stack Integration (Next.js 16 + React 19)
**Unknown**: Compatibility and best practices for Lenis, GSAP, and Framer Motion with Server Components.
**Decision**: 
- **Lenis**: Implemented as a client-side `SmoothScroll` provider component wrapping the `children` in `layout.tsx`.
- **GSAP**: Use `@gsap/react`'s `useGSAP` hook for safe effect cleanup in React 19. All GSAP components must be `"use client"`.
- **Framer Motion**: Standard usage, but ensure strictly separated into client leaves to keep `page.tsx` as a Server Component if possible (though for a portfolio, `page.tsx` often ends up client-side or composed of mostly client components).
