import { describe, expect, it } from "vitest";
import { siteConfig } from "../../src/lib/site-config";

describe("siteConfig", () => {
  it("has a clear primary CTA", () => {
    expect(siteConfig.primaryCta.label).toBe("無料で相談する");
    expect(siteConfig.primaryCta.href).toBeTruthy();
  });

  it("does not contain duplicate navigation destinations", () => {
    const destinations = siteConfig.nav.map((item) => item.href);
    expect(new Set(destinations).size).toBe(destinations.length);
  });
});
