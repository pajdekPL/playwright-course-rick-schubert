import { Locator, Page } from "@playwright/test";

export class MyAccountPage {
  page: Page;
  myAccountPageHeadning: Locator;
  errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.myAccountPageHeadning = this.page.getByRole("heading", {
      name: "My Account",
    });
    this.errorMessage = this.page.locator('[data-qa="error-message"]');
  }

  visit = async () => {
    await this.page.goto("/my-account");
  };

  waitForPageHeading = async () => {
    await this.myAccountPageHeadning.waitFor();
  };

  waitForErrorMessage = async () => {
    await this.errorMessage.waitFor();
  };
}
