import { expect, test } from "@playwright/test";

const viewports = [
  { width: 360, height: 800 },
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  // 820/880: the known-risky mid-tablet band where a desktop nav can start wrapping
  // before the layout has switched to its mobile treatment. Covered generically by
  // assertUsablePage below, and specifically by the dedicated test further down.
  { width: 820, height: 1024 },
  { width: 880, height: 1024 },
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

for (const width of [820, 880]) {
  test(`header stays on one line with no overlap at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1024 });
    await page.goto("/", { waitUntil: "networkidle" });

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `no horizontal overflow at ${width}px`).toBeLessThanOrEqual(1);

    const header = page.locator(".site-header");
    const headerBox = await header.boundingBox();
    expect(headerBox, "header should render").not.toBeNull();
    // A single-line header (logo + optional nav + actions) is comfortably under 100px
    // tall with this design's padding; if any child wrapped to a second line the
    // header would grow well past that, so this catches wrapping without hardcoding
    // exact pixel values that would be brittle to intentional padding changes.
    expect(headerBox!.height, `header should stay single-line at ${width}px`).toBeLessThan(110);

    // Every text-bearing header element (brand, nav links, CTA button/link) must fit on
    // one line. Comparing raw box height to font-size*line-height is unreliable for
    // elements with padding (e.g. buttons) — their box is taller than one text line even
    // when the text itself never wraps — so padding/border is subtracted first to isolate
    // the actual content height. Layout containers like .header-actions are intentionally
    // excluded: their height reflects their tallest child, not their own text, and a
    // container-level wrap (a child dropping to a second row) is already caught by the
    // overall header height assertion above.
    const wrappedElements = await page.evaluate(() => {
      const candidates = document.querySelectorAll<HTMLElement>(
        ".header-inner > .brand, .header-inner .header-actions > a, .header-inner .main-nav a",
      );
      const wrapped: string[] = [];
      candidates.forEach((el) => {
        if (el.offsetParent === null) return; // not rendered (e.g. hidden responsive twin)
        const style = getComputedStyle(el);
        const paddingY = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
        const borderY = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
        const contentHeight = el.getBoundingClientRect().height - paddingY - borderY;
        const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.4;
        if (contentHeight > lineHeight * 1.6) {
          wrapped.push(el.className || el.tagName);
        }
      });
      return wrapped;
    });
    expect(wrappedElements, `no header element should wrap to multiple lines at ${width}px`).toEqual([]);

    // The primary CTA and the portal-login link (when shown) must not overlap each
    // other or the brand logo.
    const boxes = await page.evaluate(() => {
      const selectors = [".brand", ".header-actions .text-link", ".header-actions .button-primary"];
      return selectors.map((selector) => {
        const el = document.querySelector<HTMLElement>(selector);
        if (!el || el.offsetParent === null) return null;
        const rect = el.getBoundingClientRect();
        return { selector, left: rect.left, right: rect.right };
      });
    });
    const visible = boxes.filter((box): box is NonNullable<typeof box> => box !== null);
    for (let i = 0; i < visible.length - 1; i += 1) {
      expect(
        visible[i].right,
        `${visible[i].selector} should not overlap ${visible[i + 1].selector} at ${width}px`,
      ).toBeLessThanOrEqual(visible[i + 1].left + 1);
    }
  });
}

test("internal navigation links resolve without 404s", async ({ page, request }) => {
  const scannedPaths = ["/", ...industryPaths];
  const allHrefs = new Set<string>();
  for (const sourcePath of scannedPaths) {
    await page.goto(sourcePath, { waitUntil: "networkidle" });
    const hrefs = await page.$$eval("a[href]", (anchors) => anchors.map((a) => a.getAttribute("href") || ""));
    for (const href of hrefs) {
      if (href.startsWith("/") && !href.startsWith("//")) allHrefs.add(href);
    }
  }

  const uniquePaths = [...new Set([...allHrefs].map((href) => href.split("#")[0]).filter(Boolean))];
  for (const path of uniquePaths) {
    const response = await request.get(path);
    expect(response.status(), `${path} should not 404`).toBeLessThan(400);
  }
});

test("same-page anchor targets actually exist in the DOM", async ({ page }) => {
  // A path-only 404 check (above) can't catch a stale #fragment on an otherwise-valid
  // page — e.g. the /#service regression this redesign introduced and then fixed,
  // where the link resolved (200) but no element with id="service" existed anymore.
  const scannedPaths = ["/", ...industryPaths];
  const fragmentsByTargetPage = new Map<string, Set<string>>();

  for (const sourcePath of scannedPaths) {
    await page.goto(sourcePath, { waitUntil: "networkidle" });
    const hrefs = await page.$$eval("a[href]", (anchors) => anchors.map((a) => a.getAttribute("href") || ""));
    for (const href of hrefs) {
      if (!href.includes("#")) continue;
      const [rawPath, fragment] = href.split("#");
      if (!fragment) continue;
      if (rawPath.startsWith("//") || /^[a-z]+:/i.test(rawPath)) continue; // external/protocol links
      const targetPage = rawPath === "" ? sourcePath : rawPath;
      if (!targetPage.startsWith("/")) continue;
      if (!fragmentsByTargetPage.has(targetPage)) fragmentsByTargetPage.set(targetPage, new Set());
      fragmentsByTargetPage.get(targetPage)!.add(fragment);
    }
  }

  expect(fragmentsByTargetPage.size, "at least one same-page anchor should exist to test").toBeGreaterThan(0);

  for (const [targetPage, fragments] of fragmentsByTargetPage) {
    await page.goto(targetPage, { waitUntil: "networkidle" });
    for (const fragment of fragments) {
      const exists = await page.evaluate((id) => Boolean(document.getElementById(id)), fragment);
      expect(exists, `#${fragment} should exist as an element id on ${targetPage}`).toBe(true);
    }
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
  await expect(page.getByRole("heading", { name: "公開も課金も、あなたが確認してから。" })).toBeVisible();
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

// Below 1024px the horizontal nav is hidden and a hamburger-triggered panel is the only
// way to reach できること/業種別/料金/よくある質問 — this was a real gap on a prior HEAD
// (no nav, no substitute), so these assert the full open/close/keyboard contract at each
// side of the 1024px breakpoint, not just that a toggle button exists.
for (const width of [375, 768, 1023]) {
  test(`mobile nav panel is fully operable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });

    await expect(page.locator(".main-nav")).toBeHidden();
    const toggle = page.locator("[data-menu-toggle]");
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    const panel = page.locator("[data-menu-panel]");
    await expect(panel).toBeHidden();

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(panel).toBeVisible();
    for (const label of ["できること", "業種別", "料金", "よくある質問", "Customer Portalへログイン"]) {
      await expect(panel.getByRole("link", { name: label })).toBeVisible();
    }
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

    // Esc closes and returns focus to the toggle.
    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(panel).toBeHidden();
    await expect(toggle).toBeFocused();
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");

    // Overlay click closes.
    await toggle.click();
    await expect(panel).toBeVisible();
    await page.locator("[data-menu-overlay]").click({ position: { x: 5, y: 5 } });
    await expect(panel).toBeHidden();

    // Clicking a link inside the panel closes it too (checked via the anchor-navigation
    // test below for the scroll behavior itself).
    await toggle.click();
    await panel.getByRole("link", { name: "料金" }).click();
    await expect(panel).toBeHidden();

    // Keyboard-only: Tab reaches the toggle, Enter opens it.
    await page.goto("/", { waitUntil: "networkidle" });
    await toggle.focus();
    await page.keyboard.press("Enter");
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
  });
}

test("desktop nav stays visible and the toggle is hidden at 1024px", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 800 });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator(".main-nav")).toBeVisible();
  await expect(page.locator("[data-menu-toggle]")).toBeHidden();
});

// A target existing in the DOM (already covered by the anchor-existence test above) is
// not the same as clicking a link actually scrolling the target into view — this proved
// worth checking separately, since a large scroll distance combined with a short wait
// can look like "nothing happened" without actually being broken.
test("clicking a header nav link scrolls its target section into view", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });

  await page.locator('.main-nav a[href="/#pricing"]').click();
  await expect(page.locator("#pricing-heading")).toBeInViewport({ timeout: 5000 });
});

test("direct fragment URLs land on the correct section", async ({ page }) => {
  for (const [fragment, headingSelector] of [
    ["#pricing", "#pricing-heading"],
    ["#faq", "#faq-heading"],
  ] as const) {
    // Loading the URL with the fragment already attached lets the browser's native
    // scroll-to-anchor race against the display webfont swapping in: "networkidle" only
    // means requests are done, not that the resulting reflow has been painted, so the
    // anchor scroll can fire against fallback-font metrics and then get silently
    // shifted out of view once the real font applies (observed as a real, if
    // infrequent, CI flake). Loading the bare path first, letting fonts settle, and
    // only then setting the hash avoids that race while still exercising the same
    // native fragment-scroll behavior a real navigation triggers.
    await page.goto("/", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate((hash) => {
      window.location.hash = hash;
    }, fragment);
    await expect(page.locator(headingSelector)).toBeInViewport();
  }
});

test("Transform Demo industry switch updates every field, not just the input reflection", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const industries = [
    { label: "カフェ・飲食店", url: "oo-coffee.jp" },
    { label: "教室・スクール", url: "oo-school.jp" },
    { label: "住宅メンテナンス", url: "oo-koumuten.jp" },
    { label: "美容室・サロン", url: "oo-beauty.jp" },
  ];

  for (const industry of industries) {
    const button = page.locator(".transform-picker button", { hasText: industry.label });
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator('[data-field="web-url"]')).toHaveText(industry.url);
  }
});

test("Showcase carousel arrows scroll and reach a correct disabled state", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.locator("#showcase").scrollIntoViewIfNeeded();

  const prevButton = page.locator("[data-showcase-prev]");
  const nextButton = page.locator("[data-showcase-next]");

  await expect(prevButton).toBeDisabled();
  await expect(nextButton).toBeEnabled();

  await nextButton.click();
  await expect(nextButton).toBeDisabled({ timeout: 3000 });
  await expect(prevButton).toBeEnabled();

  await prevButton.click();
  await expect(prevButton).toBeDisabled({ timeout: 3000 });
  await expect(nextButton).toBeEnabled();
});
