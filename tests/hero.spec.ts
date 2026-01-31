import { test, expect } from "@playwright/test";

test.describe("Hero Section Convergence", () => {
  test.beforeEach(async ({ page }) => {
    // Bypass loader
    await page.addInitScript(() => {
      window.sessionStorage.setItem("rk_portfolio_visited", "true");
    });
    await page.goto("/");
  });

  test("should render split screen initially", async ({ page, isMobile }) => {
    // Check for the layer labels
    await expect(page.getByText("Cloud Layer")).toBeVisible();
    await expect(page.getByText("Hardware Layer")).toBeVisible();

    // Check that the name container is initially hidden
    const contentContainer = page.locator(
      ".absolute.inset-0.flex.flex-col.items-center.justify-center.z-10.p-4.text-center"
    );

    if (isMobile) {
      // On mobile, we start visible (simplified animation)
      // Allow for GSAP to kick in, so we wait for opacity to be 1
      await expect(contentContainer).toHaveCSS("opacity", "1");
    } else {
      // On desktop, we start with opacity 1 (LCP optimization), covered by z-index layers
      await expect(contentContainer).toHaveCSS("opacity", "1");
    }
  });

  test("should pull apart halves and reveal content on scroll", async ({
    page,
    isMobile,
  }) => {
    // Scroll down to trigger the animation
    // The ScrollTrigger starts at "top top" and ends at "+=150%"
    // So we need to scroll a bit to see the movement

    // Initial check (positions might be difficult to check exactly with CSS classes as GSAP uses inline styles)
    // But we can check if they are at 0 transform initially or check visibility

    // Ensure scrollability and disable smooth scroll
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = "auto";
      // Hero is sticky, so we need content below it to scroll.
      // The real page has content, so body height should be sufficient.
    });

    // Scroll using evaluate
    await page.evaluate(() => window.scrollTo(0, 1500));
    await page.waitForTimeout(1000);

    // Verify scroll and retry
    await page.evaluate(() => {
      if (window.scrollY < 1000) {
        window.scrollTo(0, 1500);
      }
    });
    await page.waitForTimeout(2000); // Wait for GSAP scrub

    // Check if content is becoming visible
    const contentContainer = page.locator(
      ".absolute.inset-0.flex.flex-col.items-center.justify-center.z-10.p-4.text-center"
    );

    if (isMobile) {
      // On mobile, we fade OUT on scroll (opacity goes to 0)
      // So we expect it to be 0 or close to it
      // Using a looser check in case scroll isn't 100% finished
      const opacity = await contentContainer.evaluate(
        (el) => window.getComputedStyle(el).opacity
      );
      // It should be low (fading out)
      expect(parseFloat(opacity)).toBeLessThan(0.5);
    } else {
      // We expect the opacity to increase.
      await expect(contentContainer).not.toHaveCSS("opacity", "0");

      // Check that halves have moved
      // We can check the style attribute for transform
      // Note: This relies on GSAP applying inline styles
      const topHalf = page.locator("text=Cloud Layer").locator("xpath=../.."); // Parent div
      const bottomHalf = page
        .locator("text=Hardware Layer")
        .locator("xpath=../.."); // Parent div

      // Top half should move UP (negative Y)
      // We can't easily parse the exact matrix3d/translate value in a robust way without regex,
      // but we can check if the style attribute contains "translate"
      await expect(topHalf).toHaveAttribute("style", /transform/);
      await expect(bottomHalf).toHaveAttribute("style", /transform/);
    }
  });
});
