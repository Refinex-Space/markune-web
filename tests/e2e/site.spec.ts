import { expect, test } from "@playwright/test";

const downloadManifest = {
  schemaVersion: 1,
  version: "0.1.15",
  publishedAt: "2026-07-26T06:07:09.000Z",
  releaseUrl: "https://github.com/Refinex-Space/madora-site/releases/tag/v0.1.15",
  artifacts: {
    "macos-arm64-dmg": { name: "Madora_aarch64.dmg", url: "https://madora-releases-2026.oss-cn-shanghai.aliyuncs.com/releases/v0.1.15/Madora_aarch64.dmg", size: 202422575, sha256: "a".repeat(64) },
    "macos-x64-dmg": { name: "Madora_x64.dmg", url: "https://madora-releases-2026.oss-cn-shanghai.aliyuncs.com/releases/v0.1.15/Madora_x64.dmg", size: 207847448, sha256: "b".repeat(64) },
    "windows-x64-exe": { name: "Madora_x64-setup.exe", url: "https://madora-releases-2026.oss-cn-shanghai.aliyuncs.com/releases/v0.1.15/Madora_x64-setup.exe", size: 179845192, sha256: "c".repeat(64) },
  },
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
      await page.route("**/downloads/stable.json", (request) => request.fulfill({ json: downloadManifest }));
    }
    const response = await page.goto(route);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator("h1")).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("home interactions work with keyboard and links", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Yearly" }).click();
  await expect(page.getByTestId("price-starter")).toHaveText("$7");
  const faq = page.getByRole("button", { name: "Is there a free trial?" });
  await faq.focus();
  await page.keyboard.press("Enter");
  await expect(faq).toHaveAttribute("aria-expanded", "true");
  if (testInfo.project.name !== "chromium") {
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  }
  const featuresLink = testInfo.project.name === "chromium"
    ? page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Features" })
    : page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Features" });
  await featuresLink.click();
  await expect(page).toHaveURL(/#features$/);
  await expect(page.locator("#features")).toBeInViewport();
  await page.getByRole("contentinfo").getByRole("link", { name: "Blog" }).click();
  await expect(page).toHaveURL(/\/blog\/$/);
  await page.getByRole("link", { name: "What we shipped in Q1" }).first().click();
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
  await page.route("**/downloads/stable.json", (request) => request.fulfill({ json: downloadManifest }));
  await page.goto("/download/");

  await expect(page.getByText("Recommended for this device")).toBeVisible();
  await expect(page.getByTestId("download-link")).toHaveAttribute("href", downloadManifest.artifacts["windows-x64-exe"].url);
  await page.getByTestId("download-link").hover();
  await expect(page.getByTestId("download-link")).toHaveCSS("background-color", "rgb(203, 255, 151)");
  await expect(page.getByTestId("download-link")).toHaveCSS("color", "rgb(6, 8, 3)");
  await page.getByRole("button", { name: "macOS" }).focus();
  await page.keyboard.press("Enter");
  await page.getByRole("button", { name: /Intel processor/ }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("download-link")).toHaveAttribute("href", downloadManifest.artifacts["macos-x64-dmg"].url);
  expect(await page.evaluate(() => document.documentElement.scrollWidth === document.documentElement.clientWidth)).toBe(true);
  await page.getByRole("button", { name: "Copy SHA-256 checksum" }).click();
  await expect(page.getByRole("button", { name: "Copy SHA-256 checksum" })).toContainText("Copied");
});

test("download page exposes a retry path when the stable manifest fails", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "One deterministic error-state pass is sufficient.");
  let shouldFail = true;
  await page.route("**/downloads/stable.json", (request) => {
    if (shouldFail) return request.abort("failed");
    return request.fulfill({ json: downloadManifest });
  });
  await page.goto("/download/");
  await expect(page.getByRole("alert").filter({ hasText: "We couldn't load the latest release" })).toBeVisible();
  await expect(page.getByRole("link", { name: "View GitHub Releases" })).toHaveAttribute("href", "https://github.com/Refinex-Space/madora-site/releases/latest");
  shouldFail = false;
  await page.getByRole("button", { name: "Retry" }).click();
  await expect(page.getByTestId("download-link")).toBeVisible();
});

test("contact validates then reaches success without a network request", async ({ page }) => {
  await page.goto("/contact/");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("Please select a subject.")).toBeVisible();
  await page.getByLabel("First name*").fill("Ava");
  await page.getByLabel("Last name*").fill("Chen");
  await page.getByLabel("Email*").fill("ava@example.com");
  await page.getByRole("combobox", { name: "Subject*" }).click();
  await page.getByRole("option", { name: "General inquiry" }).click();
  await page.getByLabel("Your message*").fill("I would like a demo.");
  await page.getByText("I'd like to receive updates and news via email.").click();
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("button", { name: "Sending…" })).toBeDisabled();
  await expect(page.getByRole("status")).toContainText("Request received!");
});
