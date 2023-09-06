import { test, expect } from "@playwright/test";
import BlogPage from "../pages/blog.page.ts";

let blogPage: BlogPage;

test.beforeEach(async ({ page }) => {
    blogPage = new BlogPage(page);
    await blogPage.navigate();
});

test.describe("Verify Blog Tab", () => {
    test("Verify Recent Post count and verify the length of each list item", async ({
        page,
    }) => {
        for (const el of await blogPage.recentPostList.elementHandles()) {
            expect((await el.textContent())?.trim().length).toBeGreaterThan(10);
        }

        expect(await blogPage.recentPostList.count()).toEqual(5);
    });
});
