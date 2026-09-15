import { expect, test } from "@playwright/test";

// Full-page evidence screenshots against a production build (see playwright.visual.config.ts).
// Run with: npm run qa:visual
// Output lands in visual-evidence/ (gitignored, and uploaded as a CI artifact) for design review.
const homeViewports = [
  { name: "375", width: 375, height: 900 },
  { name: "390", width: 390, height: 900 },
  { name: "768", width: 768, height: 1024 },
  { name: "820", width: 820, height: 1100 },
  { name: "1023", width: 1023, height: 900 },
  { name: "1024", width: 1024, height: 900 },
  { name: "1440", width: 1440, height: 950 },
] as const;

const industryPages = [
  { slug: "beauty", path: "/industries/beauty/" },
  { slug: "restaurant", path: "/industries/restaurant/" },
  { slug: "school", path: "/industries/school/" },
  { slug: "home-service", path: "/industries/home-service/" },
] as const;

const industryViewports = [
  { name: "390", width: 390, height: 900 },
  { name: "1440", width: 1440, height: 950 },
] as const;

const assertCleanProductionPage = async (page: import("@playwright/test").Page, path: string) => {
  await page.goto(path, { waitUntil: "networkidle" });

  // Confirm no dev-only UI leaked into a production build (Astro Dev Toolbar, etc.).
  await expect(page.locator("astro-dev-toolbar")).toHaveCount(0);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow, `no horizontal overflow on ${path}`).toBeLessThanOrEqual(1);

  await expect(page.locator("main"), `main should render on ${path}`).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 }), `hero heading should render on ${path}`).toBeVisible();
  await expect(
    page.getByRole("link", { name: "無料でAIに相談する" }).first(),
    `primary CTA should render on ${path}`,
  ).toBeVisible();
  await expect(page.locator(".site-footer"), `page should render through to the footer on ${path}`).toBeVisible();
};

for (const viewport of homeViewports) {
  test(`home full-page screenshot at ${viewport.width}px (production preview)`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await assertCleanProductionPage(page, "/");
    await page.screenshot({ path: `visual-evidence/home-${viewport.name}.png`, fullPage: true });
  });
}

for (const industry of industryPages) {
  for (const viewport of industryViewports) {
    test(`${industry.path} full-page screenshot at ${viewport.width}px (production preview)`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await assertCleanProductionPage(page, industry.path);
      await page.screenshot({
        path: `visual-evidence/industry-${industry.slug}-${viewport.name}.png`,
        fullPage: true,
      });
    });
  }
}
