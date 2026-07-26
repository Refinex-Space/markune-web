import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";

const sourceOrigin = process.env.QA_SOURCE_ORIGIN ?? "https://kodamatemplate.framer.website";
const implementationOrigin = process.env.QA_IMPLEMENTATION_ORIGIN ?? "http://127.0.0.1:4273";
const mobileViewport = { width: 390, height: 844 };
const articleSlugs = [
  "what-we-shipped-in-q1",
  "the-real-cost-of-context-switching",
  "workflow-automation-start-with-these-5-rules",
  "how-to-run-a-project-review-that-people-actually-find-useful",
  "the-async-first-playbook-for-distributed-teams",
  "why-your-team-keeps-missing-deadlines",
];

async function prepare(page, url, reducedMotion = "reduce") {
  await page.emulateMedia({ reducedMotion });
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    scrollTo(0, 0);
  });
  await page.waitForTimeout(reducedMotion === "reduce" ? 250 : 1200);
}

async function revealEverySection(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = Math.max(320, Math.floor(mobileViewport.height * 0.75));
  for (let y = 0; y < height; y += step) {
    await page.evaluate((nextY) => scrollTo(0, nextY), y);
    await page.waitForTimeout(55);
  }
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(240);
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(160);
}

async function inspectAbout(page) {
  return page.evaluate(() => {
    const normalizeText = (value) => (value ?? "").replace(/\s+/g, " ").trim();
    const rectOf = (element) => {
      const rect = element.getBoundingClientRect();
      return {
        x: Number(rect.x.toFixed(3)),
        y: Number((rect.y + scrollY).toFixed(3)),
        width: Number(rect.width.toFixed(3)),
        height: Number(rect.height.toFixed(3)),
      };
    };
    const styleOf = (element) => {
      const style = getComputedStyle(element);
      return {
        display: style.display,
        gridTemplateColumns: style.gridTemplateColumns,
        gap: style.gap,
        padding: style.padding,
        margin: style.margin,
        backgroundColor: style.backgroundColor,
        border: style.border,
        borderRadius: style.borderRadius,
        overflow: style.overflow,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        letterSpacing: style.letterSpacing,
        textAlign: style.textAlign,
      };
    };
    const exact = (text, selector = "h1,h2,h3,p,span,div") => Array.from(document.querySelectorAll(selector))
      .filter((element) => normalizeText(element.textContent) === text)
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
      })
      .sort((a, b) => {
        const aRect = a.getBoundingClientRect();
        const bRect = b.getBoundingClientRect();
        return aRect.width * aRect.height - bRect.width * bRect.height;
      })[0];
    const snapshot = (element) => element ? {
      tag: element.tagName.toLowerCase(),
      className: typeof element.className === "string" ? element.className : "",
      rect: rectOf(element),
      style: styleOf(element),
    } : null;
    const ancestors = (element, depth = 5) => {
      const result = [];
      let current = element;
      for (let index = 0; current && index < depth; index += 1, current = current.parentElement) {
        result.push(snapshot(current));
      }
      return result;
    };
    const labels = [
      "Built for teams who ship.",
      "2.4 million tasks completed through Flowline",
      "Every project management tool we used either buried simple tasks under layers of configuration or fell apart past three people. We built Flowline to sit in the middle — powerful enough for real workflows, simple enough that your whole team actually uses it.",
      "What drives every decision we make.",
      "Trusted by teams like yours.",
      "The people behind Flowline.",
      "Sarah Mitchell",
      "Answers to the questions that come up most.",
    ];
    const valueTitles = ["Simplicity first", "Speed matters", "Teams over features"];
    const teamNames = ["Sarah Mitchell", "John Krasinski", "Ana Moreno", "Daniel Keane", "David Park", "James Okoro"];
    const imageElements = Array.from(document.images)
      .filter((image) => image.getBoundingClientRect().width > 300)
      .map((image) => ({ alt: image.alt, src: image.currentSrc, ...snapshot(image) }))
      .sort((a, b) => a.rect.y - b.rect.y);

    return {
      bodyHeight: document.documentElement.scrollHeight,
      labels: Object.fromEntries(labels.map((label) => {
        const element = exact(label);
        return [label, element ? {
          ...snapshot(element),
          descendants: Array.from(element.querySelectorAll("h1,h2,h3,p,div,span")).slice(0, 8).map(snapshot),
        } : null];
      })),
      valueCards: valueTitles.map((title) => {
        const element = exact(title);
        const card = element?.closest("article") ?? element?.parentElement?.parentElement;
        const svg = card?.querySelector("svg");
        return { title, card: snapshot(card), titleElement: snapshot(element), svg: snapshot(svg), svgMarkup: svg?.outerHTML ?? null };
      }),
      teamCards: teamNames.map((name) => ({ name, ancestors: ancestors(exact(name), 6) })),
      images: imageElements,
    };
  });
}

async function inspectArticle(page) {
  return page.evaluate(() => {
    const normalizeText = (value) => (value ?? "").replace(/\s+/g, " ").trim();
    const rectOf = (element) => {
      const rect = element.getBoundingClientRect();
      return {
        x: Number(rect.x.toFixed(3)),
        y: Number((rect.y + scrollY).toFixed(3)),
        width: Number(rect.width.toFixed(3)),
        height: Number(rect.height.toFixed(3)),
      };
    };
    const snapshot = (element) => {
      const style = getComputedStyle(element);
      return {
        tag: element.tagName.toLowerCase(),
        className: typeof element.className === "string" ? element.className : "",
        text: normalizeText(element.textContent).slice(0, 240),
        rect: rectOf(element),
        style: {
          color: style.color,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          letterSpacing: style.letterSpacing,
          textAlign: style.textAlign,
          margin: style.margin,
          padding: style.padding,
          borderRadius: style.borderRadius,
        },
      };
    };
    const visible = (element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
    };
    const all = (selector) => Array.from(document.querySelectorAll(selector))
      .filter(visible)
      .map(snapshot)
      .sort((a, b) => a.rect.y - b.rect.y || a.rect.x - b.rect.x);
    const wideImages = Array.from(document.images)
      .filter(visible)
      .filter((image) => image.getBoundingClientRect().width > 300)
      .map((image) => ({ alt: image.alt, src: image.currentSrc, ...snapshot(image) }))
      .sort((a, b) => a.rect.y - b.rect.y);

    return {
      bodyHeight: document.documentElement.scrollHeight,
      headings: all("h1,h2"),
      paragraphs: all("p").filter((item) => item.rect.width > 240),
      wideImages,
    };
  });
}

async function nestedControlState(control) {
  return control.evaluate((element) => {
    const collect = (node) => {
      const style = getComputedStyle(node);
      const rect = node.getBoundingClientRect();
      return {
        tag: node.tagName.toLowerCase(),
        className: typeof node.className === "string" ? node.className : "",
        text: (node.textContent ?? "").replace(/\s+/g, " ").trim(),
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
        backgroundColor: style.backgroundColor,
        border: style.border,
        borderRadius: style.borderRadius,
        boxShadow: style.boxShadow,
        color: style.color,
        opacity: style.opacity,
        transform: style.transform,
        transition: style.transition,
      };
    };
    return [element, ...element.querySelectorAll("div,span,p,svg")].slice(0, 12).map(collect);
  });
}

async function findExactControl(page, text) {
  const controls = await page.locator("a,button,[role='button'],[role='link']").elementHandles();
  for (const control of controls) {
    const matches = await control.evaluate((element, targetText) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      const label = (element.innerText ?? element.textContent ?? "").replace(/\s+/g, " ").trim();
      return label === targetText && rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
    }, text);
    if (matches) return control;
  }
  throw new Error(`Control not found: ${text}`);
}

async function inspectDesktopButton(page, text) {
  const control = await findExactControl(page, text);
  const before = await nestedControlState(control);
  const outerHTML = await control.evaluate((element) => element.outerHTML);
  await control.hover();
  await page.waitForTimeout(300);
  const hover = await nestedControlState(control);
  const box = await control.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(100);
  const active = await nestedControlState(control);
  await page.mouse.move(0, 0);
  await page.mouse.up();
  return { text, outerHTML, before, hover, active };
}

async function traceReveal(page, targetText) {
  await prepare(page, `${sourceOrigin}/`, "no-preference");
  const target = page.getByText(targetText, { exact: true }).first();
  await target.waitFor({ state: "attached" });
  const targetY = await target.evaluate((element) => element.getBoundingClientRect().top + scrollY);
  const sample = () => target.evaluate((element) => {
    const result = [];
    let current = element;
    for (let index = 0; current && index < 7; index += 1, current = current.parentElement) {
      const rect = current.getBoundingClientRect();
      const style = getComputedStyle(current);
      result.push({
        tag: current.tagName.toLowerCase(),
        className: typeof current.className === "string" ? current.className : "",
        name: current.getAttribute("data-framer-name"),
        rect: { y: Number(rect.y.toFixed(3)), height: Number(rect.height.toFixed(3)) },
        opacity: style.opacity,
        transform: style.transform,
        transition: style.transition,
      });
    }
    return result;
  });
  await page.evaluate((y) => scrollTo(0, y), Math.max(0, targetY - mobileViewport.height - 80));
  await page.waitForTimeout(120);
  const before = await sample();
  await page.evaluate((y) => scrollTo(0, y), Math.max(0, targetY - mobileViewport.height * 0.72));
  const frames = [{ ms: 0, ancestors: await sample() }];
  for (const ms of [40, 100, 180, 320, 560, 900]) {
    await page.waitForTimeout(ms - frames.at(-1).ms);
    frames.push({ ms, ancestors: await sample() });
  }
  return { targetText, targetY, before, frames };
}

const browser = await chromium.launch({ headless: true });

try {
  const results = { mobileViewport, sourceOrigin, implementationOrigin, about: {}, articles: {}, desktopButtons: {}, reveals: [] };
  const mobilePage = await browser.newPage({ viewport: mobileViewport });
  for (const [name, origin] of [["source", sourceOrigin], ["implementation", implementationOrigin]]) {
    await prepare(mobilePage, `${origin}/about/`);
    await revealEverySection(mobilePage);
    results.about[name] = await inspectAbout(mobilePage);
    results.articles[name] = {};
    for (const slug of articleSlugs) {
      await prepare(mobilePage, `${origin}/blog/${slug}/`);
      await revealEverySection(mobilePage);
      results.articles[name][slug] = await inspectArticle(mobilePage);
    }
  }

  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  for (const [name, origin] of [["source", sourceOrigin], ["implementation", implementationOrigin]]) {
    results.desktopButtons[name] = [];
    for (const text of ["Start Free Trial", "Book a Demo"]) {
      await prepare(desktopPage, `${origin}/`, "no-preference");
      results.desktopButtons[name].push(await inspectDesktopButton(desktopPage, text));
    }
  }

  for (const targetText of [
    "Everything your team needs to stay in sync.",
    "Built to handle how your team really works.",
    "Pick the plan that fits your team.",
    "Answers to the questions that come up most",
  ]) {
    results.reveals.push(await traceReveal(mobilePage, targetText));
  }

  const outputPath = new URL("../design-qa/mobile-layout-inspection.json", import.meta.url);
  await writeFile(outputPath, `${JSON.stringify(results, null, 2)}\n`);
  console.log(`Layout inspection written to ${outputPath.pathname}`);
} finally {
  await browser.close();
}
