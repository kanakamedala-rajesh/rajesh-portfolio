import { test, expect } from "@playwright/test";

test.describe("Lazy Loading Integration", () => {
  test("should load dynamic sections below fold", async ({ page }) => {
    await page.goto("/");

    // Check Experience Tunnel loads
    const experienceSection = page.locator("#experience");
    await expect(experienceSection).toBeAttached();
    // Wait for content to hydrate (Desktop or Mobile)
    await expect(page.getByText(/CNH Industrial/i).first()).toBeVisible({
      timeout: 10000,
    });

    // Check Skills Network loads
    const skillsSection = page.locator("#skills");
    await expect(skillsSection).toBeAttached();
    await expect(page.getByText("React").first()).toBeVisible({
      timeout: 10000,
    });
  });

  test("should respect reduced motion for lazy loaded heavy components", async ({
    page,
  }) => {
    // Emulate reduced motion
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    // Skills section should still load content, but maybe disable heavy animations
    // (This confirms logic inside SkillsNetwork doesn't crash on load)
    await expect(page.getByText("React").first()).toBeVisible();
  });
});
