import { defineConfig, devices } from "@playwright/test";

// Dedicated config for visual QA evidence. Unlike playwright.config.ts (which points at
// `astro dev` for fast functional-test iteration), this always exercises a production build
// through `astro preview` — the dev server injects the Astro Dev Toolbar into every page,
// which has no place in visual QA screenshots meant to represent what a visitor actually sees.
export default defineConfig({
  testDir: "./tests/visual",
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:4310",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run build && npm run preview -- --port 4310 --strictPort --host 127.0.0.1",
    url: "http://127.0.0.1:4310",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
