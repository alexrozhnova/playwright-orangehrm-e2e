import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../src/pages/dashboard.page';
import { AddEmployeePage } from '../../src/pages/pim/add-employee.page';
import { EmployeeListPage } from '../../src/pages/pim/employee-list.page';

test.describe('PIM - Add Employee', () => {
  test('should create a new employee successfully', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const addEmployeePage = new AddEmployeePage(page);

    await dashboardPage.openPIM();

    // Generate random names for test data
    const random = Math.floor(Math.random() * 10000);

    const firstName = `John${random}`;
    const middleName = `QA${random}`;
    const lastName = `Doe${random}`;

    // Navigate to Add Employee page
    await addEmployeePage.open();

    // Create employee and capture employeeId
    const { employeeId } = await addEmployeePage.createEmployee(firstName, middleName, lastName);

    // Assert that employee profile page is opened
    await page.waitForURL(/\/pim\/viewPersonalDetails/, { timeout: 30_000 });

    // Log employeeId in output
    console.log(`Created employee with ID: ${employeeId}`);

    // Navigate to Employee List page and verify employee exists
    const employeeListPage = new EmployeeListPage(page);
    await employeeListPage.open();
    await employeeListPage.searchByEmployeeId(employeeId);
    await employeeListPage.expectRowWithEmployeeId(employeeId);
  });
});
