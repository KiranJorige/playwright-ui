import fs from "fs";
import path from "path";

import { Browser, expect, test as base } from "@playwright/test";

import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage";
import { UserManagementPage } from "../pages/UserManagementPage";
import { UserBuilder } from "../test-data/builders/UserBuilder";
import { EmployeeManagementPage } from "../pages/EmployeeManagementPage";
import { EmployeeBuilder } from "../test-data/builders/EmployeeBuilder";

type PageFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  userManagementPage: UserManagementPage;
  employeeManagementPage: EmployeeManagementPage;
  userBuilder: UserBuilder;
  employeeBuilder: EmployeeBuilder;
};

type WorkerFixtures = {
  storageStatePath: string;
};

export const nonAuthTest = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  userManagementPage: async ({ page }, use) => {
    await use(new UserManagementPage(page));
  },

  // eslint-disable-next-line no-empty-pattern
  userBuilder: async ({}, use) => {
    await use(new UserBuilder());
  },

  employeeManagementPage: async ({ page }, use) => {
    await use(new EmployeeManagementPage(page));
  },

  // eslint-disable-next-line no-empty-pattern
  employeeBuilder: async ({}, use) => {
    await use(new EmployeeBuilder());
  },
});

async function isStorageStateValid(browser: Browser, storageStatePath: string): Promise<boolean> {
  const context = await browser.newContext({
    storageState: storageStatePath,
  });

  const page = await context.newPage();

  try {
    await page.goto("/web/index.php/dashboard/index");

    const dashboardPage = new DashboardPage(page);

    await expect(dashboardPage.header).toBeVisible({
      timeout: 5000,
    });

    return true;
  } catch {
    return false;
  } finally {
    await context.close();
  }
}

export const test = nonAuthTest.extend<PageFixtures, WorkerFixtures>({
  storageState: async ({ storageStatePath }, use) => {
    await use(storageStatePath);
  },

  storageStatePath: [
    async ({ browser }, use, workerInfo) => {
      const authDir = ".auth";

      if (!fs.existsSync(authDir)) {
        fs.mkdirSync(authDir, { recursive: true });
      }

      const statePath = path.join(authDir, `user-${workerInfo.workerIndex}.json`);

      const authFileExists = fs.existsSync(statePath);

      let isValidAuth = false;

      if (authFileExists) {
        isValidAuth = await isStorageStateValid(browser, statePath);
      }

      if (!authFileExists || !isValidAuth) {
        const page = await browser.newPage();

        const loginPage = new LoginPage(page);

        await loginPage.navigate();

        await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

        await page.context().storageState({
          path: statePath,
        });

        await page.close();
      }

      await use(statePath);
    },
    { scope: "worker" },
  ],
});

export { expect } from "@playwright/test";
