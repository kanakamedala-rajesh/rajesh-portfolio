# Core Utilities & Contexts

This section documents the foundational utilities and global state management used throughout the application.

## 1. Global Contexts (`src/context/`)

### `LoaderContext`

**File**: `src/context/LoaderContext.tsx`

Manages the state of the initial "System Boot" sequence.

- **State**: `isLoading` (boolean), `hasHydrated` (boolean)
- **Purpose**:
  - Prevents interaction with the rest of the app while the boot animation plays.
  - Signals components (like `Navbar`) to hide or animate in only after the loader finishes.
- **Usage**:

  ```tsx
  const { isLoading, setIsLoading, hasHydrated } = useLoader();
  ```

### `ScrollContext`

**File**: `src/context/ScrollContext.tsx`

Provides access to the **Lenis** scroll instance throughout the component tree.

- **State**: `lenis` (Lenis instance | null)
- **Purpose**:
  - Allows components to trigger programmatic scrolling (e.g., Navbar links).
  - Enables pausing/resuming scroll (e.g., when a modal is open).
- **Usage**:

  ```tsx
  const { lenis } = useScroll();
  lenis?.scrollTo("#target");
  ```

### `SectionContext`

**File**: `src/context/SectionContext.tsx`

Tracks the status of each major section (Hero, About, etc.) for high-level coordination.

- **Placement**: Global (Root Layout)
- **State**: `sectionStatuses` (Read-only map of section IDs to status).
- **Purpose**:
  - Allows components to report their lifecycle status during scroll.
  - **Note**: While available for general synchronization, the **Navbar** now utilizes direct DOM measurement (`getBoundingClientRect`) for active link highlighting to ensure maximum reliability with pinned sections.
- **Usage**:

  ```tsx
  const { registerSection, updateSectionStatus, sectionStatuses } =
    useSectionContext();
  ```

## 2. Custom Hooks (`src/hooks/`)

### `useSectionTransition`

**File**: `src/hooks/useSectionTransition.ts`

_(Inferred functionality)_: A hook designed to handle smooth transitions or intersection observing for specific sections, triggering animations when they enter the viewport.

## 3. Middleware & Security

### `middleware.ts`

**Runtime**: `experimental-edge`

This file runs before every request and is responsible for:

1. **Content Security Policy (CSP)**:
   - Generates a `nonce` for inline scripts.
   - Enforces `strict-dynamic` for scripts.
   - Restricts `default-src`, `img-src`, etc., to secure origins.
2. **Security Headers**:
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: SAMEORIGIN`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy`: Disables camera, mic, geolocation.

## 4. Utilities (`src/lib/`)

### `utils.ts`

- **`cn(...inputs: ClassValue[])`**:
  - Combines `clsx` (conditional classes) and `tailwind-merge` (resolves Tailwind conflicts).
  - Essential for building reusable UI components that accept `className` props.

### `constants.ts`

_(Inferred)_: Contains global constants, magic numbers, or configuration strings used across the app to avoid hardcoding.
