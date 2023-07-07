import { Locator, Page } from "@playwright/test";

export class RegisterPage {
  page: Page;
  emailInput: Locator;
  passwordInput: Locator;
  registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = this.page.getByPlaceholder("e-mail");
    this.passwordInput = this.page.getByPlaceholder("password");
    this.registerButton = this.page.getByRole("button", { name: "register" });
  }

  signUpAsNewUser = async (email: string, password: string) => {
    await this.emailInput.waitFor();
    await this.emailInput.fill(email);
    await this.passwordInput.waitFor();
    await this.passwordInput.fill(password);
    await this.registerButton.click();
    await this.page.waitForURL(/\/delivery-details/, { timeout: 3000 });
  };
}
