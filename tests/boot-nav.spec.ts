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

    // Navbar should be hidden initially while loader is running
    const navbar = page.locator("header");
    await expect(navbar).toBeHidden();

    // Wait for loader sequence to complete
    await expect(page.getByText("> HYDRATING REACT ROOT...")).toBeVisible();
    await expect(page.getByText("> HYDRATING REACT ROOT...")).toBeHidden({
      timeout: 15000,
    });

    // Navbar should now be visible
    await expect(navbar).toBeVisible();
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

    const navbar = page.locator("header");

    // Initial state: Full width, transparent
    await expect(navbar).toHaveClass(/bg-transparent/);

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(1000); // Wait for animation

    // Scrolled state: Pill shape, background color
    await expect(navbar).toHaveClass(/bg-deep-void\/80/);
    await expect(navbar).toHaveClass(/rounded-full/);
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

    // Check for overlay
    const overlay = page.locator(".fixed.inset-0.z-50.bg-deep-void");
    await expect(overlay).toBeVisible();

    // Check for glitch links
    const aboutLink = page.getByRole("link", { name: "About" });
    await expect(aboutLink).toBeVisible();
    await expect(aboutLink).toHaveAttribute("data-text", "About");

    // Close menu
    await page.locator('button[aria-label="Close Menu"]').click();
    await expect(overlay).toBeHidden();
  });
});
