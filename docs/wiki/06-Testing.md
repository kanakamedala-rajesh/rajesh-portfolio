# Testing Strategy

The project uses **Playwright** for End-to-End (E2E) testing to ensure critical user flows and visual regressions are caught.

## Configuration

**File**: `playwright.config.ts`

- **Test Directory**: `tests/`
- **Browsers**: Chromium, Firefox, WebKit.
- **Base URL**: `http://localhost:3000` (Dev)

## Test Suites

### 1. Boot & Navigation (`tests/boot-nav.spec.ts`)

- **Loader**: Verifies the "System Boot" text sequence appears.
- **Session Storage**: Checks that the loader is skipped on subsequent reloads.
- **Navbar**: Verifies that the navigation bar morphs (changes style) when the user scrolls down.

### 2. Hero Section (`tests/hero.spec.ts`)

- **Visuals**: Checks for the presence of the "Cloud Layer" and "Hardware Layer" text.
- **Interaction**: Verifies that the `canvas` or main visual elements are present (though full WebGL testing is limited).
- **Responsiveness**: Ensures layout adapts to mobile viewports.

### 3. Architecture (`tests/architecture.spec.ts`)

- Verifies the existence of the "Architecture" section.
- Checks that the three layers (Hardware, Middleware, Application) are rendered in the DOM.

### 4. Experience (`tests/experience.spec.ts`)

- Verifies that experience cards are rendered.
- Checks for the correct number of experience entries based on the data.
- Tests the mobile fallback behavior (vertical stack vs horizontal scroll).

## Running Tests

### Run all tests (Headless)

```bash
pnpm test
```

### Run with UI Mode (Interactive)

```bash
pnpm exec playwright test --ui
```

### Debug a specific test file

```bash
pnpm exec playwright test tests/hero.spec.ts --debug
```
