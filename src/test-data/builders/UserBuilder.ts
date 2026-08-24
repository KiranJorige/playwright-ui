import { faker } from "@faker-js/faker";
import { User, UserRole, UserStatus, USER_ROLES, USER_STATUS } from "../../types/DomainModels";

export class UserBuilder {
  private user: User = {
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
