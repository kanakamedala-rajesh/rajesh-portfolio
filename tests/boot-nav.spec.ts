import { test, expect } from "@playwright/test";

test.describe("System Boot & Navigation", () => {
  test.beforeEach(async ({ page }) => {
    // clear session storage before each test to ensure boot sequence runs
    await page.context().addInitScript(() => {
      window.sessionStorage.clear();
    });
  });

  test("should play boot sequence on first visit", async ({ page }) => {
    await page.goto("/");

    // Check for boot sequence text
    await expect(page.getByText("> INITIALIZING KERNEL...")).toBeVisible();
    await expect(page.getByText("> LOADING ANDROID RUNTIME...")).toBeVisible();
    await expect(page.getByText("> HYDRATING REACT ROOT...")).toBeVisible();

    // Wait for loader to disappear (it waits for load event, so it might take a bit)
    await expect(page.getByText("> INITIALIZING KERNEL...")).toBeHidden({
      timeout: 15000,
    });
  });

  test("should skip boot sequence on subsequent visits", async ({ page }) => {
    // First visit
    await page.goto("/");
    await expect(page.getByText("> INITIALIZING KERNEL...")).toBeVisible();
    await expect(page.getByText("> HYDRATING REACT ROOT...")).toBeHidden({
      timeout: 15000,
    });

    // Reload page
    await page.reload();

    // Should NOT see boot sequence again
    await expect(page.getByText("> INITIALIZING KERNEL...")).toBeHidden();
  });

  test("navbar should appear only after loader finishes", async ({ page }) => {
    await page.goto("/");

    // Navbar content (the pill) should be hidden initially while loader is running
    // The header container is fixed, but the motion div inside controls visibility
    const navbarContent = page.locator("header > div");

    // We expect the navbar to be hidden.
    // Since Framer Motion handles opacity, we check if it is not visible or opacity is 0.
    await expect(navbarContent).toHaveCSS("opacity", "0");

    // Wait for loader sequence to complete
    await expect(page.getByText("> HYDRATING REACT ROOT...")).toBeVisible();
    await expect(page.getByText("> HYDRATING REACT ROOT...")).toBeHidden({
      timeout: 15000,
    });

    // Navbar should now be visible
    await expect(navbarContent).not.toHaveCSS("opacity", "0");
  });

  test("navbar should morph on scroll", async ({ page }) => {
    await page.goto("/");

    // Bypass loader
    await page.evaluate(() =>
      sessionStorage.setItem("rk_portfolio_visited", "true")
    );
    await page.reload();

    // Add height to body to enable scrolling
    await page.evaluate(() => {
      document.body.style.height = "2000px";
    });

    // Target the motion div inside the header
    const navbarContent = page.locator("header > div");

    // Initial state: Full width, transparent
    await expect(navbarContent).toHaveClass(/bg-transparent/);

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(1000); // Wait for animation

    // Scrolled state: Pill shape, background color
    await expect(navbarContent).toHaveClass(/bg-deep-void\/80/);
    await expect(navbarContent).toHaveClass(/rounded-full/);
  });

  test("mobile menu should open and show glitch effect", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile viewport
    await page.goto("/");
    await page.evaluate(() =>
      sessionStorage.setItem("rk_portfolio_visited", "true")
    );
    await page.reload();

    // Open menu
    await page.locator('button[aria-label="Open Menu"]').click();

    // Check for overlay and wait for animation to settle
    const overlay = page.locator(".fixed.inset-0.cyber-grid");
    await expect(overlay).toBeVisible();
    await page.waitForTimeout(1000); // Allow animation to finish

    // Check for navigation links inside the mobile menu
    const aboutLink = page.getByRole("link", { name: "About" }).first();
    await expect(aboutLink).toBeVisible();

    // Close menu - ensure it's visible and in viewport
    const closeButton = page.locator('button[aria-label="Close Menu"]');
    await expect(closeButton).toBeVisible();
    await closeButton.click();
    await expect(overlay).toBeHidden();
  });
});
