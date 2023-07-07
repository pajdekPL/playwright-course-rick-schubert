import { expect, Locator, Page } from "@playwright/test";
import { Navigation } from "../page-objects/Navigation";
import { isDesktopViewPort } from "../utils/isDesktopViewPort";

export class ProductsPage {
  page: Page;
  addButtons: Locator;
  sortDropdown: Locator;
  productTitles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButtons = this.page.locator('[data-qa="product-button"]');
    this.sortDropdown = this.page.locator('[data-qa="sort-dropdown"]');
    this.productTitles = this.page.locator('[data-qa="product-title"]');
  }

  visit = async () => {
    await this.page.goto("/");
  };

  addProductToBasket = async (index: number) => {
    const addButton = this.addButtons.nth(index);
    await addButton.waitFor();
    await expect(addButton).toHaveText("Add to Basket");

    const navigation = new Navigation(this.page);
    let basketCountBeforeAdding: number;
    if (isDesktopViewPort(this.page)) {
      basketCountBeforeAdding = await navigation.getBasketCounter();
    }
    await addButton.click();
    await expect(addButton).toHaveText("Remove from Basket");
    if (isDesktopViewPort(this.page)) {
      const basketCountAfterAdding = await navigation.getBasketCounter();
      expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding);
    }
  };

  sortByCheapest = async () => {
    await this.sortDropdown.waitFor();
    await this.productTitles.first().waitFor();
    const productTitlesBeforeSorting = await this.productTitles.allInnerTexts();
    await this.sortDropdown.selectOption("price-asc");
    const productTitlesAfterSorting = await this.productTitles.allInnerTexts();
    expect(productTitlesAfterSorting).not.toEqual(productTitlesBeforeSorting);
  };
  // public async visit() {
  //     await this.page.goto("/")
  // }
}
