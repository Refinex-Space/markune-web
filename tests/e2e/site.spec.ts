import { expect, test } from "@playwright/test";

const version = "0.1.15";
const githubDownload = (name: string) => `https://github.com/Refinex-Space/markune/releases/download/v${version}/${name}`;

const githubRelease = {
  tag_name: `v${version}`,
  published_at: "2026-07-26T06:07:09.000Z",
  html_url: `https://github.com/Refinex-Space/markune/releases/tag/v${version}`,
  assets: [
    { name: "Markune_aarch64.dmg", browser_download_url: githubDownload("Markune_aarch64.dmg"), size: 202422575, digest: `sha256:${"a".repeat(64)}` },
    { name: "Markune_x64.dmg", browser_download_url: githubDownload("Markune_x64.dmg"), size: 207847448, digest: `sha256:${"b".repeat(64)}` },
    { name: "Markune_x64-setup.exe", browser_download_url: githubDownload("Markune_x64-setup.exe"), size: 179845192, digest: `sha256:${"c".repeat(64)}` },
  ],
};

const downloadUrls = {
  windows: githubDownload("Markune_x64-setup.exe"),
  macosIntel: githubDownload("Markune_x64.dmg"),
};

const routes = [
  "/", "/about/", "/blog/", "/blog/what-we-shipped-in-q1/", "/blog/the-real-cost-of-context-switching/",
  "/blog/workflow-automation-start-with-these-5-rules/", "/blog/how-to-run-a-project-review-that-people-actually-find-useful/",
  "/blog/the-async-first-playbook-for-distributed-teams/", "/blog/why-your-team-keeps-missing-deadlines/", "/changelog/",
  "/contact/", "/download/", "/legal/privacy-policy/", "/legal/terms-of-service/",
];

for (const route of routes) {
  test(`route ${route} renders without console or resource errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("requestfailed", (request) => errors.push(`${request.url()} ${request.failure()?.errorText}`));
    if (route === "/download/") {
      await page.route("**/repos/Refinex-Space/markune/releases/latest", (request) => request.fulfill({ json: githubRelease }));
    }
    const response = await page.goto(route);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
    await expect(page.locator("h1")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth === document.documentElement.clientWidth)).toBe(true);
    expect(errors).toEqual([]);
  });
}

test("home interactions work with keyboard and links", async ({ page }, testInfo) => {
  await page.goto("/");
  await expect(page.locator(".hero-main-copy h1")).toContainText("写下想法，让工作自然展开。");
  await expect(page.getByText("Markune 是以本地 Markdown 为核心的桌面工作区：写作、知识整理、日程、图谱、画板与 Codex 协作，在同一处连续完成。", { exact: true })).toBeVisible();
  const technologyStack = page.getByRole("region", { name: "Markune 技术栈" });
  await expect(technologyStack).toContainText("Markune 基于以下核心技术栈构建");
  await expect(technologyStack.locator(".client-logo--technology")).toHaveCount(12);
  await expect(page.getByText("已有 240 万项任务通过 Markune 完成")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "在 GitHub 上查看 Markune" })).toHaveAttribute("href", "https://github.com/Refinex-Space/markune");
  await expect(page.getByRole("heading", { name: "让每一次记录，都能继续向前。" })).toBeVisible();
  await expect(page.getByText("文件始终在你手里")).toBeVisible();
  const featureSection = page.locator("#features");
  await expect(featureSection.getByRole("heading", { name: "让每一份记录，都成为下一步工作的起点。" })).toBeVisible();
  await expect(featureSection.getByRole("heading", { name: "本地 Markdown 工作区" })).toBeVisible();
  await expect(featureSection.getByRole("heading", { name: "Inbox 与 Daily" })).toBeVisible();
  await expect(featureSection.getByRole("heading", { name: "Git Sync" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "把每天的记录，留在自己的工作区里持续生长。" })).toBeVisible();
  await expect(page.getByText("在 Inbox 收集零散想法、待办与阅读摘录")).toBeVisible();
  await expect(page.getByText("用熟悉的 Git 工作流，让本地知识库始终有可追溯的同步。", { exact: true })).toBeVisible();
  await expect(page.getByText("提交、拉取并推送当前工作区")).toBeVisible();
  await expect(page.getByTestId("price-starter")).toHaveText("¥0");
  await expect(page.getByTestId("price-pro")).toHaveText("¥0");
  await expect(page.getByLabel("原价 ¥89，现价 ¥0")).toBeVisible();
  await expect(page.getByRole("button", { name: "暂未开放" })).toBeDisabled();
  const faq = page.getByRole("button", { name: "我的文档保存在哪里？" });
  await faq.focus();
  await page.keyboard.press("Enter");
  await expect(faq).toHaveAttribute("aria-expanded", "true");
  if (testInfo.project.name !== "chromium") {
    await page.getByRole("button", { name: "打开导航菜单" }).click();
    await expect(page.getByRole("navigation", { name: "移动端导航" })).toBeVisible();
  }
  const featuresLink = testInfo.project.name === "chromium"
    ? page.getByRole("navigation", { name: "主导航" }).getByRole("link", { name: "功能" })
    : page.getByRole("navigation", { name: "移动端导航" }).getByRole("link", { name: "功能" });
  await featuresLink.click();
  await expect(page).toHaveURL(/#features$/);
  await expect(page.locator("#features")).toBeInViewport();
  await page.getByRole("contentinfo").getByRole("link", { name: "博客" }).click();
  await expect(page).toHaveURL(/\/blog\/$/);
  await page.getByRole("link", { name: "我们在第一季度发布了什么" }).first().click();
  await expect(page).toHaveURL(/\/blog\/what-we-shipped-in-q1\/$/);
});

test("download page recommends the device and supports explicit installer choices", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "platform", { configurable: true, get: () => "Win32" });
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async () => undefined },
    });
  });
  await page.route("**/repos/Refinex-Space/markune/releases/latest", (request) => request.fulfill({ json: githubRelease }));
  await page.goto("/download/");

  await expect(page.getByText("推荐此设备使用")).toBeVisible();
  await expect(page.getByTestId("download-link")).toHaveAttribute("href", downloadUrls.windows);
  await page.getByTestId("download-link").hover();
  await expect(page.getByTestId("download-link")).toHaveCSS("background-color", "rgb(203, 255, 151)");
  await expect(page.getByTestId("download-link")).toHaveCSS("color", "rgb(6, 8, 3)");
  await page.getByRole("button", { name: "macOS" }).focus();
  await page.keyboard.press("Enter");
  await page.getByRole("button", { name: /Intel 处理器/ }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("download-link")).toHaveAttribute("href", downloadUrls.macosIntel);
  expect(await page.evaluate(() => document.documentElement.scrollWidth === document.documentElement.clientWidth)).toBe(true);
  await page.getByRole("button", { name: "复制 SHA-256 校验值" }).click();
  await expect(page.getByRole("button", { name: "复制 SHA-256 校验值" })).toContainText("已复制");
});

test("download page exposes a retry path when the latest release fails", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "One deterministic error-state pass is sufficient.");
  let shouldFail = true;
  await page.route("**/repos/Refinex-Space/markune/releases/latest", (request) => {
    if (shouldFail) return request.abort("failed");
    return request.fulfill({ json: githubRelease });
  });
  await page.goto("/download/");
  await expect(page.getByRole("alert").filter({ hasText: "无法加载最新版本" })).toBeVisible();
  await expect(page.getByRole("link", { name: "查看 GitHub Releases" })).toHaveAttribute("href", "https://github.com/Refinex-Space/markune/releases");
  shouldFail = false;
  await page.getByRole("button", { name: "重试" }).click();
  await expect(page.getByTestId("download-link")).toBeVisible();
});

test("contact validates then reaches success without a network request", async ({ page }) => {
  await page.goto("/contact/");
  await page.getByRole("button", { name: "发送消息" }).click();
  await expect(page.getByText("请选择咨询主题。")).toBeVisible();
  await page.getByLabel("名字*").fill("小明");
  await page.getByLabel("姓氏*").fill("张");
  await page.getByLabel("电子邮箱*").fill("ava@example.com");
  await page.getByRole("combobox", { name: "咨询主题*" }).click();
  await page.getByRole("option", { name: "一般咨询" }).click();
  await page.getByLabel("留言内容*").fill("我想预约一次演示。");
  await page.getByText("我希望通过电子邮件接收产品更新与资讯。").click();
  await page.getByRole("button", { name: "发送消息" }).click();
  await expect(page.getByRole("button", { name: "发送中…" })).toBeDisabled();
  await expect(page.getByRole("status")).toContainText("已收到你的请求！");
});
