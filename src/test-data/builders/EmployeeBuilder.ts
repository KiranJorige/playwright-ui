import { faker } from "@faker-js/faker";

export class EmployeeBuilder {
  private employee = {
    firstName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    lastName: faker.person.lastName(),
    employeeId: faker.string.numeric(5),
  };

  withFirstName(firstName: string): EmployeeBuilder {
    this.employee.firstName = firstName;
    return this;
  }

  withMiddleName(middleName: string): EmployeeBuilder {
    this.employee.middleName = middleName;
    return this;
  }

  withLastName(lastName: string): EmployeeBuilder {
    this.employee.lastName = lastName;
    return this;
  }

  withEmployeeId(employeeId: string): EmployeeBuilder {
    this.employee.employeeId = employeeId;
    return this;
  }

  build() {
    return { ...this.employee };
  }
}
