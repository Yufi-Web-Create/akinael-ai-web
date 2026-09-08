import { expect, test } from "@playwright/test";
const routes = ["service", "pricing", "faq", "cases", "about", "start", "legal", "industries/restaurant", "industries/beauty-salon", "industries/school", "industries/local-service"];
for (const width of [360,375,390,430,768,1024,1280,1440]) {
  test(`detail routes at ${width}px`, async ({page}) => {
    const errors:string[]=[];
    page.on("pageerror", error=>errors.push(error.message));
    page.on("console", message=>{if(message.type()==="error")errors.push(message.text());});
    await page.setViewportSize({width,height:900});
    for (const route of routes) {
      const response=await page.goto(`/${route}/`,{waitUntil:"networkidle"});
      expect(response?.status(),route).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href",`https://akinael-ai.com/${route}/`);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content",/noindex/);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth),route).toBeLessThanOrEqual(1);
    }
    expect(errors).toEqual([]);
  });
}
test("mobile navigation and consultation handoff",async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto("/");
  const menu=page.locator("details.mobile-menu");
  await menu.locator("summary").click();
  await page.keyboard.press("Escape");
  await expect(menu).not.toHaveAttribute("open","");
  await expect(menu.locator("summary")).toBeFocused();
  await menu.locator("summary").click();
  await menu.getByRole("link",{name:"料金",exact:true}).click();
  await expect(page).toHaveURL(/\/pricing\/$/);
  await expect(menu).not.toHaveAttribute("open","");
  await page.getByRole("link",{name:"無料で相談する",exact:true}).last().click();
  await expect(page).toHaveURL(/\/start\/$/);
  await expect(page.getByRole("link",{name:"お客様専用ページへ進む"})).toHaveAttribute("href","https://akinael-ai.com/portal/");
});
