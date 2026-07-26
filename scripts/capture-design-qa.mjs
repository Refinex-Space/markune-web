import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
import { PNG } from "pngjs";

const allRoutes = [
  "/",
  "/about/",
  "/blog/",
  "/blog/what-we-shipped-in-q1/",
  "/blog/the-real-cost-of-context-switching/",
  "/blog/workflow-automation-start-with-these-5-rules/",
  "/blog/how-to-run-a-project-review-that-people-actually-find-useful/",
  "/blog/the-async-first-playbook-for-distributed-teams/",
  "/blog/why-your-team-keeps-missing-deadlines/",
  "/changelog/",
  "/contact/",
  "/legal/privacy-policy/",
  "/legal/terms-of-service/",
];
const routes = process.env.QA_ROUTES
  ? allRoutes.filter((route) => process.env.QA_ROUTES.split(",").includes(route))
  : allRoutes;

if (routes.length === 0) throw new Error("QA_ROUTES did not match any known route");

const allTargets = [
  { name: "source", origin: process.env.QA_SOURCE_ORIGIN ?? "https://kodamatemplate.framer.website" },
  { name: "implementation", origin: process.env.QA_IMPLEMENTATION_ORIGIN ?? "http://127.0.0.1:4273" },
];
const targets = process.env.QA_TARGET
  ? allTargets.filter((target) => target.name === process.env.QA_TARGET)
  : allTargets;

if (targets.length === 0) throw new Error(`Unknown QA_TARGET: ${process.env.QA_TARGET}`);

const allViewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "tablet", width: 1024, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];
const viewports = process.env.QA_VIEWPORTS
  ? allViewports.filter((viewport) => process.env.QA_VIEWPORTS.split(",").includes(viewport.name))
  : allViewports;

if (viewports.length === 0) throw new Error(`QA_VIEWPORTS did not match a known viewport: ${process.env.QA_VIEWPORTS}`);

const outputDirectory = new URL("../design-qa/routes/", import.meta.url);

function routeName(route) {
  return route === "/" ? "home" : route.replace(/^\//, "").replace(/\/$/, "").replaceAll("/", "--");
}

async function loadEveryViewport(page) {
  let previousHeight = 0;
  for (let pass = 0; pass < 3; pass += 1) {
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    const step = Math.max(320, Math.floor((await page.viewportSize()).height * 0.75));
    for (let y = 0; y < height; y += step) {
      await page.evaluate((nextY) => window.scrollTo(0, nextY), y);
      await page.waitForTimeout(70);
    }
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(1_000);
    if (height === previousHeight) break;
    previousHeight = height;
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1_000);
}

async function captureSegmentedPage(page, viewport, path, settleMilliseconds, animations) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const canvas = new PNG({ width: viewport.width, height, colorType: 6 });
  canvas.data.fill(255);

  for (let cropTop = 0; cropTop < height; cropTop += viewport.height) {
    if (cropTop > 0) {
      await page.evaluate(() => {
        document.querySelectorAll("header").forEach((element) => { element.style.visibility = "hidden"; });
        document.querySelectorAll("#__framer-badge-container, #__framer-editorbar").forEach((element) => {
          element.style.visibility = "hidden";
        });
      });
    }
    const scrollY = Math.max(0, Math.min(cropTop, height - viewport.height));
    await page.evaluate((nextY) => window.scrollTo(0, nextY), scrollY);
    await page.waitForTimeout(settleMilliseconds);
    const frame = PNG.sync.read(await page.screenshot({ animations, caret: "hide" }));
    const frameTop = cropTop - scrollY;
    const cropHeight = Math.min(viewport.height - frameTop, height - cropTop);
    PNG.bitblt(frame, canvas, 0, frameTop, viewport.width, cropHeight, 0, cropTop);
  }

  await writeFile(path, PNG.sync.write(canvas));
}

await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch({ headless: true });

try {
  for (const viewport of viewports) {
    for (const target of targets) {
      const page = await browser.newPage({ viewport });
      await page.emulateMedia({ reducedMotion: "no-preference" });
      for (const route of routes) {
        const response = await page.goto(`${target.origin}${route}`, { waitUntil: "domcontentloaded" });
        if (!response?.ok()) throw new Error(`${target.name} ${route} returned ${response?.status() ?? "no response"}`);
        await page.waitForLoadState("load", { timeout: 10_000 }).catch(() => undefined);
        await page.waitForTimeout(500);
        await page.addStyleTag({ content: "html,body{scroll-behavior:auto!important}" });
        await loadEveryViewport(page);
        if (target.name === "implementation") {
          await page.evaluate(() => document.documentElement.dataset.visualRegression = "true");
          await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}" });
        } else {
          await page.addStyleTag({ content: "*,*::before,*::after{caret-color:transparent!important}" });
        }
        await captureSegmentedPage(
          page,
          viewport,
          new URL(`${routeName(route)}--${target.name}--${viewport.name}.png`, outputDirectory),
          target.name === "source" ? 1_800 : 120,
          target.name === "source" ? "allow" : "disabled",
        );
      }
      await page.close();
    }
  }
} finally {
  await browser.close();
}
