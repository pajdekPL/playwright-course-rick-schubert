import { Page, Locator, expect } from "@playwright/test";
import { isDesktopViewPort } from "../utils/isDesktopViewPort";

export class Navigation {
  page: Page;
  basketCounter: Locator;
  checkoutLink: Locator;
  mobileBurgerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.basketCounter = this.page.locator('[data-qa="header-basket-count"]');
    this.checkoutLink = this.page.getByRole("link", { name: "Checkout" });
    this.mobileBurgerButton = this.page.locator('[data-qa="burger-button"]');
  }

  getBasketCounter = async (): Promise<number> => {
    await this.basketCounter.waitFor();
    return +(await this.basketCounter.innerText());
  };

  goToCheckout = async () => {
    if (!isDesktopViewPort(this.page)) {
      await this.mobileBurgerButton.waitFor();
      await this.mobileBurgerButton.click();
    }
    await this.checkoutLink.waitFor();
    await this.checkoutLink.click();
    await this.page.waitForURL("/basket");
  };
}
