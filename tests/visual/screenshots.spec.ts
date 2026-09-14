import { test } from "@playwright/test";

// Full-page evidence screenshots against a production build (see playwright.visual.config.ts).
// Run with: npm run qa:visual
// Output lands in visual-evidence/ (gitignored) for manual design review.
const viewports = [
  { name: "360", width: 360, height: 900 },
  { name: "390", width: 390, height: 900 },
  { name: "820", width: 820, height: 1100 },
  { name: "1440", width: 1440, height: 950 },
] as const;

for (const viewport of viewports) {
  test(`home full-page screenshot at ${viewport.width}px (production preview)`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/", { waitUntil: "networkidle" });

    // Confirm no dev-only UI leaked into a production build (Astro Dev Toolbar, etc.).
    const devToolbar = page.locator("astro-dev-toolbar");
    await test.expect(devToolbar).toHaveCount(0);

    await page.screenshot({
      path: `visual-evidence/home-${viewport.name}.png`,
      fullPage: true,
    });
  });
}
