import { test, expect } from "@playwright/test";
import ContactPage from "./../pages/contact.page.ts";
import { faker } from "@faker-js/faker";

let contactPage: ContactPage;

test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await contactPage.navigate();
});

test.describe("Verify Contact Tab", () => {
    test("Verify Send Us Message form Submit", async ({ page }) => {
        await contactPage.fillAllContactFieldsInFormAndSubmit(
            faker.person.fullName(),
            faker.internet.email(),
            faker.phone.number(),
            faker.lorem.paragraph()
        );

        expect((await contactPage.successMessage.innerText()).trim()).toEqual(
            "Thanks for contacting us! We will be in touch with you shortly"
        );
    });
});
