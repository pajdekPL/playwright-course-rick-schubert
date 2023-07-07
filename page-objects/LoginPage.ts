import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  page: Page;
  registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registerButton = page.locator('[data-qa="go-to-signup-button"]');
  }

  goToRegisterPage = async () => {
    await this.registerButton.waitFor();
    await this.registerButton.click();
    await this.page.waitForURL(/\/signup/, { timeout: 3000 });
  };
}
