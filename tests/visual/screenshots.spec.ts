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

// A fullPage screenshot stitches the whole document, but that alone doesn't guarantee
// every loading="lazy" image actually finished loading by the time the pixels are
// captured — a real image (e.g. the final-CTA photo) can silently be missing from the
// evidence while the underlying <img> tag is perfectly correct in the markup. This
// walks the page the way a visitor's scroll would, giving every lazy image a chance to
// start loading, then asserts each one actually finished (not just "requested").
const scrollThroughAndVerifyImages = async (page: import("@playwright/test").Page, path: string) => {
  const failedImageRequests: string[] = [];
  page.on("requestfailed", (request) => {
    if (request.resourceType() === "image") {
      failedImageRequests.push(`${request.url()} (${request.failure()?.errorText ?? "unknown error"})`);
    }
  });

  const viewportHeight = page.viewportSize()?.height ?? 900;
  const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const steps = Math.max(1, Math.ceil(docHeight / viewportHeight));

  for (let step = 0; step <= steps; step += 1) {
    await page.evaluate((y) => window.scrollTo(0, y), step * viewportHeight);
    await page.waitForTimeout(120);
  }

  // Only images actually rendered at this viewport count — e.g. the final-CTA photo is
  // display:none below 900px, and a display:none <img> is never fetched at all, so
  // waiting for it to become "complete" would hang forever rather than reveal a bug.
  await page.waitForFunction(
    () => [...document.querySelectorAll("img")].filter((img) => img.offsetParent !== null).every((img) => img.complete),
    undefined,
    { timeout: 10_000 },
  );

  const brokenImages = await page.evaluate(() =>
    [...document.querySelectorAll("img")]
      .filter((img) => img.offsetParent !== null)
      .filter((img) => !img.complete || img.naturalWidth === 0)
      .map((img) => img.currentSrc || img.src),
  );

  expect(brokenImages, `every <img> should finish loading (complete, naturalWidth > 0) on ${path}`).toEqual([]);
  expect(failedImageRequests, `no image request should fail on ${path}`).toEqual([]);

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(100);
};

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

  await scrollThroughAndVerifyImages(page, path);
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
