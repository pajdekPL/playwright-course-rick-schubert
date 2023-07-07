import { expect, Locator, Page } from "@playwright/test";
import { DeliveryDetails } from "../data/deliveryDetails";
export class DeliveryDetailsPage {
  page: Page;
  firstNameInputLocator: Locator;
  lastNameInputLocator: Locator;
  cityInputLocator: Locator;
  streetInputLocator: Locator;
  postCodeInputLocator: Locator;
  countryDropdownLocator: Locator;
  continueToPaymentButtonLocator: Locator;
  deliveryDetailsSaveButton: Locator;
  savedAddressesLocator: Locator;
  savedAddressFirstNameLocator: Locator;
  savedAddressLastNameLocator: Locator;
  savedAddressCityLocator: Locator;
  savedAddressStreetLocator: Locator;
  savedAddressPostCodeLocator: Locator;
  savedAddressCountryLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInputLocator = this.page.locator(
      '[data-qa="delivery-first-name"]'
    );
    this.lastNameInputLocator = this.page.locator(
      '[data-qa="delivery-last-name"]'
    );
    this.cityInputLocator = this.page.locator('[data-qa="delivery-city"]');
    this.streetInputLocator = this.page.locator(
      '[data-qa="delivery-address-street"]'
    );
    this.postCodeInputLocator = this.page.locator(
      '[data-qa="delivery-postcode"]'
    );
    this.countryDropdownLocator = this.page.locator(
      '[data-qa="country-dropdown"]'
    );
    this.continueToPaymentButtonLocator = this.page.locator(
      '[data-qa="continue-to-payment-button"]'
    );
    this.deliveryDetailsSaveButton = this.page.locator(
      '[data-qa="save-address-button"]'
    );
    this.savedAddressesLocator = this.page.locator(
      '[data-qa="saved-address-container"]'
    );
    this.savedAddressFirstNameLocator = this.page.locator(
      '[data-qa="saved-address-firstName"]'
    );
    this.savedAddressLastNameLocator = this.page.locator(
      '[data-qa="saved-address-lastName"]'
    );
    this.savedAddressCityLocator = this.page.locator(
      '[data-qa="saved-address-city"]'
    );
    this.savedAddressStreetLocator = this.page.locator(
      '[data-qa="saved-address-street"]'
    );
    this.savedAddressPostCodeLocator = this.page.locator(
      '[data-qa="saved-address-postcode"]'
    );
    this.savedAddressCountryLocator = this.page.locator(
      '[data-qa="saved-address-country"]'
    );
  }

  fillDeliveryDetails = async (deliveryDetails: DeliveryDetails) => {
    await this.firstNameInputLocator.waitFor();
    await this.firstNameInputLocator.fill(deliveryDetails.firstName);

    await this.lastNameInputLocator.waitFor();
    await this.lastNameInputLocator.fill(deliveryDetails.lastName);

    await this.cityInputLocator.waitFor();
    await this.cityInputLocator.fill(deliveryDetails.city);

    await this.streetInputLocator.waitFor();
    await this.streetInputLocator.fill(deliveryDetails.street);

    await this.postCodeInputLocator.waitFor();
    await this.postCodeInputLocator.fill(deliveryDetails.postCode);

    await this.countryDropdownLocator.waitFor();
    await this.countryDropdownLocator.selectOption(deliveryDetails.country);
  };
  saveDeliveryDetails = async () => {
    const addressCountBeforeSaving = await this.savedAddressesLocator.count();
    await this.deliveryDetailsSaveButton.waitFor();
    await this.deliveryDetailsSaveButton.click();
    await this.savedAddressesLocator.waitFor();
    await expect(this.savedAddressesLocator).toHaveCount(
      addressCountBeforeSaving + 1
    );
    await this.savedAddressFirstNameLocator.first().waitFor();
    expect(await this.savedAddressFirstNameLocator.first().innerText()).toBe(
      await this.firstNameInputLocator.inputValue()
    );
    await this.savedAddressLastNameLocator.first().waitFor();
    expect(await this.savedAddressLastNameLocator.first().innerText()).toBe(
      await this.lastNameInputLocator.inputValue()
    );
    await this.savedAddressStreetLocator.first().waitFor();
    expect(await this.savedAddressStreetLocator.first().innerText()).toBe(
      await this.streetInputLocator.inputValue()
    );
    await this.savedAddressCityLocator.first().waitFor();
    expect(await this.savedAddressCityLocator.first().innerText()).toBe(
      await this.cityInputLocator.inputValue()
    );
    await this.savedAddressPostCodeLocator.first().waitFor();
    expect(await this.savedAddressFirstNameLocator.first().innerText()).toBe(
      await this.firstNameInputLocator.inputValue()
    );
    await this.savedAddressPostCodeLocator.first().waitFor();
    expect(await this.savedAddressPostCodeLocator.first().innerText()).toBe(
      await this.postCodeInputLocator.inputValue()
    );
    await this.savedAddressCountryLocator.first().waitFor();
    expect(await this.savedAddressCountryLocator.first().innerText()).toBe(
      await this.countryDropdownLocator.inputValue()
    );
  };

  continueToPayment = async () => {
    await this.continueToPaymentButtonLocator.waitFor();
    await this.continueToPaymentButtonLocator.click();
    await this.page.waitForURL(/\/payment/, { timeout: 3000 });
  };
}
