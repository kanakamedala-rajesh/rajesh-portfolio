import { test, expect } from "@playwright/test";

test.describe("No-JS Fallback", () => {
  test.use({ javaScriptEnabled: false });

  test("should render content even if JavaScript is disabled", async ({
    page,
  }) => {
    await page.goto("/");

    // Loader should be hidden
    const loader = page.locator("#initial-loader");
    await expect(loader).not.toBeVisible();

    // Main content should be visible (opacity forced to 1 by noscript)
    const main = page.locator("main").first();
    await expect(main).toBeVisible();

    // Check for hero text presence
    const heroTitle = page.locator("h1");
    await expect(heroTitle).toBeVisible();

    // Navbar should be visible
    const header = page.locator("header");
    await expect(header).toBeVisible();
  });
});
