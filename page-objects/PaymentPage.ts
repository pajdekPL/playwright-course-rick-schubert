import { expect, Locator, Page } from "@playwright/test";
import { paymentDetails } from "../data/paymentDetails";

export class PaymentPage {
  page: Page;
  discountCodeLocator: Locator;
  discountInputLocator: Locator;
  submitDiscountButtonLocator: Locator;
  discountActivatedMessageLocator: Locator;
  totalValueLocator: Locator;
  totalValueAfterDiscountLocator: Locator;
  creditCardOwnerInputLocator: Locator;
  creditCardNumberInputLocator: Locator;
  creditCardValidUntilInputLocator: Locator;
  creditCardCVCInputLocator: Locator;
  payButtonLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.discountCodeLocator = this.page
      .frameLocator('[data-qa="active-discount-container"]')
      .locator('[data-qa="discount-code"]');
    this.discountInputLocator = this.page.locator(
      '[data-qa="discount-code-input"]'
    );
    this.submitDiscountButtonLocator = this.page.locator(
      '[data-qa="submit-discount-button"]'
    );
    this.discountActivatedMessageLocator = this.page.locator(
      '[data-qa="discount-active-message"]'
    );
    this.totalValueLocator = this.page.locator('[data-qa="total-value"]');
    this.totalValueAfterDiscountLocator = this.page.locator(
      '[data-qa="total-with-discount-value"]'
    );
    this.creditCardOwnerInputLocator = this.page.locator(
      '[data-qa="credit-card-owner"]'
    );
    this.creditCardNumberInputLocator = this.page.locator(
      '[data-qa="credit-card-number"]'
    );
    this.creditCardValidUntilInputLocator = this.page.locator(
      '[data-qa="valid-until"]'
    );
    this.creditCardCVCInputLocator = this.page.locator(
      '[data-qa="credit-card-cvc"]'
    );
    this.payButtonLocator = this.page.locator('[data-qa="pay-button"]');
  }
  activateDiscount = async () => {
    await this.discountCodeLocator.waitFor();
    const code = await this.discountCodeLocator.innerText();
    await this.discountInputLocator.waitFor();

    // Option 1 for laggy inputs: using .fill() with await expect()
    await this.discountInputLocator.fill(code);
    await expect(this.discountInputLocator).toHaveValue(code, {
      timeout: 3000,
    });

    // Option 2 slow typing for laggy inputs
    // await this.discountInputLocator.focus()
    // await this.page.keyboard.type(code, { delay: 1000 })
    // expect(await this.discountInputLocator.inputValue()).toBe(code)
    await this.totalValueLocator.waitFor();
    const totalValue = +(await this.totalValueLocator.innerText()).replace(
      "$",
      ""
    );

    await expect(this.discountActivatedMessageLocator).not.toBeVisible();
    expect(await this.totalValueAfterDiscountLocator.isVisible()).toBe(false);

    await this.submitDiscountButtonLocator.waitFor();
    await this.submitDiscountButtonLocator.click();

    await this.discountActivatedMessageLocator.waitFor();
    await expect(this.discountActivatedMessageLocator).toHaveText(
      "Discount activated!"
    );

    await this.totalValueAfterDiscountLocator.waitFor();
    const totalValueAfterDiscount = +(
      await this.totalValueAfterDiscountLocator.innerText()
    ).replace("$", "");
    expect(totalValueAfterDiscount).toBeLessThan(totalValue);
  };

  fillPaymentDetails = async (paymentDetails: paymentDetails) => {
    await this.creditCardOwnerInputLocator.waitFor();
    await this.creditCardOwnerInputLocator.fill(paymentDetails.cardOwner);
    await this.creditCardNumberInputLocator.waitFor();
    await this.creditCardNumberInputLocator.fill(paymentDetails.cardNumber);
    await this.creditCardValidUntilInputLocator.waitFor();
    await this.creditCardValidUntilInputLocator.fill(
      paymentDetails.experationDate
    );
    await this.creditCardCVCInputLocator.waitFor();
    await this.creditCardCVCInputLocator.fill(paymentDetails.CVCNum);
  };

  completePayment = async () => {
    await this.payButtonLocator.waitFor();
    await this.payButtonLocator.click();
    await this.page.waitForURL(/\/thank-you/, { timeout: 3000 });
  };
}
