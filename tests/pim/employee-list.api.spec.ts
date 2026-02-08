import { test } from '@playwright/test';
import { createEmployee } from '../../src/api/pim/employees.api';
import { generateEmployeeId } from '../../src/utils/employee-id';
import { DashboardPage } from '../../src/pages/dashboard.page';
import { EmployeeListPage } from '../../src/pages/pim/employee-list.page';

test.describe('PIM - Employee List (API setup)', () => {
  let createdEmployeeId: string;

  test.beforeEach(async ({ request }) => {
    const employeeId = generateEmployeeId();
    await createEmployee(request, {
      firstName: `John_${employeeId}`,
      lastName: `Doe_${employeeId}`,
      employeeId,
    });
    createdEmployeeId = employeeId;
  });

  test('find employee by id', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const employeeListPage = new EmployeeListPage(page);

    await dashboardPage.openPIM();
    await employeeListPage.open();
    await employeeListPage.searchByEmployeeId(createdEmployeeId);
    await employeeListPage.expectRowWithEmployeeId(createdEmployeeId);
  });
});
