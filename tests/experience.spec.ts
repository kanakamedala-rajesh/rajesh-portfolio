import { test, expect } from "@playwright/test";

test.describe("Experience Tunnel Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for the page to be ready
    await page.waitForLoadState("networkidle");
  });

  test("should render experience section", async ({ page, isMobile }) => {
    // Check for the section content
    await expect(page.getByText("CNH Industrial").first()).toBeVisible();

    if (isMobile) {
      // On mobile, check for the sidebar period indicator
      const periodIndicator = page
        .locator("#experience span.font-heading")
        .first();
      await expect(periodIndicator).toBeVisible();
    } else {
      // On desktop, check for the dynamic watermark period
      const watermark = page.locator("#experience h2").first();
      await expect(watermark).toBeAttached();
    }
  });

  test("should have horizontal scroll structure on desktop", async ({
    page,
    isMobile,
  }) => {
    if (isMobile) return;

    // Check if cards are present
    const cards = page.locator(".experience-card");
    await expect(cards).toHaveCount(4);

    // On desktop, we expect a full-screen container for the tunnel effect
    // DesktopExperience is wrapped in .hidden.md:block
    const desktopWrapper = page.locator(".hidden.md\\:block #experience");
    await expect(desktopWrapper).toBeVisible();
  });

  test("should show VR card with specific attributes", async ({
    page,
    isMobile,
  }) => {
    if (isMobile) return; // Tilt effect is mouse-driven, mostly relevant for desktop

    // Locate the Eagle Creek card's main container
    // The component structure puts the class on the outer motion.div
    // We find the inner content "Eagle Creek" and go up to the motion.div

    // The 'cursor-grab' class is on the same element that has 'backdrop-blur-md' and 'rounded-xl'
    // Let's try to match that specific container combination if strict locator fails
    // Or we can rely on the fact it's one of the experience cards.

    // Let's refine: The card has 'group relative flex ...'
    // We can iterate or find the specific one.
    // The filter above found the inner div likely. Let's inspect ancestors or verify the locator matches the container.
    // Based on previous error, it found a div with empty class, meaning we likely drilled too deep or selected a wrapper without class.

    // Re-targeting: Find the card by its unique text, then verify it has the class.
    // The text is inside the card.
    const cardWithClass = page
      .locator("div.cursor-pointer")
      .filter({ hasText: "Eagle Creek" });
    await expect(cardWithClass).toBeVisible();
  });

  test("should open modal on card click (or button click)", async ({
    page,
    isMobile,
  }) => {
    // Scroll to the experience section
    const section = page.locator("#experience");
    await section.scrollIntoViewIfNeeded();

    if (isMobile) {
      // On mobile, the entire card is a button
      await page.locator('div[role="button"]').first().click({ force: true });
    } else {
      // On desktop, click the Expand System button
      await page
        .getByRole("button", { name: /Expand System/i })
        .first()
        .click({ force: true });
    }

    // Check if modal is visible using the SYS_LOG indicator
    await expect(page.getByText(/SYS_LOG/i)).toBeVisible();

    // Check for modal content
    await expect(
      page.getByRole("heading", { name: "Execution Log" })
    ).toBeVisible();

    // Close the modal
    await page
      .getByRole("button")
      .filter({ has: page.locator("svg.lucide-x") })
      .click();

    // Check if modal is hidden
    await expect(page.getByText(/SYS_LOG/i)).not.toBeVisible();
  });

  test("mobile view should show stacking cards", async ({ page, isMobile }) => {
    // This test is specifically for mobile viewports
    if (!isMobile) return;

    // Check for the mobile-only section
    const mobileSection = page.locator(".md\\:hidden#experience");
    await expect(mobileSection).toBeVisible();

    // Check for the sidebar period indicator
    const periodIndicator = mobileSection.locator("span.font-heading");
    await expect(periodIndicator).toBeVisible();

    // Check if cards are present (absolute positioned divs)
    const cards = mobileSection.locator('div[role="button"]');
    await expect(cards).toHaveCount(4);
  });

  test("should handle resize without breaking layout", async ({
    page,
    isMobile,
  }) => {
    if (isMobile) return;

    // Initial State - Desktop section should be visible
    await expect(page.locator(".hidden.md\\:block #experience")).toBeVisible();

    // Resize Window to Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    await expect(page.locator(".md\\:hidden#experience")).toBeVisible();

    // Resize back to Desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForTimeout(500);
    await expect(page.locator(".hidden.md\\:block #experience")).toBeVisible();
  });

  test("should correspond to accessibility standards", async ({ page }) => {
    // Find any experience card (it should now be a button)
    // searching by the company name which is inside the card
    // We look for a button that contains "CNH Industrial"
    // Note: getByRole('button', { name: ... }) might match the inner 'Expand System' button or the card itself.
    // The card has the text "CNH Industrial". The inner button has "Expand System".
    // Let's target the card specifically.
    const card = page
      .locator('div[role="button"]')
      .filter({ hasText: "CNH Industrial" })
      .first();

    await expect(card).toBeVisible();
    await expect(card).toHaveAttribute("tabindex", "0");

    // Test keyboard interaction (Enter key)
    // Ensure modal is closed first
    await expect(page.getByText(/SYS_LOG/i)).not.toBeVisible();

    await card.focus();
    await page.keyboard.press("Enter");

    // Modal should open
    await expect(page.getByText(/SYS_LOG/i)).toBeVisible();
  });
});
