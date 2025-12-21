import { test, expect } from "@playwright/test";

test.describe("Hero Section Convergence", () => {
  test.beforeEach(async ({ page }) => {
    // Bypass loader
    await page.addInitScript(() => {
      window.sessionStorage.setItem("rk_portfolio_visited", "true");
    });
    await page.goto("/");
  });

  test("should render split screen initially", async ({ page }) => {
    // Check for the layer labels
    await expect(page.getByText("Cloud Layer")).toBeVisible();
    await expect(page.getByText("Hardware Layer")).toBeVisible();

    // Check that the name container is initially hidden
    const contentContainer = page.locator(
      ".absolute.inset-0.flex.flex-col.items-center.justify-center.z-10.p-4.text-center"
    );
    await expect(contentContainer).toHaveCSS("opacity", "0");
  });

  test("should pull apart halves and reveal content on scroll", async ({
    page,
  }) => {
    // Scroll down to trigger the animation
    // The ScrollTrigger starts at "top top" and ends at "+=150%"
    // So we need to scroll a bit to see the movement

    // Initial check (positions might be difficult to check exactly with CSS classes as GSAP uses inline styles)
    // But we can check if they are at 0 transform initially or check visibility

    // Scroll
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(1000); // Wait for GSAP scrub

    // Check if content is becoming visible
    const contentContainer = page.locator(
      ".absolute.inset-0.flex.flex-col.items-center.justify-center.z-10.p-4.text-center"
    );

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
  });
});
