import { test, expect } from "@playwright/test";

test.describe("About Architecture Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("should render the architecture section", async ({ page }) => {
    const section = page.locator("#about");
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
  });

  test("should contain the isometric layers", async ({ page }) => {
    const section = page.locator("#about");
    await section.scrollIntoViewIfNeeded();

    // Check for layer titles/text which should appear as we scroll
    // Hardware should be first
    const hardwareTitle = page.getByText("HARDWARE", { exact: true });
    await expect(hardwareTitle).toBeAttached();
  });

  test("should show layers in sequence on scroll", async ({ page }) => {
    const section = page.locator("#about");
    await section.scrollIntoViewIfNeeded();

    // Hardware title
    await expect(page.getByText("HARDWARE", { exact: true })).toBeAttached();

    // Scroll a bit more to trigger middleware
    await page.mouse.wheel(0, 1000);
    await expect(page.getByText("MIDDLEWARE", { exact: true })).toBeAttached();

    // Scroll more for cloud/application
    await page.mouse.wheel(0, 1000);
    await expect(page.getByText("APPLICATION", { exact: true })).toBeAttached();
  });
});
