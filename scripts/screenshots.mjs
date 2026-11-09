/*
  Breakpoint capture + overflow audit.

  Used by the `qa-visual` agent. Requires the dev server running:

    npm run dev
    node scripts/screenshots.mjs
    PAGES=/shop,/shop/blush-baggy node scripts/screenshots.mjs

  Writes tests/screenshots/<page>/<width>.png and reports, for each width,
  whether the document overflows horizontally (scrollWidth > clientWidth) and
  which interactive targets are under 44×44. Any overflow is a failure — see
  .claude/skills/responsive/SKILL.md.

  Uses an installed Chrome/Edge via puppeteer-core, so no browser is downloaded.
*/
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
];

const executablePath = process.env.CHROME_PATH || CANDIDATES.find((p) => existsSync(p));
if (!executablePath) {
  console.error("No Chrome/Edge found. Install one or set CHROME_PATH.");
  process.exit(1);
}

const base = process.argv[2] || process.env.BASE_URL || "http://localhost:3000";
const pages = (process.env.PAGES || "/").split(",").map((p) => p.trim()).filter(Boolean);
const widths = [320, 375, 430, 768, 1024, 1440, 1920];
const fullPage = process.env.FULL === "1";
const outRoot = path.join(process.cwd(), "tests", "screenshots");

const browser = await puppeteer.launch({
  executablePath,
  headless: "new",
  args: ["--hide-scrollbars", "--disable-gpu"],
});

let failed = false;

for (const route of pages) {
  const slug = route === "/" ? "home" : route.replace(/\//g, "-").replace(/^-/, "");
  const outDir = path.join(outRoot, slug);
  mkdirSync(outDir, { recursive: true });
  console.log(`\n${route}`);

  for (const width of widths) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 812, deviceScaleFactor: 1 });
    await page.goto(`${base}${route}`, { waitUntil: "networkidle0", timeout: 60000 });

    const result = await page.evaluate(() => {
      const doc = document.documentElement;
      const overflow = doc.scrollWidth - doc.clientWidth;
      const small = [...document.querySelectorAll("a, button, input, [role='button']")]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44);
        })
        .map((el) => {
          const r = el.getBoundingClientRect();
          const text = (el.textContent || "").trim().slice(0, 24);
          return `${el.tagName.toLowerCase()} "${text}" ${Math.round(r.width)}x${Math.round(r.height)}`;
        });
      return { overflow, small };
    });

    if (fullPage) {
      // Trigger lazy-loaded images before capturing the whole page.
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let y = 0;
          const step = () => {
            y += window.innerHeight;
            window.scrollTo(0, y);
            if (y < document.body.scrollHeight) {
              setTimeout(step, 120);
            } else {
              window.scrollTo(0, 0);
              setTimeout(resolve, 400);
            }
          };
          step();
        });
      });
      await page.waitForNetworkIdle({ idleTime: 300 }).catch(() => {});
    }

    await page.screenshot({
      path: path.join(outDir, `${width}${fullPage ? "-full" : ""}.png`),
      fullPage,
    });
    await page.close();

    const ok = result.overflow <= 0;
    if (!ok) failed = true;
    console.log(
      `  ${String(width).padStart(4)}px  overflow: ${String(result.overflow).padStart(4)}  ${ok ? "OK" : "FAIL"}` +
        (result.small.length ? `\n          small targets: ${result.small.join("; ")}` : ""),
    );
  }
}

await browser.close();
console.log(failed ? "\nRESULT: FAIL" : "\nRESULT: PASS");
process.exit(failed ? 1 : 0);
