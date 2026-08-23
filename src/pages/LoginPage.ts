import { Locator, Page } from "@playwright/test";

export class LoginPageLocators {
  constructor(private readonly page: Page) {}

  get usernameInput(): Locator {
    return this.page.getByRole("textbox", { name: "Username" });
  }

  get passwordInput(): Locator {
    return this.page.getByRole("textbox", { name: "Password" });
  }

  get loginButton(): Locator {
    return this.page.getByRole("button", { name: "Login" });
  }

  get invalidCredentialsMessage(): Locator {
    return this.page.getByText("Invalid credentials");
  }
}

export class LoginPage {
  private readonly locators: LoginPageLocators;

  constructor(private readonly page: Page) {
    this.locators = new LoginPageLocators(page);
  }

  async navigate(): Promise<void> {
    const baseUrl = process.env.BASE_URL;

    if (!baseUrl) {
      throw new Error("BASE_URL is not defined. Check your environment configuration.");
    }

    await this.page.goto(baseUrl);
  }

  async enterUsername(username: string): Promise<void> {
    await this.locators.usernameInput.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.locators.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.locators.loginButton.click();
  }

  get invalidCredentialsMessage(): Locator {
    return this.locators.invalidCredentialsMessage;
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }
}
