#!/usr/bin/env node
// Minimal static file server for dist/, used only by the visual-QA Playwright config.
//
// `astro preview` detaches into a background daemon as soon as it reports the server is
// up (the same "astro dev stop/status/logs" daemon pattern astro dev uses) — the wrapping
// process then exits 0 almost immediately, which Playwright's `webServer` launcher reads
// as "the server process died" and aborts with "Process from config.webServer exited
// early", even though the daemon itself is still serving. Using Node's own http server
// here instead keeps a real foreground process alive for the whole test run, which is
// exactly what `webServer` expects, and needs no extra dependency.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../dist/", import.meta.url));
const port = Number(process.argv[2] ?? process.env.PORT ?? 4310);
const host = process.argv[3] ?? "127.0.0.1";

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", "http://localhost");
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.endsWith("/")) pathname += "index.html";

    let filePath = normalize(join(root, pathname));
    if (!filePath.startsWith(root)) throw new Error("path escapes dist/");

    const fileStat = await stat(filePath).catch(() => null);
    if (fileStat?.isDirectory()) filePath = join(filePath, "index.html");

    const body = await readFile(filePath);
    res.writeHead(200, { "Content-Type": contentTypes[extname(filePath)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    try {
      const notFound = await readFile(join(root, "404.html"));
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end(notFound);
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
    }
  }
});

server.listen(port, host, () => {
  console.log(`Static dist/ preview server running at http://${host}:${port}`);
});
