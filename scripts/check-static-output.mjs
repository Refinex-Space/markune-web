import { access, readFile } from "node:fs/promises";
import { join } from "node:path";

const routes = [
  "",
  "about",
  "blog",
  "blog/what-we-shipped-in-q1",
  "blog/the-real-cost-of-context-switching",
  "blog/workflow-automation-start-with-these-5-rules",
  "blog/how-to-run-a-project-review-that-people-actually-find-useful",
  "blog/the-async-first-playbook-for-distributed-teams",
  "blog/why-your-team-keeps-missing-deadlines",
  "changelog",
  "contact",
  "download",
  "legal/privacy-policy",
  "legal/terms-of-service",
];

const requiredAssets = [
  "flowline-logo.svg",
  "madora-workspace-hero.png",
  "feature-automation.webp",
  "feature-task-board.webp",
  "feature-automation-desktop.avif",
  "feature-automation-mobile.avif",
  "feature-task-board-desktop.avif",
  "feature-task-board-mobile.avif",
  "capability-comments.webp",
  "capability-analytics.webp",
  "capability-integrations.webp",
  "capability-comments-render.avif",
  "capability-analytics-render.avif",
  "capability-integrations-render.avif",
  "pricing-background.webp",
  "pricing-background-render.avif",
  "team-james-render.avif",
  "team-james-mobile.avif",
  "cta-dashboard.png",
  "cta-dashboard-render.avif",
  "cta-dashboard-mobile.avif",
  "about-story.png",
  "about-story-tablet.webp",
  "about-story-mobile.webp",
  "team-sarah-render.avif",
  "team-john-render.avif",
  "team-ana-render.avif",
  "team-daniel-render.avif",
  "team-david-render.avif",
  "team-james-about-render.avif",
  "contact-background.png",
  "contact-background-desktop.avif",
  "contact-background-tablet.avif",
  "contact-background-mobile.avif",
  "blog-q1.webp",
  "blog-context-switching.webp",
  "blog-automation.webp",
  "blog-project-review.webp",
  "blog-async.webp",
  "blog-deadlines.webp",
  "blog-q1-card.avif",
  "blog-context-switching-card.avif",
  "blog-automation-card.avif",
  "blog-project-review-card.avif",
  "blog-async-card.avif",
  "blog-deadlines-card.avif",
  "blog-q1-tablet.avif",
  "blog-context-switching-tablet.avif",
  "blog-automation-tablet.avif",
  "blog-project-review-tablet.webp",
  "blog-async-tablet.webp",
  "blog-deadlines-tablet.webp",
  "changelog-figma-tablet.avif",
  "changelog-figma-mobile.avif",
  "changelog-notifications-tablet.avif",
  "changelog-notifications-mobile.avif",
];

const failures = [];
for (const route of routes) {
  const file = join("out", route, "index.html");
  try {
    const html = await readFile(file, "utf8");
    if (/framer|My Framer Site|kodamatemplate\.framer/i.test(html)) failures.push(`${file}: contains a Framer export trace`);
    if (/\b(?:src|href)=["'](?:images|fonts)\//i.test(html)) failures.push(`${file}: contains a relative nested asset path`);
  } catch {
    failures.push(`${file}: missing static page`);
  }
}

for (const asset of requiredAssets) {
  try { await access(join("out", "assets", asset)); }
  catch { failures.push(`out/assets/${asset}: missing required asset`); }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Static export verified: ${routes.length} routes and ${requiredAssets.length} required assets.`);
}
