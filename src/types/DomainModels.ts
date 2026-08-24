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

export type Employee = {
  firstName: string;
  middleName: string;
  lastName: string;
  employeeId: string;
};

export type Credentials = {
  username: string;
  password: string;
};
