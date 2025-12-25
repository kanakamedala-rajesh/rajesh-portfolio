import { test, expect } from "@playwright/test";

test.describe("Experience Tunnel Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for the page to be ready
    await page.waitForLoadState("networkidle");
  });

  test("should render experience section", async ({ page, isMobile }) => {
    // Check for the section title based on viewport
    if (isMobile) {
      // Only the mobile header should be visible
      await expect(
        page.getByRole("heading", { name: "EXPERIENCE" }).first()
      ).toBeVisible();
    } else {
      // On desktop, the title is "EXPERIENCE" (watermark)
      // It might be 'visible' in terms of display:block, but opacity is low.
      // We can filter by the class specific to desktop: hidden md:block
      const experienceText = page
        .locator(".hidden.md\\:block")
        .getByText("EXPERIENCE");
      await expect(experienceText).toBeAttached();
    }

    // Check for content
    await expect(page.getByText("CNH Industrial").first()).toBeVisible();
  });

  test("should have horizontal scroll structure on desktop", async ({
    page,
    isMobile,
  }) => {
    if (isMobile) return;

    // Check if cards are present
    const cards = page.locator("#experience h3"); // Experience titles are h3 within the section
    await expect(cards).toHaveCount(4);

    // On desktop, we expect a full-screen container for the tunnel effect
    const tunnelContainer = page.locator(".md\\:h-screen").first();
    await expect(tunnelContainer).toBeVisible();

    // Check for horizontal layout
    // The track has the class 'md:flex-row' and contains the cards
    // We can find the element that has 'md:flex-row' AND 'md:px-20' (specific to track)
    const track = tunnelContainer.locator(".md\\:flex-row.md\\:px-20");
    await expect(track).toBeVisible();
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
  }) => {
    // Scroll to the experience section title to ensure cards are in initial state (not fully stacked)
    // This prevents the sticky stacking from covering the first card's button
    const section = page.locator("#experience");
    await section.scrollIntoViewIfNeeded();

    // Click the first Expand System button
    // It is visible on all viewports now
    await page
      .getByRole("button", { name: /Expand System/i })
      .first()
      .click({ force: true });

    // Check if modal is visible
    // The modal has a distinct header with "SYS_LOG"
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

  test("mobile view should show vertical list", async ({ page, isMobile }) => {
    // This test is specifically for mobile viewports
    if (!isMobile) return;

    // There are two headers now: vertical watermark and main title
    // We target the main title which is not the vertical one
    // The vertical one has style writing-mode: vertical-rl

    // Or simpler: filter by class or order. The main one is inside a div with 'pt-20'
    const visibleHeader = page
      .locator(".pt-20")
      .getByRole("heading", { name: "EXPERIENCE" });

    await expect(visibleHeader).toBeVisible();

    // Scope search to the experience section to avoid finding other flex-cols
    // The section has the heading "EXPERIENCE"
    const section = page
      .locator("section")
      .filter({ hasText: "EXPERIENCE" })
      .first();

    // Check if the track uses flex-col inside this section
    const track = section.locator(".flex.flex-col").first();
    await expect(track).toBeVisible();
  });

  test("should handle resize without breaking layout", async ({
    page,
    isMobile,
  }) => {
    if (isMobile) return;

    // Initial State
    await expect(page.locator(".md\\:h-screen").first()).toBeVisible();

    // Resize Window
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(500); // Allow GSAP to refresh

    // Check if track is still there
    const track = page.locator(".md\\:flex-row.md\\:px-20");
    await expect(track).toBeVisible();

    // Resize again
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForTimeout(500);
    await expect(track).toBeVisible();
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
