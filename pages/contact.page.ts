import { Locator, Page } from "@playwright/test";

class ContactPage {
    private page: Page;
    readonly recentPostList: Locator;
    readonly nameField: Locator;
    readonly emailField: Locator;
    readonly phoneField: Locator;
    readonly messageField: Locator;
    readonly submitButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameField = page.locator(
            "//input[@id='evf-277-field_ys0GeZISRs-1']"
        );
        this.emailField = page.locator(
            "//input[@id='evf-277-field_LbH5NxasXM-2']"
        );
        this.phoneField = page.locator(
            "//input[@id='evf-277-field_66FR384cge-3']"
        );
        this.messageField = page.locator(
            "//textarea[@id='evf-277-field_yhGx3FOwr2-4']"
        );
        this.submitButton = page.locator("//button[@id='evf-submit-277']");
        this.successMessage = page.locator("div[role='alert']");
    }

    async fillAllContactFieldsInFormAndSubmit(
        name: string,
        email: string,
        phone: string,
        message: string
    ) {
        await this.nameField.fill(name);
        await this.emailField.fill(email);
        await this.phoneField.fill(phone);
        await this.messageField.fill(message);
        await this.submitButton.click();
    }

    async navigate() {
        await this.page.goto("/contact");
    }
}

export default ContactPage;
