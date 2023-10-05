import { Page, Locator } from "@playwright/test";

class AccountPage {
    private page: Page;
    readonly loginForm: Locator;
    readonly registerForm: Locator;
    readonly ordersTab: Locator;
    readonly downloadsTab: Locator;

    constructor(page: Page) {
        this.page = page;
        // before login page
        this.loginForm = page.locator("form[class*='login']");
        this.registerForm = page.locator("form[class*='register']");

        // after login page
        this.ordersTab = page.locator("li a[href*='orders']");
        this.downloadsTab = page.locator("li a[href*='downloads']");
    }

    async navigate() {
        await this.page.goto("/my-account");
    }
}

export default AccountPage;
