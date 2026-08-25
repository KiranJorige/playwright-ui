# Playwright UI Automation Framework

A scalable end-to-end UI automation framework built with Playwright and TypeScript for testing an OrangeHRM application.

## Tech Stack

- Playwright Test
- TypeScript
- Node.js
- Faker.js for test data generation
- ESLint and Prettier
- dotenv for environment configuration
- HTML test reports

## Features

- Page Object Model (POM) implementation
- Custom Playwright fixtures
- Worker-scoped authentication
- Storage state reuse
- Automatic storage state validation
- Automatic session regeneration
- Builder pattern for dynamic test data generation
- Faker-based test data generation
- Type-safe domain models
- Environment-specific configuration
- Environment variable validation
- Parallel test execution
- Reusable page objects and test components
- Automatic screenshots on test failure
- Trace collection on failure
- HTML reporting
- ESLint integration
- Prettier integration
- TypeScript type checking
- GitHub Actions CI/CD integration
- Multi-environment support

## Project Structure

```text
.
├── config/
│   ├── .env.dev
│   ├── .env.dev.local
│   └── .env.qa
├── src/
│   ├── fixtures/
│   │   └── fixtures.ts
│   ├── pages/
│   │   ├── DashboardPage.ts
│   │   ├── EmployeeManagementPage.ts
│   │   ├── LoginPage.ts
│   │   └── UserManagementPage.ts
│   ├── test-data/
│   │   └── builders/
│   │       ├── EmployeeBuilder.ts
│   │       └── UserBuilder.ts
│   ├── types/
│   │   └── DomainModels.ts
│   └── utils/
│       ├── envHelper.ts
│       └── logger.ts
├── tests/
│   ├── EmployeeManagement.spec.ts
│   ├── login.spec.ts
│   └── userManagement.spec.ts
├── eslint.config.mts
├── package.json
├── playwright.config.ts
└── tsconfig.json
```
## Framework Architecture

| Layer | Responsibility |
|---------|-------------|
| Pages | UI interactions and locators |
| Fixtures | Shared test setup and dependency injection |
| Builders | Dynamic test data generation |
| Types | Shared domain models |
| Utils | Reusable utility functions |
| Config | Environment-specific configuration |
| Tests | Test implementation and assertions |

---
## Installation

Clone repository:

```bash
git clone <repository-url>
cd <repository-name>
```

Install dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install --with-deps
```

---

## Environment Configuration

Create environment files under the `config` directory.

### config/.env.dev

```env
BASE_URL=https://opensource-demo.orangehrmlive.com

```

### config/.env.qa

```env
BASE_URL=<qa-url>

```

### config/.env.dev.local

```env
APP_USERNAME=
APP_PASSWORD=
```
---

## Run Tests

Run all tests:

```bash
npm test
```

Run smoke tests:

```bash
npx playwright test --grep @smoke
```

Run a specific test file:

```bash
npx playwright test tests/createUser.spec.ts
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run tests using Playwright UI:

```bash
npx playwright test --ui
```

---

## Authentication Strategy

The framework uses worker-scoped authentication with storage state reuse.

### Workflow

```text
Check Storage State
        ↓
   Exists?
   ↓       ↓
 No       Yes
  ↓         ↓
Login   Validate State
  ↓         ↓
Save     Valid?
State   ↓       ↓
       Yes      No
        ↓        ↓
      Reuse   Re-Login
                ↓
          Save New State
```

### Benefits

- Faster execution
- Reduced login overhead
- Stable test execution
- Parallel execution support
- Automatic recovery from expired sessions

---
## Available Fixtures

The framework provides reusable fixtures for commonly used page objects.

### Available Fixtures

```typescript
loginPage
dashboardPage
userManagementPage
employeeManagementPage
```

### Example

```typescript
test(
  "Navigate to User Management",
  async ({ userManagementPage }) => {
    await userManagementPage.navigate();
  }
);
```
## Test Data Builder Pattern

### User Builder

```typescript
const user = new UserBuilder()
  .withRole(USER_ROLES.ADMIN)
  .withStatus(USER_STATUS.ENABLED)
  .build();
```

### Employee Builder

```typescript
const employee = new EmployeeBuilder()
  .withFirstName("John")
  .withMiddleName("Pet")
  .withLastName("Pat")
  .build();
```

---

## Test Design Principles

### AAA Pattern (Arrange, Act, Assert)

The framework follows the AAA (Arrange, Act, Assert) pattern to improve test readability and maintainability.

### Structure

```text
Arrange
   ↓
Act
   ↓
Assert
```

### Example

```typescript
test(
  "Verify admin can create a user",
  async ({ userManagementPage }) => {
    // Arrange
    const user = new UserBuilder()
      .withRole(USER_ROLES.ADMIN)
      .withStatus(USER_STATUS.ENABLED)
      .build();

    // Act
    await userManagementPage.createUser(
      user.role,
      user.employeeName,
      user.status,
      user.username,
      user.password
    );

    // Assert
    await expect(
      userManagementPage.userRow(user.username)
    ).toBeVisible();
  }
);
```

### Guidelines

#### Arrange

Prepare all required test data and preconditions.

```typescript
const user = new UserBuilder()
  .withRole(USER_ROLES.ADMIN)
  .build();
```

#### Act

Perform the action under test.

```typescript
await userManagementPage.createUser(...);
```

#### Assert

Verify the expected outcome.

```typescript
await expect(
  userManagementPage.userRow(user.username)
).toBeVisible();
```

### Benefits

- Improves test readability
- Clearly separates test responsibilities
- Reduces maintenance effort
- Makes debugging easier
- Provides consistent test structure across the framework

---

## Tags

Tests are categorized using Playwright tags.

### Example

```typescript
test(
  "Create User",
  {
    tag: ["@smoke"],
  },
  async () => {
    // Test Steps
  }
);
```

### Execute Tagged Tests

Run Smoke Tests:

```bash
npx playwright test --grep @smoke
```

Run Regression Tests:

```bash
npx playwright test --grep @regression
```

Run Multiple Tags:

```bash
npx playwright test --grep "@smoke|@regression"
```

---

## Reporting

### Generate HTML Report

```bash
npx playwright show-report
```

### Report Location

```text
playwright-report/
```

### Test Result Artifacts

```text
test-results/
```

### Failure Artifacts

The framework automatically captures:

- Screenshots
- Traces
- Videos (if enabled)

These artifacts help accelerate root cause analysis and debugging.

---
## CI/CD Pipeline

GitHub Actions workflow performs:

```text
Checkout Repository
        ↓
Setup Node.js
        ↓
Install Dependencies
        ↓
Install Playwright Browsers
        ↓
Run ESLint
        ↓
Run TypeScript Type Check
        ↓
Execute Playwright Tests
        ↓
Publish Reports
```

### GitHub Actions Features

- Automated test execution on Pull Requests
- Automated test execution on Push
- Environment-based configuration
- Report publishing
- Artifact retention
- Scalable execution for multiple environments

### Required GitHub Secrets

Repository Secrets:

```text
APP_USERNAME
APP_PASSWORD
```

or Environment Secrets:

```text
dev
qa
```

---

## Coding Standards

### Assertions

Assertions should remain inside test files.

✅ Good

```typescript
await expect(
  userManagementPage.userRow(username)
).toBeVisible();
```

❌ Avoid

```typescript
async isUserVisible(): Promise<boolean> {
  return this.locator.isVisible();
}
```

used directly in assertions.

### Locator Strategy

Use getters for static locators:

```typescript
get saveButton(): Locator {
  return this.page.getByRole("button", {
    name: "Save",
  });
}
```

Use methods for dynamic locators:

```typescript
userRow(username: string): Locator {
  return this.page
    .getByRole("row")
    .filter({ hasText: username });
}
```

---

## Code Quality

Run ESLint:

```bash
npm run lint
```

Run Type Checking:

```bash
npm run typecheck
```

Run All Quality Checks:

```bash
npm run lint && npm run typecheck
```

---

## Best Practices Followed

- Page Object Model (POM)
- Arrange, Act, Assert (AAA) Pattern
- Builder Pattern
- Single Responsibility Principle (SRP)
- Separation of Test Logic and Page Logic
- Explicit Assertions in Test Layer
- Getter-Based Static Locators
- Method-Based Dynamic Locators
- Reusable Playwright Fixtures
- Worker-Scoped Authentication Strategy
- Dynamic Test Data Generation
- Strongly Typed Domain Models
- Environment-Based Configuration Management
- Centralized Environment Variable Validation
- Consistent Naming Conventions
- Modular Framework Design
- Reusable and Maintainable Components
- CI/CD Ready Framework Architecture
- Enterprise Automation Testing Standards

---

## Future Enhancements

- API Testing Integration
- Visual Regression Testing
- Cross-Browser Parallel Execution
- Slack / Teams Notifications
- Allure Reporting
- Docker-Based Execution
- Scheduled Nightly Regression Runs
- Test Analytics Dashboard

---

## Author

**Kiran Siddhardha Jorige**

Senior QA Automation Engineer

Built using **Playwright + TypeScript** following enterprise-grade automation testing standards.
