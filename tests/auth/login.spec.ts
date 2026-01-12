import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { DashboardPage } from '../../src/pages/dashboard.page';

test.describe('Auth', () => {
  test('login with valid credentials (Admin)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.open();
    await loginPage.login('Admin', 'admin123');

    await dashboardPage.expectOpened();
  });
});
