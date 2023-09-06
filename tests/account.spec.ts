import { test, expect } from "@playwright/test";
import AccountPage from "../pages/account.page.ts";

let accountPage: AccountPage;

test.beforeEach(async ({ page }) => {
    accountPage = new AccountPage(page);
    await accountPage.navigate();
});

test.describe("Account Page", () => {
    test.use({ storageState: "notLoggedInState.json" });

    test("Verify login and register is visible", async ({ page }) => {
        await expect(accountPage.loginForm).toBeVisible();
        await expect(accountPage.registerForm).toBeVisible();
    });
});

test.describe("My Account Page", () => {
    test("Access Orders Tab", async ({ page }) => {
        await accountPage.ordersTab.click();
        await expect(page).toHaveURL(/.*orders/);
    });

    test("Access Downloads Tab", async ({ page }) => {
        await accountPage.downloadsTab.click();
        await expect(page).toHaveURL(/.*downloads/);
    });
});
