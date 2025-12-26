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
    await skillsSection.scrollIntoViewIfNeeded();
    await expect(skillsSection).toBeVisible();

    // Check for "SKILLS NETWORK" main heading (desktop)
    // The desktop heading has "SKILLS" as a direct text node, separate from "NETWORK"
    // The mobile heading has "SKILLS NETWORK" as a single string
    // So targeting "SKILLS" exactly should find the desktop heading
    const desktopHeadingText = skillsSection
      .getByText("SKILLS", { exact: true })
      .first();
    await expect(desktopHeadingText).toBeVisible();

    // Check for subtext
    await expect(
      page.getByText("// INTERACTIVE SKILL MATRIX :: HOVER TO DECRYPT")
    ).toBeVisible();

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
    await skillsSection.scrollIntoViewIfNeeded();

    // Wait for nodes to animate in
    await page.waitForTimeout(2000);

    // Find the first visual node circle (Languages) in the desktop container
    // Selector targets the visual circle which has 'rounded-full' and 'border' classes
    // and is inside the desktop container
    const visualNode = skillsSection
      .locator(".hidden.md\\:block [class*='rounded-full'][class*='border']")
      .first();

    // Use evaluate to programmatically click the parent wrapper (which has the onClick handler)
    // to avoid flakiness from the floating animation
    await visualNode.evaluate((node) => {
      (node.parentElement as HTMLElement).click();
    });

    // Verify header text changes to Locked state
    await expect(
      page.getByText("// LINK LOCKED :: CLICK BACKGROUND TO RESET")
    ).toBeVisible();

    // Click the same node again to unlock (toggle behavior)
    // This is more reliable than background clicking due to complex layering
    await visualNode.evaluate((node) => {
      (node.parentElement as HTMLElement).click();
    });

    // Verify header text reverts
    await expect(
      page.getByText("// INTERACTIVE SKILL MATRIX :: HOVER TO DECRYPT")
    ).toBeVisible();
  });

  test("Desktop: should support keyboard navigation (Enter key) to lock focus", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    const skillsSection = page.locator("#skills");
    await skillsSection.scrollIntoViewIfNeeded();

    // Wait for animation
    await page.waitForTimeout(2000);

    // Find the first interactive node
    // We target the outer motion.div that has role="button"
    const nodeButton = skillsSection.locator("div[role='button']").first();

    // Focus the node
    await nodeButton.focus();

    // Press Enter to activate
    await page.keyboard.press("Enter");

    // Verify Locked State
    await expect(
      page.getByText("// LINK LOCKED :: CLICK BACKGROUND TO RESET")
    ).toBeVisible();

    // Press Space to deactivate (testing Space support as well)
    await page.keyboard.press("Space");

    // Verify Reverted State
    await expect(
      page.getByText("// INTERACTIVE SKILL MATRIX :: HOVER TO DECRYPT")
    ).toBeVisible();
  });

  test("Mobile: should render scrolly-telling elements", async ({ page }) => {
    // Set viewport to mobile
    await page.setViewportSize({ width: 375, height: 667 });

    const skillsSection = page.locator("#skills");
    await skillsSection.scrollIntoViewIfNeeded();

    // Check for Mobile Heading
    await expect(page.getByText("SKILLS NETWORK")).toBeVisible();
    await expect(
      page.getByText("// SYSTEM DATA STREAM :: SCROLL TO SCAN")
    ).toBeVisible();

    // Check for Fixed Neural HUD (Core Interface)
    // We can look for the "01 // LOADED" text or similar unique indicators
    // Since it animates opacity based on viewport, we might need to ensure we are strictly in view
    await expect(page.getByText("// LOADED").first()).toBeVisible();

    // Check for scrollable content cards
    const javaCard = page.getByText("Java").first();
    await expect(javaCard).toBeVisible();
  });
});
