import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

test("homepage exposes crawl, canonical, and social metadata", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.locator('html[lang="ja"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://akinael-ai.com/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index,follow/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /max-image-preview:large/);

  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute("content", "アキナエルAI");
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", "https://akinael-ai.com/");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://akinael-ai.com/assets/screenshots/public-home.png",
  );
  await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute("content", /アキナエルAI/);

  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
    "content",
    "https://akinael-ai.com/assets/screenshots/public-home.png",
  );
});

test("industry pages expose self-canonical and BreadcrumbList structured data", async ({ page }) => {
  await page.goto("/industries/restaurant/", { waitUntil: "networkidle" });

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://akinael-ai.com/industries/restaurant/",
  );

  const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
  const parsed = jsonLd.map((value) => JSON.parse(value));
  const breadcrumb = parsed.find((value) => value["@type"] === "BreadcrumbList");

  expect(breadcrumb).toBeTruthy();
  expect(breadcrumb.itemListElement).toEqual([
    {
      "@type": "ListItem",
      position: 1,
      name: "アキナエルAI",
      item: "https://akinael-ai.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "カフェ・飲食店向けサービス",
      item: "https://akinael-ai.com/industries/restaurant/",
    },
  ]);
});

test("robots.txt allows crawling and advertises the sitemap", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.ok()).toBe(true);
  const body = await response.text();
  expect(body).toContain("User-agent: *");
  expect(body).toContain("Allow: /");
  expect(body).toContain("Sitemap: https://akinael-ai.com/sitemap-index.xml");
});

test("production build sitemap contains canonical public URLs", async () => {
  const indexXml = await readFile("dist/sitemap-index.xml", "utf8");
  expect(indexXml).toContain("sitemap-0.xml");

  const sitemapXml = await readFile("dist/sitemap-0.xml", "utf8");
  expect(sitemapXml).toContain("https://akinael-ai.com/");
  expect(sitemapXml).toContain("https://akinael-ai.com/industries/restaurant/");
});
