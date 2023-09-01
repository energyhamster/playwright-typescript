import { test, expect } from "@playwright/test";
// @ts-ignore
import HomePage from "../pages/home.page.ts";

let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
});

test.describe("Home", () => {
    test("Open HomePage and verify title", async ({ page }) => {
        // Verify title
        await expect(page).toHaveTitle(
            "Practice E-Commerce Site – SDET Unicorns – Helping you succeed in Software Quality."
        );
    });

    test("Click get started button using CSS Selector", async ({ page }) => {
        // Click button
        await homePage.getStartedBtn.click();
        // Verify url has #get-started
        await expect(page).toHaveURL(/.*#get-started/);
    });

    test("Verify heading text is visible using text selector", async ({
        page,
    }) => {
        // Find the text locator
        const headingText = homePage.headingText;
        // Verify heading text is visible
        await expect(headingText).toBeVisible();
    });

    test("Verify home link is enabled using text and css selector", async ({
        page,
    }) => {
        // Find the text locator
        const homeText = homePage.homeText;
        // Verify home text is enable
        await expect(homeText).toBeEnabled();
    });

    test("Verify search icon is visible using xpath selector", async ({
        page,
    }) => {
        // Find the text locator
        const searchIcon = homePage.searchIcon;
        // Verify home text is visible
        await expect(searchIcon).toBeVisible();
    });

    test("Verify text of all nav links", async ({ page }) => {
        const expectedLinksText = [
            "Home",
            "About",
            "Shop",
            "Blog",
            "Contact",
            "My account",
        ];
        // Find the text locator
        expect(await homePage.getNavLinksText()).toEqual(expectedLinksText);
    });
});
