import { Locator, Page } from "@playwright/test";

export class DashboardPageLocators {
  constructor(private readonly page: Page) {}

  get header(): Locator {
    return this.page.getByRole("heading", { name: "Dashboard" });
  }

  get userProfile(): Locator {
    return this.page.getByRole("banner").getByRole("img", { name: "profile picture" });
  }
}

export class DashboardPage {
  private readonly locators: DashboardPageLocators;

  constructor(private readonly page: Page) {
    this.locators = new DashboardPageLocators(page);
  }

  get header(): Locator {
    return this.locators.header;
  }

  get userProfile(): Locator {
    return this.locators.userProfile;
  }
}
