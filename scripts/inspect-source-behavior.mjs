import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";

const sourceOrigin = process.env.QA_SOURCE_ORIGIN ?? "http://127.0.0.1:4173";
const implementationOrigin = process.env.QA_IMPLEMENTATION_ORIGIN ?? "http://127.0.0.1:4273";
const viewport = { width: 390, height: 844 };

const aboutAnchors = [
  "Built for teams who ship.",
  "We built Flowline to help teams focus on what matters — getting things done, not fighting their tools.",
  "2.4 million tasks completed through Flowline",
  "Every project management tool we used either buried simple tasks under layers of configuration or fell apart past three people. We built Flowline to sit in the middle — powerful enough for real workflows, simple enough that your whole team actually uses it.",
  "What drives every decision we make.",
  "Trusted by teams like yours.",
  "The people behind Flowline.",
  "Sarah Mitchell",
  "John Krasinski",
  "Ana Moreno",
  "Daniel Keane",
  "David Park",
  "James Okoro",
  "Answers to the questions that come up most.",
];

function trimText(value) {
  return value.replace(/\s+/g, " ").trim();
}

async function measureTextAnchors(page, anchors) {
  return page.evaluate((labels) => {
    const normalize = (value) => (value ?? "").replace(/\s+/g, " ").trim();
    const candidates = Array.from(document.querySelectorAll("h1,h2,h3,p,span,div"));

    return labels.map((label) => {
      const matches = candidates
        .filter((element) => normalize(element.textContent) === label)
        .map((element) => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return {
            tag: element.tagName.toLowerCase(),
            className: typeof element.className === "string" ? element.className : "",
            rect: {
              x: Number(rect.x.toFixed(3)),
              y: Number((rect.y + scrollY).toFixed(3)),
              width: Number(rect.width.toFixed(3)),
              height: Number(rect.height.toFixed(3)),
            },
            style: {
              color: style.color,
              fontFamily: style.fontFamily,
              fontSize: style.fontSize,
              fontWeight: style.fontWeight,
              letterSpacing: style.letterSpacing,
              lineHeight: style.lineHeight,
              textAlign: style.textAlign,
            },
          };
        })
        .filter((match) => match.rect.width > 0 && match.rect.height > 0)
        .sort((a, b) => a.rect.width - b.rect.width || a.rect.height - b.rect.height)
        .slice(0, 3);

      return { label, matches };
    });
  }, anchors);
}

async function inspectTeamCards(page) {
  return page.evaluate(() => {
    const names = ["Sarah Mitchell", "John Krasinski", "Ana Moreno", "Daniel Keane", "David Park", "James Okoro"];
    const normalize = (value) => (value ?? "").replace(/\s+/g, " ").trim();
    const rectOf = (element) => {
      const rect = element.getBoundingClientRect();
      return {
        x: Number(rect.x.toFixed(3)),
        y: Number((rect.y + scrollY).toFixed(3)),
        width: Number(rect.width.toFixed(3)),
        height: Number(rect.height.toFixed(3)),
      };
    };

    return names.map((name) => {
      const title = Array.from(document.querySelectorAll("h3,p,div,span"))
        .filter((element) => normalize(element.textContent) === name)
        .filter((element) => element.getBoundingClientRect().width > 0)
        .sort((a, b) => a.getBoundingClientRect().width - b.getBoundingClientRect().width)[0];
      if (!title) return { name, missing: true };

      const ancestors = [];
      let current = title;
      for (let depth = 0; current && depth < 6; depth += 1, current = current.parentElement) {
        const style = getComputedStyle(current);
        ancestors.push({
          tag: current.tagName.toLowerCase(),
          className: typeof current.className === "string" ? current.className : "",
          rect: rectOf(current),
          style: {
            backgroundColor: style.backgroundColor,
            border: style.border,
            borderRadius: style.borderRadius,
            display: style.display,
            gap: style.gap,
            overflow: style.overflow,
            padding: style.padding,
          },
        });
      }
      return { name, ancestors };
    });
  });
}

async function visibleControl(page, text) {
  const controls = page.locator("a,button,[role='button'],[role='link']").filter({ hasText: text });
  const count = await controls.count();
  for (let index = 0; index < count; index += 1) {
    const control = controls.nth(index);
    if (trimText(await control.innerText()) === text && await control.isVisible()) return control;
  }
  const visibleLabels = await page.locator("a,button,[role='button'],[role='link']").evaluateAll((elements) => elements
    .filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    })
    .map((element) => (element.innerText ?? element.textContent ?? "").replace(/\s+/g, " ").trim())
    .filter(Boolean));
  const related = await page.locator("a,button,[role='button'],[role='link']").evaluateAll((elements, targetText) => elements
    .filter((element) => (element.innerText ?? element.textContent ?? "").replace(/\s+/g, " ").includes(targetText))
    .map((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return {
        tag: element.tagName,
        text: (element.innerText ?? element.textContent ?? "").replace(/\s+/g, " ").trim(),
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
        display: style.display,
        opacity: style.opacity,
        visibility: style.visibility,
      };
    }), text);
  throw new Error(`Visible control not found: ${text}. Available: ${JSON.stringify(visibleLabels)}. Related: ${JSON.stringify(related)}`);
}

async function controlState(control) {
  return control.evaluate((element) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    const child = element.querySelector("svg");
    const childStyle = child ? getComputedStyle(child) : null;
    return {
      rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
      backgroundColor: style.backgroundColor,
      border: style.border,
      borderRadius: style.borderRadius,
      boxShadow: style.boxShadow,
      color: style.color,
      opacity: style.opacity,
      transform: style.transform,
      transition: style.transition,
      child: childStyle ? { color: childStyle.color, transform: childStyle.transform, transition: childStyle.transition } : null,
    };
  });
}

async function inspectControl(page, text) {
  const control = await visibleControl(page, text);
  const before = await controlState(control);
  await control.hover();
  await page.waitForTimeout(220);
  const hover = await controlState(control);
  const box = await control.boundingBox();
  if (!box) throw new Error(`Control has no bounding box: ${text}`);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(80);
  const active = await controlState(control);
  await page.mouse.up();
  await page.mouse.move(0, 0);
  return { text, before, hover, active };
}

async function traceScrollAnimations(page) {
  await page.goto(`${sourceOrigin}/`, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => scrollTo(0, 0));
  const documentHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const found = new Map();

  for (let y = 0; y < documentHeight; y += 560) {
    await page.evaluate((nextY) => scrollTo(0, nextY), y);
    await page.waitForTimeout(24);
    const animations = await page.evaluate(() => document.getAnimations().map((animation) => {
      const target = animation.effect?.target;
      const timing = animation.effect?.getTiming?.();
      const keyframes = animation.effect?.getKeyframes?.();
      return {
        target: target ? {
          tag: target.tagName?.toLowerCase(),
          className: typeof target.className === "string" ? target.className : "",
          name: target.getAttribute?.("data-framer-name"),
          text: (target.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 100),
        } : null,
        playState: animation.playState,
        currentTime: animation.currentTime,
        timing: timing ? {
          delay: timing.delay,
          direction: timing.direction,
          duration: timing.duration,
          easing: timing.easing,
          fill: timing.fill,
          iterations: timing.iterations,
        } : null,
        keyframes: keyframes?.map((frame) => ({
          offset: frame.offset,
          opacity: frame.opacity,
          transform: frame.transform,
          easing: frame.easing,
        })),
      };
    }));

    for (const animation of animations) {
      const signature = JSON.stringify({ target: animation.target, timing: animation.timing, keyframes: animation.keyframes });
      if (!found.has(signature)) found.set(signature, { scrollY: y, ...animation });
    }
  }

  return Array.from(found.values()).filter((animation) => {
    const frames = animation.keyframes ?? [];
    return frames.some((frame) => frame.opacity != null || (frame.transform && frame.transform !== "none"));
  });
}

const browser = await chromium.launch({ headless: true });

try {
  const page = await browser.newPage({ viewport });
  const sourceAnimations = await traceScrollAnimations(page);

  const results = { viewport, sourceAnimations };
  for (const [name, origin] of [["source", sourceOrigin], ["implementation", implementationOrigin]]) {
    await page.goto(`${origin}/`, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(name === "source" ? 1200 : 100);
    results[`${name}Buttons`] = await Promise.all([
      inspectControl(page, "Start Free Trial"),
      inspectControl(page, "Book a Demo"),
    ]);

    await page.goto(`${origin}/about/`, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(100);
    await page.evaluate(() => scrollTo(0, 0));
    results[`${name}AboutAnchors`] = await measureTextAnchors(page, aboutAnchors);
    results[`${name}TeamCards`] = await inspectTeamCards(page);
  }

  const outputPath = new URL("../design-qa/source-behavior.json", import.meta.url);
  await writeFile(outputPath, `${JSON.stringify(results, null, 2)}\n`);
  console.log(`Behavior inspection written to ${outputPath.pathname}`);
} finally {
  await browser.close();
}
