import { expect, test } from "../src/fixtures/fixtures";

test.describe("Employee Management", { tag: "@smoke" }, () => {
  test.skip("Verify admin can add employee and search in employee list", async ({
    employeeManagementPage,
    employeeBuilder,
  }) => {
    const employee = employeeBuilder.build();

    await test.step("Navigate to Employee List page", async () => {
      await employeeManagementPage.navigate();
    });

    await test.step("Click add employee", async () => {
      await employeeManagementPage.clickAddEmployeeButton();
    });

    await test.step("Add new employee", async () => {
      await employeeManagementPage.addEmployee(
        employee.firstName,
        employee.middleName,
        employee.lastName,
        employee.employeeId
      );
    });

    await test.step("Search created employee", async () => {
      await employeeManagementPage.clickEmployeeListMenu();
      await employeeManagementPage.searchEmployee(employee.firstName);
    });

    await test.step("Verify employee is displayed in search result", async () => {
      await expect(
        employeeManagementPage.employeeRow(employee.firstName),
        "Employee should be visible in employee list"
      ).toBeVisible();
    });
  });

  test("Verify admin can create and delete an employee", async ({
    employeeManagementPage,
    employeeBuilder,
  }) => {
    const employee = employeeBuilder.build();

    await test.step("Navigate to Employee List page", async () => {
      await employeeManagementPage.navigate();
    });

    await test.step("Create a new employee", async () => {
      await employeeManagementPage.clickAddEmployeeButton();
      await employeeManagementPage.addEmployee(
        employee.firstName,
        employee.middleName,
        employee.lastName,
        employee.employeeId
      );
    });

    await test.step("Verify created employee is visible in the employee list", async () => {
      await employeeManagementPage.clickEmployeeListMenu();
      await employeeManagementPage.searchEmployee(employee.firstName);
      await expect(
        employeeManagementPage.employeeRow(employee.firstName),
        "Created employee should be visible in employee list"
      ).toBeVisible();
    });

    await test.step("Delete the created employee", async () => {
      await employeeManagementPage.deleteEmployee(employee.firstName);
    });

    await test.step("Verify deleted employee is not visible in the employee list", async () => {
      await expect(
        employeeManagementPage.employeeRow(employee.firstName),
        "Deleted employee should not be visible in employee list"
      ).not.toBeVisible();
    });

    await test.step("Verify no results are found for the deleted employee", async () => {
      await employeeManagementPage.searchEmployee(employee.firstName);
      await expect(
        employeeManagementPage.noRecordsFoundMessage,
        "No Records Found message should be displayed"
      ).toBeVisible();
    });
  });
});
