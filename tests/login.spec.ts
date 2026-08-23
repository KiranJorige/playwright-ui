import { nonAuthTest as test, expect } from "../src/fixtures/fixtures";

test.describe("Login", { tag: ["@smoke"] }, () => {
  test("Valid user can login successfully", async ({ loginPage, dashboardPage, page }) => {
    await test.step("Navigate to login page", async () => {
      await loginPage.navigate();
    });

    await test.step("Login using valid credentials", async () => {
      await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
    });

    await test.step("Verify dashboard is displayed", async () => {
      await expect(page).toHaveURL(/dashboard/i);
      await expect(dashboardPage.header, "Dashboard header should be visible").toBeVisible();
      await expect(dashboardPage.userProfile, "User profile image should be visible").toBeVisible();
    });
  });

  test("Invalid user should not be able to login", async ({ loginPage, page }) => {
    await test.step("Navigate to login page", async () => {
      await loginPage.navigate();
    });

    await test.step("Login using invalid credentials", async () => {
      await loginPage.login(process.env.APP_USERNAME!, "WrongPassword123!");
    });

    await test.step("Verify login failure message is displayed", async () => {
      await expect(page).toHaveURL(/login/i);
      await expect(
        loginPage.invalidCredentialsMessage,
        "Invalid credentials message should be visible"
      ).toBeVisible();
      await expect(
        loginPage.invalidCredentialsMessage,
        "Invalid credentials message should display correct text"
      ).toHaveText("Invalid credentials");
    });
  });
});
