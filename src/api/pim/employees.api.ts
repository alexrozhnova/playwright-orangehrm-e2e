import type { APIRequestContext } from '@playwright/test';

const EMPLOYEES_PATH = '/web/index.php/api/v2/pim/employees';

export interface CreateEmployeeData {
  firstName: string;
  middleName?: string;
  lastName: string;
  employeeId: string;
}

export interface CreateEmployeeResult {
  employeeId: string;
  firstName: string;
  lastName: string;
}

export async function createEmployee(
  request: APIRequestContext,
  data: CreateEmployeeData
): Promise<CreateEmployeeResult> {
  const response = await request.post(EMPLOYEES_PATH, {
    data: {
      firstName: data.firstName,
      middleName: data.middleName ?? '',
      lastName: data.lastName,
      employeeId: data.employeeId,
      empPicture: null,
    },
  });

  if (!response.ok()) {
    throw new Error(
      `Create employee failed: ${response.status()} ${response.statusText()}`
    );
  }

  const body = await response.json();
  return {
    employeeId: data.employeeId,
    firstName: body.data.firstName,
    lastName: body.data.lastName,
  };
}
