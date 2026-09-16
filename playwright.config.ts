import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run dev -- --host 127.0.0.1",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    // Recent Astro versions auto-detect an AI coding agent's environment and silently fork
    // `astro dev` into a self-managed background daemon, exiting the process Playwright
    // itself spawned almost immediately ("Process from config.webServer exited early") even
    // though the daemon goes on to serve the port just fine. ASTRO_DEV_BACKGROUND (any
    // non-empty value) opts back into the normal foreground server Playwright's webServer
    // lifecycle expects — see node_modules/astro/dist/cli/dev/index.js.
    env: { ASTRO_DEV_BACKGROUND: "0" },
  },
});
