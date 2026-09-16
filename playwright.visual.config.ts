import { defineConfig, devices } from "@playwright/test";

// Dedicated config for visual QA evidence. Unlike playwright.config.ts (which points at
// `astro dev` for fast functional-test iteration), this always exercises a production build
// — the dev server injects the Astro Dev Toolbar into every page, which has no place in
// visual QA screenshots meant to represent what a visitor actually sees.
//
// The server is `scripts/serve-dist.mjs`, a plain Node static server, not `astro preview`:
// `astro preview` detaches into a background daemon right after it reports readiness, so
// Playwright's webServer launcher sees the wrapping process exit and aborts with "Process
// from config.webServer exited early" even though the daemon is still up. A foreground
// server sidesteps that entirely.
//
// reuseExistingServer is unconditionally false (not just `!process.env.CI`): every run of
// `npm run qa:visual`, local or CI, must build from current source and serve that fresh
// build — screenshots against a stale previous build would defeat the point of this suite.
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
    command: "npm run build && node scripts/serve-dist.mjs 4310 127.0.0.1",
    url: "http://127.0.0.1:4310",
    reuseExistingServer: false,
    timeout: 180_000,
  },
});
