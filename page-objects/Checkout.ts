import { expect, Locator, Page } from "@playwright/test";

export class Checkout {
  page: Page;
  basketCards: Locator;
  basketItemPrice: Locator;
  basketItemPriceremoveButton: Locator;
  continueToCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.basketCards = this.page.locator('[data-qa="basket-card"]');
    this.basketItemPrice = this.page.locator('[data-qa="basket-item-price"]');
    this.basketItemPriceremoveButton = this.page.locator(
      '[data-qa="basket-card-remove-item"]'
    );
    this.continueToCheckoutButton = this.page.locator(
      '[data-qa="continue-to-checkout"]'
    );
  }

  removeCheapestProduct = async () => {
    await this.basketCards.first().waitFor();
    const itemsBeforeRemoval = await this.basketCards.count();
    await this.basketItemPrice.first().waitFor();

    const allPriceTexts = await this.basketItemPrice.allInnerTexts();
    const allPricesWithoutDollarSign = allPriceTexts.map((price) => {
      return +price.replace("$", "");
    });
    const smallestPrice = Math.min(...allPricesWithoutDollarSign);
    const smallestPriceIdx = allPricesWithoutDollarSign.indexOf(smallestPrice);
    const smallestPriceItemRemoveButton =
      this.basketItemPriceremoveButton.nth(smallestPriceIdx);
    await smallestPriceItemRemoveButton.waitFor();
    await smallestPriceItemRemoveButton.click();

    // await this.page.pause() - toHaveCount has retring mechanism it is why it works!
    // const itemsAfterRemoval = await this.basketCards.count()
    // await expect(itemsAfterRemoval).toBeLessThan(itemsBeforeRemoval)

    await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1);
  };

  continueToCheckout = async () => {
    await this.continueToCheckoutButton.waitFor();
    await this.continueToCheckoutButton.click();
    await this.page.waitForURL(/\/login/, { timeout: 3000 });
  };
}
