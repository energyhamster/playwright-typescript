import { test, expect, APIResponse } from "@playwright/test";
import ContactPage from "../pages/contact.page.ts";
import APIController from "../controller/api.controller.ts";

let contactPage: ContactPage;
let person: APIResponse;

test.beforeAll(async () => {
    await APIController.init();
    person = await APIController.getUser();
});

test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await contactPage.navigate();
});

test.describe("Verify Contact Tab", () => {
    test("Verify Send Us Message form Submit", async ({ page }) => {
        await contactPage.fillAllContactFieldsInFormAndSubmit(
            person["name"],
            person["email"],
            person["phone"],
            person["website"]
        );

        expect((await contactPage.successMessage.innerText()).trim()).toEqual(
            "Thanks for contacting us! We will be in touch with you shortly"
        );
    });
});
