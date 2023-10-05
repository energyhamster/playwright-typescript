import { Page, Locator } from "@playwright/test";

class HomePage {
    private page: Page;
    readonly getStartedBtn: Locator;
    readonly headingText: Locator;
    readonly homeText: Locator;
    readonly searchIcon: Locator;
    readonly navLinks: Locator;

    constructor(page: Page) {
        this.page = page;
        this.getStartedBtn = page.locator("#get-started");
        this.headingText = page.locator(
            "text=Think different. Make different."
        );
        this.homeText = page.locator("#zak-primary-menu >> text=Home");
        this.searchIcon = page.locator(
            "//div[@class='zak-header-actions zak-header-actions--desktop']//a[@class='zak-header-search__toggle']"
        );
        this.navLinks = page.locator("#zak-primary-menu li[id*=menu]");
    }

    async navigate() {
        await this.page.goto("/");
    }

    getNavLinksText() {
        return this.navLinks.allInnerTexts();
    }
}

export default HomePage;
