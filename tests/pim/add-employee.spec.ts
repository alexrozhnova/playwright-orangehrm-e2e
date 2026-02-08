import { test } from '@playwright/test';
import { DashboardPage } from '../../src/pages/dashboard.page';
import { AddEmployeePage } from '../../src/pages/pim/add-employee.page';

test.describe('PIM - Add Employee', () => {
  test('create a new employee', async ({ page }) => {
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

    // Create employee
    await addEmployeePage.createEmployee(firstName, middleName, lastName);

    // Assert that employee profile page is opened
    await page.waitForURL(/\/pim\/viewPersonalDetails/, { timeout: 30_000 });
  });
});
