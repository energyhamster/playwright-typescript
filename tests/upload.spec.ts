import { test, expect } from "@playwright/test";
// @ts-ignore
import CartPage from "../pages/cart.page.ts";
import path from "path";

let cartPage: CartPage;

test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
    await cartPage.navigate();
});

test.describe("Verify upload File", () => {
    const fileName = ["logo-social.png", "test.pdf"];

    for (const name of fileName) {
        test(`should upload a ${name} file`, async ({ page }) => {
            const filePath = path.join(__dirname, `../data/${name}`);

            cartPage.uploadComponent().uploadFile(filePath);

            await expect(cartPage.uploadComponent().successTxt).toContainText(
                "uploaded successfully",
                { timeout: 10000 }
            );
        });
    }

    for (const name of fileName) {
        test(`should upload a ${name} file on a hidden input field`, async ({
            page,
        }) => {
            const filePath = path.join(__dirname, `../data/${name}`);
            const uploadInput = cartPage.uploadComponent().uploadInput;

            // DOM manipulation
            await page.evaluate((uploadInput) => {
                const selector = document.querySelector(uploadInput);
                if (selector) {
                    selector.className = "";
                }
            }, uploadInput);

            await page.setInputFiles(uploadInput, filePath);

            await cartPage.uploadComponent().submitBtn.click();

            await expect(cartPage.uploadComponent().successTxt).toContainText(
                "uploaded successfully",
                { timeout: 10000 }
            );
        });
    }
});
