import { test, expect } from "@playwright/test";

test.describe("Remediation Verification - SEO & Accessibility", () => {
  test.use({ javaScriptEnabled: false });

  test("ExperienceTunnel should render accessible fallback content (sr-only) when JS is disabled", async ({
    page,
  }) => {
    await page.goto("/");

    // Locate the experience section
    const section = page.locator("#experience");
    await expect(section).toBeAttached();

    // Check for the sr-only heading
    const heading = section.locator("h2.sr-only");
    await expect(heading).toContainText("Professional Experience");

    // Check for the sr-only content container
    // The component renders: <div className="sr-only">{resumeData...}</div>
    // We look for a div with sr-only class that contains some known resume text
    const content = section.locator("div.sr-only");
    await expect(content).toBeAttached();
    await expect(content).toContainText("CNH Industrial");
  });
});

test.describe("Remediation Verification - Accessibility", () => {
  test("Navbar logo link should have accessible name", async ({ page }) => {
    await page.goto("/");
    const logoLink = page.locator('header a[aria-label="Home"]');
    await expect(logoLink).toBeVisible();
  });
});

test.describe("Remediation Verification - Security", () => {
  test("Inline scripts should execute (CSP Nonce applied correctly)", async ({
    page,
  }) => {
    // 1. Set the session storage to trigger the script's logic
    await page.goto("/");
    await page.evaluate(() => {
      sessionStorage.setItem("rk_portfolio_visited", "true");
    });

    // 2. Reload the page. The inline script should run immediately.
    await page.reload();

    // 3. Check if the 'visited-mode' class was added to <html>
    // If the CSP blocked the script, this class will NOT be present.
    const html = page.locator("html");
    await expect(html).toHaveClass(/visited-mode/);

    // 4. Also verify no CSP errors in console
    // (This is passive, handled by Playwright usually throwing on page errors if configured,
    // but explicit check is good if we hooked console)
  });
});
