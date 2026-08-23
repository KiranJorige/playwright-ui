import { Locator, Page } from "@playwright/test";

export class EmployeeManagementPageLocators {
  constructor(private readonly page: Page) {}

  get loadingSpinner(): Locator {
    return this.page.locator(".oxd-loading-spinner");
  }

  get employeeNameSearchInput(): Locator {
    return this.page
      .locator(".oxd-input-group")
      .filter({ hasText: "Employee Name" })
      .locator("input");
  }

  get searchButton(): Locator {
    return this.page.getByRole("button", {
      name: "Search",
    });
  }

  employeeRow(employeeName: string): Locator {
    return this.page.getByRole("row").filter({
      hasText: employeeName,
    });
  }

  employeeDeleteButton(employeeName: string): Locator {
    return this.employeeRow(employeeName).locator(".bi-trash");
  }

  get deleteInConfirmationDialog(): Locator {
    return this.page.getByRole("button", { name: "Yes, Delete" });
  }

  get noRecordsFoundMessage(): Locator {
    return this.page.getByText("No Records Found").nth(1);
  }

  // ----- Add employee locators -----
  get addEmployeeButton(): Locator {
    return this.page.getByRole("button", { name: "Add" });
  }

  get firstNameInput(): Locator {
    return this.page.getByRole("textbox", { name: "First Name" });
  }

  get middleNameInput(): Locator {
    return this.page.getByRole("textbox", { name: "Middle Name" });
  }

  get lastNameInput(): Locator {
    return this.page.getByRole("textbox", { name: "Last Name" });
  }

  get employeeIdInput(): Locator {
    return this.page
      .locator(".oxd-input-group")
      .filter({ hasText: "Employee Id" })
      .locator("input");
  }

  get saveButton(): Locator {
    return this.page.getByRole("button", { name: "Save" });
  }

  get employeeListMenu(): Locator {
    return this.page.getByRole("listitem").filter({
      hasText: "Employee List",
    });
  }
}

export class EmployeeManagementPage {
  private readonly locators: EmployeeManagementPageLocators;

  constructor(private readonly page: Page) {
    this.locators = new EmployeeManagementPageLocators(page);
  }

  async waitForLoaderToDisappear(): Promise<void> {
    await this.locators.loadingSpinner.waitFor({ state: "hidden" });
  }

  async clickAddEmployeeButton(): Promise<void> {
    this.locators.addEmployeeButton.click();
  }

  async navigate(): Promise<void> {
    await this.page.goto("/web/index.php/pim/viewEmployeeList");
  }

  async clickEmployeeListMenu(): Promise<void> {
    await this.locators.employeeListMenu.click();
  }

  async addEmployee(
    firstName: string,
    middleName: string,
    lastName: string,
    employeeId: string
  ): Promise<void> {
    await this.locators.firstNameInput.fill(firstName);
    await this.locators.middleNameInput.fill(middleName);
    await this.locators.lastNameInput.fill(lastName);
    await this.locators.employeeIdInput.fill(employeeId);
    await this.locators.saveButton.click();
    await this.locators.saveButton.waitFor({ state: "hidden" });
    await this.waitForLoaderToDisappear();
  }

  async searchEmployee(employeeName: string): Promise<void> {
    await this.locators.employeeNameSearchInput.fill(employeeName);
    await this.locators.searchButton.click();
  }

  async deleteEmployee(employeeName: string): Promise<void> {
    await this.locators.employeeDeleteButton(employeeName).click();
    await this.locators.deleteInConfirmationDialog.click();
    await this.waitForLoaderToDisappear();
  }

  employeeRow(employeeName: string): Locator {
    return this.locators.employeeRow(employeeName);
  }

  get noRecordsFoundMessage(): Locator {
    return this.locators.noRecordsFoundMessage;
  }
}
