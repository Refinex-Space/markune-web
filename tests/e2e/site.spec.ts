import { expect, test } from "@playwright/test";

const routes = [
  "/", "/about/", "/blog/", "/blog/what-we-shipped-in-q1/", "/blog/the-real-cost-of-context-switching/",
  "/blog/workflow-automation-start-with-these-5-rules/", "/blog/how-to-run-a-project-review-that-people-actually-find-useful/",
  "/blog/the-async-first-playbook-for-distributed-teams/", "/blog/why-your-team-keeps-missing-deadlines/", "/changelog/",
  "/contact/", "/legal/privacy-policy/", "/legal/terms-of-service/",
];

for (const route of routes) {
  test(`route ${route} renders without console or resource errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("requestfailed", (request) => errors.push(`${request.url()} ${request.failure()?.errorText}`));
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
