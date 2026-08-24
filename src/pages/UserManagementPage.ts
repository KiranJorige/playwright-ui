import { Locator, Page } from "@playwright/test";

//For Static locator → Getter
//For Dynamic locator → Method

export class UserManagementPageLocators {
  constructor(private readonly page: Page) {}

  get usernameSearchInput(): Locator {
    return this.page.locator(".oxd-input-group").filter({ hasText: "Username" }).locator("input");
  }

  get searchButton(): Locator {
    return this.page.getByRole("button", { name: "Search" });
  }

  get addButton(): Locator {
    return this.page.getByRole("button", { name: "Add" });
  }

  get loadingSpinner(): Locator {
    return this.page.locator(".oxd-loading-spinner");
  }

  userRow(username: string): Locator;
  userRow(username: string, role: string): Locator;

  userRow(username: string, role?: string): Locator {
    let locator = this.page.getByRole("row").filter({ hasText: username });

    if (role) {
      locator = locator.filter({ hasText: role });
    }

    return locator;
  }

  userEditButton(username: string): Locator {
    return this.page.getByRole("row").filter({ hasText: username }).locator(".bi-pencil-fill");
  }

  userDeleteButton(username: string): Locator {
    return this.page.getByRole("row").filter({ hasText: username }).locator(".bi-trash");
  }

  deleteInConfirmationDialog(): Locator {
    return this.page.getByRole("button", { name: "Yes, Delete" });
  }

  get noRecordsFoundMessage(): Locator {
    return this.page.getByText("No Records Found").nth(1);
  }

  // ----- create user page locators -----
  get userRoleDropdown(): Locator {
    return this.page
      .locator("div.oxd-input-group")
      .filter({ hasText: "User Role" })
      .locator(".oxd-select-text-input");
  }

  get adminRoleOption(): Locator {
    return this.page.getByRole("option", { name: "Admin" });
  }

  get employeeNameInput(): Locator {
    return this.page.getByRole("textbox", { name: "Type for hints..." });
  }

  get employeeSuggestion(): Locator {
    return this.page.getByText("Orange Test");
  }

  get statusDropdown(): Locator {
    return this.page
      .locator("div.oxd-input-group")
      .filter({ hasText: "Status" })
      .locator(".oxd-select-text-input");
  }

  get enabledStatusOption(): Locator {
    return this.page.getByRole("option", { name: "Enabled" });
  }

  get usernameInput(): Locator {
    return this.page
      .locator("div.oxd-input-group")
      .filter({ hasText: "Username" })
      .locator("input");
  }

  get passwordInput(): Locator {
    return this.page
      .locator("div.oxd-input-group")
      .filter({ has: this.page.getByText("Password", { exact: true }) })
      .locator("input[type='password']");
  }

  get confirmPasswordInput(): Locator {
    return this.page
      .locator("div.oxd-input-group")
      .filter({ hasText: "Confirm Password" })
      .locator("input[type='password']");
  }

  get saveButton(): Locator {
    return this.page.getByRole("button", { name: "Save" });
  }

  // ----- end of create user page locators -----
}

export class UserManagementPage {
  private readonly locators: UserManagementPageLocators;

  constructor(private readonly page: Page) {
    this.locators = new UserManagementPageLocators(page);
  }

  async waitForLoaderToDisappear(): Promise<void> {
    await this.locators.loadingSpinner.waitFor({ state: "hidden" });
  }

  async searchUser(username: string): Promise<void> {
    await this.locators.usernameSearchInput.fill(username);
    await this.locators.searchButton.click();
  }

  async clickEditUser(username: string): Promise<void> {
    await this.locators.userEditButton(username).click();
  }

  async clickUserDeleteIcon(username: string): Promise<void> {
    await this.locators.userDeleteButton(username).click();
  }

  async navigate(): Promise<void> {
    await this.page.goto("/web/index.php/admin/viewSystemUsers");
  }

  async clickAddUser(): Promise<void> {
    await this.locators.addButton.click();
  }

  async selectUserRole(role: string): Promise<void> {
    await this.locators.userRoleDropdown.click();

    await this.page.getByRole("option", { name: role }).click();
  }

  async selectEmployee(employeeName: string): Promise<void> {
    await this.locators.employeeNameInput.fill(employeeName);

    await this.locators.employeeSuggestion.click();
  }

  async selectStatus(status: string): Promise<void> {
    await this.locators.statusDropdown.click();

    await this.page.getByRole("option", { name: status }).click();
  }

  async enterUsername(username: string): Promise<void> {
    await this.locators.usernameInput.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.locators.passwordInput.fill(password);
  }

  async enterConfirmPassword(password: string): Promise<void> {
    await this.locators.confirmPasswordInput.fill(password);
  }

  async clickSave(): Promise<void> {
    await this.locators.saveButton.click();
    await this.waitForLoaderToDisappear();
  }

  async createUser(
    role: string,
    employeeName: string,
    status: string,
    username: string,
    password: string
  ): Promise<void> {
    await this.clickAddUser();
    await this.selectUserRole(role);
    await this.selectEmployee(employeeName);
    await this.selectStatus(status);
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.enterConfirmPassword(password);
    await this.clickSave();
    await this.locators.saveButton.waitFor({ state: "detached" });
    await this.waitForLoaderToDisappear();
  }

  async deleteUser(username: string): Promise<void> {
    await this.clickUserDeleteIcon(username);
    await this.locators.deleteInConfirmationDialog().click();
    await this.waitForLoaderToDisappear();
  }

  get noRecordsFoundMessage(): Locator {
    return this.locators.noRecordsFoundMessage;
  }

  userRow(username: string): Locator;
  userRow(username: string, role: string): Locator;

  userRow(username: string, role?: string): Locator {
    return role ? this.locators.userRow(username, role) : this.locators.userRow(username);
  }

  // userRow(username: string): Locator {
  //   return this.page.getByRole("row").filter({ hasText: username });
  // }
  // userRow(username: string, role: string): Locator {
  //   return this.page.getByRole("row").filter({ hasText: username }).filter({ hasText: role });
  // }
}
