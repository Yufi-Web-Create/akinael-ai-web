import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://akinael-ai.com",
  integrations: [sitemap()],
  server: { port: 3000 },
});
