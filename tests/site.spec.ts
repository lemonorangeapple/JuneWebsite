import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const articleRoutes = [
    "/posts/2026-08-10/",
    "/posts/2026-08-11/",
    "/posts/2026-08-12/",
    "/posts/2026-08-13/",
    "/posts/2026-08-14/",
    "/posts/2026-08-15/",
    "/posts/csp-sort/",
];

test("all generated routes respond successfully", async ({ request }) => {
    const sitemapResponse = await request.get("/sitemap-0.xml");
    expect(sitemapResponse.ok()).toBeTruthy();

    const sitemap = await sitemapResponse.text();
    const routes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
    expect(routes).toHaveLength(29);

    for (const route of [...routes, "/rss.xml", "/search.json", "/favicon.svg"]) {
        const response = await request.get(route);
        expect(response.status(), route).toBe(200);
    }
});

test("pages expose the expected document landmarks", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator('nav[aria-label="面包屑导航"]')).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);

    await page.goto("/posts/share-joj/");
    await expect(page.locator("main article")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("time[datetime]")).toHaveAttribute("datetime", "2024-02-04");
});

test("search is keyboard accessible and searches article bodies", async ({ page }) => {
    await page.goto("/posts/");

    const trigger = page.getByRole("button", { name: "文章搜索" });
    await trigger.focus();
    await expect(trigger).toBeFocused();
    await page.keyboard.press("Enter");

    const dialog = page.getByRole("dialog", { name: "搜索文章" });
    await expect(dialog).toBeVisible();

    const input = page.getByRole("searchbox", { name: "搜索文章内容、标签或专栏" });
    await expect(input).toBeFocused();
    await input.fill("FastMCP");

    const matches = page.locator("#search_results a");
    await expect(matches).toHaveCount(1);
    await expect(matches.first()).toHaveAttribute("href", /\/posts\/2026-08-26\/?$/);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
});

test("post filters expose their active state", async ({ page }) => {
    await page.goto("/posts/tags/");
    const tag = page.getByRole("button", { name: "AI底层" });
    await tag.click();
    await expect(tag).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("#tag-summary")).toHaveText("当前标签：AI底层，共 6 篇");
    await expect(page.locator('[data-post-tags]:not([hidden])')).toHaveCount(6);

    await page.goto("/posts/topic/");
    const topic = page.getByRole("button", { name: "log" });
    await topic.click();
    await expect(topic).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("#topic-summary")).toHaveText("当前主题：log，共 5 篇");
});

test("article presentation preserves lists, images, and mobile math", async ({ page }) => {
    await page.goto("/posts/csp-theory/");
    const listStyle = await page.locator(".post-content ol").first().evaluate((element) => getComputedStyle(element).listStyleType);
    expect(listStyle).toBe("decimal");

    await page.goto("/posts/2026-08-11/");
    const images = page.locator(".post-content img");
    await expect(images).toHaveCount(2);
    const invalidImages = await images.evaluateAll((elements) => elements.filter((element) => {
        const image = element as HTMLImageElement;
        return !image.alt || !image.hasAttribute("width") || !image.hasAttribute("height") || image.loading !== "lazy";
    }).length);
    expect(invalidImages).toBe(0);

    for (const route of articleRoutes) {
        await page.goto(route);
        await expect(page.locator(".post-content .katex").first()).toBeAttached();
        const widths = await page.evaluate(() => ({
            client: document.documentElement.clientWidth,
            scroll: document.documentElement.scrollWidth,
        }));
        expect(widths.scroll, route).toBeLessThanOrEqual(widths.client + 1);
    }

    await page.goto("/posts/2026-03-15/");
    await expect(page.locator(".post-content .katex")).toHaveCount(0);
});

test("representative pages have no serious automated accessibility violations", async ({ page }) => {
    const routes = [
        "/",
        "/posts/",
        "/posts/csp-theory/",
        "/posts/2026-08-26/",
        "/posts/2026-08-11/",
    ];

    for (const route of routes) {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(800);
        const result = await new AxeBuilder({ page }).analyze();
        const blocking = result.violations.filter((violation) =>
            violation.impact === "critical" || violation.impact === "serious",
        );
        expect(blocking, route).toEqual([]);
    }
});
