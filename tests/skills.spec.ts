import { test, expect } from "@playwright/test";

test.describe("Skills Network Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for loader to finish
    await page.waitForSelector("#initial-loader", { state: "detached" });
  });

  test("Desktop: should render the skills section with correct headings", async ({
    page,
  }) => {
    // Set viewport to desktop
    await page.setViewportSize({ width: 1920, height: 1080 });

    const skillsSection = page.locator("#skills");
    await skillsSection.waitFor({ state: "attached" });
    await page.waitForTimeout(1000);
    await skillsSection.scrollIntoViewIfNeeded();
    await expect(skillsSection).toBeVisible();

    // Check for HUD sidebars text
    const sidebars = page.locator("div.fixed.top-1\\/2");
    await expect(sidebars.getByText("HOVER TO DECRYPT").first()).toBeVisible();

    // Check for large background watermark
    const watermark = page
      .locator("h2.font-heading")
      .filter({ hasText: "SKILLS" })
      .first();
    await expect(watermark).toBeVisible();
  });

  test("Desktop: should allow clicking nodes to lock focus", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    const skillsSection = page.locator("#skills");
    await skillsSection.waitFor({ state: "attached" });
    await page.waitForTimeout(1000);
    await skillsSection.scrollIntoViewIfNeeded();

    // Wait for nodes to animate in
    await page.waitForTimeout(2000);

    // Find the first visual node circle (Languages) in the desktop container
    const visualNode = skillsSection
      .locator(".hidden.md\\:block [class*='rounded-full'][class*='border']")
      .first();

    // Use evaluate to programmatically click the parent wrapper
    await visualNode.evaluate((node) => {
      (node.parentElement as HTMLElement).click();
    });

    // Verify header text changes to Locked state
    await expect(
      page.getByText("CLICK BACKGROUND TO RESET").first()
    ).toBeVisible();

    // Click the same node again to unlock
    await visualNode.evaluate((node) => {
      (node.parentElement as HTMLElement).click();
    });

    // Verify header text reverts
    await expect(page.getByText("HOVER TO DECRYPT").first()).toBeVisible();
  });

  test("Desktop: should support keyboard navigation (Enter key) to lock focus", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    const skillsSection = page.locator("#skills");
    await skillsSection.waitFor({ state: "attached" });
    await page.waitForTimeout(1000);
    await skillsSection.scrollIntoViewIfNeeded();

    // Wait for animation
    await page.waitForTimeout(2000);

    // Find the first interactive node
    const nodeButton = skillsSection.locator("div[role='button']").first();

    // Focus the node
    await nodeButton.focus();

    // Press Enter to activate
    await page.keyboard.press("Enter");

    // Verify Locked State
    await expect(
      page.getByText("CLICK BACKGROUND TO RESET").first()
    ).toBeVisible();

    // Press Space to deactivate
    await page.keyboard.press("Space");

    // Verify Reverted State
    await expect(page.getByText("HOVER TO DECRYPT").first()).toBeVisible();
  });

  test("Mobile: should render scrolly-telling elements", async ({ page }) => {
    // Set viewport to mobile
    await page.setViewportSize({ width: 375, height: 667 });

    const skillsSection = page.locator("#skills");
    await skillsSection.waitFor({ state: "attached" });
    await page.waitForTimeout(1000);
    await skillsSection.scrollIntoViewIfNeeded();

    // Check for Mobile Heading (specifically the one in md:hidden container)
    const mobileHeader = skillsSection
      .locator(".md\\:hidden h2")
      .filter({ hasText: "SKILLS" });
    await expect(mobileHeader).toBeVisible();

    // Check for Fixed Neural HUD (Core Interface)
    await expect(page.getByText("// LOADED").first()).toBeVisible();

    // Check for scrollable content cards
    const javaCard = page.getByText("Java").first();
    await expect(javaCard).toBeVisible();
  });
});
