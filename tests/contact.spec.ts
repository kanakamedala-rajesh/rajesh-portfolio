import { test, expect } from "@playwright/test";

test.describe("Contact Terminal Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for loader to finish and terminal to be present
    await page.waitForSelector("text=INITIALIZING KERNEL...", {
      state: "detached",
      timeout: 15000,
    });
  });

  test("should reveal footer and allow full terminal interaction", async ({
    page,
  }) => {
    // Scroll to bottom to reveal footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const terminalSection = page.locator("#contact-terminal");
    await expect(terminalSection).toBeVisible();

    const input = page.locator('input[aria-label="Terminal Input"]');
    await expect(input).toBeVisible();

    // Verify input is automatically focused on desktop when in view
    const viewport = page.viewportSize();
    if (viewport && viewport.width >= 1024) {
      await expect(input).toBeFocused();
    }

    // 1. Test 'help' command
    await input.fill("help");
    await input.press("Enter");
    const terminalBody = page.locator("#contact-terminal .overflow-y-auto");
    await expect(
      terminalBody.locator("text=Available commands:")
    ).toBeVisible();
    await expect(
      terminalBody.locator("li").filter({ hasText: "resume" })
    ).toBeVisible();

    // 2. Test 'whoami' command
    await input.fill("whoami");
    await input.press("Enter");
    // Use exact match to avoid matching the prompt "guest@rk-portfolio:~$"
    await expect(
      page.getByText("guest@rk-portfolio", { exact: true })
    ).toBeVisible();

    // 3. Test 'email' command
    await input.fill("email");
    await input.press("Enter");
    await expect(page.locator("text=Opening mail client...")).toBeVisible();

    // 4. Test 'linkedin' command
    await input.fill("linkedin");
    await input.press("Enter");
    await expect(
      page.locator("text=Opening LinkedIn profile...")
    ).toBeVisible();

    // 5. Test 'resume' command
    await input.fill("resume");
    await input.press("Enter");
    await expect(
      page.locator("text=Initiating download sequence...")
    ).toBeVisible();

    // 6. Test 'clear' command
    // Verify content exists before clearing
    // Use first() to just check if *any* prompt exists from history
    await expect(
      page.locator("text=Opening LinkedIn profile...")
    ).toBeVisible();

    await input.fill("clear");
    await input.press("Enter");

    // After clear, history should be empty.
    await expect(
      page.locator("text=Opening LinkedIn profile...")
    ).not.toBeVisible();

    // 7. Test 'unknown' command
    await input.fill("foobar");
    await input.press("Enter");
    await expect(page.locator("text=Command not found: foobar")).toBeVisible();
  });
});
