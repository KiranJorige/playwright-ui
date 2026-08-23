import { faker } from "@faker-js/faker";

export const USER_ROLES = {
  ADMIN: "Admin",
  ESS: "ESS",
} as const;

export const USER_STATUS = {
  ENABLED: "Enabled",
  DISABLED: "Disabled",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];

export type User = {
  employeeName: string;
  role: UserRole;
  status: UserStatus;
  username: string;
  password: string;
};

export class UserBuilder {
  private user = {
    employeeName: "Orange Test",
    role: USER_ROLES.ADMIN as UserRole,
    status: USER_STATUS.ENABLED as UserStatus,
    username: `user_${faker.string.alphanumeric(8).toLowerCase()}`,
    password: "Password@123",
  };

  withEmployeeName(employeeName: string): UserBuilder {
    this.user.employeeName = employeeName;
    return this;
  }

  withRole(role: UserRole): UserBuilder {
    this.user.role = role;
    return this;
  }

  withStatus(status: UserStatus): UserBuilder {
    this.user.status = status;
    return this;
  }

  withUsername(username: string): UserBuilder {
    this.user.username = username;
    return this;
  }

  withPassword(password: string): UserBuilder {
    this.user.password = password;
    return this;
  }

  build(): User {
    return { ...this.user };
  }
}
