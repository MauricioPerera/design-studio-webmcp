import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";

const server = spawn("npm", ["run", "start"], { stdio: "inherit", shell: true });
const source = new URL("../dist/client/design-studio-webmcp/_next", import.meta.url);
const output = new URL("../dist/pages/_next", import.meta.url);
const index = new URL("../dist/pages/index.html", import.meta.url);
try {
  let html = "";
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try { const response = await fetch("http://127.0.0.1:8787/design-studio-webmcp/"); if (response.ok) { html = await response.text(); break; } } catch {}
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  if (!html) throw new Error("The production server did not become ready for the GitHub Pages snapshot.");
  await rm(new URL("../dist/pages", import.meta.url), { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  await cp(source, output, { recursive: true });
  await writeFile(index, html, "utf8");
  await cp(new URL("../dist/client/404.html", import.meta.url), new URL("../dist/pages/404.html", import.meta.url));
} finally { server.kill(); }
