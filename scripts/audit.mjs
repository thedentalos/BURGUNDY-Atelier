/*
  Design audit — dumps computed typography, spacing and colour values from a
  running page so reviews cite measurements rather than impressions.

    node scripts/audit.mjs [url] [width]

  Not a pass/fail tool; it produces the numbers the design review reasons about.
*/
import { existsSync } from "node:fs";
import puppeteer from "puppeteer-core";

const CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
];

const executablePath = CANDIDATES.find((p) => existsSync(p));
const url = process.argv[2] || "http://localhost:3000/";
const width = Number(process.argv[3] || 1440);

const browser = await puppeteer.launch({
  executablePath,
  headless: "new",
  args: ["--hide-scrollbars", "--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

const out = await page.evaluate(() => {
  const px = (v) => Math.round(parseFloat(v) * 10) / 10;
  const style = (el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      tag: el.tagName.toLowerCase(),
      text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 46),
      fontSize: px(cs.fontSize),
      lineHeight: px(cs.lineHeight),
      letterSpacing: px(cs.letterSpacing),
      fontFamily: cs.fontFamily.split(",")[0].replace(/"/g, ""),
      weight: cs.fontWeight,
      color: cs.color,
      bg: cs.backgroundColor,
      padding: `${px(cs.paddingTop)}/${px(cs.paddingRight)}/${px(cs.paddingBottom)}/${px(cs.paddingLeft)}`,
      marginTop: px(cs.marginTop),
      width: Math.round(r.width),
      height: Math.round(r.height),
    };
  };

  const sections = [...document.querySelectorAll("main > section, main > div")].map(
    (el, i) => {
      const s = style(el);
      return { i, ...s, text: s.text.slice(0, 40) };
    },
  );

  const h1 = document.querySelector("h1");
  const h2s = [...document.querySelectorAll("h2")];
  const productName = document.querySelector("main h3");
  const productPrice = productName?.parentElement?.querySelector("p");
  const paras = [...document.querySelectorAll("main p")].slice(0, 4);
  const buttons = [...document.querySelectorAll("main a")].filter((a) =>
    /discover|view all|message us|read more/i.test(a.textContent || ""),
  );

  const grid = document.querySelector("main section:nth-of-type(2) .grid");

  return {
    viewport: { width: window.innerWidth, height: window.innerHeight },
    body: style(document.body),
    announcement: document.querySelector("body > div") ? style(document.querySelector("body > div")) : null,
    header: style(document.querySelector("header")),
    h1: h1 ? style(h1) : null,
    h2s: h2s.map(style),
    sections,
    productName: productName ? style(productName) : null,
    productPrice: productPrice ? style(productPrice) : null,
    paragraphs: paras.map(style),
    buttons: buttons.map(style),
    gridGap: grid
      ? {
          columnGap: px(getComputedStyle(grid).columnGap),
          rowGap: px(getComputedStyle(grid).rowGap),
          cols: getComputedStyle(grid).gridTemplateColumns,
        }
      : null,
    footer: style(document.querySelector("footer")),
  };
});

console.log(JSON.stringify(out, null, 2));
await browser.close();
