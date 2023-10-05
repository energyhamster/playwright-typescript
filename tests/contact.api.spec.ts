import { test, expect, APIRequestContext, APIResponse } from "@playwright/test";
import ContactPage from "../pages/contact.page.ts";

let contactPage: ContactPage;
let fakerApi: APIRequestContext;
let person: APIResponse;

test.beforeAll(async ({ playwright }) => {
    fakerApi = await playwright.request.newContext({
        baseURL: "https://jsonplaceholder.typicode.com/",
    });

    const response = await fakerApi.get("users");
    const responseBody = await response.json();
    person = responseBody[0];
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
