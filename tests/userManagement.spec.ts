import { expect, test } from "../src/fixtures/fixtures";

test.describe("User Management", { tag: ["@smoke"] }, () => {
  test.skip("Verify admin can create a new user", async ({ userManagementPage, userBuilder }) => {
    //const user = userBuilder.withRole("Admin").withStatus("Enabled").build();
    const user = userBuilder.build();

    await test.step("Navigate to User Management page", async () => {
      await userManagementPage.navigate();
    });

    await test.step("Create a new user", async () => {
      await userManagementPage.createUser(
        user.role,
        user.employeeName,
        user.status,
        user.username,
        user.password
      );
    });

    await test.step("Verify created user is visible in the user list", async () => {
      await expect(
        userManagementPage.userRow(user.username),
        "Created username should be visible"
      ).toBeVisible();
    });
  });

  test("Verify admin can update user details", async ({ userManagementPage, userBuilder }) => {
    const user = userBuilder.withRole("ESS").withStatus("Enabled").build();
    const updatedRole = "Admin";

    await test.step("Navigate to User Management page", async () => {
      await userManagementPage.navigate();
    });

    await test.step(`Create a new user with ${user.role} role`, async () => {
      await userManagementPage.createUser(
        user.role,
        user.employeeName,
        user.status,
        user.username,
        user.password
      );
    });

    await test.step("Verify created user is visible in the user list", async () => {
      await userManagementPage.searchUser(user.username);
      await expect(
        userManagementPage.userRow(user.username, user.role),
        "Created username should be visible"
      ).toBeVisible();
    });

    await test.step("click edit icon of existed user", async () => {
      await userManagementPage.clickEditUser(user.username);
    });

    await test.step(`Update user with new role ${updatedRole} and save`, async () => {
      await userManagementPage.selectUserRole(updatedRole);
      await userManagementPage.clickSave();
    });

    await test.step(`Verify updated user is displayed with ${updatedRole} role`, async () => {
      await userManagementPage.searchUser(user.username);
      await expect(
        userManagementPage.userRow(user.username, updatedRole),
        "Updated user should be displayed in search results"
      ).toBeVisible();
    });
  });

  test("Verify admin can delete a user", async ({ userManagementPage, userBuilder }) => {
    const user = userBuilder.withRole("ESS").withStatus("Disabled").build();

    await test.step("Navigate to User Management page", async () => {
      await userManagementPage.navigate();
    });

    await test.step(`Create a new user with ${user.role} role`, async () => {
      await userManagementPage.createUser(
        user.role,
        user.employeeName,
        user.status,
        user.username,
        user.password
      );
    });

    await test.step("Verify created user is visible in the user list", async () => {
      await userManagementPage.searchUser(user.username);
      await expect(
        userManagementPage.userRow(user.username, user.role),
        "Created username should be visible"
      ).toBeVisible();
    });

    await test.step("Click delete icon of existed user", async () => {
      await userManagementPage.deleteUser(user.username);
    });

    await test.step("Verify deleted user is not visible in the user list", async () => {
      await expect(
        userManagementPage.userRow(user.username, user.role),
        "Deleted user should not be visible in user list"
      ).not.toBeVisible();
    });

    await test.step("Search deleted user and verify no results found", async () => {
      await userManagementPage.searchUser(user.username);
      await expect(
        userManagementPage.noRecordsFoundMessage,
        "No Records Found message should be displayed"
      ).toBeVisible();
    });
  });
});
