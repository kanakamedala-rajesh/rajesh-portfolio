import { test, expect } from "@playwright/test";

test.describe("Security Headers", () => {
  test("should have strict Content-Security-Policy header", async ({
    page,
  }) => {
    const response = await page.goto("/");
    expect(response).not.toBeNull();

    const headers = response?.headers();
    const csp = headers?.["content-security-policy"];

    expect(csp).toBeDefined();
    // Check for essential CSP directives
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("script-src 'self' 'nonce-");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("base-uri 'self'");

    // Verify unsafe-inline is handled (either allowed with nonce fallback or blocked)
    // In our middleware we allow it but rely on nonce/strict-dynamic to make it safe
    expect(csp).toContain("'unsafe-inline'");
  });

  test("should have other security headers", async ({ page }) => {
    const response = await page.goto("/");
    const headers = response?.headers();

    expect(headers?.["x-content-type-options"]).toBe("nosniff");
    expect(headers?.["x-frame-options"]).toBe("SAMEORIGIN");
    expect(headers?.["referrer-policy"]).toBe(
      "strict-origin-when-cross-origin"
    );
    expect(headers?.["permissions-policy"]).toBeDefined();
  });
});
