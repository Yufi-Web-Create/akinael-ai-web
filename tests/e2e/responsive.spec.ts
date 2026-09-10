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

  const viewportFit = await page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const selectors = [".site-header", "main", ".site-footer", ".header-actions", ".hero-actions"];
    return selectors.flatMap((selector) =>
      [...document.querySelectorAll<HTMLElement>(selector)].map((element) => {
        const rect = element.getBoundingClientRect();
        return { selector, left: rect.left, right: rect.right, width: rect.width, viewportWidth };
      }),
    );
  });
  for (const rect of viewportFit) {
    expect(rect.left, `${rect.selector} should not begin outside ${path}`).toBeGreaterThanOrEqual(-1);
    expect(rect.right, `${rect.selector} should not end outside ${path}`).toBeLessThanOrEqual(rect.viewportWidth + 1);
  }
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
  test(`${path} is usable at mobile and desktop widths`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await assertUsablePage(page, path);
    await testInfo.attach(`${path.split("/").filter(Boolean).pop()}-390x844`, {
      body: await page.screenshot({ fullPage: true }),
      contentType: "image/png",
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await assertUsablePage(page, path);
    await testInfo.attach(`${path.split("/").filter(Boolean).pop()}-1440x900`, {
      body: await page.screenshot({ fullPage: true }),
      contentType: "image/png",
    });
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
  await widget.locator('input[name="consent"]').check();
  await widget.locator("button[type=submit]").click();
  await expect(widget.locator("[data-register-status]")).toHaveText(/12文字以上/);
  expect(requests, "the register API should not be called for an invalid password").toEqual([]);
});

test("register widget requires acknowledgement before calling the API", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", (req) => {
    if (req.url().includes("/api/v2/auth/register")) requests.push(req.url());
  });
  await page.goto("/", { waitUntil: "networkidle" });
  const widget = page.locator("#register-home");
  await widget.locator('input[type="email"]').fill("owner@example.com");
  await widget.locator('input[type="password"]').fill("safe-test-password");
  await widget.locator("button[type=submit]").click();
  const consentIsMissing = await widget.locator('input[name="consent"]').evaluate(
    (input: HTMLInputElement) => input.validity.valueMissing,
  );
  expect(consentIsMissing).toBe(true);
  expect(requests, "the register API should not be called without acknowledgement").toEqual([]);
});

test("primary and customer CTAs lead to the intended destinations", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "無料でAIに相談する" }).first().click();
  await expect(page.locator("#register-home")).toBeVisible();

  const portalHref = await page.getByRole("link", { name: "Customer Portalへログイン" }).first().getAttribute("href");
  expect(portalHref).toBe("https://akinael-ai.com/portal/");
});

test("register widget follows the Core API success contract", async ({ page }) => {
  await page.route("https://akinael-ai.com/api/v2/auth/register", async (route) => {
    const request = route.request();
    expect(request.method()).toBe("POST");
    expect(request.postDataJSON()).toEqual({ email: "e2e@example.com", password: "safe-test-password" });
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      headers: { "access-control-allow-origin": "*" },
      body: JSON.stringify({ token: "e2e-browser-token" }),
    });
  });
  await page.route("https://akinael-ai.com/portal/", async (route) => {
    await route.fulfill({ status: 200, contentType: "text/html", body: "<title>Portal destination</title>" });
  });

  await page.goto("/", { waitUntil: "networkidle" });
  const widget = page.locator("#register-home");
  await widget.locator('input[type="email"]').fill("e2e@example.com");
  await widget.locator('input[type="password"]').fill("safe-test-password");
  await widget.locator('input[name="consent"]').check();
  await widget.locator("button[type=submit]").click();
  await expect(widget.locator("[data-register-status]")).toHaveText(/登録しました/);
  await expect.poll(() => page.evaluate(() => localStorage.getItem("customer-token"))).toBe("e2e-browser-token");
  await page.waitForURL("https://akinael-ai.com/portal/");
});

test("metadata, structured data, labels, and skip navigation are present", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator('html[lang="ja"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://akinael-ai.com/");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /小さな店舗/);
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(2);
  await expect(page.getByRole("heading", { name: "道具だけを渡すのではなく、確かめてから進める。" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "チャットで話した内容が、この形になります。" })).toBeVisible();
  await expect(page.getByLabel("メールアドレス")).toHaveCount(1);
  await expect(page.getByLabel("パスワード（12文字以上）")).toHaveCount(1);
  await expect(page.getByLabel(/利用条件の現行案内.*個人情報の取扱いに関する現行案内/)).toHaveCount(1);

  const skip = page.getByRole("link", { name: "本文へ移動" });
  await skip.focus();
  await expect(skip).toBeVisible();
  await skip.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
});
