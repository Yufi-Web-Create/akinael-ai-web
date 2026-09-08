import { expect, test } from "@playwright/test";

const viewports = [
  { width: 360, height: 800 },
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
] as const;

const industryPaths = [
  "/industries/beauty/",
  "/industries/restaurant/",
  "/industries/school/",
  "/industries/home-service/",
];

const assertUsablePage = async (page: import("@playwright/test").Page, path: string) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto(path, { waitUntil: "networkidle" });

  await expect(page.locator("main")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: "無料でAIに相談する" }).first()).toBeVisible();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow, `horizontal overflow should not exist on ${path}`).toBeLessThanOrEqual(1);

  expect(consoleErrors, `console errors should be empty on ${path}`).toEqual([]);
  expect(pageErrors, `page errors should be empty on ${path}`).toEqual([]);
};

for (const viewport of viewports) {
  test(`home is usable at ${viewport.width}x${viewport.height}`, async ({ page }, testInfo) => {
    await page.setViewportSize(viewport);
    await assertUsablePage(page, "/");
    await testInfo.attach(`home-${viewport.width}x${viewport.height}`, {
      body: await page.screenshot({ fullPage: true }),
      contentType: "image/png",
    });
  });
}

for (const path of industryPaths) {
  test(`${path} is usable at mobile and desktop widths`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await assertUsablePage(page, path);
    await page.setViewportSize({ width: 1440, height: 900 });
    await assertUsablePage(page, path);
  });
}

test("internal navigation links resolve without 404s", async ({ page, request }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const hrefs = await page.$$eval("a[href]", (anchors) =>
    anchors
      .map((a) => a.getAttribute("href") || "")
      .filter((href) => href.startsWith("/") && !href.startsWith("//")),
  );
  const uniqueInternal = [...new Set(hrefs.map((href) => href.split("#")[0]).filter(Boolean))];
  for (const path of uniqueInternal) {
    const response = await request.get(path);
    expect(response.status(), `${path} should not 404`).toBeLessThan(400);
  }
});

test("register widget rejects a short password before calling the API", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", (req) => {
    if (req.url().includes("/api/v2/auth/register")) requests.push(req.url());
  });
  await page.goto("/", { waitUntil: "networkidle" });
  const widget = page.locator("#register-home");
  await widget.locator('input[type="email"]').fill("owner@example.com");
  await widget.locator('input[type="password"]').fill("short");
  await widget.locator("button[type=submit]").click();
  await expect(widget.locator("[data-register-status]")).toHaveText(/12文字以上/);
  expect(requests, "the register API should not be called for an invalid password").toEqual([]);
});
